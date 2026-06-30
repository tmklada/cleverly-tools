"use client";
import { useState, useEffect } from "react";

const CURRENCIES = [
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "EUR", symbol: "€", name: "Euro" },
  { code: "GBP", symbol: "£", name: "British Pound" },
  { code: "JPY", symbol: "¥", name: "Japanese Yen" },
  { code: "CAD", symbol: "C$", name: "Canadian Dollar" },
  { code: "AUD", symbol: "A$", name: "Australian Dollar" },
  { code: "CHF", symbol: "Fr", name: "Swiss Franc" },
  { code: "INR", symbol: "₹", name: "Indian Rupee" },
  { code: "ILS", symbol: "₪", name: "Israeli Shekel" },
  { code: "AED", symbol: "د.إ", name: "UAE Dirham" },
];

const QUICK_AMOUNTS = [1, 10, 100, 1000];

export default function CurrencyConverter() {
  const [rates, setRates] = useState<Record<string, number>>({});
  const [updatedDate, setUpdatedDate] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [amount, setAmount] = useState("1");
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("EUR");

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const res = await fetch("https://open.er-api.com/v6/latest/USD");
        if (!res.ok) throw new Error("API error");
        const data = await res.json();
        setRates(data.rates);
        setUpdatedDate(new Date(data.time_last_update_utc).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }));
      } catch {
        setError("Failed to load exchange rates. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchRates();
  }, []);

  const convert = (amt: number, fromC: string, toC: string): number => {
    if (!rates[fromC] || !rates[toC]) return 0;
    const inUsd = amt / rates[fromC];
    return inUsd * rates[toC];
  };

  const swap = () => {
    setFrom(to);
    setTo(from);
  };

  const result = convert(parseFloat(amount) || 0, from, to);
  const fromCurrency = CURRENCIES.find((c) => c.code === from);
  const toCurrency = CURRENCIES.find((c) => c.code === to);

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : error ? (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 text-red-700 dark:text-red-400">{error}</div>
        ) : (
          <>
            <div className="flex items-end gap-3">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Amount</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-xl font-bold"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">From</label>
                <select value={from} onChange={(e) => setFrom(e.target.value)}
                  className="w-full px-3 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                  {CURRENCIES.map((c) => (
                    <option key={c.code} value={c.code}>{c.code} — {c.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-center my-4">
              <button onClick={swap} className="px-6 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full font-medium text-sm transition-colors">
                ⇄ Swap
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">To</label>
              <select value={to} onChange={(e) => setTo(e.target.value)}
                className="w-full px-3 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                {CURRENCIES.map((c) => (
                  <option key={c.code} value={c.code}>{c.code} — {c.name}</option>
                ))}
              </select>
            </div>

            <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-5 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                {amount} {fromCurrency?.name} =
              </p>
              <p className="text-4xl font-black text-blue-700 dark:text-blue-300">
                {toCurrency?.symbol}{result.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mt-1">{to}</p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-3">
                1 {from} = {convert(1, from, to).toFixed(4)} {to} · Rates updated: {updatedDate}
              </p>
            </div>

            <div className="mt-4">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Quick convert:</p>
              <div className="flex gap-2">
                {QUICK_AMOUNTS.map((a) => (
                  <button
                    key={a}
                    onClick={() => setAmount(String(a))}
                    className="flex-1 py-2 text-sm bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg transition-colors"
                  >
                    {a}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
