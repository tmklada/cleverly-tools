"use client";
import { useState } from "react";

/**
 * Practical display limits before each platform visually truncates a link card.
 * These are the lengths at which text starts getting cut with an ellipsis,
 * not hard limits on what you may put in the tag.
 */
const LIMITS = [
  { platform: "Facebook", title: 88, desc: 200 },
  { platform: "LinkedIn", title: 119, desc: 160 },
  { platform: "X (Twitter)", title: 70, desc: 200 },
  { platform: "WhatsApp", title: 65, desc: 160 },
  { platform: "Google", title: 60, desc: 155 },
] as const;

function CountBadge({ label, length, limit }: { label: string; length: number; limit: number }) {
  const over = length > limit;
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium ${
        over
          ? "bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300"
          : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
      }`}
    >
      {over && <span aria-hidden="true">⚠</span>}
      {label ? `${label} ` : ""}
      {length}/{limit}
      {over && " — will be cut"}
    </span>
  );
}

export default function OpenGraphPreview() {
  const [ogTitle, setOgTitle] = useState("");
  const [ogDesc, setOgDesc] = useState("");
  const [ogImage, setOgImage] = useState("");
  const [siteName, setSiteName] = useState("");
  const [pageUrl, setPageUrl] = useState("");
  const [copied, setCopied] = useState(false);

  const displayTitle = ogTitle || "Your Page Title";
  const displayDesc = ogDesc || "Your page description will appear here.";
  const displayUrl = pageUrl || "https://example.com";

  const titleLen = ogTitle.length;
  const descLen = ogDesc.length;

  const metaTags = `<!-- Open Graph / Facebook -->
<meta property="og:type" content="website">
<meta property="og:url" content="${displayUrl}">
<meta property="og:title" content="${displayTitle}">
<meta property="og:description" content="${displayDesc}">
${ogImage ? `<meta property="og:image" content="${ogImage}">` : ""}
${siteName ? `<meta property="og:site_name" content="${siteName}">` : ""}

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:url" content="${displayUrl}">
<meta name="twitter:title" content="${displayTitle}">
<meta name="twitter:description" content="${displayDesc}">
${ogImage ? `<meta name="twitter:image" content="${ogImage}">` : ""}`.trim();

  function copy() {
    navigator.clipboard.writeText(metaTags);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const domain = (() => {
    try { return new URL(displayUrl).hostname; } catch { return displayUrl; }
  })();

  const limitFor = (platform: string) => LIMITS.find((p) => p.platform === platform)!;

  const overCount = LIMITS.filter((p) => titleLen > p.title || descLen > p.desc).length;

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
          <input type="text" value={ogTitle} onChange={e => setOgTitle(e.target.value)} placeholder="Your Amazing Page"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{titleLen} characters</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
          <textarea value={ogDesc} onChange={e => setOgDesc(e.target.value)} placeholder="A compelling description..." rows={2}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{descLen} characters</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Image URL</label>
          <input type="url" value={ogImage} onChange={e => setOgImage(e.target.value)} placeholder="https://example.com/og-image.jpg"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Site Name</label>
            <input type="text" value={siteName} onChange={e => setSiteName(e.target.value)} placeholder="My Website"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">URL</label>
            <input type="url" value={pageUrl} onChange={e => setPageUrl(e.target.value)} placeholder="https://example.com"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>
      </div>

      {/* Truncation warnings */}
      <div className="rounded-xl border border-gray-200 dark:border-gray-600 overflow-hidden">
        <div className="px-4 py-2 bg-gray-50 dark:bg-gray-800 flex items-center justify-between">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Length check</p>
          <span className={`text-xs font-medium ${overCount > 0 ? "text-amber-600 dark:text-amber-400" : "text-green-600 dark:text-green-400"}`}>
            {overCount > 0
              ? `${overCount} platform${overCount > 1 ? "s" : ""} will truncate`
              : "Fits everywhere"}
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
                <th className="py-2 px-4 font-semibold">Platform</th>
                <th className="py-2 px-4 font-semibold">Title</th>
                <th className="py-2 px-4 font-semibold">Description</th>
              </tr>
            </thead>
            <tbody>
              {LIMITS.map((p) => (
                <tr key={p.platform} className="border-b border-gray-100 dark:border-gray-800 last:border-0">
                  <td className="py-2 px-4 font-medium text-gray-700 dark:text-gray-300">{p.platform}</td>
                  <td className="py-2 px-4">
                    <CountBadge label="" length={titleLen} limit={p.title} />
                  </td>
                  <td className="py-2 px-4">
                    <CountBadge label="" length={descLen} limit={p.desc} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="px-4 py-2 text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800">
          Text past these lengths still lives in the tag, it just gets cut with an ellipsis in the
          card the reader sees.
        </p>
      </div>

      {/* Facebook/LinkedIn Preview */}
      <div>
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Facebook / LinkedIn Preview</p>
          <CountBadge label="title" length={titleLen} limit={limitFor("Facebook").title} />
          <CountBadge label="desc" length={descLen} limit={limitFor("Facebook").desc} />
        </div>
        <div className="border border-gray-200 dark:border-gray-600 rounded-xl overflow-hidden max-w-sm">
          {ogImage ? (
            <img src={ogImage} alt="OG" className="w-full h-40 object-cover" onError={e => (e.currentTarget.style.display = "none")} />
          ) : (
            <div className="w-full h-40 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center text-gray-400 text-xs">No image</div>
          )}
          <div className="p-3 bg-gray-50 dark:bg-gray-800">
            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase">{domain}</p>
            <p className="text-sm font-bold text-gray-900 dark:text-white line-clamp-2">{displayTitle}</p>
            <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 mt-0.5">{displayDesc}</p>
          </div>
        </div>
      </div>

      {/* Twitter Preview */}
      <div>
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Twitter Card Preview</p>
          <CountBadge label="title" length={titleLen} limit={limitFor("X (Twitter)").title} />
          <CountBadge label="desc" length={descLen} limit={limitFor("X (Twitter)").desc} />
        </div>
        <div className="border border-gray-200 dark:border-gray-600 rounded-2xl overflow-hidden max-w-sm">
          {ogImage ? (
            <img src={ogImage} alt="Twitter" className="w-full h-36 object-cover" onError={e => (e.currentTarget.style.display = "none")} />
          ) : (
            <div className="w-full h-36 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center text-gray-400 text-xs">No image</div>
          )}
          <div className="p-3 bg-white dark:bg-gray-900">
            <p className="text-sm font-bold text-gray-900 dark:text-white line-clamp-1">{displayTitle}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mt-0.5">{displayDesc}</p>
            <p className="text-xs text-gray-400 mt-1">{domain}</p>
          </div>
        </div>
      </div>

      {/* WhatsApp Preview — small square thumbnail on the left, inside a chat bubble */}
      <div>
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">WhatsApp Preview</p>
          <CountBadge label="title" length={titleLen} limit={limitFor("WhatsApp").title} />
          <CountBadge label="desc" length={descLen} limit={limitFor("WhatsApp").desc} />
        </div>
        <div className="max-w-sm rounded-xl p-2 bg-[#dcf8c6] dark:bg-[#075e54]/40">
          <div className="rounded-lg overflow-hidden bg-white/70 dark:bg-gray-900/60">
            <div className="flex gap-2 p-2">
              {ogImage ? (
                <img
                  src={ogImage}
                  alt="WhatsApp thumbnail"
                  className="w-20 h-20 shrink-0 rounded-md object-cover"
                  onError={e => (e.currentTarget.style.display = "none")}
                />
              ) : (
                <div className="w-20 h-20 shrink-0 rounded-md bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center text-gray-400 text-[10px] text-center leading-tight">
                  No image
                </div>
              )}
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-bold text-gray-900 dark:text-white line-clamp-2 leading-snug">
                  {displayTitle}
                </p>
                <p className="text-[12px] text-gray-600 dark:text-gray-400 line-clamp-2 leading-snug mt-0.5">
                  {displayDesc}
                </p>
                <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-1 truncate">{domain}</p>
              </div>
            </div>
          </div>
          <p className="px-2 pt-1 text-[11px] text-blue-700 dark:text-blue-300 break-all">{displayUrl}</p>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          WhatsApp uses a compact square thumbnail rather than a wide banner, so keep the important
          part of the image near its centre.
        </p>
      </div>

      {/* Google Preview */}
      <div>
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Google Search Preview</p>
          <CountBadge label="title" length={titleLen} limit={limitFor("Google").title} />
          <CountBadge label="desc" length={descLen} limit={limitFor("Google").desc} />
        </div>
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl p-4 max-w-sm">
          <p className="text-xs text-green-700 dark:text-green-400">{displayUrl}</p>
          <p className="text-blue-700 dark:text-blue-400 text-base font-medium">{displayTitle}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{displayDesc}</p>
        </div>
      </div>

      {/* Meta Tags Code */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Generated Meta Tags</p>
          <button onClick={copy} className="text-xs px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
        <pre className="bg-gray-900 text-green-400 text-xs p-4 rounded-xl overflow-x-auto whitespace-pre-wrap">{metaTags}</pre>
      </div>
    </div>
  );
}
