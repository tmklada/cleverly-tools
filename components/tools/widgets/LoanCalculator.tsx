"use client";
import { useState } from "react";

export default function LoanCalculator() {
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState("");
  const [years, setYears] = useState("");
  const [result, setResult] = useState<{ monthly: number; total: number; interest: number } | null>(null);

  function calculate() {
    const p = parseFloat(amount);
    const r = parseFloat(rate) / 100 / 12;
    const n = parseFloat(years) * 12;
    if (!p || !r || !n) return;
    const monthly = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const total = monthly * n;
    const interest = total - p;
    setResult({
      monthly: Math.round(monthly * 100) / 100,
      total: Math.round(total * 100) / 100,
      interest: Math.round(interest * 100) / 100,
    });
  }

  const fmt = (n: number) => n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Loan Amount ($)", value: amount, set: setAmount, placeholder: "10000" },
          { label: "Annual Interest Rate (%)", value: rate, set: setRate, placeholder: "5.5" },
          { label: "Loan Term (years)", value: years, set: setYears, placeholder: "5" },
        ].map(({ label, value, set, placeholder }) => (
          <div key={label}>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>
            <input type="number" value={value} onChange={e => set(e.target.value)} placeholder={placeholder}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
        ))}
      </div>
      <button onClick={calculate} className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors">
        Calculate
      </button>
      {result && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: "Monthly Payment", value: `$${fmt(result.monthly)}`, color: "bg-blue-50 dark:bg-blue-900/20 border-blue-200" },
            { label: "Total Interest", value: `$${fmt(result.interest)}`, color: "bg-orange-50 dark:bg-orange-900/20 border-orange-200" },
            { label: "Total Cost", value: `$${fmt(result.total)}`, color: "bg-green-50 dark:bg-green-900/20 border-green-200" },
          ].map(({ label, value, color }) => (
            <div key={label} className={`${color} border rounded-xl p-4 text-center`}>
              <div className="text-sm text-gray-500 dark:text-gray-400">{label}</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{value}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
