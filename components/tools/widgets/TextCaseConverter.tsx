"use client";
import { useState } from "react";

export default function TextCaseConverter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const conversions = [
    { label: "UPPERCASE", fn: (s: string) => s.toUpperCase() },
    { label: "lowercase", fn: (s: string) => s.toLowerCase() },
    { label: "Title Case", fn: (s: string) => s.replace(/\w\S*/g, w => w[0].toUpperCase() + w.slice(1).toLowerCase()) },
    { label: "Sentence case", fn: (s: string) => s.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, c => c.toUpperCase()) },
    { label: "camelCase", fn: (s: string) => s.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_, c) => c.toUpperCase()) },
    { label: "snake_case", fn: (s: string) => s.toLowerCase().replace(/[^a-zA-Z0-9]+/g, "_").replace(/^_|_$/g, "") },
    { label: "kebab-case", fn: (s: string) => s.toLowerCase().replace(/[^a-zA-Z0-9]+/g, "-").replace(/^-|-$/g, "") },
    { label: "PascalCase", fn: (s: string) => s.replace(/(?:^|\s|[^a-zA-Z0-9])(\w)/g, (_, c) => c.toUpperCase()).replace(/[^a-zA-Z0-9]/g, "") },
  ];

  function copy() {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="space-y-4">
      <textarea value={input} onChange={e => setInput(e.target.value)} placeholder="Enter your text here..." rows={4}
        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {conversions.map(({ label, fn }) => (
          <button key={label} onClick={() => setOutput(fn(input))}
            className="px-3 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-blue-100 dark:hover:bg-blue-900/30 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium transition-colors">
            {label}
          </button>
        ))}
      </div>
      {output && (
        <div className="space-y-2">
          <div className="relative">
            <textarea value={output} readOnly rows={4}
              className="w-full px-4 py-3 rounded-xl border border-green-200 dark:border-green-700 bg-green-50 dark:bg-green-900/20 text-gray-900 dark:text-white resize-none" />
          </div>
          <button onClick={copy} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${copied ? "bg-green-600 text-white" : "bg-blue-600 hover:bg-blue-700 text-white"}`}>
            {copied ? "✓ Copied!" : "Copy Result"}
          </button>
        </div>
      )}
    </div>
  );
}
