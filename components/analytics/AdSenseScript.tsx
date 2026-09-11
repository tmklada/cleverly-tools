const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

// Plain <script> (not next/script) so the literal tag Google's verifier looks for is in <head>.
export default function AdSenseScript() {
  if (!ADSENSE_CLIENT) return null;

  return (
    <script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
      crossOrigin="anonymous"
    />
  );
}
