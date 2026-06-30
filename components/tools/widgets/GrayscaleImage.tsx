"use client";
import { useState, useRef, useCallback } from "react";

type Filter = "grayscale" | "sepia" | "invert";

const FILTERS: { key: Filter; label: string }[] = [
  { key: "grayscale", label: "Grayscale" },
  { key: "sepia", label: "Sepia" },
  { key: "invert", label: "Invert" },
];

function applyFilter(imageData: ImageData, filter: Filter): ImageData {
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    if (filter === "grayscale") {
      const gray = 0.299 * r + 0.587 * g + 0.114 * b;
      data[i] = data[i + 1] = data[i + 2] = gray;
    } else if (filter === "sepia") {
      data[i] = Math.min(255, r * 0.393 + g * 0.769 + b * 0.189);
      data[i + 1] = Math.min(255, r * 0.349 + g * 0.686 + b * 0.168);
      data[i + 2] = Math.min(255, r * 0.272 + g * 0.534 + b * 0.131);
    } else if (filter === "invert") {
      data[i] = 255 - r;
      data[i + 1] = 255 - g;
      data[i + 2] = 255 - b;
    }
  }
  return imageData;
}

export default function GrayscaleImage() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [filteredUrl, setFilteredUrl] = useState("");
  const [activeFilter, setActiveFilter] = useState<Filter>("grayscale");
  const [fileName, setFileName] = useState("image");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processImage = useCallback((file: File, filter: Filter) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      ctx.putImageData(applyFilter(imageData, filter), 0, 0);
      setFilteredUrl(canvas.toDataURL("image/png"));
      URL.revokeObjectURL(url);
    };
    img.src = url;
  }, []);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name.replace(/\.[^.]+$/, ""));
    setOriginalUrl(URL.createObjectURL(file));
    processImage(file, activeFilter);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setFileName(file.name.replace(/\.[^.]+$/, ""));
      setOriginalUrl(URL.createObjectURL(file));
      processImage(file, activeFilter);
    }
  };

  const changeFilter = (filter: Filter) => {
    setActiveFilter(filter);
    if (!originalUrl) return;
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      ctx.putImageData(applyFilter(imageData, filter), 0, 0);
      setFilteredUrl(canvas.toDataURL("image/png"));
    };
    img.src = originalUrl;
  };

  const download = () => {
    if (!filteredUrl) return;
    const a = document.createElement("a");
    a.href = filteredUrl;
    a.download = `${fileName}-${activeFilter}.png`;
    a.click();
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {!originalUrl ? (
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => fileInputRef.current?.click()}
          className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500 p-16 text-center cursor-pointer transition-colors"
        >
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
          <p className="text-5xl mb-3">🎨</p>
          <p className="text-gray-700 dark:text-gray-300 font-medium">Upload or drag & drop an image</p>
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">PNG, JPEG, WebP supported</p>
        </div>
      ) : (
        <>
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-gray-900 dark:text-white">Filter</h3>
              <div className="flex gap-2">
                {FILTERS.map((f) => (
                  <button
                    key={f.key}
                    onClick={() => changeFilter(f.key)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeFilter === f.key
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Original</h4>
              <img src={originalUrl} alt="Original" className="w-full rounded-lg object-contain max-h-64" />
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3 capitalize">{activeFilter}</h4>
              {filteredUrl && <img src={filteredUrl} alt="Filtered" className="w-full rounded-lg object-contain max-h-64" />}
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex-1 py-2.5 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-medium transition-colors"
            >
              Change Image
            </button>
            <button
              onClick={download}
              disabled={!filteredUrl}
              className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl font-medium transition-colors"
            >
              Download PNG
            </button>
          </div>
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
        </>
      )}
    </div>
  );
}
