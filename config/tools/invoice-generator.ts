import type { ToolConfig } from "@/types/tool";
const config: ToolConfig = {
  slug: "invoice-generator",
  title: "Invoice Generator",
  description: "Create professional invoices online for free and print them or save them as PDF. Add line items, taxes, and your business details to send polished invoices to clients instantly.",
  shortDescription: "Create and download professional invoices — free",
  category: "finance",
  keywords: ["invoice generator", "free invoice maker", "create invoice online", "invoice template", "pdf invoice", "invoice creator", "professional invoice", "billing invoice"],
  icon: "📄",
  isNew: true,
  toolType: "finance",
  faq: [
    { question: "Can I download the invoice as a PDF?", answer: "Yes. Click Print / Download Invoice and choose \"Save as PDF\" as the destination in your browser's print dialog to save a PDF copy." },
    { question: "Can I customize the business and client details?", answer: "Yes, you can edit your business name, address, and email, along with your client's name, address, and email, and the invoice preview updates instantly." },
    { question: "Is my invoice data saved?", answer: "Your invoice data stays only in your browser for the current session. Nothing is uploaded to our servers, but it isn't saved permanently either, so refreshing the page will clear it." },
  ],
  howItWorks: [
    { step: 1, title: "Enter business and client details", description: "Fill in your business information and your client's name and address." },
    { step: 2, title: "Add line items and taxes", description: "Add your products or services with quantities, rates, and any applicable taxes." },
    { step: 3, title: "Print or save as PDF", description: "Preview your invoice, then use your browser's print dialog to print it or save it as a PDF." },
  ],
  relatedTools: ["vat-calculator", "tip-calculator", "profit-margin-calculator"],
  schema: "WebApplication",
  adsPositions: ["top", "after-tool"],
};
export default config;
