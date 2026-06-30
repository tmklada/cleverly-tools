"use client";
import { useState, useRef } from "react";
import { PDFDocument } from "pdf-lib";

export default function MergePdf() {
  const [files, setFiles] = useState<File[]>([]);
  const [progress, setProgress] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [done, setDone] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFiles(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;
    const selected = Array.from(e.target.files).filter(f => f.type === "application/pdf");
    setFiles(prev => [...prev, ...selected]);
    setError("");
    setDone("");
  }

  function removeFile(idx: number) {
    setFiles(prev => prev.filter((_, i) => i !== idx));
  }

  function moveUp(idx: number) {
    if (idx === 0) return;
    setFiles(prev => {
      const arr = [...prev];
      [arr[idx - 1], arr[idx]] = [arr[idx], arr[idx - 1]];
      return arr;
    });
  }

  function moveDown(idx: number) {
    setFiles(prev => {
      if (idx >= prev.length - 1) return prev;
      const arr = [...prev];
      [arr[idx], arr[idx + 1]] = [arr[idx + 1], arr[idx]];
      return arr;
    });
  }

  async function merge() {
    if (files.length < 2) { setError("Please upload at least 2 PDF files."); return; }
    setError("");
    setDone("");
    try {
      const merged = await PDFDocument.create();
      for (let i = 0; i < files.length; i++) {
        setProgress(`Processing file ${i + 1} of ${files.length}...`);
        const buffer = await files[i].arrayBuffer();
        const pdf = await PDFDocument.load(buffer);
        const pages = await merged.copyPages(pdf, pdf.getPageIndices());
        pages.forEach(p => merged.addPage(p));
      }
      setProgress("Saving merged PDF...");
      const bytes = await merged.save();
      const blob = new Blob([bytes.buffer as ArrayBuffer], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "merged.pdf";
      a.click();
      URL.revokeObjectURL(url);
      setProgress("");
      setDone(`Done! Merged ${files.length} files successfully.`);
    } catch (e) {
      setError("Failed to merge: " + (e as Error).message);
      setProgress("");
    }
  }

  return (
    <div className="space-y-5">
      <div
        onClick={() => inputRef.current?.click()}
        className="border-2 border-dashed border-blue-300 dark:border-blue-600 rounded-xl p-8 text-center cursor-pointer hover:border-blue-500 transition-colors"
      >
        <div className="text-4xl mb-2">📄</div>
        <p className="text-gray-600 dark:text-gray-300 font-medium">Click to add PDF files</p>
        <p className="text-sm text-gray-400 mt-1">You can add multiple files</p>
        <input ref={inputRef} type="file" accept=".pdf,application/pdf" multiple onChange={handleFiles} className="hidden" />
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{files.length} file(s) — drag to reorder:</p>
          {files.map((f, i) => (
            <div key={i} className="flex items-center gap-2 bg-gray-50 dark:bg-gray-700 rounded-xl px-4 py-3">
              <span className="text-blue-600 font-bold text-sm w-6">{i + 1}</span>
              <span className="flex-1 text-sm text-gray-800 dark:text-gray-200 truncate">{f.name}</span>
              <span className="text-xs text-gray-400">{(f.size / 1024).toFixed(0)} KB</span>
              <button onClick={() => moveUp(i)} className="px-2 py-1 text-xs bg-gray-200 dark:bg-gray-600 rounded hover:bg-gray-300 dark:hover:bg-gray-500" title="Move up">↑</button>
              <button onClick={() => moveDown(i)} className="px-2 py-1 text-xs bg-gray-200 dark:bg-gray-600 rounded hover:bg-gray-300 dark:hover:bg-gray-500" title="Move down">↓</button>
              <button onClick={() => removeFile(i)} className="px-2 py-1 text-xs bg-red-100 dark:bg-red-900/30 text-red-600 rounded hover:bg-red-200">✕</button>
            </div>
          ))}
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
        onClick={merge}
        disabled={files.length < 2 || !!progress}
        className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-colors"
      >
        {progress ? "Processing..." : "Merge PDFs & Download"}
      </button>
    </div>
  );
}
