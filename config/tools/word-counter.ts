import type { ToolConfig } from "@/types/tool";
const config: ToolConfig = {
  slug: "word-counter",
  title: "Word Counter",
  description: "Count words, characters, sentences, and paragraphs instantly. Ideal for essays, articles, blog posts, and social media character limits.",
  shortDescription: "Count words, characters & sentences in real-time",
  category: "text",
  keywords: ["word counter", "character counter", "word count tool", "count words online", "word counter free", "sentence counter"],
  icon: "📝",
  featured: true,
  toolType: "text",
  faq: [
    { question: "Does the word counter count spaces?", answer: "The character count includes spaces by default. We also show character count without spaces separately." },
    { question: "What's the Twitter/X character limit?", answer: "280 characters. Our tool shows a live count so you know when you're within the limit." },
    { question: "What are the limits for other platforms?", answer: "Instagram captions: 2,200. Facebook posts: 63,206. LinkedIn posts: 3,000. TikTok: 2,200." },
  ],
  howItWorks: [
    { step: 1, title: "Paste or type your text", description: "Enter any text in the box below." },
    { step: 2, title: "See live stats", description: "Words, characters, sentences and paragraphs update as you type." },
  ],
  relatedTools: ["text-case-converter", "lorem-ipsum-generator"],
  schema: "WebApplication",
  adsPositions: ["top", "after-tool"],
};
export default config;
