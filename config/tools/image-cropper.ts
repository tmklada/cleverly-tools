import type { ToolConfig } from "@/types/tool";
const config: ToolConfig = {
  slug: "image-cropper",
  title: "Image Cropper Online",
  description: "Crop images online for free with a simple drag-and-drop interface and no sign-up required. Set custom dimensions or use preset aspect ratios for social media, profiles, and more.",
  shortDescription: "Crop images online with drag-and-drop ease",
  category: "image",
  keywords: ["image cropper", "crop image online", "crop photo", "image crop tool", "crop picture online", "free image cropper", "photo cropper"],
  icon: "✂️",
  toolType: "image",
  featured: true,
  faq: [
    { question: "Can I crop to a specific aspect ratio?", answer: "Yes, choose from presets like 1:1, 4:3, 16:9, or enter custom width and height values." },
    { question: "What image formats are supported?", answer: "JPG, PNG, WebP, and GIF images are all supported for cropping." },
    { question: "Is my image uploaded to a server?", answer: "No — all cropping is done directly in your browser, so your images stay private." },
  ],
  howItWorks: [
    { step: 1, title: "Upload your image", description: "Drag and drop your image or click to select it from your device." },
    { step: 2, title: "Select the crop area", description: "Drag the crop handles to select exactly the area you want to keep." },
    { step: 3, title: "Download the result", description: "Click Crop and download your cropped image instantly." },
  ],
  relatedTools: ["image-resizer", "image-compressor", "image-flipper"],
  schema: "WebApplication",
  adsPositions: ["top", "after-tool"],
};
export default config;
