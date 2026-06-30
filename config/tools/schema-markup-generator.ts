import type { ToolConfig } from "@/types/tool";
const config: ToolConfig = {
  slug: "schema-markup-generator",
  title: "Schema Markup Generator",
  description: "Generate structured data schema markup in JSON-LD format for your website. Help search engines understand your content and earn rich snippets in search results.",
  shortDescription: "Generate JSON-LD schema markup — free SEO tool",
  category: "seo",
  keywords: ["schema markup generator", "structured data generator", "json-ld generator", "rich snippets generator", "schema.org markup", "seo structured data", "google rich results", "schema code generator"],
  icon: "📋",
  toolType: "seo",
  faq: [
    { question: "What is schema markup?", answer: "Schema markup is structured data code added to your webpage's HTML that helps search engines better understand your content. It can enable rich results like star ratings, FAQs, and event details in search results." },
    { question: "What schema types are supported?", answer: "The generator supports common schema types including Article, Product, LocalBusiness, FAQ, Event, Recipe, Person, Organization, and BreadcrumbList." },
    { question: "How do I add schema markup to my website?", answer: "Copy the generated JSON-LD code and paste it inside a <script type='application/ld+json'> tag in your page's HTML head or body section." },
  ],
  howItWorks: [
    { step: 1, title: "Select a schema type", description: "Choose the schema type that matches your content, such as Article, Product, or LocalBusiness." },
    { step: 2, title: "Fill in your details", description: "Enter the relevant information for your chosen schema type." },
    { step: 3, title: "Copy the JSON-LD code", description: "Copy the generated structured data and add it to your webpage." },
  ],
  relatedTools: ["meta-tag-generator", "robots-txt-generator", "open-graph-preview"],
  schema: "WebApplication",
  adsPositions: ["top", "after-tool"],
};
export default config;
