"use client";
import { useState } from "react";

function parseItems(raw: string): string[] {
  const byNewline = raw.split("\n").map((s) => s.trim()).filter(Boolean);
  if (byNewline.length > 1) return byNewline;
  return raw.split(",").map((s) => s.trim()).filter(Boolean);
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function ListRandomizer() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<string[]>([]);
  const [pickCount, setPickCount] = useState("1");
  const [copied, setCopied] = useState(false);

  function doShuffle() {
    const items = parseItems(input);
    if (!items.length) return;
    setResult(shuffle(items));
  }

  function pickN() {
    const items = parseItems(input);
    if (!items.length) return;
    const n = Math.min(parseInt(pickCount) || 1, items.length);
    setResult(shuffle(items).slice(0, n));
  }

  async function copy() {
    if (!result.length) return;
    await navigator.clipboard.writeText(result.join("\n"));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Items (one per line or comma-separated)
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={6}
          placeholder={"Apple\nBanana\nCherry\nor: Apple, Banana, Cherry"}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none font-mono text-sm"
        />
      </div>

      <div className="flex gap-3">
        <button
          onClick={doShuffle}
          disabled={!input.trim()}
          className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold rounded-xl transition-colors"
        >
          Shuffle All
        </button>
        <div className="flex gap-2 items-center">
          <input
            type="number"
            min="1"
            value={pickCount}
            onChange={(e) => setPickCount(e.target.value)}
            className="w-16 px-2 py-3 text-center rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={pickN}
            disabled={!input.trim()}
            className="px-4 py-3 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 disabled:opacity-50 text-gray-800 dark:text-white font-bold rounded-xl transition-colors whitespace-nowrap"
          >
            Pick N
          </button>
        </div>
      </div>

      {result.length > 0 && (
        <div className="space-y-3">
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 space-y-2">
            {result.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-3 py-2 border-b border-gray-200 dark:border-gray-600 last:border-0"
              >
                <span className="w-6 h-6 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  {i + 1}
                </span>
                <span className="text-gray-900 dark:text-white">{item}</span>
              </div>
            ))}
          </div>
          <button
            onClick={copy}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-800 dark:text-white text-sm font-semibold rounded-lg transition-colors"
          >
            {copied ? "Copied!" : "Copy Result"}
          </button>
        </div>
      )}
    </div>
  );
}
