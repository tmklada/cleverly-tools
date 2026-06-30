import type { ToolConfig } from "@/types/tool";
const config: ToolConfig = {
  slug: "qr-code-generator",
  title: "QR Code Generator",
  description: "Generate QR codes instantly for any URL, text, or contact information. Customize colors, size, and download your QR code as a high-quality PNG or SVG.",
  shortDescription: "Create custom QR codes instantly — free tool",
  category: "qr",
  keywords: ["qr code generator", "create qr code", "free qr code", "qr code maker", "qr code download", "custom qr code", "qr code online", "generate qr"],
  icon: "📱",
  featured: true,
  trending: true,
  toolType: "qr",
  faq: [
    { question: "What can I encode in a QR code?", answer: "You can encode URLs, plain text, email addresses, phone numbers, SMS messages, and more. The most common use is linking to a website." },
    { question: "Are QR codes free to use?", answer: "Yes, QR codes generated here are completely free. They never expire and you can use them for personal or commercial purposes." },
    { question: "What format should I download my QR code in?", answer: "SVG is best for printing as it scales without losing quality. PNG is ideal for digital use on websites or presentations." },
  ],
  howItWorks: [
    { step: 1, title: "Enter your content", description: "Type or paste the URL, text, or information you want to encode." },
    { step: 2, title: "Customize your QR code", description: "Choose colors and size to match your brand or preferences." },
    { step: 3, title: "Download your QR code", description: "Download the QR code as PNG or SVG and use it anywhere." },
  ],
  relatedTools: ["wifi-qr-code-generator", "url-encoder", "text-to-slug"],
  schema: "WebApplication",
  adsPositions: ["top", "after-tool"],
};
export default config;
