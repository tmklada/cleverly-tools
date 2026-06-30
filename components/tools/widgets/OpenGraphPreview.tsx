"use client";
import { useState } from "react";

export default function OpenGraphPreview() {
  const [ogTitle, setOgTitle] = useState("");
  const [ogDesc, setOgDesc] = useState("");
  const [ogImage, setOgImage] = useState("");
  const [siteName, setSiteName] = useState("");
  const [pageUrl, setPageUrl] = useState("");
  const [copied, setCopied] = useState(false);

  const displayTitle = ogTitle || "Your Page Title";
  const displayDesc = ogDesc || "Your page description will appear here.";
  const displaySite = siteName || "example.com";
  const displayUrl = pageUrl || "https://example.com";

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

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
          <input type="text" value={ogTitle} onChange={e => setOgTitle(e.target.value)} placeholder="Your Amazing Page"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
          <textarea value={ogDesc} onChange={e => setOgDesc(e.target.value)} placeholder="A compelling description..." rows={2}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
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

      {/* Facebook/LinkedIn Preview */}
      <div>
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Facebook / LinkedIn Preview</p>
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
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Twitter Card Preview</p>
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

      {/* Google Preview */}
      <div>
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Google Search Preview</p>
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
