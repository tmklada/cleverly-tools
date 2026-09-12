import type { ToolConfig } from "@/types/tool";
const config: ToolConfig = {
  slug: "time-zone-converter",
  title: "Time Zone Converter",
  description: "Convert any time between time zones around the world for free online. Schedule meetings across continents, find overlapping work hours, and see current time in multiple cities at once.",
  shortDescription: "Convert time between any time zones worldwide",
  category: "utilities",
  keywords: ["time zone converter", "convert time zones", "world time converter", "timezone calculator", "meeting time converter", "time zone comparison", "international time converter"],
  icon: "🕐",
  toolType: "utility",
  isNew: true,
  faq: [
    { question: "How many time zones does this tool support?", answer: "19 major zones and cities are covered, including UTC, New York, Los Angeles, Chicago, London, Paris, Dubai, Mumbai, Singapore, Tokyo, Sydney, São Paulo, Toronto, Berlin, Seoul, Beijing, Moscow, Tel Aviv, and Riyadh, spanning every major region and common offsets like IST and GST." },
    { question: "Does it automatically adjust for daylight saving time?", answer: "Yes, each zone uses its real current daylight saving rules automatically, since conversions are always based on today's date; there's no separate date picker for checking a past or future date." },
    { question: "Can I compare multiple time zones at once?", answer: "Yes, you can add multiple zones and see the equivalent time for all of them simultaneously in a side-by-side view." },
  ],
  howItWorks: [
    { step: 1, title: "Enter a time and source zone", description: "Pick the time and the time zone you want to convert from." },
    { step: 2, title: "Select target time zones", description: "Add one or more destination time zones to convert to." },
    { step: 3, title: "See all results", description: "All equivalent times are displayed together for easy comparison." },
  ],
  relatedTools: ["date-calculator", "age-calculator", "metronome-online"],
  schema: "WebApplication",
  adsPositions: ["top", "after-tool"],
};
export default config;
