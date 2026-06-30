"use client";
import { useState, useRef, useCallback } from "react";

interface PickedColor {
  hex: string;
  r: number;
  g: number;
  b: number;
  h: number;
  s: number;
  l: number;
}

function rgbToHex(r: number, g: number, b: number): string {
  return "#" + [r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("");
}

function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  const rn = r / 255, gn = g / 255, bn = b / 255;
  const max = Math.max(rn, gn, bn), min = Math.min(rn, gn, bn);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case rn: h = ((gn - bn) / d + (gn < bn ? 6 : 0)) / 6; break;
      case gn: h = ((bn - rn) / d + 2) / 6; break;
      case bn: h = ((rn - gn) / d + 4) / 6; break;
    }
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

export default function ImageColorPicker() {
  const [imageUrl, setImageUrl] = useState("");
  const [pickedColor, setPickedColor] = useState<PickedColor | null>(null);
  const [history, setHistory] = useState<PickedColor[]>([]);
  const [copiedField, setCopiedField] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setImageUrl(url);
    setPickedColor(null);
  };

  const drawImageToCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const img = imgRef.current;
    if (!canvas || !img) return;
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(img, 0, 0);
  }, []);

  const handleCanvasClick = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = Math.floor((e.clientX - rect.left) * scaleX);
    const y = Math.floor((e.clientY - rect.top) * scaleY);

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const pixel = ctx.getImageData(x, y, 1, 1).data;
    const [r, g, b] = [pixel[0], pixel[1], pixel[2]];
    const hex = rgbToHex(r, g, b);
    const { h, s, l } = rgbToHsl(r, g, b);
    const color: PickedColor = { hex, r, g, b, h, s, l };
    setPickedColor(color);
    setHistory((prev) => [color, ...prev.filter((c) => c.hex !== hex)].slice(0, 10));
  }, []);

  const copy = async (text: string, field: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(""), 2000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {!imageUrl ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500 p-16 text-center cursor-pointer transition-colors"
        >
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
          <p className="text-5xl mb-3">🎨</p>
          <p className="text-gray-700 dark:text-gray-300 font-medium">Upload an image to pick colors</p>
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Click anywhere on the image to get the color</p>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div className="relative">
            <img
              ref={imgRef}
              src={imageUrl}
              alt="Color picker source"
              onLoad={drawImageToCanvas}
              className="hidden"
              crossOrigin="anonymous"
            />
            <canvas
              ref={canvasRef}
              onClick={handleCanvasClick}
              className="w-full rounded-lg cursor-crosshair max-h-72 object-contain"
              style={{ display: "block" }}
            />
          </div>
          <button onClick={() => fileInputRef.current?.click()} className="mt-3 text-sm text-blue-600 dark:text-blue-400 hover:underline">
            Change image
          </button>
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
        </div>
      )}

      {pickedColor && (
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="font-bold text-gray-900 dark:text-white mb-4">Picked Color</h3>
          <div className="flex items-center gap-6">
            <div
              className="w-24 h-24 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 shrink-0"
              style={{ backgroundColor: pickedColor.hex }}
            />
            <div className="flex-1 space-y-3">
              {[
                { label: "HEX", value: pickedColor.hex.toUpperCase(), key: "hex" },
                { label: "RGB", value: `rgb(${pickedColor.r}, ${pickedColor.g}, ${pickedColor.b})`, key: "rgb" },
                { label: "HSL", value: `hsl(${pickedColor.h}, ${pickedColor.s}%, ${pickedColor.l}%)`, key: "hsl" },
              ].map(({ label, value, key }) => (
                <div key={key} className="flex items-center justify-between gap-3 bg-gray-50 dark:bg-gray-800 rounded-lg px-3 py-2">
                  <div>
                    <span className="text-xs font-bold text-gray-400 dark:text-gray-500 mr-3">{label}</span>
                    <span className="font-mono text-sm text-gray-900 dark:text-white">{value}</span>
                  </div>
                  <button onClick={() => copy(value, key)} className="text-xs px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors">
                    {copiedField === key ? "✓" : "Copy"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {history.length > 0 && (
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="font-bold text-gray-900 dark:text-white mb-4">Color History (last 10)</h3>
          <div className="flex flex-wrap gap-3">
            {history.map((c, i) => (
              <div key={i} className="group relative cursor-pointer" onClick={() => setPickedColor(c)}>
                <div
                  className="w-10 h-10 rounded-lg shadow border border-gray-200 dark:border-gray-700 hover:scale-110 transition-transform"
                  style={{ backgroundColor: c.hex }}
                  title={c.hex.toUpperCase()}
                />
                <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-xs text-gray-500 dark:text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {c.hex.toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
