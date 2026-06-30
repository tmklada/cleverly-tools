"use client";
import { useState } from "react";

export default function UrlEncoderTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  function encode() {
    try { setOutput(encodeURIComponent(input)); setError(""); }
    catch { setError("Encoding failed."); }
  }

  function decode() {
    try { setOutput(decodeURIComponent(input)); setError(""); }
    catch { setError("Decoding failed. Invalid URL-encoded string."); }
  }

  function copy() {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="space-y-4">
      <textarea value={input} onChange={e => { setInput(e.target.value); setError(""); }}
        placeholder="Enter a URL or text to encode, or an encoded string to decode..." rows={5}
        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
      <div className="flex gap-2">
        <button onClick={encode} className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-sm">Encode →</button>
        <button onClick={decode} className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl text-sm">← Decode</button>
        <button onClick={() => { setInput(""); setOutput(""); setError(""); }} className="px-5 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 text-gray-600 dark:text-gray-300 font-semibold rounded-xl text-sm">Clear</button>
      </div>
      {error && <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 text-red-700 dark:text-red-400 rounded-xl px-4 py-3 text-sm">⚠️ {error}</div>}
      {output && (
        <div className="space-y-2">
          <textarea value={output} readOnly rows={5}
            className="w-full px-4 py-3 rounded-xl border border-green-200 dark:border-green-700 bg-green-50 dark:bg-green-900/20 text-gray-900 dark:text-white font-mono text-sm resize-none" />
          <button onClick={copy} className={`px-4 py-2 rounded-lg text-sm font-medium ${copied ? "bg-green-600 text-white" : "bg-blue-600 hover:bg-blue-700 text-white"}`}>
            {copied ? "✓ Copied!" : "Copy"}
          </button>
        </div>
      )}
    </div>
  );
}
