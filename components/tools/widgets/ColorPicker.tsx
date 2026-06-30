"use client";
import { useState, useCallback } from "react";

interface ColorValues {
  hex: string;
  r: number;
  g: number;
  b: number;
  h: number;
  s: number;
  l: number;
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const clean = hex.replace("#", "");
  const bigint = parseInt(clean, 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255,
  };
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
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

function computeColor(hex: string): ColorValues {
  const { r, g, b } = hexToRgb(hex);
  const { h, s, l } = rgbToHsl(r, g, b);
  return { hex, r, g, b, h, s, l };
}

export default function ColorPicker() {
  const [color, setColor] = useState<string>("#3B82F6");
  const [recent, setRecent] = useState<string[]>(["#3B82F6"]);
  const [copied, setCopied] = useState<string | null>(null);

  const cv = computeColor(color);

  const handleChange = useCallback((hex: string) => {
    setColor(hex);
    setRecent(prev => {
      const filtered = prev.filter(c => c !== hex);
      return [hex, ...filtered].slice(0, 10);
    });
  }, []);

  function copy(value: string, key: string) {
    navigator.clipboard.writeText(value);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  }

  const formats = [
    { label: "HEX", value: cv.hex.toUpperCase(), key: "hex" },
    { label: "RGB", value: `rgb(${cv.r}, ${cv.g}, ${cv.b})`, key: "rgb" },
    { label: "HSL", value: `hsl(${cv.h}, ${cv.s}%, ${cv.l}%)`, key: "hsl" },
  ];

  return (
    <div className="space-y-5">
      <div className="flex flex-col items-center gap-4">
        <div
          className="w-full h-32 rounded-2xl border border-gray-200 dark:border-gray-600 shadow-inner"
          style={{ backgroundColor: color }}
        />
        <input
          type="color"
          value={color}
          onChange={e => handleChange(e.target.value)}
          className="w-20 h-12 rounded-xl cursor-pointer border-2 border-gray-200 dark:border-gray-600 bg-transparent"
          title="Pick a color"
        />
      </div>

      <div className="space-y-3">
        {formats.map(({ label, value, key }) => (
          <div key={key} className="flex items-center gap-3">
            <span className="w-10 text-xs font-bold text-gray-500 dark:text-gray-400">{label}</span>
            <div className="flex-1 px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm">
              {value}
            </div>
            <button
              onClick={() => copy(value, key)}
              className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${copied === key ? "bg-green-600 text-white" : "bg-blue-600 hover:bg-blue-700 text-white"}`}
            >
              {copied === key ? "✓" : "Copy"}
            </button>
          </div>
        ))}
      </div>

      {recent.length > 0 && (
        <div>
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Recently picked</p>
          <div className="flex flex-wrap gap-2">
            {recent.map((c, i) => (
              <button
                key={i}
                onClick={() => handleChange(c)}
                title={c}
                className="w-10 h-10 rounded-xl border-2 transition-transform hover:scale-110 shadow"
                style={{ backgroundColor: c, borderColor: c === color ? "#3B82F6" : "transparent" }}
              />
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-3 gap-3 text-center text-sm">
        <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-3">
          <div className="text-xs text-gray-400">Red</div>
          <div className="font-bold text-red-500">{cv.r}</div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-3">
          <div className="text-xs text-gray-400">Green</div>
          <div className="font-bold text-green-500">{cv.g}</div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-3">
          <div className="text-xs text-gray-400">Blue</div>
          <div className="font-bold text-blue-500">{cv.b}</div>
        </div>
      </div>
    </div>
  );
}
