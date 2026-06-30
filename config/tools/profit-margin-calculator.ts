import type { ToolConfig } from "@/types/tool";
const config: ToolConfig = {
  slug: "profit-margin-calculator",
  title: "Profit Margin Calculator",
  description: "Calculate gross, operating, and net profit margins for your business instantly. Understand exactly how much of every dollar in revenue you actually keep.",
  shortDescription: "Calculate profit margins for your business — free",
  category: "finance",
  keywords: ["profit margin calculator", "gross profit margin", "net profit margin", "margin calculator", "profit calculator", "business profit", "markup calculator", "profit percentage"],
  icon: "💰",
  toolType: "finance",
  faq: [
    { question: "What is profit margin?", answer: "Profit margin is the percentage of revenue that remains as profit after deducting costs. A 20% margin means you keep $20 from every $100 in sales." },
    { question: "What is the difference between gross and net profit margin?", answer: "Gross margin subtracts only the cost of goods sold. Net margin subtracts all expenses including taxes and operating costs, giving a more complete picture of profitability." },
    { question: "What is a good profit margin?", answer: "It varies by industry. Retail typically sees 2-5%, while software companies can achieve 60-80%. Compare against your industry benchmark for context." },
  ],
  howItWorks: [
    { step: 1, title: "Enter your revenue", description: "Input your total sales or revenue for the period." },
    { step: 2, title: "Enter your costs", description: "Input your cost of goods sold and any other expenses." },
    { step: 3, title: "See your margins", description: "View gross and net profit margins with clear breakdowns instantly." },
  ],
  relatedTools: ["roi-calculator", "vat-calculator", "compound-interest-calculator"],
  schema: "WebApplication",
  adsPositions: ["top", "after-tool"],
};
export default config;
