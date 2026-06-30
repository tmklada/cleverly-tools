import type { ToolConfig } from "@/types/tool";
const config: ToolConfig = {
  slug: "loan-calculator",
  title: "Loan Calculator",
  description: "Calculate your monthly loan payments, total interest, and amortization schedule. Works for mortgages, car loans, personal loans and more.",
  shortDescription: "Calculate monthly loan payments & total interest",
  category: "calculators",
  keywords: ["loan calculator", "mortgage calculator", "monthly payment calculator", "interest calculator", "car loan calculator", "personal loan calculator"],
  icon: "🏦",
  toolType: "calculator",
  faq: [
    { question: "How is the monthly payment calculated?", answer: "Monthly payment = P × [r(1+r)^n] / [(1+r)^n - 1], where P = principal, r = monthly rate, n = number of payments." },
    { question: "Does this include taxes and insurance?", answer: "No, this calculator shows the principal and interest only. Add your local taxes and insurance separately." },
    { question: "Can I use this for a mortgage?", answer: "Yes, enter the loan amount, interest rate and term in years to calculate mortgage payments." },
  ],
  howItWorks: [
    { step: 1, title: "Enter loan amount", description: "Type the total amount you want to borrow." },
    { step: 2, title: "Enter interest rate & term", description: "Add the annual interest rate and loan duration in years." },
    { step: 3, title: "See your payment breakdown", description: "Instantly see monthly payment, total interest and total cost." },
  ],
  relatedTools: ["bmi-calculator", "age-calculator", "percentage-calculator"],
  schema: "WebApplication",
  adsPositions: ["top", "after-tool"],
};
export default config;
