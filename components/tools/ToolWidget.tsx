"use client";
import dynamic from "next/dynamic";
import type { ToolConfig } from "@/types/tool";
import DownloaderWidget from "./DownloaderWidget";

const ld = (path: string) => dynamic(() => import(`./widgets/${path}`), { ssr: false });

// Calculators
const BmiCalculator = ld("BmiCalculator");
const LoanCalculator = ld("LoanCalculator");
const AgeCalculator = ld("AgeCalculator");
const PercentageCalculator = ld("PercentageCalculator");
const UnitConverter = ld("UnitConverter");
const TemperatureConverter = ld("TemperatureConverter");
const ScientificCalculator = ld("ScientificCalculator");
const AspectRatioCalculator = ld("AspectRatioCalculator");
const DateCalculator = ld("DateCalculator");

// Finance
const CompoundInterestCalculator = ld("CompoundInterestCalculator");
const RoiCalculator = ld("RoiCalculator");
const ProfitMarginCalculator = ld("ProfitMarginCalculator");
const VatCalculator = ld("VatCalculator");
const TipCalculator = ld("TipCalculator");
const DiscountCalculator = ld("DiscountCalculator");
const CurrencyConverter = ld("CurrencyConverter");
const InvoiceGenerator = ld("InvoiceGenerator");

// Health
const BodyFatCalculator = ld("BodyFatCalculator");
const IdealWeightCalculator = ld("IdealWeightCalculator");
const SleepCalculator = ld("SleepCalculator");
const HeartRateCalculator = ld("HeartRateCalculator");
const CalorieCalculator = ld("CalorieCalculator");
const WaterIntakeCalculator = ld("WaterIntakeCalculator");

// Text
const WordCounter = ld("WordCounter");
const TextCaseConverter = ld("TextCaseConverter");
const LoremIpsumGenerator = ld("LoremIpsumGenerator");
const TextToSlug = ld("TextToSlug");
const MarkdownToHtml = ld("MarkdownToHtml");
const TextToAscii = ld("TextToAscii");
const MorseCodeTranslator = ld("MorseCodeTranslator");
const NumberToWords = ld("NumberToWords");
const TextDiffChecker = ld("TextDiffChecker");
const TextRepeater = ld("TextRepeater");
const HtmlToText = ld("HtmlToText");
const StringReverse = ld("StringReverse");

// Developer
const JsonFormatter = ld("JsonFormatter");
const PasswordGenerator = ld("PasswordGenerator");
const Base64Tool = ld("Base64Tool");
const UrlEncoderTool = ld("UrlEncoderTool");
const HashGenerator = ld("HashGenerator");
const ColorPicker = ld("ColorPicker");
const RegexTester = ld("RegexTester");
const CssMinifier = ld("CssMinifier");
const CssGradientGenerator = ld("CssGradientGenerator");
const BoxShadowGenerator = ld("BoxShadowGenerator");
const BorderRadiusGenerator = ld("BorderRadiusGenerator");
const JsonToCsv = ld("JsonToCsv");
const CsvToJson = ld("CsvToJson");
const BinaryToText = ld("BinaryToText");
const PasswordStrengthChecker = ld("PasswordStrengthChecker");
const CronExpressionBuilder = ld("CronExpressionBuilder");

// SEO
const MetaTagGenerator = ld("MetaTagGenerator");
const RobotsTxtGenerator = ld("RobotsTxtGenerator");
const OpenGraphPreview = ld("OpenGraphPreview");
const KeywordDensityChecker = ld("KeywordDensityChecker");
const SchemaMarkupGenerator = ld("SchemaMarkupGenerator");

// PDF
const MergePdf = ld("MergePdf");
const SplitPdf = ld("SplitPdf");
const RotatePdf = ld("RotatePdf");
const CompressPdf = ld("CompressPdf");

// Image
const ImageResizer = ld("ImageResizer");
const ImageConverter = ld("ImageConverter");
const ImageCompressor = ld("ImageCompressor");
const ImageToBase64 = ld("ImageToBase64");
const ImageCropper = ld("ImageCropper");
const ImageFlipper = ld("ImageFlipper");
const FaviconGenerator = ld("FaviconGenerator");
const SvgToPng = ld("SvgToPng");
const ImageMetadataReader = ld("ImageMetadataReader");
const GrayscaleImage = ld("GrayscaleImage");
const ImageColorPicker = ld("ImageColorPicker");

// QR Code
const QrCodeGenerator = ld("QrCodeGenerator");
const WifiQrCodeGenerator = ld("WifiQrCodeGenerator");

// Utilities
const TimerStopwatch = ld("TimerStopwatch");
const CountdownTimer = ld("CountdownTimer");
const RandomNumberGenerator = ld("RandomNumberGenerator");
const CoinFlip = ld("CoinFlip");
const DiceRoller = ld("DiceRoller");
const ListRandomizer = ld("ListRandomizer");
const NamePicker = ld("NamePicker");
const MetronomeOnline = ld("MetronomeOnline");
const BpmCalculator = ld("BpmCalculator");
const TimeZoneConverter = ld("TimeZoneConverter");

// Network
const IpAddressLookup = ld("IpAddressLookup");
const DnsLookup = ld("DnsLookup");

// Video/Social extras
const YoutubeToMp3 = ld("YoutubeToMp3");
const YoutubeThumbnailDownloader = ld("YoutubeThumbnailDownloader");
const TwitterDownloader = ld("TwitterDownloader");

