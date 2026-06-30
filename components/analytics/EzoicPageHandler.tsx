"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

declare global {
  interface Window {
    ezstandalone?: {
      cmd: Array<() => void>;
      showAds: (...ids: number[]) => void;
      destroyAll: () => void;
      defined?: boolean;
    };
  }
}

export default function EzoicPageHandler() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.ezstandalone) return;

    window.ezstandalone.cmd.push(function () {
      if (window.ezstandalone?.destroyAll) {
        window.ezstandalone.destroyAll();
      }
      if (window.ezstandalone?.showAds) {
        window.ezstandalone.showAds();
      }
    });
  }, [pathname]);

  return null;
}
