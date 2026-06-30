import type { ToolConfig } from "@/types/tool";
const config: ToolConfig = {
  slug: "image-compressor",
  title: "Image Compressor",
  description: "Compress JPG, PNG, and WebP images online without losing visible quality. Reduce file size up to 80% for faster websites, smaller uploads, and lower storage costs — completely free.",
  shortDescription: "Compress images without losing quality",
  category: "image",
  keywords: ["image compressor", "compress image online", "reduce image size", "compress jpg", "compress png", "image size reducer", "photo compressor free"],
  icon: "📦",
  toolType: "image",
  faq: [
    { question: "How much can I compress an image?", answer: "Compression depends on the image content. Most images can be reduced by 40–80% in file size with minimal visible quality loss." },
    { question: "Will compressed images look different?", answer: "Our tool uses smart lossy and lossless compression to keep images looking sharp. The difference is usually invisible to the human eye." },
    { question: "Can I compress multiple images at once?", answer: "Yes. You can upload and compress multiple images at once and download them all as a ZIP file." },
  ],
  howItWorks: [
    { step: 1, title: "Upload your images", description: "Select one or more JPG, PNG, or WebP images to compress." },
    { step: 2, title: "Adjust quality level", description: "Use the quality slider to balance file size reduction and image sharpness." },
    { step: 3, title: "Download compressed images", description: "Click Compress and save your optimized images instantly." },
  ],
  relatedTools: ["image-resizer", "image-converter", "image-to-base64"],
  schema: "WebApplication",
  adsPositions: ["top", "after-tool"],
};
export default config;
