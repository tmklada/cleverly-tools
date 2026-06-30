import type { ToolConfig } from "@/types/tool";
const config: ToolConfig = {
  slug: "password-strength-checker",
  title: "Password Strength Checker",
  description: "Check how strong and secure your password is instantly. Get a detailed analysis of your password's weaknesses and suggestions to make it stronger.",
  shortDescription: "Check your password strength — free & private",
  category: "developer",
  keywords: ["password strength checker", "password security checker", "strong password test", "password analyzer", "check password strength", "secure password checker", "password meter", "how strong is my password"],
  icon: "🔒",
  toolType: "developer",
  faq: [
    { question: "Is my password sent to your servers?", answer: "No, your password is analyzed entirely in your browser. It never leaves your device or gets sent anywhere." },
    { question: "What makes a strong password?", answer: "A strong password is at least 12 characters long and contains a mix of uppercase letters, lowercase letters, numbers, and symbols." },
    { question: "What is entropy and why does it matter?", answer: "Password entropy measures how unpredictable a password is. Higher entropy means a stronger password that is harder to crack by brute force." },
  ],
  howItWorks: [
    { step: 1, title: "Type your password", description: "Enter the password you want to check in the input field." },
    { step: 2, title: "See the strength score", description: "Instantly see a strength rating from very weak to very strong with a visual meter." },
    { step: 3, title: "Review suggestions", description: "Read specific tips to improve your password if it's not strong enough." },
  ],
  relatedTools: ["password-generator", "wifi-qr-code-generator", "hash-generator"],
  schema: "WebApplication",
  adsPositions: ["top", "after-tool"],
};
export default config;
