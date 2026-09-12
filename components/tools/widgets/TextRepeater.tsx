"use client";
import { useDeferredValue, useMemo, useState } from "react";

const SEPARATOR_OPTIONS = [
  { label: "New Line", value: "\n" },
  { label: "Comma", value: ", " },
  { label: "Space", value: " " },
  { label: "Tab", value: "\t" },
  { label: "Custom", value: "custom" },
];

const MAX_TIMES = 10000;
/** The textarea only ever renders this much; Copy always gets the full string. */
const PREVIEW_CHARS = 20000;

export default function TextRepeater() {
  const [text, setText] = useState("");
  const [times, setTimes] = useState(5);
  const [separator, setSeparator] = useState("\n");
  const [customSep, setCustomSep] = useState(" | ");
  const [copied, setCopied] = useState(false);

  const activeSep = separator === "custom" ? customSep : separator;

  // Building 10,000 copies is cheap, but doing it on every keystroke is not.
  // Deferring keeps typing responsive while the big string catches up.
  const deferredText = useDeferredValue(text);
  const deferredTimes = useDeferredValue(times);
  const deferredSep = useDeferredValue(activeSep);
  const isStale = deferredText !== text || deferredTimes !== times || deferredSep !== activeSep;

  const output = useMemo(() => {
    if (!deferredText) return "";
    const n = Math.min(Math.max(deferredTimes, 1), MAX_TIMES);
    // Array(n).fill().join() builds the result in one pass instead of
    // re-allocating a growing string n times inside a loop.
    return new Array(n).fill(deferredText).join(deferredSep);
  }, [deferredText, deferredTimes, deferredSep]);

  const charCount = output.length;
  const wordCount = useMemo(
    () => (output ? output.trim().split(/\s+/).filter(Boolean).length : 0),
    [output]
  );

  const truncated = charCount > PREVIEW_CHARS;
  const preview = useMemo(
    () => (truncated ? output.slice(0, PREVIEW_CHARS) : output),
    [output, truncated]
  );

  const copy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  function setTimesSafe(raw: number) {
    if (Number.isNaN(raw)) return;
    setTimes(Math.min(Math.max(Math.round(raw), 1), MAX_TIMES));
  }

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Text to Repeat</label>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter text here..."
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label
                htmlFor="repeat-times"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Repeat Times
              </label>
              <input
                id="repeat-times"
                type="number"
                min={1}
                max={MAX_TIMES}
                value={times}
                onChange={(e) => setTimesSafe(parseInt(e.target.value, 10))}
                className="w-24 px-2 py-1 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 font-semibold text-right focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <input
              type="range"
              min={1}
              max={MAX_TIMES}
              value={times}
              onChange={(e) => setTimesSafe(parseInt(e.target.value, 10))}
              className="w-full accent-blue-500"
            />
            <div className="flex justify-between text-xs text-gray-400 dark:text-gray-500 mt-1">
              <span>1</span><span>2,500</span><span>5,000</span><span>7,500</span><span>10,000</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Separator</label>
            <div className="flex flex-wrap gap-2">
              {SEPARATOR_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setSeparator(opt.value)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    separator === opt.value
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            {separator === "custom" && (
              <input
                type="text"
                value={customSep}
                onChange={(e) => setCustomSep(e.target.value)}
                placeholder="Custom separator..."
                className="mt-2 w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-mono"
              />
            )}
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-3 gap-3 flex-wrap">
          <div className="flex items-center gap-4">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Output</h3>
            <span className={`text-xs ${isStale ? "text-gray-300 dark:text-gray-600" : "text-gray-400 dark:text-gray-500"}`}>
              {charCount.toLocaleString()} chars · {wordCount.toLocaleString()} words
            </span>
          </div>
          <button
            onClick={copy}
            disabled={!output}
            className="px-4 py-1.5 text-sm bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-lg transition-colors"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
        <textarea
          readOnly
          value={preview}
          rows={8}
          placeholder="Output will appear here..."
          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white resize-none focus:outline-none text-sm font-mono"
        />
        {truncated && (
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            Showing the first {PREVIEW_CHARS.toLocaleString()} of {charCount.toLocaleString()}{" "}
            characters to keep the page fast — Copy still gives you the whole thing.
          </p>
        )}
      </div>
    </div>
  );
}
