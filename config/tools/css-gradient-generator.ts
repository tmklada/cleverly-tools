import type { ToolConfig } from "@/types/tool";
const config: ToolConfig = {
  slug: "css-gradient-generator",
  title: "CSS Gradient Generator",
  description: "Create beautiful CSS gradients visually with a live preview. Generate linear, radial, and conic gradients and copy the ready-to-use CSS code instantly.",
  shortDescription: "Create CSS gradients with live preview — free",
  category: "developer",
  keywords: ["css gradient generator", "gradient maker", "linear gradient css", "radial gradient generator", "css background gradient", "color gradient tool", "css gradient code", "gradient builder"],
  icon: "🎨",
  isNew: true,
  toolType: "developer",
  faq: [
    { question: "What types of gradients can I create?", answer: "You can create linear gradients (angled), radial gradients (circular or elliptical), and conic gradients (rotating around a center point) with full color stop control." },
    { question: "Can I add multiple color stops?", answer: "Yes, you can add as many color stops as needed at any position. Drag them to adjust placement and use the color picker to set each color." },
    { question: "Is the generated CSS compatible with all browsers?", answer: "Yes, the generated code includes standard CSS gradient syntax that works in all modern browsers including Chrome, Firefox, Safari, and Edge." },
  ],
  howItWorks: [
    { step: 1, title: "Choose your gradient type", description: "Select linear, radial, or conic gradient and set the angle or direction." },
    { step: 2, title: "Add colors and stops", description: "Pick your colors and drag stop positions to create your perfect gradient." },
    { step: 3, title: "Copy the CSS code", description: "Copy the generated CSS and paste it directly into your stylesheet." },
  ],
  relatedTools: ["box-shadow-generator", "color-picker", "json-formatter"],
  schema: "WebApplication",
  adsPositions: ["top", "after-tool"],
};
export default config;
