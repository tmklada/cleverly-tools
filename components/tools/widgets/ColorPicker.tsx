"use client";
import { useState, useCallback } from "react";

interface Rgb {
  r: number;
  g: number;
  b: number;
}

function clamp(n: number, min: number, max: number) {
  return Math.min(Math.max(n, min), max);
}

function hexToRgb(hex: string): Rgb {
  const clean = hex.replace("#", "");
  const bigint = parseInt(clean, 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255,
  };
}

function rgbToHex(r: number, g: number, b: number): string {
  const to2 = (n: number) => clamp(Math.round(n), 0, 255).toString(16).padStart(2, "0");
  return `#${to2(r)}${to2(g)}${to2(b)}`;
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

function hslToRgb(h: number, s: number, l: number): Rgb {
  const hn = ((h % 360) + 360) % 360 / 360;
  const sn = clamp(s, 0, 100) / 100;
  const ln = clamp(l, 0, 100) / 100;
  if (sn === 0) {
    const v = Math.round(ln * 255);
    return { r: v, g: v, b: v };
  }
  const q = ln < 0.5 ? ln * (1 + sn) : ln + sn - ln * sn;
  const p = 2 * ln - q;
  const channel = (t: number) => {
    let tn = t;
    if (tn < 0) tn += 1;
    if (tn > 1) tn -= 1;
    if (tn < 1 / 6) return p + (q - p) * 6 * tn;
    if (tn < 1 / 2) return q;
    if (tn < 2 / 3) return p + (q - p) * (2 / 3 - tn) * 6;
    return p;
  };
  return {
    r: Math.round(channel(hn + 1 / 3) * 255),
    g: Math.round(channel(hn) * 255),
    b: Math.round(channel(hn - 1 / 3) * 255),
  };
}

function rgbToHsv(r: number, g: number, b: number): { h: number; s: number; v: number } {
  const rn = r / 255, gn = g / 255, bn = b / 255;
  const max = Math.max(rn, gn, bn), min = Math.min(rn, gn, bn);
  const d = max - min;
  let h = 0;
  if (d !== 0) {
    switch (max) {
      case rn: h = ((gn - bn) / d + (gn < bn ? 6 : 0)) / 6; break;
      case gn: h = ((bn - rn) / d + 2) / 6; break;
      case bn: h = ((rn - gn) / d + 4) / 6; break;
    }
  }
  return {
    h: Math.round(h * 360),
    s: Math.round((max === 0 ? 0 : d / max) * 100),
    v: Math.round(max * 100),
  };
}

/** Forgiving HEX parser: #abc, abc, #aabbcc, aabbcc, #abcd, #aabbccdd. */
function parseHex(input: string): { rgb: Rgb; alpha: number } | null {
  const raw = input.trim().replace(/^#/, "");
  if (!/^[0-9a-fA-F]+$/.test(raw)) return null;
  let hex6: string;
  let alpha = 1;
  if (raw.length === 3) {
    hex6 = raw.split("").map((c) => c + c).join("");
  } else if (raw.length === 4) {
    const expanded = raw.split("").map((c) => c + c);
    hex6 = expanded.slice(0, 3).join("");
    alpha = parseInt(expanded[3], 16) / 255;
  } else if (raw.length === 6) {
    hex6 = raw;
  } else if (raw.length === 8) {
    hex6 = raw.slice(0, 6);
    alpha = parseInt(raw.slice(6, 8), 16) / 255;
  } else {
    return null;
  }
  return { rgb: hexToRgb(hex6), alpha };
}

/** Forgiving RGB parser: rgb(1,2,3), rgba(1 2 3 / 50%), "1, 2, 3". */
function parseRgb(input: string): { rgb: Rgb; alpha: number } | null {
  const body = input.trim().replace(/^rgba?\s*\(/i, "").replace(/\)\s*$/, "");
  const parts = body.split(/[\s,/]+/).filter(Boolean);
  if (parts.length < 3 || parts.length > 4) return null;
  const nums = parts.slice(0, 3).map((p) => {
    if (p.endsWith("%")) return (parseFloat(p) / 100) * 255;
    return parseFloat(p);
  });
  if (nums.some((n) => Number.isNaN(n) || n < 0 || n > 255)) return null;
  let alpha = 1;
  if (parts.length === 4) {
    const a = parts[3].endsWith("%") ? parseFloat(parts[3]) / 100 : parseFloat(parts[3]);
    if (Number.isNaN(a) || a < 0 || a > 1) return null;
    alpha = a;
  }
  return {
    rgb: { r: Math.round(nums[0]), g: Math.round(nums[1]), b: Math.round(nums[2]) },
    alpha,
  };
}

/** Forgiving HSL parser: hsl(210, 60%, 50%), hsla(210 60% 50% / 0.5), "210, 60, 50". */
function parseHsl(input: string): { rgb: Rgb; alpha: number } | null {
  const body = input.trim().replace(/^hsla?\s*\(/i, "").replace(/\)\s*$/, "");
  const parts = body.split(/[\s,/]+/).filter(Boolean);
  if (parts.length < 3 || parts.length > 4) return null;
  const h = parseFloat(parts[0].replace(/deg$/i, ""));
  const s = parseFloat(parts[1]);
  const l = parseFloat(parts[2]);
  if ([h, s, l].some((n) => Number.isNaN(n))) return null;
  if (s < 0 || s > 100 || l < 0 || l > 100) return null;
  let alpha = 1;
  if (parts.length === 4) {
    const a = parts[3].endsWith("%") ? parseFloat(parts[3]) / 100 : parseFloat(parts[3]);
    if (Number.isNaN(a) || a < 0 || a > 1) return null;
    alpha = a;
  }
  return { rgb: hslToRgb(h, s, l), alpha };
}

type FieldKey = "hex" | "rgb" | "hsl";

export default function ColorPicker() {
  const [color, setColor] = useState<string>("#3b82f6");
  const [alpha, setAlpha] = useState<number>(1);
  const [recent, setRecent] = useState<string[]>(["#3b82f6"]);
  const [copied, setCopied] = useState<string | null>(null);
  const [drafts, setDrafts] = useState<Record<FieldKey, string | null>>({
    hex: null,
    rgb: null,
    hsl: null,
  });
  const [errors, setErrors] = useState<Record<FieldKey, string | null>>({
    hex: null,
    rgb: null,
    hsl: null,
  });

  const { r, g, b } = hexToRgb(color);
  const { h, s, l } = rgbToHsl(r, g, b);
  const hsv = rgbToHsv(r, g, b);
  const alphaHex = clamp(Math.round(alpha * 255), 0, 255).toString(16).padStart(2, "0");

  const canonical: Record<FieldKey, string> = {
    hex: color.toUpperCase(),
    rgb: `rgb(${r}, ${g}, ${b})`,
    hsl: `hsl(${h}, ${s}%, ${l}%)`,
  };

  const applyColor = useCallback((hex: string, nextAlpha?: number) => {
    const normalized = hex.toLowerCase();
    setColor(normalized);
    if (nextAlpha !== undefined) setAlpha(nextAlpha);
    setDrafts({ hex: null, rgb: null, hsl: null });
    setErrors({ hex: null, rgb: null, hsl: null });
    setRecent((prev) => [normalized, ...prev.filter((c) => c !== normalized)].slice(0, 10));
  }, []);

  function handleField(key: FieldKey, value: string) {
    setDrafts((prev) => ({ ...prev, [key]: value }));
    if (value.trim() === "") {
      setErrors((prev) => ({ ...prev, [key]: null }));
      return;
    }
    const parser = key === "hex" ? parseHex : key === "rgb" ? parseRgb : parseHsl;
    const parsed = parser(value);
    if (!parsed) {
      const hint =
        key === "hex"
          ? "Try #abc, #aabbcc or #aabbccdd."
          : key === "rgb"
            ? "Try rgb(51, 102, 204) or 51, 102, 204."
            : "Try hsl(220, 60%, 50%) or 220, 60%, 50%.";
      setErrors((prev) => ({ ...prev, [key]: `Not a valid ${key.toUpperCase()} value. ${hint}` }));
      return;
    }
    setErrors((prev) => ({ ...prev, [key]: null }));
    const hex = rgbToHex(parsed.rgb.r, parsed.rgb.g, parsed.rgb.b).toLowerCase();
    setColor(hex);
    setAlpha(parsed.alpha);
    // Keep the field the user is typing in untouched; refresh the other two.
    setDrafts((prev) => ({
      hex: key === "hex" ? prev.hex : null,
      rgb: key === "rgb" ? prev.rgb : null,
      hsl: key === "hsl" ? prev.hsl : null,
    }));
  }

  function copy(value: string, key: string) {
    navigator.clipboard.writeText(value);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  }

  const alphaLabel = alpha === 1 ? "1" : String(Math.round(alpha * 100) / 100);

  const formats = [
    { label: "HEX", value: color.toUpperCase(), key: "hex-out" },
    { label: "HEX8", value: `${color.toUpperCase()}${alphaHex.toUpperCase()}`, key: "hex8-out" },
    { label: "RGB", value: `rgb(${r}, ${g}, ${b})`, key: "rgb-out" },
    { label: "RGBA", value: `rgba(${r}, ${g}, ${b}, ${alphaLabel})`, key: "rgba-out" },
    { label: "HSL", value: `hsl(${h}, ${s}%, ${l}%)`, key: "hsl-out" },
    { label: "HSV", value: `hsv(${hsv.h}, ${hsv.s}%, ${hsv.v}%)`, key: "hsv-out" },
  ];

  const fields: { key: FieldKey; label: string; placeholder: string }[] = [
    { key: "hex", label: "HEX", placeholder: "#3366cc" },
    { key: "rgb", label: "RGB", placeholder: "rgb(51, 102, 204)" },
    { key: "hsl", label: "HSL", placeholder: "hsl(220, 60%, 50%)" },
  ];

  return (
    <div className="space-y-5">
      <div className="flex flex-col items-center gap-4">
        <div
          className="w-full h-32 rounded-2xl border border-gray-200 dark:border-gray-600 shadow-inner"
          style={{ backgroundColor: `rgba(${r}, ${g}, ${b}, ${alpha})` }}
        />
        <input
          type="color"
          value={color}
          onChange={e => applyColor(e.target.value)}
          className="w-20 h-12 rounded-xl cursor-pointer border-2 border-gray-200 dark:border-gray-600 bg-transparent"
          title="Pick a color"
        />
      </div>

      {/* Type or paste a value in any format */}
      <div className="space-y-3">
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Type or paste a color value
        </p>
        {fields.map(({ key, label, placeholder }) => (
          <div key={key}>
            <div className="flex items-center gap-3">
              <label
                htmlFor={`color-input-${key}`}
                className="w-10 text-xs font-bold text-gray-500 dark:text-gray-400"
              >
                {label}
              </label>
              <input
                id={`color-input-${key}`}
                type="text"
                spellCheck={false}
                value={drafts[key] ?? canonical[key]}
                onChange={(e) => handleField(key, e.target.value)}
                onBlur={() => {
                  setDrafts((prev) => ({ ...prev, [key]: null }));
                  setErrors((prev) => ({ ...prev, [key]: null }));
                  setRecent((prev) => [color, ...prev.filter((c) => c !== color)].slice(0, 10));
                }}
                placeholder={placeholder}
                aria-invalid={errors[key] ? true : undefined}
                className={`flex-1 px-4 py-2 rounded-xl border bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm focus:outline-none focus:ring-2 ${
                  errors[key]
                    ? "border-red-400 focus:ring-red-500"
                    : "border-gray-200 dark:border-gray-600 focus:ring-blue-500"
                }`}
              />
            </div>
            {errors[key] && (
              <p className="text-xs text-red-500 mt-1 pl-[3.25rem]">{errors[key]}</p>
            )}
          </div>
        ))}
        <div className="flex items-center gap-3">
          <label
            htmlFor="color-alpha"
            className="w-10 text-xs font-bold text-gray-500 dark:text-gray-400"
          >
            ALPHA
          </label>
          <input
            id="color-alpha"
            type="range"
            min={0}
            max={100}
            value={Math.round(alpha * 100)}
            onChange={(e) => setAlpha(parseInt(e.target.value, 10) / 100)}
            className="flex-1 accent-blue-600"
          />
          <span className="w-12 text-right text-xs font-mono text-gray-600 dark:text-gray-300">
            {Math.round(alpha * 100)}%
          </span>
        </div>
      </div>

      {/* Every output format, each with its own copy button */}
      <div className="space-y-3">
        {formats.map(({ label, value, key }) => (
          <div key={key} className="flex items-center gap-3">
            <span className="w-12 text-xs font-bold text-gray-500 dark:text-gray-400">{label}</span>
            <div className="flex-1 px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm overflow-x-auto whitespace-nowrap">
              {value}
            </div>
            <button
              onClick={() => copy(value, key)}
              aria-label={`Copy ${label} value`}
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
                onClick={() => applyColor(c)}
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
          <div className="font-bold text-red-500">{r}</div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-3">
          <div className="text-xs text-gray-400">Green</div>
          <div className="font-bold text-green-500">{g}</div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-3">
          <div className="text-xs text-gray-400">Blue</div>
          <div className="font-bold text-blue-500">{b}</div>
        </div>
      </div>
    </div>
  );
}
