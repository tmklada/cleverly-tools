import type { Category } from "@/types/tool";

export const categories: Category[] = [
  {
    slug: "social-media",
    name: "Social Media",
    description: "Download and manage social media content",
    icon: "📱",
    color: "blue",
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
    slug: "video",
    name: "Video Tools",
    description: "Download, convert and edit videos",
    icon: "🎬",
    color: "pink",
  },
  {
    slug: "calculators",
    name: "Calculators",
    description: "Financial, health and math calculators",
    icon: "🧮",
    color: "green",
  },
  {
    slug: "text",
    name: "Text Tools",
    description: "Word count, case converter and more",
    icon: "📝",
    color: "yellow",
  },
  {
    slug: "seo",
    name: "SEO Tools",
    description: "Optimize your website for search engines",
    icon: "🔍",
    color: "orange",
  },
  {
    slug: "developer",
    name: "Developer Tools",
    description: "JSON, Base64, regex and coding utilities",
    icon: "💻",
    color: "gray",
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
