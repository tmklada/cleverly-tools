import type { ToolGuide } from "@/types/guide";
import ageCalculator from "./age-calculator";
import backgroundRemover from "./background-remover";
import bmiCalculator from "./bmi-calculator";
import bodyFatCalculator from "./body-fat-calculator";
import calorieCalculator from "./calorie-calculator";
import compoundInterestCalculator from "./compound-interest-calculator";
import compressPdf from "./compress-pdf";
import countdownTimer from "./countdown-timer";
import facebookVideoDownloader from "./facebook-video-downloader";
import faviconGenerator from "./favicon-generator";
import idealWeightCalculator from "./ideal-weight-calculator";
import imageCompressor from "./image-compressor";
import imageConverter from "./image-converter";
import imageResizer from "./image-resizer";
import instagramVideoDownloader from "./instagram-video-downloader";
import jsonFormatter from "./json-formatter";
import loanCalculator from "./loan-calculator";
import mergePdf from "./merge-pdf";
import metaTagGenerator from "./meta-tag-generator";
import metronomeOnline from "./metronome-online";
import namePicker from "./name-picker";
import passwordGenerator from "./password-generator";
import percentageCalculator from "./percentage-calculator";
import qrCodeGenerator from "./qr-code-generator";
import randomNumberGenerator from "./random-number-generator";
import regexTester from "./regex-tester";
import rotatePdf from "./rotate-pdf";
import splitPdf from "./split-pdf";
import textCaseConverter from "./text-case-converter";
import tiktokVideoDownloader from "./tiktok-video-downloader";
import timerStopwatch from "./timer-stopwatch";
import tipCalculator from "./tip-calculator";
import twitterVideoDownloader from "./twitter-video-downloader";
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
  "bmi-calculator": bmiCalculator,
  "body-fat-calculator": bodyFatCalculator,
  "calorie-calculator": calorieCalculator,
  "compound-interest-calculator": compoundInterestCalculator,
  "compress-pdf": compressPdf,
  "countdown-timer": countdownTimer,
  "facebook-video-downloader": facebookVideoDownloader,
  "favicon-generator": faviconGenerator,
  "ideal-weight-calculator": idealWeightCalculator,
  "image-compressor": imageCompressor,
  "image-converter": imageConverter,
  "image-resizer": imageResizer,
  "instagram-video-downloader": instagramVideoDownloader,
  "json-formatter": jsonFormatter,
  "loan-calculator": loanCalculator,
  "merge-pdf": mergePdf,
  "meta-tag-generator": metaTagGenerator,
  "metronome-online": metronomeOnline,
  "name-picker": namePicker,
  "password-generator": passwordGenerator,
  "percentage-calculator": percentageCalculator,
  "qr-code-generator": qrCodeGenerator,
  "random-number-generator": randomNumberGenerator,
  "regex-tester": regexTester,
  "rotate-pdf": rotatePdf,
  "split-pdf": splitPdf,
  "text-case-converter": textCaseConverter,
  "tiktok-video-downloader": tiktokVideoDownloader,
  "timer-stopwatch": timerStopwatch,
  "tip-calculator": tipCalculator,
  "twitter-video-downloader": twitterVideoDownloader,
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
