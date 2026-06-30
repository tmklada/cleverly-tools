"use client";
import { useState } from "react";

function toSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // remove diacritics
    .replace(/[^a-z0-9\s-]/g, "")   // remove special chars
    .trim()
    .replace(/\s+/g, "-")            // spaces to hyphens
    .replace(/-+/g, "-")             // collapse multiple hyphens
    .replace(/^-|-$/g, "");          // trim leading/trailing hyphens
}

export default function TextToSlug() {
  const [input, setInput] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);

  const slug = toSlug(input);

  function copy() {
    if (!slug) return;
    navigator.clipboard.writeText(slug);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Input Text</label>
        <input
          type="text"
          value={input}
          onChange={e => { setInput(e.target.value); setCopied(false); }}
          placeholder="My Awesome Blog Post Title!"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {slug && (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">URL Slug</label>
          <div className="relative">
            <div className="px-4 py-3 rounded-xl border border-green-200 dark:border-green-700 bg-green-50 dark:bg-green-900/20 text-gray-900 dark:text-white font-mono text-sm break-all pr-24 min-h-12 flex items-center">
              {slug}
            </div>
            <button
              onClick={copy}
              className={`absolute right-3 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${copied ? "bg-green-600 text-white" : "bg-blue-600 hover:bg-blue-700 text-white"}`}
            >
              {copied ? "✓" : "Copy"}
            </button>
          </div>
        </div>
      )}

      {input && !slug && (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-xl px-4 py-3 text-sm text-yellow-700 dark:text-yellow-300">
          ⚠️ No valid slug characters found. Try different text.
        </div>
      )}

      <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl px-4 py-3">
        <p className="text-xs font-semibold text-gray-600 dark:text-gray-300 mb-2">Transformations applied:</p>
        <ul className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
          <li>• Converted to lowercase</li>
          <li>• Removed accents and diacritics</li>
          <li>• Replaced spaces with hyphens (-)</li>
          <li>• Removed special characters</li>
          <li>• Collapsed consecutive hyphens</li>
        </ul>
      </div>
    </div>
  );
}
