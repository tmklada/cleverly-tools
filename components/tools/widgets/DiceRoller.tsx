"use client";
import { useState } from "react";

const D6_FACES = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];
const DICE_TYPES = [4, 6, 8, 10, 12, 20] as const;
type DiceType = typeof DICE_TYPES[number];

interface RollEntry {
  dice: number;
  type: DiceType;
  results: number[];
  total: number;
}

export default function DiceRoller() {
  const [diceCount, setDiceCount] = useState(2);
  const [diceType, setDiceType] = useState<DiceType>(6);
  const [rolling, setRolling] = useState(false);
  const [currentRoll, setCurrentRoll] = useState<RollEntry | null>(null);
  const [history, setHistory] = useState<RollEntry[]>([]);

  function roll() {
    if (rolling) return;
    setRolling(true);
    setTimeout(() => {
      const results = Array.from({ length: diceCount }, () =>
        Math.floor(Math.random() * diceType) + 1
      );
      const total = results.reduce((a, b) => a + b, 0);
      const entry: RollEntry = { dice: diceCount, type: diceType, results, total };
      setCurrentRoll(entry);
      setHistory((prev) => [entry, ...prev].slice(0, 5));
      setRolling(false);
    }, 500);
  }

  function renderDie(value: number, type: DiceType) {
    if (type === 6) {
      return (
        <span className="text-4xl" title={`${value}`}>
          {D6_FACES[value - 1]}
        </span>
      );
    }
    return (
      <div className="w-12 h-12 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold text-lg">
        {value}
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Number of Dice
          </label>
          <div className="flex gap-1 flex-wrap">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <button
                key={n}
                onClick={() => setDiceCount(n)}
                className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                  diceCount === n
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Dice Type
          </label>
          <div className="flex gap-1 flex-wrap">
            {DICE_TYPES.map((d) => (
              <button
                key={d}
                onClick={() => setDiceType(d)}
                className={`px-2 h-10 rounded-lg text-sm font-medium transition-colors ${
                  diceType === d
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                }`}
              >
                d{d}
              </button>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={roll}
        disabled={rolling}
        className={`w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-bold rounded-xl transition-colors ${rolling ? "animate-pulse" : ""}`}
      >
        {rolling ? "Rolling..." : `Roll ${diceCount}d${diceType}`}
      </button>

      {currentRoll && !rolling && (
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-5 space-y-4">
          <div className="flex flex-wrap gap-3 justify-center">
            {currentRoll.results.map((r, i) => (
              <div key={i} className="flex items-center justify-center">
                {renderDie(r, currentRoll.type)}
              </div>
            ))}
          </div>
          <div className="text-center">
            <span className="text-sm text-gray-500 dark:text-gray-400">Total: </span>
            <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              {currentRoll.total}
            </span>
          </div>
        </div>
      )}

      {history.length > 1 && (
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Recent Rolls</h3>
          {history.slice(1).map((h, i) => (
            <div
              key={i}
              className="flex justify-between items-center text-sm bg-gray-50 dark:bg-gray-700/50 rounded-lg px-3 py-2"
            >
              <span className="text-gray-500 dark:text-gray-400">
                {h.dice}d{h.type}: [{h.results.join(", ")}]
              </span>
              <span className="font-bold text-gray-900 dark:text-white">= {h.total}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
