import type { ToolConfig } from "@/types/tool";
import facebookVideoDownloader from "./facebook-video-downloader";
import tiktokVideoDownloader from "./tiktok-video-downloader";
import instagramVideoDownloader from "./instagram-video-downloader";

export const allTools: ToolConfig[] = [
  facebookVideoDownloader,
  tiktokVideoDownloader,
  instagramVideoDownloader,
];

export function getToolBySlug(slug: string): ToolConfig | undefined {
  return allTools.find((t) => t.slug === slug);
}

export function getToolsByCategory(category: string): ToolConfig[] {
  return allTools.filter((t) => t.category === category);
}

export function getRelatedTools(slugs: string[]): ToolConfig[] {
  return slugs
    .map((slug) => getToolBySlug(slug))
    .filter(Boolean) as ToolConfig[];
}

export function getFeaturedTools(): ToolConfig[] {
  return allTools.filter((t) => t.featured);
}

export function getTrendingTools(): ToolConfig[] {
  return allTools.filter((t) => t.trending);
}

export function getNewTools(): ToolConfig[] {
  return allTools.filter((t) => t.isNew);
}
