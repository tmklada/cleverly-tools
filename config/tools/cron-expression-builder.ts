import type { ToolConfig } from "@/types/tool";
const config: ToolConfig = {
  slug: "cron-expression-builder",
  title: "Cron Expression Builder",
  description: "Build and validate cron expressions visually with a human-readable explanation for each schedule. Generate cron syntax for any repeating task without memorizing the format.",
  shortDescription: "Build cron expressions with plain-English explanations",
  category: "developer",
  keywords: ["cron expression builder", "cron generator", "cron syntax", "cron job builder", "cron schedule", "crontab generator", "cron expression validator"],
  icon: "⏰",
  toolType: "developer",
  faq: [
    { question: "What is a cron expression?", answer: "A cron expression is a string of five fields (minute, hour, day, month, weekday) that defines when a scheduled task should run automatically." },
    { question: "How do I run a job every 5 minutes?", answer: "Use */5 * * * * — the tool generates and explains this automatically when you pick that interval." },
    { question: "Can I validate an existing cron expression?", answer: "Yes, paste any cron expression and the tool will explain it in plain English and show the next run times." },
  ],
  howItWorks: [
    { step: 1, title: "Choose schedule type", description: "Select from presets like hourly, daily, weekly, or set a custom interval." },
    { step: 2, title: "Fine-tune the settings", description: "Adjust minute, hour, day, and month fields using dropdowns or input." },
    { step: 3, title: "Copy the expression", description: "Copy the cron expression along with a human-readable description." },
  ],
  relatedTools: ["json-formatter", "hash-generator", "base64-encoder"],
  schema: "WebApplication",
  adsPositions: ["top", "after-tool"],
};
export default config;
