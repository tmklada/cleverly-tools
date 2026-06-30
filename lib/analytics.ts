"use client";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(action: string, category: string, label?: string, value?: number) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value,
    });
  }
}

// Tool-specific events
export const events = {
  toolUsed: (toolSlug: string) =>
    trackEvent("tool_used", "tools", toolSlug),

  downloadStarted: (toolSlug: string, quality: string) =>
    trackEvent("download_started", "downloads", `${toolSlug}__${quality}`),

  downloadHdGate: (toolSlug: string) =>
    trackEvent("hd_gate_shown", "monetization", toolSlug),

  blogRead: (slug: string) =>
    trackEvent("blog_read", "content", slug),

  searchUsed: (query: string) =>
    trackEvent("search", "engagement", query),

  toolCopied: (toolSlug: string) =>
    trackEvent("result_copied", "tools", toolSlug),
};
