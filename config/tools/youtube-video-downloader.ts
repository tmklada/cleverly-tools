import type { ToolConfig } from "@/types/tool";
const config: ToolConfig = {
  slug: "youtube-video-downloader",
  title: "YouTube Video Downloader",
  description: "Download YouTube videos in HD, 4K, and MP3 for free. Paste any YouTube URL and save it instantly — no software needed.",
  shortDescription: "Download YouTube videos in HD & 4K — free",
  category: "social-media",
  keywords: ["youtube video downloader", "download youtube video", "youtube to mp4", "youtube hd download", "save youtube video", "youtube downloader free"],
  icon: "▶️",
  featured: true,
  trending: true,
  toolType: "downloader",
  faq: [
    { question: "Is it free to download YouTube videos?", answer: "Yes, completely free with no limits." },
    { question: "What quality can I download YouTube videos in?", answer: "Up to 1080p HD or 4K depending on the original video." },
    { question: "Can I download YouTube Shorts?", answer: "Yes, YouTube Shorts URLs are supported." },
    { question: "Is downloading YouTube videos legal?", answer: "Downloading for personal, offline viewing is generally accepted. Do not redistribute copyrighted content." },
  ],
  howItWorks: [
    { step: 1, title: "Copy YouTube URL", description: "Go to YouTube, open any video, copy the URL from the address bar." },
    { step: 2, title: "Paste and click Download", description: "Paste the URL in the field above and click the Download button." },
    { step: 3, title: "Choose quality and save", description: "Select your preferred quality and right-click the video to save." },
  ],
  relatedTools: ["facebook-video-downloader", "tiktok-video-downloader", "instagram-video-downloader"],
  schema: "SoftwareApplication",
  adsPositions: ["top", "after-tool", "sidebar"],
};
export default config;
