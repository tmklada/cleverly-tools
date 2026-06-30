"use client";
import { useState } from "react";

interface Shadow {
  id: number;
  h: number;
  v: number;
  blur: number;
  spread: number;
  color: string;
  opacity: number;
  inset: boolean;
}

function toRgba(hex: string, opacity: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity / 100})`;
}

function shadowToString(s: Shadow): string {
  const color = toRgba(s.color, s.opacity);
  return `${s.inset ? "inset " : ""}${s.h}px ${s.v}px ${s.blur}px ${s.spread}px ${color}`;
}

export default function BoxShadowGenerator() {
  const [shadows, setShadows] = useState<Shadow[]>([
    { id: 1, h: 0, v: 4, blur: 12, spread: 0, color: "#000000", opacity: 15, inset: false },
  ]);
  const [copied, setCopied] = useState(false);

  const shadowCss = shadows.map(shadowToString).join(", ");
  const cssProperty = `box-shadow: ${shadowCss};`;

  function addShadow() {
    setShadows(prev => [...prev, { id: Date.now(), h: 0, v: 4, blur: 12, spread: 0, color: "#000000", opacity: 15, inset: false }]);
  }

  function removeShadow(id: number) {
    setShadows(prev => prev.filter(s => s.id !== id));
  }

  function updateShadow(id: number, field: keyof Shadow, value: number | string | boolean) {
    setShadows(prev => prev.map(s => s.id === id ? { ...s, [field]: value } : s));
  }

  function copy() {
    navigator.clipboard.writeText(cssProperty);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const sliderCls = "w-full accent-blue-600";
  const labelCls = "text-xs text-gray-500 dark:text-gray-400 block mb-1";

  return (
    <div className="space-y-5">
      {/* Live Preview */}
      <div className="flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-xl p-10">
        <div
          className="w-36 h-36 bg-white dark:bg-gray-200 rounded-xl transition-all"
          style={{ boxShadow: shadowCss }}
        />
      </div>

      {/* Shadow layers */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Shadow Layers</p>
          <button onClick={addShadow} className="text-xs text-blue-600 hover:text-blue-700 dark:text-blue-400">+ Add Layer</button>
        </div>

        {shadows.map((s, idx) => (
          <div key={s.id} className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Layer {idx + 1}</span>
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-400 cursor-pointer">
                  <input type="checkbox" checked={s.inset} onChange={e => updateShadow(s.id, "inset", e.target.checked)}
                    className="w-3.5 h-3.5 accent-blue-600" />
                  Inset
                </label>
                {shadows.length > 1 && (
                  <button onClick={() => removeShadow(s.id)} className="text-red-400 hover:text-red-600 text-xs">Remove</button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelCls}>Horizontal: {s.h}px</label>
                <input type="range" min={-50} max={50} value={s.h} onChange={e => updateShadow(s.id, "h", Number(e.target.value))} className={sliderCls} />
              </div>
              <div>
                <label className={labelCls}>Vertical: {s.v}px</label>
                <input type="range" min={-50} max={50} value={s.v} onChange={e => updateShadow(s.id, "v", Number(e.target.value))} className={sliderCls} />
              </div>
              <div>
                <label className={labelCls}>Blur: {s.blur}px</label>
                <input type="range" min={0} max={100} value={s.blur} onChange={e => updateShadow(s.id, "blur", Number(e.target.value))} className={sliderCls} />
              </div>
              <div>
                <label className={labelCls}>Spread: {s.spread}px</label>
                <input type="range" min={-20} max={50} value={s.spread} onChange={e => updateShadow(s.id, "spread", Number(e.target.value))} className={sliderCls} />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div>
                <label className={labelCls}>Color</label>
                <input type="color" value={s.color} onChange={e => updateShadow(s.id, "color", e.target.value)}
                  className="w-10 h-9 rounded-lg border border-gray-200 dark:border-gray-600 cursor-pointer p-0.5 bg-transparent" />
              </div>
              <div className="flex-1">
                <label className={labelCls}>Opacity: {s.opacity}%</label>
                <input type="range" min={0} max={100} value={s.opacity} onChange={e => updateShadow(s.id, "opacity", Number(e.target.value))} className={sliderCls} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CSS Output */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">CSS Code</p>
          <button onClick={copy} className="text-xs px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
        <div className="bg-gray-900 text-green-400 text-sm p-4 rounded-xl font-mono break-all">
          {cssProperty}
        </div>
      </div>
    </div>
  );
}
