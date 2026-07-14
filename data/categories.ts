import type { Category } from "@/types/tool";

export const categories: Category[] = [
  {
    slug: "social-media",
    name: "Social Media",
    description: "Download videos from Facebook, TikTok, Instagram, YouTube and more",
    icon: "📱",
    color: "blue",
  },
  {
    slug: "video",
    name: "Video Tools",
    description: "Download, convert and extract from online videos",
    icon: "🎬",
    color: "pink",
  },
  {
    slug: "pdf",
    name: "PDF Tools",
    description: "Convert, merge, compress and edit PDFs",
    icon: "📄",
    color: "red",
  },
  {
    slug: "image",
    name: "Image Tools",
    description: "Edit, convert and optimize images",
    icon: "🖼️",
    color: "purple",
  },
  {
    slug: "calculators",
    name: "Calculators",
    description: "Financial, health and math calculators",
    icon: "🧮",
    color: "green",
  },
  {
    slug: "finance",
    name: "Finance Tools",
    description: "Currency, ROI, profit and investment calculators",
    icon: "💰",
    color: "emerald",
  },
  {
    slug: "health",
    name: "Health Tools",
    description: "Calorie, BMI, sleep and fitness calculators",
    icon: "❤️",
    color: "rose",
  },
  {
    slug: "text",
    name: "Text Tools",
    description: "Word count, case converter and more",
    icon: "📝",
    color: "yellow",
  },
  {
    slug: "developer",
    name: "Developer Tools",
    description: "JSON, Base64, regex and coding utilities",
    icon: "💻",
    color: "gray",
  },
  {
    slug: "seo",
    name: "SEO Tools",
    description: "Meta tags, robots.txt and Open Graph generators",
    icon: "🔍",
    color: "orange",
  },
  {
    slug: "qr",
    name: "QR Code",
    description: "Generate and read QR codes instantly",
    icon: "📲",
    color: "indigo",
  },
  {
    slug: "utilities",
    name: "Utilities",
    description: "Timer, dice, randomizers and everyday tools",
    icon: "🔧",
    color: "amber",
  },
  {
    slug: "network",
    name: "Network Tools",
    description: "IP lookup, DNS and web diagnostics",
    icon: "🌐",
    color: "cyan",
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
