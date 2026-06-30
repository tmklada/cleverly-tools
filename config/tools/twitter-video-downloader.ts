import type { ToolConfig } from "@/types/tool";
const config: ToolConfig = {
  slug: "twitter-video-downloader",
  title: "Twitter/X Video Downloader",
  description: "Download videos from Twitter and X (formerly Twitter) directly to your device for free. Just paste the tweet URL and save the video in HD quality — no app or login required.",
  shortDescription: "Download Twitter and X videos for free",
  category: "social-media",
  keywords: ["twitter video downloader", "x video downloader", "download twitter video", "save twitter video", "tweet video download", "download x video free", "twitter video saver"],
  icon: "🐦",
  isNew: true,
  toolType: "downloader",
  faq: [
    { question: "How do I download a Twitter video?", answer: "Copy the tweet URL that contains the video, paste it into the input field on this page, and click Download. Choose your preferred quality and save the file." },
    { question: "Can I download videos from X (formerly Twitter)?", answer: "Yes. This tool works with both the original Twitter links (twitter.com) and the new X links (x.com)." },
    { question: "What video quality options are available?", answer: "You can download videos in the available qualities provided by Twitter/X, which typically include SD (360p or 480p) and HD (720p or 1080p)." },
  ],
  howItWorks: [
    { step: 1, title: "Copy the tweet URL", description: "Open the tweet with the video on Twitter or X and copy the link from your browser." },
    { step: 2, title: "Paste the URL", description: "Paste the tweet URL into the input field on this page and click Download." },
    { step: 3, title: "Save the video", description: "Choose your preferred quality and download the video to your device." },
  ],
  relatedTools: ["instagram-video-downloader", "tiktok-video-downloader", "youtube-video-downloader"],
  schema: "WebApplication",
  adsPositions: ["top", "after-tool"],
};
export default config;
