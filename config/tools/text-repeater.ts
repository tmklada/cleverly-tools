import type { ToolConfig } from "@/types/tool";
const config: ToolConfig = {
  slug: "text-repeater",
  title: "Text Repeater",
  description: "Repeat any text, word, or character a specified number of times online for free. Useful for generating test data, patterns, filler content, or repeated strings quickly.",
  shortDescription: "Repeat any text or character N times instantly",
  category: "text",
  keywords: ["text repeater", "repeat text online", "duplicate text", "repeat string", "text generator", "character repeater", "word repeater tool"],
  icon: "🔁",
  toolType: "text",
  faq: [
    { question: "What can I use Text Repeater for?", answer: "It is useful for generating test data, creating patterns, filling placeholder content, or quickly building repeated strings." },
    { question: "Can I set a separator between repetitions?", answer: "Yes, you can choose any separator — newline, space, comma, or a custom character between each repetition." },
    { question: "Is there a limit to how many times I can repeat?", answer: "You can repeat text up to 10,000 times — suitable for most testing and content generation needs." },
  ],
  howItWorks: [
    { step: 1, title: "Enter your text", description: "Type or paste the text, word, or character you want to repeat." },
    { step: 2, title: "Set repeat count", description: "Enter how many times you want the text repeated." },
    { step: 3, title: "Copy the result", description: "The repeated text appears instantly — copy it with one click." },
  ],
  relatedTools: ["lorem-ipsum-generator", "string-reverse", "text-diff-checker"],
  schema: "WebApplication",
  adsPositions: ["top", "after-tool"],
};
export default config;
