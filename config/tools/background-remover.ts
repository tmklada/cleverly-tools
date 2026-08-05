import type { ToolConfig } from "@/types/tool";
const config: ToolConfig = {
  slug: "background-remover",
  title: "Background Remover",
  description: "Remove image backgrounds instantly with AI — completely free, no sign-up, no upload. Everything runs in your browser for maximum privacy.",
  shortDescription: "Remove image background with AI — free, instant, private",
  category: "image",
  keywords: [
    "background remover free", "remove background from image", "remove image background online",
    "background eraser free", "transparent background maker", "ai background remover",
    "remove background no watermark", "free background removal tool",
  ],
  icon: "✂️",
  featured: true,
  isNew: true,
  trending: true,
  toolType: "image",
  faq: [
    {
      question: "Is this background remover really free?",
      answer: "Yes, completely free with no limits. The AI model runs in your browser — no server costs, no subscriptions.",
    },
    {
      question: "Is my image safe? Does it get uploaded?",
      answer: "Your images never leave your device. All processing happens locally in your browser using WebAssembly AI. Complete privacy.",
    },
    {
      question: "What image formats are supported?",
      answer: "JPG, PNG, and WebP images are supported. The output is always a PNG with transparent background.",
    },
    {
      question: "How accurate is the background removal?",
      answer: "Our AI model works great on photos with clear subjects (people, products, animals). Complex backgrounds may need minor touch-ups.",
    },
  ],
  howItWorks: [
    { step: 1, title: "Upload your image", description: "Click or drag-and-drop any JPG, PNG or WebP image." },
    { step: 2, title: "AI removes the background", description: "Our AI model processes the image entirely in your browser — no upload needed." },
    { step: 3, title: "Download transparent PNG", description: "Download your image with a transparent background, ready to use anywhere." },
  ],
  relatedTools: ["image-resizer", "image-converter", "image-compressor"],
  schema: "WebApplication",
  adsPositions: ["top", "after-tool"],
};
export default config;
