import type { ToolConfig } from "@/types/tool";
const config: ToolConfig = {
  slug: "merge-pdf",
  title: "Merge PDF",
  description: "Combine multiple PDF files into a single document in seconds. Upload your PDFs, arrange them in the right order, and download the merged file instantly — no registration required.",
  shortDescription: "Combine multiple PDFs into one file",
  category: "pdf",
  keywords: ["merge pdf", "combine pdf", "join pdf", "pdf merger", "merge pdf files", "combine pdf files online", "pdf joiner"],
  icon: "📎",
  featured: true,
  toolType: "pdf",
  faq: [
    { question: "How many PDFs can I merge at once?", answer: "You can merge multiple PDF files at once. Simply upload all the files you want to combine and arrange them in your preferred order before merging." },
    { question: "Is my data safe when merging PDFs?", answer: "Yes. Your files are processed in the browser and are never stored on our servers. Your documents remain completely private." },
    { question: "Will the quality be affected after merging?", answer: "No. The merge process preserves the original quality, formatting, and content of all your PDF files." },
  ],
  howItWorks: [
    { step: 1, title: "Upload your PDF files", description: "Click to upload or drag and drop multiple PDF files you want to combine." },
    { step: 2, title: "Arrange the order", description: "Drag the files to set the order in which they should appear in the merged PDF." },
    { step: 3, title: "Download merged PDF", description: "Click Merge and download your combined PDF file instantly." },
  ],
  relatedTools: ["split-pdf", "compress-pdf", "rotate-pdf"],
  schema: "WebApplication",
  adsPositions: ["top", "after-tool"],
};
export default config;
