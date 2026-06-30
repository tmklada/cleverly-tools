"use client";

import { useState } from "react";

interface DownloadLink {
  quality: string;
  url: string;
  format: string;
}

interface DownloaderWidgetProps {
  toolSlug: string;
  toolTitle: string;
}

const PLATFORM_META: Record<string, { placeholder: string; hint: string; urlPattern: RegExp }> = {
  "facebook-video-downloader": {
    placeholder: "Paste Facebook video URL here...",
    hint: 'Open Facebook → tap the video → Share → "Copy Link"',
    urlPattern: /facebook\.com|fb\.watch|fb\.com/i,
  },
  "tiktok-video-downloader": {
    placeholder: "Paste TikTok video URL here...",
    hint: 'Open TikTok → tap Share → "Copy Link"',
    urlPattern: /tiktok\.com|vm\.tiktok\.com/i,
  },
  "instagram-video-downloader": {
    placeholder: "Paste Instagram Reel or video URL here...",
    hint: 'Open Instagram → tap ⋯ on video → "Copy Link"',
    urlPattern: /instagram\.com/i,
  },
};

// HD countdown ad overlay
function HdAdOverlay({ url, onClose }: { url: string; onClose: () => void }) {
  const [count, setCount] = useState(5);
  const [ready, setReady] = useState(false);

  // countdown
  if (typeof window !== "undefined" && !ready) {
    const id = setInterval(() => {
      setCount((c) => {
        if (c <= 1) {
          clearInterval(id);
          setReady(true);
          return 0;
        }
        return c - 1;
      });
    }, 1000);
  }

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-sm w-full p-6 text-center space-y-5">
        <div className="text-2xl">📥</div>
        <h3 className="font-bold text-gray-900 dark:text-white">Your HD Download is Ready</h3>

        {/* Ad placeholder */}
        <div className="bg-gray-100 dark:bg-gray-700 rounded-xl h-24 flex items-center justify-center text-sm text-gray-400">
          Advertisement
        </div>

        {ready ? (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="block w-full py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition-colors"
          >
            ⬇ Download HD Now
          </a>
        ) : (
          <div className="py-3 bg-gray-200 dark:bg-gray-700 rounded-xl text-gray-600 dark:text-gray-400 font-medium">
            Download in {count}s...
          </div>
        )}

        <button onClick={onClose} className="text-xs text-gray-400 hover:text-gray-600">
          Cancel
        </button>
      </div>
    </div>
  );
}

export default function DownloaderWidget({ toolSlug, toolTitle }: DownloaderWidgetProps) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [links, setLinks] = useState<DownloadLink[]>([]);
  const [error, setError] = useState("");
  const [hdOverlayUrl, setHdOverlayUrl] = useState<string | null>(null);

  const meta = PLATFORM_META[toolSlug] ?? {
    placeholder: "Paste video URL here...",
    hint: "Copy the video link and paste it above",
    urlPattern: /https?:\/\//i,
  };

  function validateUrl(input: string): string | null {
    if (!input.startsWith("http")) return "Please paste a full URL starting with https://";
    if (!meta.urlPattern.test(input)) {
      const platform = toolSlug.replace("-video-downloader", "");
      return `This doesn't look like a ${platform} URL. Make sure you copied the right link.`;
    }
    return null;
  }

  async function handleDownload(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = url.trim();

    const validationError = validateUrl(trimmed);
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError("");
    setLinks([]);

    try {
      const res = await fetch("/api/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: trimmed, platform: toolSlug }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        setError(data.error ?? "Could not fetch video. Make sure the video is public.");
        return;
      }

      setLinks(data.links ?? []);
    } catch {
      setError("Connection error. Please check your internet and try again.");
    } finally {
      setLoading(false);
    }
  }

  const isHd = (quality: string) =>
    quality.toLowerCase().includes("hd") || quality.includes("1080") || quality.includes("720");

  return (
    <>
      {hdOverlayUrl && (
        <HdAdOverlay url={hdOverlayUrl} onClose={() => setHdOverlayUrl(null)} />
      )}

      <div className="space-y-4">
        <form onSubmit={handleDownload} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={url}
            onChange={(e) => { setUrl(e.target.value); setError(""); setLinks([]); }}
            placeholder={meta.placeholder}
            className="flex-1 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={loading || !url.trim()}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-colors text-sm whitespace-nowrap"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                Processing...
              </span>
            ) : "Download ⬇"}
          </button>
        </form>

        {/* Hint */}
        <p className="text-xs text-gray-400 flex items-start gap-1">
          <span>💡</span>
          <span>{meta.hint}</span>
        </p>

        {/* Error */}
        {error && (
          <div className="flex items-start gap-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 rounded-xl px-4 py-3 text-sm">
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {/* Loading skeleton */}
        {loading && (
          <div className="space-y-3 animate-pulse">
            <div className="h-14 bg-gray-100 dark:bg-gray-700 rounded-xl" />
            <div className="h-14 bg-gray-100 dark:bg-gray-700 rounded-xl" />
          </div>
        )}

        {/* Download Links */}
        {links.length > 0 && (
          <div className="space-y-3">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              ✅ Video found! Choose quality:
            </p>

            {links.map((link, i) => {
              const hd = isHd(link.quality);
              return (
                <button
                  key={i}
                  onClick={() => {
                    if (hd) {
                      setHdOverlayUrl(link.url);
                    } else {
                      window.open(link.url, "_blank", "noopener,noreferrer");
                    }
                  }}
                  className={`flex items-center justify-between w-full px-5 py-4 rounded-xl border transition-all text-left group ${
                    hd
                      ? "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700 hover:bg-blue-100 dark:hover:bg-blue-900/30"
                      : "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 hover:bg-green-100 dark:hover:bg-green-900/30"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{hd ? "🎬" : "📥"}</span>
                    <div>
                      <div className={`font-bold text-sm ${hd ? "text-blue-800 dark:text-blue-300" : "text-green-800 dark:text-green-300"}`}>
                        {link.quality}
                        {hd && <span className="ml-2 text-xs bg-blue-200 dark:bg-blue-800 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-full">Best Quality</span>}
                      </div>
                      <div className="text-xs text-gray-500 mt-0.5">
                        {link.format.toUpperCase()} • Click to download
                      </div>
                    </div>
                  </div>
                  <span className={`text-sm font-medium ${hd ? "text-blue-600 dark:text-blue-400" : "text-green-600 dark:text-green-400"}`}>
                    Download →
                  </span>
                </button>
              );
            })}

            <p className="text-xs text-gray-400 pt-1">
              💡 After the video opens — right-click → "Save video as" to save it to your device.
            </p>
            <p className="text-xs text-gray-400">
              ⚠️ For personal use only. Respect copyright and platform terms of service.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
