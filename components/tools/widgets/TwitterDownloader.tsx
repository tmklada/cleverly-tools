"use client";
import { useState } from "react";

interface DownloadLink {
  quality: string;
  url: string;
}

interface ApiResponse {
  success: boolean;
  links?: DownloadLink[];
  error?: string;
}

export default function TwitterDownloader() {
  const [url, setUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [links, setLinks] = useState<DownloadLink[]>([]);
  const [error, setError] = useState<string>("");
  const [showAdGate, setShowAdGate] = useState<boolean>(false);
  const [pendingLink, setPendingLink] = useState<DownloadLink | null>(null);

  async function fetchLinks() {
    const trimmed = url.trim();
    if (!trimmed) { setError("Please enter a Twitter/X video URL."); return; }
    if (!trimmed.includes("twitter.com") && !trimmed.includes("x.com") && !trimmed.includes("t.co")) {
      setError("Please enter a valid Twitter or X.com URL.");
      return;
    }
    setLoading(true);
    setError("");
    setLinks([]);
    try {
      const res = await fetch("/api/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: trimmed, platform: "twitter-video-downloader" }),
      });
      const data: ApiResponse = await res.json();
      if (!data.success || !data.links?.length) {
        setError(data.error || "No downloadable videos found. Make sure the tweet contains a video.");
      } else {
        setLinks(data.links);
      }
    } catch {
      setError("Failed to fetch video. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleDownload(link: DownloadLink) {
    if (link.quality === "HD" || link.quality === "high") {
      setShowAdGate(true);
      setPendingLink(link);
    } else {
      window.open(link.url, "_blank");
    }
  }

  function confirmDownload() {
    if (pendingLink) window.open(pendingLink.url, "_blank");
    setShowAdGate(false);
    setPendingLink(null);
  }

  return (
    <div className="space-y-5">
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Twitter / X Video URL
        </label>
        <div className="flex gap-2">
          <input
            type="url"
            value={url}
            onChange={e => { setUrl(e.target.value); setError(""); setLinks([]); }}
            placeholder="https://twitter.com/user/status/..."
            className="flex-1 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            onKeyDown={e => e.key === "Enter" && fetchLinks()}
          />
          <button
            onClick={fetchLinks}
            disabled={loading}
            className="px-5 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-colors whitespace-nowrap"
          >
            {loading ? "..." : "Get Video"}
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 text-red-700 dark:text-red-400 rounded-xl px-4 py-3 text-sm">
          ⚠️ {error}
        </div>
      )}

      {links.length > 0 && (
        <div className="space-y-3">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Available qualities:</p>
          {links.map((link, i) => (
            <div key={i} className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 rounded-xl px-4 py-3">
              <span className="font-semibold text-gray-800 dark:text-gray-200">
                {link.quality === "HD" || link.quality === "high" ? "🎬 HD Quality" : `📹 ${link.quality}`}
              </span>
              <button
                onClick={() => handleDownload(link)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-sm transition-colors"
              >
                Download
              </button>
            </div>
          ))}
        </div>
      )}

      {showAdGate && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-sm w-full space-y-4">
            <h3 className="font-bold text-gray-900 dark:text-white text-lg">HD Download</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              HD downloads are supported by ads. Click continue to proceed to the HD video.
            </p>
            <div className="bg-gray-100 dark:bg-gray-700 rounded-xl p-4 text-center text-gray-400 text-sm min-h-16 flex items-center justify-center">
              [Ad Space]
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowAdGate(false)} className="flex-1 py-2 rounded-xl border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 font-semibold text-sm">
                Cancel
              </button>
              <button onClick={confirmDownload} className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm transition-colors">
                Continue
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl px-4 py-3 text-xs text-gray-500 dark:text-gray-400">
        ℹ️ Paste the URL of any tweet containing a video. Only public tweets are supported.
      </div>
    </div>
  );
}
