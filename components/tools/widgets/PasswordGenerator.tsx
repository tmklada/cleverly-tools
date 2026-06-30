"use client";
import { useState, useCallback } from "react";

export default function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [upper, setUpper] = useState(true);
  const [lower, setLower] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const generate = useCallback(() => {
    let chars = "";
    if (upper) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (lower) chars += "abcdefghijklmnopqrstuvwxyz";
    if (numbers) chars += "0123456789";
    if (symbols) chars += "!@#$%^&*()_+-=[]{}|;:,.<>?";
    if (!chars) return;
    const arr = new Uint32Array(length);
    crypto.getRandomValues(arr);
    setPassword(Array.from(arr).map(n => chars[n % chars.length]).join(""));
  }, [length, upper, lower, numbers, symbols]);

  function copy() {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const strength = [upper, lower, numbers, symbols].filter(Boolean).length;
  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"][strength];
  const strengthColor = ["", "text-red-500", "text-yellow-500", "text-blue-500", "text-green-500"][strength];

  return (
    <div className="space-y-5">
      <div>
        <label className="flex justify-between text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          <span>Password Length</span><span className="text-blue-600 font-bold">{length}</span>
        </label>
        <input type="range" min={6} max={64} value={length} onChange={e => setLength(+e.target.value)}
          className="w-full accent-blue-600" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: "Uppercase (A-Z)", val: upper, set: setUpper },
          { label: "Lowercase (a-z)", val: lower, set: setLower },
          { label: "Numbers (0-9)", val: numbers, set: setNumbers },
          { label: "Symbols (!@#$)", val: symbols, set: setSymbols },
        ].map(({ label, val, set }) => (
          <label key={label} className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={val} onChange={e => set(e.target.checked)} className="w-4 h-4 accent-blue-600" />
            <span className="text-sm text-gray-700 dark:text-gray-300">{label}</span>
          </label>
        ))}
      </div>
      <button onClick={generate} className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors">
        🔐 Generate Password
      </button>
      {password && (
        <div className="space-y-3">
          <div className="relative bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl p-4 font-mono text-lg break-all pr-24">
            {password}
            <button onClick={copy} className={`absolute right-3 top-1/2 -translate-y-1/2 px-3 py-1 rounded-lg text-sm font-medium transition-colors ${copied ? "bg-green-600 text-white" : "bg-blue-600 hover:bg-blue-700 text-white"}`}>
              {copied ? "✓" : "Copy"}
            </button>
          </div>
          <p className="text-sm">Strength: <span className={`font-semibold ${strengthColor}`}>{strengthLabel}</span></p>
        </div>
      )}
    </div>
  );
}
