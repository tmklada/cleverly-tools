import type { ToolConfig } from "@/types/tool";
const config: ToolConfig = {
  slug: "css-minifier",
  title: "CSS Minifier",
  description: "Minify and compress your CSS code online for free to reduce file size and improve page load speed. Remove whitespace, comments, and unnecessary characters instantly.",
  shortDescription: "Compress and minify CSS code instantly",
  category: "developer",
  keywords: ["css minifier", "compress css", "css compressor", "minify css online", "css optimizer", "reduce css size", "css beautifier"],
  icon: "🗜️",
  toolType: "developer",
  faq: [
    { question: "What does CSS minification do?", answer: "It removes all unnecessary whitespace, comments, and redundant characters from your CSS to make the file smaller without changing how it works." },
    { question: "How much can CSS minification reduce file size?", answer: "Typically 20–60% reduction depending on how much whitespace and comments your original CSS contains." },
    { question: "Is minified CSS still valid?", answer: "Yes, minified CSS is fully valid and functional — browsers read it exactly the same as formatted CSS." },
  ],
  howItWorks: [
    { step: 1, title: "Paste your CSS", description: "Copy your CSS code and paste it into the input box." },
    { step: 2, title: "Click Minify", description: "Press the Minify button to compress your CSS instantly." },
    { step: 3, title: "Copy the result", description: "Copy the minified output and use it in your project." },
  ],
  relatedTools: ["json-formatter", "base64-encoder", "hash-generator"],
  schema: "WebApplication",
  adsPositions: ["top", "after-tool"],
};
export default config;
