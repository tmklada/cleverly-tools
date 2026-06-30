import type { ToolConfig } from "@/types/tool";
const config: ToolConfig = {
  slug: "discount-calculator",
  title: "Discount Calculator",
  description: "Calculate the final price after a percentage discount or find what percentage discount was applied for free online. Works for sale prices, coupons, bulk pricing, and markdown calculations.",
  shortDescription: "Calculate sale price after any percentage discount",
  category: "finance",
  keywords: ["discount calculator", "sale price calculator", "percent off calculator", "discount percentage calculator", "price after discount", "coupon calculator", "markdown calculator"],
  icon: "🏷️",
  toolType: "finance",
  faq: [
    { question: "How do I calculate a percentage discount?", answer: "Enter the original price and the discount percentage — the tool shows the amount saved and the final price you pay." },
    { question: "Can I calculate what percentage discount I received?", answer: "Yes, enter the original price and the sale price and the tool calculates the exact discount percentage." },
    { question: "Does it handle multiple discounts?", answer: "Yes, you can stack multiple discounts (e.g. 20% off then an extra 10% off) and see the combined savings." },
  ],
  howItWorks: [
    { step: 1, title: "Enter the original price", description: "Type the original full price of the item or service." },
    { step: 2, title: "Enter the discount", description: "Type the discount percentage (e.g. 25 for 25% off)." },
    { step: 3, title: "See the results", description: "The discounted price and the amount you save are shown instantly." },
  ],
  relatedTools: ["percentage-calculator", "loan-calculator", "currency-converter"],
  schema: "WebApplication",
  adsPositions: ["top", "after-tool"],
};
export default config;
