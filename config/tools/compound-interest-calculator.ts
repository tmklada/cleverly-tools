import type { ToolConfig } from "@/types/tool";
const config: ToolConfig = {
  slug: "compound-interest-calculator",
  title: "Compound Interest Calculator",
  description: "Calculate how your investment grows over time with compound interest. See projections for any principal amount, interest rate, and compounding frequency.",
  shortDescription: "Calculate compound interest and investment growth",
  category: "finance",
  keywords: ["compound interest calculator", "investment calculator", "interest calculator", "savings calculator", "compound growth", "future value calculator", "investment growth", "compounding calculator"],
  icon: "📈",
  featured: true,
  toolType: "finance",
  faq: [
    { question: "What is compound interest?", answer: "Compound interest is interest calculated on both the initial principal and the accumulated interest from previous periods, causing your money to grow exponentially over time." },
    { question: "How often does compound interest accrue?", answer: "Interest can compound daily, monthly, quarterly, or annually. More frequent compounding results in slightly higher returns." },
    { question: "What is the difference between compound and simple interest?", answer: "Simple interest is calculated only on the principal. Compound interest is calculated on the principal plus all previously earned interest, leading to much higher long-term growth." },
  ],
  howItWorks: [
    { step: 1, title: "Enter your principal amount", description: "Input your starting investment or savings balance." },
    { step: 2, title: "Set rate and time period", description: "Enter the annual interest rate, compounding frequency, and number of years." },
    { step: 3, title: "See your growth projection", description: "View the final balance and a year-by-year breakdown of your investment growth." },
  ],
  relatedTools: ["roi-calculator", "loan-calculator", "profit-margin-calculator"],
  schema: "WebApplication",
  adsPositions: ["top", "after-tool"],
};
export default config;
