import type { ToolConfig } from "@/types/tool";

// Social Media Downloaders
import facebookVideoDownloader from "./facebook-video-downloader";
import tiktokVideoDownloader from "./tiktok-video-downloader";
import instagramVideoDownloader from "./instagram-video-downloader";
import youtubeVideoDownloader from "./youtube-video-downloader";
import twitterVideoDownloader from "./twitter-video-downloader";
import youtubeThumbnailDownloader from "./youtube-thumbnail-downloader";
import youtubeToMp3 from "./youtube-to-mp3";

// PDF Tools
import mergePdf from "./merge-pdf";
import splitPdf from "./split-pdf";
import rotatePdf from "./rotate-pdf";
import compressPdf from "./compress-pdf";

// Image Tools
import imageResizer from "./image-resizer";
import imageConverter from "./image-converter";
import imageCompressor from "./image-compressor";
import imageToBase64 from "./image-to-base64";
import imageCropper from "./image-cropper";
import imageFlipper from "./image-flipper";
import faviconGenerator from "./favicon-generator";
import svgToPng from "./svg-to-png";
import imageMetadataReader from "./image-metadata-reader";
import grayscaleImage from "./grayscale-image";
import imageColorPicker from "./image-color-picker";

// Calculators
import bmiCalculator from "./bmi-calculator";
import loanCalculator from "./loan-calculator";
import ageCalculator from "./age-calculator";
import percentageCalculator from "./percentage-calculator";
import unitConverter from "./unit-converter";
import temperatureConverter from "./temperature-converter";
import scientificCalculator from "./scientific-calculator";
import aspectRatioCalculator from "./aspect-ratio-calculator";
import dateCalculator from "./date-calculator";

// Finance
import compoundInterestCalculator from "./compound-interest-calculator";
import roiCalculator from "./roi-calculator";
import profitMarginCalculator from "./profit-margin-calculator";
import vatCalculator from "./vat-calculator";
import tipCalculator from "./tip-calculator";
import invoiceGenerator from "./invoice-generator";
import discountCalculator from "./discount-calculator";
import currencyConverter from "./currency-converter";

// Health
import calorieCalculator from "./calorie-calculator";
import waterIntakeCalculator from "./water-intake-calculator";
import idealWeightCalculator from "./ideal-weight-calculator";
import bodyFatCalculator from "./body-fat-calculator";
import sleepCalculator from "./sleep-calculator";
import heartRateCalculator from "./heart-rate-calculator";

// Text Tools
import wordCounter from "./word-counter";
import textCaseConverter from "./text-case-converter";
import loremIpsumGenerator from "./lorem-ipsum-generator";
import textToSlug from "./text-to-slug";
import markdownToHtml from "./markdown-to-html";
import textDiffChecker from "./text-diff-checker";
import textRepeater from "./text-repeater";
import htmlToText from "./html-to-text";
import stringReverse from "./string-reverse";
import textToAscii from "./text-to-ascii";
import morseCodeTranslator from "./morse-code-translator";
import numberToWords from "./number-to-words";

// Developer Tools
import jsonFormatter from "./json-formatter";
import passwordGenerator from "./password-generator";
import base64Encoder from "./base64-encoder";
import urlEncoder from "./url-encoder";
import hashGenerator from "./hash-generator";
import colorPicker from "./color-picker";
import regexTester from "./regex-tester";
import cssMinifier from "./css-minifier";
import cssGradientGenerator from "./css-gradient-generator";
import boxShadowGenerator from "./box-shadow-generator";
import borderRadiusGenerator from "./border-radius-generator";
import jsonToCsv from "./json-to-csv";
import csvToJson from "./csv-to-json";
import binaryToText from "./binary-to-text";
import passwordStrengthChecker from "./password-strength-checker";
import cronExpressionBuilder from "./cron-expression-builder";

// SEO Tools
import metaTagGenerator from "./meta-tag-generator";
import robotsTxtGenerator from "./robots-txt-generator";
import openGraphPreview from "./open-graph-preview";
import keywordDensityChecker from "./keyword-density-checker";
import schemaMarkupGenerator from "./schema-markup-generator";

// QR Code Tools
import qrCodeGenerator from "./qr-code-generator";
import wifiQrCodeGenerator from "./wifi-qr-code-generator";

// Utilities
import timerStopwatch from "./timer-stopwatch";
import countdownTimer from "./countdown-timer";
import randomNumberGenerator from "./random-number-generator";
import coinFlip from "./coin-flip";
import diceRoller from "./dice-roller";
import listRandomizer from "./list-randomizer";
import namePicker from "./name-picker";
import metronomeOnline from "./metronome-online";
import bpmCalculator from "./bpm-calculator";
import timeZoneConverter from "./time-zone-converter";

// Network Tools
import ipAddressLookup from "./ip-address-lookup";
import dnsLookup from "./dns-lookup";

export const allTools: ToolConfig[] = [
  // Social Media
  facebookVideoDownloader,
  tiktokVideoDownloader,
  instagramVideoDownloader,
  youtubeVideoDownloader,
  twitterVideoDownloader,
  youtubeThumbnailDownloader,
  youtubeToMp3,
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
  imageCropper,
  imageFlipper,
  faviconGenerator,
  svgToPng,
  imageMetadataReader,
  grayscaleImage,
  imageColorPicker,
  // Calculators
  bmiCalculator,
  loanCalculator,
  ageCalculator,
  percentageCalculator,
  unitConverter,
  temperatureConverter,
  scientificCalculator,
  aspectRatioCalculator,
  dateCalculator,
  // Finance
  compoundInterestCalculator,
  roiCalculator,
  profitMarginCalculator,
  vatCalculator,
  tipCalculator,
  invoiceGenerator,
  discountCalculator,
  currencyConverter,
  // Health
  calorieCalculator,
  waterIntakeCalculator,
  idealWeightCalculator,
  bodyFatCalculator,
  sleepCalculator,
  heartRateCalculator,
  // Text
  wordCounter,
  textCaseConverter,
  loremIpsumGenerator,
  textToSlug,
  markdownToHtml,
  textDiffChecker,
  textRepeater,
  htmlToText,
  stringReverse,
  textToAscii,
  morseCodeTranslator,
  numberToWords,
  // Developer
  jsonFormatter,
  passwordGenerator,
  base64Encoder,
  urlEncoder,
  hashGenerator,
  colorPicker,
  regexTester,
  cssMinifier,
  cssGradientGenerator,
  boxShadowGenerator,
  borderRadiusGenerator,
  jsonToCsv,
  csvToJson,
  binaryToText,
  passwordStrengthChecker,
  cronExpressionBuilder,
  // SEO
  metaTagGenerator,
  robotsTxtGenerator,
  openGraphPreview,
  keywordDensityChecker,
  schemaMarkupGenerator,
  // QR Code
  qrCodeGenerator,
  wifiQrCodeGenerator,
  // Utilities
  timerStopwatch,
  countdownTimer,
  randomNumberGenerator,
  coinFlip,
  diceRoller,
  listRandomizer,
  namePicker,
  metronomeOnline,
  bpmCalculator,
  timeZoneConverter,
  // Network
  ipAddressLookup,
  dnsLookup,
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
