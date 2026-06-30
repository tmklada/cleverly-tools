"use client";
import { useState } from "react";

function decodeHtmlEntities(html: string): string {
  const entities: Record<string, string> = {
    "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"',
    "&apos;": "'", "&nbsp;": " ", "&copy;": "©", "&reg;": "®",
    "&trade;": "™", "&mdash;": "—", "&ndash;": "–", "&hellip;": "…",
    "&laquo;": "«", "&raquo;": "»",
  };
  return html.replace(/&[a-zA-Z]+;|&#\d+;/g, (match) => {
    if (entities[match]) return entities[match];
    if (match.startsWith("&#")) {
      const code = parseInt(match.slice(2, -1));
      return String.fromCharCode(code);
    }
    return match;
  });
}

function htmlToText(html: string, preserveLineBreaks: boolean, decodeEntities: boolean): string {
  let text = html;
  if (preserveLineBreaks) {
    text = text.replace(/<br\s*\/?>/gi, "\n");
    text = text.replace(/<\/p>/gi, "\n\n");
    text = text.replace(/<\/div>/gi, "\n");
    text = text.replace(/<\/h[1-6]>/gi, "\n\n");
    text = text.replace(/<li[^>]*>/gi, "\n• ");
  }
  text = text.replace(/<[^>]+>/g, "");
  if (decodeEntities) text = decodeHtmlEntities(text);
  if (preserveLineBreaks) {
    text = text.replace(/\n{3,}/g, "\n\n");
    text = text.trim();
  }
  return text;
}

export default function HtmlToText() {
  const [input, setInput] = useState("");
  const [preserveLineBreaks, setPreserveLineBreaks] = useState(true);
  const [decodeEntities, setDecodeEntities] = useState(true);
  const [copied, setCopied] = useState(false);

  const output = input ? htmlToText(input, preserveLineBreaks, decodeEntities) : "";
  const wordCount = output ? output.trim().split(/\s+/).filter(Boolean).length : 0;
  const charCount = output.length;

  const copy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const SAMPLE_HTML = `<h1>Hello World</h1>
<p>This is a <strong>sample</strong> HTML with &amp; entities.</p>
<ul>
  <li>Item one</li>
  <li>Item two</li>
</ul>
<p>Copyright &copy; 2024</p>`;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-3">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">HTML Input</label>
          <button onClick={() => setInput(SAMPLE_HTML)} className="text-xs text-blue-600 dark:text-blue-400 hover:underline">
            Load sample
          </button>
        </div>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={8}
          placeholder="Paste your HTML here..."
          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm resize-none"
        />

        <div className="flex flex-wrap gap-4 mt-4">
          <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
            <input type="checkbox" checked={preserveLineBreaks} onChange={(e) => setPreserveLineBreaks(e.target.checked)} className="rounded" />
            Preserve line breaks
          </label>
          <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
            <input type="checkbox" checked={decodeEntities} onChange={(e) => setDecodeEntities(e.target.checked)} className="rounded" />
            Decode HTML entities
          </label>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Plain Text Output</span>
            <span className="text-xs text-gray-400 dark:text-gray-500">{wordCount} words · {charCount} chars</span>
          </div>
          <button
            onClick={copy}
            disabled={!output}
            className="px-4 py-1.5 text-sm bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-lg transition-colors"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
        <textarea
          readOnly
          value={output}
          rows={8}
          placeholder="Plain text will appear here..."
          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white resize-none focus:outline-none text-sm"
        />
      </div>
    </div>
  );
}
