import type { ToolConfig } from "@/types/tool";
const config: ToolConfig = {
  slug: "markdown-to-html",
  title: "Markdown to HTML",
  description: "Convert Markdown text to clean, ready-to-use HTML code instantly in your browser. Supports headings, bold, italic, links, lists, code blocks, and tables — with a live preview.",
  shortDescription: "Convert Markdown to HTML instantly",
  category: "text",
  keywords: ["markdown to html", "convert markdown", "markdown converter", "md to html", "markdown editor online", "markdown html preview", "markdown parser online"],
  icon: "⬇️",
  toolType: "text",
  faq: [
    { question: "What Markdown features are supported?", answer: "The converter supports standard Markdown: headings (H1-H6), bold, italic, links, images, ordered and unordered lists, blockquotes, code blocks, inline code, and tables." },
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
