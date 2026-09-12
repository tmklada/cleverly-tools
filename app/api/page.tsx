import type { Metadata } from "next";
import Link from "next/link";
import ApiEndpoint, { type EndpointSpec } from "@/components/api/ApiEndpoint";
import { SITE_URL, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Free Public API — QR Codes, Hashing, Exchange Rates",
  description:
    "Free HTTP API with no key and no sign-up: generate QR codes, hash text, fetch live currency rates and placeholder text. One GET request, CORS enabled.",
  keywords: [
    "free qr code api",
    "qr code api no key",
    "free public api",
    "hash api",
    "exchange rate api free",
    "lorem ipsum api",
    "api without api key",
  ],
  alternates: { canonical: `${SITE_URL}/api` },
  openGraph: {
    title: `Free Public API | ${SITE_NAME}`,
    description: "QR codes, hashing, currency rates and placeholder text over plain HTTP. No key, no sign-up.",
    url: `${SITE_URL}/api`,
    type: "website",
  },
};

const ENDPOINTS: EndpointSpec[] = [
  {
    id: "qr",
    title: "QR Code",
    path: "/api/qr",
    returns: "image/png or image/svg+xml",
    description:
      "Returns a QR code image. Point an <img> tag straight at it — no JavaScript and no build step needed.",
    params: [
      { name: "text", required: true, description: "The content to encode. Up to 1,200 characters. Alias: data" },
      { name: "size", description: "Width in pixels, 64–1000. Default 300" },
      { name: "format", description: "png or svg. Default png" },
      { name: "ecc", description: "Error correction: L, M, Q or H. Default M. Use H if the code will be printed or partly covered" },
      { name: "margin", description: "Quiet zone in modules, 0–10. Default 2" },
      { name: "dark", description: "Foreground colour as hex, e.g. 1f2937. Default 000000" },
      { name: "light", description: "Background colour as hex. Default ffffff" },
    ],
    examples: [
      { label: "Basic", query: "text=https://cleverly.tools" },
      { label: "Large, high error correction", query: "text=https://cleverly.tools&size=500&ecc=H" },
      { label: "Brand colours", query: "text=hello&size=300&dark=2563eb&light=f8fafc" },
      { label: "SVG for print", query: "text=hello&format=svg" },
    ],
    previewImage: true,
  },
  {
    id: "hash",
    title: "Hash",
    path: "/api/hash",
    returns: "application/json",
    description:
      "Hashes a string and returns the hex digest. Handy for checksums, cache keys and fixtures. Note that MD5 and SHA-1 are broken for security purposes and should only be used for integrity checks.",
    params: [
      { name: "text", required: true, description: "The string to hash. Up to 100,000 characters" },
      { name: "algorithm", description: "md5, sha1, sha256, sha384 or sha512. Default sha256. Alias: algo" },
    ],
    examples: [
      { label: "SHA-256", query: "text=hello" },
      { label: "MD5", query: "text=hello&algorithm=md5" },
    ],
  },
  {
    id: "rates",
    title: "Exchange Rates",
    path: "/api/rates",
    returns: "application/json",
    description:
      "Live mid-market fiat exchange rates for 160+ currencies, based on USD. Refreshed hourly from a public source. Not suitable for settlement or trading.",
    params: [],
    examples: [{ label: "All rates", query: "" }],
  },
  {
    id: "lorem",
    title: "Placeholder Text",
    path: "/api/lorem",
    returns: "application/json",
    description: "Deterministic lorem ipsum for mockups, seed data and tests. The same request always returns the same text.",
    params: [
      { name: "unit", description: "paragraphs, sentences or words. Default paragraphs" },
      { name: "count", description: "How many. Up to 50 paragraphs, 200 sentences or 1,000 words" },
      { name: "start", description: "Pass false to skip the classic 'Lorem ipsum dolor sit amet' opener" },
    ],
    examples: [
      { label: "3 paragraphs", query: "unit=paragraphs&count=3" },
      { label: "25 words", query: "unit=words&count=25" },
    ],
  },
];

const FAQ = [
  {
    q: "Do I need an API key or an account?",
    a: "No. Every endpoint is an open GET request. There is nothing to sign up for and no token to rotate.",
  },
  {
    q: "Is there a rate limit?",
    a: "There is no published quota. The deterministic endpoints are cached aggressively at the edge, so normal use costs us almost nothing. Please be reasonable: cache responses on your side, and don't hammer the API in a tight loop. Abusive traffic may be blocked.",
  },
  {
    q: "Can I use it in a commercial project?",
    a: "Yes. A link back to cleverly.tools is appreciated but not required for API use.",
  },
  {
    q: "Is CORS enabled?",
    a: "Yes. Every endpoint sends Access-Control-Allow-Origin: *, so you can call it directly from browser JavaScript.",
  },
  {
    q: "Why is there no password endpoint?",
    a: "Deliberately. A password that travels over the network from someone else's server is not a secret you should rely on. Use the in-browser password generator instead — it never sends anything anywhere.",
  },
  {
    q: "What happens if an endpoint changes?",
    a: "These are stable, single-purpose endpoints and we intend to keep the parameters backwards compatible. New options may be added; existing ones won't be removed without a long notice period.",
  },
];

export default function ApiDocsPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <nav className="text-sm text-gray-500 dark:text-gray-400 mb-6 flex gap-2">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <span>/</span>
          <span className="text-gray-700 dark:text-gray-300">API</span>
        </nav>

        <header className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Free public API — no key, no sign-up
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl">
            Four plain HTTP endpoints you can call from anything that can make a GET request: a QR code
            generator, a hashing endpoint, live currency rates and placeholder text. CORS is open, so
            browser JavaScript works too.
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-4 text-sm text-gray-500 dark:text-gray-400">
            <span>🔑 No API key</span>
            <span>🆓 No quota to buy</span>
            <span>🌐 CORS enabled</span>
            <span>⚡ Cached at the edge</span>
          </div>
        </header>

        <section className="mb-10 p-5 rounded-2xl bg-gray-900 dark:bg-black text-gray-100 overflow-x-auto">
          <p className="text-xs uppercase tracking-wide text-gray-400 mb-2">Quick start</p>
          <pre className="text-sm leading-relaxed"><code>{`<!-- A QR code, with no JavaScript at all -->
<img src="${SITE_URL}/api/qr?text=https://example.com&size=300" alt="QR code" />

# Or from the command line
curl "${SITE_URL}/api/hash?text=hello&algorithm=sha256"`}</code></pre>
        </section>

        <div className="space-y-10">
          {ENDPOINTS.map((endpoint) => (
            <ApiEndpoint key={endpoint.id} endpoint={endpoint} baseUrl={SITE_URL} />
          ))}
        </div>

        <section className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-5">Questions</h2>
          <div className="space-y-3">
            {FAQ.map((item) => (
              <details key={item.q} className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl">
                <summary className="flex items-center justify-between p-4 cursor-pointer font-medium text-gray-900 dark:text-white list-none">
                  {item.q}
                  <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="px-4 pb-4 text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{item.a}</div>
              </details>
            ))}
          </div>
        </section>

        <section className="mt-10 p-5 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
          <h2 className="font-bold text-gray-900 dark:text-white mb-1">Prefer a ready-made widget?</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            If you want a working tool on your page rather than raw data, all {" "}
            <Link href="/embed" className="text-blue-600 hover:underline">94 tools can be embedded</Link>{" "}
            with one line of HTML.
          </p>
        </section>
      </div>
    </>
  );
}
