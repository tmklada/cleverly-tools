"use client";
import { useState } from "react";

type Category = "Length" | "Weight" | "Volume" | "Area" | "Speed";

interface Unit {
  label: string;
  factor: number; // multiplier to convert TO base unit
}

const UNITS: Record<Category, { base: string; units: Unit[] }> = {
  Length: {
    base: "meters",
    units: [
      { label: "Kilometer (km)", factor: 1000 },
      { label: "Meter (m)", factor: 1 },
      { label: "Centimeter (cm)", factor: 0.01 },
      { label: "Millimeter (mm)", factor: 0.001 },
      { label: "Mile (mi)", factor: 1609.344 },
      { label: "Yard (yd)", factor: 0.9144 },
      { label: "Foot (ft)", factor: 0.3048 },
      { label: "Inch (in)", factor: 0.0254 },
      { label: "Nautical Mile", factor: 1852 },
    ],
  },
  Weight: {
    base: "kilograms",
    units: [
      { label: "Metric Ton (t)", factor: 1000 },
      { label: "Kilogram (kg)", factor: 1 },
      { label: "Gram (g)", factor: 0.001 },
      { label: "Milligram (mg)", factor: 0.000001 },
      { label: "Pound (lb)", factor: 0.45359237 },
      { label: "Ounce (oz)", factor: 0.028349523 },
      { label: "Stone (st)", factor: 6.35029318 },
    ],
  },
  Volume: {
    base: "liters",
    units: [
      { label: "Cubic Meter (m³)", factor: 1000 },
      { label: "Liter (L)", factor: 1 },
      { label: "Milliliter (mL)", factor: 0.001 },
      { label: "US Gallon", factor: 3.785411784 },
      { label: "US Quart", factor: 0.946352946 },
      { label: "US Pint", factor: 0.473176473 },
      { label: "US Cup", factor: 0.2365882365 },
      { label: "US Fluid Ounce", factor: 0.0295735296 },
      { label: "Imperial Gallon", factor: 4.54609 },
      { label: "Tablespoon (US)", factor: 0.0147867648 },
      { label: "Teaspoon (US)", factor: 0.00492892159 },
    ],
  },
  Area: {
    base: "square meters",
    units: [
      { label: "Square Kilometer (km²)", factor: 1e6 },
      { label: "Square Meter (m²)", factor: 1 },
      { label: "Square Centimeter (cm²)", factor: 0.0001 },
      { label: "Hectare (ha)", factor: 10000 },
      { label: "Acre", factor: 4046.8564224 },
      { label: "Square Mile (mi²)", factor: 2589988.110336 },
      { label: "Square Yard (yd²)", factor: 0.83612736 },
      { label: "Square Foot (ft²)", factor: 0.09290304 },
      { label: "Square Inch (in²)", factor: 0.00064516 },
    ],
  },
  Speed: {
    base: "m/s",
    units: [
      { label: "Meter/Second (m/s)", factor: 1 },
      { label: "Kilometer/Hour (km/h)", factor: 0.27777778 },
      { label: "Mile/Hour (mph)", factor: 0.44704 },
      { label: "Knot (kn)", factor: 0.51444444 },
      { label: "Foot/Second (ft/s)", factor: 0.3048 },
    ],
  },
};

const CATEGORIES: Category[] = ["Length", "Weight", "Volume", "Area", "Speed"];

export default function UnitConverter() {
  const [category, setCategory] = useState<Category>("Length");
  const [fromIdx, setFromIdx] = useState<number>(0);
  const [toIdx, setToIdx] = useState<number>(1);
  const [value, setValue] = useState<string>("");

  const { units } = UNITS[category];

  function convert(): string {
    const v = parseFloat(value);
    if (isNaN(v)) return "";
    const inBase = v * units[fromIdx].factor;
    const result = inBase / units[toIdx].factor;
    if (Math.abs(result) < 0.000001 || Math.abs(result) > 999999999) {
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
      </div>

      {result && (
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
