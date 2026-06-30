"use client";
import { useState, useMemo } from "react";

export default function RoiCalculator() {
  const [initial, setInitial] = useState("");
  const [finalVal, setFinalVal] = useState("");
  const [timePeriod, setTimePeriod] = useState("");

  const result = useMemo(() => {
    const inv = parseFloat(initial);
    const fin = parseFloat(finalVal);
    if (!inv || !fin || inv <= 0) return null;

    const netProfit = fin - inv;
    const roi = (netProfit / inv) * 100;
    const isPositive = netProfit >= 0;

    let annualizedRoi: number | null = null;
    const t = parseFloat(timePeriod);
    if (t > 0) {
      annualizedRoi = (Math.pow(fin / inv, 1 / t) - 1) * 100;
    }

    return { roi, netProfit, isPositive, annualizedRoi };
  }, [initial, finalVal, timePeriod]);

  function fmt(n: number) {
    return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 });
  }

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Initial Investment ($)
          </label>
          <input
            type="number"
            value={initial}
            onChange={(e) => setInitial(e.target.value)}
            placeholder="10000"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Final Value ($)
          </label>
          <input
            type="number"
            value={finalVal}
            onChange={(e) => setFinalVal(e.target.value)}
            placeholder="15000"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Time Period (years, optional)
          </label>
          <input
            type="number"
            value={timePeriod}
            onChange={(e) => setTimePeriod(e.target.value)}
            placeholder="3"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {result && (
        <div className="space-y-3">
          <div
            className={`rounded-xl p-6 text-center ${
              result.isPositive
                ? "bg-green-50 dark:bg-green-900/30"
                : "bg-red-50 dark:bg-red-900/30"
            }`}
          >
            <div
              className={`text-5xl font-bold ${
                result.isPositive
                  ? "text-green-600 dark:text-green-400"
                  : "text-red-600 dark:text-red-400"
              }`}
            >
              {result.roi >= 0 ? "+" : ""}{result.roi.toFixed(2)}%
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">Return on Investment</div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 text-center">
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Net Profit / Loss</div>
              <div
                className={`text-xl font-bold ${
                  result.isPositive
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                {result.netProfit >= 0 ? "+" : ""}{fmt(result.netProfit)}
              </div>
            </div>
            {result.annualizedRoi !== null && (
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 text-center">
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Annualized ROI</div>
                <div
                  className={`text-xl font-bold ${
                    result.annualizedRoi >= 0
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {result.annualizedRoi >= 0 ? "+" : ""}{result.annualizedRoi.toFixed(2)}%
                </div>
              </div>
            )}
          </div>

          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 text-sm text-gray-600 dark:text-gray-300">
            <strong>Formula:</strong> ROI = (Final Value − Initial Investment) ÷ Initial Investment × 100
          </div>
        </div>
      )}

      {!result && (
        <div className="flex items-center justify-center h-24 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
          <p className="text-gray-400 dark:text-gray-500">Enter investment values to calculate ROI</p>
        </div>
      )}
    </div>
  );
}
