import type { ToolConfig } from "@/types/tool";
const config: ToolConfig = {
  slug: "image-color-picker",
  title: "Image Color Picker",
  description: "Pick any color from an uploaded image and get its HEX, RGB, and HSL values instantly online for free. Identify exact colors from photos, designs, or screenshots with a single click.",
  shortDescription: "Pick colors from any image and get HEX, RGB, HSL values",
  category: "image",
  keywords: ["image color picker", "pick color from image", "color eyedropper online", "get hex from image", "color finder", "eyedropper tool", "color extractor from image"],
  icon: "🎨",
  toolType: "image",
  faq: [
    { question: "How do I pick a color from my image?", answer: "Upload your image, then click any pixel on it — the tool instantly reads that exact pixel and shows its color values." },
    { question: "What color formats does it show?", answer: "HEX, RGB, and HSL values are all shown simultaneously so you can use whichever format your project needs." },
    { question: "Can I compare colors I've picked earlier?", answer: "Yes, the tool keeps a history of your last 10 picked colors so you can click back to any earlier swatch without re-uploading the image." },
  ],
  howItWorks: [
    { step: 1, title: "Upload your image", description: "Select any photo, screenshot, or design file to upload." },
    { step: 2, title: "Click a pixel to sample it", description: "Click anywhere on the image to read the exact color at that pixel." },
    { step: 3, title: "Copy the color code", description: "Copy the HEX, RGB, or HSL value for the picked pixel with one click." },
  ],
  relatedTools: ["color-picker", "grayscale-image", "image-converter"],
  schema: "WebApplication",
  adsPositions: ["top", "after-tool"],
};
export default config;
