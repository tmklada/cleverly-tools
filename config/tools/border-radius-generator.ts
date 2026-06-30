import type { ToolConfig } from "@/types/tool";
const config: ToolConfig = {
  slug: "border-radius-generator",
  title: "CSS Border Radius Generator",
  description: "Visually generate CSS border-radius values with a live preview online for free. Create perfect rounded corners, pills, and custom shapes with a simple slider interface.",
  shortDescription: "Generate CSS border-radius values visually",
  category: "developer",
  keywords: ["border radius generator", "css border radius", "rounded corners css", "css generator", "border radius tool", "css shape generator", "rounded corners online"],
  icon: "⬛",
  toolType: "developer",
  faq: [
    { question: "What is border-radius in CSS?", answer: "The border-radius property rounds the corners of an element, and you can control each corner independently for custom shapes." },
    { question: "Can I set different radius for each corner?", answer: "Yes, this tool lets you control top-left, top-right, bottom-right, and bottom-left independently." },
    { question: "Does it support percentage values?", answer: "Yes, you can use both pixel and percentage values — 50% creates a circle from a square element." },
  ],
  howItWorks: [
    { step: 1, title: "Adjust sliders", description: "Drag the sliders to set the border-radius for each corner." },
    { step: 2, title: "Preview live", description: "See the shape update in real time as you adjust values." },
    { step: 3, title: "Copy the CSS", description: "Copy the generated CSS code and paste it into your stylesheet." },
  ],
  relatedTools: ["css-minifier", "color-picker", "image-converter"],
  schema: "WebApplication",
  adsPositions: ["top", "after-tool"],
};
export default config;
