"use client";
import { useState } from "react";
import { events } from "@/lib/analytics";

interface DownloadLink { quality: string; url: string; format: string; }

export default function YoutubeToMp3() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [links, setLinks] = useState<DownloadLink[]>([]);
  const [error, setError] = useState("");

  async function handleDownload(e: React.FormEvent) {
    e.preventDefault();
    if (!url.trim()) return;
    setLoading(true); setError(""); setLinks([]);
    try {
      const res = await fetch("/api/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim(), platform: "youtube-video-downloader" }),
      });
      const data = await res.json();
      if (!res.ok || data.error) { setError(data.error ?? "Could not process video."); return; }
      setLinks(data.links ?? []);
      events.toolUsed("youtube-to-mp3");
    } catch { setError("Connection error. Please try again."); }
    finally { setLoading(false); }
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-500 dark:text-gray-400">
        💡 Paste a YouTube URL to download the video. To extract audio, use a video player that supports audio extraction, or download the video and convert locally.
      </p>
      <form onSubmit={handleDownload} className="flex flex-col sm:flex-row gap-3">
        <input type="text" value={url} onChange={e => { setUrl(e.target.value); setError(""); setLinks([]); }}
          placeholder="https://www.youtube.com/watch?v=..." required
          className="flex-1 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-red-500" />
        <button type="submit" disabled={loading || !url.trim()}
          className="px-6 py-3 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold rounded-xl transition-colors text-sm whitespace-nowrap">
          {loading ? "Processing..." : "⬇ Download"}
        </button>
      </form>
      {error && <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 text-red-700 dark:text-red-400 rounded-xl px-4 py-3 text-sm">⚠️ {error}</div>}
      {loading && <div className="space-y-2 animate-pulse"><div className="h-12 bg-gray-100 dark:bg-gray-700 rounded-xl"/><div className="h-12 bg-gray-100 dark:bg-gray-700 rounded-xl"/></div>}
      {links.length > 0 && (
        <div className="space-y-3">
          <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">✅ Choose quality:</p>
          {links.map((link, i) => (
            <button key={i} onClick={() => window.open(link.url, "_blank", "noopener,noreferrer")}
              className="flex items-center justify-between w-full px-5 py-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-xl transition-all text-left">
              <div className="flex items-center gap-3">
                <span className="text-xl">🎵</span>
                <div>
                  <div className="font-bold text-sm text-red-800 dark:text-red-300">{link.quality} — {link.format.toUpperCase()}</div>
                  <div className="text-xs text-gray-500">Right-click → Save Video As after opening</div>
                </div>
              </div>
              <span className="text-red-600 dark:text-red-400 font-medium text-sm">Download →</span>
            </button>
          ))}
          <p className="text-xs text-gray-400">⚠️ For personal use only. Respect YouTube Terms of Service.</p>
        </div>
      )}
    </div>
  );
}
