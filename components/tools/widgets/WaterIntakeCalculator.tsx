"use client";
import { useState, useMemo } from "react";

const ACTIVITY_FACTORS: Record<string, number> = {
  sedentary: 0,
  moderate: 350,
  active: 700,
};

const CLIMATE_FACTORS: Record<string, number> = {
  normal: 0,
  hot: 500,
  "very hot": 1000,
};

export default function WaterIntakeCalculator() {
  const [weight, setWeight] = useState("");
  const [weightUnit, setWeightUnit] = useState<"kg" | "lbs">("kg");
  const [activity, setActivity] = useState("moderate");
  const [climate, setClimate] = useState("normal");

  const result = useMemo(() => {
    const w = parseFloat(weight);
    if (!w || w <= 0) return null;

    const weightKg = weightUnit === "lbs" ? w * 0.453592 : w;
    const baseml = weightKg * 35;
    const activityml = ACTIVITY_FACTORS[activity] || 0;
    const climateml = CLIMATE_FACTORS[climate] || 0;
    const totalml = baseml + activityml + climateml;

    return {
      ml: Math.round(totalml),
      liters: (totalml / 1000).toFixed(2),
      cups: Math.round(totalml / 240),
      oz: Math.round(totalml / 29.5737),
      fillPercent: Math.min((totalml / 4000) * 100, 100),
    };
  }, [weight, weightUnit, activity, climate]);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Weight</label>
          <div className="flex gap-2">
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder={weightUnit === "kg" ? "70" : "154"}
              className="flex-1 px-3 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={weightUnit}
              onChange={(e) => setWeightUnit(e.target.value as "kg" | "lbs")}
              className="px-2 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="kg">kg</option>
              <option value="lbs">lbs</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Climate</label>
          <select
            value={climate}
            onChange={(e) => setClimate(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="normal">Normal / Mild</option>
            <option value="hot">Hot</option>
            <option value="very hot">Very Hot</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Activity Level
        </label>
        <div className="flex gap-2">
          {(["sedentary", "moderate", "active"] as const).map((a) => (
            <button
              key={a}
              onClick={() => setActivity(a)}
              className={`flex-1 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
                activity === a
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
              }`}
            >
              {a}
            </button>
          ))}
        </div>
      </div>

      {result && (
        <div className="space-y-4">
          <div className="flex gap-6 justify-center items-center">
            {/* Water bottle visual */}
            <div className="flex flex-col items-center gap-2">
              <div className="relative w-16 h-32 border-2 border-blue-400 rounded-b-lg rounded-t-sm overflow-hidden bg-gray-100 dark:bg-gray-700">
                <div
                  className="absolute bottom-0 left-0 right-0 bg-blue-400 transition-all duration-700"
                  style={{ height: `${result.fillPercent}%` }}
                />
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {result.fillPercent.toFixed(0)}% of 4L
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 flex-1">
              <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-3 text-center">
                <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">{result.ml}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">ml</div>
              </div>
              <div className="bg-cyan-50 dark:bg-cyan-900/30 rounded-xl p-3 text-center">
                <div className="text-2xl font-bold text-cyan-700 dark:text-cyan-300">{result.liters}L</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">liters</div>
              </div>
              <div className="bg-indigo-50 dark:bg-indigo-900/30 rounded-xl p-3 text-center">
                <div className="text-2xl font-bold text-indigo-700 dark:text-indigo-300">{result.cups}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">cups</div>
              </div>
              <div className="bg-sky-50 dark:bg-sky-900/30 rounded-xl p-3 text-center">
                <div className="text-2xl font-bold text-sky-700 dark:text-sky-300">{result.oz} oz</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">fluid oz</div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-blue-700 dark:text-blue-300 mb-2">Tips</h3>
            <ul className="text-sm text-blue-600 dark:text-blue-400 space-y-1 list-disc list-inside">
              <li>Start your day with a glass of water</li>
              <li>Drink a glass before each meal</li>
              <li>Keep a water bottle with you</li>
              <li>Drink more if you sweat heavily</li>
              <li>Herbal teas count toward your intake</li>
            </ul>
          </div>
        </div>
      )}

      {!result && (
        <div className="flex items-center justify-center h-24 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
          <p className="text-gray-400 dark:text-gray-500">Enter your weight to calculate water intake</p>
        </div>
      )}
    </div>
  );
}
