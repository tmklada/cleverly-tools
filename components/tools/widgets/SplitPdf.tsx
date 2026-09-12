"use client";
import { useState, useRef, useEffect } from "react";
import { PDFDocument } from "pdf-lib";

type Mode = "ranges" | "single" | "every";

interface PageRange {
  start: number;
  end: number;
}

interface ParseResult {
  ranges: PageRange[];
  error: string | null;
}

interface OutputFile {
  name: string;
  label: string;
  url: string;
  pages: number;
  size: number;
}

// --- range parsing (testable) ---
function parseRanges(input: string, total: number): ParseResult {
  const raw = input.trim();
  if (!raw) {
    return { ranges: [], error: "Enter at least one page or range, for example 1-3, 5, 8-10." };
  }
  if (!Number.isFinite(total) || total < 1) {
    return { ranges: [], error: "Upload a PDF first so page numbers can be checked." };
  }
  const ranges: PageRange[] = [];
  for (const part of raw.split(",")) {
    const token = part.trim();
    if (!token) {
      return { ranges: [], error: "There is an empty entry — remove the extra comma." };
    }
    const pieces = token.split("-");
    if (pieces.length > 2) {
      return { ranges: [], error: `"${token}" is not a valid range. Use a single dash, for example 5-9.` };
    }
    if (pieces.length === 2) {
      const startText = pieces[0].trim();
      const endText = pieces[1].trim();
      const start = Number(startText);
      const end = Number(endText);
      if (startText === "" || endText === "" || !Number.isInteger(start) || !Number.isInteger(end)) {
        return { ranges: [], error: `"${token}" is not a valid range. Use whole numbers, for example 5-9.` };
      }
      if (start > end) {
        return { ranges: [], error: `"${token}" is backwards — put the smaller page first (${end}-${start}).` };
      }
      if (start < 1 || end > total) {
        return {
          ranges: [],
          error: `"${token}" is outside this document. It has ${total} page${total === 1 ? "" : "s"}.`,
        };
      }
      ranges.push({ start, end });
    } else {
      const n = Number(token);
      if (!Number.isInteger(n)) {
        return { ranges: [], error: `"${token}" is not a page number. Use whole numbers, for example 4.` };
      }
      if (n < 1 || n > total) {
        return {
          ranges: [],
          error: `Page ${n} is outside this document. It has ${total} page${total === 1 ? "" : "s"}.`,
        };
      }
      ranges.push({ start: n, end: n });
    }
  }
  return { ranges, error: null };
}

function flattenRanges(ranges: PageRange[]): number[] {
  const seen = new Set<number>();
  for (const r of ranges) {
    for (let i = r.start; i <= r.end; i++) seen.add(i);
  }
  return [...seen].sort((a, b) => a - b);
}

interface SplitJob {
  label: string;
  suffix: string;
  pages: number[];
}

function buildJobs(mode: Mode, ranges: PageRange[], total: number): SplitJob[] {
  if (mode === "every") {
    return Array.from({ length: total }, (_, i) => ({
      label: `Page ${i + 1}`,
      suffix: `page-${i + 1}`,
      pages: [i + 1],
    }));
  }
  if (mode === "single") {
    const pages = flattenRanges(ranges);
    return [{ label: `Pages ${pages.join(", ")}`, suffix: "extracted", pages }];
  }
  return ranges.map((r) => ({
    label: r.start === r.end ? `Page ${r.start}` : `Pages ${r.start}–${r.end}`,
    suffix: r.start === r.end ? `page-${r.start}` : `pages-${r.start}-${r.end}`,
    pages: flattenRanges([r]),
  }));
}
// --- end range parsing ---

function uniqueName(base: string, suffix: string, taken: Set<string>): string {
  let name = `${base}-${suffix}.pdf`;
  let n = 2;
  while (taken.has(name)) {
    name = `${base}-${suffix}-${n}.pdf`;
    n++;
  }
  taken.add(name);
  return name;
}

