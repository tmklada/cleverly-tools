"use client";
import { useState, useRef } from "react";
import imageCompression from "browser-image-compression";

function formatSize(bytes: number): string {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(2) + " MB";
}

export default function ImageCompressor() {
  const [file, setFile] = useState<File | null>(null);
  const [quality, setQuality] = useState<number>(0.8);
  const [compressing, setCompressing] = useState<boolean>(false);
  const [result, setResult] = useState<{ url: string; size: number; name: string } | null>(null);
  const [error, setError] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setResult(null);
    setError("");
  }

  async function compress() {
    if (!file) { setError("Please upload an image first."); return; }
    setCompressing(true);
    setError("");
    setResult(null);
    try {
      const options = {
        maxSizeMB: 100,
        initialQuality: quality,
        useWebWorker: true,
        alwaysKeepResolution: true,
      };
      const compressed = await imageCompression(file, options);
      const url = URL.createObjectURL(compressed);
      setResult({ url, size: compressed.size, name: compressed.name });
    } catch (e) {
      setError("Compression failed: " + (e as Error).message);
    } finally {
      setCompressing(false);
    }
  }

  function download() {
    if (!result) return;
    const a = document.createElement("a");
    a.href = result.url;
    a.download = `compressed-${result.name}`;
    a.click();
  }

  const savings = result && file ? ((1 - result.size / file.size) * 100).toFixed(1) : null;

  return (
    <div className="space-y-5">
      <div
        onClick={() => inputRef.current?.click()}
        className="border-2 border-dashed border-blue-300 dark:border-blue-600 rounded-xl p-8 text-center cursor-pointer hover:border-blue-500 transition-colors"
      >
        <div className="text-4xl mb-2">🗜️</div>
        <p className="text-gray-600 dark:text-gray-300 font-medium">
          {file ? file.name : "Click to upload an image (JPG, PNG, WebP)"}
        </p>
        {file && <p className="text-sm text-gray-400 mt-1">Size: {formatSize(file.size)}</p>}
        <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp" onChange={handleFile} className="hidden" />
      </div>

      <div>
        <label className="flex justify-between text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          <span>Quality</span>
          <span className="text-blue-600 font-bold">{Math.round(quality * 100)}%</span>
        </label>
        <input
          type="range" min={0.1} max={1} step={0.05} value={quality}
          onChange={e => setQuality(parseFloat(e.target.value))}
          className="w-full accent-blue-600"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>Smaller file</span>
          <span>Higher quality</span>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 text-red-700 dark:text-red-400 rounded-xl px-4 py-3 text-sm">
          ⚠️ {error}
        </div>
      )}

      {result && file && (
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-5 space-y-3">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4">
              <div className="text-sm text-gray-500 dark:text-gray-400">Original</div>
              <div className="text-xl font-bold text-gray-900 dark:text-white">{formatSize(file.size)}</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4">
              <div className="text-sm text-gray-500 dark:text-gray-400">Compressed</div>
              <div className="text-xl font-bold text-gray-900 dark:text-white">{formatSize(result.size)}</div>
            </div>
          </div>
          {savings && parseFloat(savings) > 0 && (
            <p className="text-center text-sm font-semibold text-green-600">✅ Saved {savings}%</p>
          )}
          <button onClick={download} className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition-colors">
            Download Compressed Image
          </button>
        </div>
      )}

      <button
        onClick={compress}
        disabled={!file || compressing}
        className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-colors"
      >
        {compressing ? "Compressing..." : "Compress Image"}
      </button>
    </div>
  );
}
