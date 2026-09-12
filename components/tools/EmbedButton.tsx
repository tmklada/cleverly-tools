"use client";

import { useEffect, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { SITE_URL, SITE_NAME } from "@/lib/site";

const SIZES = [
  { label: "Compact", height: 420 },
  { label: "Standard", height: 560 },
  { label: "Tall", height: 760 },
];

interface EmbedButtonProps {
  slug: string;
  title: string;
}

export default function EmbedButton({ slug, title }: EmbedButtonProps) {
  const [open, setOpen] = useState(false);
  const [height, setHeight] = useState(560);
  const [copied, setCopied] = useState(false);

  const embedUrl = `${SITE_URL}/embed/${slug}`;
  const toolUrl = `${SITE_URL}/tools/${slug}`;

  const snippet = `<iframe src="${embedUrl}" width="100%" height="${height}" loading="lazy" title="${title}" style="border:1px solid #e5e7eb;border-radius:12px;max-width:680px"></iframe>
<p style="font-size:13px;margin-top:6px"><a href="${toolUrl}">${title}</a> by <a href="${SITE_URL}">${SITE_NAME}</a></p>`;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(snippet);
      setCopied(true);
      trackEvent("embed_code_copied", "growth", slug);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setOpen(true);
          trackEvent("embed_dialog_opened", "growth", slug);
        }}
        title="Put this tool on your own site, free"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:border-blue-400 hover:text-blue-600 transition-colors"
      >
        <span aria-hidden>{"</>"}</span> Embed
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={`Embed ${title}`}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-start justify-between gap-4 p-5 border-b border-gray-100 dark:border-gray-800">
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">Embed {title}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                  Put this working tool on your own site. Free, no account, no attribution fee — just keep the credit line.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-xl leading-none"
              >
                ×
              </button>
            </div>

            <div className="p-5 space-y-4">
              <div>
                <span className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Height</span>
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
                <span className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Code</span>
                <textarea
                  readOnly
                  value={snippet}
                  rows={5}
                  onFocus={(e) => e.currentTarget.select()}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 font-mono text-xs resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={copy}
                  className="mt-2 w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors"
                >
                  {copied ? "✓ Copied" : "Copy embed code"}
                </button>
              </div>

              <div>
                <span className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Preview</span>
                <iframe
                  src={embedUrl}
                  width="100%"
                  height={height}
                  loading="lazy"
                  title={`${title} preview`}
                  className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
