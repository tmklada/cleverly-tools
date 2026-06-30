"use client";
import { useState } from "react";

type Gender = "male" | "female";
type Unit = "metric" | "imperial";

interface FormulaResult {
  name: string;
  weight: number;
}

export default function IdealWeightCalculator() {
  const [unit, setUnit] = useState<Unit>("metric");
  const [gender, setGender] = useState<Gender>("male");
  const [heightCm, setHeightCm] = useState("");
  const [heightFt, setHeightFt] = useState("");
  const [heightIn, setHeightIn] = useState("");
  const [currentWeight, setCurrentWeight] = useState("");
  const [results, setResults] = useState<FormulaResult[] | null>(null);

  function getHeightInches(): number {
    if (unit === "metric") {
      return parseFloat(heightCm) / 2.54;
    }
    const ft = parseFloat(heightFt) || 0;
    const inches = parseFloat(heightIn) || 0;
    return ft * 12 + inches;
  }

  function calculate() {
    const h = getHeightInches();
    if (!h || h < 48) return;

    const inchesOver5ft = h - 60;
    let devine: number, robinson: number, miller: number, hamwi: number;

    if (gender === "male") {
      devine = 50 + 2.3 * inchesOver5ft;
      robinson = 52 + 1.9 * inchesOver5ft;
      miller = 56.2 + 1.41 * inchesOver5ft;
      hamwi = 48 + 2.7 * inchesOver5ft;
    } else {
      devine = 45.5 + 2.3 * inchesOver5ft;
      robinson = 49 + 1.7 * inchesOver5ft;
      miller = 53.1 + 1.36 * inchesOver5ft;
      hamwi = 45.5 + 2.2 * inchesOver5ft;
    }

    const toKg = (kg: number) => unit === "metric" ? kg : kg * 2.205;

    setResults([
      { name: "Devine", weight: Math.round(toKg(devine) * 10) / 10 },
      { name: "Robinson", weight: Math.round(toKg(robinson) * 10) / 10 },
      { name: "Miller", weight: Math.round(toKg(miller) * 10) / 10 },
      { name: "Hamwi", weight: Math.round(toKg(hamwi) * 10) / 10 },
    ]);
  }

  const avg = results ? Math.round((results.reduce((s, r) => s + r.weight, 0) / results.length) * 10) / 10 : null;
  const weightUnit = unit === "metric" ? "kg" : "lbs";
  const cw = parseFloat(currentWeight);

  return (
    <div className="space-y-5">
      <div className="flex gap-2 flex-wrap">
        {(["metric", "imperial"] as const).map((u) => (
          <button key={u} onClick={() => { setUnit(u); setResults(null); }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${unit === u ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"}`}>
            {u === "metric" ? "Metric (cm/kg)" : "Imperial (ft/lbs)"}
          </button>
        ))}
      </div>

      <div className="flex gap-2">
        {(["male", "female"] as const).map((g) => (
          <button key={g} onClick={() => { setGender(g); setResults(null); }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${gender === g ? "bg-purple-600 text-white" : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"}`}>
            {g === "male" ? "Male" : "Female"}
          </button>
        ))}
      </div>

      {unit === "metric" ? (
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Height (cm)</label>
          <input type="number" value={heightCm} onChange={e => setHeightCm(e.target.value)} placeholder="175"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Feet</label>
            <input type="number" value={heightFt} onChange={e => setHeightFt(e.target.value)} placeholder="5"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Inches</label>
            <input type="number" value={heightIn} onChange={e => setHeightIn(e.target.value)} placeholder="9"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Current Weight ({weightUnit}) <span className="text-gray-400 font-normal">(optional)</span>
        </label>
        <input type="number" value={currentWeight} onChange={e => setCurrentWeight(e.target.value)} placeholder="Optional"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>

      <button onClick={calculate}
        className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors">
        Calculate Ideal Weight
      </button>

      {results && (
        <div className="space-y-4">
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700">
                  <th className="text-left px-4 py-3 text-gray-700 dark:text-gray-300 font-semibold">Formula</th>
                  <th className="text-right px-4 py-3 text-gray-700 dark:text-gray-300 font-semibold">Ideal Weight ({weightUnit})</th>
                </tr>
              </thead>
              <tbody>
                {results.map((r, i) => (
                  <tr key={r.name} className={i % 2 === 0 ? "" : "bg-gray-50 dark:bg-gray-700/30"}>
                    <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{r.name}</td>
                    <td className="px-4 py-3 text-right font-semibold text-blue-600 dark:text-blue-400">{r.weight} {weightUnit}</td>
                  </tr>
                ))}
                <tr className="bg-blue-50 dark:bg-blue-900/20 border-t-2 border-blue-200 dark:border-blue-700">
                  <td className="px-4 py-3 font-bold text-gray-900 dark:text-white">Average</td>
                  <td className="px-4 py-3 text-right font-bold text-blue-700 dark:text-blue-300">{avg} {weightUnit}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {cw > 0 && avg !== null && (
            <div className={`rounded-xl p-4 text-center ${Math.abs(cw - avg) < 2 ? "bg-green-50 dark:bg-green-900/20" : cw > avg ? "bg-yellow-50 dark:bg-yellow-900/20" : "bg-blue-50 dark:bg-blue-900/20"}`}>
              <p className="text-sm text-gray-600 dark:text-gray-400">Your current weight vs. average ideal</p>
              <p className={`text-lg font-bold mt-1 ${Math.abs(cw - avg) < 2 ? "text-green-600" : cw > avg ? "text-yellow-600" : "text-blue-600"}`}>
                {cw > avg ? `+${(cw - avg).toFixed(1)}` : (cw - avg).toFixed(1)} {weightUnit} from ideal
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
