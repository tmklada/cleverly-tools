"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { PDFDocument, StandardFonts, rgb, type PDFFont, type PDFPage, type PDFImage } from "pdf-lib";

interface LineItem {
  id: number;
  description: string;
  qty: number;
  rate: number;
}

interface Draft {
  bizName: string;
  bizAddress: string;
  bizEmail: string;
  clientName: string;
  clientAddress: string;
  clientEmail: string;
  invoiceNo: string;
  invoiceDate: string;
  dueDate: string;
  taxRate: string;
  notes: string;
  items: LineItem[];
  logo: string | null;
  logoType: "png" | "jpg" | null;
}

const STORAGE_KEY = "ct:invoice-draft";
const MAX_LOGO_BYTES = 1024 * 1024;

let nextId = 1;

const money = (n: number) => `$${(Number.isFinite(n) ? n : 0).toFixed(2)}`;

/** pdf-lib standard fonts use WinAnsi encoding — anything outside it throws on draw. */
function sanitize(input: string): string {
  return (input || "")
    .replace(/[‘’‚‹›]/g, "'")
    .replace(/[“”„]/g, '"')
    .replace(/[–—−]/g, "-")
    .replace(/…/g, "...")
    .replace(/[•·]/g, "-")
    .replace(/ /g, " ")
    .replace(/[\r\t]/g, " ")
    .replace(/[^\x20-\x7E¡-ÿ\n]/g, "");
}

function wrapText(text: string, font: PDFFont, size: number, maxWidth: number, maxLines: number): string[] {
  const clean = sanitize(text).replace(/\n+/g, " ").trim();
  if (!clean) return [""];
  const words = clean.split(/\s+/);
  const lines: string[] = [];
  let line = "";

  const fits = (s: string) => font.widthOfTextAtSize(s, size) <= maxWidth;

  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (fits(candidate)) {
      line = candidate;
      continue;
    }
    if (line) lines.push(line);
    // A single word longer than the column — hard-break it.
    let rest = word;
    while (!fits(rest) && rest.length > 1) {
      let cut = rest.length;
      while (cut > 1 && !fits(rest.slice(0, cut))) cut--;
      lines.push(rest.slice(0, cut));
      rest = rest.slice(cut);
    }
    line = rest;
    if (lines.length > maxLines) break;
  }
  if (line) lines.push(line);

  if (lines.length > maxLines) {
    const kept = lines.slice(0, maxLines);
    let last = kept[maxLines - 1];
    while (last.length > 1 && !fits(`${last}...`)) last = last.slice(0, -1);
    kept[maxLines - 1] = `${last}...`;
    return kept;
  }
  return lines;
}

function truncate(text: string, font: PDFFont, size: number, maxWidth: number): string {
  let s = sanitize(text).replace(/\n/g, " ");
  if (font.widthOfTextAtSize(s, size) <= maxWidth) return s;
  while (s.length > 1 && font.widthOfTextAtSize(`${s}...`, size) > maxWidth) s = s.slice(0, -1);
  return `${s}...`;
}

/** Reads the saved draft. localStorage can throw (private mode, disabled storage, bad JSON). */
function readDraft(): Partial<Draft> | null {
  try {
    if (typeof window === "undefined") return null;
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? (parsed as Partial<Draft>) : null;
  } catch {
    return null;
  }
}

function str(value: unknown, fallback: string): string {
  return typeof value === "string" ? value : fallback;
}

function restoreItems(raw: unknown): LineItem[] | null {
  if (!Array.isArray(raw) || !raw.length) return null;
  const restored = raw
    .filter((i): i is Partial<LineItem> => !!i && typeof i === "object")
    .map((i, idx) => ({
      id: typeof i.id === "number" ? i.id : idx + 1,
      description: typeof i.description === "string" ? i.description : "",
      qty: Number(i.qty) || 0,
      rate: Number(i.rate) || 0,
    }));
  if (!restored.length) return null;
  nextId = Math.max(nextId, ...restored.map((i) => i.id)) + 1;
  return restored;
}

