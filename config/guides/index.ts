import type { ToolGuide } from "@/types/guide";
import ageCalculator from "./age-calculator";
import backgroundRemover from "./background-remover";
import base64Encoder from "./base64-encoder";
import bmiCalculator from "./bmi-calculator";
import bodyFatCalculator from "./body-fat-calculator";
import calorieCalculator from "./calorie-calculator";
import colorPicker from "./color-picker";
import compoundInterestCalculator from "./compound-interest-calculator";
import compressPdf from "./compress-pdf";
import countdownTimer from "./countdown-timer";
import cssGradientGenerator from "./css-gradient-generator";
import currencyConverter from "./currency-converter";
import dateCalculator from "./date-calculator";
import diceRoller from "./dice-roller";
import dnsLookup from "./dns-lookup";
import facebookVideoDownloader from "./facebook-video-downloader";
import faviconGenerator from "./favicon-generator";
import hashGenerator from "./hash-generator";
import heartRateCalculator from "./heart-rate-calculator";
import idealWeightCalculator from "./ideal-weight-calculator";
import imageCompressor from "./image-compressor";
import imageConverter from "./image-converter";
import imageCropper from "./image-cropper";
import imageResizer from "./image-resizer";
import instagramVideoDownloader from "./instagram-video-downloader";
import ipAddressLookup from "./ip-address-lookup";
import jsonFormatter from "./json-formatter";
import loanCalculator from "./loan-calculator";
import loremIpsumGenerator from "./lorem-ipsum-generator";
import mergePdf from "./merge-pdf";
import metaTagGenerator from "./meta-tag-generator";
import metronomeOnline from "./metronome-online";
import morseCodeTranslator from "./morse-code-translator";
import namePicker from "./name-picker";
import passwordGenerator from "./password-generator";
import percentageCalculator from "./percentage-calculator";
import qrCodeGenerator from "./qr-code-generator";
import randomNumberGenerator from "./random-number-generator";
import regexTester from "./regex-tester";
import robotsTxtGenerator from "./robots-txt-generator";
import roiCalculator from "./roi-calculator";
import rotatePdf from "./rotate-pdf";
import sleepCalculator from "./sleep-calculator";
import splitPdf from "./split-pdf";
import svgToPng from "./svg-to-png";
import textCaseConverter from "./text-case-converter";
import tiktokVideoDownloader from "./tiktok-video-downloader";
import timeZoneConverter from "./time-zone-converter";
import timerStopwatch from "./timer-stopwatch";
import tipCalculator from "./tip-calculator";
import twitterVideoDownloader from "./twitter-video-downloader";
import unitConverter from "./unit-converter";
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
  "background-remover": backgroundRemover,
  "base64-encoder": base64Encoder,
  "bmi-calculator": bmiCalculator,
  "body-fat-calculator": bodyFatCalculator,
  "calorie-calculator": calorieCalculator,
  "color-picker": colorPicker,
  "compound-interest-calculator": compoundInterestCalculator,
  "compress-pdf": compressPdf,
  "countdown-timer": countdownTimer,
  "css-gradient-generator": cssGradientGenerator,
  "currency-converter": currencyConverter,
  "date-calculator": dateCalculator,
  "dice-roller": diceRoller,
  "dns-lookup": dnsLookup,
  "facebook-video-downloader": facebookVideoDownloader,
  "favicon-generator": faviconGenerator,
  "hash-generator": hashGenerator,
  "heart-rate-calculator": heartRateCalculator,
  "ideal-weight-calculator": idealWeightCalculator,
  "image-compressor": imageCompressor,
  "image-converter": imageConverter,
  "image-cropper": imageCropper,
  "image-resizer": imageResizer,
  "instagram-video-downloader": instagramVideoDownloader,
  "ip-address-lookup": ipAddressLookup,
  "json-formatter": jsonFormatter,
  "loan-calculator": loanCalculator,
  "lorem-ipsum-generator": loremIpsumGenerator,
  "merge-pdf": mergePdf,
  "meta-tag-generator": metaTagGenerator,
  "metronome-online": metronomeOnline,
  "morse-code-translator": morseCodeTranslator,
  "name-picker": namePicker,
  "password-generator": passwordGenerator,
  "percentage-calculator": percentageCalculator,
  "qr-code-generator": qrCodeGenerator,
  "random-number-generator": randomNumberGenerator,
  "regex-tester": regexTester,
  "robots-txt-generator": robotsTxtGenerator,
  "roi-calculator": roiCalculator,
  "rotate-pdf": rotatePdf,
  "sleep-calculator": sleepCalculator,
  "split-pdf": splitPdf,
  "svg-to-png": svgToPng,
  "text-case-converter": textCaseConverter,
  "tiktok-video-downloader": tiktokVideoDownloader,
  "time-zone-converter": timeZoneConverter,
  "timer-stopwatch": timerStopwatch,
  "tip-calculator": tipCalculator,
  "twitter-video-downloader": twitterVideoDownloader,
  "unit-converter": unitConverter,
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