const DOWNLOADER_SLUGS = [
  "facebook-video-downloader",
  "tiktok-video-downloader",
  "instagram-video-downloader",
  "youtube-video-downloader",
];

const WIDGET_MAP: Record<string, React.ComponentType> = {
  // Calculators
  "bmi-calculator": BmiCalculator,
  "loan-calculator": LoanCalculator,
  "age-calculator": AgeCalculator,
  "percentage-calculator": PercentageCalculator,
  "unit-converter": UnitConverter,
  "temperature-converter": TemperatureConverter,
  "scientific-calculator": ScientificCalculator,
  "aspect-ratio-calculator": AspectRatioCalculator,
  "date-calculator": DateCalculator,
  // Finance
  "compound-interest-calculator": CompoundInterestCalculator,
  "roi-calculator": RoiCalculator,
  "profit-margin-calculator": ProfitMarginCalculator,
  "vat-calculator": VatCalculator,
  "tip-calculator": TipCalculator,
  "discount-calculator": DiscountCalculator,
  "currency-converter": CurrencyConverter,
  "invoice-generator": InvoiceGenerator,
  // Health
  "body-fat-calculator": BodyFatCalculator,
  "ideal-weight-calculator": IdealWeightCalculator,
  "sleep-calculator": SleepCalculator,
  "heart-rate-calculator": HeartRateCalculator,
  "calorie-calculator": CalorieCalculator,
  "water-intake-calculator": WaterIntakeCalculator,
  // Text
  "word-counter": WordCounter,
  "text-case-converter": TextCaseConverter,
  "lorem-ipsum-generator": LoremIpsumGenerator,
  "text-to-slug": TextToSlug,
  "markdown-to-html": MarkdownToHtml,
  "text-to-ascii": TextToAscii,
  "morse-code-translator": MorseCodeTranslator,
  "number-to-words": NumberToWords,
  "text-diff-checker": TextDiffChecker,
  "text-repeater": TextRepeater,
  "html-to-text": HtmlToText,
  "string-reverse": StringReverse,
  // Developer
  "json-formatter": JsonFormatter,
  "password-generator": PasswordGenerator,
  "base64-encoder": Base64Tool,
  "url-encoder": UrlEncoderTool,
  "hash-generator": HashGenerator,
  "color-picker": ColorPicker,
  "regex-tester": RegexTester,
  "css-minifier": CssMinifier,
  "css-gradient-generator": CssGradientGenerator,
  "box-shadow-generator": BoxShadowGenerator,
  "border-radius-generator": BorderRadiusGenerator,
  "json-to-csv": JsonToCsv,
  "csv-to-json": CsvToJson,
  "binary-to-text": BinaryToText,
  "password-strength-checker": PasswordStrengthChecker,
  "cron-expression-builder": CronExpressionBuilder,
  // SEO
  "meta-tag-generator": MetaTagGenerator,
  "robots-txt-generator": RobotsTxtGenerator,
  "open-graph-preview": OpenGraphPreview,
  "keyword-density-checker": KeywordDensityChecker,
  "schema-markup-generator": SchemaMarkupGenerator,
  // PDF
  "merge-pdf": MergePdf,
  "split-pdf": SplitPdf,
  "rotate-pdf": RotatePdf,
  "compress-pdf": CompressPdf,
  // Image
  "image-resizer": ImageResizer,
  "image-converter": ImageConverter,
  "image-compressor": ImageCompressor,
  "image-to-base64": ImageToBase64,
  "image-cropper": ImageCropper,
  "image-flipper": ImageFlipper,
  "favicon-generator": FaviconGenerator,
  "svg-to-png": SvgToPng,
  "image-metadata-reader": ImageMetadataReader,
  "grayscale-image": GrayscaleImage,
  "image-color-picker": ImageColorPicker,
  // QR Code
  "qr-code-generator": QrCodeGenerator,
  "wifi-qr-code-generator": WifiQrCodeGenerator,
  // Utilities
  "timer-stopwatch": TimerStopwatch,
  "countdown-timer": CountdownTimer,
  "random-number-generator": RandomNumberGenerator,
  "coin-flip": CoinFlip,
  "dice-roller": DiceRoller,
  "list-randomizer": ListRandomizer,
  "name-picker": NamePicker,
  "metronome-online": MetronomeOnline,
  "bpm-calculator": BpmCalculator,
  "time-zone-converter": TimeZoneConverter,
  // Network
  "ip-address-lookup": IpAddressLookup,
  "dns-lookup": DnsLookup,
  // Video extras
  "youtube-to-mp3": YoutubeToMp3,
  "youtube-thumbnail-downloader": YoutubeThumbnailDownloader,
  "twitter-video-downloader": TwitterDownloader,
};

interface ToolWidgetProps {
  tool: ToolConfig;
}

export default function ToolWidget({ tool }: ToolWidgetProps) {
  if (DOWNLOADER_SLUGS.includes(tool.slug)) {
    return <DownloaderWidget toolSlug={tool.slug} toolTitle={tool.title} />;
  }

  const Widget = WIDGET_MAP[tool.slug];
  if (Widget) return <Widget />;

  return (
    <div className="text-center py-12 text-gray-400">
      <div className="text-4xl mb-3">{tool.icon}</div>
      <p className="font-medium text-gray-600 dark:text-gray-400">Coming soon!</p>
      <p className="text-sm mt-2 text-gray-400">This tool is being built and will be available shortly.</p>
    </div>
  );
}
