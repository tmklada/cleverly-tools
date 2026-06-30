import type { ToolConfig } from "@/types/tool";
const config: ToolConfig = {
  slug: "color-picker",
  title: "Color Picker",
  description: "Pick any color and instantly convert between HEX, RGB, HSL, and HSV color formats. Use the visual color wheel or enter a value directly — perfect for designers and developers.",
  shortDescription: "Pick colors and convert HEX, RGB, HSL",
  category: "developer",
  keywords: ["color picker", "hex to rgb", "rgb to hex", "color converter", "hsl color picker", "online color picker", "hex color tool"],
  icon: "🎨",
  isNew: true,
  toolType: "developer",
  faq: [
    { question: "What color formats does the tool support?", answer: "The color picker supports HEX, RGB, RGBA, HSL, HSLA, and HSV color formats. You can convert between all of them instantly." },
    { question: "Can I enter a HEX code and get the RGB value?", answer: "Yes. Type any HEX code and the tool will automatically display the equivalent RGB, HSL, and other format values." },
    { question: "Can I pick a color from my screen?", answer: "Yes. On supported browsers (Chrome, Edge), you can use the eyedropper tool to pick any color directly from your screen or browser window." },
  ],
  howItWorks: [
    { step: 1, title: "Pick or enter a color", description: "Use the color wheel to select a color visually, or type a HEX, RGB, or HSL value directly." },
    { step: 2, title: "View all format conversions", description: "All equivalent color values (HEX, RGB, HSL, HSV) are displayed instantly." },
    { step: 3, title: "Copy the value you need", description: "Click Copy next to any format to use the color code in your CSS or design tool." },
  ],
  relatedTools: ["hash-generator", "password-generator", "regex-tester"],
  schema: "WebApplication",
  adsPositions: ["top", "after-tool"],
};
export default config;
