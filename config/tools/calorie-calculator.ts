import type { ToolConfig } from "@/types/tool";
const config: ToolConfig = {
  slug: "calorie-calculator",
  title: "Calorie Calculator",
  description: "Calculate your daily calorie needs based on your age, weight, height, and activity level. Get personalized calorie targets for weight loss, maintenance, or muscle gain.",
  shortDescription: "Calculate your daily calorie needs — free tool",
  category: "health",
  keywords: ["calorie calculator", "daily calorie calculator", "tdee calculator", "calorie intake calculator", "weight loss calories", "bmr calculator", "calorie deficit", "how many calories"],
  icon: "🍎",
  featured: true,
  toolType: "health",
  faq: [
    { question: "What is TDEE?", answer: "TDEE (Total Daily Energy Expenditure) is the total number of calories your body burns in a day including all activities. Eating at TDEE maintains your current weight." },
    { question: "How many calories should I eat to lose weight?", answer: "A deficit of 500 calories per day below your TDEE leads to approximately 0.5kg (1 lb) of weight loss per week, which is considered safe and sustainable." },
    { question: "What is the Mifflin-St Jeor equation?", answer: "It's the most accurate formula for calculating BMR (Basal Metabolic Rate). It accounts for gender, age, height, and weight to estimate calories burned at rest." },
  ],
  howItWorks: [
    { step: 1, title: "Enter your body measurements", description: "Input your age, gender, height, and current weight." },
    { step: 2, title: "Select your activity level", description: "Choose how active you are, from sedentary to very active." },
    { step: 3, title: "Get your calorie target", description: "See your BMR and TDEE, plus recommended calories for your goal." },
  ],
  relatedTools: ["bmi-calculator", "water-intake-calculator", "ideal-weight-calculator"],
  schema: "WebApplication",
  adsPositions: ["top", "after-tool"],
};
export default config;
