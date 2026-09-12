"use client";

import { useEffect } from "react";

// Reports the rendered height to the host page so an embed can size itself.
// Hosts that don't run our resize snippet just keep the fixed iframe height.
export default function EmbedAutoHeight() {
  useEffect(() => {
    if (window.parent === window) return;

    let last = 0;
    const post = () => {
      const height = Math.ceil(document.documentElement.scrollHeight);
      if (height === last) return;
      last = height;
      window.parent.postMessage({ type: "cleverly-tools:height", height }, "*");
    };

    post();
    const observer = new ResizeObserver(post);
    observer.observe(document.documentElement);
    return () => observer.disconnect();
  }, []);

  return null;
}
