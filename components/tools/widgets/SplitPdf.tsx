"use client";
import { useState, useRef } from "react";
import { PDFDocument } from "pdf-lib";

export default function SplitPdf() {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState<number>(0);
  const [pageRange, setPageRange] = useState<string>("");
  const [progress, setProgress] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [done, setDone] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    setError("");
    setDone("");
    setPageRange("");
    try {
      const buffer = await f.arrayBuffer();
      const pdf = await PDFDocument.load(buffer);
      setFile(f);
      setPageCount(pdf.getPageCount());
    } catch {
      setError("Could not read PDF file.");
    }
  }

  function parsePageRange(input: string, total: number): number[] {
    const pages: number[] = [];
    const parts = input.split(",");
    for (const part of parts) {
      const trimmed = part.trim();
      if (trimmed.includes("-")) {
        const [start, end] = trimmed.split("-").map(n => parseInt(n.trim(), 10));
        if (isNaN(start) || isNaN(end)) continue;
        for (let i = start; i <= Math.min(end, total); i++) {
          if (i >= 1) pages.push(i - 1);
        }
      } else {
        const n = parseInt(trimmed, 10);
        if (!isNaN(n) && n >= 1 && n <= total) pages.push(n - 1);
      }
    }
    return [...new Set(pages)].sort((a, b) => a - b);
  }

  async function extract() {
    if (!file) { setError("Please upload a PDF first."); return; }
    if (!pageRange.trim()) { setError("Please enter page numbers to extract."); return; }
    setError("");
    setDone("");
    setProgress("Extracting pages...");
    try {
      const buffer = await file.arrayBuffer();
      const srcPdf = await PDFDocument.load(buffer);
      const indices = parsePageRange(pageRange, pageCount);
      if (indices.length === 0) { setError("No valid pages found. Use format: 1,3,5-7"); setProgress(""); return; }
      const newPdf = await PDFDocument.create();
      const copiedPages = await newPdf.copyPages(srcPdf, indices);
      copiedPages.forEach(p => newPdf.addPage(p));
      const bytes = await newPdf.save();
      const blob = new Blob([bytes.buffer as ArrayBuffer], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "extracted-pages.pdf";
      a.click();
      URL.revokeObjectURL(url);
      setProgress("");
      setDone(`Extracted ${indices.length} page(s) successfully.`);
    } catch (e) {
      setError("Failed to extract: " + (e as Error).message);
      setProgress("");
    }
  }

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
          <p className="text-sm text-blue-600 font-semibold mt-1">{pageCount} pages detected</p>
        )}
        <input ref={inputRef} type="file" accept=".pdf,application/pdf" onChange={handleFile} className="hidden" />
      </div>

      {pageCount > 0 && (
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Pages to extract (e.g. 1,3,5-7)
          </label>
          <input
            type="text"
            value={pageRange}
            onChange={e => setPageRange(e.target.value)}
            placeholder={`e.g. 1,3,5-7 (max page: ${pageCount})`}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-xs text-gray-400 mt-1">Separate pages with commas. Use dash for ranges.</p>
        </div>
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
        onClick={extract}
        disabled={!file || !pageRange.trim() || !!progress}
        className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-colors"
      >
        {progress ? "Extracting..." : "Extract Pages & Download"}
      </button>
    </div>
  );
}
