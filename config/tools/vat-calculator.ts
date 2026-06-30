import type { ToolConfig } from "@/types/tool";
const config: ToolConfig = {
  slug: "vat-calculator",
  title: "VAT Calculator",
  description: "Add or remove VAT from any price instantly. Calculate VAT amounts for any country's tax rate, useful for invoices, receipts, and business accounting.",
  shortDescription: "Add or remove VAT from prices — free calculator",
  category: "finance",
  keywords: ["vat calculator", "value added tax", "add vat", "remove vat", "vat inclusive", "vat exclusive", "tax calculator", "price with vat", "vat rate calculator"],
  icon: "🧾",
  toolType: "finance",
  faq: [
    { question: "How do I add VAT to a price?", answer: "To add VAT, multiply the net price by (1 + VAT rate). For example, a £100 item with 20% VAT becomes £120 (100 × 1.20)." },
    { question: "How do I remove VAT from a price?", answer: "To remove VAT from a gross price, divide by (1 + VAT rate). For a £120 price with 20% VAT: £120 / 1.20 = £100 net price." },
    { question: "Can I use any VAT rate?", answer: "Yes, you can enter any VAT or tax rate. Common rates include 20% (UK), 19% (Germany), 21% (Netherlands), and 10% (Australia GST)." },
  ],
  howItWorks: [
    { step: 1, title: "Enter the price", description: "Type the price you want to calculate VAT for." },
    { step: 2, title: "Set your VAT rate", description: "Enter your country's VAT rate percentage." },
    { step: 3, title: "Get the result", description: "Instantly see the VAT amount, net price, and gross price including tax." },
  ],
  relatedTools: ["profit-margin-calculator", "tip-calculator", "invoice-generator"],
  schema: "WebApplication",
  adsPositions: ["top", "after-tool"],
};
export default config;
