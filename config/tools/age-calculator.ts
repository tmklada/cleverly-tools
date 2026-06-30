import type { ToolConfig } from "@/types/tool";
const config: ToolConfig = {
  slug: "age-calculator",
  title: "Age Calculator",
  description: "Calculate your exact age in years, months, days, hours and minutes. Find out how many days until your next birthday.",
  shortDescription: "Calculate your exact age in years, months & days",
  category: "calculators",
  keywords: ["age calculator", "how old am i", "birthday calculator", "date of birth calculator", "exact age calculator", "days until birthday"],
  icon: "🎂",
  isNew: true,
  toolType: "calculator",
  faq: [
    { question: "How accurate is the age calculator?", answer: "It calculates your exact age down to the day based on your date of birth and today's date." },
    { question: "Can I calculate age for a future date?", answer: "Yes, you can set any target date to calculate age at that point in time." },
  ],
  howItWorks: [
    { step: 1, title: "Enter date of birth", description: "Select or type your birth date." },
    { step: 2, title: "Get your age", description: "See your exact age in years, months, days and more." },
  ],
  relatedTools: ["bmi-calculator", "loan-calculator", "percentage-calculator"],
  schema: "WebApplication",
  adsPositions: ["top", "after-tool"],
};
export default config;
