"use client";
import { useState } from "react";

type Side = "heads" | "tails";

const MAX_COINS = 100;

/**
 * Cryptographically secure coin flips.
 * Each byte contributes one unbiased bit (its least-significant bit),
 * so there is no modulo bias — every flip is an exact 50/50.
 */
function secureFlips(count: number): Side[] {
  const bytes = new Uint8Array(count);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => ((b & 1) === 0 ? "heads" : "tails"));
}

export default function CoinFlip() {
  const [coinCount, setCoinCount] = useState(1);
  const [batch, setBatch] = useState<Side[]>([]);
  const [flipping, setFlipping] = useState(false);
  const [stats, setStats] = useState({ total: 0, heads: 0, tails: 0 });

  const result: Side | null = batch.length > 0 ? batch[batch.length - 1] : null;

  function flip(count: number) {
    if (flipping) return;
    const n = Math.min(Math.max(Math.round(count) || 1, 1), MAX_COINS);
    setFlipping(true);

    setTimeout(() => {
      const results = secureFlips(n);
      const h = results.filter((r) => r === "heads").length;
      const t = results.length - h;
      setBatch(results);
      setStats((prev) => ({
        total: prev.total + n,
        heads: prev.heads + h,
        tails: prev.tails + t,
      }));
      setFlipping(false);
    }, 600);
  }

  function resetStats() {
    setBatch([]);
    setStats({ total: 0, heads: 0, tails: 0 });
  }

  const batchHeads = batch.filter((r) => r === "heads").length;
  const batchTails = batch.length - batchHeads;
  const batchHeadsPct = batch.length > 0 ? Math.round((batchHeads / batch.length) * 100) : 0;
  const batchTailsPct = batch.length > 0 ? 100 - batchHeadsPct : 0;

  const headsPercent = stats.total > 0 ? Math.round((stats.heads / stats.total) * 100) : 50;
  const tailsPercent = stats.total > 0 ? 100 - headsPercent : 50;

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center gap-6">
        <div
          className="relative"
          style={{
            width: 160,
            height: 160,
            perspective: 600,
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              transformStyle: "preserve-3d",
              transition: flipping ? "transform 0.6s ease-in-out" : "none",
              transform: flipping ? "rotateY(720deg)" : "rotateY(0deg)",
            }}
          >
            <div
              className={`w-full h-full rounded-full flex items-center justify-center text-6xl shadow-xl border-4 ${
                result === "tails"
                  ? "bg-gray-200 dark:bg-gray-600 border-gray-400"
                  : "bg-yellow-400 border-yellow-500"
              }`}
            >
              {result === null ? "🪙" : result === "heads" ? "👑" : "⊕"}
            </div>
          </div>
        </div>

        {result && !flipping && (
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900 dark:text-white capitalize">
              {batch.length === 1 ? `${result}!` : `${batchHeads} heads · ${batchTails} tails`}
            </p>
            {batch.length > 1 && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                from {batch.length} coins in this flip
              </p>
            )}
          </div>
        )}

        <div className="w-full max-w-sm">
          <label
            htmlFor="coin-count"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Number of coins ({MAX_COINS} max)
          </label>
          <div className="flex gap-2 items-center">
            <input
              id="coin-count"
              type="number"
              min={1}
              max={MAX_COINS}
              value={coinCount}
              onChange={(e) => {
                const v = parseInt(e.target.value, 10);
                setCoinCount(Number.isNaN(v) ? 1 : Math.min(Math.max(v, 1), MAX_COINS));
              }}
              className="w-24 px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex gap-1 flex-wrap">
              {[1, 2, 5, 10, 25, 100].map((n) => (
                <button
                  key={n}
                  onClick={() => setCoinCount(n)}
                  className={`px-3 h-9 rounded-lg text-sm font-medium transition-colors ${
                    coinCount === n
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-3 flex-wrap justify-center">
          <button
            onClick={() => flip(coinCount)}
            disabled={flipping}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-bold rounded-xl transition-colors"
          >
            {flipping ? "Flipping..." : coinCount === 1 ? "Flip Coin" : `Flip ${coinCount} Coins`}
          </button>
          <button
            onClick={() => flip(10)}
            disabled={flipping}
            className="px-6 py-3 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 disabled:opacity-60 text-gray-800 dark:text-white font-bold rounded-xl transition-colors"
          >
            Flip 10x
          </button>
        </div>
      </div>

      {batch.length > 1 && !flipping && (
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              This Flip — Every Result
            </h3>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              👑 {batchHeads} ({batchHeadsPct}%) · ⊕ {batchTails} ({batchTailsPct}%)
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {batch.map((r, i) => (
              <span
                key={i}
                title={`Coin ${i + 1}: ${r}`}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm border ${
                  r === "heads"
                    ? "bg-yellow-400 border-yellow-500 text-yellow-900"
                    : "bg-gray-200 dark:bg-gray-600 border-gray-400 text-gray-700 dark:text-gray-200"
                }`}
              >
                {r === "heads" ? "👑" : "⊕"}
              </span>
            ))}
          </div>
        </div>
      )}

      {stats.total > 0 && (
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Session Statistics
            </h3>
            <button
              onClick={resetStats}
              className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white underline"
            >
              Reset
            </button>
          </div>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Total Flips</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-600">{stats.heads}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Heads ({headsPercent}%)</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-600 dark:text-gray-300">{stats.tails}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Tails ({tailsPercent}%)</div>
            </div>
          </div>
          <div className="w-full h-3 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
            <div
              className="h-full bg-yellow-400 transition-all duration-500 rounded-full"
              style={{ width: `${headsPercent}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
            <span>👑 Heads</span>
            <span>Tails ⊕</span>
          </div>
        </div>
      )}
    </div>
  );
}
