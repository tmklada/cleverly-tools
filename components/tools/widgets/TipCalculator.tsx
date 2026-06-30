"use client";
import { useState, useMemo } from "react";

const TIP_PRESETS = [10, 15, 18, 20, 25];

export default function TipCalculator() {
  const [bill, setBill] = useState("");
  const [tipPct, setTipPct] = useState(20);
  const [customTip, setCustomTip] = useState("");
  const [useCustom, setUseCustom] = useState(false);
  const [people, setPeople] = useState("1");
  const [roundUp, setRoundUp] = useState(false);

  const effectiveTip = useCustom ? parseFloat(customTip) || 0 : tipPct;

  const result = useMemo(() => {
    const b = parseFloat(bill);
    const n = parseInt(people) || 1;
    if (!b || b <= 0) return null;

    const tipAmount = b * (effectiveTip / 100);
    let total = b + tipAmount;
    if (roundUp) total = Math.ceil(total);

    const tipPerPerson = tipAmount / n;
    const totalPerPerson = total / n;

    return { tipAmount, total, tipPerPerson, totalPerPerson };
  }, [bill, effectiveTip, people, roundUp]);

  function fmt(n: number) {
    return `$${n.toFixed(2)}`;
  }

  return (
    <div className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Bill Amount ($)
        </label>
        <input
          type="number"
          value={bill}
          onChange={(e) => setBill(e.target.value)}
          placeholder="50.00"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Tip Percentage
        </label>
        <div className="flex flex-wrap gap-2 mb-3">
          {TIP_PRESETS.map((t) => (
            <button
              key={t}
              onClick={() => { setTipPct(t); setUseCustom(false); }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                !useCustom && tipPct === t
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
              }`}
            >
              {t}%
            </button>
          ))}
          <button
            onClick={() => setUseCustom(true)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
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
            value={customTip}
            onChange={(e) => setCustomTip(e.target.value)}
            placeholder="Enter tip %"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Number of People
          </label>
          <input
            type="number"
            min="1"
            value={people}
            onChange={(e) => setPeople(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center gap-3 pt-6">
          <input
            type="checkbox"
            id="roundUp"
            checked={roundUp}
            onChange={(e) => setRoundUp(e.target.checked)}
            className="w-4 h-4 accent-blue-600"
          />
          <label htmlFor="roundUp" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Round up total
          </label>
        </div>
      </div>

      {result && (
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-5 space-y-3">
          <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-600">
            <span className="text-gray-600 dark:text-gray-400">Bill</span>
            <span className="font-semibold text-gray-900 dark:text-white">{fmt(parseFloat(bill))}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-600">
            <span className="text-gray-600 dark:text-gray-400">Tip ({effectiveTip}%)</span>
            <span className="font-semibold text-blue-600 dark:text-blue-400">{fmt(result.tipAmount)}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-600">
            <span className="text-gray-700 dark:text-gray-300 font-semibold">Total</span>
            <span className="font-bold text-gray-900 dark:text-white">{fmt(result.total)}</span>
          </div>
          {parseInt(people) > 1 && (
            <>
              <div className="pt-2">
                <div className="text-xs text-center text-gray-500 dark:text-gray-400 mb-3">
                  Per Person ({people} people)
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-3 text-center">
                    <div className="text-xs text-gray-500 dark:text-gray-400">Tip / person</div>
                    <div className="text-xl font-bold text-blue-700 dark:text-blue-300">
                      {fmt(result.tipPerPerson)}
                    </div>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-3 text-center">
                    <div className="text-xs text-gray-500 dark:text-gray-400">Total / person</div>
                    <div className="text-xl font-bold text-green-700 dark:text-green-300">
                      {fmt(result.totalPerPerson)}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {!result && (
        <div className="flex items-center justify-center h-24 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
          <p className="text-gray-400 dark:text-gray-500">Enter a bill amount to calculate tip</p>
        </div>
      )}
    </div>
  );
}
