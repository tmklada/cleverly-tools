"use client";
import { useState } from "react";

const D6_FACES = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];
const DICE_PRESETS = [4, 6, 8, 10, 12, 20] as const;

const MIN_SIDES = 2;
const MAX_SIDES = 1000;
const MAX_DICE = 20;

interface RollEntry {
  dice: number;
  type: number;
  results: number[];
  subtotal: number;
  modifier: number;
  total: number;
}

/**
 * Cryptographically secure integer in [1, sides] with rejection sampling,
 * so there is no modulo bias — every face is exactly equally likely.
 */
function secureRolls(count: number, sides: number): number[] {
  const out: number[] = [];
  const limit = Math.floor(4294967296 / sides) * sides; // largest multiple of `sides` that fits a uint32
  const buf = new Uint32Array(count);
  while (out.length < count) {
    crypto.getRandomValues(buf);
    for (let i = 0; i < buf.length && out.length < count; i++) {
      if (buf[i] < limit) out.push((buf[i] % sides) + 1);
    }
  }
  return out;
}

export default function DiceRoller() {
  const [diceCount, setDiceCount] = useState(2);
  const [diceType, setDiceType] = useState<number>(6);
  const [customSides, setCustomSides] = useState<string>("100");
  const [modifier, setModifier] = useState<number>(0);
  const [rolling, setRolling] = useState(false);
  const [currentRoll, setCurrentRoll] = useState<RollEntry | null>(null);
  const [history, setHistory] = useState<RollEntry[]>([]);

  const isPreset = (DICE_PRESETS as readonly number[]).includes(diceType);

  function applyCustomSides(raw: string) {
    setCustomSides(raw);
    const n = parseInt(raw, 10);
    if (!Number.isNaN(n) && n >= MIN_SIDES && n <= MAX_SIDES) setDiceType(n);
  }

  function roll() {
    if (rolling) return;
    setRolling(true);
    setTimeout(() => {
      const results = secureRolls(diceCount, diceType);
      const subtotal = results.reduce((a, b) => a + b, 0);
      const entry: RollEntry = {
        dice: diceCount,
        type: diceType,
        results,
        subtotal,
        modifier,
        total: subtotal + modifier,
      };
      setCurrentRoll(entry);
      setHistory((prev) => [entry, ...prev].slice(0, 6));
      setRolling(false);
    }, 500);
  }

  function renderDie(value: number, type: number) {
    if (type === 6) {
      return (
        <span className="text-4xl" title={`${value}`}>
          {D6_FACES[value - 1]}
        </span>
      );
    }
    return (
      <div className="min-w-12 h-12 px-2 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold text-lg">
        {value}
      </div>
    );
  }

  const modLabel = modifier === 0 ? "" : modifier > 0 ? ` + ${modifier}` : ` − ${Math.abs(modifier)}`;
  const notation = `${diceCount}d${diceType}${modifier === 0 ? "" : modifier > 0 ? `+${modifier}` : modifier}`;
  const customInvalid =
    customSides.trim() !== "" &&
    (() => {
      const n = parseInt(customSides, 10);
      return Number.isNaN(n) || n < MIN_SIDES || n > MAX_SIDES;
    })();

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Number of Dice
          </label>
          <div className="flex gap-1 flex-wrap">
            {[1, 2, 3, 4, 5, 6, 8, 10].map((n) => (
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
            {DICE_PRESETS.map((d) => (
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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="custom-sides"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Custom sides ({MIN_SIDES}–{MAX_SIDES})
          </label>
          <div className="flex gap-2 items-center">
            <span className="text-gray-500 dark:text-gray-400 font-mono">d</span>
            <input
              id="custom-sides"
              type="number"
              min={MIN_SIDES}
              max={MAX_SIDES}
              value={customSides}
              onChange={(e) => applyCustomSides(e.target.value)}
              className={`w-28 px-3 py-2 rounded-lg border bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 ${
                customInvalid
                  ? "border-red-400 focus:ring-red-500"
                  : "border-gray-200 dark:border-gray-600 focus:ring-blue-500"
              }`}
            />
            {!isPreset && (
              <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
                using d{diceType}
              </span>
            )}
          </div>
          {customInvalid && (
            <p className="text-xs text-red-500 mt-1">
              Enter a whole number between {MIN_SIDES} and {MAX_SIDES}.
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="dice-modifier"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Modifier (+/−)
          </label>
          <div className="flex gap-2 items-center">
            <button
              onClick={() => setModifier((m) => m - 1)}
              className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold"
              aria-label="Decrease modifier"
            >
              −
            </button>
            <input
              id="dice-modifier"
              type="number"
              value={modifier}
              onChange={(e) => {
                const v = parseInt(e.target.value, 10);
                setModifier(Number.isNaN(v) ? 0 : v);
              }}
              className="w-24 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={() => setModifier((m) => m + 1)}
              className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold"
              aria-label="Increase modifier"
            >
              +
            </button>
          </div>
        </div>
      </div>

      <button
        onClick={roll}
        disabled={rolling || diceCount < 1 || diceCount > MAX_DICE}
        className={`w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-bold rounded-xl transition-colors ${rolling ? "animate-pulse" : ""}`}
      >
        {rolling ? "Rolling..." : `Roll ${notation}`}
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
          <div className="text-center space-y-1">
            <div className="text-xs text-gray-500 dark:text-gray-400 font-mono">
              [{currentRoll.results.join(" + ")}]
              {currentRoll.modifier !== 0 && (
                <>
                  {" "}
                  = {currentRoll.subtotal}
                  {currentRoll.modifier > 0
                    ? ` + ${currentRoll.modifier}`
                    : ` − ${Math.abs(currentRoll.modifier)}`}
                </>
              )}
            </div>
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">Total: </span>
              <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                {currentRoll.total}
              </span>
            </div>
          </div>
        </div>
      )}

      {history.length > 1 && (
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Recent Rolls</h3>
          {history.slice(1).map((h, i) => (
            <div
              key={i}
              className="flex justify-between items-center gap-3 text-sm bg-gray-50 dark:bg-gray-700/50 rounded-lg px-3 py-2"
            >
              <span className="text-gray-500 dark:text-gray-400 truncate">
                {h.dice}d{h.type}
                {h.modifier === 0 ? "" : h.modifier > 0 ? `+${h.modifier}` : h.modifier}: [
                {h.results.join(", ")}]
              </span>
              <span className="font-bold text-gray-900 dark:text-white whitespace-nowrap">
                = {h.total}
              </span>
            </div>
          ))}
        </div>
      )}

      <p className="text-xs text-gray-400 dark:text-gray-500 text-center">
        Rolling {notation}
        {modLabel && <> — dice total{modLabel}</>}
      </p>
    </div>
  );
}
