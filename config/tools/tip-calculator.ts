import type { ToolConfig } from "@/types/tool";
const config: ToolConfig = {
  slug: "tip-calculator",
  title: "Tip Calculator",
  description: "Calculate the right tip amount for any bill and split it easily among multiple people. Perfect for restaurants, taxis, and any service where tipping is expected.",
  shortDescription: "Calculate tips and split bills — free tool",
  category: "finance",
  keywords: ["tip calculator", "restaurant tip calculator", "bill splitter", "split bill calculator", "how much to tip", "gratuity calculator", "tip percentage", "split the bill"],
  icon: "🍽️",
  toolType: "finance",
  faq: [
    { question: "How much should I tip at a restaurant?", answer: "Standard tipping etiquette suggests 15% for adequate service, 18-20% for good service, and 25%+ for exceptional service in most Western countries." },
    { question: "Can I split the bill among multiple people?", answer: "Yes, enter the number of people splitting the bill and the calculator shows how much each person owes including their share of the tip." },
    { question: "Does the tip calculate before or after tax?", answer: "You can choose to calculate the tip on the pre-tax subtotal (more common) or on the total including tax, depending on your preference." },
  ],
  howItWorks: [
    { step: 1, title: "Enter your bill total", description: "Type the total amount of your bill before tip." },
    { step: 2, title: "Select tip percentage", description: "Choose a tip percentage or enter a custom amount." },
    { step: 3, title: "Split and pay", description: "Enter the number of people and see exactly how much each person owes." },
  ],
  relatedTools: ["vat-calculator", "percentage-calculator", "profit-margin-calculator"],
  schema: "WebApplication",
  adsPositions: ["top", "after-tool"],
};
export default config;
