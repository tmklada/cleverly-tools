import type { ToolConfig } from "@/types/tool";
const config: ToolConfig = {
  slug: "invoice-generator",
  title: "Invoice Generator",
  description: "Create professional invoices online for free and download them as a PDF in one click. Add your logo, line items, taxes, and business details to send polished invoices to clients instantly — everything stays in your browser.",
  shortDescription: "Create and download professional invoices — free",
  category: "finance",
  keywords: ["invoice generator", "free invoice maker", "create invoice online", "invoice template", "pdf invoice", "invoice creator", "professional invoice", "billing invoice"],
  icon: "📄",
  isNew: true,
  toolType: "finance",
  faq: [
    { question: "Can I download the invoice as a PDF?", answer: "Yes. Click Download PDF and a properly formatted A4 PDF is generated right in your browser and saved to your device — no print dialog needed. Long invoices automatically continue onto extra pages. The Print button is still there if you'd rather print a paper copy." },
    { question: "Can I add my own logo?", answer: "Yes. Upload a PNG or JPG logo and it appears in the on-screen preview and in the downloaded PDF, scaled to fit the header while keeping its proportions. The image is read locally in your browser and never uploaded to a server." },
    { question: "Can I customize the business and client details?", answer: "Yes, you can edit your business name, address, and email, along with your client's name, address, and email, and the invoice preview updates instantly." },
    { question: "Is my invoice data saved?", answer: "Your draft is saved automatically in your own browser's local storage, so refreshing or reopening the page brings back what you already filled in. Nothing is ever uploaded to our servers, and the Clear invoice button wipes the saved draft whenever you want to start over." },
  ],
  howItWorks: [
    { step: 1, title: "Enter business and client details", description: "Fill in your business information, optionally upload a PNG or JPG logo, and add your client's name and address." },
    { step: 2, title: "Add line items and taxes", description: "Add your products or services with quantities, rates, and any applicable taxes. Your draft is saved in your browser as you type." },
    { step: 3, title: "Download the PDF", description: "Click Download PDF to save a clean, ready-to-send A4 invoice file, or use the Print button for a paper copy." },
  ],
  relatedTools: ["vat-calculator", "tip-calculator", "profit-margin-calculator"],
  schema: "WebApplication",
  adsPositions: ["top", "after-tool"],
};
export default config;
