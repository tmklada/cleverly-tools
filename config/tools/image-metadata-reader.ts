import type { ToolConfig } from "@/types/tool";
const config: ToolConfig = {
  slug: "image-metadata-reader",
  title: "Image EXIF Metadata Reader",
  description: "Read and display EXIF metadata from JPEG and PNG photos online for free, including full GPS coordinates with a map link, camera make and model, lens, exposure time, aperture, ISO, focal length, software, and the original capture date. No upload to a server — all processing is local.",
  shortDescription: "View hidden EXIF data and GPS location from photos instantly",
  category: "image",
  keywords: ["image metadata reader", "exif viewer gps", "exif reader", "photo metadata", "exif data viewer", "photo gps location viewer", "image exif online", "read exif data", "photo information extractor"],
  icon: "📋",
  toolType: "image",
  faq: [
    { question: "What is EXIF data?", answer: "EXIF is hidden metadata stored inside photos by cameras and smartphones, including camera settings, date taken, and often the GPS coordinates of where the photo was shot." },
    { question: "Can I see the GPS location a photo was taken?", answer: "Yes — if the photo's GPS tags are present, the tool decodes them from degrees/minutes/seconds into decimal latitude and longitude, shows the altitude and GPS timestamp, gives you a copyable \"lat, lng\" string, and links straight to Google Maps." },
    { question: "Which camera settings does it show?", answer: "Exposure time (formatted as 1/250 s), aperture (f/2.8), ISO, focal length, 35mm equivalent, exposure bias, metering mode, flash, white balance, lens make and model, and the full DateTimeOriginal capture timestamp — whichever of these the file actually contains." },
    { question: "Does it work with PNG files?", answer: "Yes — PNG files are parsed too: dimensions, bit depth, color type, and interlacing from the IHDR chunk, plus any tEXt/iTXt text chunks and an embedded eXIf block. If a file carries no metadata at all, the tool says so explicitly." },
    { question: "Is my photo uploaded to a server?", answer: "No — all EXIF reading happens entirely in your browser, so your photos remain completely private." },
  ],
  howItWorks: [
    { step: 1, title: "Upload your photo", description: "Select a photo from your device — file name, size, type, and dimensions are shown for any image format, with full metadata parsing for JPEG and PNG." },
    { step: 2, title: "Read the metadata", description: "Camera and lens details, exposure settings, timestamps, and decoded GPS coordinates are extracted and displayed instantly." },
    { step: 3, title: "Check the location", description: "If GPS coordinates are embedded, copy the \"lat, lng\" pair or open the exact spot in Google Maps — then strip the metadata before sharing the photo." },
  ],
  relatedTools: ["image-compressor", "image-converter", "image-resizer"],
  schema: "WebApplication",
  adsPositions: ["top", "after-tool"],
};
export default config;
