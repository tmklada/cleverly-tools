import type { ToolConfig } from "@/types/tool";
const config: ToolConfig = {
  slug: "url-encoder",
  title: "URL Encoder / Decoder",
  description: "Encode special characters in URLs and decode encoded URL strings. Essential for web developers working with query parameters and APIs.",
  shortDescription: "Encode & decode URL strings for web development",
  category: "developer",
  keywords: ["url encoder", "url decoder", "encode url online", "decode url", "url encoding tool", "percent encoding"],
  icon: "🔗",
  toolType: "developer",
  faq: [
    { question: "Why do URLs need encoding?", answer: "URLs can only contain certain characters. Special characters like spaces, &, = must be percent-encoded (e.g. space becomes %20)." },
    { question: "What is the difference between encodeURI and encodeURIComponent?", answer: "encodeURI encodes a full URL, encodeURIComponent encodes a query parameter value. Our tool uses encodeURIComponent by default." },
  ],
  howItWorks: [
    { step: 1, title: "Paste your text or URL", description: "Enter the string you want to encode or decode." },
    { step: 2, title: "Encode or Decode", description: "Click the button to transform it." },
    { step: 3, title: "Copy the result", description: "Use the output in your code or browser." },
  ],
  relatedTools: ["base64-encoder", "json-formatter", "password-generator"],
  schema: "WebApplication",
  adsPositions: ["top", "after-tool"],
};
export default config;
