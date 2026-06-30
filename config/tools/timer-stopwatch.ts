import type { ToolConfig } from "@/types/tool";
const config: ToolConfig = {
  slug: "timer-stopwatch",
  title: "Timer & Stopwatch",
  description: "A free online timer and stopwatch with lap tracking. Perfect for workouts, cooking, studying, or any activity that needs precise time measurement.",
  shortDescription: "Online timer and stopwatch with lap tracking",
  category: "utilities",
  keywords: ["online timer", "stopwatch online", "free timer", "countdown timer", "lap timer", "online stopwatch", "study timer", "workout timer"],
  icon: "⏱️",
  toolType: "utility",
  faq: [
    { question: "Can I track laps with the stopwatch?", answer: "Yes, the stopwatch includes a lap button that records split times so you can track individual intervals or laps." },
    { question: "Does the timer work when I switch tabs?", answer: "Yes, the timer continues running in the background even when you switch to another browser tab." },
    { question: "Can I set a custom countdown time?", answer: "Yes, you can enter any hours, minutes, and seconds for the countdown timer. An alert will notify you when the time is up." },
  ],
  howItWorks: [
    { step: 1, title: "Choose timer or stopwatch", description: "Select countdown timer mode to count down from a set time, or stopwatch mode to count up." },
    { step: 2, title: "Start and control", description: "Hit start to begin, pause to stop temporarily, and reset to start over." },
    { step: 3, title: "Track your time", description: "Use the lap button on the stopwatch to record split times as you go." },
  ],
  relatedTools: ["countdown-timer", "age-calculator", "random-number-generator"],
  schema: "WebApplication",
  adsPositions: ["top", "after-tool"],
};
export default config;
