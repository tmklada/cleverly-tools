import type { ToolConfig } from "@/types/tool";
const config: ToolConfig = {
  slug: "temperature-converter",
  title: "Temperature Converter",
  description: "Convert temperatures between Celsius, Fahrenheit, and Kelvin instantly. Enter any temperature value and see all three scales updated in real time — perfect for cooking, science, and travel.",
  shortDescription: "Convert Celsius, Fahrenheit and Kelvin",
  category: "calculators",
  keywords: ["temperature converter", "celsius to fahrenheit", "fahrenheit to celsius", "kelvin converter", "temperature conversion online", "c to f converter", "f to c calculator"],
  icon: "🌡️",
  toolType: "calculator",
  faq: [
    { question: "How do I convert Celsius to Fahrenheit?", answer: "Multiply the Celsius value by 9/5 and add 32. For example, 100°C = (100 × 9/5) + 32 = 212°F. Our tool does this calculation automatically." },
    { question: "What is 0 Kelvin in Celsius?", answer: "0 Kelvin (absolute zero) equals −273.15°C. Kelvin is used in science and physics where absolute temperatures are needed." },
    { question: "Can I convert negative temperatures?", answer: "Yes. The converter handles all temperature values including negative numbers, which are common in Celsius and Fahrenheit scales." },
  ],
  howItWorks: [
    { step: 1, title: "Enter a temperature value", description: "Type the temperature number you want to convert in the input field." },
    { step: 2, title: "Select the source scale", description: "Choose whether your input is in Celsius, Fahrenheit, or Kelvin." },
    { step: 3, title: "See all conversions instantly", description: "The equivalent values in all three temperature scales are shown immediately." },
  ],
  relatedTools: ["unit-converter", "bmi-calculator", "percentage-calculator"],
  schema: "WebApplication",
  adsPositions: ["top", "after-tool"],
};
export default config;
