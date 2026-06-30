import type { ToolConfig } from "@/types/tool";
const config: ToolConfig = {
  slug: "water-intake-calculator",
  title: "Daily Water Intake Calculator",
  description: "Calculate exactly how much water you should drink per day based on your weight and activity level. Stay properly hydrated with a personalized daily water intake target.",
  shortDescription: "Calculate your daily water intake — free tool",
  category: "health",
  keywords: ["water intake calculator", "daily water intake", "how much water to drink", "hydration calculator", "water consumption calculator", "drink water calculator", "water needs calculator"],
  icon: "💧",
  toolType: "health",
  faq: [
    { question: "How much water should I drink per day?", answer: "General guidelines suggest 2-3 litres (8-12 cups) for most adults, but your exact needs depend on your body weight, activity level, and climate." },
    { question: "Does coffee and tea count towards water intake?", answer: "Yes, all beverages contribute to hydration. However, caffeinated drinks have a mild diuretic effect, so plain water should still be your primary source." },
    { question: "How do I know if I'm drinking enough water?", answer: "The easiest sign is urine color — pale yellow indicates good hydration. Dark yellow means you should drink more. Thirst is also a reliable signal." },
  ],
  howItWorks: [
    { step: 1, title: "Enter your weight", description: "Input your body weight in kg or lbs." },
    { step: 2, title: "Select your activity level", description: "Choose your daily activity level from sedentary to very active." },
    { step: 3, title: "Get your daily water goal", description: "See your personalized daily water intake recommendation in litres and glasses." },
  ],
  relatedTools: ["calorie-calculator", "bmi-calculator", "body-fat-calculator"],
  schema: "WebApplication",
  adsPositions: ["top", "after-tool"],
};
export default config;
