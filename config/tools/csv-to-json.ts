import type { ToolConfig } from "@/types/tool";
const config: ToolConfig = {
  slug: "csv-to-json",
  title: "CSV to JSON Converter",
  description: "Convert CSV files to JSON format online for free in one click. Transform spreadsheet data into structured JSON arrays ready for use in APIs and applications.",
  shortDescription: "Convert CSV data to JSON instantly",
  category: "developer",
  keywords: ["csv to json", "convert csv to json", "csv json converter", "parse csv online", "csv parser", "spreadsheet to json", "data converter"],
  icon: "{ }",
  toolType: "developer",
  faq: [
    { question: "How does CSV to JSON conversion work?", answer: "The first row of your CSV is used as keys and each subsequent row becomes a JSON object in an array." },
    { question: "What delimiter types are supported?", answer: "Commas, semicolons, and tabs are supported as delimiters." },
    { question: "Can I paste CSV directly or do I need to upload a file?", answer: "Both options are supported — paste raw CSV text or upload a .csv file." },
  ],
  howItWorks: [
    { step: 1, title: "Paste or upload CSV", description: "Paste your CSV text or upload a .csv file into the tool." },
    { step: 2, title: "Convert to JSON", description: "Click Convert and the tool builds a JSON array from your data." },
    { step: 3, title: "Copy or download", description: "Copy the JSON output or download it as a .json file." },
  ],
  relatedTools: ["json-to-csv", "json-formatter", "base64-encoder"],
  schema: "WebApplication",
  adsPositions: ["top", "after-tool"],
};
export default config;
