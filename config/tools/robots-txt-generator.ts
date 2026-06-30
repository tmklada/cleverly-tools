import type { ToolConfig } from "@/types/tool";
const config: ToolConfig = {
  slug: "robots-txt-generator",
  title: "Robots.txt Generator",
  description: "Generate a valid robots.txt file for your website to control which pages search engines can crawl and index. Protect private pages and optimize your crawl budget.",
  shortDescription: "Create a robots.txt file for your website — free",
  category: "seo",
  keywords: ["robots txt generator", "robots.txt creator", "crawl rules", "disallow url", "search engine crawling", "seo robots file", "sitemap robots txt", "noindex nofollow"],
  icon: "🤖",
  toolType: "seo",
  faq: [
    { question: "What is a robots.txt file?", answer: "Robots.txt is a text file placed at your website's root that instructs search engine bots which pages they can and cannot crawl. It helps protect private areas and prioritize important content." },
    { question: "Does robots.txt guarantee pages won't be indexed?", answer: "No. Robots.txt only prevents crawling — not indexing. Search engines may still index URLs they discover from other links. Use noindex meta tags to prevent indexing completely." },
    { question: "Should I block my admin or login pages?", answer: "Yes, disallowing /admin, /login, /wp-admin, and similar private areas prevents bots from attempting to crawl them and wastes your crawl budget on unimportant pages." },
  ],
  howItWorks: [
    { step: 1, title: "Choose your crawler rules", description: "Select which bots to configure and which URL paths to allow or disallow." },
    { step: 2, title: "Add your sitemap URL", description: "Optionally add your sitemap URL to help search engines discover your pages." },
    { step: 3, title: "Copy and upload", description: "Copy the generated robots.txt content and upload it to your website's root directory." },
  ],
  relatedTools: ["meta-tag-generator", "schema-markup-generator", "keyword-density-checker"],
  schema: "WebApplication",
  adsPositions: ["top", "after-tool"],
};
export default config;
