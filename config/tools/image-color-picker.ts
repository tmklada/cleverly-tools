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
    { question: "How do I pick a color from my image?", answer: "Upload your image, then hover over any pixel — the tool shows the color values in real time. Click to lock the selection." },
    { question: "What color formats does it show?", answer: "HEX, RGB, and HSL values are all shown simultaneously so you can use whichever format your project needs." },
    { question: "Can I extract a full color palette from an image?", answer: "Yes, the tool also offers an auto-extract mode that identifies the dominant colors in your image." },
  ],
  howItWorks: [
    { step: 1, title: "Upload your image", description: "Select any photo, screenshot, or design file to upload." },
    { step: 2, title: "Hover to sample colors", description: "Move your cursor over the image to see color values update in real time." },
    { step: 3, title: "Copy the color code", description: "Click any pixel to lock it and copy the HEX, RGB, or HSL value." },
  ],
  relatedTools: ["color-picker", "grayscale-image", "image-converter"],
  schema: "WebApplication",
  adsPositions: ["top", "after-tool"],
};
export default config;
