"use client";
import { useState } from "react";

type Mode = "price-to-sale" | "sale-to-pct" | "stack";

export default function DiscountCalculator() {
  const [mode, setMode] = useState<Mode>("price-to-sale");
  const [original, setOriginal] = useState("");
  const [discount, setDiscount] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [discount2, setDiscount2] = useState("");

  const orig = parseFloat(original);
  const disc = parseFloat(discount);
  const sale = parseFloat(salePrice);
  const disc2 = parseFloat(discount2);

  const calcSale = () => {
    if (!orig || !disc) return null;
    const s = orig * (1 - disc / 100);
    const savings = orig - s;
    return { salePrice: s, savings, pct: disc };
  };

  const calcPct = () => {
    if (!orig || !sale || sale > orig) return null;
    const pct = ((orig - sale) / orig) * 100;
    return { pct, savings: orig - sale };
  };

  const calcStack = () => {
    if (!orig || !disc || !disc2) return null;
    const after1 = orig * (1 - disc / 100);
    const final = after1 * (1 - disc2 / 100);
    const savings = orig - final;
    const totalPct = (savings / orig) * 100;
    return { after1, final, savings, totalPct };
  };

  const saleResult = mode === "price-to-sale" ? calcSale() : null;
  const pctResult = mode === "sale-to-pct" ? calcPct() : null;
  const stackResult = mode === "stack" ? calcStack() : null;

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex gap-2 mb-6 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
          {([
            { key: "price-to-sale", label: "Calc Sale Price" },
            { key: "sale-to-pct", label: "Calc Discount %" },
            { key: "stack", label: "Stack Coupons" },
          ] as { key: Mode; label: string }[]).map((t) => (
            <button
              key={t.key}
              onClick={() => setMode(t.key)}
              className={`flex-1 py-2 rounded-lg text-xs font-medium transition-colors ${
                mode === t.key
                  ? "bg-white dark:bg-gray-700 shadow text-gray-900 dark:text-white"
                  : "text-gray-500 dark:text-gray-400"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {mode === "price-to-sale" && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Original Price ($)</label>
              <input type="number" value={original} onChange={(e) => setOriginal(e.target.value)} placeholder="100"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Discount (%)</label>
              <input type="number" value={discount} onChange={(e) => setDiscount(e.target.value)} placeholder="20" min="0" max="100"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg" />
            </div>
            {saleResult && (
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 text-center">
                  <p className="text-3xl font-bold text-green-700 dark:text-green-300">${saleResult.salePrice.toFixed(2)}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Sale Price</p>
                </div>
                <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-4 text-center">
                  <p className="text-3xl font-bold text-red-600 dark:text-red-400">-${saleResult.savings.toFixed(2)}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">You Save ({saleResult.pct}%)</p>
                </div>
              </div>
            )}
          </div>
        )}

        {mode === "sale-to-pct" && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Original Price ($)</label>
              <input type="number" value={original} onChange={(e) => setOriginal(e.target.value)} placeholder="100"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Sale Price ($)</label>
              <input type="number" value={salePrice} onChange={(e) => setSalePrice(e.target.value)} placeholder="80"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg" />
            </div>
            {pctResult && (
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 text-center">
                  <p className="text-3xl font-bold text-blue-700 dark:text-blue-300">{pctResult.pct.toFixed(1)}%</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Discount</p>
                </div>
                <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-4 text-center">
                  <p className="text-3xl font-bold text-red-600 dark:text-red-400">-${pctResult.savings.toFixed(2)}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Savings</p>
                </div>
              </div>
            )}
          </div>
        )}

        {mode === "stack" && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Original Price ($)</label>
              <input type="number" value={original} onChange={(e) => setOriginal(e.target.value)} placeholder="100"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Coupon 1 (%)</label>
                <input type="number" value={discount} onChange={(e) => setDiscount(e.target.value)} placeholder="20" min="0" max="100"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Coupon 2 (%)</label>
                <input type="number" value={discount2} onChange={(e) => setDiscount2(e.target.value)} placeholder="10" min="0" max="100"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
            {stackResult && (
              <div className="space-y-3 pt-2">
                <div className="flex justify-between items-center bg-gray-50 dark:bg-gray-800 rounded-lg px-4 py-2 text-sm">
                  <span className="text-gray-600 dark:text-gray-400">After coupon 1 ({disc}% off)</span>
                  <span className="font-bold text-gray-900 dark:text-white">${stackResult.after1.toFixed(2)}</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 text-center">
                    <p className="text-3xl font-bold text-green-700 dark:text-green-300">${stackResult.final.toFixed(2)}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Final Price</p>
                  </div>
                  <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-4 text-center">
                    <p className="text-2xl font-bold text-red-600 dark:text-red-400">-${stackResult.savings.toFixed(2)}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Total Saved ({stackResult.totalPct.toFixed(1)}%)</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
