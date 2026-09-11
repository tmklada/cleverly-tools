import Script from "next/script";

const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

// Loaded whenever a client ID exists: AdSense needs it for site verification and Auto ads,
// independently of the manual AdUnit placements (gated by NEXT_PUBLIC_ADS_ENABLED).
export default function AdSenseScript() {
  if (!ADSENSE_CLIENT) return null;

  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}
