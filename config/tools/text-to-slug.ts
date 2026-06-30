import type { ToolConfig } from "@/types/tool";
const config: ToolConfig = {
  slug: "text-to-slug",
  title: "Text to Slug",
  description: "Convert any title or text into a clean, URL-friendly slug instantly. Automatically removes special characters, replaces spaces with hyphens, and converts to lowercase — perfect for SEO-friendly URLs.",
  shortDescription: "Convert text to URL-friendly slugs",
  category: "text",
  keywords: ["text to slug", "slug generator", "url slug converter", "seo slug", "generate url slug", "title to url", "slug maker online"],
  icon: "🔗",
  isNew: true,
  toolType: "text",
  faq: [
    { question: "What is a URL slug?", answer: "A URL slug is the part of a web address that identifies a specific page, written in lowercase with words separated by hyphens. For example: 'my-blog-post-title'." },
    { question: "Why are slugs important for SEO?", answer: "Clean, descriptive slugs help search engines understand your page content and improve rankings. They also make URLs more readable for users." },
    { question: "Does the tool handle special characters and accents?", answer: "Yes. The tool automatically removes or replaces special characters, accented letters, and symbols to produce a clean ASCII slug." },
  ],
  howItWorks: [
    { step: 1, title: "Type or paste your text", description: "Enter the title or phrase you want to convert into a URL slug." },
    { step: 2, title: "Slug is generated instantly", description: "The slug is created in real time as you type — lowercase, hyphenated, and clean." },
    { step: 3, title: "Copy the slug", description: "Click Copy and paste the slug into your CMS, website, or code." },
  ],
  relatedTools: ["word-counter", "text-case-converter", "url-encoder"],
  schema: "WebApplication",
  adsPositions: ["top", "after-tool"],
};
export default config;
