import type { ToolConfig } from "@/types/tool";

const config: ToolConfig = {
  slug: "tiktok-video-downloader",
  title: "TikTok Video Downloader",
  description:
    "Download TikTok videos without watermark for free. Paste any TikTok video URL and save it in HD quality — no app needed.",
  shortDescription: "Download TikTok videos without watermark — free",
  category: "social-media",
  keywords: [
    "tiktok video downloader",
    "download tiktok video",
    "tiktok downloader no watermark",
    "save tiktok video",
    "tiktok mp4 download",
    "tiktok without watermark",
    "download tiktok online",
    "tiktok hd downloader",
  ],
  icon: "🎵",
  featured: true,
  trending: true,
  faq: [
    {
      question: "Can I download TikTok videos without watermark?",
      answer:
        "Yes. Our tool downloads TikTok videos without the TikTok watermark so you get a clean video file.",
    },
    {
      question: "Is this TikTok downloader free?",
      answer:
        "100% free. No sign-up, no limits, no hidden fees.",
    },
    {
      question: "Does it work on iPhone and Android?",
      answer:
        "Yes. Our online tool works on all devices — iPhone, Android, PC, Mac — no app installation needed.",
    },
    {
      question: "What format are TikTok videos downloaded in?",
      answer:
        "Videos are saved as MP4 files in the highest available quality.",
    },
    {
      question: "Can I download TikTok audio only?",
      answer:
        "Currently we support video download (MP4). Audio-only (MP3) extraction is coming soon.",
    },
  ],
  howItWorks: [
    {
      step: 1,
      title: "Copy TikTok video link",
      description:
        "Open TikTok, tap the Share button on any video, then tap 'Copy Link'.",
    },
    {
      step: 2,
      title: "Paste & process",
      description:
        "Paste the link into the box above and click 'Download'. We'll fetch the video without watermark.",
    },
    {
      step: 3,
      title: "Save the video",
      description:
        "Click the download button to save the MP4 file directly to your device.",
    },
  ],
  relatedTools: [
    "facebook-video-downloader",
    "instagram-video-downloader",
    "twitter-video-downloader",
    "youtube-video-downloader",
  ],
  schema: "SoftwareApplication",
  adsPositions: ["top", "after-tool", "sidebar"],
};

export default config;
