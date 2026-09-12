"use client";

import { useMemo, useState } from "react";
import { allTools } from "@/config/tools";
import { searchTools } from "@/lib/search-tools";
import { trackEvent } from "@/lib/analytics";
import { SITE_URL, SITE_NAME } from "@/lib/site";

const SIZES = [
  { label: "Compact", height: 420 },
  { label: "Standard", height: 560 },
  { label: "Tall", height: 760 },
];

const POPULAR = ["bmi-calculator", "qr-code-generator", "loan-calculator", "word-counter", "percentage-calculator", "tip-calculator"];

export default function EmbedGenerator() {
  const [slug, setSlug] = useState("bmi-calculator");
  const [query, setQuery] = useState("");
  const [height, setHeight] = useState(560);
  const [copied, setCopied] = useState(false);

  const tool = useMemo(() => allTools.find((t) => t.slug === slug) ?? allTools[0], [slug]);
  const results = useMemo(() => (query.trim() ? searchTools(query, 8) : []), [query]);

  const embedUrl = `${SITE_URL}/embed/${tool.slug}`;
  const toolUrl = `${SITE_URL}/tools/${tool.slug}`;
  const snippet = `<iframe src="${embedUrl}" width="100%" height="${height}" loading="lazy" title="${tool.title}" style="border:1px solid #e5e7eb;border-radius:12px;max-width:680px"></iframe>
<p style="font-size:13px;margin-top:6px"><a href="${toolUrl}">${tool.title}</a> by <a href="${SITE_URL}">${SITE_NAME}</a></p>`;

  async function copy() {
    try {
      await navigator.clipboard.writeText(snippet);
      setCopied(true);
      trackEvent("embed_code_copied", "growth", `generator:${tool.slug}`);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  function pick(next: string) {
    setSlug(next);
    setQuery("");
    trackEvent("embed_tool_picked", "growth", next);
  }

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <div className="space-y-5">
        <div>
          <label htmlFor="embed-search" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            1. Pick a tool
          </label>
          <div className="relative">
            <input
              id="embed-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`Search ${allTools.length} tools…`}
              autoComplete="off"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {results.length > 0 && (
              <div className="absolute top-full mt-2 left-0 right-0 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 z-20 overflow-hidden max-h-72 overflow-y-auto">
                {results.map((t) => (
                  <button
                    key={t.slug}
                    type="button"
                    onClick={() => pick(t.slug)}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors"
                  >
                    <span className="text-lg">{t.icon}</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{t.title}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            {POPULAR.map((s) => {
              const t = allTools.find((x) => x.slug === s);
              if (!t) return null;
              return (
                <button
                  key={s}
                  type="button"
                  onClick={() => pick(s)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm transition-colors ${
                    slug === s
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-blue-900/30"
                  }`}
                >
                  <span>{t.icon}</span> {t.title}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <span className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">2. Choose a height</span>
          <div className="flex gap-2">
            {SIZES.map((s) => (
              <button
                key={s.height}
                type="button"
                onClick={() => setHeight(s.height)}
                className={`px-3 py-1.5 rounded-xl border-2 text-sm font-medium transition-colors ${
                  height === s.height
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400"
                    : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-300"
                }`}
              >
                {s.label} <span className="text-xs opacity-70">{s.height}px</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <span className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">3. Copy the code</span>
          <textarea
            readOnly
            value={snippet}
            rows={5}
            onFocus={(e) => e.currentTarget.select()}
            aria-label="Embed code"
            className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 font-mono text-xs resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={copy}
            className="mt-2 w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors"
          >
            {copied ? "✓ Copied to clipboard" : "Copy embed code"}
          </button>
        </div>
      </div>

      <div>
        <span className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Live preview</span>
        <iframe
          key={`${tool.slug}-${height}`}
          src={embedUrl}
          width="100%"
          height={height}
          loading="lazy"
          title={`${tool.title} preview`}
          className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white w-full"
        />
        <p className="text-xs text-gray-400 mt-2">
          This is exactly what your visitors will see — a working {tool.title}, not a screenshot.
        </p>
      </div>
    </div>
  );
}
