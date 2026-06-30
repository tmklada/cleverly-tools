import type { ToolConfig } from "@/types/tool";
const config: ToolConfig = {
  slug: "date-calculator",
  title: "Date Duration Calculator",
  description: "Calculate the exact number of days, weeks, months, and years between two dates for free online. Add or subtract days from any date and find due dates, deadlines, and anniversaries instantly.",
  shortDescription: "Calculate days, weeks, and months between two dates",
  category: "calculators",
  keywords: ["date calculator", "date duration calculator", "days between dates", "date difference calculator", "how many days between", "add days to date", "date math calculator"],
  icon: "📅",
  toolType: "calculator",
  faq: [
    { question: "How do I calculate days between two dates?", answer: "Enter the start date and end date and the tool instantly shows the difference in days, weeks, months, and years." },
    { question: "Can I add or subtract days from a date?", answer: "Yes, enter a starting date and a number of days to add or subtract — the tool calculates the resulting date." },
    { question: "Does it account for leap years?", answer: "Yes, all calculations account for leap years and varying month lengths for accurate results." },
  ],
  howItWorks: [
    { step: 1, title: "Enter start and end dates", description: "Select or type the two dates you want to compare." },
    { step: 2, title: "Calculate the difference", description: "The tool shows the gap in days, weeks, months, and years instantly." },
    { step: 3, title: "Add or subtract days", description: "Optionally enter a number of days to add or subtract from any date." },
  ],
  relatedTools: ["age-calculator", "time-zone-converter", "percentage-calculator"],
  schema: "WebApplication",
  adsPositions: ["top", "after-tool"],
};
export default config;
