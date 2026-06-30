"use client";
import { useState } from "react";

const PRESETS = [
  { label: "16:9", w: 16, h: 9 },
  { label: "4:3", w: 4, h: 3 },
  { label: "1:1", w: 1, h: 1 },
  { label: "21:9", w: 21, h: 9 },
  { label: "9:16", w: 9, h: 16 },
  { label: "3:2", w: 3, h: 2 },
];

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

function simplifyRatio(w: number, h: number): [number, number] {
  const d = gcd(Math.round(w), Math.round(h));
  return [Math.round(w) / d, Math.round(h) / d];
}

export default function AspectRatioCalculator() {
  const [width, setWidth] = useState<string>("1920");
  const [height, setHeight] = useState<string>("1080");
  const [newWidth, setNewWidth] = useState<string>("");
  const [newHeight, setNewHeight] = useState<string>("");

  const w = parseFloat(width) || 0;
  const h = parseFloat(height) || 0;

  const [rw, rh] = w && h ? simplifyRatio(w, h) : [0, 0];
  const ratio = h ? w / h : 0;
  const decimalRatio = ratio ? ratio.toFixed(4) : "—";

  const calcNewHeight = () => {
    const nw = parseFloat(newWidth);
    if (nw && ratio) setNewHeight((nw / ratio).toFixed(2));
  };

  const calcNewWidth = () => {
    const nh = parseFloat(newHeight);
    if (nh && ratio) setNewWidth((nh * ratio).toFixed(2));
  };

  const applyPreset = (pw: number, ph: number) => {
    setWidth(String(pw * 100));
    setHeight(String(ph * 100));
    setNewWidth("");
    setNewHeight("");
  };

  const previewW = 240;
  const previewH = ratio ? Math.round(previewW / ratio) : 0;
  const cappedH = Math.min(previewH, 180);
  const cappedW = cappedH < previewH ? Math.round(cappedH * ratio) : previewW;

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="font-bold text-gray-900 dark:text-white mb-4">Aspect Ratio Calculator</h3>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Width</label>
            <input
              type="number"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Height</label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {w && h ? (
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">{rw}:{rh}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Simplified Ratio</p>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-purple-700 dark:text-purple-300">{decimalRatio}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Decimal Ratio</p>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 text-center col-span-1">
              <div
                className="bg-blue-400 dark:bg-blue-500 rounded mx-auto"
                style={{ width: `${cappedW}px`, height: `${cappedH}px`, maxWidth: "100%" }}
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Preview</p>
            </div>
          </div>
        ) : null}

        <div className="flex flex-wrap gap-2 mb-6">
          {PRESETS.map((p) => (
            <button
              key={p.label}
              onClick={() => applyPreset(p.w, p.h)}
              className="px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg transition-colors"
            >
              {p.label}
            </button>
          ))}
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Resize Calculator</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">New Width → calc Height</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={newWidth}
                  onChange={(e) => { setNewWidth(e.target.value); setNewHeight(""); }}
                  placeholder="Width"
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
                <button onClick={calcNewHeight} className="px-3 py-2 bg-blue-600 text-white rounded-lg text-sm">Calc</button>
              </div>
            </div>
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">New Height → calc Width</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={newHeight}
                  onChange={(e) => { setNewHeight(e.target.value); setNewWidth(""); }}
                  placeholder="Height"
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
                <button onClick={calcNewWidth} className="px-3 py-2 bg-blue-600 text-white rounded-lg text-sm">Calc</button>
              </div>
            </div>
          </div>
          {(newWidth || newHeight) && (
            <div className="mt-3 bg-green-50 dark:bg-green-900/20 rounded-xl p-3 text-center">
              <p className="font-bold text-green-700 dark:text-green-300">
                {parseFloat(newWidth) > 0 ? `${newWidth} × ${newHeight}` : `${newWidth} × ${newHeight}`}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
