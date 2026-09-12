import type { ToolGuide } from "@/types/guide";
import ageCalculator from "./age-calculator";
import aspectRatioCalculator from "./aspect-ratio-calculator";
import backgroundRemover from "./background-remover";
import base64Encoder from "./base64-encoder";
import binaryToText from "./binary-to-text";
import bmiCalculator from "./bmi-calculator";
import bodyFatCalculator from "./body-fat-calculator";
import borderRadiusGenerator from "./border-radius-generator";
import boxShadowGenerator from "./box-shadow-generator";
import bpmCalculator from "./bpm-calculator";
import calorieCalculator from "./calorie-calculator";
import coinFlip from "./coin-flip";
import colorPicker from "./color-picker";
import compoundInterestCalculator from "./compound-interest-calculator";
import compressPdf from "./compress-pdf";
import countdownTimer from "./countdown-timer";
import cronExpressionBuilder from "./cron-expression-builder";
import cssGradientGenerator from "./css-gradient-generator";
import cssMinifier from "./css-minifier";
import csvToJson from "./csv-to-json";
import currencyConverter from "./currency-converter";
import dateCalculator from "./date-calculator";
import diceRoller from "./dice-roller";
import discountCalculator from "./discount-calculator";
import dnsLookup from "./dns-lookup";
import facebookVideoDownloader from "./facebook-video-downloader";
import faviconGenerator from "./favicon-generator";
import grayscaleImage from "./grayscale-image";
import hashGenerator from "./hash-generator";
import heartRateCalculator from "./heart-rate-calculator";
import htmlToText from "./html-to-text";
import idealWeightCalculator from "./ideal-weight-calculator";
import imageColorPicker from "./image-color-picker";
import imageCompressor from "./image-compressor";
import imageConverter from "./image-converter";
import imageCropper from "./image-cropper";
import imageFlipper from "./image-flipper";
import imageMetadataReader from "./image-metadata-reader";
import imageResizer from "./image-resizer";
import imageToBase64 from "./image-to-base64";
import instagramVideoDownloader from "./instagram-video-downloader";
import invoiceGenerator from "./invoice-generator";
import ipAddressLookup from "./ip-address-lookup";
import jsonFormatter from "./json-formatter";
import jsonToCsv from "./json-to-csv";
import keywordDensityChecker from "./keyword-density-checker";
import listRandomizer from "./list-randomizer";
import loanCalculator from "./loan-calculator";
import loremIpsumGenerator from "./lorem-ipsum-generator";
import markdownToHtml from "./markdown-to-html";
import mergePdf from "./merge-pdf";
import metaTagGenerator from "./meta-tag-generator";
import metronomeOnline from "./metronome-online";
import morseCodeTranslator from "./morse-code-translator";
import namePicker from "./name-picker";
import numberToWords from "./number-to-words";
import openGraphPreview from "./open-graph-preview";
import passwordGenerator from "./password-generator";
import passwordStrengthChecker from "./password-strength-checker";
import percentageCalculator from "./percentage-calculator";
import profitMarginCalculator from "./profit-margin-calculator";
import qrCodeGenerator from "./qr-code-generator";
import randomNumberGenerator from "./random-number-generator";
import regexTester from "./regex-tester";
import robotsTxtGenerator from "./robots-txt-generator";
import roiCalculator from "./roi-calculator";
import rotatePdf from "./rotate-pdf";
import schemaMarkupGenerator from "./schema-markup-generator";
import scientificCalculator from "./scientific-calculator";
import sleepCalculator from "./sleep-calculator";
import splitPdf from "./split-pdf";
import stringReverse from "./string-reverse";
import svgToPng from "./svg-to-png";
import temperatureConverter from "./temperature-converter";
import textCaseConverter from "./text-case-converter";
import textDiffChecker from "./text-diff-checker";
import textRepeater from "./text-repeater";
import textToAscii from "./text-to-ascii";
import textToSlug from "./text-to-slug";
import tiktokVideoDownloader from "./tiktok-video-downloader";
import timeZoneConverter from "./time-zone-converter";
import timerStopwatch from "./timer-stopwatch";
import tipCalculator from "./tip-calculator";
import twitterVideoDownloader from "./twitter-video-downloader";
import unitConverter from "./unit-converter";
import urlEncoder from "./url-encoder";
import vatCalculator from "./vat-calculator";
import videoConverter from "./video-converter";
import waterIntakeCalculator from "./water-intake-calculator";
import wifiQrCodeGenerator from "./wifi-qr-code-generator";
import wordCounter from "./word-counter";
import youtubeThumbnailDownloader from "./youtube-thumbnail-downloader";
import youtubeToMp3 from "./youtube-to-mp3";
import youtubeVideoDownloader from "./youtube-video-downloader";

