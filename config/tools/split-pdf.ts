import type { ToolConfig } from "@/types/tool";
const config: ToolConfig = {
  slug: "split-pdf",
  title: "Split PDF",
  description: "Extract specific pages or split a PDF into multiple separate files with ease. Choose a page range or split every page into its own document — free and instant, no software needed.",
  shortDescription: "Extract pages from a PDF file",
  category: "pdf",
  keywords: ["split pdf", "extract pdf pages", "pdf splitter", "split pdf online", "separate pdf pages", "pdf page extractor", "cut pdf"],
  icon: "✂️",
  isNew: true,
  toolType: "pdf",
  faq: [
    { question: "Can I extract specific pages from a PDF?", answer: "Yes. You can select a custom page range (e.g. pages 2-5) or extract individual pages from your PDF file." },
    { question: "Can I split a PDF into multiple files?", answer: "Absolutely. You can split every page into its own PDF, or define multiple ranges to create several separate documents at once." },
    { question: "Does splitting a PDF reduce quality?", answer: "No. Splitting only separates pages and does not alter the content, resolution, or quality of any page." },
  ],
  howItWorks: [
    { step: 1, title: "Upload your PDF", description: "Select or drag and drop the PDF file you want to split." },
    { step: 2, title: "Choose pages or ranges", description: "Enter the page numbers or ranges you want to extract from the document." },
    { step: 3, title: "Download your files", description: "Click Split and download the extracted pages as individual PDF files." },
  ],
  relatedTools: ["merge-pdf", "compress-pdf", "rotate-pdf"],
  schema: "WebApplication",
  adsPositions: ["top", "after-tool"],
};
export default config;
