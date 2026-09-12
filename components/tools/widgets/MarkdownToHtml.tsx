"use client";
import { useState } from "react";

/* ------------------------------------------------------------------ *
 * Security helpers
 * ------------------------------------------------------------------ */

/** Escape every HTML-significant character. Used for ALL user text. */
function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Returns an escaped, safe URL, or null if the scheme is dangerous.
 * Allowed: http, https, mailto, relative/anchor paths, and data:image/* (no SVG).
 * Rejected: javascript:, vbscript:, file:, data:text/html, etc.
 */
function safeUrl(raw: string): string | null {
  // Browsers ignore control chars/whitespace inside a scheme ("java\tscript:"),
  // so strip them before deciding.
  const url = raw.trim();
  const probe = Array.from(url).filter(c => c.charCodeAt(0) > 32 && c.charCodeAt(0) !== 127).join("");
  const schemeMatch = /^([a-zA-Z][a-zA-Z0-9+.-]*):/.exec(probe);

  if (schemeMatch) {
    const scheme = schemeMatch[1].toLowerCase();
    if (scheme === "http" || scheme === "https" || scheme === "mailto") return esc(url);
    // Inline images only — never data:text/html, and not SVG (it can carry script).
    if (scheme === "data") {
      return /^data:image\/(png|jpe?g|gif|webp|avif|bmp|x-icon);/i.test(probe) ? esc(url) : null;
    }
    return null;
  }

  // Protocol-relative ("//evil.com") is fine; so are relative paths and anchors.
  return esc(url);
}

/* ------------------------------------------------------------------ *
 * Inline formatting
 * ------------------------------------------------------------------ */

const SENTINEL = String.fromCharCode(0);

/**
 * Convert inline markdown (code, images, links, emphasis, strikethrough).
 * Anything that is not a recognised construct ends up HTML-escaped, so raw
 * tags in the source are rendered as text and never executed.
 */
function inline(src: string): string {
  const held: string[] = [];
  const hold = (html: string) => `${SENTINEL}${held.push(html) - 1}${SENTINEL}`;

  let s = src;

  // 1. Inline code — contents escaped, never re-parsed.
  s = s.replace(/`([^`\n]+)`/g, (_m, code: string) =>
    hold(`<code class="bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded text-sm font-mono">${esc(code)}</code>`)
  );

  // 2. Images — ![alt](src "title")
  s = s.replace(
    /!\[([^\]]*)\]\(\s*([^()\s]*)(?:\s+"([^"]*)")?\s*\)/g,
    (m: string, alt: string, url: string, title?: string) => {
      const href = safeUrl(url);
      if (!href) return m; // falls through and gets escaped as plain text
      const t = title ? ` title="${esc(title)}"` : "";
      return hold(`<img src="${href}" alt="${esc(alt)}"${t} class="max-w-full h-auto rounded-lg my-3" loading="lazy" />`);
    }
  );

  // 3. Links — [text](href "title"). Text stays in the stream so it still
  //    picks up emphasis, and gets escaped in step 4 like everything else.
  s = s.replace(
    /\[([^\]]*)\]\(\s*([^()\s]*)(?:\s+"([^"]*)")?\s*\)/g,
    (m: string, text: string, url: string, title?: string) => {
      const href = safeUrl(url);
      if (!href) return m;
      const t = title ? ` title="${esc(title)}"` : "";
      return (
        hold(`<a href="${href}"${t} class="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer nofollow">`) +
        text +
        hold("</a>")
      );
    }
  );

  // 4. Everything still raw becomes text.
  s = esc(s);

  // 5. Emphasis on the now-safe string. Longest markers first.
  s = s.replace(/\*\*\*([^*]+)\*\*\*/g, "<strong><em>$1</em></strong>");
  s = s.replace(/___([^_]+)___/g, "<strong><em>$1</em></strong>");
  s = s.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  s = s.replace(/__([^_]+)__/g, "<strong>$1</strong>");
  s = s.replace(/\*([^*\n]+)\*/g, "<em>$1</em>");
  s = s.replace(/(^|[\s(])_([^_\n]+)_/g, "$1<em>$2</em>");
  s = s.replace(/~~([^~]+)~~/g, "<del>$1</del>");

  // 6. Put the safe HTML fragments back.
  return s.replace(new RegExp(SENTINEL + "([0-9]+)" + SENTINEL, "g"), (_m, i: string) => held[Number(i)]);
}

/* ------------------------------------------------------------------ *
 * Block-level parsing
 * ------------------------------------------------------------------ */

const LIST_RE = /^(\s*)([-*+]|\d{1,9}[.)])\s+(.*)$/;
const HR_RE = /^\s*(?:-{3,}|\*{3,}|_{3,})\s*$/;
const HEADING_RE = /^\s{0,3}(#{1,6})\s+(.*?)\s*#*\s*$/;
const FENCE_RE = /^\s*(?:```|~~~)\s*([\w+-]*)\s*$/;
const TABLE_DELIM_RE = /^\s*\|?\s*:?-{1,}:?\s*(?:\|\s*:?-{1,}:?\s*)*\|?\s*$/;

