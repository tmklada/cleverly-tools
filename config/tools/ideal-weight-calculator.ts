import type { ToolConfig } from "@/types/tool";
const config: ToolConfig = {
  slug: "ideal-weight-calculator",
  title: "Ideal Weight Calculator",
  description: "Find your ideal body weight range based on your height, gender, and frame size. Uses multiple formulas including Hamwi, Devine, and Robinson for a complete picture.",
  shortDescription: "Find your ideal weight by height and gender",
  category: "health",
  keywords: ["ideal weight calculator", "healthy weight calculator", "target weight calculator", "ideal body weight", "weight range calculator", "how much should i weigh", "healthy weight range"],
  icon: "⚖️",
  toolType: "health",
  faq: [
    { question: "How is ideal weight calculated?", answer: "Several formulas exist including Hamwi, Devine, and Robinson. Each uses your height and gender as inputs. Our calculator shows results from multiple formulas so you can see the range." },
    { question: "Is ideal weight the same as a healthy BMI weight?", answer: "They are similar but not identical. Ideal weight formulas give a specific target, while healthy BMI gives a range. Both are useful guidelines but not absolute rules." },
    { question: "Does body frame size affect ideal weight?", answer: "Yes, people with larger bone structures naturally weigh more. The calculator accounts for small, medium, and large frame sizes to give a more personalized result." },
  ],
  howItWorks: [
    { step: 1, title: "Enter your height", description: "Input your height in cm, feet or inches." },
    { step: 2, title: "Select gender and frame size", description: "Choose your gender and estimate your body frame size." },
    { step: 3, title: "See your ideal weight range", description: "View ideal weight results from multiple formulas as a useful range." },
  ],
  relatedTools: ["bmi-calculator", "calorie-calculator", "body-fat-calculator"],
  schema: "WebApplication",
  adsPositions: ["top", "after-tool"],
};
export default config;
