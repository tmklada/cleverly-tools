import type { ToolConfig } from "@/types/tool";
const config: ToolConfig = {
  slug: "invoice-generator",
  title: "Invoice Generator",
  description: "Create professional invoices online for free and download them as PDF. Add line items, taxes, and your branding to send polished invoices to clients instantly.",
  shortDescription: "Create and download professional invoices — free",
  category: "finance",
  keywords: ["invoice generator", "free invoice maker", "create invoice online", "invoice template", "pdf invoice", "invoice creator", "professional invoice", "billing invoice"],
  icon: "📄",
  isNew: true,
  toolType: "finance",
  faq: [
    { question: "Can I download the invoice as a PDF?", answer: "Yes, once you fill in all the details, you can download your invoice as a professional PDF ready to send to clients." },
    { question: "Can I add my logo to the invoice?", answer: "Yes, you can upload your business logo and it will appear on the invoice alongside your business name and contact details." },
    { question: "Is my invoice data saved?", answer: "Invoice data is stored locally in your browser for convenience. Nothing is uploaded to our servers, keeping your financial information private." },
  ],
  howItWorks: [
    { step: 1, title: "Enter business and client details", description: "Fill in your business information and your client's name and address." },
    { step: 2, title: "Add line items and taxes", description: "Add your products or services with quantities, rates, and any applicable taxes." },
    { step: 3, title: "Download as PDF", description: "Preview your invoice and download it as a PDF to send to your client." },
  ],
  relatedTools: ["vat-calculator", "tip-calculator", "profit-margin-calculator"],
  schema: "WebApplication",
  adsPositions: ["top", "after-tool"],
};
export default config;