/** Split a table row on unescaped pipes. */
function splitRow(line: string): string[] {
  const trimmed = line.trim().replace(/^\|/, "").replace(/\|$/, "");
  const cells: string[] = [];
  let cur = "";
  for (let i = 0; i < trimmed.length; i++) {
    const ch = trimmed[i];
    if (ch === "\\" && trimmed[i + 1] === "|") {
      cur += "|";
      i++;
    } else if (ch === "|") {
      cells.push(cur.trim());
      cur = "";
    } else {
      cur += ch;
    }
  }
  cells.push(cur.trim());
  return cells;
}

function alignOf(spec: string): string {
  const s = spec.trim();
  const left = s.startsWith(":");
  const right = s.endsWith(":");
  if (left && right) return ' style="text-align:center"';
  if (right) return ' style="text-align:right"';
  if (left) return ' style="text-align:left"';
  return "";
}

/** Build a (possibly nested) list starting at `i`. Returns [html, nextIndex]. */
function renderList(lines: string[], i: number, indent: number): [string, number] {
  const first = LIST_RE.exec(lines[i])!;
  const ordered = /\d/.test(first[2]);
  const items: string[] = [];
  let text: string[] = [];
  let nested: string[] = [];
  let open = false;

  const flush = () => {
    if (!open) return;
    items.push(`<li class="ml-5">${inline(text.join(" "))}${nested.join("")}</li>`);
    text = [];
    nested = [];
  };

  while (i < lines.length) {
    const line = lines[i];

    if (!line.trim()) {
      const next = lines[i + 1];
      // A blank line only continues the list if another item follows.
      if (next && LIST_RE.test(next) && (LIST_RE.exec(next)![1].length >= indent)) {
        i++;
        continue;
      }
      break;
    }

    const m = LIST_RE.exec(line);
    if (m) {
      const ind = m[1].length;
      if (ind < indent) break;
      if (ind >= indent + 2 && open) {
        const [html, next] = renderList(lines, i, ind);
        nested.push(html);
        i = next;
        continue;
      }
      flush();
      open = true;
      text.push(m[3]);
      i++;
      continue;
    }

    if (open && !HR_RE.test(line) && !HEADING_RE.test(line) && !FENCE_RE.test(line)) {
      text.push(line.trim()); // lazy continuation of the current item
      i++;
      continue;
    }
    break;
  }
  flush();

  const tag = ordered ? "ol" : "ul";
  const listStyle = ordered ? "list-decimal" : "list-disc";
  const startNum = ordered ? parseInt(first[2], 10) : 1;
  const startAttr = ordered && startNum !== 1 ? ` start="${startNum}"` : "";
  return [`<${tag}${startAttr} class="my-2 space-y-1 ${listStyle}">${items.join("")}</${tag}>`, i];
}

