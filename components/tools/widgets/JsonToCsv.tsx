"use client";
import { useState } from "react";

function flattenObj(obj: Record<string, unknown>, prefix = ""): Record<string, string> {
  const result: Record<string, string> = {};
  for (const key in obj) {
    const val = obj[key];
    const newKey = prefix ? `${prefix}.${key}` : key;
    if (val !== null && typeof val === "object" && !Array.isArray(val)) {
      Object.assign(result, flattenObj(val as Record<string, unknown>, newKey));
    } else {
      result[newKey] = Array.isArray(val) ? JSON.stringify(val) : String(val ?? "");
    }
  }
  return result;
}

function jsonToCsv(json: unknown[]): string {
  if (!Array.isArray(json) || json.length === 0) throw new Error("Input must be a non-empty array");
  const rows = json.map(item => flattenObj(item as Record<string, unknown>));
  const keys = [...new Set(rows.flatMap(r => Object.keys(r)))];
  const escape = (v: string) => `"${v.replace(/"/g, '""')}"`;
  const header = keys.map(escape).join(",");
  const body = rows.map(row => keys.map(k => escape(row[k] ?? "")).join(",")).join("\n");
  return `${header}\n${body}`;
}

export default function JsonToCsv() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  function convert() {
    setError("");
    setOutput("");
    try {
      const parsed = JSON.parse(input);
      if (!Array.isArray(parsed)) throw new Error("JSON must be an array of objects");
      const csv = jsonToCsv(parsed);
      setOutput(csv);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Invalid JSON");
    }
  }

  function copy() {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function download() {
    const blob = new Blob([output], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "data.csv";
    a.click();
  }

  const sampleJson = `[
  {"name": "Alice", "age": 28, "city": "NYC"},
  {"name": "Bob", "age": 34, "city": "LA"}
]`;

  return (
    <div className="space-y-5">
      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">JSON Input (array of objects)</label>
          <button onClick={() => setInput(sampleJson)} className="text-xs text-blue-600 hover:text-blue-700 dark:text-blue-400">Load Sample</button>
        </div>
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          rows={8}
          placeholder={'[\n  {"name": "Alice", "age": 28},\n  {"name": "Bob", "age": 34}\n]'}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm resize-none"
        />
      </div>

      {error && <p className="text-sm text-red-500 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">{error}</p>}

      <button onClick={convert}
        className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors">
        Convert to CSV
      </button>

      {output && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">CSV Output</p>
            <div className="flex gap-2">
              <button onClick={copy} className="text-xs px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                {copied ? "Copied!" : "Copy"}
              </button>
              <button onClick={download} className="text-xs px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
                Download .csv
              </button>
            </div>
          </div>
          <textarea
            value={output}
            readOnly
            rows={8}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-900 text-green-400 font-mono text-sm resize-none focus:outline-none"
          />
        </div>
      )}
    </div>
  );
}
