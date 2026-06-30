import type { ToolConfig } from "@/types/tool";

// Social Media
import facebookVideoDownloader from "./facebook-video-downloader";
import tiktokVideoDownloader from "./tiktok-video-downloader";
import instagramVideoDownloader from "./instagram-video-downloader";
import youtubeVideoDownloader from "./youtube-video-downloader";
import twitterVideoDownloader from "./twitter-video-downloader";

// PDF
import mergePdf from "./merge-pdf";
import splitPdf from "./split-pdf";
import rotatePdf from "./rotate-pdf";
import compressPdf from "./compress-pdf";

// Image
import imageResizer from "./image-resizer";
import imageConverter from "./image-converter";
import imageCompressor from "./image-compressor";
import imageToBase64 from "./image-to-base64";

// Calculators
import bmiCalculator from "./bmi-calculator";
import loanCalculator from "./loan-calculator";
import ageCalculator from "./age-calculator";
import percentageCalculator from "./percentage-calculator";
import unitConverter from "./unit-converter";
import temperatureConverter from "./temperature-converter";
import scientificCalculator from "./scientific-calculator";

// Text
import wordCounter from "./word-counter";
import textCaseConverter from "./text-case-converter";
import loremIpsumGenerator from "./lorem-ipsum-generator";
import textToSlug from "./text-to-slug";
import markdownToHtml from "./markdown-to-html";

// Developer
import jsonFormatter from "./json-formatter";
import passwordGenerator from "./password-generator";
import base64Encoder from "./base64-encoder";
import urlEncoder from "./url-encoder";
import hashGenerator from "./hash-generator";
import colorPicker from "./color-picker";
import regexTester from "./regex-tester";

export const allTools: ToolConfig[] = [
  // Social Media
  facebookVideoDownloader,
  tiktokVideoDownloader,
  instagramVideoDownloader,
  youtubeVideoDownloader,
  twitterVideoDownloader,
  // PDF
  mergePdf,
  splitPdf,
  rotatePdf,
  compressPdf,
  // Image
  imageResizer,
  imageConverter,
  imageCompressor,
  imageToBase64,
  // Calculators
  bmiCalculator,
  loanCalculator,
  ageCalculator,
  percentageCalculator,
  unitConverter,
  temperatureConverter,
  scientificCalculator,
  // Text
  wordCounter,
  textCaseConverter,
  loremIpsumGenerator,
  textToSlug,
  markdownToHtml,
  // Developer
  jsonFormatter,
  passwordGenerator,
  base64Encoder,
  urlEncoder,
  hashGenerator,
  colorPicker,
  regexTester,
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
