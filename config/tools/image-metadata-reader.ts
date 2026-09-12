import type { ToolConfig } from "@/types/tool";
const config: ToolConfig = {
  slug: "image-metadata-reader",
  title: "Image EXIF Metadata Reader",
  description: "Read and display file information and basic EXIF metadata from a JPEG photo online for free, including camera make and model, date/time, orientation, and whether GPS data is embedded. No upload to a server — all processing is local.",
  shortDescription: "View hidden EXIF data from photos instantly",
  category: "image",
  keywords: ["image metadata reader", "exif reader", "photo metadata", "exif data viewer", "image exif online", "read exif data", "photo information extractor"],
  icon: "📋",
  toolType: "image",
  faq: [
    { question: "What is EXIF data?", answer: "EXIF is hidden metadata stored inside photos by cameras and smartphones, including camera settings, date taken, and sometimes GPS coordinates." },
    { question: "Can I see GPS location from a photo?", answer: "The tool only flags whether GPS data is present in a JPEG's EXIF (shown as \"GPS: Present\") — it does not decode or display the actual coordinates or show a map." },
    { question: "Is my photo uploaded to a server?", answer: "No — all EXIF reading happens entirely in your browser, so your photos remain completely private." },
  ],
  howItWorks: [
    { step: 1, title: "Upload your photo", description: "Select a JPEG photo from your device — file name, size, type, and dimensions are shown for any image format, but EXIF data is only extracted from JPEGs." },
    { step: 2, title: "Read the metadata", description: "Available EXIF fields — camera make and model, orientation, resolution, date/time, artist, and GPS presence — are extracted and displayed instantly." },
    { step: 3, title: "Review or export", description: "Browse the metadata or copy specific values as needed." },
  ],
  relatedTools: ["image-compressor", "image-converter", "image-resizer"],
  schema: "WebApplication",
  adsPositions: ["top", "after-tool"],
};
export default config;
