import type { ToolConfig } from "@/types/tool";
const config: ToolConfig = {
  slug: "image-to-base64",
  title: "Image to Base64",
  description: "Convert any image to a Base64-encoded string instantly in your browser. Use the output in HTML, CSS, or JavaScript to embed images directly without external file references.",
  shortDescription: "Convert images to Base64 string online",
  category: "image",
  keywords: ["image to base64", "base64 image encoder", "convert image to base64", "base64 encode image", "jpg to base64", "png to base64", "base64 image online"],
  icon: "🔣",
  toolType: "image",
  faq: [
    { question: "What is Base64 image encoding?", answer: "Base64 encoding converts binary image data into a text string. This string can be embedded directly in HTML, CSS, or JSON without needing a separate image file." },
    { question: "When should I use Base64 for images?", answer: "Base64 is useful for small icons, email templates, and reducing HTTP requests in web pages. For large images, external files are more efficient." },
    { question: "Which image formats are supported?", answer: "You can convert JPG, PNG, GIF, WebP, SVG, and BMP images to Base64 strings." },
  ],
  howItWorks: [
    { step: 1, title: "Upload your image", description: "Click to select or drag and drop the image you want to encode." },
    { step: 2, title: "Get the Base64 string", description: "The encoded Base64 string is generated automatically and displayed on screen." },
    { step: 3, title: "Copy and use", description: "Copy the Base64 string and paste it into your HTML, CSS, or code." },
  ],
  relatedTools: ["image-resizer", "image-converter", "base64-encoder"],
  schema: "WebApplication",
  adsPositions: ["top", "after-tool"],
};
export default config;
