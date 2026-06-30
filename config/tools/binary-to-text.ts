import type { ToolConfig } from "@/types/tool";
const config: ToolConfig = {
  slug: "binary-to-text",
  title: "Binary to Text Converter",
  description: "Convert binary code to readable text and text to binary online for free. Instantly decode 0s and 1s into plain English or encode any text into binary format.",
  shortDescription: "Convert binary to text and text to binary",
  category: "developer",
  keywords: ["binary to text", "text to binary", "binary decoder", "binary encoder", "convert binary", "binary translator", "0 and 1 to text"],
  icon: "01",
  toolType: "developer",
  faq: [
    { question: "What is binary code?", answer: "Binary is a base-2 number system using only 0s and 1s that computers use to represent data — each group of 8 bits forms one character." },
    { question: "How do I convert binary to text?", answer: "Paste your binary string (separated by spaces) into the input and click Convert — the tool decodes each 8-bit group into its ASCII character." },
    { question: "Can I convert text to binary as well?", answer: "Yes, the tool works both ways — enter plain text to get its binary representation." },
  ],
  howItWorks: [
    { step: 1, title: "Enter binary or text", description: "Paste binary code (e.g. 01001000) or plain text into the input field." },
    { step: 2, title: "Choose direction", description: "Select whether you want to decode binary to text or encode text to binary." },
    { step: 3, title: "Get your result", description: "The converted output appears instantly for you to copy." },
  ],
  relatedTools: ["base64-encoder", "hash-generator", "json-formatter"],
  schema: "WebApplication",
  adsPositions: ["top", "after-tool"],
};
export default config;
