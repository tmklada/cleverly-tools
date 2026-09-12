import type { ToolConfig } from "@/types/tool";
const config: ToolConfig = {
  slug: "rotate-pdf",
  title: "Rotate PDF",
  description: "Rotate PDF pages 90, 180, or 270 degrees — the whole document, a page range like 2, 5-7, or a different angle for each page. Rotation is added on top of each page's existing angle, and there is a reset-to-0° option. Fix sideways or upside-down pages and save the corrected PDF instantly — no account needed.",
  shortDescription: "Rotate all pages or selected pages by 90, 180 or 270 degrees",
  category: "pdf",
  keywords: ["rotate pdf", "rotate pdf pages", "flip pdf", "rotate pdf online", "turn pdf pages", "pdf rotator", "rotate pdf free"],
  icon: "🔄",
  toolType: "pdf",
  faq: [
    { question: "Can I rotate only specific pages?", answer: "Yes. Choose All pages for a whole sideways scan, Some pages to type a selection like 2, 5-7, or Page by page to give each page its own angle in one pass." },
    { question: "What rotation angles are supported?", answer: "You can rotate pages by 90°, 180°, or 270° clockwise, or reset a page back to 0°. Angles are applied on top of a page's existing rotation, so a page already at 90° rotated another 90° ends up at 180° rather than staying at 90°." },
    { question: "Will the rotation be saved permanently?", answer: "Yes. When you download the rotated PDF, the new orientation is saved permanently in the file." },
  ],
  howItWorks: [
    { step: 1, title: "Upload your PDF", description: "Select the PDF file that has pages with incorrect orientation." },
    { step: 2, title: "Choose the pages and the angle", description: "Rotate all pages, a selection like 2, 5-7, or set a different angle per page. Pick 90, 180, 270 degrees, or reset to 0." },
    { step: 3, title: "Download the fixed PDF", description: "Click Rotate and download your corrected PDF file instantly." },
  ],
  relatedTools: ["merge-pdf", "split-pdf", "compress-pdf"],
  schema: "WebApplication",
  adsPositions: ["top", "after-tool"],
};
export default config;
