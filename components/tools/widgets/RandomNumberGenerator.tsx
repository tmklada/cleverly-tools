"use client";
import { useState } from "react";

interface HistoryEntry {
  min: number;
  max: number;
  count: number;
  unique: boolean;
  numbers: number[];
}

export default function RandomNumberGenerator() {
  const [min, setMin] = useState("1");
  const [max, setMax] = useState("100");
  const [count, setCount] = useState("1");
  const [unique, setUnique] = useState(false);
  const [results, setResults] = useState<number[]>([]);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  function generate() {
    setError("");
    const minN = parseInt(min);
    const maxN = parseInt(max);
    const countN = Math.min(Math.max(parseInt(count) || 1, 1), 100);

    if (isNaN(minN) || isNaN(maxN)) {
      setError("Please enter valid numbers");
      return;
    }
    if (minN >= maxN) {
      setError("Max must be greater than Min");
      return;
    }
    if (unique && countN > maxN - minN + 1) {
      setError(`Can't generate ${countN} unique numbers in range ${minN}–${maxN}`);
      return;
    }

    let nums: number[] = [];
    if (unique) {
      const pool = Array.from({ length: maxN - minN + 1 }, (_, i) => minN + i);
      for (let i = pool.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pool[i], pool[j]] = [pool[j], pool[i]];
      }
      nums = pool.slice(0, countN);
    } else {
      nums = Array.from({ length: countN }, () =>
        Math.floor(Math.random() * (maxN - minN + 1)) + minN
      );
    }

    setResults(nums);
    setHistory((prev) =>
      [{ min: minN, max: maxN, count: countN, unique, numbers: nums }, ...prev].slice(0, 5)
    );
  }

  async function copyAll() {
    await navigator.clipboard.writeText(results.join(", "));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Min</label>
          <input
            type="number"
            value={min}
            onChange={(e) => setMin(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Max</label>
          <input
            type="number"
            value={max}
            onChange={(e) => setMax(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Count (1–100)
          </label>
          <input
            type="number"
            min="1"
            max="100"
            value={count}
            onChange={(e) => setCount(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center gap-3 pt-6">
          <input
            type="checkbox"
            id="unique"
            checked={unique}
            onChange={(e) => setUnique(e.target.checked)}
            className="w-4 h-4 accent-blue-600"
          />
          <label htmlFor="unique" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Unique numbers only
          </label>
        </div>
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <button
        onClick={generate}
        className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors"
      >
        Generate
      </button>

      {results.length > 0 && (
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {results.map((n, i) => (
              <span
                key={i}
                className="px-3 py-2 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg font-mono font-semibold"
              >
                {n}
              </span>
            ))}
          </div>
          <button
            onClick={copyAll}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-800 dark:text-white text-sm font-semibold rounded-lg transition-colors"
          >
            {copied ? "Copied!" : "Copy All"}
          </button>
        </div>
      )}

      {history.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Recent Generations</h3>
          {history.map((h, i) => (
            <div key={i} className="text-xs bg-gray-50 dark:bg-gray-700/50 rounded-lg px-3 py-2">
              <span className="text-gray-500 dark:text-gray-400">
                Range {h.min}–{h.max}, {h.count} numbers{h.unique ? " (unique)" : ""}:{" "}
              </span>
              <span className="font-mono text-gray-700 dark:text-gray-300">
                {h.numbers.join(", ")}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
