import type { ToolConfig } from "@/types/tool";
import facebookVideoDownloader from "./facebook-video-downloader";
import tiktokVideoDownloader from "./tiktok-video-downloader";
import instagramVideoDownloader from "./instagram-video-downloader";
import youtubeVideoDownloader from "./youtube-video-downloader";
import bmiCalculator from "./bmi-calculator";
import loanCalculator from "./loan-calculator";
import ageCalculator from "./age-calculator";
import percentageCalculator from "./percentage-calculator";
import wordCounter from "./word-counter";
import textCaseConverter from "./text-case-converter";
import jsonFormatter from "./json-formatter";
import passwordGenerator from "./password-generator";
import base64Encoder from "./base64-encoder";
import urlEncoder from "./url-encoder";

export const allTools: ToolConfig[] = [
  facebookVideoDownloader,
  tiktokVideoDownloader,
  instagramVideoDownloader,
  youtubeVideoDownloader,
  bmiCalculator,
  loanCalculator,
  ageCalculator,
  percentageCalculator,
  wordCounter,
  textCaseConverter,
  jsonFormatter,
  passwordGenerator,
  base64Encoder,
  urlEncoder,
];

export function getToolBySlug(slug: string): ToolConfig | undefined {
  return allTools.find((t) => t.slug === slug);
}

export function getToolsByCategory(category: string): ToolConfig[] {
  return allTools.filter((t) => t.category === category);
}

export function getRelatedTools(slugs: string[]): ToolConfig[] {
  return slugs.map((slug) => getToolBySlug(slug)).filter(Boolean) as ToolConfig[];
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
