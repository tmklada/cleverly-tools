import type { ToolConfig } from "@/types/tool";
const config: ToolConfig = {
  slug: "box-shadow-generator",
  title: "CSS Box Shadow Generator",
  description: "Generate CSS box shadow effects visually with a live preview. Control offset, blur, spread, and color to create perfect shadows and copy the CSS code instantly.",
  shortDescription: "Generate CSS box shadows with live preview — free",
  category: "developer",
  keywords: ["box shadow generator", "css box shadow", "shadow css generator", "css shadow tool", "box shadow code", "text shadow generator", "css effects generator", "drop shadow css"],
  icon: "🟦",
  toolType: "developer",
  faq: [
    { question: "What is CSS box-shadow?", answer: "CSS box-shadow adds shadow effects around an element's frame. You can set horizontal and vertical offset, blur radius, spread radius, color, and whether the shadow is inset or outset." },
    { question: "Can I add multiple shadows to one element?", answer: "Yes, CSS allows multiple box shadows on a single element separated by commas. This lets you create layered shadow effects and complex visual styles." },
    { question: "What does the inset keyword do?", answer: "Inset changes the shadow from being outside the element to inside it, creating a depressed or inner glow effect rather than a raised shadow." },
  ],
  howItWorks: [
    { step: 1, title: "Adjust the shadow sliders", description: "Use sliders to control the horizontal offset, vertical offset, blur radius, and spread radius." },
    { step: 2, title: "Pick a shadow color", description: "Choose the shadow color and adjust its opacity for subtle or dramatic effects." },
    { step: 3, title: "Copy the CSS code", description: "Copy the generated box-shadow CSS property and paste it into your stylesheet." },
  ],
  relatedTools: ["css-gradient-generator", "color-picker", "json-formatter"],
  schema: "WebApplication",
  adsPositions: ["top", "after-tool"],
};
export default config;