const guides: Record<string, ToolGuide> = {
  "age-calculator": ageCalculator,
  "aspect-ratio-calculator": aspectRatioCalculator,
  "background-remover": backgroundRemover,
  "base64-encoder": base64Encoder,
  "binary-to-text": binaryToText,
  "bmi-calculator": bmiCalculator,
  "body-fat-calculator": bodyFatCalculator,
  "border-radius-generator": borderRadiusGenerator,
  "box-shadow-generator": boxShadowGenerator,
  "bpm-calculator": bpmCalculator,
  "calorie-calculator": calorieCalculator,
  "coin-flip": coinFlip,
  "color-picker": colorPicker,
  "compound-interest-calculator": compoundInterestCalculator,
  "compress-pdf": compressPdf,
  "countdown-timer": countdownTimer,
  "cron-expression-builder": cronExpressionBuilder,
  "css-gradient-generator": cssGradientGenerator,
  "css-minifier": cssMinifier,
  "csv-to-json": csvToJson,
  "currency-converter": currencyConverter,
  "date-calculator": dateCalculator,
  "dice-roller": diceRoller,
  "discount-calculator": discountCalculator,
  "dns-lookup": dnsLookup,
  "facebook-video-downloader": facebookVideoDownloader,
  "favicon-generator": faviconGenerator,
  "grayscale-image": grayscaleImage,
  "hash-generator": hashGenerator,
  "heart-rate-calculator": heartRateCalculator,
  "html-to-text": htmlToText,
  "ideal-weight-calculator": idealWeightCalculator,
  "image-color-picker": imageColorPicker,
  "image-compressor": imageCompressor,
  "image-converter": imageConverter,
  "image-cropper": imageCropper,
  "image-flipper": imageFlipper,
  "image-metadata-reader": imageMetadataReader,
  "image-resizer": imageResizer,
  "image-to-base64": imageToBase64,
  "instagram-video-downloader": instagramVideoDownloader,
  "invoice-generator": invoiceGenerator,
  "ip-address-lookup": ipAddressLookup,
  "json-formatter": jsonFormatter,
  "json-to-csv": jsonToCsv,
  "keyword-density-checker": keywordDensityChecker,
  "list-randomizer": listRandomizer,
  "loan-calculator": loanCalculator,
  "lorem-ipsum-generator": loremIpsumGenerator,
  "markdown-to-html": markdownToHtml,
  "merge-pdf": mergePdf,
  "meta-tag-generator": metaTagGenerator,
  "metronome-online": metronomeOnline,
  "morse-code-translator": morseCodeTranslator,
  "name-picker": namePicker,
  "number-to-words": numberToWords,
  "open-graph-preview": openGraphPreview,
  "password-generator": passwordGenerator,
  "password-strength-checker": passwordStrengthChecker,
  "percentage-calculator": percentageCalculator,
  "profit-margin-calculator": profitMarginCalculator,
  "qr-code-generator": qrCodeGenerator,
  "random-number-generator": randomNumberGenerator,
  "regex-tester": regexTester,
  "robots-txt-generator": robotsTxtGenerator,
  "roi-calculator": roiCalculator,
  "rotate-pdf": rotatePdf,
  "schema-markup-generator": schemaMarkupGenerator,
  "scientific-calculator": scientificCalculator,
  "sleep-calculator": sleepCalculator,
  "split-pdf": splitPdf,
  "string-reverse": stringReverse,
  "svg-to-png": svgToPng,
  "temperature-converter": temperatureConverter,
  "text-case-converter": textCaseConverter,
  "text-diff-checker": textDiffChecker,
  "text-repeater": textRepeater,
  "text-to-ascii": textToAscii,
  "text-to-slug": textToSlug,
  "tiktok-video-downloader": tiktokVideoDownloader,
  "time-zone-converter": timeZoneConverter,
  "timer-stopwatch": timerStopwatch,
  "tip-calculator": tipCalculator,
  "twitter-video-downloader": twitterVideoDownloader,
  "unit-converter": unitConverter,
  "url-encoder": urlEncoder,
  "vat-calculator": vatCalculator,
  "video-converter": videoConverter,
  "water-intake-calculator": waterIntakeCalculator,
  "wifi-qr-code-generator": wifiQrCodeGenerator,
  "word-counter": wordCounter,
  "youtube-thumbnail-downloader": youtubeThumbnailDownloader,
  "youtube-to-mp3": youtubeToMp3,
  "youtube-video-downloader": youtubeVideoDownloader,
};

export function getToolGuide(slug: string): ToolGuide | undefined {
  return guides[slug];
}

export const guideSlugs = Object.keys(guides);
