"use client";
import { useState } from "react";

const ones = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine",
  "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
const tens = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
const ordinalSuffixes: Record<string, string> = {
  one: "first", two: "second", three: "third", five: "fifth", eight: "eighth",
  nine: "ninth", twelve: "twelfth",
};

function toWords(n: number): string {
  if (n === 0) return "zero";
  if (n < 0) return "negative " + toWords(-n);

  if (n < 20) return ones[n];
  if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 ? "-" + ones[n % 10] : "");
  if (n < 1000) return ones[Math.floor(n / 100)] + " hundred" + (n % 100 ? " " + toWords(n % 100) : "");
  if (n < 1_000_000) return toWords(Math.floor(n / 1000)) + " thousand" + (n % 1000 ? " " + toWords(n % 1000) : "");
  if (n < 1_000_000_000) return toWords(Math.floor(n / 1_000_000)) + " million" + (n % 1_000_000 ? " " + toWords(n % 1_000_000) : "");
  if (n < 1_000_000_000_000) return toWords(Math.floor(n / 1_000_000_000)) + " billion" + (n % 1_000_000_000 ? " " + toWords(n % 1_000_000_000) : "");
  return toWords(Math.floor(n / 1_000_000_000_000)) + " trillion" + (n % 1_000_000_000_000 ? " " + toWords(n % 1_000_000_000_000) : "");
}

function toOrdinal(words: string): string {
  const parts = words.split(" ");
  const last = parts[parts.length - 1];
  const hyphenParts = last.split("-");
  const lastWord = hyphenParts[hyphenParts.length - 1];
  const ordinal = ordinalSuffixes[lastWord] || (lastWord.endsWith("t") ? lastWord + "h" : lastWord + "th");
  hyphenParts[hyphenParts.length - 1] = ordinal;
  parts[parts.length - 1] = hyphenParts.join("-");
  return parts.join(" ");
}

function toCurrency(n: number): string {
  const dollars = Math.floor(Math.abs(n));
  const cents = Math.round((Math.abs(n) - dollars) * 100);
  let result = (n < 0 ? "negative " : "") + toWords(dollars) + " dollar" + (dollars !== 1 ? "s" : "");
  if (cents > 0) result += " and " + toWords(cents) + " cent" + (cents !== 1 ? "s" : "");
  return result;
}

type Mode = "words" | "ordinal" | "currency";

export default function NumberToWords() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<Mode>("words");
  const [copied, setCopied] = useState(false);

  const num = parseFloat(input);
  const isValid = input !== "" && !isNaN(num) && Math.abs(num) <= 999_999_999_999_999;

  let output = "";
  if (isValid) {
    if (mode === "words") output = toWords(Math.trunc(num)) + (num < 0 && Math.trunc(num) === 0 ? "" : "");
    else if (mode === "ordinal") output = toOrdinal(toWords(Math.abs(Math.trunc(num))));
    else output = toCurrency(num);
  }

  const firstWord = output.charAt(0).toUpperCase() + output.slice(1);

  const copy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(firstWord);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Enter a Number</label>
        <input
          type="number"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="e.g. 1234567"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
        />
        {input && !isValid && (
          <p className="text-xs text-red-500 mt-1">Number too large or invalid (max: 999 trillion)</p>
        )}

        <div className="flex gap-2 mt-4">
          {(["words", "ordinal", "currency"] as Mode[]).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`flex-1 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
                mode === m
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              {m === "words" ? "Words" : m === "ordinal" ? "Ordinal" : "Currency"}
            </button>
          ))}
        </div>
      </div>

      {isValid && output && (
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-start justify-between gap-4">
            <p className="text-2xl font-semibold text-gray-900 dark:text-white leading-relaxed capitalize">
              {firstWord}
            </p>
            <button
              onClick={copy}
              className="shrink-0 px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          {mode === "currency" && input && (
            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
              ${parseFloat(input).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          )}
        </div>
      )}

      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Examples</h3>
        <div className="flex flex-wrap gap-2">
          {[1, 42, 100, 1000, 1234567, -99, 1000000000].map((n) => (
            <button
              key={n}
              onClick={() => setInput(String(n))}
              className="px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg transition-colors"
            >
              {n.toLocaleString()}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
