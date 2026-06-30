import type { ToolConfig } from "@/types/tool";
const config: ToolConfig = {
  slug: "heart-rate-calculator",
  title: "Heart Rate Zone Calculator",
  description: "Calculate your maximum heart rate and target heart rate zones for fat burning, cardio, and peak performance. Optimize your workouts with personalized heart rate zones.",
  shortDescription: "Find your heart rate zones for optimal workouts",
  category: "health",
  keywords: ["heart rate calculator", "target heart rate", "heart rate zones", "max heart rate", "fat burning zone", "cardio heart rate", "heart rate training zones", "exercise heart rate"],
  icon: "❤️",
  toolType: "health",
  faq: [
    { question: "How is maximum heart rate calculated?", answer: "The most common formula is 220 minus your age. A 30-year-old would have an estimated max heart rate of 190 BPM. This is an estimate that varies by individual." },
    { question: "What are the heart rate training zones?", answer: "Zone 1 (50-60%) is recovery, Zone 2 (60-70%) is fat burning, Zone 3 (70-80%) is aerobic cardio, Zone 4 (80-90%) is anaerobic training, and Zone 5 (90-100%) is maximum effort." },
    { question: "Which zone is best for weight loss?", answer: "Zone 2 (60-70% of max HR) is the 'fat burning zone' as your body uses fat as its primary fuel. However, higher intensity zones burn more total calories in less time." },
  ],
  howItWorks: [
    { step: 1, title: "Enter your age", description: "Your age is used to calculate your estimated maximum heart rate." },
    { step: 2, title: "Choose your formula", description: "Select from multiple heart rate formulas for different levels of accuracy." },
    { step: 3, title: "See your training zones", description: "View all five heart rate zones with BPM ranges for each workout intensity level." },
  ],
  relatedTools: ["calorie-calculator", "bmi-calculator", "sleep-calculator"],
  schema: "WebApplication",
  adsPositions: ["top", "after-tool"],
};
export default config;
