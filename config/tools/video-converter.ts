import type { ToolConfig } from "@/types/tool";
const config: ToolConfig = {
  slug: "video-converter",
  title: "Video Converter",
  description: "Convert videos between MP4, WebM, GIF, and MP3 formats entirely in your browser. No upload, no watermark, completely free.",
  shortDescription: "Convert videos to MP4, WebM, GIF, MP3 — free & private",
  category: "video",
  keywords: [
    "video converter online free", "convert video to mp4 free", "convert video to gif",
    "video to mp3 online free", "webm to mp4 converter", "free online video converter",
    "convert video without upload", "browser video converter",
  ],
  icon: "🎬",
  isNew: true,
  toolType: "converter",
  faq: [
    { question: "Is the video conversion free?", answer: "Yes, 100% free with no limits and no watermarks." },
    { question: "Do my videos get uploaded to a server?", answer: "No. All conversion happens in your browser using WebAssembly technology. Your videos never leave your device." },
    { question: "What video formats are supported?", answer: "Input: MP4, MOV, AVI, MKV, WebM. Output: MP4, WebM, GIF (animated), MP3 (audio extraction)." },
    { question: "Why is the first conversion slow?", answer: "The first time, your browser downloads the FFmpeg WASM module (~30MB). After that, conversions are fast." },
  ],
  howItWorks: [
    { step: 1, title: "Upload your video", description: "Select any video file — MP4, MOV, AVI, MKV or WebM." },
    { step: 2, title: "Choose output format", description: "Select MP4, WebM, GIF or MP3." },
    { step: 3, title: "Convert and download", description: "Your browser converts the video locally. Download the result instantly." },
  ],
  relatedTools: ["youtube-video-downloader", "youtube-to-mp3", "image-converter"],
  schema: "WebApplication",
  adsPositions: ["top", "after-tool"],
};
export default config;
