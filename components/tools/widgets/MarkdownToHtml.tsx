"use client";
import { useState } from "react";

function parseMarkdown(md: string): string {
  let html = md
    // Escape HTML entities first
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Fenced code blocks
  html = html.replace(/```[\w]*\n([\s\S]*?)```/g, (_, code) => `<pre class="bg-gray-100 dark:bg-gray-800 rounded-lg p-3 overflow-x-auto text-sm font-mono my-3"><code>${code.trim()}</code></pre>`);

  // Blockquotes
  html = html.replace(/^&gt; (.+)$/gm, '<blockquote class="border-l-4 border-blue-400 pl-4 italic text-gray-600 dark:text-gray-400 my-2">$1</blockquote>');

  // Headers
  html = html.replace(/^### (.+)$/gm, '<h3 class="text-lg font-bold mt-4 mb-1 text-gray-900 dark:text-white">$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2 class="text-xl font-bold mt-5 mb-2 text-gray-900 dark:text-white">$1</h2>');
  html = html.replace(/^# (.+)$/gm, '<h1 class="text-2xl font-bold mt-6 mb-3 text-gray-900 dark:text-white">$1</h1>');

  // Unordered lists — group consecutive list items
  html = html.replace(/((?:^- .+\n?)+)/gm, (match) => {
    const items = match.trim().split("\n").map(line =>
      `<li class="ml-5 list-disc">${line.replace(/^- /, "")}</li>`
    ).join("");
    return `<ul class="my-2 space-y-1">${items}</ul>`;
  });

  // Bold + italic combined
  html = html.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>');
  // Bold
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  // Italic
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');

  // Inline code
  html = html.replace(/`([^`]+)`/g, '<code class="bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded text-sm font-mono">$1</code>');

  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">$1</a>');

  // Paragraphs — wrap lines not already in block elements
  const lines = html.split("\n");
  const result: string[] = [];
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      result.push("");
      continue;
    }
    const isBlock = /^<(h[1-6]|ul|ol|li|pre|blockquote)/.test(trimmed);
    result.push(isBlock ? trimmed : `<p class="my-1.5 leading-relaxed">${trimmed}</p>`);
  }

  return result.join("\n");
}

const SAMPLE = `# Hello World

## Getting Started

This is a **bold** statement and this is *italic*.

Here is a [link](https://example.com) and some \`inline code\`.

\`\`\`
const greeting = "Hello, World!";
console.log(greeting);
\`\`\`

> This is a blockquote with important info.

- First item
- Second item
- Third item
`;

export default function MarkdownToHtml() {
  const [markdown, setMarkdown] = useState<string>(SAMPLE);
  const [showRawHtml, setShowRawHtml] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const html = parseMarkdown(markdown);

  function copy() {
    navigator.clipboard.writeText(html);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Markdown Input</label>
          <textarea
            value={markdown}
            onChange={e => setMarkdown(e.target.value)}
            rows={16}
            placeholder="Type your markdown here..."
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">HTML Preview</label>
          <div
            className="w-full min-h-64 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm overflow-auto"
            style={{ minHeight: "calc(16 * 1.5rem + 24px)" }}
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </div>

      <div className="flex gap-3 flex-wrap">
        <button
          onClick={() => setShowRawHtml(s => !s)}
          className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 font-semibold rounded-xl text-sm transition-colors"
        >
          {showRawHtml ? "Hide" : "Show"} Raw HTML
        </button>
        <button
          onClick={copy}
          className={`px-4 py-2 rounded-xl font-semibold text-sm transition-colors ${copied ? "bg-green-600 text-white" : "bg-blue-600 hover:bg-blue-700 text-white"}`}
        >
          {copied ? "✓ Copied HTML!" : "Copy HTML"}
        </button>
        <button
          onClick={() => setMarkdown("")}
          className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 font-semibold rounded-xl text-sm transition-colors"
        >
          Clear
        </button>
      </div>

      {showRawHtml && (
        <textarea
          value={html}
          readOnly
          rows={8}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-xs resize-none"
        />
      )}
    </div>
  );
}
