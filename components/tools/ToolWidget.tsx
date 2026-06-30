"use client";
import dynamic from "next/dynamic";
import type { ToolConfig } from "@/types/tool";
import DownloaderWidget from "./DownloaderWidget";

// Calculators
const BmiCalculator = dynamic(() => import("./widgets/BmiCalculator"), { ssr: false });
const LoanCalculator = dynamic(() => import("./widgets/LoanCalculator"), { ssr: false });
const AgeCalculator = dynamic(() => import("./widgets/AgeCalculator"), { ssr: false });
const PercentageCalculator = dynamic(() => import("./widgets/PercentageCalculator"), { ssr: false });
const UnitConverter = dynamic(() => import("./widgets/UnitConverter"), { ssr: false });
const TemperatureConverter = dynamic(() => import("./widgets/TemperatureConverter"), { ssr: false });
const ScientificCalculator = dynamic(() => import("./widgets/ScientificCalculator"), { ssr: false });

// Text
const WordCounter = dynamic(() => import("./widgets/WordCounter"), { ssr: false });
const TextCaseConverter = dynamic(() => import("./widgets/TextCaseConverter"), { ssr: false });
const LoremIpsumGenerator = dynamic(() => import("./widgets/LoremIpsumGenerator"), { ssr: false });
const TextToSlug = dynamic(() => import("./widgets/TextToSlug"), { ssr: false });
const MarkdownToHtml = dynamic(() => import("./widgets/MarkdownToHtml"), { ssr: false });

// Developer
const JsonFormatter = dynamic(() => import("./widgets/JsonFormatter"), { ssr: false });
const PasswordGenerator = dynamic(() => import("./widgets/PasswordGenerator"), { ssr: false });
const Base64Tool = dynamic(() => import("./widgets/Base64Tool"), { ssr: false });
const UrlEncoderTool = dynamic(() => import("./widgets/UrlEncoderTool"), { ssr: false });
const HashGenerator = dynamic(() => import("./widgets/HashGenerator"), { ssr: false });
const ColorPicker = dynamic(() => import("./widgets/ColorPicker"), { ssr: false });
const RegexTester = dynamic(() => import("./widgets/RegexTester"), { ssr: false });

// PDF
const MergePdf = dynamic(() => import("./widgets/MergePdf"), { ssr: false });
const SplitPdf = dynamic(() => import("./widgets/SplitPdf"), { ssr: false });
const RotatePdf = dynamic(() => import("./widgets/RotatePdf"), { ssr: false });
const CompressPdf = dynamic(() => import("./widgets/CompressPdf"), { ssr: false });

// Image
const ImageResizer = dynamic(() => import("./widgets/ImageResizer"), { ssr: false });
const ImageConverter = dynamic(() => import("./widgets/ImageConverter"), { ssr: false });
const ImageCompressor = dynamic(() => import("./widgets/ImageCompressor"), { ssr: false });
const ImageToBase64 = dynamic(() => import("./widgets/ImageToBase64"), { ssr: false });

const DOWNLOADER_SLUGS = [
  "facebook-video-downloader",
  "tiktok-video-downloader",
  "instagram-video-downloader",
  "youtube-video-downloader",
  "twitter-video-downloader",
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
  // Text
  "word-counter": WordCounter,
  "text-case-converter": TextCaseConverter,
  "lorem-ipsum-generator": LoremIpsumGenerator,
  "text-to-slug": TextToSlug,
  "markdown-to-html": MarkdownToHtml,
  // Developer
  "json-formatter": JsonFormatter,
  "password-generator": PasswordGenerator,
  "base64-encoder": Base64Tool,
  "url-encoder": UrlEncoderTool,
  "hash-generator": HashGenerator,
  "color-picker": ColorPicker,
  "regex-tester": RegexTester,
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
      <p className="font-medium">This tool is coming soon!</p>
    </div>
  );
}
