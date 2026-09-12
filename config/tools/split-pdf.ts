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
    { question: "Can I extract specific pages from a PDF?", answer: "Yes. Enter a page range such as 2-5, or a single page like 7, and the tool saves exactly those pages as a new PDF." },
    { question: "Can I split a PDF into multiple files?", answer: "Run the tool once per range you need. Each run extracts one range into its own PDF, so a 30-page file can be split into three documents in three quick passes." },
    { question: "Does splitting a PDF reduce quality?", answer: "No. Splitting only separates pages and does not alter the content, resolution, or quality of any page." },
  ],
  howItWorks: [
    { step: 1, title: "Upload your PDF", description: "Select or drag and drop the PDF file you want to split." },
    { step: 2, title: "Enter the page range", description: "Type the first and last page you want to keep, for example 2 to 5." },
    { step: 3, title: "Download the new PDF", description: "Click Split and download a PDF containing only the pages you selected." },
  ],
  relatedTools: ["merge-pdf", "compress-pdf", "rotate-pdf"],
  schema: "WebApplication",
  adsPositions: ["top", "after-tool"],
};
export default config;