function renderBlocks(lines: string[]): string {
  const out: string[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (!line.trim()) {
      i++;
      continue;
    }

    // Fenced code block — contents preserved verbatim and escaped.
    const fence = FENCE_RE.exec(line);
    if (fence) {
      const marker = line.trim().slice(0, 3);
      const code: string[] = [];
      i++;
      while (i < lines.length && lines[i].trim().slice(0, 3) !== marker) {
        code.push(lines[i]);
        i++;
      }
      i++; // consume closing fence
      const lang = fence[1] ? ` class="language-${esc(fence[1])}"` : "";
      out.push(
        `<pre class="bg-gray-100 dark:bg-gray-800 rounded-lg p-3 overflow-x-auto text-sm font-mono my-3"><code${lang}>${esc(code.join("\n"))}</code></pre>`
      );
      continue;
    }

    // Horizontal rule (checked before lists so "---" isn't read as a bullet).
    if (HR_RE.test(line)) {
      out.push('<hr class="my-5 border-gray-200 dark:border-gray-700" />');
      i++;
      continue;
    }

    // Headings H1-H6
    const heading = HEADING_RE.exec(line);
    if (heading) {
      const level = heading[1].length;
      const sizes = ["text-2xl", "text-xl", "text-lg", "text-base", "text-sm", "text-xs"];
      const spacing = ["mt-6 mb-3", "mt-5 mb-2", "mt-4 mb-1", "mt-4 mb-1", "mt-3 mb-1", "mt-3 mb-1"];
      out.push(
        `<h${level} class="${sizes[level - 1]} font-bold ${spacing[level - 1]} text-gray-900 dark:text-white">${inline(heading[2])}</h${level}>`
      );
      i++;
      continue;
    }

    // Blockquote (supports nesting via recursion)
    if (/^\s{0,3}>/.test(line)) {
      const inner: string[] = [];
      while (i < lines.length && (/^\s{0,3}>/.test(lines[i]) || (lines[i].trim() && inner.length))) {
        inner.push(lines[i].replace(/^\s{0,3}>\s?/, ""));
        i++;
      }
      out.push(
        `<blockquote class="border-l-4 border-blue-400 pl-4 italic text-gray-600 dark:text-gray-400 my-2">${renderBlocks(inner)}</blockquote>`
      );
      continue;
    }

    // GFM pipe table: header row + alignment row
    if (line.includes("|") && i + 1 < lines.length && TABLE_DELIM_RE.test(lines[i + 1]) && lines[i + 1].includes("-")) {
      const headers = splitRow(line);
      const aligns = splitRow(lines[i + 1]).map(alignOf);
      i += 2;
      const body: string[] = [];
      while (i < lines.length && lines[i].trim() && lines[i].includes("|")) {
        const cells = splitRow(lines[i]);
        const tds = headers
          .map((_h, c) => `<td class="border border-gray-200 dark:border-gray-700 px-3 py-1.5"${aligns[c] || ""}>${inline(cells[c] ?? "")}</td>`)
          .join("");
        body.push(`<tr>${tds}</tr>`);
        i++;
      }
      const ths = headers
        .map((h, c) => `<th class="border border-gray-200 dark:border-gray-700 px-3 py-1.5 font-semibold bg-gray-50 dark:bg-gray-800"${aligns[c] || ""}>${inline(h)}</th>`)
        .join("");
      out.push(
        `<table class="w-full my-3 border-collapse text-sm"><thead><tr>${ths}</tr></thead><tbody>${body.join("")}</tbody></table>`
      );
      continue;
    }

    // Ordered / unordered lists (nesting supported)
    if (LIST_RE.test(line)) {
      const [html, next] = renderList(lines, i, LIST_RE.exec(line)![1].length);
      out.push(html);
      i = next;
      continue;
    }

    // Paragraph — consecutive plain lines
    const para: string[] = [];
    while (i < lines.length && lines[i].trim()) {
      const l = lines[i];
      if (
        HR_RE.test(l) ||
        HEADING_RE.test(l) ||
        FENCE_RE.test(l) ||
        LIST_RE.test(l) ||
        /^\s{0,3}>/.test(l) ||
        (l.includes("|") && i + 1 < lines.length && TABLE_DELIM_RE.test(lines[i + 1]) && lines[i + 1].includes("-"))
      ) {
        break;
      }
      // Two trailing spaces or a trailing backslash = hard line break.
      const hardBreak = /(\s{2}|\\)$/.test(l);
      para.push(inline(l.replace(/(\s{2}|\\)$/, "").trim()) + (hardBreak ? "<br />" : ""));
      i++;
    }
    if (para.length) {
      out.push(`<p class="my-1.5 leading-relaxed">${para.join(" ")}</p>`);
    }
  }

  return out.join("\n");
}

export function parseMarkdown(md: string): string {
  // The sentinel is reserved for internal placeholders.
  const lines = md.split(SENTINEL).join("").replace(/\r\n?/g, "\n").split("\n");
  return renderBlocks(lines);
}

const SAMPLE = `# Hello World

## Getting Started

This is a **bold** statement, this is *italic*, and this is ~~struck through~~.

Here is a [link](https://example.com) and some \`inline code\`.

### Feature Table

| Feature | Supported | Notes |
|---------|:---------:|------:|
| Tables | Yes | GFM pipe syntax |
| Images | Yes | Safe URLs only |
| Lists | Yes | Ordered + nested |

#### Ordered Steps

1. Write your Markdown
2. Check the preview
   - Nested bullets work too
   - So does more than one
3. Copy the HTML

\`\`\`js
const greeting = "Hello, World!";
console.log(greeting);
\`\`\`

> This is a blockquote with important info.

---

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
