"use client";
import { useState } from "react";

export default function MetaTagGenerator() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [keywords, setKeywords] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [ogImage, setOgImage] = useState("");
  const [twitter, setTwitter] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  function copyText(text: string, key: string) {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  }

  const basicTags = `<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
${title ? `<title>${title}</title>` : ""}
${description ? `<meta name="description" content="${description}">` : ""}
${keywords ? `<meta name="keywords" content="${keywords}">` : ""}
${author ? `<meta name="author" content="${author}">` : ""}`.trim();

  const ogTags = `${title ? `<meta property="og:title" content="${title}">` : ""}
${description ? `<meta property="og:description" content="${description}">` : ""}
${url ? `<meta property="og:url" content="${url}">` : ""}
${ogImage ? `<meta property="og:image" content="${ogImage}">` : ""}
<meta property="og:type" content="website">`.trim();

  const twitterTags = `<meta name="twitter:card" content="summary_large_image">
${twitter ? `<meta name="twitter:site" content="@${twitter.replace("@", "")}">` : ""}
${title ? `<meta name="twitter:title" content="${title}">` : ""}
${description ? `<meta name="twitter:description" content="${description}">` : ""}
${ogImage ? `<meta name="twitter:image" content="${ogImage}">` : ""}`.trim();

  const allTags = `<!-- Basic Meta Tags -->
${basicTags}

<!-- Open Graph Tags -->
${ogTags}

<!-- Twitter Card Tags -->
${twitterTags}`;

  const titleLen = title.length;
  const descLen = description.length;

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-4">
        <div>
          <div className="flex justify-between mb-1">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Page Title</label>
            <span className={`text-xs ${titleLen > 60 ? "text-red-500" : titleLen > 50 ? "text-yellow-500" : "text-gray-400"}`}>{titleLen}/60</span>
          </div>
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="My Awesome Page"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        <div>
          <div className="flex justify-between mb-1">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
            <span className={`text-xs ${descLen > 160 ? "text-red-500" : descLen > 140 ? "text-yellow-500" : "text-gray-400"}`}>{descLen}/160</span>
          </div>
          <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="A brief description of this page..." rows={2}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Keywords</label>
            <input type="text" value={keywords} onChange={e => setKeywords(e.target.value)} placeholder="seo, tools, web"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Author</label>
            <input type="text" value={author} onChange={e => setAuthor(e.target.value)} placeholder="John Doe"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Page URL</label>
          <input type="url" value={url} onChange={e => setUrl(e.target.value)} placeholder="https://example.com/page"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">OG Image URL</label>
          <input type="url" value={ogImage} onChange={e => setOgImage(e.target.value)} placeholder="https://example.com/image.jpg"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Twitter Handle</label>
          <input type="text" value={twitter} onChange={e => setTwitter(e.target.value)} placeholder="@username"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
      </div>

      {/* Google Search Preview */}
      {(title || description || url) && (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl p-4">
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wide">Google Preview</p>
          <div className="text-xs text-green-700 dark:text-green-400">{url || "https://example.com"}</div>
          <div className="text-blue-700 dark:text-blue-400 text-base font-medium hover:underline cursor-pointer line-clamp-1">{title || "Page Title"}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{description || "Page description will appear here..."}</div>
        </div>
      )}

      {/* Tag sections */}
      {[
        { label: "Basic Meta Tags", code: basicTags, key: "basic" },
        { label: "Open Graph Tags", code: ogTags, key: "og" },
        { label: "Twitter Card Tags", code: twitterTags, key: "twitter" },
        { label: "All Tags", code: allTags, key: "all" },
      ].map(({ label, code, key }) => (
        <div key={key} className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</p>
            <button onClick={() => copyText(code, key)}
              className="text-xs px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
              {copied === key ? "Copied!" : "Copy"}
            </button>
          </div>
          <pre className="bg-gray-900 text-green-400 text-xs p-3 rounded-xl overflow-x-auto whitespace-pre-wrap">{code}</pre>
        </div>
      ))}
    </div>
  );
}
