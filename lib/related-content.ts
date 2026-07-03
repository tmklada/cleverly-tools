import { getAllPosts, type BlogPost } from "./blog";

// Map tool slugs to related article slugs
const TOOL_TO_ARTICLES: Record<string, string[]> = {
  "facebook-video-downloader": [
    "how-to-download-facebook-videos",
    "how-to-download-facebook-reels",
    "best-free-online-tools-2026",
  ],
  "tiktok-video-downloader": [
    "how-to-download-tiktok-videos-without-watermark",
    "how-to-download-tiktok-without-app",
  ],
  "instagram-video-downloader": [
    "how-to-download-instagram-reels",
    "how-to-save-instagram-videos",
  ],
  "youtube-video-downloader": [
    "how-to-download-youtube-videos",
  ],
  "twitter-video-downloader": [
    "how-to-download-twitter-videos",
  ],
  "merge-pdf": [
    "how-to-merge-pdf-files-free",
    "best-pdf-tools-online-free",
  ],
  "compress-pdf": [
    "how-to-compress-pdf-free",
    "how-to-compress-pdf-without-losing-quality",
    "best-pdf-tools-online-free",
  ],
  "split-pdf": [
    "how-to-split-pdf-online",
    "best-pdf-tools-online-free",
  ],
  "rotate-pdf": [
    "how-to-rotate-pdf-pages",
    "best-pdf-tools-online-free",
  ],
  "bmi-calculator": [
    "bmi-calculator-guide",
    "how-to-calculate-bmi-manually",
  ],
  "loan-calculator": [
    "free-online-loan-calculator",
    "mortgage-calculator-guide",
  ],
  "age-calculator": [
    "age-calculator-guide",
  ],
  "image-resizer": [
    "how-to-resize-image-online",
  ],
  "image-converter": [
    "how-to-convert-image-to-jpg-png",
    "how-to-convert-jpg-to-png",
    "how-to-convert-png-to-jpg",
  ],
  "image-compressor": [
    "how-to-compress-images-free",
  ],
  "image-to-base64": [
    "image-to-base64-converter-guide",
  ],
  "json-formatter": [
    "how-to-format-json-online",
    "what-is-json-complete-guide",
  ],
  "password-generator": [
    "how-to-generate-strong-password",
    "best-password-practices-2026",
  ],
  "base64-encoder": [
    "what-is-base64-encoding",
  ],
  "url-encoder": [
    "url-encode-decode-guide",
  ],
  "hash-generator": [
    "sha256-hash-generator-guide",
  ],
  "word-counter": [
    "how-to-count-words-online",
  ],
  "text-case-converter": [
    "how-to-convert-text-case",
  ],
  "lorem-ipsum-generator": [
    "how-to-generate-lorem-ipsum",
  ],
  "text-to-slug": [
    "how-to-make-slug-from-text",
  ],
  "markdown-to-html": [
    "markdown-guide-for-beginners",
  ],
  "regex-tester": [
    "how-to-use-regex-tester",
  ],
  "unit-converter": [
    "unit-converter-guide",
  ],
  "temperature-converter": [
    "temperature-converter-celsius-fahrenheit",
  ],
  "scientific-calculator": [
    "scientific-calculator-online",
    "free-scientific-calculator-guide",
  ],
  "percentage-calculator": [
    "how-to-calculate-percentage-increase",
  ],
  "compound-interest-calculator": [
    "free-online-loan-calculator",
  ],
  "color-picker": [
    "color-codes-hex-rgb-hsl-guide",
  ],
  "css-gradient-generator": [
    "color-codes-hex-rgb-hsl-guide",
  ],
  "meta-tag-generator": [
    "best-free-online-tools-2026",
  ],
  "body-fat-calculator": [
    "bmi-calculator-guide",
    "how-to-calculate-bmi-manually",
  ],
  "sleep-calculator": [
    "bmi-calculator-guide",
  ],
  "calorie-calculator": [
    "bmi-calculator-guide",
  ],
  "youtube-thumbnail-downloader": [
    "how-to-download-youtube-videos",
  ],
  "youtube-to-mp3": [
    "how-to-download-youtube-videos",
  ],
};

export function getRelatedArticles(toolSlug: string, limit = 3): BlogPost[] {
  const slugs = TOOL_TO_ARTICLES[toolSlug] ?? [];
  if (slugs.length === 0) return [];

  const allPosts = getAllPosts();
  return slugs
    .map(s => allPosts.find(p => p.slug === s))
    .filter(Boolean)
    .slice(0, limit) as BlogPost[];
}
