import type { ToolConfig } from "@/types/tool";
const config: ToolConfig = {
  slug: "image-converter",
  title: "Image Converter",
  description: "Convert images between JPG, PNG, WebP, GIF, and BMP formats online for free. No software or registration needed — just upload, convert, and download in seconds.",
  shortDescription: "Convert JPG, PNG, WebP images online free",
  category: "image",
  keywords: ["image converter", "convert jpg to png", "convert png to webp", "image format converter", "jpg to webp", "png converter online", "webp converter"],
  icon: "🖼️",
  isNew: true,
  toolType: "image",
  faq: [
    { question: "Which image formats can I convert between?", answer: "You can convert between JPG, PNG, WebP, GIF, and BMP. All major image formats are supported for both input and output." },
    { question: "Why would I convert JPG to WebP?", answer: "WebP files are significantly smaller than JPG and PNG at the same quality, making them ideal for websites and faster page loads." },
    { question: "Does converting change image quality?", answer: "Converting between lossy formats (like JPG) may cause slight quality loss. Converting to PNG or WebP lossless preserves full quality." },
  ],
  howItWorks: [
    { step: 1, title: "Upload your image", description: "Select or drag and drop the image you want to convert." },
    { step: 2, title: "Choose output format", description: "Select the target format: JPG, PNG, WebP, GIF, or BMP." },
    { step: 3, title: "Download converted image", description: "Click Convert and download your image in the new format." },
  ],
  relatedTools: ["image-resizer", "image-compressor", "image-to-base64"],
  schema: "WebApplication",
  adsPositions: ["top", "after-tool"],
};
export default config;
