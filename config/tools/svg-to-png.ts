import type { ToolConfig } from "@/types/tool";
const config: ToolConfig = {
  slug: "svg-to-png",
  title: "SVG to PNG Converter",
  description: "Convert SVG vector files to PNG images online for free at any resolution you choose. Export crisp, high-quality PNG files from SVG code or uploaded .svg files instantly.",
  shortDescription: "Convert SVG files to PNG at any resolution",
  category: "image",
  keywords: ["svg to png", "convert svg to png", "svg converter", "svg to image", "vector to png", "svg export", "svg png online"],
  icon: "🖼️",
  toolType: "image",
  faq: [
    { question: "Why convert SVG to PNG?", answer: "PNG is universally supported in all apps and platforms, while SVG may not display correctly in some environments like email clients or older software." },
    { question: "Can I set the output resolution?", answer: "Yes, you can specify the exact width and height in pixels for the exported PNG." },
    { question: "Does the PNG support transparency?", answer: "Yes, transparent backgrounds in your SVG are preserved in the PNG output." },
  ],
  howItWorks: [
    { step: 1, title: "Upload your SVG", description: "Upload an .svg file or paste SVG code into the text area." },
    { step: 2, title: "Set output size", description: "Enter the desired width and height for the PNG export." },
    { step: 3, title: "Download the PNG", description: "Click Convert and download your high-quality PNG file." },
  ],
  relatedTools: ["image-converter", "favicon-generator", "image-resizer"],
  schema: "WebApplication",
  adsPositions: ["top", "after-tool"],
};
export default config;
