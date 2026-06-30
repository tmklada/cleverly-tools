import type { ToolConfig } from "@/types/tool";
const config: ToolConfig = {
  slug: "image-flipper",
  title: "Image Flipper & Mirror",
  description: "Flip or mirror any image horizontally or vertically online for free with no software needed. Create perfect mirror images instantly and download the result in your original format.",
  shortDescription: "Flip and mirror images horizontally or vertically",
  category: "image",
  keywords: ["image flipper", "flip image online", "mirror image", "flip photo", "horizontal flip", "vertical flip", "image mirror tool"],
  icon: "🔃",
  toolType: "image",
  faq: [
    { question: "What is the difference between flip and mirror?", answer: "Flipping horizontally creates a left-right mirror image, while flipping vertically creates an upside-down version." },
    { question: "Does flipping reduce image quality?", answer: "No, the flip operation is lossless and does not compress or degrade your image quality." },
    { question: "Can I flip and rotate at the same time?", answer: "Yes, you can combine horizontal or vertical flipping with 90-degree rotation in one step." },
  ],
  howItWorks: [
    { step: 1, title: "Upload your image", description: "Select or drag your image file into the upload area." },
    { step: 2, title: "Choose flip direction", description: "Click Flip Horizontal or Flip Vertical — preview updates instantly." },
    { step: 3, title: "Download the result", description: "Download the flipped image in your original format." },
  ],
  relatedTools: ["image-cropper", "image-resizer", "image-compressor"],
  schema: "WebApplication",
  adsPositions: ["top", "after-tool"],
};
export default config;
