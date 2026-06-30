import type { ToolConfig } from "@/types/tool";
const config: ToolConfig = {
  slug: "currency-converter",
  title: "Currency Converter",
  description: "Convert between 170+ world currencies with live exchange rates updated daily for free online. Get accurate currency conversions for travel, business, and international purchases instantly.",
  shortDescription: "Convert currencies with live exchange rates",
  category: "finance",
  keywords: ["currency converter", "exchange rate calculator", "convert currency online", "foreign exchange converter", "forex calculator", "usd to eur", "live currency rates"],
  icon: "💱",
  toolType: "finance",
  featured: true,
  isNew: true,
  faq: [
    { question: "How current are the exchange rates?", answer: "Exchange rates are updated daily from reliable financial data sources to provide accurate conversions." },
    { question: "How many currencies are supported?", answer: "Over 170 world currencies are supported, including major fiat currencies and popular cryptocurrency pairs." },
    { question: "Can I convert multiple amounts at once?", answer: "Yes, the tool shows the converted amount for multiple currencies simultaneously so you can compare at a glance." },
  ],
  howItWorks: [
    { step: 1, title: "Enter amount and base currency", description: "Type the amount and select the currency you are converting from." },
    { step: 2, title: "Select target currency", description: "Choose the currency you want to convert to from the dropdown." },
    { step: 3, title: "See the conversion", description: "The converted amount and current exchange rate are displayed instantly." },
  ],
  relatedTools: ["discount-calculator", "loan-calculator", "percentage-calculator"],
  schema: "WebApplication",
  adsPositions: ["top", "after-tool"],
};
export default config;
