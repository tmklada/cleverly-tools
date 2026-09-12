import type { ToolConfig } from "@/types/tool";
const config: ToolConfig = {
  slug: "unit-converter",
  title: "Unit Converter",
  description: "Convert between length, weight, temperature, time, volume, area, speed, and digital storage — all in one place. Supports metric and imperial units with instant results and no installation required.",
  shortDescription: "Convert length, weight, temperature, time & more",
  category: "calculators",
  keywords: ["unit converter", "length converter", "weight converter", "temperature converter", "celsius to fahrenheit", "time converter", "metric converter", "imperial converter", "unit conversion online", "measurement converter"],
  icon: "📏",
  featured: true,
  toolType: "calculator",
  faq: [
    { question: "What types of units can I convert?", answer: "Eight categories: length (meters, feet, miles), weight (kg, lbs, oz), temperature (Celsius, Fahrenheit, Kelvin, Rankine), time (milliseconds to years), volume (liters, gallons), area, speed, and digital storage (bytes to terabytes)." },
    { question: "Can it convert Celsius to Fahrenheit?", answer: "Yes. The Temperature category handles Celsius, Fahrenheit, Kelvin, and Rankine using the correct offset formulas, so 100 °C converts to 212 °F and 373.15 K, not a simple multiplication." },
    { question: "Does the converter support both metric and imperial?", answer: "Yes. All conversions support both metric (SI) and imperial/US customary units, making it useful for any country or field." },
    { question: "Does digital storage use 1000 or 1024 bytes per KB?", answer: "It uses decimal SI units, where 1 KB = 1,000 bytes and 1 MB = 1,000 KB — the same convention storage manufacturers use. This is labelled in the tool." },
    { question: "Is the conversion result accurate?", answer: "Yes. All conversions use precise mathematical formulas and constants for accurate results across all unit types." },
  ],
  howItWorks: [
    { step: 1, title: "Select a category", description: "Choose the type of measurement to convert: length, weight, temperature, time, volume, area, speed, or digital storage." },
    { step: 2, title: "Enter the value", description: "Type the number you want to convert and select the source unit." },
    { step: 3, title: "See instant results", description: "Pick the target unit and the converted value appears instantly as you type; the swap button flips the two units." },
  ],
  relatedTools: ["temperature-converter", "bmi-calculator", "percentage-calculator"],
  schema: "WebApplication",
  adsPositions: ["top", "after-tool"],
};
export default config;