/** Probe once whether this browser will actually let us persist anything. */
function storageWorks(): boolean {
  try {
    if (typeof window === "undefined") return false;
    window.localStorage.setItem("ct:probe", "1");
    window.localStorage.removeItem("ct:probe");
    return true;
  } catch {
    return false;
  }
}

export default function InvoiceGenerator() {
  // This widget is loaded client-side only (ToolWidget uses ssr: false), so reading
  // storage in the initializers is safe and avoids a restore flash.
  const [draft] = useState<Partial<Draft> | null>(readDraft);
  const [canSave] = useState<boolean>(storageWorks);

  const [bizName, setBizName] = useState(() => str(draft?.bizName, "Your Company"));
  const [bizAddress, setBizAddress] = useState(() => str(draft?.bizAddress, "123 Main St, City, State 10001"));
  const [bizEmail, setBizEmail] = useState(() => str(draft?.bizEmail, "hello@company.com"));
  const [clientName, setClientName] = useState(() => str(draft?.clientName, "Client Name"));
  const [clientAddress, setClientAddress] = useState(() => str(draft?.clientAddress, "456 Client Ave, City, State"));
  const [clientEmail, setClientEmail] = useState(() => str(draft?.clientEmail, "client@email.com"));
  const [invoiceNo, setInvoiceNo] = useState(() => str(draft?.invoiceNo, "INV-001"));
  const [invoiceDate, setInvoiceDate] = useState(() =>
    str(draft?.invoiceDate, new Date().toISOString().split("T")[0]));
  const [dueDate, setDueDate] = useState(() => str(draft?.dueDate, ""));
  const [taxRate, setTaxRate] = useState(() => str(draft?.taxRate, "0"));
  const [notes, setNotes] = useState(() => str(draft?.notes, "Thank you for your business!"));
  const [items, setItems] = useState<LineItem[]>(() =>
    restoreItems(draft?.items) ?? [{ id: nextId++, description: "Service / Product", qty: 1, rate: 100 }]);
  const [logo, setLogo] = useState<string | null>(() =>
    typeof draft?.logo === "string" && (draft.logoType === "png" || draft.logoType === "jpg") ? draft.logo : null);
  const [logoType, setLogoType] = useState<"png" | "jpg" | null>(() =>
    draft?.logoType === "png" || draft?.logoType === "jpg" ? draft.logoType : null);
  const [logoError, setLogoError] = useState("");
  const [pdfError, setPdfError] = useState("");
  const [busy, setBusy] = useState(false);

  const logoInput = useRef<HTMLInputElement>(null);

  // ---- Draft save (syncing React state out to an external store) ----
  useEffect(() => {
    if (!canSave) return;
    const payload: Draft = {
      bizName, bizAddress, bizEmail,
      clientName, clientAddress, clientEmail,
      invoiceNo, invoiceDate, dueDate, taxRate, notes, items, logo, logoType,
    };
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
      /* quota exceeded or storage revoked mid-session — the invoice still works */
    }
  }, [canSave, bizName, bizAddress, bizEmail, clientName, clientAddress, clientEmail,
      invoiceNo, invoiceDate, dueDate, taxRate, notes, items, logo, logoType]);

  const addItem = () => setItems((prev) => [...prev, { id: nextId++, description: "", qty: 1, rate: 0 }]);
  const removeItem = (id: number) => setItems((prev) => prev.filter((i) => i.id !== id));
  const updateItem = (id: number, field: keyof LineItem, value: string | number) =>
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, [field]: value } : i)));

  const subtotal = items.reduce((s, i) => s + i.qty * i.rate, 0);
  const tax = subtotal * ((parseFloat(taxRate) || 0) / 100);
  const total = subtotal + tax;

  const print = () => window.print();

  // ---- Logo ----
  const onLogo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLogoError("");
    const type = file.type.toLowerCase();
    const isPng = type === "image/png" || /\.png$/i.test(file.name);
    const isJpg = type === "image/jpeg" || type === "image/jpg" || /\.jpe?g$/i.test(file.name);
    if (!isPng && !isJpg) {
      setLogoError("Only PNG and JPG logos are supported. Please convert your image and try again.");
      if (logoInput.current) logoInput.current.value = "";
      return;
    }
    if (file.size > MAX_LOGO_BYTES) {
      setLogoError("That logo is larger than 1 MB. Please use a smaller image.");
      if (logoInput.current) logoInput.current.value = "";
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === "string" ? reader.result : "";
      if (!result) { setLogoError("Could not read that image. Please try another file."); return; }
      setLogo(result);
      setLogoType(isPng ? "png" : "jpg");
    };
    reader.onerror = () => setLogoError("Could not read that image. Please try another file.");
    reader.readAsDataURL(file);
  };

  const removeLogo = () => {
    setLogo(null);
    setLogoType(null);
    setLogoError("");
    if (logoInput.current) logoInput.current.value = "";
  };

  const clearAll = () => {
    try { window.localStorage.removeItem(STORAGE_KEY); } catch { /* ignore */ }
    setBizName(""); setBizAddress(""); setBizEmail("");
    setClientName(""); setClientAddress(""); setClientEmail("");
    setInvoiceNo("INV-001");
    setInvoiceDate(new Date().toISOString().split("T")[0]);
    setDueDate(""); setTaxRate("0"); setNotes("");
    setItems([{ id: nextId++, description: "", qty: 1, rate: 0 }]);
    removeLogo();
    setPdfError("");
  };

  // ---- PDF ----
  const downloadPdf = useCallback(async () => {
    setPdfError("");
    setBusy(true);
    try {
      const PAGE_W = 595.28;
      const PAGE_H = 841.89;
      const M = 50;
      const RIGHT = PAGE_W - M;
      const BOTTOM = 70;

      const AMOUNT_R = RIGHT;
      const RATE_R = RIGHT - 90;
      const QTY_R = RIGHT - 175;
      const DESC_W = QTY_R - 55 - M;

      const ink = rgb(0.1, 0.11, 0.13);
      const muted = rgb(0.42, 0.45, 0.5);
      const accent = rgb(0.15, 0.39, 0.92);
      const line = rgb(0.85, 0.87, 0.9);

      const pdf = await PDFDocument.create();
      const font = await pdf.embedFont(StandardFonts.Helvetica);
      const bold = await pdf.embedFont(StandardFonts.HelveticaBold);

      let logoImg: PDFImage | null = null;
      if (logo && logoType) {
        try {
          logoImg = logoType === "png" ? await pdf.embedPng(logo) : await pdf.embedJpg(logo);
        } catch {
          logoImg = null; // unreadable image — render the invoice without it
        }
      }

      let page: PDFPage = pdf.addPage([PAGE_W, PAGE_H]);
      let y = PAGE_H - M;
      let pageNo = 1;

      const text = (p: PDFPage, s: string, x: number, yy: number, size: number, f: PDFFont, color = ink) =>
        p.drawText(sanitize(s), { x, y: yy, size, font: f, color });

      const textR = (p: PDFPage, s: string, xRight: number, yy: number, size: number, f: PDFFont, color = ink) => {
        const clean = sanitize(s);
        p.drawText(clean, { x: xRight - f.widthOfTextAtSize(clean, size), y: yy, size, font: f, color });
      };

      const rule = (p: PDFPage, yy: number, thickness = 0.75, color = line) =>
        p.drawLine({ start: { x: M, y: yy }, end: { x: RIGHT, y: yy }, thickness, color });

      const drawTableHeader = () => {
        text(page, "Description", M, y, 9, bold, muted);
        textR(page, "Qty", QTY_R, y, 9, bold, muted);
        textR(page, "Rate", RATE_R, y, 9, bold, muted);
        textR(page, "Amount", AMOUNT_R, y, 9, bold, muted);
        y -= 6;
        rule(page, y, 1.2, rgb(0.75, 0.78, 0.82));
        y -= 14;
      };

      const newPage = () => {
        page = pdf.addPage([PAGE_W, PAGE_H]);
        pageNo++;
        y = PAGE_H - M;
        text(page, `Invoice ${invoiceNo || ""} - continued`, M, y, 9, font, muted);
        textR(page, `Page ${pageNo}`, RIGHT, y, 9, font, muted);
        y -= 24;
        drawTableHeader();
      };

      // ---- Header: logo / business block ----
      const headerTop = y;
      if (logoImg) {
        const maxH = 60;
        const maxW = 200;
        const scale = Math.min(maxH / logoImg.height, maxW / logoImg.width, 1);
        const w = logoImg.width * scale;
        const h = logoImg.height * scale;
        page.drawImage(logoImg, { x: M, y: y - h, width: w, height: h });
        y -= h + 12;
      }

      if (bizName) { text(page, truncate(bizName, bold, 18, 300), M, y - 14, 18, bold); y -= 22; }
      for (const ln of (bizAddress || "").split("\n")) {
        if (!ln.trim()) continue;
        text(page, truncate(ln, font, 9.5, 300), M, y - 10, 9.5, font, muted);
        y -= 13;
      }
      if (bizEmail) { text(page, truncate(bizEmail, font, 9.5, 300), M, y - 10, 9.5, font, muted); y -= 13; }

      // ---- Header: INVOICE block (right) ----
      let ry = headerTop;
      textR(page, "INVOICE", RIGHT, ry - 18, 22, bold, accent);
      ry -= 30;
      if (invoiceNo) { textR(page, `#${invoiceNo}`, RIGHT, ry - 10, 10, bold); ry -= 15; }
      if (invoiceDate) { textR(page, `Date: ${invoiceDate}`, RIGHT, ry - 9, 9.5, font, muted); ry -= 13; }
      if (dueDate) { textR(page, `Due: ${dueDate}`, RIGHT, ry - 9, 9.5, font, muted); ry -= 13; }

      y = Math.min(y, ry) - 22;

      // ---- Bill To ----
      rule(page, y);
      y -= 18;
      text(page, "BILL TO", M, y, 8.5, bold, muted);
      y -= 16;
      if (clientName) { text(page, truncate(clientName, bold, 12, 320), M, y, 12, bold); y -= 15; }
      for (const ln of (clientAddress || "").split("\n")) {
        if (!ln.trim()) continue;
        text(page, truncate(ln, font, 9.5, 320), M, y, 9.5, font, muted);
        y -= 13;
      }
      if (clientEmail) { text(page, truncate(clientEmail, font, 9.5, 320), M, y, 9.5, font, muted); y -= 13; }

      y -= 16;
      drawTableHeader();

      // ---- Line items ----
      for (const item of items) {
        const lines = wrapText(item.description || "-", font, 9.5, DESC_W, 4);
        const rowH = Math.max(lines.length * 12, 14) + 8;
        if (y - rowH < BOTTOM) newPage();

        let ly = y;
        for (const ln of lines) {
          text(page, ln, M, ly, 9.5, font);
          ly -= 12;
        }
        const amount = (Number(item.qty) || 0) * (Number(item.rate) || 0);
        textR(page, String(Number(item.qty) || 0), QTY_R, y, 9.5, font);
        textR(page, money(Number(item.rate) || 0), RATE_R, y, 9.5, font);
        textR(page, money(amount), AMOUNT_R, y, 9.5, bold);

        y -= rowH;
        rule(page, y + 6, 0.5);
      }

      // ---- Totals ----
      if (y - 90 < BOTTOM) newPage();
      y -= 12;
      const labelR = RIGHT - 110;
      textR(page, "Subtotal", labelR, y, 10, font, muted);
      textR(page, money(subtotal), AMOUNT_R, y, 10, font);
      y -= 16;
      textR(page, `Tax (${parseFloat(taxRate) || 0}%)`, labelR, y, 10, font, muted);
      textR(page, money(tax), AMOUNT_R, y, 10, font);
      y -= 10;
      page.drawLine({
        start: { x: RIGHT - 200, y }, end: { x: RIGHT, y },
        thickness: 1, color: rgb(0.75, 0.78, 0.82),
      });
      y -= 18;
      textR(page, "Total", labelR, y, 13, bold);
      textR(page, money(total), AMOUNT_R, y, 13, bold, accent);
      y -= 34;

      // ---- Notes / terms ----
      const noteLines = notes
        ? (notes.split("\n").flatMap((ln) => wrapText(ln, font, 9.5, RIGHT - M, 6)))
        : [];
      if (noteLines.length) {
        if (y - (noteLines.length * 12 + 26) < BOTTOM) newPage();
        rule(page, y);
        y -= 18;
        text(page, "NOTES & PAYMENT TERMS", M, y, 8.5, bold, muted);
        y -= 14;
        for (const ln of noteLines.slice(0, 12)) {
          text(page, ln, M, y, 9.5, font, muted);
          y -= 12;
        }
      }

      const bytes = await pdf.save();
      const blob = new Blob([bytes.buffer as ArrayBuffer], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${(invoiceNo || "invoice").replace(/[^\w.-]+/g, "-")}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (err) {
      setPdfError(err instanceof Error ? `Could not generate the PDF: ${err.message}` : "Could not generate the PDF.");
    } finally {
      setBusy(false);
    }
  }, [bizName, bizAddress, bizEmail, clientName, clientAddress, clientEmail,
      invoiceNo, invoiceDate, dueDate, taxRate, notes, items, logo, logoType,
      subtotal, tax, total]);

  return (
    <>
      <style>{`
        @media print {
          body * { visibility: hidden; }
          #invoice-print, #invoice-print * { visibility: visible; }
          #invoice-print { position: absolute; left: 0; top: 0; width: 100%; }
          .no-print { display: none !important; }
        }
      `}</style>

      <div className="max-w-4xl mx-auto space-y-6">
        <div className="no-print grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">Your Business</h3>
            <div className="space-y-3">
              {[
                { label: "Business Name", val: bizName, set: setBizName },
                { label: "Address", val: bizAddress, set: setBizAddress },
                { label: "Email", val: bizEmail, set: setBizEmail },
              ].map(({ label, val, set }) => (
                <div key={label}>
                  <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">{label}</label>
                  <input value={val} onChange={(e) => set(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
                </div>
              ))}
              <div>
                <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Logo (PNG or JPG)</label>
                <div className="flex items-center gap-3">
                  <input ref={logoInput} type="file" accept="image/png,image/jpeg" onChange={onLogo}
                    className="block w-full text-xs text-gray-600 dark:text-gray-300 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 dark:file:bg-blue-900/40 dark:file:text-blue-300 hover:file:bg-blue-100 cursor-pointer" />
                  {logo && (
                    <button onClick={removeLogo} className="shrink-0 text-xs text-red-500 hover:text-red-600 hover:underline">
                      Remove
                    </button>
                  )}
                </div>
                {logoError && <p className="mt-1 text-xs text-red-500">{logoError}</p>}
                <p className="mt-1 text-[11px] text-gray-400 dark:text-gray-500">Stays in your browser — never uploaded.</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">Client Info</h3>
            <div className="space-y-3">
              {[
                { label: "Client Name", val: clientName, set: setClientName },
                { label: "Address", val: clientAddress, set: setClientAddress },
                { label: "Email", val: clientEmail, set: setClientEmail },
              ].map(({ label, val, set }) => (
                <div key={label}>
                  <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">{label}</label>
                  <input value={val} onChange={(e) => set(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-5 sm:col-span-2">
            <div className="grid grid-cols-3 gap-4 mb-4">
              {[
                { label: "Invoice #", val: invoiceNo, set: setInvoiceNo },
                { label: "Date", val: invoiceDate, set: setInvoiceDate, type: "date" },
                { label: "Due Date", val: dueDate, set: setDueDate, type: "date" },
              ].map(({ label, val, set, type }) => (
                <div key={label}>
                  <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">{label}</label>
                  <input type={type || "text"} value={val} onChange={(e) => set(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between gap-4 text-xs">
              <span className="text-gray-400 dark:text-gray-500">
                {canSave ? "Draft saved in this browser — a refresh won't lose it." : "Draft saving is unavailable in this browser."}
              </span>
              <button onClick={clearAll}
                className="shrink-0 px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 font-medium transition-colors">
                Clear invoice
              </button>
            </div>
          </div>
        </div>

        <div id="invoice-print" className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
          <div className="flex justify-between items-start mb-8">
            <div>
              {logo && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={logo} alt="Business logo" className="max-h-16 w-auto mb-3 object-contain" />
              )}
              <h1 className="text-3xl font-black text-gray-900 dark:text-white">{bizName}</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 whitespace-pre-line">{bizAddress}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{bizEmail}</p>
            </div>
            <div className="text-right">
              <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">INVOICE</h2>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">#{invoiceNo}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Date: {invoiceDate}</p>
              {dueDate && <p className="text-sm text-red-500">Due: {dueDate}</p>}
            </div>
          </div>

          <div className="mb-6 bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">Bill To</p>
            <p className="font-bold text-gray-900 dark:text-white">{clientName}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{clientAddress}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{clientEmail}</p>
          </div>

          <table className="w-full mb-6">
            <thead>
              <tr className="border-b-2 border-gray-200 dark:border-gray-700">
                <th className="text-left py-2 text-sm font-semibold text-gray-600 dark:text-gray-400">Description</th>
                <th className="text-right py-2 text-sm font-semibold text-gray-600 dark:text-gray-400 w-16">Qty</th>
                <th className="text-right py-2 text-sm font-semibold text-gray-600 dark:text-gray-400 w-24">Rate</th>
                <th className="text-right py-2 text-sm font-semibold text-gray-600 dark:text-gray-400 w-24">Amount</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b border-gray-100 dark:border-gray-800 group">
                  <td className="py-2">
                    <input value={item.description} onChange={(e) => updateItem(item.id, "description", e.target.value)}
                      className="no-print w-full bg-transparent text-gray-900 dark:text-white focus:outline-none text-sm border-b border-transparent focus:border-blue-500" placeholder="Item description" />
                    <span className="hidden print:block text-gray-900 dark:text-white text-sm">{item.description}</span>
                  </td>
                  <td className="py-2 text-right">
                    <input type="number" value={item.qty} onChange={(e) => updateItem(item.id, "qty", parseFloat(e.target.value) || 0)}
                      className="no-print w-16 bg-transparent text-right text-gray-900 dark:text-white focus:outline-none text-sm border-b border-transparent focus:border-blue-500" />
                    <span className="hidden print:block">{item.qty}</span>
                  </td>
                  <td className="py-2 text-right">
                    <input type="number" value={item.rate} onChange={(e) => updateItem(item.id, "rate", parseFloat(e.target.value) || 0)}
                      className="no-print w-24 bg-transparent text-right text-gray-900 dark:text-white focus:outline-none text-sm border-b border-transparent focus:border-blue-500" />
                    <span className="hidden print:block">{money(item.rate)}</span>
                  </td>
                  <td className="py-2 text-right text-sm font-medium text-gray-900 dark:text-white">
                    {money(item.qty * item.rate)}
                    <button onClick={() => removeItem(item.id)} className="no-print ml-2 text-red-400 hover:text-red-600 text-xs opacity-0 group-hover:opacity-100 transition-opacity">✕</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="no-print mb-4">
            <button onClick={addItem} className="text-sm text-blue-600 dark:text-blue-400 hover:underline">+ Add line item</button>
          </div>

          <div className="flex justify-between items-start">
            <div className="no-print flex-1 mr-8">
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Notes</label>
              <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none" />
            </div>
            <div className="w-64 space-y-2">
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                <span>Subtotal</span>
                <span>{money(subtotal)}</span>
              </div>
              <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <span>Tax</span>
                  <input type="number" value={taxRate} onChange={(e) => setTaxRate(e.target.value)} className="no-print w-12 px-1 py-0.5 text-xs rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white" />
                  <span>%</span>
                </div>
                <span>{money(tax)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg text-gray-900 dark:text-white border-t border-gray-300 dark:border-gray-600 pt-2">
                <span>Total</span>
                <span>{money(total)}</span>
              </div>
            </div>
          </div>

          {notes && <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 italic hidden print:block">{notes}</p>}
        </div>

        {pdfError && (
          <p className="no-print text-sm text-red-500 text-right">{pdfError}</p>
        )}

        <div className="no-print flex flex-wrap justify-end gap-3">
          <button onClick={print} className="px-6 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-xl font-bold shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            🖨 Print Invoice
          </button>
          <button onClick={downloadPdf} disabled={busy}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white rounded-xl font-bold shadow transition-colors">
            {busy ? "Generating PDF…" : "⬇ Download PDF"}
          </button>
        </div>
      </div>
    </>
  );
}
