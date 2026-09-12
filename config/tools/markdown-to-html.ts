import type { ToolConfig } from "@/types/tool";
const config: ToolConfig = {
  slug: "markdown-to-html",
  title: "Markdown to HTML",
  description: "Convert Markdown text to clean, ready-to-use HTML code instantly in your browser. Supports headings H1-H6, bold, italic, strikethrough, links, images, ordered and unordered lists, tables, blockquotes, horizontal rules, and code blocks — with a live preview.",
  shortDescription: "Convert Markdown to HTML instantly",
  category: "text",
  keywords: ["markdown to html", "convert markdown", "markdown converter", "md to html", "markdown editor online", "markdown html preview", "markdown parser online", "markdown table to html"],
  icon: "⬇️",
  toolType: "text",
  faq: [
    { question: "What Markdown features are supported?", answer: "The converter supports headings H1 through H6, bold, italic, strikethrough, links, images, inline code, fenced code blocks, blockquotes, horizontal rules, ordered and unordered lists (including nested lists), and GitHub-style pipe tables with column alignment." },
    { question: "Does it convert Markdown tables?", answer: "Yes. Standard GitHub Flavored Markdown pipe tables are converted to real HTML tables, and the alignment row (for example |:---|:---:|---:|) is applied as left, center, or right text alignment on each column." },
    { question: "Are images and links safe to convert?", answer: "Yes. All text is HTML-escaped so raw tags in your Markdown can never execute, and link and image URLs are checked: http, https, mailto, relative paths, and data:image URLs are allowed, while unsafe schemes like javascript: are left as plain text instead of becoming a link." },
    { question: "Can I see a live preview of the HTML output?", answer: "Yes. As you type or paste Markdown, the rendered HTML preview updates in real time on the right side of the screen." },
    { question: "Can I copy just the raw HTML code?", answer: "Yes. Click the Copy HTML button to get the raw HTML source code ready to paste into your website or CMS." },
  ],
  howItWorks: [
    { step: 1, title: "Enter your Markdown", description: "Type or paste your Markdown text into the editor on the left." },
    { step: 2, title: "See the HTML preview", description: "The converted HTML is displayed and rendered live as you type." },
    { step: 3, title: "Copy the HTML code", description: "Click Copy HTML to grab the raw HTML output and use it anywhere." },
  ],
  relatedTools: ["word-counter", "text-case-converter", "json-formatter"],
  schema: "WebApplication",
  adsPositions: ["top", "after-tool"],
};
export default config;
