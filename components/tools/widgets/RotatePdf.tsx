"use client";
import { useState, useRef } from "react";
import { PDFDocument, degrees } from "pdf-lib";

export default function RotatePdf() {
  const [file, setFile] = useState<File | null>(null);
  const [rotation, setRotation] = useState<90 | 180 | 270>(90);
  const [progress, setProgress] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [done, setDone] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setError("");
    setDone("");
  }

  async function rotatePdf() {
    if (!file) { setError("Please upload a PDF first."); return; }
    setError("");
    setDone("");
    setProgress("Rotating pages...");
    try {
      const buffer = await file.arrayBuffer();
      const pdf = await PDFDocument.load(buffer);
      const pages = pdf.getPages();
      pages.forEach(page => {
        page.setRotation(degrees(rotation));
      });
      const bytes = await pdf.save();
      const blob = new Blob([bytes.buffer as ArrayBuffer], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "rotated.pdf";
      a.click();
      URL.revokeObjectURL(url);
      setProgress("");
      setDone(`All ${pages.length} page(s) rotated ${rotation}° successfully.`);
    } catch (e) {
      setError("Failed to rotate: " + (e as Error).message);
      setProgress("");
    }
  }

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
        {file && (
          <p className="text-sm text-gray-400 mt-1">{(file.size / 1024).toFixed(0)} KB</p>
        )}
        <input ref={inputRef} type="file" accept=".pdf,application/pdf" onChange={handleFile} className="hidden" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Rotation Angle (applied to all pages)
        </label>
        <div className="flex gap-3">
          {([90, 180, 270] as const).map(deg => (
            <button
              key={deg}
              onClick={() => setRotation(deg)}
              className={`flex-1 py-3 rounded-xl font-semibold text-sm transition-colors ${rotation === deg ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"}`}
            >
              {deg === 90 ? "↻ 90°" : deg === 180 ? "↺↻ 180°" : "↺ 270°"}
            </button>
          ))}
        </div>
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

      {done && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 text-green-700 dark:text-green-400 rounded-xl px-4 py-3 text-sm">
          ✅ {done}
        </div>
      )}

      <button
        onClick={rotatePdf}
        disabled={!file || !!progress}
        className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-colors"
      >
        {progress ? "Rotating..." : `Rotate PDF ${rotation}° & Download`}
      </button>
    </div>
  );
}
