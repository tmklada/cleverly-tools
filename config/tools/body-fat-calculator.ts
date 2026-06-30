import type { ToolConfig } from "@/types/tool";
const config: ToolConfig = {
  slug: "body-fat-calculator",
  title: "Body Fat Calculator",
  description: "Estimate your body fat percentage using measurements or the US Navy method. Understand your fitness level and get a clearer picture of your health beyond just weight.",
  shortDescription: "Estimate your body fat percentage — free tool",
  category: "health",
  keywords: ["body fat calculator", "body fat percentage", "calculate body fat", "fat percentage calculator", "navy body fat calculator", "body composition calculator", "fat mass calculator"],
  icon: "🏃",
  toolType: "health",
  faq: [
    { question: "How is body fat percentage calculated?", answer: "The US Navy method uses neck, waist, and hip measurements combined with height to estimate body fat. It's accurate to within 3-4% of DEXA scan results." },
    { question: "What is a healthy body fat percentage?", answer: "For men, 6-24% is generally healthy. For women, 16-30% is healthy. Athletes tend to have lower percentages, while higher percentages indicate increased health risks." },
    { question: "Is body fat percentage better than BMI?", answer: "Body fat percentage is more informative because it distinguishes between fat mass and muscle mass. A muscular person may have a high BMI but a healthy body fat percentage." },
  ],
  howItWorks: [
    { step: 1, title: "Enter your measurements", description: "Measure and enter your neck, waist, and hip circumferences in cm or inches." },
    { step: 2, title: "Add height and gender", description: "Enter your height and select your gender for the calculation." },
    { step: 3, title: "See your body fat estimate", description: "View your estimated body fat percentage and how it compares to healthy ranges." },
  ],
  relatedTools: ["bmi-calculator", "calorie-calculator", "ideal-weight-calculator"],
  schema: "WebApplication",
  adsPositions: ["top", "after-tool"],
};
export default config;
