"use client";
import { useState } from "react";

type Corner = "tl" | "tr" | "br" | "bl";

interface Corners {
  tl: number;
  tr: number;
  br: number;
  bl: number;
}

const presets = [
  { name: "Square", values: { tl: 0, tr: 0, br: 0, bl: 0 } },
  { name: "Slight", values: { tl: 8, tr: 8, br: 8, bl: 8 } },
  { name: "Rounded", values: { tl: 16, tr: 16, br: 16, bl: 16 } },
  { name: "Pill", values: { tl: 9999, tr: 9999, br: 9999, bl: 9999 } },
  { name: "Circle", values: { tl: 50, tr: 50, br: 50, bl: 50 } },
  { name: "Leaf", values: { tl: 0, tr: 50, br: 0, bl: 50 } },
  { name: "Blob", values: { tl: 60, tr: 20, br: 60, bl: 20 } },
  { name: "Chat", values: { tl: 16, tr: 16, br: 4, bl: 16 } },
];

const cornerLabels: { key: Corner; label: string }[] = [
  { key: "tl", label: "Top Left" },
  { key: "tr", label: "Top Right" },
  { key: "br", label: "Bottom Right" },
  { key: "bl", label: "Bottom Left" },
];

export default function BorderRadiusGenerator() {
  const [linked, setLinked] = useState(true);
  const [corners, setCorners] = useState<Corners>({ tl: 16, tr: 16, br: 16, bl: 16 });
  const [unit, setUnit] = useState<"px" | "%">("px");
  const [color, setColor] = useState("#6366f1");
  const [copied, setCopied] = useState(false);

  function updateCorner(key: Corner, value: number) {
    if (linked) {
      setCorners({ tl: value, tr: value, br: value, bl: value });
    } else {
      setCorners(prev => ({ ...prev, [key]: value }));
    }
  }

  function applyPreset(preset: typeof presets[0]) {
    setLinked(false);
    setCorners(preset.values);
  }

  const { tl, tr, br, bl } = corners;
  const borderRadius = tl === tr && tr === br && br === bl
    ? `${tl}${unit}`
    : `${tl}${unit} ${tr}${unit} ${br}${unit} ${bl}${unit}`;

  const css = `border-radius: ${borderRadius};`;

  function copy() {
    navigator.clipboard.writeText(css);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const maxVal = unit === "%" ? 50 : 200;

  return (
    <div className="space-y-5">
      {/* Live Preview */}
      <div className="flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-xl p-10">
        <div
          className="w-36 h-36 transition-all"
          style={{ borderRadius, backgroundColor: color }}
        />
      </div>

      {/* Controls */}
      <div className="flex gap-3 flex-wrap items-center">
        <div className="flex gap-1">
          {(["px", "%"] as const).map(u => (
            <button key={u} onClick={() => setUnit(u)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${unit === u ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"}`}>
              {u}
            </button>
          ))}
        </div>
        <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700 dark:text-gray-300">
          <input type="checkbox" checked={linked} onChange={e => setLinked(e.target.checked)} className="w-4 h-4 accent-blue-600" />
          Link all corners
        </label>
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-700 dark:text-gray-300">Color</label>
          <input type="color" value={color} onChange={e => setColor(e.target.value)}
            className="w-9 h-9 rounded-lg border border-gray-200 dark:border-gray-600 cursor-pointer p-0.5 bg-transparent" />
        </div>
      </div>

      {/* Corner sliders */}
      <div className="space-y-3">
        {cornerLabels.map(({ key, label }) => (
          <div key={key}>
            <label className="text-sm text-gray-700 dark:text-gray-300 flex justify-between mb-1">
              <span>{label}</span>
              <span className="font-mono text-blue-600">{corners[key]}{unit}</span>
            </label>
            <input type="range" min={0} max={maxVal} value={corners[key]}
              onChange={e => updateCorner(key, Number(e.target.value))}
              className="w-full accent-blue-600" />
          </div>
        ))}
      </div>

      {/* Presets */}
      <div>
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Presets</p>
        <div className="grid grid-cols-4 gap-2">
          {presets.map(p => (
            <button key={p.name} onClick={() => applyPreset(p)}
              className="py-2 text-xs font-medium bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors">
              {p.name}
            </button>
          ))}
        </div>
      </div>

      {/* CSS output */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">CSS Code</p>
          <button onClick={copy} className="text-xs px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
        <div className="bg-gray-900 text-green-400 text-sm p-4 rounded-xl font-mono">
          {css}
        </div>
      </div>
    </div>
  );
}
