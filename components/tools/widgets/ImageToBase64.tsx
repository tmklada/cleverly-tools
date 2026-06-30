"use client";
import { useState, useRef } from "react";

export default function ImageToBase64() {
  const [file, setFile] = useState<File | null>(null);
  const [base64, setBase64] = useState<string>("");
  const [dataUrl, setDataUrl] = useState<string>("");
  const [copied, setCopied] = useState<"base64" | "dataurl" | null>(null);
  const [error, setError] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    setError("");
    setFile(f);
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setDataUrl(result);
      const b64 = result.split(",")[1] || "";
      setBase64(b64);
    };
    reader.onerror = () => setError("Failed to read file.");
    reader.readAsDataURL(f);
  }

  function copy(type: "base64" | "dataurl") {
    const text = type === "base64" ? base64 : dataUrl;
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  }

  function formatSize(bytes: number) {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  }

  return (
    <div className="space-y-5">
      <div
        onClick={() => inputRef.current?.click()}
        className="border-2 border-dashed border-blue-300 dark:border-blue-600 rounded-xl p-8 text-center cursor-pointer hover:border-blue-500 transition-colors"
      >
        <div className="text-4xl mb-2">🔤</div>
        <p className="text-gray-600 dark:text-gray-300 font-medium">
          {file ? file.name : "Click to upload an image"}
        </p>
        {file && <p className="text-sm text-gray-400 mt-1">{formatSize(file.size)}</p>}
        <input ref={inputRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 text-red-700 dark:text-red-400 rounded-xl px-4 py-3 text-sm">
          ⚠️ {error}
        </div>
      )}

      {dataUrl && (
        <>
          <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-600 max-h-40 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
            <img src={dataUrl} alt="preview" className="max-h-40 max-w-full object-contain" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Base64 String</label>
              <button
                onClick={() => copy("base64")}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${copied === "base64" ? "bg-green-600 text-white" : "bg-blue-600 hover:bg-blue-700 text-white"}`}
              >
                {copied === "base64" ? "✓ Copied!" : "Copy"}
              </button>
            </div>
            <textarea
              value={base64}
              readOnly
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-xs resize-none"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Data URL (for HTML/CSS)</label>
              <button
                onClick={() => copy("dataurl")}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${copied === "dataurl" ? "bg-green-600 text-white" : "bg-blue-600 hover:bg-blue-700 text-white"}`}
              >
                {copied === "dataurl" ? "✓ Copied!" : "Copy"}
              </button>
            </div>
            <textarea
              value={dataUrl}
              readOnly
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-xs resize-none"
            />
          </div>

          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
            Base64 length: {base64.length.toLocaleString()} characters (~{formatSize(base64.length * 0.75)})
          </div>
        </>
      )}
    </div>
  );
}
