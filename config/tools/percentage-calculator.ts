import type { ToolConfig } from "@/types/tool";
const config: ToolConfig = {
  slug: "percentage-calculator",
  title: "Percentage Calculator",
  description: "Calculate percentages instantly. Find what percent of a number is, percentage increase/decrease, or what percentage one number is of another.",
  shortDescription: "Calculate percentages, increases & decreases instantly",
  category: "calculators",
  keywords: ["percentage calculator", "percent calculator", "percentage increase calculator", "percentage decrease", "what percent of", "calculate percentage"],
  icon: "%",
  toolType: "calculator",
  faq: [
    { question: "How do I calculate what % X is of Y?", answer: "Divide X by Y and multiply by 100. Example: 25 is what % of 200? → (25/200) × 100 = 12.5%." },
    { question: "How do I calculate a percentage increase?", answer: "((New - Old) / Old) × 100. Example: from 50 to 75 → ((75-50)/50) × 100 = 50% increase." },
  ],
  howItWorks: [
    { step: 1, title: "Choose calculation type", description: "Select what you need: basic %, % of total, or % change." },
    { step: 2, title: "Enter values", description: "Fill in the numbers you have." },
    { step: 3, title: "Get the result", description: "See the answer instantly with the formula used." },
  ],
  relatedTools: ["bmi-calculator", "loan-calculator", "age-calculator"],
  schema: "WebApplication",
  adsPositions: ["top", "after-tool"],
};
export default config;
