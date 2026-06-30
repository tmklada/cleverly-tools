"use client";
import { useState } from "react";

export default function CoinFlip() {
  const [result, setResult] = useState<"heads" | "tails" | null>(null);
  const [flipping, setFlipping] = useState(false);
  const [stats, setStats] = useState({ total: 0, heads: 0, tails: 0 });

  function flip(count = 1) {
    if (flipping) return;
    setFlipping(true);

    setTimeout(() => {
      let lastResult: "heads" | "tails" = "heads";
      let h = 0;
      let t = 0;
      for (let i = 0; i < count; i++) {
        const r = Math.random() < 0.5 ? "heads" : "tails";
        lastResult = r;
        if (r === "heads") h++;
        else t++;
      }
      setResult(lastResult);
      setStats((prev) => ({
        total: prev.total + count,
        heads: prev.heads + h,
        tails: prev.tails + t,
      }));
      setFlipping(false);
    }, 600);
  }

  const headsPercent = stats.total > 0 ? Math.round((stats.heads / stats.total) * 100) : 50;
  const tailsPercent = stats.total > 0 ? Math.round((stats.tails / stats.total) * 100) : 50;

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
            <p className="text-2xl font-bold text-gray-900 dark:text-white capitalize">{result}!</p>
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={() => flip(1)}
            disabled={flipping}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-bold rounded-xl transition-colors"
          >
            {flipping ? "Flipping..." : "Flip Coin"}
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

      {stats.total > 0 && (
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 space-y-3">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Statistics</h3>
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
