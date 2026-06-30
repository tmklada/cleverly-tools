"use client";
import { useState, useMemo } from "react";

const ACTIVITY_LEVELS = [
  { label: "Sedentary (no exercise)", factor: 1.2 },
  { label: "Lightly active (1–3 days/week)", factor: 1.375 },
  { label: "Moderately active (3–5 days/week)", factor: 1.55 },
  { label: "Very active (6–7 days/week)", factor: 1.725 },
  { label: "Extra active (physical job / 2x training)", factor: 1.9 },
];

export default function CalorieCalculator() {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [weight, setWeight] = useState("");
  const [weightUnit, setWeightUnit] = useState<"kg" | "lbs">("kg");
  const [height, setHeight] = useState("");
  const [heightUnit, setHeightUnit] = useState<"cm" | "in">("cm");
  const [activityIdx, setActivityIdx] = useState(1);

  const result = useMemo(() => {
    const a = parseFloat(age);
    const w = parseFloat(weight);
    const h = parseFloat(height);
    if (!a || !w || !h || a <= 0 || w <= 0 || h <= 0) return null;

    const weightKg = weightUnit === "lbs" ? w * 0.453592 : w;
    const heightCm = heightUnit === "in" ? h * 2.54 : h;

    // Mifflin-St Jeor
    let bmr: number;
    if (gender === "male") {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * a + 5;
    } else {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * a - 161;
    }

    const factor = ACTIVITY_LEVELS[activityIdx].factor;
    const tdee = bmr * factor;

    return {
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      lose: Math.round(tdee - 500),
      gain: Math.round(tdee + 500),
      protein: Math.round(weightKg * 2),
      carbs: Math.round((tdee * 0.45) / 4),
      fat: Math.round((tdee * 0.30) / 9),
    };
  }, [age, gender, weight, weightUnit, height, heightUnit, activityIdx]);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Gender</label>
          <div className="flex gap-2">
            {(["male", "female"] as const).map((g) => (
              <button
                key={g}
                onClick={() => setGender(g)}
                className={`flex-1 py-3 rounded-xl text-sm font-medium capitalize transition-colors ${
                  gender === g
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                }`}
              >
                {g === "male" ? "♂ Male" : "♀ Female"}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Age</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="30"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

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
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Height</label>
          <div className="flex gap-2">
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder={heightUnit === "cm" ? "175" : "69"}
              className="flex-1 px-3 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={heightUnit}
              onChange={(e) => setHeightUnit(e.target.value as "cm" | "in")}
              className="px-2 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="cm">cm</option>
              <option value="in">in</option>
            </select>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Activity Level
        </label>
        <select
          value={activityIdx}
          onChange={(e) => setActivityIdx(parseInt(e.target.value))}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {ACTIVITY_LEVELS.map((l, i) => (
            <option key={i} value={i}>{l.label}</option>
          ))}
        </select>
      </div>

      {result && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 text-center">
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">BMR (Basal Metabolic Rate)</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{result.bmr}</div>
              <div className="text-xs text-gray-400">kcal/day at rest</div>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4 text-center">
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">TDEE (Maintenance)</div>
              <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">{result.tdee}</div>
              <div className="text-xs text-gray-400">kcal/day</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-red-50 dark:bg-red-900/30 rounded-xl p-4 text-center">
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Lose 0.5kg/week</div>
              <div className="text-xl font-bold text-red-600 dark:text-red-400">{result.lose}</div>
              <div className="text-xs text-gray-400">kcal/day</div>
            </div>
            <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-4 text-center">
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Gain 0.5kg/week</div>
              <div className="text-xl font-bold text-green-600 dark:text-green-400">{result.gain}</div>
              <div className="text-xs text-gray-400">kcal/day</div>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Suggested Daily Macros (at TDEE)
            </h3>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div>
                <div className="text-lg font-bold text-blue-600 dark:text-blue-400">{result.protein}g</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Protein</div>
              </div>
              <div>
                <div className="text-lg font-bold text-yellow-600 dark:text-yellow-400">{result.carbs}g</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Carbs</div>
              </div>
              <div>
                <div className="text-lg font-bold text-red-600 dark:text-red-400">{result.fat}g</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Fat</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {!result && (
        <div className="flex items-center justify-center h-24 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
          <p className="text-gray-400 dark:text-gray-500">Fill in your details to calculate calories</p>
        </div>
      )}
    </div>
  );
}
