"use client";

import type { AdPosition } from "@/types/tool";

// Central ad configuration — change here to update all ad placements
const ADS_ENABLED = false; // Set to true when AdSense/Ezoic approved
const AD_NETWORK = "adsense"; // "adsense" | "ezoic" | "propellerads"
const ADSENSE_CLIENT = "ca-pub-XXXXXXXXXXXXXXXX"; // Replace with real ID

const adSlots: Record<AdPosition, string> = {
  top: "1234567890",
  "after-tool": "0987654321",
  sidebar: "1122334455",
  "in-article": "5544332211",
  footer: "9988776655",
};

interface AdUnitProps {
  position: AdPosition;
  className?: string;
}

export default function AdUnit({ position, className = "" }: AdUnitProps) {
  if (!ADS_ENABLED) return null;

  return (
    <div className={`ad-unit ad-${position} ${className}`} data-position={position}>
      {AD_NETWORK === "adsense" && (
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client={ADSENSE_CLIENT}
          data-ad-slot={adSlots[position]}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      )}
    </div>
  );
}
