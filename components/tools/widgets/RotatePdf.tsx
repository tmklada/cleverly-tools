"use client";
import { useState, useRef } from "react";
import { PDFDocument, degrees } from "pdf-lib";

type Scope = "all" | "selected" | "each";
type RotationChoice = 0 | 90 | 180 | 270 | "reset";

// --- rotation math (testable) ---
function normalizeAngle(angle: number): number {
  const snapped = Math.round(angle / 90) * 90;
  return ((snapped % 360) + 360) % 360;
}

/** Applies a choice on top of the page's CURRENT rotation. 90 on a page already at 90 gives 180. */
function resolveRotation(current: number, choice: RotationChoice): number {
  if (choice === "reset") return 0;
  return normalizeAngle(normalizeAngle(current) + choice);
}

function parsePageList(input: string, total: number): { pages: number[]; error: string | null } {
  const raw = input.trim();
  if (!raw) return { pages: [], error: "Enter at least one page or range, for example 2, 5-7." };
  if (!Number.isFinite(total) || total < 1) {
    return { pages: [], error: "Upload a PDF first so page numbers can be checked." };
  }
  const picked = new Set<number>();
  for (const part of raw.split(",")) {
    const token = part.trim();
    if (!token) return { pages: [], error: "There is an empty entry — remove the extra comma." };
    const pieces = token.split("-");
    if (pieces.length > 2) {
      return { pages: [], error: `"${token}" is not a valid range. Use a single dash, for example 5-7.` };
    }
    if (pieces.length === 2) {
      const startText = pieces[0].trim();
      const endText = pieces[1].trim();
      const start = Number(startText);
      const end = Number(endText);
      if (startText === "" || endText === "" || !Number.isInteger(start) || !Number.isInteger(end)) {
        return { pages: [], error: `"${token}" is not a valid range. Use whole numbers, for example 5-7.` };
      }
      if (start > end) {
        return { pages: [], error: `"${token}" is backwards — put the smaller page first (${end}-${start}).` };
      }
      if (start < 1 || end > total) {
        return {
          pages: [],
          error: `"${token}" is outside this document. It has ${total} page${total === 1 ? "" : "s"}.`,
        };
      }
      for (let i = start; i <= end; i++) picked.add(i);
    } else {
      const n = Number(token);
      if (!Number.isInteger(n)) {
        return { pages: [], error: `"${token}" is not a page number. Use whole numbers, for example 4.` };
      }
      if (n < 1 || n > total) {
        return {
          pages: [],
          error: `Page ${n} is outside this document. It has ${total} page${total === 1 ? "" : "s"}.`,
        };
      }
      picked.add(n);
    }
  }
  return { pages: [...picked].sort((a, b) => a - b), error: null };
}
// --- end rotation math ---

const CHOICES: RotationChoice[] = [90, 180, 270, "reset"];

function choiceLabel(choice: RotationChoice): string {
  if (choice === "reset") return "⤾ Reset to 0°";
  if (choice === 90) return "↻ 90°";
  if (choice === 180) return "↻ 180°";
  return "↺ 270°";
}

function nextChoice(choice: RotationChoice): RotationChoice {
  const order: RotationChoice[] = [0, 90, 180, 270, "reset"];
  const i = order.indexOf(choice);
  return order[(i + 1) % order.length];
}

function shortChoice(choice: RotationChoice): string {
  return choice === "reset" ? "reset" : choice === 0 ? "keep" : `+${choice}°`;
}

