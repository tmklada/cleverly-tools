"use client";
import { useState, useRef, useEffect } from "react";

type Format = "image/jpeg" | "image/png" | "image/webp";

const FORMAT_LABELS: Record<Format, string> = {
  "image/jpeg": "JPG",
  "image/png": "PNG",
  "image/webp": "WebP",
};

const FORMAT_EXT: Record<Format, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

export default function ImageConverter() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [outputFormat, setOutputFormat] = useState<Format>("image/jpeg");
  const [quality, setQuality] = useState<number>(0.9);
  const [resultUrl, setResultUrl] = useState<string>("");
  const [resultSize, setResultSize] = useState<number>(0);
  const [error, setError] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      if (resultUrl) URL.revokeObjectURL(resultUrl);
    };
  }, [previewUrl, resultUrl]);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    const url = URL.createObjectURL(f);
    setFile(f);
    setPreviewUrl(url);
    setResultUrl("");
    setError("");
  }

  function convert() {
    if (!file || !canvasRef.current) return;
    setError("");
    const img = new Image();
    img.onload = () => {
      const canvas = canvasRef.current!;
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d")!;
      if (outputFormat === "image/jpeg") {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      ctx.drawImage(img, 0, 0);
      const q = (outputFormat === "image/png") ? 1 : quality;
      canvas.toBlob(blob => {
        if (!blob) { setError("Failed to convert image."); return; }
        if (resultUrl) URL.revokeObjectURL(resultUrl);
        setResultUrl(URL.createObjectURL(blob));
        setResultSize(blob.size);
      }, outputFormat, q);
    };
    img.onerror = () => setError("Failed to load image.");
    img.src = previewUrl;
  }

  function download() {
    if (!resultUrl || !file) return;
    const a = document.createElement("a");
    a.href = resultUrl;
    const baseName = file.name.replace(/\.[^/.]+$/, "");
    a.download = `${baseName}.${FORMAT_EXT[outputFormat]}`;
    a.click();
  }

  function formatSize(bytes: number) {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  }

  return (
    <div className="space-y-5">
      <canvas ref={canvasRef} className="hidden" />

      <div
        onClick={() => inputRef.current?.click()}
        className="border-2 border-dashed border-blue-300 dark:border-blue-600 rounded-xl p-8 text-center cursor-pointer hover:border-blue-500 transition-colors"
      >
        <div className="text-4xl mb-2">🔀</div>
        <p className="text-gray-600 dark:text-gray-300 font-medium">
          {file ? file.name : "Click to upload an image"}
        </p>
        {file && <p className="text-sm text-gray-400 mt-1">{formatSize(file.size)}</p>}
        <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp,image/gif,image/bmp" onChange={handleFile} className="hidden" />
      </div>

      {previewUrl && (
        <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-600 max-h-48 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
          <img src={previewUrl} alt="original" className="max-h-48 max-w-full object-contain" />
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Output Format</label>
        <div className="flex gap-3">
          {(Object.keys(FORMAT_LABELS) as Format[]).map(fmt => (
            <button
              key={fmt}
              onClick={() => setOutputFormat(fmt)}
              className={`flex-1 py-2.5 rounded-xl font-semibold text-sm transition-colors ${outputFormat === fmt ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"}`}
            >
              {FORMAT_LABELS[fmt]}
            </button>
          ))}
        </div>
      </div>

      {(outputFormat === "image/jpeg" || outputFormat === "image/webp") && (
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
        </div>
      )}

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 text-red-700 dark:text-red-400 rounded-xl px-4 py-3 text-sm">
          ⚠️ {error}
        </div>
      )}

      {resultUrl && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-xl p-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-green-700 dark:text-green-300">Converted successfully!</p>
            <p className="text-xs text-green-600 dark:text-green-400">{FORMAT_LABELS[outputFormat]} — {formatSize(resultSize)}</p>
          </div>
          <button onClick={download} className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl text-sm transition-colors">
            Download
          </button>
        </div>
      )}

      <button
        onClick={convert}
        disabled={!file}
        className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-colors"
      >
        Convert to {FORMAT_LABELS[outputFormat]}
      </button>
    </div>
  );
}
