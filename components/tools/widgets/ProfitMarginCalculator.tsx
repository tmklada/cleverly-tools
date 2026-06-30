"use client";
import { useState, useMemo } from "react";

type Mode = "gross" | "net" | "markup";

export default function ProfitMarginCalculator() {
  const [mode, setMode] = useState<Mode>("gross");
  const [revenue, setRevenue] = useState("");
  const [cogs, setCogs] = useState("");
  const [expenses, setExpenses] = useState("");
  const [cost, setCost] = useState("");
  const [price, setPrice] = useState("");

  const result = useMemo(() => {
    if (mode === "gross") {
      const r = parseFloat(revenue);
      const c = parseFloat(cogs);
      if (!r || !c || r <= 0) return null;
      const profit = r - c;
      const margin = (profit / r) * 100;
      return { margin, profit, label: "Gross Profit", marginLabel: "Gross Margin" };
    }
    if (mode === "net") {
      const r = parseFloat(revenue);
      const c = parseFloat(cogs);
      const e = parseFloat(expenses) || 0;
      if (!r || !c || r <= 0) return null;
      const profit = r - c - e;
      const margin = (profit / r) * 100;
      return { margin, profit, label: "Net Profit", marginLabel: "Net Margin" };
    }
    if (mode === "markup") {
      const c = parseFloat(cost);
      const p = parseFloat(price);
      if (!c || !p || c <= 0) return null;
      const profit = p - c;
      const margin = (profit / c) * 100;
      return { margin, profit, label: "Markup Amount", marginLabel: "Markup %" };
    }
    return null;
  }, [mode, revenue, cogs, expenses, cost, price]);

  function fmt(n: number) {
    return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 });
  }

  return (
    <div className="space-y-5">
      <div className="flex gap-2">
        {(["gross", "net", "markup"] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`flex-1 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
              mode === m
                ? "bg-blue-600 text-white"
                : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
            }`}
          >
            {m}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {(mode === "gross" || mode === "net") && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Revenue ($)
              </label>
              <input
                type="number"
                value={revenue}
                onChange={(e) => setRevenue(e.target.value)}
                placeholder="100000"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Cost of Goods Sold / COGS ($)
              </label>
              <input
                type="number"
                value={cogs}
                onChange={(e) => setCogs(e.target.value)}
                placeholder="60000"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {mode === "net" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Operating Expenses ($)
                </label>
                <input
                  type="number"
                  value={expenses}
                  onChange={(e) => setExpenses(e.target.value)}
                  placeholder="20000"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}
          </>
        )}

        {mode === "markup" && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Cost ($)
              </label>
              <input
                type="number"
                value={cost}
                onChange={(e) => setCost(e.target.value)}
                placeholder="50"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Selling Price ($)
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="75"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </>
        )}
      </div>

      {result && (
        <div className="grid grid-cols-2 gap-4">
          <div
            className={`rounded-xl p-5 text-center ${
              result.margin >= 0
                ? "bg-green-50 dark:bg-green-900/30"
                : "bg-red-50 dark:bg-red-900/30"
            }`}
          >
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">{result.marginLabel}</div>
            <div
              className={`text-3xl font-bold ${
                result.margin >= 0
                  ? "text-green-600 dark:text-green-400"
                  : "text-red-600 dark:text-red-400"
              }`}
            >
              {result.margin.toFixed(2)}%
            </div>
          </div>
          <div
            className={`rounded-xl p-5 text-center ${
              result.profit >= 0
                ? "bg-blue-50 dark:bg-blue-900/30"
                : "bg-red-50 dark:bg-red-900/30"
            }`}
          >
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">{result.label}</div>
            <div
              className={`text-3xl font-bold ${
                result.profit >= 0
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-red-600 dark:text-red-400"
              }`}
            >
              {fmt(result.profit)}
            </div>
          </div>
        </div>
      )}

      {!result && (
        <div className="flex items-center justify-center h-24 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
          <p className="text-gray-400 dark:text-gray-500">Enter values to calculate</p>
        </div>
      )}
    </div>
  );
}
