import type { ToolConfig } from "@/types/tool";
const config: ToolConfig = {
  slug: "grayscale-image",
  title: "Grayscale Image Converter",
  description: "Convert any color photo to black and white or grayscale online for free in seconds. Remove all color from images while preserving detail and quality, with instant preview.",
  shortDescription: "Convert color photos to grayscale instantly",
  category: "image",
  keywords: ["grayscale image converter", "black and white photo", "convert image to grayscale", "remove color from image", "bw photo converter", "grayscale filter online", "desaturate image"],
  icon: "⬛",
  toolType: "image",
  faq: [
    { question: "What is the difference between grayscale and black and white?", answer: "Grayscale uses shades of gray from black to white, preserving tonal detail. True black and white only uses pure black or pure white with no gray tones." },
    { question: "Does conversion reduce image quality?", answer: "No quality is lost — the image dimensions and resolution stay the same, only the color information is removed." },
    { question: "What formats can I convert?", answer: "JPG, PNG, and WebP images are all supported for grayscale conversion." },
  ],
  howItWorks: [
    { step: 1, title: "Upload your image", description: "Select a color photo from your device or drag it into the tool." },
    { step: 2, title: "Preview the result", description: "See the grayscale version instantly in the live preview." },
    { step: 3, title: "Download the image", description: "Download the black and white image in your preferred format." },
  ],
  relatedTools: ["image-converter", "image-compressor", "image-color-picker"],
  schema: "WebApplication",
  adsPositions: ["top", "after-tool"],
};
export default config;
