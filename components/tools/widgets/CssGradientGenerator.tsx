"use client";
import { useState } from "react";

interface ColorStop {
  id: number;
  color: string;
  position: number;
}

type GradientType = "linear" | "radial" | "conic";

const presets = [
  { name: "Sunset", stops: [{ color: "#ff6b6b", position: 0 }, { color: "#feca57", position: 50 }, { color: "#ff9ff3", position: 100 }] },
  { name: "Ocean", stops: [{ color: "#0652DD", position: 0 }, { color: "#1289A7", position: 50 }, { color: "#C4E538", position: 100 }] },
  { name: "Forest", stops: [{ color: "#134e5e", position: 0 }, { color: "#71b280", position: 100 }] },
  { name: "Purple", stops: [{ color: "#8360c3", position: 0 }, { color: "#2ebf91", position: 100 }] },
  { name: "Fire", stops: [{ color: "#f12711", position: 0 }, { color: "#f5af19", position: 100 }] },
  { name: "Night", stops: [{ color: "#0f0c29", position: 0 }, { color: "#302b63", position: 50 }, { color: "#24243e", position: 100 }] },
];

export default function CssGradientGenerator() {
  const [type, setType] = useState<GradientType>("linear");
  const [angle, setAngle] = useState(135);
  const [stops, setStops] = useState<ColorStop[]>([
    { id: 1, color: "#6366f1", position: 0 },
    { id: 2, color: "#8b5cf6", position: 100 },
  ]);
  const [copied, setCopied] = useState(false);

  function addStop() {
    const newPos = stops.length > 0 ? Math.round((stops[stops.length - 1].position + stops[0].position) / 2) : 50;
    setStops(prev => [...prev, { id: Date.now(), color: "#ffffff", position: newPos }].sort((a, b) => a.position - b.position));
  }

  function removeStop(id: number) {
    if (stops.length <= 2) return;
    setStops(prev => prev.filter(s => s.id !== id));
  }

  function updateStop(id: number, field: "color" | "position", value: string | number) {
    setStops(prev => prev.map(s => s.id === id ? { ...s, [field]: value } : s).sort((a, b) => a.position - b.position));
  }

  function applyPreset(preset: typeof presets[0]) {
    setStops(preset.stops.map((s, i) => ({ ...s, id: i + 1 })));
  }

  const stopsStr = stops.map(s => `${s.color} ${s.position}%`).join(", ");

  let gradient = "";
  if (type === "linear") gradient = `linear-gradient(${angle}deg, ${stopsStr})`;
  else if (type === "radial") gradient = `radial-gradient(circle, ${stopsStr})`;
  else gradient = `conic-gradient(from ${angle}deg, ${stopsStr})`;

  const css = `background: ${gradient};`;

  function copy() {
    navigator.clipboard.writeText(css);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="space-y-5">
      {/* Type selector */}
      <div className="flex gap-2">
        {(["linear", "radial", "conic"] as const).map(t => (
          <button key={t} onClick={() => setType(t)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${type === t ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"}`}>
            {t}
          </button>
        ))}
      </div>

      {/* Live preview */}
      <div className="h-32 rounded-xl transition-all" style={{ background: gradient }} />

      {/* Angle (linear/conic only) */}
      {(type === "linear" || type === "conic") && (
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Angle: {angle}°
          </label>
          <input type="range" min={0} max={360} value={angle} onChange={e => setAngle(Number(e.target.value))}
            className="w-full accent-blue-600" />
        </div>
      )}

      {/* Color stops */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Color Stops</p>
          <button onClick={addStop} className="text-xs text-blue-600 hover:text-blue-700 dark:text-blue-400">+ Add Stop</button>
        </div>
        {stops.map((stop) => (
          <div key={stop.id} className="flex items-center gap-3">
            <input type="color" value={stop.color} onChange={e => updateStop(stop.id, "color", e.target.value)}
              className="w-10 h-10 rounded-lg border border-gray-200 dark:border-gray-600 cursor-pointer p-0.5 bg-transparent" />
            <div className="text-xs text-gray-500 dark:text-gray-400 w-12">{stop.color}</div>
            <input type="range" min={0} max={100} value={stop.position} onChange={e => updateStop(stop.id, "position", Number(e.target.value))}
              className="flex-1 accent-blue-600" />
            <span className="text-xs text-gray-500 dark:text-gray-400 w-8">{stop.position}%</span>
            <button onClick={() => removeStop(stop.id)} disabled={stops.length <= 2}
              className="text-gray-400 hover:text-red-500 disabled:opacity-30 transition-colors text-xs">✕</button>
          </div>
        ))}
      </div>

      {/* Presets */}
      <div>
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Presets</p>
        <div className="grid grid-cols-3 gap-2">
          {presets.map(preset => (
            <button key={preset.name} onClick={() => applyPreset(preset)}
              className="h-10 rounded-lg text-xs font-medium text-white shadow-sm hover:scale-105 transition-transform"
              style={{ background: `linear-gradient(135deg, ${preset.stops.map(s => `${s.color} ${s.position}%`).join(", ")})` }}>
              {preset.name}
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
