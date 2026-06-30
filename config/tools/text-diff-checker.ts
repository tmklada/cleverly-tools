import type { ToolConfig } from "@/types/tool";
const config: ToolConfig = {
  slug: "text-diff-checker",
  title: "Text Diff Checker",
  description: "Compare two texts side by side and instantly highlight all differences online for free. Find added, removed, and changed lines with a clear visual diff output.",
  shortDescription: "Compare two texts and highlight differences",
  category: "text",
  keywords: ["text diff", "compare text online", "diff checker", "text comparison tool", "find differences in text", "line diff", "text difference finder"],
  icon: "📝",
  toolType: "text",
  isNew: true,
  faq: [
    { question: "What is a text diff checker?", answer: "It compares two blocks of text and highlights what has been added, removed, or changed between them." },
    { question: "Can I compare code with this tool?", answer: "Yes, it works with any text including source code, documents, emails, and configuration files." },
    { question: "Is comparison case-sensitive?", answer: "By default yes, but you can toggle case-insensitive mode to ignore capitalization differences." },
  ],
  howItWorks: [
    { step: 1, title: "Paste original text", description: "Enter or paste the original version of your text in the left panel." },
    { step: 2, title: "Paste new text", description: "Enter or paste the updated version of your text in the right panel." },
    { step: 3, title: "View differences", description: "Additions are highlighted in green and deletions in red for easy comparison." },
  ],
  relatedTools: ["string-reverse", "html-to-text", "lorem-ipsum-generator"],
  schema: "WebApplication",
  adsPositions: ["top", "after-tool"],
};
export default config;
