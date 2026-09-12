import type { ToolGuide } from "@/types/guide";
import ageCalculator from "./age-calculator";
import backgroundRemover from "./background-remover";
import bmiCalculator from "./bmi-calculator";
import bodyFatCalculator from "./body-fat-calculator";
import compoundInterestCalculator from "./compound-interest-calculator";
import compressPdf from "./compress-pdf";
import facebookVideoDownloader from "./facebook-video-downloader";
import imageCompressor from "./image-compressor";
import instagramVideoDownloader from "./instagram-video-downloader";
import mergePdf from "./merge-pdf";
import metronomeOnline from "./metronome-online";
import namePicker from "./name-picker";
import passwordGenerator from "./password-generator";
import percentageCalculator from "./percentage-calculator";
import qrCodeGenerator from "./qr-code-generator";
import tiktokVideoDownloader from "./tiktok-video-downloader";
import wifiQrCodeGenerator from "./wifi-qr-code-generator";
import wordCounter from "./word-counter";
import youtubeThumbnailDownloader from "./youtube-thumbnail-downloader";
import youtubeToMp3 from "./youtube-to-mp3";

const guides: Record<string, ToolGuide> = {
  "age-calculator": ageCalculator,
  "background-remover": backgroundRemover,
  "bmi-calculator": bmiCalculator,
  "body-fat-calculator": bodyFatCalculator,
  "compound-interest-calculator": compoundInterestCalculator,
  "compress-pdf": compressPdf,
  "facebook-video-downloader": facebookVideoDownloader,
  "image-compressor": imageCompressor,
  "instagram-video-downloader": instagramVideoDownloader,
  "merge-pdf": mergePdf,
  "metronome-online": metronomeOnline,
  "name-picker": namePicker,
  "password-generator": passwordGenerator,
  "percentage-calculator": percentageCalculator,
  "qr-code-generator": qrCodeGenerator,
  "tiktok-video-downloader": tiktokVideoDownloader,
  "wifi-qr-code-generator": wifiQrCodeGenerator,
  "word-counter": wordCounter,
  "youtube-thumbnail-downloader": youtubeThumbnailDownloader,
  "youtube-to-mp3": youtubeToMp3,
};

export function getToolGuide(slug: string): ToolGuide | undefined {
  return guides[slug];
}

export const guideSlugs = Object.keys(guides);
