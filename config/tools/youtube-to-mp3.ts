import type { ToolConfig } from "@/types/tool";
const config: ToolConfig = {
  slug: "youtube-to-mp3",
  title: "YouTube to MP3 Downloader",
  description: "Convert and download YouTube videos as high-quality MP3 audio files online for free with no software installation. Extract audio from any YouTube video in seconds.",
  shortDescription: "Download YouTube videos as MP3 audio files free",
  category: "social-media",
  keywords: ["youtube to mp3", "youtube mp3 downloader", "download youtube audio", "convert youtube to mp3", "youtube audio extractor", "free youtube downloader", "yt to mp3"],
  icon: "🎵",
  toolType: "downloader",
  featured: true,
  trending: true,
  faq: [
    { question: "What audio quality is available?", answer: "You can choose from 128kbps, 192kbps, and 320kbps MP3 quality — higher is better but results in a larger file." },
    { question: "Is there a video length limit?", answer: "Videos up to 2 hours long are supported for MP3 extraction." },
    { question: "Do I need to install anything?", answer: "No software installation is required — everything runs in your browser." },
  ],
  howItWorks: [
    { step: 1, title: "Paste the YouTube URL", description: "Copy the YouTube video link and paste it into the input field." },
    { step: 2, title: "Choose audio quality", description: "Select your preferred MP3 bitrate from the quality options." },
    { step: 3, title: "Download the MP3", description: "Click Download and save the audio file to your device." },
  ],
  relatedTools: ["facebook-video-downloader", "instagram-video-downloader", "bpm-calculator"],
  schema: "WebApplication",
  adsPositions: ["top", "after-tool"],
};
export default config;
