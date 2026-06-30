import type { ToolConfig } from "@/types/tool";
const config: ToolConfig = {
  slug: "json-formatter",
  title: "JSON Formatter & Validator",
  description: "Format, beautify and validate JSON online for free. Minify JSON, fix errors, and make it human-readable instantly.",
  shortDescription: "Format, validate & minify JSON instantly",
  category: "developer",
  keywords: ["json formatter", "json validator", "json beautifier", "format json online", "json minifier", "json parser"],
  icon: "{ }",
  featured: true,
  toolType: "developer",
  faq: [
    { question: "What does JSON formatter do?", answer: "It takes minified or unformatted JSON and adds proper indentation to make it human-readable." },
    { question: "What is JSON validation?", answer: "Validation checks that your JSON has correct syntax — no missing commas, brackets, or quotes." },
  ],
  howItWorks: [
    { step: 1, title: "Paste your JSON", description: "Copy any JSON data and paste it in the input box." },
    { step: 2, title: "Format or minify", description: "Click Format to beautify or Minify to compress." },
    { step: 3, title: "Copy the result", description: "Use the Copy button to grab the output." },
  ],
  relatedTools: ["base64-encoder", "url-encoder", "password-generator"],
  schema: "WebApplication",
  adsPositions: ["top", "after-tool"],
};
export default config;
