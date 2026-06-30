"use client";
import { useState, useEffect } from "react";

export default function NamePicker() {
  const [input, setInput] = useState("");
  const [winner, setWinner] = useState<string | null>(null);
  const [winners, setWinners] = useState<string[]>([]);
  const [spinning, setSpinning] = useState(false);
  const [removeWinners, setRemoveWinners] = useState(false);
  const [pickCount, setPickCount] = useState("1");
  const [confetti, setConfetti] = useState(false);
  const [displayName, setDisplayName] = useState("");

  const names = input.split("\n").map((n) => n.trim()).filter(Boolean);

  function pickWinners() {
    if (names.length === 0 || spinning) return;
    const n = Math.min(parseInt(pickCount) || 1, names.length);

    setSpinning(true);
    setConfetti(false);
    setWinner(null);

    let pool = [...names];
    if (removeWinners) {
      pool = names.filter((name) => !winners.includes(name));
    }
    if (pool.length === 0) return;

    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    const picked = shuffled.slice(0, n);

    let count = 0;
    const interval = setInterval(() => {
      setDisplayName(pool[Math.floor(Math.random() * pool.length)]);
      count++;
      if (count > 15) {
        clearInterval(interval);
        setSpinning(false);
        setWinner(picked[0]);
        if (n > 1) setDisplayName(picked.join(", "));
        if (removeWinners) setWinners((prev) => [...prev, ...picked]);
        setConfetti(true);
        setTimeout(() => setConfetti(false), 3000);
      }
    }, 80);
  }

  return (
    <div className="space-y-5">
      {confetti && (
        <style>{`
          @keyframes confettiFall {
            0% { transform: translateY(-20px) rotate(0deg); opacity: 1; }
            100% { transform: translateY(200px) rotate(720deg); opacity: 0; }
          }
          .confetti-piece {
            position: absolute;
            width: 8px;
            height: 8px;
            animation: confettiFall 2s ease-in forwards;
          }
        `}</style>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Names (one per line)
        </label>
        <textarea
          value={input}
          onChange={(e) => { setInput(e.target.value); setWinner(null); }}
          rows={6}
          placeholder={"Alice\nBob\nCharlie\nDiana"}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{names.length} names</p>
      </div>

      <div className="flex gap-4 items-center">
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-700 dark:text-gray-300">Pick</label>
          <input
            type="number"
            min="1"
            max={names.length || 1}
            value={pickCount}
            onChange={(e) => setPickCount(e.target.value)}
            className="w-16 px-2 py-1 text-center rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
          <input
            type="checkbox"
            checked={removeWinners}
            onChange={(e) => setRemoveWinners(e.target.checked)}
            className="w-4 h-4 accent-blue-600"
          />
          Remove picked names
        </label>
      </div>

      {(spinning || winner) && (
        <div className={`relative overflow-hidden rounded-xl p-8 text-center ${confetti ? "bg-yellow-50 dark:bg-yellow-900/20" : "bg-gray-50 dark:bg-gray-700/50"}`}>
          {confetti && (
            <div className="absolute inset-0 pointer-events-none">
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className="confetti-piece rounded-sm"
                  style={{
                    left: `${(i / 12) * 100}%`,
                    backgroundColor: ["#60a5fa","#34d399","#f59e0b","#f472b6","#a78bfa"][i % 5],
                    animationDelay: `${(i * 0.1).toFixed(1)}s`,
                    top: 0,
                  }}
                />
              ))}
            </div>
          )}
          <div className={`text-3xl font-bold text-gray-900 dark:text-white ${spinning ? "animate-pulse" : "animate-bounce"}`}>
            {spinning ? displayName || "..." : winner}
          </div>
          {!spinning && winner && (
            <p className="mt-2 text-gray-500 dark:text-gray-400 text-sm">🎉 Winner!</p>
          )}
        </div>
      )}

      <button
        onClick={pickWinners}
        disabled={names.length === 0 || spinning}
        className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold rounded-xl transition-colors"
      >
        {spinning ? "Picking..." : "Pick a Winner!"}
      </button>

      {winners.length > 0 && removeWinners && (
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Picked Winners</h3>
            <button onClick={() => setWinners([])} className="text-xs text-red-500 hover:text-red-600">
              Clear
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {winners.map((w, i) => (
              <span key={i} className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm">
                {w}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
