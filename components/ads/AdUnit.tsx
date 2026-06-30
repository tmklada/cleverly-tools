"use client";

import { useEffect } from "react";
import type { AdPosition } from "@/types/tool";

const ADS_ENABLED = process.env.NEXT_PUBLIC_ADS_ENABLED === "true";
const AD_NETWORK = process.env.NEXT_PUBLIC_AD_NETWORK ?? "ezoic";
const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? "ca-pub-XXXXXXXXXXXXXXXX";

const ADSENSE_SLOTS: Record<AdPosition, string> = {
  top:          "1111111111",
  "after-tool": "2222222222",
  sidebar:      "3333333333",
  "in-article": "4444444444",
  footer:       "5555555555",
};

const EZOIC_IDS: Record<AdPosition, number> = {
  top:          101,
  "after-tool": 102,
  sidebar:      103,
  "in-article": 104,
  footer:       105,
};

declare global {
  interface Window {
    ezstandalone?: {
      cmd: Array<() => void>;
      showAds: (...ids: number[]) => void;
      defined?: boolean;
    };
  }
}

interface AdUnitProps {
  position: AdPosition;
  className?: string;
}

export default function AdUnit({ position, className = "" }: AdUnitProps) {
  const ezoicId = EZOIC_IDS[position];

  useEffect(() => {
    if (!ADS_ENABLED || AD_NETWORK !== "ezoic") return;
    if (typeof window === "undefined") return;

    const show = () => {
      if (window.ezstandalone?.showAds) {
        window.ezstandalone.showAds(ezoicId);
      }
    };

    if (window.ezstandalone?.cmd) {
      window.ezstandalone.cmd.push(show);
    } else {
      // retry once scripts load
      setTimeout(show, 1500);
    }
  }, [ezoicId]);

  if (!ADS_ENABLED) return null;

  if (AD_NETWORK === "ezoic") {
    return (
      <div
        id={`ezoic-pub-ad-placeholder-${ezoicId}`}
        className={`ad-unit ad-${position} ${className}`}
      />
    );
  }

  // AdSense fallback
  return (
    <div className={`ad-unit ad-${position} ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={ADSENSE_SLOTS[position]}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
