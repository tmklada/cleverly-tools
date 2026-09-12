import type { ToolConfig } from "@/types/tool";
const config: ToolConfig = {
  slug: "compress-pdf",
  title: "Compress PDF",
  description: "Reduce PDF file size without losing quality. Ideal for emailing large documents, uploading to websites, or saving storage space — compress your PDF online for free in seconds.",
  shortDescription: "Reduce PDF file size online for free",
  category: "pdf",
  keywords: ["compress pdf", "reduce pdf size", "pdf compressor", "shrink pdf", "pdf size reducer", "compress pdf online", "make pdf smaller"],
  icon: "🗜️",
  featured: true,
  toolType: "pdf",
  faq: [
    { question: "How much can I reduce a PDF file size?", answer: "Compression results vary by file content. Most PDFs can be reduced by 20–80% depending on the number of images and embedded fonts." },
    { question: "Will compression affect the quality of my PDF?", answer: "No. The tool rewrites the PDF structure and removes unused objects and metadata without re-encoding images, so text, images and layout stay exactly as they were. Because it is lossless, the size reduction depends on how much redundant data the original file contained." },
    { question: "Is there a file size limit?", answer: "You can compress PDF files up to 100MB for free. Larger files are supported on premium plans." },
  ],
  howItWorks: [
    { step: 1, title: "Upload your PDF", description: "Select or drag and drop the PDF file you want to compress." },
    { step: 2, title: "Click Compress", description: "The tool rewrites the PDF in your browser, stripping redundant objects and metadata. Nothing is uploaded." },
    { step: 3, title: "Download compressed PDF", description: "Click Compress and download the smaller PDF file instantly." },
  ],
  relatedTools: ["merge-pdf", "split-pdf", "rotate-pdf"],
  schema: "WebApplication",
  adsPositions: ["top", "after-tool"],
};
export default config;
