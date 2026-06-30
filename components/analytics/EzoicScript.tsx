import Script from "next/script";

const EZOIC_ENABLED = process.env.NEXT_PUBLIC_EZOIC_ENABLED === "true";

export default function EzoicScript() {
  if (!EZOIC_ENABLED) return null;

  return (
    <>
      {/* Privacy Scripts — must load first */}
      <Script
        data-cfasync="false"
        src="https://cmp.gatekeeperconsent.com/min.js"
        strategy="beforeInteractive"
      />
      <Script
        data-cfasync="false"
        src="https://the.gatekeeperconsent.com/cmp.min.js"
        strategy="beforeInteractive"
      />

      {/* Ezoic Header Script */}
      <Script
        src="//www.ezojs.com/ezoic/sa.min.js"
        strategy="beforeInteractive"
      />
      <Script id="ezoic-init" strategy="beforeInteractive">
        {`
          window.ezstandalone = window.ezstandalone || {};
          ezstandalone.cmd = ezstandalone.cmd || [];
        `}
      </Script>
      <Script
        src="//ezoicanalytics.com/analytics.js"
        strategy="afterInteractive"
      />
    </>
  );
}
