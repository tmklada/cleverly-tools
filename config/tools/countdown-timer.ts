import type { ToolConfig } from "@/types/tool";
const config: ToolConfig = {
  slug: "countdown-timer",
  title: "Countdown Timer",
  description: "Set a countdown timer to any date or time and track exactly how long until your event. Perfect for deadlines, launches, birthdays, and special events.",
  shortDescription: "Count down to any date or time — free tool",
  category: "utilities",
  keywords: ["countdown timer", "event countdown", "date countdown", "deadline timer", "online countdown", "countdown clock", "days until", "time remaining"],
  icon: "⏳",
  toolType: "utility",
  faq: [
    { question: "Can I count down to a specific date?", answer: "Yes, you can set the countdown to any future date and time, and it will display days, hours, minutes, and seconds remaining." },
    { question: "Will I get an alert when the countdown ends?", answer: "Yes, the browser will display a notification and play a sound when your countdown reaches zero." },
    { question: "Can I share my countdown with others?", answer: "Yes, the countdown link can be shared so others can see the same timer counting down to your event." },
  ],
  howItWorks: [
    { step: 1, title: "Set your target date and time", description: "Enter the date and time you want to count down to." },
    { step: 2, title: "Start the countdown", description: "The timer begins counting down in days, hours, minutes, and seconds." },
    { step: 3, title: "Get notified at zero", description: "Receive an alert when your countdown reaches zero." },
  ],
  relatedTools: ["timer-stopwatch", "age-calculator", "date-calculator"],
  schema: "WebApplication",
  adsPositions: ["top", "after-tool"],
};
export default config;
