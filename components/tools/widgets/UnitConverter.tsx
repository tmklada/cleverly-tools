"use client";
import { useState } from "react";

type Category =
  | "Length"
  | "Weight"
  | "Temperature"
  | "Time"
  | "Volume"
  | "Area"
  | "Speed"
  | "Digital Storage";

interface Unit {
  label: string;
  /** Convert a value in this unit INTO the category's base unit. */
  toBase: (v: number) => number;
  /** Convert a value in the category's base unit INTO this unit. */
  fromBase: (v: number) => number;
}

/** Most units are a plain ratio against the base unit. */
function ratio(factor: number): Pick<Unit, "toBase" | "fromBase"> {
  return { toBase: (v) => v * factor, fromBase: (v) => v / factor };
}

/** Units with an offset (temperature scales) supply their own pair of functions. */
function affine(scale: number, offset: number): Pick<Unit, "toBase" | "fromBase"> {
  // value_in_base = (v - offset) * scale
  return { toBase: (v) => (v - offset) * scale, fromBase: (v) => v / scale + offset };
}

const UNITS: Record<Category, { base: string; note?: string; units: Unit[] }> = {
  Length: {
    base: "meters",
    units: [
      { label: "Kilometer (km)", ...ratio(1000) },
      { label: "Meter (m)", ...ratio(1) },
      { label: "Centimeter (cm)", ...ratio(0.01) },
      { label: "Millimeter (mm)", ...ratio(0.001) },
      { label: "Mile (mi)", ...ratio(1609.344) },
      { label: "Yard (yd)", ...ratio(0.9144) },
      { label: "Foot (ft)", ...ratio(0.3048) },
      { label: "Inch (in)", ...ratio(0.0254) },
      { label: "Nautical Mile", ...ratio(1852) },
    ],
  },
  Weight: {
    base: "kilograms",
    units: [
      { label: "Metric Ton (t)", ...ratio(1000) },
      { label: "Kilogram (kg)", ...ratio(1) },
      { label: "Gram (g)", ...ratio(0.001) },
      { label: "Milligram (mg)", ...ratio(0.000001) },
      { label: "Pound (lb)", ...ratio(0.45359237) },
      { label: "Ounce (oz)", ...ratio(0.028349523) },
      { label: "Stone (st)", ...ratio(6.35029318) },
    ],
  },
  Temperature: {
    base: "Celsius",
    note: "Temperature scales use offsets, not ratios — 0 °C is 32 °F, not 0 °F.",
    units: [
      { label: "Celsius (°C)", ...affine(1, 0) },
      { label: "Fahrenheit (°F)", ...affine(5 / 9, 32) },
      { label: "Kelvin (K)", ...affine(1, 273.15) },
      { label: "Rankine (°R)", ...affine(5 / 9, 491.67) },
    ],
  },
  Time: {
    base: "seconds",
    note: "Months and years use the average Gregorian calendar length (1 year = 365.2425 days).",
    units: [
      { label: "Millisecond (ms)", ...ratio(0.001) },
      { label: "Second (s)", ...ratio(1) },
      { label: "Minute (min)", ...ratio(60) },
      { label: "Hour (h)", ...ratio(3600) },
      { label: "Day (d)", ...ratio(86400) },
      { label: "Week (wk)", ...ratio(604800) },
      { label: "Month (avg)", ...ratio(2629746) },
      { label: "Year (avg)", ...ratio(31556952) },
    ],
  },
  Volume: {
    base: "liters",
    units: [
      { label: "Cubic Meter (m³)", ...ratio(1000) },
      { label: "Liter (L)", ...ratio(1) },
      { label: "Milliliter (mL)", ...ratio(0.001) },
      { label: "US Gallon", ...ratio(3.785411784) },
      { label: "US Quart", ...ratio(0.946352946) },
      { label: "US Pint", ...ratio(0.473176473) },
      { label: "US Cup", ...ratio(0.2365882365) },
      { label: "US Fluid Ounce", ...ratio(0.0295735296) },
      { label: "Imperial Gallon", ...ratio(4.54609) },
      { label: "Tablespoon (US)", ...ratio(0.0147867648) },
      { label: "Teaspoon (US)", ...ratio(0.00492892159) },
    ],
  },
  Area: {
    base: "square meters",
    units: [
      { label: "Square Kilometer (km²)", ...ratio(1e6) },
      { label: "Square Meter (m²)", ...ratio(1) },
      { label: "Square Centimeter (cm²)", ...ratio(0.0001) },
      { label: "Hectare (ha)", ...ratio(10000) },
      { label: "Acre", ...ratio(4046.8564224) },
      { label: "Square Mile (mi²)", ...ratio(2589988.110336) },
      { label: "Square Yard (yd²)", ...ratio(0.83612736) },
      { label: "Square Foot (ft²)", ...ratio(0.09290304) },
      { label: "Square Inch (in²)", ...ratio(0.00064516) },
    ],
  },
  Speed: {
    base: "m/s",
    units: [
      { label: "Meter/Second (m/s)", ...ratio(1) },
      { label: "Kilometer/Hour (km/h)", ...ratio(0.27777778) },
      { label: "Mile/Hour (mph)", ...ratio(0.44704) },
      { label: "Knot (kn)", ...ratio(0.51444444) },
      { label: "Foot/Second (ft/s)", ...ratio(0.3048) },
    ],
  },
  "Digital Storage": {
    base: "bytes",
    note: "Decimal (SI) units: 1 KB = 1,000 bytes, 1 MB = 1,000 KB — the convention used by storage manufacturers and macOS.",
    units: [
      { label: "Byte (B)", ...ratio(1) },
      { label: "Kilobyte (KB)", ...ratio(1000) },
      { label: "Megabyte (MB)", ...ratio(1000 ** 2) },
      { label: "Gigabyte (GB)", ...ratio(1000 ** 3) },
      { label: "Terabyte (TB)", ...ratio(1000 ** 4) },
    ],
  },
};

