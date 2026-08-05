"use client";

import { useState, useRef, useCallback } from "react";

export default function BackgroundRemover() {
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(async (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file (JPG, PNG, WebP).");
      return;
    }

    setError("");
    setResultUrl(null);
    setProgress(0);
    setFileName(file.name);

    // Show original
    const reader = new FileReader();
    reader.onload = (e) => setOriginalUrl(e.target?.result as string);
    reader.readAsDataURL(file);

    setLoading(true);
    try {
      const { removeBackground } = await import("@imgly/background-removal");

      const blob = await removeBackground(file, {
        progress: (key: string, current: number, total: number) => {
          setProgress(Math.round((current / total) * 100));
        },
        model: "isnet_quint8",
        output: { format: "image/png" },
      });

      setResultUrl(URL.createObjectURL(blob));
    } catch (e) {
      setError("Failed to process image. Please try a different image.");
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }

  function download() {
    if (!resultUrl) return;
    const a = document.createElement("a");
    a.href = resultUrl;
    a.download = fileName.replace(/\.[^.]+$/, "") + "-no-bg.png";
    a.click();
  }

  return (
    <div className="space-y-5">
      {/* Upload Area */}
      {!originalUrl && (
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => fileRef.current?.click()}
          className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-2xl p-12 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-all"
        >
          <div className="text-5xl mb-4">🖼️</div>
          <div className="font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Drop your image here or click to upload
          </div>
          <div className="text-sm text-gray-400">Supports JPG, PNG, WebP — up to 10MB</div>
          <div className="text-xs text-gray-400 mt-2">🔒 Processed entirely in your browser — never uploaded</div>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
          />
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
            <span>🤖 Removing background with AI...</span>
            <span className="font-semibold">{progress}%</span>
          </div>
          <div className="h-3 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-gray-400">First run downloads the AI model (~10MB). Subsequent runs are instant.</p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 text-red-700 dark:text-red-400 rounded-xl px-4 py-3 text-sm">
          ⚠️ {error}
        </div>
      )}

      {/* Before / After */}
      {originalUrl && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="text-sm font-semibold text-gray-600 dark:text-gray-400">Original</div>
            <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={originalUrl} alt="Original" className="w-full object-contain max-h-64" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-sm font-semibold text-gray-600 dark:text-gray-400">
              {resultUrl ? "✅ Background Removed" : loading ? "Processing..." : "Result will appear here"}
            </div>
            <div
              className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 min-h-[200px] flex items-center justify-center"
              style={{ background: "repeating-conic-gradient(#f0f0f0 0% 25%, #ffffff 0% 50%) 0 0 / 20px 20px" }}
            >
              {resultUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={resultUrl} alt="No background" className="w-full object-contain max-h-64" />
              ) : (
                <span className="text-gray-300 text-4xl">{loading ? "⏳" : "🖼️"}</span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Actions */}
      {(originalUrl || resultUrl) && (
        <div className="flex flex-wrap gap-3">
          {resultUrl && (
            <button
              onClick={download}
              className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition-colors"
            >
              ⬇ Download PNG (No Background)
            </button>
          )}
          <button
            onClick={() => {
              setOriginalUrl(null);
              setResultUrl(null);
              setProgress(0);
              setError("");
              if (fileRef.current) fileRef.current.value = "";
            }}
            className="px-6 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 font-semibold rounded-xl transition-colors"
          >
            Try Another Image
          </button>
        </div>
      )}
    </div>
  );
}
