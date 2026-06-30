import type { ToolConfig } from "@/types/tool";
const config: ToolConfig = {
  slug: "image-metadata-reader",
  title: "Image EXIF Metadata Reader",
  description: "Read and display hidden EXIF metadata from any photo online for free, including camera model, GPS location, date taken, and settings. No upload to a server — all processing is local.",
  shortDescription: "View hidden EXIF data from photos instantly",
  category: "image",
  keywords: ["image metadata reader", "exif reader", "photo metadata", "exif data viewer", "image exif online", "read exif data", "photo information extractor"],
  icon: "📋",
  toolType: "image",
  faq: [
    { question: "What is EXIF data?", answer: "EXIF is hidden metadata stored inside photos by cameras and smartphones, including camera settings, date taken, and sometimes GPS coordinates." },
    { question: "Can I see GPS location from a photo?", answer: "If your camera or phone embedded GPS data in the photo, it will be shown on a map — otherwise that field will be empty." },
    { question: "Is my photo uploaded to a server?", answer: "No — all EXIF reading happens entirely in your browser, so your photos remain completely private." },
  ],
  howItWorks: [
    { step: 1, title: "Upload your photo", description: "Select a JPG, TIFF, or HEIC photo from your device." },
    { step: 2, title: "Read the metadata", description: "All available EXIF fields are extracted and displayed instantly." },
    { step: 3, title: "Review or export", description: "Browse the metadata or copy specific values as needed." },
  ],
  relatedTools: ["image-compressor", "image-converter", "image-resizer"],
  schema: "WebApplication",
  adsPositions: ["top", "after-tool"],
};
export default config;
