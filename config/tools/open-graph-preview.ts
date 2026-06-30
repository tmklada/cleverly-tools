import type { ToolConfig } from "@/types/tool";
const config: ToolConfig = {
  slug: "open-graph-preview",
  title: "Open Graph Preview Tool",
  description: "Preview how your website looks when shared on Facebook, Twitter, LinkedIn, and WhatsApp before publishing. Check your Open Graph tags and fix issues instantly.",
  shortDescription: "Preview social media link cards for your site",
  category: "seo",
  keywords: ["open graph preview", "og preview tool", "social media preview", "facebook link preview", "twitter card preview", "og tags checker", "link preview tool", "social sharing preview"],
  icon: "👁️",
  toolType: "seo",
  faq: [
    { question: "What are Open Graph tags?", answer: "Open Graph (OG) tags are HTML meta tags that control how your content appears when shared on social media. They define the title, description, image, and URL shown in link previews." },
    { question: "Why does my link preview look wrong?", answer: "Social networks cache Open Graph data. After updating your OG tags, use the platform's debugger tool to clear the cache and force a refresh of the link preview." },
    { question: "What is the ideal image size for Open Graph?", answer: "The recommended Open Graph image size is 1200×630 pixels with at least 200×200 minimum. Use JPG or PNG format with a file size under 8MB." },
  ],
  howItWorks: [
    { step: 1, title: "Enter your page URL or tags", description: "Paste your URL or manually enter your Open Graph title, description, and image URL." },
    { step: 2, title: "Preview across platforms", description: "See how your link card looks on Facebook, Twitter, LinkedIn, and WhatsApp." },
    { step: 3, title: "Fix and improve", description: "Identify issues with your OG tags and make corrections before sharing." },
  ],
  relatedTools: ["meta-tag-generator", "schema-markup-generator", "robots-txt-generator"],
  schema: "WebApplication",
  adsPositions: ["top", "after-tool"],
};
export default config;
