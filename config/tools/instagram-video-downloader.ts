import type { ToolConfig } from "@/types/tool";

const config: ToolConfig = {
  slug: "instagram-video-downloader",
  title: "Instagram Video Downloader",
  description:
    "Download Instagram videos, Reels and IGTV for free. Paste any public Instagram URL and save HD videos instantly — no login required.",
  shortDescription: "Download Instagram Reels & videos — free & fast",
  category: "social-media",
  keywords: [
    "instagram video downloader",
    "download instagram video",
    "instagram reels downloader",
    "save instagram video",
    "instagram mp4 download",
    "download instagram reels",
    "igtv downloader",
    "instagram hd downloader",
  ],
  icon: "📸",
  featured: true,
  trending: true,
  faq: [
    {
      question: "Can I download Instagram Reels?",
      answer:
        "Yes. This tool works with Instagram Reels, regular videos, and IGTV. Just paste the URL.",
    },
    {
      question: "Does it work with private Instagram accounts?",
      answer:
        "No. Only public videos can be downloaded. Private account content requires login and cannot be accessed.",
    },
    {
      question: "Is Instagram video downloading free?",
      answer:
        "Completely free. No account needed, no download limits.",
    },
    {
      question: "What quality is the download?",
      answer:
        "We download the highest quality available from the original Instagram video, usually HD.",
    },
    {
      question: "Can I download Instagram photos too?",
      answer:
        "Currently we support video/Reels download. An Instagram photo downloader is coming soon.",
    },
  ],
  howItWorks: [
    {
      step: 1,
      title: "Copy the Instagram video URL",
      description:
        "Open Instagram, tap the three-dot menu on a video post, and select 'Copy Link'.",
    },
    {
      step: 2,
      title: "Paste the link",
      description:
        "Paste the copied Instagram URL into the input field above and click 'Download'.",
    },
    {
      step: 3,
      title: "Download your video",
      description:
        "Click the download button that appears. Your video will be saved as an MP4 file.",
    },
  ],
  relatedTools: [
    "facebook-video-downloader",
    "tiktok-video-downloader",
    "twitter-video-downloader",
    "youtube-video-downloader",
  ],
  schema: "SoftwareApplication",
  adsPositions: ["top", "after-tool", "sidebar"],
};

export default config;
