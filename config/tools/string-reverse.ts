import type { ToolConfig } from "@/types/tool";
const config: ToolConfig = {
  slug: "string-reverse",
  title: "String Reverse Tool",
  description: "Reverse any string, word, or sentence instantly online for free. Flip text backwards character by character or reverse the order of words in a sentence.",
  shortDescription: "Reverse any text or string instantly",
  category: "text",
  keywords: ["string reverse", "reverse text", "flip text", "reverse words", "backwards text", "text reverser online", "reverse string tool"],
  icon: "🔄",
  toolType: "text",
  faq: [
    { question: "What does the String Reverse tool do?", answer: "It flips your text backwards — reversing the order of all characters so the last character becomes the first." },
    { question: "Can I reverse word order instead of characters?", answer: "Yes, the tool offers both options: reverse all characters or reverse the order of words while keeping each word intact." },
    { question: "Is there a limit to text length?", answer: "No practical limit — you can reverse paragraphs, code snippets, or any amount of text." },
  ],
  howItWorks: [
    { step: 1, title: "Enter your text", description: "Type or paste the string or sentence you want to reverse." },
    { step: 2, title: "Choose reverse mode", description: "Select character reverse or word-order reverse." },
    { step: 3, title: "Copy the result", description: "The reversed text appears instantly — copy it with one click." },
  ],
  relatedTools: ["text-repeater", "text-diff-checker", "lorem-ipsum-generator"],
  schema: "WebApplication",
  adsPositions: ["top", "after-tool"],
};
export default config;
