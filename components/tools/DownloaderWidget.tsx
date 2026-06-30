"use client";

import { useState } from "react";

interface DownloadLink {
  quality: string;
  url: string;
  format: string;
  size?: string;
}

interface DownloaderWidgetProps {
  toolSlug: string;
  toolTitle: string;
}

const PLATFORM_LABELS: Record<string, { placeholder: string; example: string }> = {
  "facebook-video-downloader": {
    placeholder: "Paste Facebook video URL here...",
    example: "https://www.facebook.com/watch/?v=123456789",
  },
  "tiktok-video-downloader": {
    placeholder: "Paste TikTok video URL here...",
    example: "https://www.tiktok.com/@user/video/123456789",
  },
  "instagram-video-downloader": {
    placeholder: "Paste Instagram video or Reel URL here...",
    example: "https://www.instagram.com/reel/ABC123/",
  },
};

export default function DownloaderWidget({ toolSlug, toolTitle }: DownloaderWidgetProps) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [links, setLinks] = useState<DownloadLink[]>([]);
  const [error, setError] = useState("");

  const meta = PLATFORM_LABELS[toolSlug] ?? {
    placeholder: "Paste video URL here...",
    example: "",
  };

  async function handleDownload(e: React.FormEvent) {
    e.preventDefault();
    if (!url.trim()) return;

    setLoading(true);
    setError("");
    setLinks([]);

    try {
      const res = await fetch("/api/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim(), platform: toolSlug }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        setError(data.error ?? "Could not fetch video. Please check the URL and try again.");
        return;
      }

      setLinks(data.links);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-5">
      <h2 className="font-semibold text-gray-900 dark:text-white text-lg">
        {toolTitle}
      </h2>

      <form onSubmit={handleDownload} className="flex flex-col sm:flex-row gap-3">
        <input
          type="url"
          value={url}
          onChange={(e) => { setUrl(e.target.value); setError(""); setLinks([]); }}
          placeholder={meta.placeholder}
          className="flex-1 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button
          type="submit"
          disabled={loading || !url.trim()}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-colors text-sm whitespace-nowrap"
        >
          {loading ? "Processing..." : "Download ⬇"}
        </button>
      </form>

      {meta.example && (
        <p className="text-xs text-gray-400">
          Example: <span className="font-mono">{meta.example}</span>
        </p>
      )}

      {/* Error */}
      {error && (
        <div className="flex items-start gap-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 rounded-xl px-4 py-3 text-sm">
          <span>⚠️</span>
          <span>{error}</span>
        </div>
      )}

      {/* Loading Skeleton */}
      {loading && (
        <div className="space-y-3 animate-pulse">
          <div className="h-12 bg-gray-100 dark:bg-gray-700 rounded-xl" />
          <div className="h-12 bg-gray-100 dark:bg-gray-700 rounded-xl" />
        </div>
      )}

      {/* Download Links */}
      {links.length > 0 && (
        <div className="space-y-3">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Choose quality:</p>
          {links.map((link, i) => (
            <a
              key={i}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              download
              className="flex items-center justify-between w-full px-5 py-3 bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-xl transition-colors group"
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">📥</span>
                <div>
                  <div className="font-semibold text-green-800 dark:text-green-300 text-sm">
                    {link.quality} — {link.format.toUpperCase()}
                  </div>
                  {link.size && (
                    <div className="text-xs text-green-600 dark:text-green-500">{link.size}</div>
                  )}
                </div>
              </div>
              <span className="text-green-700 dark:text-green-400 font-medium text-sm group-hover:underline">
                Download →
              </span>
            </a>
          ))}

          <p className="text-xs text-gray-400 mt-2">
            ⚠️ For personal use only. Respect copyright laws and platform terms of service.
          </p>
        </div>
      )}
    </div>
  );
}
