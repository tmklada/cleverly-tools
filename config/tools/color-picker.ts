import type { ToolConfig } from "@/types/tool";
const config: ToolConfig = {
  slug: "color-picker",
  title: "Color Picker",
  description: "Pick any color and instantly see it in HEX, RGB, and HSL color formats. Use the built-in color picker and copy the value you need — perfect for designers and developers.",
  shortDescription: "Pick colors and convert HEX, RGB, HSL",
  category: "developer",
  keywords: ["color picker", "hex to rgb", "rgb to hex", "color converter", "hsl color picker", "online color picker", "hex color tool"],
  icon: "🎨",
  isNew: true,
  toolType: "developer",
  faq: [
    { question: "What color formats does the tool support?", answer: "The color picker shows HEX, RGB, and HSL values at the same time, so you always have all three ready to copy." },
    { question: "Can I enter a HEX code directly?", answer: "The color swatch opens your browser's native color picker, which lets you paste or type a HEX value inside it depending on your browser. Once a color is set, the matching RGB and HSL values update automatically." },
    { question: "Can I pick a color from my screen?", answer: "Yes, on browsers whose native color picker includes an eyedropper (Chrome and Edge on desktop), you can sample any color directly from your screen or browser window." },
  ],
  howItWorks: [
    { step: 1, title: "Pick a color", description: "Click the color swatch to open your browser's native color picker, or click one of your recently used colors." },
    { step: 2, title: "View all format conversions", description: "The equivalent HEX, RGB, and HSL values are displayed instantly." },
    { step: 3, title: "Copy the value you need", description: "Click Copy next to any format to use the color code in your CSS or design tool." },
  ],
  relatedTools: ["hash-generator", "password-generator", "regex-tester"],
  schema: "WebApplication",
  adsPositions: ["top", "after-tool"],
};
export default config;
