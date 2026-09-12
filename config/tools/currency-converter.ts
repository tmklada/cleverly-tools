import type { ToolConfig } from "@/types/tool";
const config: ToolConfig = {
  slug: "currency-converter",
  title: "Currency Converter",
  description: "Convert between 160+ world currencies with live exchange rates for free online. Get accurate currency conversions for travel, business, and international purchases instantly.",
  shortDescription: "Convert currencies with live exchange rates",
  category: "finance",
  keywords: ["currency converter", "exchange rate calculator", "convert currency online", "foreign exchange converter", "forex calculator", "usd to eur", "live currency rates"],
  icon: "💱",
  toolType: "finance",
  featured: true,
  isNew: true,
  faq: [
    { question: "How current are the exchange rates?", answer: "Rates are pulled live from an exchange rate data feed that refreshes daily, and the tool shows the exact date the rates it is using were last updated." },
    { question: "How many currencies are supported?", answer: "166 world currencies are supported, including USD, EUR, GBP, JPY, CAD, AUD, CHF, CNY, INR, ILS, and AED. Use the search box in the currency selector to find any of them by code or name." },
    { question: "Does it support cryptocurrency?", answer: "No. This converter covers fiat (national) currencies only; Bitcoin and other crypto pairs are not included." },
    { question: "Can I quickly convert common amounts?", answer: "Yes, quick-select buttons for 1, 10, 100, and 1,000 let you see common amounts converted instantly without retyping, and a swap button flips the two currencies." },
  ],
  howItWorks: [
    { step: 1, title: "Enter amount and base currency", description: "Type the amount, then search the currency you are converting from by ISO code or name." },
    { step: 2, title: "Select target currency", description: "Search and pick the currency you want to convert to from the same 166-currency list." },
    { step: 3, title: "See the conversion", description: "The converted amount, the effective rate (for example 1 USD = 3.0453 ILS), and the date the rates were last updated are displayed instantly." },
  ],
  relatedTools: ["discount-calculator", "loan-calculator", "percentage-calculator"],
  schema: "WebApplication",
  adsPositions: ["top", "after-tool"],
};
export default config;
