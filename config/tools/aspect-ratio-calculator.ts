import type { ToolConfig } from "@/types/tool";
const config: ToolConfig = {
  slug: "aspect-ratio-calculator",
  title: "Aspect Ratio Calculator",
  description: "Calculate and convert aspect ratios between different screen sizes and resolutions for free online. Find the correct width or height to maintain a 16:9, 4:3, or any custom aspect ratio.",
  shortDescription: "Calculate width and height for any aspect ratio",
  category: "calculators",
  keywords: ["aspect ratio calculator", "aspect ratio converter", "16 9 calculator", "image aspect ratio", "screen resolution calculator", "ratio calculator", "width height ratio"],
  icon: "📐",
  toolType: "calculator",
  faq: [
    { question: "What is an aspect ratio?", answer: "An aspect ratio describes the proportional relationship between width and height — 16:9 means for every 16 units wide the image is 9 units tall." },
    { question: "How do I find the height for a given width?", answer: "Enter the ratio and the known dimension — the tool instantly calculates the missing value to maintain the correct proportion." },
    { question: "What common aspect ratios are included?", answer: "Presets for 16:9, 4:3, 1:1, 21:9, 3:2, and 9:16 (vertical) are included for quick access." },
  ],
  howItWorks: [
    { step: 1, title: "Enter the ratio or dimensions", description: "Type a known aspect ratio or enter existing width and height values." },
    { step: 2, title: "Enter one dimension", description: "Enter either width or height and the other is calculated automatically." },
    { step: 3, title: "Copy the result", description: "Copy the calculated dimensions to use in your design or code." },
  ],
  relatedTools: ["image-resizer", "image-cropper", "percentage-calculator"],
  schema: "WebApplication",
  adsPositions: ["top", "after-tool"],
};
export default config;
