"use client";
import { useState } from "react";

function minifyCss(css: string): string {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, "") // remove comments
    .replace(/\s+/g, " ")              // collapse whitespace
    .replace(/\s*{\s*/g, "{")
    .replace(/\s*}\s*/g, "}")
    .replace(/\s*:\s*/g, ":")
    .replace(/\s*;\s*/g, ";")
    .replace(/\s*,\s*/g, ",")
    .replace(/;}/g, "}")
    .trim();
}

function beautifyCss(css: string): string {
  // First minify then expand
  const min = minifyCss(css);
  return min
    .replace(/{/g, " {\n  ")
    .replace(/;/g, ";\n  ")
    .replace(/}/g, "\n}\n")
    .replace(/,/g, ",\n")
    .replace(/\n  \n/g, "\n")
    .trim();
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  return `${(bytes / 1024).toFixed(1)} KB`;
}

export default function CssMinifier() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"minify" | "beautify" | null>(null);
  const [copied, setCopied] = useState(false);

  function handleMinify() {
    setOutput(minifyCss(input));
    setMode("minify");
  }

  function handleBeautify() {
    setOutput(beautifyCss(input));
    setMode("beautify");
  }

  function copy() {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function download() {
    const ext = mode === "minify" ? ".min.css" : ".css";
    const blob = new Blob([output], { type: "text/css" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `styles${ext}`;
    a.click();
  }

  const originalSize = new TextEncoder().encode(input).length;
  const outputSize = new TextEncoder().encode(output).length;
  const reduction = originalSize > 0 ? Math.round((1 - outputSize / originalSize) * 100) : 0;

  return (
    <div className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">CSS Input</label>
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          rows={8}
          placeholder={`/* Paste your CSS here */\nbody {\n  margin: 0;\n  padding: 0;\n  font-family: Arial, sans-serif;\n}`}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm resize-none"
        />
      </div>

      <div className="flex gap-3">
        <button onClick={handleMinify}
          className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors">
          Minify CSS
        </button>
        <button onClick={handleBeautify}
          className="flex-1 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl transition-colors">
          Beautify CSS
        </button>
      </div>

      {output && (
        <div className="space-y-4">
          {mode === "minify" && (
            <div className="grid grid-cols-3 gap-3 text-center">
              {[
                ["Original", formatBytes(originalSize), "text-gray-600 dark:text-gray-400"],
                ["Minified", formatBytes(outputSize), "text-green-600"],
                ["Saved", `${reduction}%`, "text-blue-600"],
              ].map(([label, value, color]) => (
                <div key={label} className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-3">
                  <div className={`text-xl font-bold ${color}`}>{value}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{label}</div>
                </div>
              ))}
            </div>
          )}

          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {mode === "minify" ? "Minified" : "Beautified"} Output
              </p>
              <div className="flex gap-2">
                <button onClick={copy} className="text-xs px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                  {copied ? "Copied!" : "Copy"}
                </button>
                <button onClick={download} className="text-xs px-3 py-1 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors">
                  Download
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
        </div>
      )}
    </div>
  );
}
