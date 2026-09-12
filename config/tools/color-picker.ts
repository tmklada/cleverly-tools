import type { ToolConfig } from "@/types/tool";
const config: ToolConfig = {
  slug: "color-picker",
  title: "Color Picker",
  description: "Pick any color, or type and paste a HEX, RGB or HSL value, and instantly see it in HEX, HEX8, RGB, RGBA, HSL, and HSV. Copy any format with one click — perfect for designers and developers.",
  shortDescription: "Convert HEX, RGB, HSL, HSV and RGBA colors",
  category: "developer",
  keywords: ["color picker", "hex to rgb", "rgb to hex", "color converter", "hsl color picker", "online color picker", "hex color tool", "rgb to hsl", "hex to hsv", "rgba converter", "hex8 color"],
  icon: "🎨",
  isNew: true,
  toolType: "developer",
  faq: [
    { question: "What color formats does the tool support?", answer: "Six at once: HEX, HEX8 (hex with alpha), RGB, RGBA, HSL, and HSV. Every format has its own copy button, so you can grab exactly the notation your CSS or design tool expects." },
    { question: "Can I enter a HEX, RGB or HSL code directly?", answer: "Yes. Type or paste into any of the three text fields and the others update instantly. Parsing is forgiving: #abc, abc, #aabbcc, #aabbccdd, rgb(51, 102, 204), rgba(51 102 204 / 50%), hsl(220, 60%, 50%), and bare values like 51,102,204 all work. Anything unparseable shows a clear inline error instead of silently doing nothing." },
    { question: "How do I get a color with transparency?", answer: "Use the alpha slider. The RGBA and HEX8 outputs pick up the alpha value, and pasting an 8-digit hex or an rgba() string sets the alpha for you." },
    { question: "Can I pick a color from my screen?", answer: "Yes, on browsers whose native color picker includes an eyedropper (Chrome and Edge on desktop), you can sample any color directly from your screen or browser window." },
  ],
  howItWorks: [
    { step: 1, title: "Set a color", description: "Click the swatch for your browser's native picker, type or paste a HEX, RGB or HSL value, or click one of your recently used colors." },
    { step: 2, title: "View all format conversions", description: "The equivalent HEX, HEX8, RGB, RGBA, HSL, and HSV values are displayed instantly." },
    { step: 3, title: "Copy the value you need", description: "Click Copy next to any format to use the color code in your CSS or design tool." },
  ],
  relatedTools: ["hash-generator", "password-generator", "regex-tester"],
  schema: "WebApplication",
  adsPositions: ["top", "after-tool"],
};
export default config;
