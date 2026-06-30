"use client";
import { useState } from "react";

export default function JsonFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  function format() {
    try { setOutput(JSON.stringify(JSON.parse(input), null, 2)); setError(""); }
    catch (e) { setError("Invalid JSON: " + (e as Error).message); setOutput(""); }
  }

  function minify() {
    try { setOutput(JSON.stringify(JSON.parse(input))); setError(""); }
    catch (e) { setError("Invalid JSON: " + (e as Error).message); setOutput(""); }
  }

  function copy() {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="space-y-4">
      <textarea value={input} onChange={e => { setInput(e.target.value); setError(""); }} placeholder='Paste your JSON here...\n{"name":"John","age":30}' rows={7}
        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
      <div className="flex gap-2">
        <button onClick={format} className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors text-sm">
          ✨ Format / Beautify
        </button>
        <button onClick={minify} className="px-5 py-2 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-xl transition-colors text-sm">
          ⚡ Minify
        </button>
        <button onClick={() => { setInput(""); setOutput(""); setError(""); }} className="px-5 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 text-gray-600 dark:text-gray-300 font-semibold rounded-xl transition-colors text-sm">
          Clear
        </button>
      </div>
      {error && <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 text-red-700 dark:text-red-400 rounded-xl px-4 py-3 text-sm">⚠️ {error}</div>}
      {output && (
        <div className="space-y-2">
          <textarea value={output} readOnly rows={8}
            className="w-full px-4 py-3 rounded-xl border border-green-200 dark:border-green-700 bg-green-50 dark:bg-green-900/20 text-gray-900 dark:text-white font-mono text-sm resize-none" />
          <button onClick={copy} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${copied ? "bg-green-600 text-white" : "bg-blue-600 hover:bg-blue-700 text-white"}`}>
            {copied ? "✓ Copied!" : "Copy"}
          </button>
        </div>
      )}
    </div>
  );
}
