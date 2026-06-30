import type { ToolConfig } from "@/types/tool";
const config: ToolConfig = {
  slug: "unit-converter",
  title: "Unit Converter",
  description: "Convert between length, weight, volume, area, speed, and more — all in one place. Supports metric and imperial units with instant results and no installation required.",
  shortDescription: "Convert length, weight, volume & more",
  category: "calculators",
  keywords: ["unit converter", "length converter", "weight converter", "metric converter", "imperial converter", "unit conversion online", "measurement converter"],
  icon: "📏",
  featured: true,
  toolType: "calculator",
  faq: [
    { question: "What types of units can I convert?", answer: "You can convert length (meters, feet, miles), weight (kg, lbs, oz), volume (liters, gallons), area, speed, temperature, time, and many more unit types." },
    { question: "Does the converter support both metric and imperial?", answer: "Yes. All conversions support both metric (SI) and imperial/US customary units, making it useful for any country or field." },
    { question: "Is the conversion result accurate?", answer: "Yes. All conversions use precise mathematical formulas and constants for accurate results across all unit types." },
  ],
  howItWorks: [
    { step: 1, title: "Select a category", description: "Choose the type of measurement to convert: length, weight, volume, speed, etc." },
    { step: 2, title: "Enter the value", description: "Type the number you want to convert and select the source unit." },
    { step: 3, title: "See instant results", description: "All equivalent values in other units are displayed instantly as you type." },
  ],
  relatedTools: ["temperature-converter", "bmi-calculator", "percentage-calculator"],
  schema: "WebApplication",
  adsPositions: ["top", "after-tool"],
};
export default config;
