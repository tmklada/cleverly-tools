import type { ToolConfig } from "@/types/tool";

const config: ToolConfig = {
  slug: "facebook-video-downloader",
  title: "Facebook Video Downloader",
  description:
    "Download Facebook videos in HD quality for free. Paste any Facebook video URL and save it to your device instantly — no registration required.",
  shortDescription: "Download Facebook videos in HD — free & fast",
  category: "social-media",
  keywords: [
    "facebook video downloader",
    "download facebook video",
    "facebook video download",
    "save facebook video",
    "facebook hd downloader",
    "facebook mp4 downloader",
    "fb video downloader",
    "download fb video online",
  ],
  icon: "📘",
  featured: true,
  trending: true,
  faq: [
    {
      question: "Is it free to download Facebook videos?",
      answer:
        "Yes, cleverly.tools Facebook Video Downloader is completely free. No registration or subscription needed.",
    },
    {
      question: "What quality can I download Facebook videos in?",
      answer:
        "You can download in HD (high definition) or SD (standard definition) depending on what the original video was uploaded in.",
    },
    {
      question: "Can I download private Facebook videos?",
      answer:
        "No. This tool only works with public Facebook videos. Private videos require login and cannot be accessed.",
    },
    {
      question: "Is it legal to download Facebook videos?",
      answer:
        "Downloading public Facebook videos for personal use is generally considered fair use in most countries. Do not redistribute or use videos commercially without the owner's permission.",
    },
    {
      question: "What formats are supported?",
      answer:
        "Videos are downloaded as MP4 files, which is compatible with all devices and media players.",
    },
  ],
  howItWorks: [
    {
      step: 1,
      title: "Copy the Facebook video URL",
      description:
        "Open Facebook, find the video you want to download, click the three dots menu and select 'Copy link'.",
    },
    {
      step: 2,
      title: "Paste the URL",
      description:
        "Paste the copied URL into the input field above and click the Download button.",
    },
    {
      step: 3,
      title: "Choose quality and download",
      description:
        "Select HD or SD quality, then click the download link. The video will be saved to your device.",
    },
  ],
  relatedTools: [
    "tiktok-video-downloader",
    "instagram-video-downloader",
    "twitter-video-downloader",
    "youtube-video-downloader",
  ],
  schema: "SoftwareApplication",
  adsPositions: ["top", "after-tool", "sidebar"],
};

export default config;
