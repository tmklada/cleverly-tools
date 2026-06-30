"use client";
import { useState, useRef, useEffect } from "react";

export default function ImageResizer() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [origW, setOrigW] = useState<number>(0);
  const [origH, setOrigH] = useState<number>(0);
  const [targetW, setTargetW] = useState<string>("");
  const [targetH, setTargetH] = useState<string>("");
  const [keepRatio, setKeepRatio] = useState<boolean>(true);
  const [resizedUrl, setResizedUrl] = useState<string>("");
  const [error, setError] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      if (resizedUrl) URL.revokeObjectURL(resizedUrl);
    };
  }, [previewUrl, resizedUrl]);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    const url = URL.createObjectURL(f);
    const img = new Image();
    img.onload = () => {
      setFile(f);
      setPreviewUrl(url);
      setOrigW(img.naturalWidth);
      setOrigH(img.naturalHeight);
      setTargetW(String(img.naturalWidth));
      setTargetH(String(img.naturalHeight));
      setResizedUrl("");
      setError("");
    };
    img.src = url;
  }

  function handleWidthChange(val: string) {
    setTargetW(val);
    if (keepRatio && origW && origH) {
      const w = parseInt(val, 10);
      if (!isNaN(w) && w > 0) {
        setTargetH(String(Math.round((w / origW) * origH)));
      }
    }
  }

  function handleHeightChange(val: string) {
    setTargetH(val);
    if (keepRatio && origW && origH) {
      const h = parseInt(val, 10);
      if (!isNaN(h) && h > 0) {
        setTargetW(String(Math.round((h / origH) * origW)));
      }
    }
  }

  function resize() {
    if (!file || !canvasRef.current) return;
    const w = parseInt(targetW, 10);
    const h = parseInt(targetH, 10);
    if (!w || !h || w <= 0 || h <= 0) { setError("Please enter valid width and height."); return; }
    setError("");
    const img = new Image();
    img.onload = () => {
      const canvas = canvasRef.current!;
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0, w, h);
      canvas.toBlob(blob => {
        if (!blob) { setError("Failed to resize image."); return; }
        if (resizedUrl) URL.revokeObjectURL(resizedUrl);
        const url = URL.createObjectURL(blob);
        setResizedUrl(url);
      }, file.type || "image/png");
    };
    img.src = previewUrl;
  }

  function download() {
    if (!resizedUrl || !file) return;
    const a = document.createElement("a");
    a.href = resizedUrl;
    const ext = file.name.split(".").pop() || "png";
    a.download = `resized.${ext}`;
    a.click();
  }

  return (
    <div className="space-y-5">
      <canvas ref={canvasRef} className="hidden" />

      <div
        onClick={() => inputRef.current?.click()}
        className="border-2 border-dashed border-blue-300 dark:border-blue-600 rounded-xl p-8 text-center cursor-pointer hover:border-blue-500 transition-colors"
      >
        <div className="text-4xl mb-2">🖼️</div>
        <p className="text-gray-600 dark:text-gray-300 font-medium">
          {file ? file.name : "Click to upload an image (JPG, PNG, WebP)"}
        </p>
        {origW > 0 && <p className="text-sm text-blue-600 mt-1">{origW} × {origH} px</p>}
        <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp" onChange={handleFile} className="hidden" />
      </div>

      {previewUrl && (
        <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-600 max-h-48 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
          <img src={previewUrl} alt="preview" className="max-h-48 max-w-full object-contain" />
        </div>
      )}

      {file && (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Width (px)</label>
              <input
                type="number"
                value={targetW}
                onChange={e => handleWidthChange(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Height (px)</label>
              <input
                type="number"
                value={targetH}
                onChange={e => handleHeightChange(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={keepRatio} onChange={e => setKeepRatio(e.target.checked)} className="w-4 h-4 accent-blue-600" />
            <span className="text-sm text-gray-700 dark:text-gray-300">Maintain aspect ratio</span>
          </label>
        </div>
      )}

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 text-red-700 dark:text-red-400 rounded-xl px-4 py-3 text-sm">
          ⚠️ {error}
        </div>
      )}

      {resizedUrl && (
        <div className="rounded-xl overflow-hidden border border-green-200 dark:border-green-700 max-h-48 flex items-center justify-center bg-green-50 dark:bg-green-900/10">
          <img src={resizedUrl} alt="resized" className="max-h-48 max-w-full object-contain" />
        </div>
      )}

      <div className="flex gap-3">
        <button
          onClick={resize}
          disabled={!file}
          className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-colors"
        >
          Resize Image
        </button>
        {resizedUrl && (
          <button
            onClick={download}
            className="flex-1 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition-colors"
          >
            Download
          </button>
        )}
      </div>
    </div>
  );
}
