import type { ToolConfig } from "@/types/tool";
const config: ToolConfig = {
  slug: "image-resizer",
  title: "Image Resizer",
  description: "Resize any image to exact pixel dimensions or by percentage online — instantly and for free. Supports JPG, PNG, WebP, and GIF without needing to install any software.",
  shortDescription: "Resize images to any dimension online free",
  category: "image",
  keywords: ["image resizer", "resize image online", "resize photo", "image size reducer", "change image dimensions", "resize jpg", "resize png free"],
  icon: "📐",
  featured: true,
  toolType: "image",
  faq: [
    { question: "What image formats does the resizer support?", answer: "The image resizer supports JPG, JPEG, PNG, WebP, and GIF formats. You can resize any of these file types directly in your browser." },
    { question: "Can I maintain the aspect ratio when resizing?", answer: "Yes. You can lock the aspect ratio so the image scales proportionally, or enter custom width and height values independently." },
    { question: "Will the image quality change after resizing?", answer: "Reducing image dimensions typically results in a smaller, sharp image. Increasing dimensions beyond the original may cause some softness." },
  ],
  howItWorks: [
    { step: 1, title: "Upload your image", description: "Click or drag and drop the image file you want to resize." },
    { step: 2, title: "Set dimensions", description: "Enter the desired width and height in pixels, or choose a percentage scale." },
    { step: 3, title: "Download resized image", description: "Click Resize and download your new image immediately." },
  ],
  relatedTools: ["image-compressor", "image-converter", "image-to-base64"],
  schema: "WebApplication",
  adsPositions: ["top", "after-tool"],
};
export default config;
