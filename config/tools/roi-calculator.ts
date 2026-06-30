import type { ToolConfig } from "@/types/tool";
const config: ToolConfig = {
  slug: "roi-calculator",
  title: "ROI Calculator",
  description: "Calculate your Return on Investment (ROI) quickly to evaluate the profitability of any investment or business decision. Compare multiple investments side by side.",
  shortDescription: "Calculate ROI for any investment — free tool",
  category: "finance",
  keywords: ["roi calculator", "return on investment", "roi formula", "investment return calculator", "profit calculator", "business roi", "marketing roi", "calculate roi"],
  icon: "💹",
  toolType: "finance",
  faq: [
    { question: "What is ROI?", answer: "ROI (Return on Investment) is a percentage that measures how much profit or loss an investment generates relative to its cost. A positive ROI means profit; a negative ROI means a loss." },
    { question: "What is a good ROI?", answer: "A good ROI depends on the investment type. The stock market averages around 10% annually, while most businesses aim for 15-20%+ ROI." },
    { question: "What is the ROI formula?", answer: "ROI = ((Net Profit / Cost of Investment) × 100). Net profit equals the total return minus the initial investment cost." },
  ],
  howItWorks: [
    { step: 1, title: "Enter your investment cost", description: "Input how much money you invested or plan to invest." },
    { step: 2, title: "Enter your return", description: "Input the total revenue or return you received from the investment." },
    { step: 3, title: "See your ROI percentage", description: "Instantly see your ROI percentage and net profit or loss." },
  ],
  relatedTools: ["compound-interest-calculator", "profit-margin-calculator", "loan-calculator"],
  schema: "WebApplication",
  adsPositions: ["top", "after-tool"],
};
export default config;
