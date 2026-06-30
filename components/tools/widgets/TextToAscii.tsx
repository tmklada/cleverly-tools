"use client";
import { useState } from "react";

type FontName = "block" | "banner" | "digital" | "simple" | "shadow";

const CHAR_MAP_BLOCK: Record<string, string[]> = {
  A: ["#####", "#   #", "#####", "#   #", "#   #"],
  B: ["#### ", "#   #", "#### ", "#   #", "#### "],
  C: ["#####", "#    ", "#    ", "#    ", "#####"],
  D: ["#### ", "#   #", "#   #", "#   #", "#### "],
  E: ["#####", "#    ", "###  ", "#    ", "#####"],
  F: ["#####", "#    ", "###  ", "#    ", "#    "],
  G: ["#####", "#    ", "#  ##", "#   #", "#####"],
  H: ["#   #", "#   #", "#####", "#   #", "#   #"],
  I: ["#####", "  #  ", "  #  ", "  #  ", "#####"],
  J: ["#####", "    #", "    #", "#   #", "#####"],
  K: ["#   #", "#  # ", "###  ", "#  # ", "#   #"],
  L: ["#    ", "#    ", "#    ", "#    ", "#####"],
  M: ["#   #", "## ##", "# # #", "#   #", "#   #"],
  N: ["#   #", "##  #", "# # #", "#  ##", "#   #"],
  O: ["#####", "#   #", "#   #", "#   #", "#####"],
  P: ["#### ", "#   #", "#### ", "#    ", "#    "],
  Q: ["#####", "#   #", "# # #", "#  ##", "#####"],
  R: ["#### ", "#   #", "#### ", "#  # ", "#   #"],
  S: ["#####", "#    ", "#####", "    #", "#####"],
  T: ["#####", "  #  ", "  #  ", "  #  ", "  #  "],
  U: ["#   #", "#   #", "#   #", "#   #", "#####"],
  V: ["#   #", "#   #", "#   #", " # # ", "  #  "],
  W: ["#   #", "#   #", "# # #", "## ##", "#   #"],
  X: ["#   #", " # # ", "  #  ", " # # ", "#   #"],
  Y: ["#   #", "#   #", "#####", "  #  ", "  #  "],
  Z: ["#####", "   # ", "  #  ", " #   ", "#####"],
  " ": ["     ", "     ", "     ", "     ", "     "],
  "0": ["#####", "#   #", "#   #", "#   #", "#####"],
  "1": ["  #  ", " ##  ", "  #  ", "  #  ", "#####"],
  "2": ["#####", "    #", "#####", "#    ", "#####"],
  "3": ["#####", "    #", "#####", "    #", "#####"],
  "4": ["#   #", "#   #", "#####", "    #", "    #"],
  "5": ["#####", "#    ", "#####", "    #", "#####"],
  "6": ["#####", "#    ", "#####", "#   #", "#####"],
  "7": ["#####", "    #", "   # ", "  #  ", "  #  "],
  "8": ["#####", "#   #", "#####", "#   #", "#####"],
  "9": ["#####", "#   #", "#####", "    #", "#####"],
};

function toBlock(text: string): string {
  const upper = text.toUpperCase();
  const lines = ["", "", "", "", ""];
  for (const ch of upper) {
    const map = CHAR_MAP_BLOCK[ch] || CHAR_MAP_BLOCK[" "];
    map.forEach((row, i) => {
      lines[i] += row + " ";
    });
  }
  return lines.join("\n");
}

function toBanner(text: string): string {
  return text.toUpperCase().split("").map((c) => `[ ${c} ]`).join(" ");
}

function toDigital(text: string): string {
  const top = text.toUpperCase().split("").map((c) => {
    if (c === " ") return "   ";
    return ` _ `;
  }).join(" ");
  const mid = text.toUpperCase().split("").map((c) => {
    if (c === " ") return "   ";
    return `|${c}|`;
  }).join(" ");
  const bot = text.toUpperCase().split("").map((c) => {
    if (c === " ") return "   ";
    return `|_|`;
  }).join(" ");
  return [top, mid, bot].join("\n");
}

function toSimple(text: string): string {
  return `>>> ${text.toUpperCase()} <<<`;
}

function toShadow(text: string): string {
  const line1 = text.toUpperCase().split("").join("  ");
  const line2 = " " + text.toLowerCase().split("").join("  ");
  return [line1, line2].join("\n");
}

const FONTS: { name: FontName; label: string; fn: (t: string) => string }[] = [
  { name: "block", label: "Block (#)", fn: toBlock },
  { name: "banner", label: "Banner", fn: toBanner },
  { name: "digital", label: "Digital LCD", fn: toDigital },
  { name: "simple", label: "Simple", fn: toSimple },
  { name: "shadow", label: "Shadow", fn: toShadow },
];

export default function TextToAscii() {
  const [text, setText] = useState("Hello");
  const [font, setFont] = useState<FontName>("block");
  const [copied, setCopied] = useState(false);

  const selectedFont = FONTS.find((f) => f.name === font)!;
  const output = text ? selectedFont.fn(text) : "";

  const copy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const download = () => {
    const blob = new Blob([output], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "ascii-art.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Your Text</label>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value.slice(0, 20))}
          placeholder="Enter text..."
          maxLength={20}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
        />
        <p className="text-xs text-gray-400 mt-1">{text.length}/20 characters</p>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Font Style</label>
          <div className="flex flex-wrap gap-2">
            {FONTS.map((f) => (
              <button
                key={f.name}
                onClick={() => setFont(f.name)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  font === f.name
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {output && (
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">ASCII Art Output</h3>
            <div className="flex gap-2">
              <button onClick={copy} className="px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg transition-colors">
                {copied ? "Copied!" : "Copy"}
              </button>
              <button onClick={download} className="px-3 py-1.5 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                Download .txt
              </button>
            </div>
          </div>
          <pre className="font-mono text-xs sm:text-sm text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto whitespace-pre leading-relaxed">
            {output}
          </pre>
        </div>
      )}
    </div>
  );
}
