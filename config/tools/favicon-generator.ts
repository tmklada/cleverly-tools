import type { ToolConfig } from "@/types/tool";
const config: ToolConfig = {
  slug: "favicon-generator",
  title: "Favicon Generator",
  description: "Generate favicon files from any image online for free and download all required sizes instantly. Create .ico and PNG favicons for browsers, Apple devices, and Android in one click.",
  shortDescription: "Create favicons from any image in all required sizes",
  category: "image",
  keywords: ["favicon generator", "create favicon", "favicon from image", "ico generator", "website icon generator", "favicon maker", "favicon converter"],
  icon: "⭐",
  toolType: "image",
  isNew: true,
  faq: [
    { question: "What sizes does a favicon need to be?", answer: "Browsers use 16x16 and 32x32, Apple devices use 180x180, and Android uses 192x192 — this tool generates all of them at once." },
    { question: "What image format should I use as input?", answer: "PNG with a transparent background works best for crisp results, though JPG and WebP are also supported." },
    { question: "How do I add the favicon to my website?", answer: "Place the generated files in your root directory and add the provided HTML link tags to your page head." },
  ],
  howItWorks: [
    { step: 1, title: "Upload your image", description: "Upload a square image (PNG recommended) to use as your favicon." },
    { step: 2, title: "Generate all sizes", description: "The tool creates all required favicon sizes automatically." },
    { step: 3, title: "Download the package", description: "Download a zip with all favicon files and the HTML code to add them." },
  ],
  relatedTools: ["image-converter", "image-resizer", "svg-to-png"],
  schema: "WebApplication",
  adsPositions: ["top", "after-tool"],
};
export default config;
