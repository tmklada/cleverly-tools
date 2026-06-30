import type { ToolConfig } from "@/types/tool";
const config: ToolConfig = {
  slug: "sleep-calculator",
  title: "Sleep Calculator",
  description: "Find the best time to wake up or go to sleep based on natural sleep cycles. Wake up feeling refreshed by timing your alarm to the end of a complete sleep cycle.",
  shortDescription: "Calculate the best time to sleep and wake up",
  category: "health",
  keywords: ["sleep calculator", "sleep cycle calculator", "best time to wake up", "bedtime calculator", "when to sleep", "sleep timer", "rem sleep calculator", "wake up time calculator"],
  icon: "😴",
  toolType: "health",
  faq: [
    { question: "What is a sleep cycle?", answer: "A sleep cycle lasts approximately 90 minutes and includes light sleep, deep sleep, and REM sleep. Waking up at the end of a cycle helps you feel more alert and refreshed." },
    { question: "How many sleep cycles do I need?", answer: "Most adults need 5-6 complete sleep cycles (7.5-9 hours) per night. Waking mid-cycle causes grogginess even after many hours of sleep." },
    { question: "Should I factor in time to fall asleep?", answer: "Yes, the calculator adds about 15 minutes to account for the time it typically takes to fall asleep after lying down." },
  ],
  howItWorks: [
    { step: 1, title: "Enter your wake-up time or bedtime", description: "Tell the calculator when you need to wake up or when you plan to go to bed." },
    { step: 2, title: "Choose your direction", description: "Calculate what time to go to sleep, or what times to set your alarm for." },
    { step: 3, title: "Pick the best option", description: "View multiple wake-up or bedtime options aligned with sleep cycle lengths." },
  ],
  relatedTools: ["calorie-calculator", "heart-rate-calculator", "water-intake-calculator"],
  schema: "WebApplication",
  adsPositions: ["top", "after-tool"],
};
export default config;
