"use client";
import { useState, useMemo } from "react";

type Frequency = "daily" | "monthly" | "quarterly" | "yearly";

const FREQ_MAP: Record<Frequency, number> = {
  daily: 365,
  monthly: 12,
  quarterly: 4,
  yearly: 1,
};

function fmt(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 });
}

export default function CompoundInterestCalculator() {
  const [principal, setPrincipal] = useState("10000");
  const [rate, setRate] = useState("7");
  const [years, setYears] = useState("10");
  const [freq, setFreq] = useState<Frequency>("monthly");

  const result = useMemo(() => {
    const P = parseFloat(principal);
    const r = parseFloat(rate) / 100;
    const t = parseFloat(years);
    const n = FREQ_MAP[freq];
    if (!P || !r || !t || P <= 0 || r <= 0 || t <= 0) return null;

    const A = P * Math.pow(1 + r / n, n * t);
    const interest = A - P;

    const breakdown = [];
    for (let y = 1; y <= Math.min(t, 10); y++) {
      const a = P * Math.pow(1 + r / n, n * y);
      breakdown.push({ year: y, amount: a, interest: a - P });
    }

    return { final: A, interest, interestPct: (interest / P) * 100, breakdown };
  }, [principal, rate, years, freq]);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Principal ($)
          </label>
          <input
            type="number"
            value={principal}
            onChange={(e) => setPrincipal(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Annual Rate (%)
          </label>
          <input
            type="number"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Years
          </label>
          <input
            type="number"
            value={years}
            onChange={(e) => setYears(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Compound Frequency
          </label>
          <select
            value={freq}
            onChange={(e) => setFreq(e.target.value as Frequency)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="daily">Daily</option>
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>
      </div>

      {result && (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4 text-center">
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Final Amount</div>
              <div className="text-lg font-bold text-blue-700 dark:text-blue-300">{fmt(result.final)}</div>
            </div>
            <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-4 text-center">
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Total Interest</div>
              <div className="text-lg font-bold text-green-700 dark:text-green-300">{fmt(result.interest)}</div>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-4 text-center">
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Interest %</div>
              <div className="text-lg font-bold text-purple-700 dark:text-purple-300">
                {result.interestPct.toFixed(1)}%
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-600">
                  <th className="pb-2">Year</th>
                  <th className="pb-2">Total Amount</th>
                  <th className="pb-2">Interest Earned</th>
                </tr>
              </thead>
              <tbody>
                {result.breakdown.map(({ year, amount, interest }) => (
                  <tr
                    key={year}
                    className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/30"
                  >
                    <td className="py-2 font-medium text-gray-700 dark:text-gray-300">{year}</td>
                    <td className="py-2 text-gray-900 dark:text-white">{fmt(amount)}</td>
                    <td className="py-2 text-green-600 dark:text-green-400">{fmt(interest)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {!result && (
        <div className="flex items-center justify-center h-24 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
          <p className="text-gray-400 dark:text-gray-500">Enter values above to calculate</p>
        </div>
      )}
    </div>
  );
}
