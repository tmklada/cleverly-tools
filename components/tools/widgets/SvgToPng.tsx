"use client";
import { useState, useRef, useCallback } from "react";

export default function SvgToPng() {
  const [svgCode, setSvgCode] = useState("");
  const [width, setWidth] = useState("800");
  const [height, setHeight] = useState("600");
  const [previewUrl, setPreviewUrl] = useState("");
  const [pngUrl, setPngUrl] = useState("");
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const parseDimensions = (svg: string) => {
    const wMatch = svg.match(/width="(\d+)/);
    const hMatch = svg.match(/height="(\d+)/);
    const vbMatch = svg.match(/viewBox="[\d.]+ [\d.]+ ([\d.]+) ([\d.]+)/);
    if (wMatch) setWidth(wMatch[1]);
    if (hMatch) setHeight(hMatch[1]);
    if (!wMatch && vbMatch) { setWidth(vbMatch[1]); setHeight(vbMatch[2]); }
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result as string;
      setSvgCode(text);
      parseDimensions(text);
      const blob = new Blob([text], { type: "image/svg+xml" });
      setPreviewUrl(URL.createObjectURL(blob));
      setPngUrl("");
      setError("");
    };
    reader.readAsText(file);
  };

  const handleSvgCode = (code: string) => {
    setSvgCode(code);
    parseDimensions(code);
    const blob = new Blob([code], { type: "image/svg+xml" });
    setPreviewUrl(URL.createObjectURL(blob));
    setPngUrl("");
  };

  const convert = useCallback(() => {
    if (!svgCode) { setError("Please provide SVG code or upload a file."); return; }
    setError("");

    const w = parseInt(width) || 800;
    const h = parseInt(height) || 600;

    const img = new Image();
    img.crossOrigin = "anonymous";
    const blob = new Blob([svgCode], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(img, 0, 0, w, h);
      URL.revokeObjectURL(url);
      setPngUrl(canvas.toDataURL("image/png"));
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      setError("Invalid SVG. Please check the code.");
    };

    img.src = url;
  }, [svgCode, width, height]);

  const download = () => {
    if (!pngUrl) return;
    const a = document.createElement("a");
    a.href = pngUrl;
    a.download = "converted.png";
    a.click();
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="font-bold text-gray-900 dark:text-white mb-4">SVG to PNG Converter</h3>

        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 text-center cursor-pointer hover:border-blue-400 dark:hover:border-blue-500 transition-colors mb-4"
        >
          <input ref={fileInputRef} type="file" accept=".svg,image/svg+xml" onChange={handleFile} className="hidden" />
          <p className="text-gray-500 dark:text-gray-400">Click to upload SVG file</p>
        </div>

        <p className="text-center text-sm text-gray-400 dark:text-gray-500 mb-3">— or paste SVG code —</p>

        <textarea
          value={svgCode}
          onChange={(e) => handleSvgCode(e.target.value)}
          rows={6}
          placeholder='<svg xmlns="http://www.w3.org/2000/svg" ...>...</svg>'
          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm resize-none"
        />

        <div className="flex gap-4 mt-4">
          <div className="flex-1">
            <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Width (px)</label>
            <input type="number" value={width} onChange={(e) => setWidth(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="flex-1">
            <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Height (px)</label>
            <input type="number" value={height} onChange={(e) => setHeight(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>

        {error && <p className="mt-3 text-sm text-red-500">{error}</p>}

        <button
          onClick={convert}
          disabled={!svgCode}
          className="mt-4 w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl font-bold transition-colors"
        >
          Convert to PNG
        </button>
      </div>

      {(previewUrl || pngUrl) && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {previewUrl && (
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">SVG Preview</h4>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden flex items-center justify-center" style={{ minHeight: 150 }}>
                <img src={previewUrl} alt="SVG preview" className="max-w-full max-h-48 object-contain" />
              </div>
            </div>
          )}
          {pngUrl && (
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">PNG Output</h4>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden flex items-center justify-center" style={{ minHeight: 150 }}>
                <img src={pngUrl} alt="PNG output" className="max-w-full max-h-48 object-contain" />
              </div>
              <button onClick={download} className="mt-3 w-full py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors">
                Download PNG
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
