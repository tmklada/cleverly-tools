import type { ToolConfig } from "@/types/tool";
const config: ToolConfig = {
  slug: "open-graph-preview",
  title: "Open Graph Preview Tool",
  description: "Preview how your website looks when shared on Facebook, LinkedIn, Twitter, WhatsApp, and Google Search before publishing. Enter your Open Graph tags manually, check them instantly, and see which platforms will truncate your title or description.",
  shortDescription: "Preview social media link cards for your site",
  category: "seo",
  keywords: ["open graph preview", "og preview tool", "social media preview", "facebook link preview", "twitter card preview", "whatsapp link preview", "og tags checker", "link preview tool", "social sharing preview", "og title length"],
  icon: "👁️",
  toolType: "seo",
  faq: [
    { question: "What are Open Graph tags?", answer: "Open Graph (OG) tags are HTML meta tags that control how your content appears when shared on social media. They define the title, description, image, and URL shown in link previews." },
    { question: "Why does my link preview look wrong?", answer: "Social networks cache Open Graph data. After updating your OG tags, use the platform's debugger tool to clear the cache and force a refresh of the link preview." },
    { question: "What is the ideal image size for Open Graph?", answer: "The recommended Open Graph image size is 1200×630 pixels with at least 200×200 minimum. Use JPG or PNG format with a file size under 8MB. Note that WhatsApp crops that wide image into a small square thumbnail, so keep the important part near the centre." },
    { question: "How long should my title and description be?", answer: "Each platform cuts text at a different point, so the tool shows a live length check against all five: Facebook (88 title / 200 description), LinkedIn (119 / 160), X-Twitter (70 / 200), WhatsApp (65 / 160), and Google (60 / 155). Anything over a limit is flagged before you publish." },
  ],
  howItWorks: [
    { step: 1, title: "Enter your Open Graph tags", description: "Manually type in your title, description, image URL, site name, and page URL — this tool does not fetch tags from a live page automatically." },
    { step: 2, title: "Preview across platforms", description: "See how your link card looks on Facebook, Twitter, LinkedIn, and WhatsApp." },
    { step: 3, title: "Fix and improve", description: "Check the length warnings for each platform, correct anything that would be truncated, then copy the generated meta tags." },
  ],
  relatedTools: ["meta-tag-generator", "schema-markup-generator", "robots-txt-generator"],
  schema: "WebApplication",
  adsPositions: ["top", "after-tool"],
};
export default config;
