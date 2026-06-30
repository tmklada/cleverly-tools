"use client";
import { useState, useRef } from "react";
import { PDFDocument } from "pdf-lib";

function formatSize(bytes: number): string {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(2) + " MB";
}

export default function CompressPdf() {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [result, setResult] = useState<{ originalSize: number; compressedSize: number; url: string } | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setError("");
    setResult(null);
  }

  async function compress() {
    if (!file) { setError("Please upload a PDF first."); return; }
    setError("");
    setResult(null);
    setProgress("Loading PDF...");
    try {
      const buffer = await file.arrayBuffer();
      setProgress("Compressing...");
      const pdf = await PDFDocument.load(buffer);
      const bytes = await pdf.save({ useObjectStreams: false });
      const blob = new Blob([bytes.buffer as ArrayBuffer], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      setResult({ originalSize: file.size, compressedSize: bytes.length, url });
      setProgress("");
    } catch (e) {
      setError("Failed to compress: " + (e as Error).message);
      setProgress("");
    }
  }

  function download() {
    if (!result) return;
    const a = document.createElement("a");
    a.href = result.url;
    a.download = "compressed.pdf";
    a.click();
  }

  const savings = result ? ((1 - result.compressedSize / result.originalSize) * 100).toFixed(1) : null;

  return (
    <div className="space-y-5">
      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-xl px-4 py-3 text-sm text-yellow-700 dark:text-yellow-300">
        ℹ️ Browser-based compression is limited. For best results with large files, use a dedicated PDF tool. This tool re-saves the PDF structure which may reduce file size in some cases.
      </div>

      <div
        onClick={() => inputRef.current?.click()}
        className="border-2 border-dashed border-blue-300 dark:border-blue-600 rounded-xl p-8 text-center cursor-pointer hover:border-blue-500 transition-colors"
      >
        <div className="text-4xl mb-2">🗜️</div>
        <p className="text-gray-600 dark:text-gray-300 font-medium">
          {file ? file.name : "Click to upload a PDF file"}
        </p>
        {file && (
          <p className="text-sm text-gray-400 mt-1">Original size: {formatSize(file.size)}</p>
        )}
        <input ref={inputRef} type="file" accept=".pdf,application/pdf" onChange={handleFile} className="hidden" />
      </div>

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

      {result && (
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-5 space-y-3">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4">
              <div className="text-sm text-gray-500 dark:text-gray-400">Original</div>
              <div className="text-xl font-bold text-gray-900 dark:text-white">{formatSize(result.originalSize)}</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4">
              <div className="text-sm text-gray-500 dark:text-gray-400">Compressed</div>
              <div className="text-xl font-bold text-gray-900 dark:text-white">{formatSize(result.compressedSize)}</div>
            </div>
          </div>
          <p className="text-center text-sm font-semibold">
            {parseFloat(savings!) > 0
              ? <span className="text-green-600">✅ Saved {savings}%</span>
              : <span className="text-gray-500">File size unchanged or slightly larger</span>}
          </p>
          <button
            onClick={download}
            className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition-colors"
          >
            Download Compressed PDF
          </button>
        </div>
      )}

      <button
        onClick={compress}
        disabled={!file || !!progress}
        className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-colors"
      >
        {progress ? "Compressing..." : "Compress PDF"}
      </button>
    </div>
  );
}
