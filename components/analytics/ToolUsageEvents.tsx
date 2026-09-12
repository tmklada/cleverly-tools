"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

// One delegated listener per tool page, so every widget reports success
// without each of the ~90 widgets having to call the tracker itself.
export default function ToolUsageEvents({ slug }: { slug: string }) {
  useEffect(() => {
    const widget = document.getElementById("tool-widget");
    if (!widget) return;

    let reportedUse = false;
    const reportUse = () => {
      if (reportedUse) return;
      reportedUse = true;
      trackEvent("tool_used", "tools", slug);
    };

    function onClick(e: MouseEvent) {
      const el = (e.target as HTMLElement | null)?.closest("a, button");
      if (!el) return;

      const isDownload =
        el instanceof HTMLAnchorElement &&
        (el.hasAttribute("download") || el.href.startsWith("blob:") || el.href.startsWith("data:"));
      const label = (el.textContent ?? "").trim().toLowerCase();

      if (isDownload || /\bdownload\b|\bsave\b/.test(label)) {
        reportUse();
        trackEvent("tool_result_downloaded", "tools", slug);
      } else if (/\bcopy\b/.test(label)) {
        reportUse();
        trackEvent("tool_result_copied", "tools", slug);
      } else {
        reportUse();
      }
    }

    function onInput() {
      reportUse();
    }

    widget.addEventListener("click", onClick);
    widget.addEventListener("input", onInput, { once: true });
    return () => {
      widget.removeEventListener("click", onClick);
      widget.removeEventListener("input", onInput);
    };
  }, [slug]);

  return null;
}
