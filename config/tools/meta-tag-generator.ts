import type { ToolConfig } from "@/types/tool";
const config: ToolConfig = {
  slug: "meta-tag-generator",
  title: "Meta Tag Generator",
  description: "Generate complete HTML meta tags for SEO, Open Graph, and Twitter Cards in seconds. Improve your search rankings and social media previews with properly formatted meta tags.",
  shortDescription: "Generate SEO meta tags instantly — free tool",
  category: "seo",
  keywords: ["meta tag generator", "seo meta tags", "html meta tags", "open graph tags", "twitter card generator", "meta description generator", "title tag generator", "seo tags"],
  icon: "🏷️",
  featured: true,
  toolType: "seo",
  faq: [
    { question: "What are meta tags and why do they matter?", answer: "Meta tags are HTML snippets in your page's head section that tell search engines and social media platforms about your content. They directly impact your click-through rates from search results." },
    { question: "What is the ideal length for a meta description?", answer: "Keep meta descriptions between 150-160 characters. Longer descriptions get cut off in search results, while shorter ones waste space. Google may rewrite them if they're not relevant enough." },
    { question: "What are Open Graph tags?", answer: "Open Graph tags control how your page looks when shared on Facebook, LinkedIn, and other social media. They define the title, description, and image shown in social media previews." },
  ],
  howItWorks: [
    { step: 1, title: "Fill in your page details", description: "Enter your page title, description, URL, and upload or link your social sharing image." },
    { step: 2, title: "Customize your tags", description: "Choose which tag types to generate: SEO meta, Open Graph, Twitter Cards, or all three." },
    { step: 3, title: "Copy and paste into your HTML", description: "Copy the generated meta tags and paste them into your page's HTML head section." },
  ],
  relatedTools: ["open-graph-preview", "schema-markup-generator", "robots-txt-generator"],
  schema: "WebApplication",
  adsPositions: ["top", "after-tool"],
};
export default config;
