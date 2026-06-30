import type { ToolConfig } from "@/types/tool";
const config: ToolConfig = {
  slug: "youtube-thumbnail-downloader",
  title: "YouTube Thumbnail Downloader",
  description: "Download YouTube video thumbnails in full HD quality for free. Just paste the video URL and save the thumbnail as a JPG image instantly.",
  shortDescription: "Download YouTube thumbnails in HD — free tool",
  category: "social-media",
  keywords: ["youtube thumbnail downloader", "download youtube thumbnail", "youtube thumbnail hd", "save youtube thumbnail", "youtube image downloader", "youtube thumbnail grabber", "youtube thumbnail saver"],
  icon: "🖼️",
  isNew: true,
  toolType: "downloader",
  faq: [
    { question: "What thumbnail sizes can I download?", answer: "You can download thumbnails in multiple resolutions including maxresdefault (1280×720), hqdefault (480×360), mqdefault (320×180), and sddefault (640×480)." },
    { question: "Is it legal to download YouTube thumbnails?", answer: "Thumbnails are publicly visible images. However, they may be copyrighted by the video creator, so use downloaded thumbnails only for personal or fair-use purposes." },
    { question: "Does this work on all YouTube videos?", answer: "Yes, it works on any public YouTube video. Private or unlisted videos may not have accessible thumbnails." },
  ],
  howItWorks: [
    { step: 1, title: "Paste the YouTube URL", description: "Copy the YouTube video link and paste it into the input field." },
    { step: 2, title: "Choose the quality", description: "Select your preferred thumbnail resolution from the available options." },
    { step: 3, title: "Download the thumbnail", description: "Click download to save the thumbnail image to your device." },
  ],
  relatedTools: ["youtube-video-downloader", "instagram-video-downloader", "image-compressor"],
  schema: "WebApplication",
  adsPositions: ["top", "after-tool"],
};
export default config;
