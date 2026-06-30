import type { ToolConfig } from "@/types/tool";
const config: ToolConfig = {
  slug: "text-case-converter",
  title: "Text Case Converter",
  description: "Convert text to UPPERCASE, lowercase, Title Case, camelCase, snake_case, and more with one click. Free online text transformer.",
  shortDescription: "Convert text to any case — uppercase, title, camel, snake",
  category: "text",
  keywords: ["text case converter", "uppercase converter", "lowercase converter", "title case converter", "camelcase converter", "snake case converter"],
  icon: "🔤",
  toolType: "text",
  faq: [
    { question: "What is Title Case?", answer: "Title Case capitalizes the first letter of each word. Example: 'hello world' → 'Hello World'." },
    { question: "What is camelCase?", answer: "camelCase removes spaces and capitalizes each word except the first. Used in programming. Example: 'my variable' → 'myVariable'." },
    { question: "What is snake_case?", answer: "snake_case replaces spaces with underscores in lowercase. Example: 'my variable' → 'my_variable'." },
  ],
  howItWorks: [
    { step: 1, title: "Enter your text", description: "Paste or type the text you want to convert." },
    { step: 2, title: "Choose a case format", description: "Click any conversion button." },
    { step: 3, title: "Copy the result", description: "Click Copy to grab the converted text." },
  ],
  relatedTools: ["word-counter", "lorem-ipsum-generator"],
  schema: "WebApplication",
  adsPositions: ["top", "after-tool"],
};
export default config;
