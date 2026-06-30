import type { ToolConfig } from "@/types/tool";
const config: ToolConfig = {
  slug: "keyword-density-checker",
  title: "Keyword Density Checker",
  description: "Analyze your content's keyword density to ensure optimal SEO performance. Find how often keywords appear in your text and avoid over-optimization penalties.",
  shortDescription: "Check keyword density in your content — free",
  category: "seo",
  keywords: ["keyword density checker", "keyword frequency tool", "seo content analyzer", "keyword analysis", "content seo checker", "keyword percentage", "keyword stuffing checker", "on-page seo tool"],
  icon: "🔍",
  toolType: "seo",
  faq: [
    { question: "What is keyword density?", answer: "Keyword density is the percentage of times a keyword appears in your content relative to the total word count. It is calculated as (keyword count / total words) × 100." },
    { question: "What is the ideal keyword density for SEO?", answer: "There is no perfect number, but 1-2% is generally considered healthy. Anything above 3-4% can be seen as keyword stuffing and may result in ranking penalties." },
    { question: "Does keyword density still matter for SEO?", answer: "Modern SEO focuses more on topical relevance and natural language than exact keyword density. However, mentioning your target keywords naturally and at reasonable frequency still helps signal relevance." },
  ],
  howItWorks: [
    { step: 1, title: "Paste your content", description: "Copy and paste your article, blog post, or page content into the text area." },
    { step: 2, title: "Analyze keyword frequency", description: "The tool counts all words and calculates how often each keyword and phrase appears." },
    { step: 3, title: "Review and optimize", description: "See density percentages for each term and adjust your content to optimal levels." },
  ],
  relatedTools: ["meta-tag-generator", "robots-txt-generator", "schema-markup-generator"],
  schema: "WebApplication",
  adsPositions: ["top", "after-tool"],
};
export default config;
