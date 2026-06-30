"use client";
import { useState } from "react";

export default function PercentageCalculator() {
  const [mode, setMode] = useState<"basic" | "of" | "change">("basic");
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [result, setResult] = useState<string | null>(null);

  function calculate() {
    const x = parseFloat(a), y = parseFloat(b);
    if (isNaN(x) || isNaN(y)) return;
    let res = "";
    if (mode === "basic") res = `${((x / 100) * y).toFixed(2)} (${x}% of ${y})`;
    else if (mode === "of") res = `${((x / y) * 100).toFixed(2)}% (${x} is ${((x / y) * 100).toFixed(2)}% of ${y})`;
    else { const pct = ((y - x) / Math.abs(x)) * 100; res = `${pct >= 0 ? "+" : ""}${pct.toFixed(2)}% (${pct >= 0 ? "increase" : "decrease"})`; }
    setResult(res);
  }

  const modes = [
    { id: "basic" as const, label: "% of Number", desc: "What is X% of Y?" },
    { id: "of" as const, label: "X is what % of Y", desc: "X is what percent of Y?" },
    { id: "change" as const, label: "% Change", desc: "From X to Y — what % change?" },
  ];

  const labels: Record<string, [string, string]> = {
    basic: ["Percentage (%)", "Number"],
    of: ["Value (X)", "Total (Y)"],
    change: ["From (old value)", "To (new value)"],
  };

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-3 gap-2">
        {modes.map(({ id, label }) => (
          <button key={id} onClick={() => { setMode(id); setResult(null); }}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${mode === id ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"}`}>
            {label}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-4">
        {[0, 1].map((i) => (
          <div key={i}>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{labels[mode][i]}</label>
            <input type="number" value={i === 0 ? a : b} onChange={e => i === 0 ? setA(e.target.value) : setB(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
        ))}
      </div>
      <button onClick={calculate} className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl">Calculate</button>
      {result && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-green-700 dark:text-green-400">{result}</div>
        </div>
      )}
    </div>
  );
}
