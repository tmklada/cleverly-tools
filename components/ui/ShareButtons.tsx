"use client";

import { useState } from "react";

interface ShareButtonsProps {
  url: string;
  title: string;
  description?: string;
}

export default function ShareButtons({ url, title, description }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDesc = encodeURIComponent(description ?? title);

  const platforms = [
    {
      name: "WhatsApp",
      icon: "💬",
      color: "bg-green-500 hover:bg-green-600",
      href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    },
    {
      name: "Facebook",
      icon: "📘",
      color: "bg-blue-600 hover:bg-blue-700",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      name: "X / Twitter",
      icon: "🐦",
      color: "bg-gray-900 hover:bg-black dark:bg-gray-700 dark:hover:bg-gray-600",
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    },
    {
      name: "LinkedIn",
      icon: "💼",
      color: "bg-blue-700 hover:bg-blue-800",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
    {
      name: "Telegram",
      icon: "✈️",
      color: "bg-sky-500 hover:bg-sky-600",
      href: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
    },
  ];

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback
    }
  }

  async function nativeShare() {
    if (navigator.share) {
      try {
        await navigator.share({ title, text: description ?? title, url });
      } catch { /* dismissed */ }
    }
  }

  return (
    <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
      <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-3">
        🔗 Share this tool:
      </p>
      <div className="flex flex-wrap gap-2">
        {platforms.map((p) => (
          <a
            key={p.name}
            href={p.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-1.5 px-3 py-2 ${p.color} text-white text-xs font-medium rounded-xl transition-colors`}
          >
            <span>{p.icon}</span>
            <span className="hidden sm:inline">{p.name}</span>
          </a>
        ))}

        {/* Copy Link */}
        <button
          onClick={copyLink}
          className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-xl transition-colors ${
            copied
              ? "bg-green-600 text-white"
              : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200"
          }`}
        >
          <span>{copied ? "✅" : "🔗"}</span>
          <span className="hidden sm:inline">{copied ? "Copied!" : "Copy Link"}</span>
        </button>

        {/* Native Share (mobile) */}
        {typeof navigator !== "undefined" && "share" in navigator && (
          <button
            onClick={nativeShare}
            className="flex items-center gap-1.5 px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-medium rounded-xl transition-colors sm:hidden"
          >
            <span>📤</span>
            <span>Share</span>
          </button>
        )}
      </div>
    </div>
  );
}
