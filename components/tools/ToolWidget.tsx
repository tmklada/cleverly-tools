"use client";
import dynamic from "next/dynamic";
import type { ToolConfig } from "@/types/tool";
import DownloaderWidget from "./DownloaderWidget";

const BmiCalculator = dynamic(() => import("./widgets/BmiCalculator"), { ssr: false });
const LoanCalculator = dynamic(() => import("./widgets/LoanCalculator"), { ssr: false });
const AgeCalculator = dynamic(() => import("./widgets/AgeCalculator"), { ssr: false });
const PercentageCalculator = dynamic(() => import("./widgets/PercentageCalculator"), { ssr: false });
const WordCounter = dynamic(() => import("./widgets/WordCounter"), { ssr: false });
const TextCaseConverter = dynamic(() => import("./widgets/TextCaseConverter"), { ssr: false });
const JsonFormatter = dynamic(() => import("./widgets/JsonFormatter"), { ssr: false });
const PasswordGenerator = dynamic(() => import("./widgets/PasswordGenerator"), { ssr: false });
const Base64Tool = dynamic(() => import("./widgets/Base64Tool"), { ssr: false });
const UrlEncoderTool = dynamic(() => import("./widgets/UrlEncoderTool"), { ssr: false });

const DOWNLOADER_SLUGS = [
  "facebook-video-downloader",
  "tiktok-video-downloader",
  "instagram-video-downloader",
  "youtube-video-downloader",
];

const WIDGET_MAP: Record<string, React.ComponentType> = {
  "bmi-calculator": BmiCalculator,
  "loan-calculator": LoanCalculator,
  "age-calculator": AgeCalculator,
  "percentage-calculator": PercentageCalculator,
  "word-counter": WordCounter,
  "text-case-converter": TextCaseConverter,
  "json-formatter": JsonFormatter,
  "password-generator": PasswordGenerator,
  "base64-encoder": Base64Tool,
  "url-encoder": UrlEncoderTool,
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
