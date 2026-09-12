import type { ToolConfig } from "@/types/tool";
const config: ToolConfig = {
  slug: "split-pdf",
  title: "Split PDF",
  description: "Extract specific pages or split a PDF into multiple separate files in one pass. List several ranges like 1-3, 5, 8-10 to get one PDF per range, pull chosen pages into a single document, or split every page into its own file — free and instant, no software needed.",
  shortDescription: "Extract pages from a PDF file",
  category: "pdf",
  keywords: ["split pdf", "extract pdf pages", "pdf splitter", "split pdf online", "separate pdf pages", "pdf page extractor", "cut pdf"],
  icon: "✂️",
  isNew: true,
  toolType: "pdf",
  faq: [
    { question: "Can I extract specific pages from a PDF?", answer: "Yes. Enter pages and ranges together, such as 1-3, 5, 8-10, and choose the extract mode to save exactly those pages as one new PDF." },
    { question: "Can I split a PDF into multiple files?", answer: "Yes, in a single pass. Enter several ranges like 1-3, 5, 8-10 and the tool produces one PDF per range, each with its own download button plus a Download all option. There is also a mode that splits every page into its own file." },
    { question: "Does splitting a PDF reduce quality?", answer: "No. Splitting only separates pages and does not alter the content, resolution, or quality of any page." },
  ],
  howItWorks: [
    { step: 1, title: "Upload your PDF", description: "Select or drag and drop the PDF file you want to split." },
    { step: 2, title: "Pick a mode and enter your ranges", description: "Split into separate PDFs (one file per range), extract everything into one PDF, or split every page into its own file. Type ranges like 1-3, 5, 8-10." },
    { step: 3, title: "Download your files", description: "Every result gets its own download button, and Download all saves them one after another." },
  ],
  relatedTools: ["merge-pdf", "compress-pdf", "rotate-pdf"],
  schema: "WebApplication",
  adsPositions: ["top", "after-tool"],
};
export default config;
