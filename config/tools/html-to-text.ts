import type { ToolConfig } from "@/types/tool";
const config: ToolConfig = {
  slug: "html-to-text",
  title: "HTML to Plain Text",
  description: "Strip HTML tags and convert HTML code to plain readable text online for free. Remove all markup and extract clean text content from any HTML document instantly.",
  shortDescription: "Strip HTML tags and extract plain text",
  category: "text",
  keywords: ["html to text", "strip html tags", "html stripper", "remove html tags", "html to plain text", "html tag remover", "extract text from html"],
  icon: "📄",
  toolType: "text",
  faq: [
    { question: "What does HTML to Plain Text do?", answer: "It removes all HTML tags and markup from your code and returns only the visible text content." },
    { question: "Does it preserve line breaks and paragraphs?", answer: "Yes, block-level elements like paragraphs and headings are converted to line breaks so the text structure is preserved." },
    { question: "Can I use it to clean copied web content?", answer: "Absolutely — it is perfect for stripping formatting from content copied from websites before pasting into documents." },
  ],
  howItWorks: [
    { step: 1, title: "Paste your HTML", description: "Copy any HTML code or content and paste it into the input box." },
    { step: 2, title: "Strip the tags", description: "Click Convert and all HTML markup is removed instantly." },
    { step: 3, title: "Copy clean text", description: "Copy the clean plain text output for use anywhere." },
  ],
  relatedTools: ["markdown-to-html", "text-diff-checker", "string-reverse"],
  schema: "WebApplication",
  adsPositions: ["top", "after-tool"],
};
export default config;
