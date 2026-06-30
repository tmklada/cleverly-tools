"use client";
import { useState } from "react";

function binaryToText(binary: string): string {
  const cleaned = binary.trim().replace(/\s+/g, " ");
  const groups = cleaned.split(" ");
  return groups.map(group => {
    if (group.length !== 8 || !/^[01]+$/.test(group)) {
      throw new Error(`Invalid binary group: "${group}"`);
    }
    return String.fromCharCode(parseInt(group, 2));
  }).join("");
}

function textToBinary(text: string): string {
  return Array.from(text)
    .map(c => c.charCodeAt(0).toString(2).padStart(8, "0"))
    .join(" ");
}

function textToHex(text: string): string {
  return Array.from(text)
    .map(c => c.charCodeAt(0).toString(16).padStart(2, "0").toUpperCase())
    .join(" ");
}

export default function BinaryToText() {
  const [binaryInput, setBinaryInput] = useState("");
  const [textInput, setTextInput] = useState("");
  const [textOutput, setTextOutput] = useState("");
  const [binaryOutput, setBinaryOutput] = useState("");
  const [hexOutput, setHexOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  function convertBinaryToText() {
    setError("");
    setTextOutput("");
    setHexOutput("");
    if (!binaryInput.trim()) return;
    try {
      const text = binaryToText(binaryInput);
      setTextOutput(text);
      setHexOutput(textToHex(text));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Invalid binary input");
    }
  }

  function convertTextToBinary() {
    if (!textInput) return;
    setBinaryOutput(textToBinary(textInput));
    setHexOutput(textToHex(textInput));
  }

  function copy(text: string, key: string) {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  }

  return (
    <div className="space-y-6">
      {/* Binary to Text */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">Binary → Text</h3>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Binary Input (8-bit groups separated by spaces)
          </label>
          <textarea
            value={binaryInput}
            onChange={e => { setBinaryInput(e.target.value); setError(""); setTextOutput(""); }}
            rows={3}
            placeholder="01001000 01100101 01101100 01101100 01101111"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm resize-none"
          />
        </div>
        {error && <p className="text-sm text-red-500 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">{error}</p>}
        <button onClick={convertBinaryToText}
          className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors text-sm">
          Convert Binary → Text
        </button>
        {textOutput && (
          <div className="space-y-2">
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">TEXT OUTPUT</span>
                <button onClick={() => copy(textOutput, "text")} className="text-xs px-2 py-0.5 bg-blue-600 text-white rounded">{copied === "text" ? "Copied!" : "Copy"}</button>
              </div>
              <p className="text-gray-900 dark:text-white font-medium break-all">{textOutput}</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">HEX EQUIVALENT</span>
                <button onClick={() => copy(hexOutput, "hex1")} className="text-xs px-2 py-0.5 bg-blue-600 text-white rounded">{copied === "hex1" ? "Copied!" : "Copy"}</button>
              </div>
              <p className="text-purple-600 dark:text-purple-400 font-mono text-sm break-all">{hexOutput}</p>
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-gray-200 dark:border-gray-700" />

      {/* Text to Binary */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">Text → Binary</h3>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Text Input</label>
          <textarea
            value={textInput}
            onChange={e => { setTextInput(e.target.value); setBinaryOutput(""); }}
            rows={3}
            placeholder="Hello, World!"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none"
          />
        </div>
        <button onClick={convertTextToBinary}
          className="w-full py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl transition-colors text-sm">
          Convert Text → Binary
        </button>
        {binaryOutput && (
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">BINARY OUTPUT</span>
              <button onClick={() => copy(binaryOutput, "bin")} className="text-xs px-2 py-0.5 bg-blue-600 text-white rounded">{copied === "bin" ? "Copied!" : "Copy"}</button>
            </div>
            <p className="text-green-600 dark:text-green-400 font-mono text-xs break-all leading-relaxed">{binaryOutput}</p>
          </div>
        )}
      </div>
    </div>
  );
}
