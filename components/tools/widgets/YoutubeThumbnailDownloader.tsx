"use client";
import { useState } from "react";

const QUALITIES = [
  { label: "Max Resolution", key: "maxresdefault", size: "1280×720" },
  { label: "High Quality", key: "hqdefault", size: "480×360" },
  { label: "Medium Quality", key: "mqdefault", size: "320×180" },
  { label: "Standard", key: "sddefault", size: "640×480" },
];

function extractVideoId(url: string): string | null {
  const match = url.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/);
  return match ? match[1] : null;
}

export default function YoutubeThumbnailDownloader() {
  const [url, setUrl] = useState("");
  const [videoId, setVideoId] = useState<string | null>(null);
  const [error, setError] = useState("");

  function handleExtract(e: React.FormEvent) {
    e.preventDefault();
    const id = extractVideoId(url.trim());
    if (!id) { setError("Invalid YouTube URL. Please check and try again."); setVideoId(null); return; }
    setVideoId(id); setError("");
  }

  return (
    <div className="space-y-5">
      <form onSubmit={handleExtract} className="flex flex-col sm:flex-row gap-3">
        <input type="text" value={url} onChange={e => { setUrl(e.target.value); setError(""); setVideoId(null); }}
          placeholder="https://www.youtube.com/watch?v=..." required
          className="flex-1 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-red-500" />
        <button type="submit" className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-sm whitespace-nowrap">
          Get Thumbnails
        </button>
      </form>
      {error && <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">{'⚠️'} {error}</div>}
      {videoId && (
        <div className="space-y-4">
          <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">{'✅'} Choose thumbnail quality:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {QUALITIES.map(({ label, key, size }) => {
              const imgUrl = `https://img.youtube.com/vi/${videoId}/${key}.jpg`;
              return (
                <div key={key} className="bg-gray-50 dark:bg-gray-700/50 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-600">
                  <img src={imgUrl} alt={label} className="w-full object-cover" />
                  <div className="p-3 flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{label}</div>
                      <div className="text-xs text-gray-500">{size}</div>
                    </div>
                    <a href={imgUrl} target="_blank" rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-medium rounded-lg transition-colors">
                      Download
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