export default function SplitPdf() {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState<number>(0);
  const [mode, setMode] = useState<Mode>("ranges");
  const [pageRange, setPageRange] = useState<string>("");
  const [outputs, setOutputs] = useState<OutputFile[]>([]);
  const [progress, setProgress] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [done, setDone] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const outputsRef = useRef<OutputFile[]>([]);

  useEffect(() => {
    outputsRef.current = outputs;
  }, [outputs]);

  useEffect(() => {
    return () => {
      outputsRef.current.forEach((o) => URL.revokeObjectURL(o.url));
    };
  }, []);

  function clearOutputs() {
    outputsRef.current.forEach((o) => URL.revokeObjectURL(o.url));
    outputsRef.current = [];
    setOutputs([]);
  }

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    setError("");
    setDone("");
    setPageRange("");
    clearOutputs();
    try {
      const buffer = await f.arrayBuffer();
      const pdf = await PDFDocument.load(buffer);
      setFile(f);
      setPageCount(pdf.getPageCount());
    } catch {
      setFile(null);
      setPageCount(0);
      setError("Could not read that PDF. It may be corrupted or password-protected.");
    }
  }

  const liveError =
    pageCount > 0 && mode !== "every" && pageRange.trim()
      ? parseRanges(pageRange, pageCount).error
      : null;

  async function run() {
    if (!file) {
      setError("Please upload a PDF first.");
      return;
    }
    let ranges: PageRange[] = [];
    if (mode !== "every") {
      const parsed = parseRanges(pageRange, pageCount);
      if (parsed.error) {
        setError(parsed.error);
        return;
      }
      ranges = parsed.ranges;
    }
    setError("");
    setDone("");
    clearOutputs();
    const jobs = buildJobs(mode, ranges, pageCount);
    setProgress(`Building ${jobs.length} file${jobs.length === 1 ? "" : "s"}...`);
    try {
      const buffer = await file.arrayBuffer();
      const srcPdf = await PDFDocument.load(buffer);
      const base = file.name.replace(/\.pdf$/i, "") || "document";
      const taken = new Set<string>();
      const built: OutputFile[] = [];
      for (let i = 0; i < jobs.length; i++) {
        const job = jobs[i];
        setProgress(`Building file ${i + 1} of ${jobs.length}...`);
        const newPdf = await PDFDocument.create();
        const copied = await newPdf.copyPages(
          srcPdf,
          job.pages.map((p) => p - 1)
        );
        copied.forEach((p) => newPdf.addPage(p));
        const bytes = await newPdf.save();
        const blob = new Blob([bytes.buffer as ArrayBuffer], { type: "application/pdf" });
        built.push({
          name: uniqueName(base, job.suffix, taken),
          label: job.label,
          url: URL.createObjectURL(blob),
          pages: job.pages.length,
          size: blob.size,
        });
      }
      outputsRef.current = built;
      setOutputs(built);
      setProgress("");
      setDone(
        built.length === 1
          ? `1 PDF ready with ${built[0].pages} page(s).`
          : `${built.length} PDFs ready. Download them below.`
      );
    } catch (e) {
      setProgress("");
      setError("Failed to split: " + (e as Error).message);
    }
  }

  function download(out: OutputFile) {
    const a = document.createElement("a");
    a.href = out.url;
    a.download = out.name;
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  async function downloadAll() {
    for (const out of outputs) {
      download(out);
      await new Promise((r) => setTimeout(r, 400));
    }
  }

  const modes: { id: Mode; title: string; hint: string }[] = [
    { id: "ranges", title: "Split into separate PDFs", hint: "One file per range you list" },
    { id: "single", title: "Extract into one PDF", hint: "All listed pages, one file" },
    { id: "every", title: "Every page its own PDF", hint: "One file per page" },
  ];

  return (
    <div className="space-y-5">
      <div
        onClick={() => inputRef.current?.click()}
        className="border-2 border-dashed border-blue-300 dark:border-blue-600 rounded-xl p-8 text-center cursor-pointer hover:border-blue-500 transition-colors"
      >
        <div className="text-4xl mb-2">✂️</div>
        <p className="text-gray-600 dark:text-gray-300 font-medium">
          {file ? file.name : "Click to upload a PDF file"}
        </p>
        {pageCount > 0 && (
          <p className="text-sm text-blue-600 font-semibold mt-1">
            {pageCount} page{pageCount === 1 ? "" : "s"} detected — valid page numbers are 1 to {pageCount}
          </p>
        )}
        <input ref={inputRef} type="file" accept=".pdf,application/pdf" onChange={handleFile} className="hidden" />
      </div>

      {pageCount > 0 && (
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            What do you want to do?
          </label>
          <div className="grid gap-2 sm:grid-cols-3">
            {modes.map((m) => (
              <button
                key={m.id}
                onClick={() => {
                  setMode(m.id);
                  setError("");
                  setDone("");
                }}
                className={`text-left px-4 py-3 rounded-xl border transition-colors ${
                  mode === m.id
                    ? "bg-blue-600 border-blue-600 text-white"
                    : "bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:border-blue-400"
                }`}
              >
                <span className="block text-sm font-semibold">{m.title}</span>
                <span className={`block text-xs mt-0.5 ${mode === m.id ? "text-blue-100" : "text-gray-400"}`}>
                  {m.hint}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {pageCount > 0 && mode !== "every" && (
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {mode === "ranges" ? "Ranges to split out (one file each)" : "Pages to extract into one PDF"}
          </label>
          <input
            type="text"
            value={pageRange}
            onChange={(e) => {
              setPageRange(e.target.value);
              setError("");
              setDone("");
            }}
            placeholder={`e.g. 1-3, 5, 8-10 (this PDF has ${pageCount} pages)`}
            className={`w-full px-4 py-3 rounded-xl border bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 ${
              liveError
                ? "border-red-400 focus:ring-red-500"
                : "border-gray-200 dark:border-gray-600 focus:ring-blue-500"
            }`}
          />
          {liveError ? (
            <p className="text-xs text-red-600 dark:text-red-400 mt-1">⚠️ {liveError}</p>
          ) : (
            <p className="text-xs text-gray-400 mt-1">
              {mode === "ranges"
                ? "Separate ranges with commas. 1-3, 5, 8-10 produces three separate PDFs."
                : "Separate pages with commas, use a dash for ranges. All of them land in one PDF."}
            </p>
          )}
        </div>
      )}

      {pageCount > 0 && mode === "every" && (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          This creates {pageCount} single-page PDF{pageCount === 1 ? "" : "s"}, one per page.
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
        onClick={run}
        disabled={!file || !!progress || (mode !== "every" && !pageRange.trim())}
        className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-colors"
      >
        {progress
          ? "Working..."
          : mode === "every"
            ? "Split Every Page"
            : mode === "single"
              ? "Extract Pages"
              : "Split Into Separate PDFs"}
      </button>

      {outputs.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">
              {outputs.length} file{outputs.length === 1 ? "" : "s"} ready
            </p>
            {outputs.length > 1 && (
              <button
                onClick={downloadAll}
                className="px-4 py-2 text-sm font-semibold rounded-lg bg-green-600 hover:bg-green-700 text-white transition-colors"
              >
                ⬇ Download all
              </button>
            )}
          </div>
          <ul className="divide-y divide-gray-100 dark:divide-gray-700 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
            {outputs.map((out) => (
              <li
                key={out.url}
                className="flex items-center justify-between gap-3 px-4 py-3 bg-white dark:bg-gray-800"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-100 truncate">{out.label}</p>
                  <p className="text-xs text-gray-400 truncate">
                    {out.name} · {out.pages} page{out.pages === 1 ? "" : "s"} · {(out.size / 1024).toFixed(0)} KB
                  </p>
                </div>
                <button
                  onClick={() => download(out)}
                  className="shrink-0 px-3 py-2 text-sm font-semibold rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
                >
                  Download
                </button>
              </li>
            ))}
          </ul>
          {outputs.length > 1 && (
            <p className="text-xs text-gray-400">
              Download all saves the files one after another — your browser may ask once for permission to
              download multiple files.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
