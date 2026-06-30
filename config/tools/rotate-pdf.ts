import type { ToolConfig } from "@/types/tool";
const config: ToolConfig = {
  slug: "rotate-pdf",
  title: "Rotate PDF",
  description: "Rotate PDF pages 90, 180, or 270 degrees in a single click. Fix upside-down or sideways pages and save the corrected PDF instantly — no account needed.",
  shortDescription: "Rotate PDF pages 90, 180 or 270 degrees",
  category: "pdf",
  keywords: ["rotate pdf", "rotate pdf pages", "flip pdf", "rotate pdf online", "turn pdf pages", "pdf rotator", "rotate pdf free"],
  icon: "🔄",
  toolType: "pdf",
  faq: [
    { question: "Can I rotate only specific pages?", answer: "Yes. You can choose to rotate all pages or select individual pages and apply different rotation angles to each one." },
    { question: "What rotation angles are supported?", answer: "You can rotate pages by 90°, 180°, or 270° clockwise. This covers all common orientations." },
    { question: "Will the rotation be saved permanently?", answer: "Yes. When you download the rotated PDF, the new orientation is saved permanently in the file." },
  ],
  howItWorks: [
    { step: 1, title: "Upload your PDF", description: "Select the PDF file that has pages with incorrect orientation." },
    { step: 2, title: "Select pages and angle", description: "Choose which pages to rotate and by how many degrees (90, 180, or 270)." },
    { step: 3, title: "Download the fixed PDF", description: "Click Rotate and download your corrected PDF file instantly." },
  ],
  relatedTools: ["merge-pdf", "split-pdf", "compress-pdf"],
  schema: "WebApplication",
  adsPositions: ["top", "after-tool"],
};
export default config;
