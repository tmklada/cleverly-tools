import type { ToolConfig } from "@/types/tool";
const config: ToolConfig = {
  slug: "base64-encoder",
  title: "Base64 Encoder / Decoder",
  description: "Encode text or files to Base64 and decode Base64 strings back to plain text. Fast, free, works entirely in your browser.",
  shortDescription: "Encode & decode Base64 strings instantly",
  category: "developer",
  keywords: ["base64 encoder", "base64 decoder", "encode base64", "decode base64 online", "base64 converter", "base64 string"],
  icon: "🔡",
  toolType: "developer",
  faq: [
    { question: "What is Base64?", answer: "Base64 is an encoding scheme that converts binary data into ASCII text, commonly used in emails and data URLs." },
    { question: "Is Base64 encryption?", answer: "No. Base64 is encoding, not encryption. Anyone can decode a Base64 string." },
  ],
  howItWorks: [
    { step: 1, title: "Enter text", description: "Paste the text you want to encode or the Base64 string you want to decode." },
    { step: 2, title: "Encode or Decode", description: "Click the appropriate button." },
    { step: 3, title: "Copy the result", description: "Copy the output for use in your project." },
  ],
  relatedTools: ["url-encoder", "json-formatter", "password-generator"],
  schema: "WebApplication",
  adsPositions: ["top", "after-tool"],
};
export default config;
