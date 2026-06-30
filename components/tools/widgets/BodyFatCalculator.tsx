"use client";
import { useState } from "react";

type Gender = "male" | "female";

interface Classification {
  label: string;
  male: string;
  female: string;
  color: string;
}

const classifications: Classification[] = [
  { label: "Essential Fat", male: "2–5%", female: "10–13%", color: "text-blue-600" },
  { label: "Athletes", male: "6–13%", female: "14–20%", color: "text-green-600" },
  { label: "Fitness", male: "14–17%", female: "21–24%", color: "text-teal-600" },
  { label: "Average", male: "18–24%", female: "25–31%", color: "text-yellow-600" },
  { label: "Obese", male: "25%+", female: "32%+", color: "text-red-600" },
];

function getClassification(bf: number, gender: Gender): { label: string; color: string } {
  if (gender === "male") {
    if (bf <= 5) return { label: "Essential Fat", color: "text-blue-600" };
    if (bf <= 13) return { label: "Athletes", color: "text-green-600" };
    if (bf <= 17) return { label: "Fitness", color: "text-teal-600" };
    if (bf <= 24) return { label: "Average", color: "text-yellow-600" };
    return { label: "Obese", color: "text-red-600" };
  } else {
    if (bf <= 13) return { label: "Essential Fat", color: "text-blue-600" };
    if (bf <= 20) return { label: "Athletes", color: "text-green-600" };
    if (bf <= 24) return { label: "Fitness", color: "text-teal-600" };
    if (bf <= 31) return { label: "Average", color: "text-yellow-600" };
    return { label: "Obese", color: "text-red-600" };
  }
}

export default function BodyFatCalculator() {
  const [gender, setGender] = useState<Gender>("male");
  const [height, setHeight] = useState("");
  const [neck, setNeck] = useState("");
  const [waist, setWaist] = useState("");
  const [hip, setHip] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState("");

  function calculate() {
    setError("");
    const h = parseFloat(height);
    const n = parseFloat(neck);
    const w = parseFloat(waist);

    if (!h || !n || !w) { setError("Please fill in all required fields."); return; }
    if (gender === "female" && !parseFloat(hip)) { setError("Hip measurement is required for females."); return; }

    let bf: number;
    if (gender === "male") {
      bf = 86.01 * Math.log10(w - n) - 70.041 * Math.log10(h) + 36.76;
    } else {
      const hp = parseFloat(hip);
      bf = 163.205 * Math.log10(w + hp - n) - 97.684 * Math.log10(h) - 78.387;
    }

    if (bf < 0 || bf > 70) { setError("Invalid measurements. Please check your inputs."); return; }
    setResult(Math.round(bf * 10) / 10);
  }

  const classification = result !== null ? getClassification(result, gender) : null;

  return (
    <div className="space-y-5">
      <div className="flex gap-2">
        {(["male", "female"] as const).map((g) => (
          <button key={g} onClick={() => { setGender(g); setResult(null); setError(""); }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${gender === g ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"}`}>
            {g === "male" ? "Male" : "Female"}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {[
          { label: "Height (cm)", value: height, setter: setHeight, placeholder: "175" },
          { label: "Neck (cm)", value: neck, setter: setNeck, placeholder: "38" },
          { label: "Waist (cm)", value: waist, setter: setWaist, placeholder: "85" },
          ...(gender === "female" ? [{ label: "Hip (cm)", value: hip, setter: setHip, placeholder: "95" }] : []),
        ].map(({ label, value, setter, placeholder }) => (
          <div key={label}>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>
            <input type="number" value={value} onChange={e => setter(e.target.value)} placeholder={placeholder}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
        ))}
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <button onClick={calculate}
        className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors">
        Calculate Body Fat
      </button>

      {result !== null && classification && (
        <div className="space-y-4">
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 text-center">
            <div className="text-5xl font-bold text-gray-900 dark:text-white">{result}%</div>
            <div className={`text-lg font-semibold mt-2 ${classification.color}`}>{classification.label}</div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Navy Body Fat Formula</p>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl overflow-hidden">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700">
                  <th className="text-left px-3 py-2 text-gray-700 dark:text-gray-300">Category</th>
                  <th className="text-center px-3 py-2 text-gray-700 dark:text-gray-300">Men</th>
                  <th className="text-center px-3 py-2 text-gray-700 dark:text-gray-300">Women</th>
                </tr>
              </thead>
              <tbody>
                {classifications.map((c, i) => (
                  <tr key={c.label} className={`${c.label === classification.label ? "bg-blue-50 dark:bg-blue-900/20 font-semibold" : i % 2 === 0 ? "" : "bg-gray-50 dark:bg-gray-700/30"}`}>
                    <td className={`px-3 py-2 ${c.color}`}>{c.label}</td>
                    <td className="px-3 py-2 text-center text-gray-700 dark:text-gray-300">{c.male}</td>
                    <td className="px-3 py-2 text-center text-gray-700 dark:text-gray-300">{c.female}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
