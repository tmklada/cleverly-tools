import type { ToolConfig } from "@/types/tool";
const config: ToolConfig = {
  slug: "favicon-generator",
  title: "Favicon Generator",
  description: "Generate favicon files from any image or text online for free and download all required sizes instantly. Creates a real multi-size favicon.ico plus PNGs at 16, 32, 48, 64, 180, 192, and 512 pixels for browsers, Apple devices, and Android — with the HTML head snippet and web manifest included.",
  shortDescription: "Create a favicon.ico and PNG favicons in every required size",
  category: "image",
  keywords: ["favicon generator", "favicon ico generator", "create favicon", "favicon from image", "ico generator", "png to ico", "website icon generator", "favicon maker", "apple touch icon generator"],
  icon: "⭐",
  toolType: "image",
  isNew: true,
  faq: [
    { question: "What sizes does a favicon need to be?", answer: "Browsers use 16x16 and 32x32, Apple devices use 180x180, and Android and PWAs use 192x192 and 512x512 — this tool generates all of them at once, plus 48x48 and 64x64." },
    { question: "Does this create a real .ico file?", answer: "Yes — it builds a genuine multi-resolution favicon.ico containing the 16, 32, and 48 pixel icons in one file, which is what browsers request from your site root by default." },
    { question: "What image format should I use as input?", answer: "PNG with a transparent background works best for crisp results, though JPG and WebP are also supported. You can also skip the image entirely and build an icon from a letter or emoji." },
    { question: "How do I add the favicon to my website?", answer: "Place the generated files in your root directory, paste the provided HTML link tags into your page head, and drop in the generated site.webmanifest for the 192 and 512 icons. Both blocks have a copy button." },
  ],
  howItWorks: [
    { step: 1, title: "Pick your source", description: "Upload a square image, or type one or two characters and choose colors to build an icon from text or an emoji." },
    { step: 2, title: "Generate every size", description: "The tool creates a real favicon.ico plus PNGs at 16, 32, 48, 64, 180, 192, and 512 pixels automatically." },
    { step: 3, title: "Download and paste", description: "Download everything as a ZIP (or file by file), then copy the ready-made head snippet and web manifest into your site." },
  ],
  relatedTools: ["image-converter", "image-resizer", "svg-to-png"],
  schema: "WebApplication",
  adsPositions: ["top", "after-tool"],
};
export default config;
