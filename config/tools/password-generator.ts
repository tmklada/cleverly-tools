import type { ToolConfig } from "@/types/tool";
const config: ToolConfig = {
  slug: "password-generator",
  title: "Password Generator",
  description: "Generate strong, random, secure passwords instantly. Choose length, include symbols, numbers, uppercase and lowercase letters.",
  shortDescription: "Generate strong random passwords instantly",
  category: "developer",
  keywords: ["password generator", "random password generator", "strong password generator", "secure password", "create password online"],
  icon: "🔐",
  isNew: true,
  toolType: "developer",
  faq: [
    { question: "How secure are the generated passwords?", answer: "Passwords are generated using cryptographically secure randomness in your browser. We never store or transmit them." },
    { question: "What makes a strong password?", answer: "At least 12 characters, mixing uppercase, lowercase, numbers, and symbols. Avoid dictionary words." },
    { question: "Are my passwords saved?", answer: "No. Everything runs in your browser. We never see or store your passwords." },
  ],
  howItWorks: [
    { step: 1, title: "Set your options", description: "Choose length, character types (symbols, numbers, etc.)." },
    { step: 2, title: "Generate", description: "Click Generate to create a secure password instantly." },
    { step: 3, title: "Copy and use", description: "Click Copy and save it in your password manager." },
  ],
  relatedTools: ["json-formatter", "base64-encoder", "url-encoder"],
  schema: "WebApplication",
  adsPositions: ["top", "after-tool"],
};
export default config;
