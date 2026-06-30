import type { ToolConfig } from "@/types/tool";
const config: ToolConfig = {
  slug: "json-to-csv",
  title: "JSON to CSV Converter",
  description: "Convert JSON data to CSV format online for free in seconds. Easily transform nested JSON arrays into clean, spreadsheet-ready CSV files.",
  shortDescription: "Convert JSON arrays to CSV instantly",
  category: "developer",
  keywords: ["json to csv", "convert json to csv", "json csv converter", "export json as csv", "json to spreadsheet", "json parser", "data converter"],
  icon: "📊",
  toolType: "developer",
  faq: [
    { question: "What JSON structure works for CSV conversion?", answer: "An array of objects works best — each object becomes a row and each key becomes a column header." },
    { question: "Can I open the CSV in Excel or Google Sheets?", answer: "Yes, the output CSV is compatible with Excel, Google Sheets, and any spreadsheet software." },
    { question: "Does it support nested JSON?", answer: "Nested objects are flattened or serialized into a single cell for compatibility." },
  ],
  howItWorks: [
    { step: 1, title: "Paste your JSON", description: "Copy your JSON array and paste it into the input field." },
    { step: 2, title: "Convert to CSV", description: "Click Convert and the tool maps keys to columns automatically." },
    { step: 3, title: "Download or copy", description: "Download the CSV file or copy it directly to your clipboard." },
  ],
  relatedTools: ["csv-to-json", "json-formatter", "base64-encoder"],
  schema: "WebApplication",
  adsPositions: ["top", "after-tool"],
};
export default config;
