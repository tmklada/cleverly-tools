"use client";

import type { AdPosition } from "@/types/tool";

// ─── Central Ad Configuration ──────────────────────────────────────
// To activate ads: set ADS_ENABLED=true in Vercel env vars
// To change network: update AD_NETWORK below
// To update IDs: update the slots/client values below
// ───────────────────────────────────────────────────────────────────

const ADS_ENABLED = process.env.NEXT_PUBLIC_ADS_ENABLED === "true";
const AD_NETWORK = process.env.NEXT_PUBLIC_AD_NETWORK ?? "adsense"; // "adsense" | "ezoic"
const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? "ca-pub-XXXXXXXXXXXXXXXX";

const ADSENSE_SLOTS: Record<AdPosition, string> = {
  top:          "1111111111",
  "after-tool": "2222222222",
  sidebar:      "3333333333",
  "in-article": "4444444444",
  footer:       "5555555555",
};

// Ezoic placeholder IDs (assign in Ezoic dashboard)
const EZOIC_IDS: Record<AdPosition, number> = {
  top:          101,
  "after-tool": 102,
  sidebar:      103,
  "in-article": 104,
  footer:       105,
};

interface AdUnitProps {
  position: AdPosition;
  className?: string;
}

export default function AdUnit({ position, className = "" }: AdUnitProps) {
  if (!ADS_ENABLED) return null;

  if (AD_NETWORK === "ezoic") {
    return (
      <div
        id={`ezoic-pub-ad-placeholder-${EZOIC_IDS[position]}`}
        className={`ad-unit ad-${position} ${className}`}
      />
    );
  }

  // Default: AdSense
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
