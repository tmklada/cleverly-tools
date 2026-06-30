"use client";
import { useState } from "react";

const SEPARATOR_OPTIONS = [
  { label: "New Line", value: "\n" },
  { label: "Comma", value: ", " },
  { label: "Space", value: " " },
  { label: "Tab", value: "\t" },
  { label: "Custom", value: "custom" },
];

export default function TextRepeater() {
  const [text, setText] = useState("");
  const [times, setTimes] = useState(5);
  const [separator, setSeparator] = useState("\n");
  const [customSep, setCustomSep] = useState(" | ");
  const [copied, setCopied] = useState(false);

  const activeSep = separator === "custom" ? customSep : separator;
  const output = text ? Array(Math.min(times, 1000)).fill(text).join(activeSep) : "";
  const charCount = output.length;
  const wordCount = output ? output.trim().split(/\s+/).filter(Boolean).length : 0;

  const copy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Repeat Times: <span className="text-blue-600 dark:text-blue-400">{times}</span>
            </label>
            <input
              type="range"
              min={1}
              max={1000}
              value={times}
              onChange={(e) => setTimes(parseInt(e.target.value))}
              className="w-full accent-blue-500"
            />
            <div className="flex justify-between text-xs text-gray-400 dark:text-gray-500 mt-1">
              <span>1</span><span>250</span><span>500</span><span>750</span><span>1000</span>
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
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-4">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Output</h3>
            <span className="text-xs text-gray-400 dark:text-gray-500">{charCount.toLocaleString()} chars · {wordCount.toLocaleString()} words</span>
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
          value={output}
          rows={8}
          placeholder="Output will appear here..."
          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white resize-none focus:outline-none text-sm font-mono"
        />
      </div>
    </div>
  );
}
