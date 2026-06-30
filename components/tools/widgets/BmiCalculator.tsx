"use client";
import { useState } from "react";

export default function BmiCalculator() {
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [result, setResult] = useState<{ bmi: number; category: string; color: string } | null>(null);

  function calculate() {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    if (!w || !h) return;
    let bmi: number;
    if (unit === "metric") {
      bmi = w / ((h / 100) * (h / 100));
    } else {
      bmi = (703 * w) / (h * h);
    }
    bmi = Math.round(bmi * 10) / 10;
    let category = "", color = "";
    if (bmi < 18.5) { category = "Underweight"; color = "text-blue-600"; }
    else if (bmi < 25) { category = "Normal weight ✅"; color = "text-green-600"; }
    else if (bmi < 30) { category = "Overweight"; color = "text-yellow-600"; }
    else { category = "Obese"; color = "text-red-600"; }
    setResult({ bmi, category, color });
  }

  return (
    <div className="space-y-5">
      <div className="flex gap-2">
        {(["metric", "imperial"] as const).map((u) => (
          <button key={u} onClick={() => { setUnit(u); setResult(null); }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${unit === u ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"}`}>
            {u === "metric" ? "Metric (kg/cm)" : "Imperial (lbs/in)"}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Weight ({unit === "metric" ? "kg" : "lbs"})
          </label>
          <input type="number" value={weight} onChange={e => setWeight(e.target.value)}
            placeholder={unit === "metric" ? "70" : "154"}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Height ({unit === "metric" ? "cm" : "inches"})
          </label>
          <input type="number" value={height} onChange={e => setHeight(e.target.value)}
            placeholder={unit === "metric" ? "175" : "69"}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
      </div>
      <button onClick={calculate}
        className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors">
        Calculate BMI
      </button>
      {result && (
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 text-center space-y-2">
          <div className="text-5xl font-bold text-gray-900 dark:text-white">{result.bmi}</div>
          <div className={`text-lg font-semibold ${result.color}`}>{result.category}</div>
          <div className="grid grid-cols-4 gap-2 mt-4 text-xs text-center">
            {[["< 18.5","Underweight","bg-blue-100 dark:bg-blue-900/30"], ["18.5–24.9","Normal","bg-green-100 dark:bg-green-900/30"], ["25–29.9","Overweight","bg-yellow-100 dark:bg-yellow-900/30"], ["≥ 30","Obese","bg-red-100 dark:bg-red-900/30"]].map(([range, label, cls]) => (
              <div key={label} className={`${cls} rounded-lg p-2`}>
                <div className="font-semibold text-gray-700 dark:text-gray-300">{range}</div>
                <div className="text-gray-500 dark:text-gray-400">{label}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