const CATEGORIES: Category[] = [
  "Length",
  "Weight",
  "Temperature",
  "Time",
  "Volume",
  "Area",
  "Speed",
  "Digital Storage",
];

export default function UnitConverter() {
  const [category, setCategory] = useState<Category>("Length");
  const [fromIdx, setFromIdx] = useState<number>(0);
  const [toIdx, setToIdx] = useState<number>(1);
  const [value, setValue] = useState<string>("");

  const { units, note } = UNITS[category];

  function convert(): string {
    const v = parseFloat(value);
    if (isNaN(v)) return "";
    const inBase = units[fromIdx].toBase(v);
    let result = units[toIdx].fromBase(inBase);
    if (!isFinite(result)) return "";
    // Offset scales accumulate float noise (0 K → 0 °R lands on 5.7e-14).
    // Temperatures never need more than 10 decimal places, so snap them.
    if (category === "Temperature") {
      result = Math.round(result * 1e10) / 1e10;
    }
    if (result !== 0 && (Math.abs(result) < 0.000001 || Math.abs(result) > 999999999)) {
      return result.toExponential(6);
    }
    return parseFloat(result.toPrecision(10)).toString();
  }

  function switchUnits() {
    setFromIdx(toIdx);
    setToIdx(fromIdx);
  }

  const result = convert();

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => { setCategory(cat); setFromIdx(0); setToIdx(1); setValue(""); }}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${category === cat ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"}`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Value</label>
          <input
            type="number"
            value={value}
            onChange={e => setValue(e.target.value)}
            placeholder="Enter value..."
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-[1fr,auto,1fr] gap-3 items-end">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">From</label>
            <select
              value={fromIdx}
              onChange={e => setFromIdx(+e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {units.map((u, i) => <option key={i} value={i}>{u.label}</option>)}
            </select>
          </div>

          <button
            onClick={switchUnits}
            className="pb-1 px-3 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300 rounded-xl font-bold transition-colors text-lg"
            title="Swap units"
          >
            ⇄
          </button>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">To</label>
            <select
              value={toIdx}
              onChange={e => setToIdx(+e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {units.map((u, i) => <option key={i} value={i}>{u.label}</option>)}
            </select>
          </div>
        </div>

        {note && (
          <p className="text-xs text-gray-500 dark:text-gray-400">{note}</p>
        )}
      </div>

      {result !== "" && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-xl p-5 text-center">
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Result</div>
          <div className="text-3xl font-bold text-blue-700 dark:text-blue-300 break-all">
            {value} {units[fromIdx].label.split(" ")[0]}
          </div>
          <div className="text-lg font-semibold text-gray-500 dark:text-gray-400 my-1">=</div>
          <div className="text-3xl font-bold text-blue-700 dark:text-blue-300 break-all">
            {result} {units[toIdx].label.split(" ")[0]}
          </div>
        </div>
      )}
    </div>
  );
}