export default function RotatePdf() {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState<number>(0);
  const [baseRotations, setBaseRotations] = useState<number[]>([]);
  const [scope, setScope] = useState<Scope>("all");
  const [rotation, setRotation] = useState<RotationChoice>(90);
  const [pageSelection, setPageSelection] = useState<string>("");
  const [perPage, setPerPage] = useState<RotationChoice[]>([]);
  const [progress, setProgress] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [done, setDone] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    setError("");
    setDone("");
    setPageSelection("");
    try {
      const buffer = await f.arrayBuffer();
      const pdf = await PDFDocument.load(buffer);
      const rotations = pdf.getPages().map((p) => normalizeAngle(p.getRotation().angle));
      setFile(f);
      setPageCount(rotations.length);
      setBaseRotations(rotations);
      setPerPage(rotations.map(() => 0 as RotationChoice));
    } catch {
      setFile(null);
      setPageCount(0);
      setBaseRotations([]);
      setPerPage([]);
      setError("Could not read that PDF. It may be corrupted or password-protected.");
    }
  }

  const liveError =
    pageCount > 0 && scope === "selected" && pageSelection.trim()
      ? parsePageList(pageSelection, pageCount).error
      : null;

  async function rotatePdf() {
    if (!file) {
      setError("Please upload a PDF first.");
      return;
    }
    let targets: number[] = [];
    if (scope === "all") {
      targets = Array.from({ length: pageCount }, (_, i) => i + 1);
    } else if (scope === "selected") {
      const parsed = parsePageList(pageSelection, pageCount);
      if (parsed.error) {
        setError(parsed.error);
        return;
      }
      targets = parsed.pages;
    } else {
      targets = perPage.map((c, i) => (c === 0 ? 0 : i + 1)).filter((n) => n > 0);
      if (targets.length === 0) {
        setError("No page has a rotation set yet. Tap a page chip to choose an angle.");
        return;
      }
    }
    setError("");
    setDone("");
    setProgress("Rotating pages...");
    try {
      const buffer = await file.arrayBuffer();
      const pdf = await PDFDocument.load(buffer);
      const pages = pdf.getPages();
      for (const pageNumber of targets) {
        const page = pages[pageNumber - 1];
        if (!page) continue;
        const choice = scope === "each" ? perPage[pageNumber - 1] : rotation;
        const current = page.getRotation().angle;
        page.setRotation(degrees(resolveRotation(current, choice)));
      }
      const bytes = await pdf.save();
      const blob = new Blob([bytes.buffer as ArrayBuffer], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = (file.name.replace(/\.pdf$/i, "") || "document") + "-rotated.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      setProgress("");
      setDone(
        `${targets.length} page${targets.length === 1 ? "" : "s"} rotated and downloaded. Rotation was applied on top of each page's existing angle.`
      );
    } catch (e) {
      setError("Failed to rotate: " + (e as Error).message);
      setProgress("");
    }
  }

  const scopes: { id: Scope; title: string; hint: string }[] = [
    { id: "all", title: "All pages", hint: "One angle, whole document" },
    { id: "selected", title: "Some pages", hint: "Type 2, 5-7" },
    { id: "each", title: "Page by page", hint: "Set each page yourself" },
  ];

  return (
    <div className="space-y-5">
      <div
        onClick={() => inputRef.current?.click()}
        className="border-2 border-dashed border-blue-300 dark:border-blue-600 rounded-xl p-8 text-center cursor-pointer hover:border-blue-500 transition-colors"
      >
        <div className="text-4xl mb-2">🔄</div>
        <p className="text-gray-600 dark:text-gray-300 font-medium">
          {file ? file.name : "Click to upload a PDF file"}
        </p>
        {file && pageCount > 0 && (
          <p className="text-sm text-blue-600 font-semibold mt-1">
            {pageCount} page{pageCount === 1 ? "" : "s"} · {(file.size / 1024).toFixed(0)} KB
          </p>
        )}
        <input ref={inputRef} type="file" accept=".pdf,application/pdf" onChange={handleFile} className="hidden" />
      </div>

      {pageCount > 0 && (
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Which pages should be rotated?
          </label>
          <div className="grid gap-2 sm:grid-cols-3">
            {scopes.map((s) => (
              <button
                key={s.id}
                onClick={() => {
                  setScope(s.id);
                  setError("");
                  setDone("");
                }}
                className={`text-left px-4 py-3 rounded-xl border transition-colors ${
                  scope === s.id
                    ? "bg-blue-600 border-blue-600 text-white"
                    : "bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:border-blue-400"
                }`}
              >
                <span className="block text-sm font-semibold">{s.title}</span>
                <span className={`block text-xs mt-0.5 ${scope === s.id ? "text-blue-100" : "text-gray-400"}`}>
                  {s.hint}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {pageCount > 0 && scope === "selected" && (
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Pages to rotate
          </label>
          <input
            type="text"
            value={pageSelection}
            onChange={(e) => {
              setPageSelection(e.target.value);
              setError("");
              setDone("");
            }}
            placeholder={`e.g. 2, 5-7 (this PDF has ${pageCount} pages)`}
            className={`w-full px-4 py-3 rounded-xl border bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 ${
              liveError
                ? "border-red-400 focus:ring-red-500"
                : "border-gray-200 dark:border-gray-600 focus:ring-blue-500"
            }`}
          />
          {liveError ? (
            <p className="text-xs text-red-600 dark:text-red-400 mt-1">⚠️ {liveError}</p>
          ) : (
            <p className="text-xs text-gray-400 mt-1">Separate pages with commas, use a dash for ranges.</p>
          )}
        </div>
      )}

      {pageCount > 0 && scope !== "each" && (
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Rotation (added to each page&apos;s current angle)
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {CHOICES.map((deg) => (
              <button
                key={String(deg)}
                onClick={() => setRotation(deg)}
                className={`py-3 rounded-xl font-semibold text-sm transition-colors ${
                  rotation === deg
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                {choiceLabel(deg)}
              </button>
            ))}
          </div>
        </div>
      )}

      {pageCount > 0 && scope === "each" && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Tap a page to cycle: keep → 90° → 180° → 270° → reset
            </label>
            <button
              onClick={() => setPerPage(perPage.map(() => 0 as RotationChoice))}
              className="text-xs font-semibold text-blue-600 hover:underline"
            >
              Clear all
            </button>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 gap-2">
            {perPage.map((choice, i) => {
              const base = baseRotations[i] ?? 0;
              const result = resolveRotation(base, choice);
              const active = choice !== 0;
              return (
                <button
                  key={i}
                  onClick={() => {
                    setPerPage(perPage.map((c, j) => (j === i ? nextChoice(c) : c)));
                    setError("");
                    setDone("");
                  }}
                  className={`px-2 py-2 rounded-xl border text-center transition-colors ${
                    active
                      ? "bg-blue-600 border-blue-600 text-white"
                      : "bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-blue-400"
                  }`}
                >
                  <span className="block text-sm font-bold">{i + 1}</span>
                  <span className={`block text-[11px] ${active ? "text-blue-100" : "text-gray-400"}`}>
                    {shortChoice(choice)}
                  </span>
                  <span className={`block text-[11px] ${active ? "text-blue-100" : "text-gray-400"}`}>
                    {base}° → {result}°
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {pageCount > 0 && (
        <p className="text-xs text-gray-500 dark:text-gray-400">
          ℹ️ There is no visual page preview here — everything runs in your browser and nothing is uploaded,
          and rendering page images would need an extra library. Each chip shows the page&apos;s current angle
          and the angle it will end up at, so you can plan the fix from the numbers.
        </p>
      )}

      {progress && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-xl px-4 py-3 text-sm text-blue-700 dark:text-blue-300">
          ⏳ {progress}
        </div>
      )}

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 text-red-700 dark:text-red-400 rounded-xl px-4 py-3 text-sm">
          ⚠️ {error}
        </div>
      )}

      {done && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 text-green-700 dark:text-green-400 rounded-xl px-4 py-3 text-sm">
          ✅ {done}
        </div>
      )}

      <button
        onClick={rotatePdf}
        disabled={!file || !!progress || (scope === "selected" && !pageSelection.trim())}
        className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-colors"
      >
        {progress
          ? "Rotating..."
          : scope === "each"
            ? "Rotate Selected Pages & Download"
            : scope === "selected"
              ? `Rotate Chosen Pages${rotation === "reset" ? "" : ` ${rotation}°`} & Download`
              : `Rotate All Pages${rotation === "reset" ? "" : ` ${rotation}°`} & Download`}
      </button>
    </div>
  );
}
