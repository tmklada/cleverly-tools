import type { ToolConfig } from "@/types/tool";
const config: ToolConfig = {
  slug: "bmi-calculator",
  title: "BMI Calculator",
  description: "Calculate your Body Mass Index (BMI) instantly. Enter your height and weight to find out if you're underweight, normal, overweight or obese.",
  shortDescription: "Calculate your BMI — free body mass index tool",
  category: "calculators",
  keywords: ["bmi calculator", "body mass index", "calculate bmi", "bmi chart", "healthy weight calculator", "bmi formula"],
  icon: "⚖️",
  featured: true,
  toolType: "calculator",
  faq: [
    { question: "What is BMI?", answer: "BMI (Body Mass Index) is a measure of body fat based on height and weight. It helps assess if you're at a healthy weight." },
    { question: "What is a healthy BMI?", answer: "A BMI between 18.5 and 24.9 is considered normal/healthy. Under 18.5 is underweight, 25–29.9 is overweight, and 30+ is obese." },
    { question: "Is BMI accurate?", answer: "BMI is a useful screening tool but doesn't measure body fat directly. Athletes may have high BMI due to muscle mass." },
  ],
  howItWorks: [
    { step: 1, title: "Enter your weight", description: "Type your weight in kg or lbs." },
    { step: 2, title: "Enter your height", description: "Type your height in cm, feet or inches." },
    { step: 3, title: "Get your BMI", description: "See your BMI score and category instantly." },
  ],
  relatedTools: ["loan-calculator", "age-calculator", "percentage-calculator"],
  schema: "WebApplication",
  adsPositions: ["top", "after-tool"],
};
export default config;
