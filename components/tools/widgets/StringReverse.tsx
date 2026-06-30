"use client";
import { useState } from "react";

// Unicode mirror map for common characters
const MIRROR_MAP: Record<string, string> = {
  a: "ɐ", b: "q", c: "ɔ", d: "p", e: "ǝ", f: "ɟ", g: "ƃ", h: "ɥ", i: "ᴉ",
  j: "ɾ", k: "ʞ", l: "l", m: "ɯ", n: "u", o: "o", p: "d", q: "b", r: "ɹ",
  s: "s", t: "ʇ", u: "n", v: "ʌ", w: "ʍ", x: "x", y: "ʎ", z: "z",
  A: "∀", B: "ᗺ", C: "Ɔ", D: "ᗡ", E: "Ǝ", F: "Ⅎ", G: "⅁", H: "H", I: "I",
  J: "ſ", K: "ʞ", L: "⅂", M: "W", N: "N", O: "O", P: "Ԁ", Q: "Q", R: "ᴚ",
  S: "S", T: "⊥", U: "∩", V: "Λ", W: "M", X: "X", Y: "⅄", Z: "Z",
  "0": "0", "1": "Ɩ", "2": "ᄅ", "3": "Ɛ", "4": "ᔭ", "5": "5", "6": "9",
  "7": "ㄥ", "8": "8", "9": "6", ".": "˙", ",": "'", "?": "¿", "!": "¡",
  "(": ")", ")": "(", "[": "]", "]": "[", "{": "}", "}": "{", "<": ">", ">": "<",
  "&": "⅋", "_": "‾",
};

function reverseString(text: string): string {
  return [...text].reverse().join("");
}

function reverseWords(text: string): string {
  return text.split(" ").map((w) => [...w].reverse().join("")).join(" ");
}

function reverseWordOrder(text: string): string {
  return text.split(" ").reverse().join(" ");
}

function mirrorText(text: string): string {
  return [...text].reverse().map((c) => MIRROR_MAP[c] || c).join("");
}

interface Result {
  label: string;
  value: string;
}

export default function StringReverse() {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState<string>("");

  const results: Result[] = text
    ? [
        { label: "Reversed String", value: reverseString(text) },
        { label: "Reversed Words (keep order)", value: reverseWords(text) },
        { label: "Reversed Word Order", value: reverseWordOrder(text) },
        { label: "Mirror Text (Unicode flip)", value: mirrorText(text) },
      ]
    : [];

  const copy = async (val: string, label: string) => {
    await navigator.clipboard.writeText(val);
    setCopied(label);
    setTimeout(() => setCopied(""), 2000);
  };

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Input Text</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={4}
          placeholder="Type or paste your text here..."
          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
        <div className="flex flex-wrap gap-2 mt-3">
          {["Hello World", "The quick brown fox", "abcdef 123"].map((s) => (
            <button key={s} onClick={() => setText(s)}
              className="px-3 py-1 text-xs bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-lg transition-colors">
              "{s}"
            </button>
          ))}
        </div>
      </div>

      {results.map((r) => (
        <div key={r.label} className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">{r.label}</h3>
            <button
              onClick={() => copy(r.value, r.label)}
              className="px-3 py-1 text-xs bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              {copied === r.label ? "Copied!" : "Copy"}
            </button>
          </div>
          <p className="text-gray-900 dark:text-white font-mono text-sm bg-gray-50 dark:bg-gray-800 rounded-lg p-3 break-all">
            {r.value}
          </p>
        </div>
      ))}
    </div>
  );
}
