"use client";
import { useState, useMemo } from "react";

const PRESET_RATES = [5, 10, 15, 20, 21, 23, 25];

export default function VatCalculator() {
  const [amount, setAmount] = useState("");
  const [vatRate, setVatRate] = useState("20");
  const [customRate, setCustomRate] = useState("");
  const [mode, setMode] = useState<"add" | "remove">("add");
  const [useCustom, setUseCustom] = useState(false);

  const effectiveRate = useCustom ? parseFloat(customRate) : parseFloat(vatRate);

  const result = useMemo(() => {
    const a = parseFloat(amount);
    const r = effectiveRate;
    if (!a || isNaN(r) || r < 0 || a <= 0) return null;

    if (mode === "add") {
      const vatAmount = a * (r / 100);
      return { net: a, vat: vatAmount, gross: a + vatAmount };
    } else {
      const net = a / (1 + r / 100);
      const vatAmount = a - net;
      return { net, vat: vatAmount, gross: a };
    }
  }, [amount, effectiveRate, mode]);

  function fmt(n: number) {
    return n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  return (
    <div className="space-y-5">
      <div className="flex gap-2">
        <button
          onClick={() => setMode("add")}
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
            mode === "add"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
          }`}
        >
          Add VAT to price
        </button>
        <button
          onClick={() => setMode("remove")}
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
            mode === "remove"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
          }`}
        >
          Remove VAT from price
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {mode === "add" ? "Net Amount (excl. VAT)" : "Gross Amount (incl. VAT)"}
        </label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="100.00"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          VAT Rate
        </label>
        <div className="flex flex-wrap gap-2 mb-3">
          {PRESET_RATES.map((r) => (
            <button
              key={r}
              onClick={() => { setVatRate(String(r)); setUseCustom(false); }}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                !useCustom && vatRate === String(r)
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
              }`}
            >
              {r}%
            </button>
          ))}
          <button
            onClick={() => setUseCustom(true)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              useCustom
                ? "bg-blue-600 text-white"
                : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
            }`}
          >
            Custom
          </button>
        </div>
        {useCustom && (
          <input
            type="number"
            value={customRate}
            onChange={(e) => setCustomRate(e.target.value)}
            placeholder="Enter VAT rate %"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        )}
      </div>

      {result && (
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-5 space-y-3">
          <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-600">
            <span className="text-gray-600 dark:text-gray-400">Net Amount</span>
            <span className="font-semibold text-gray-900 dark:text-white">${fmt(result.net)}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-600">
            <span className="text-gray-600 dark:text-gray-400">
              VAT Amount ({!isNaN(effectiveRate) ? effectiveRate : 0}%)
            </span>
            <span className="font-semibold text-blue-600 dark:text-blue-400">${fmt(result.vat)}</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-gray-700 dark:text-gray-300 font-semibold">Gross Amount</span>
            <span className="font-bold text-xl text-gray-900 dark:text-white">${fmt(result.gross)}</span>
          </div>
        </div>
      )}

      {!result && (
        <div className="flex items-center justify-center h-24 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
          <p className="text-gray-400 dark:text-gray-500">Enter an amount to calculate VAT</p>
        </div>
      )}
    </div>
  );
}
