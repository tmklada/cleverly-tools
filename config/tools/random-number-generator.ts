import type { ToolConfig } from "@/types/tool";
const config: ToolConfig = {
  slug: "random-number-generator",
  title: "Random Number Generator",
  description: "Generate truly random numbers within any range instantly. Ideal for games, lotteries, statistical sampling, and any situation requiring unbiased random selection.",
  shortDescription: "Generate random numbers in any range — free",
  category: "utilities",
  keywords: ["random number generator", "random number", "number randomizer", "random integer", "lottery number generator", "random picker", "dice roll simulator", "random selection"],
  icon: "🎲",
  toolType: "utility",
  faq: [
    { question: "How random are the numbers generated?", answer: "Numbers are generated using the browser's cryptographically secure random number API, making them truly unpredictable and unbiased." },
    { question: "Can I generate multiple numbers at once?", answer: "Yes, you can specify how many numbers to generate at once, and optionally exclude duplicates for lottery-style draws." },
    { question: "What is the maximum range I can use?", answer: "You can set any minimum and maximum value within the integer range. There's no practical limit for everyday use cases." },
  ],
  howItWorks: [
    { step: 1, title: "Set your range", description: "Enter the minimum and maximum values for your random number range." },
    { step: 2, title: "Choose quantity", description: "Select how many random numbers you want to generate." },
    { step: 3, title: "Generate and use", description: "Click generate to instantly get your random numbers." },
  ],
  relatedTools: ["dice-roller", "coin-flip", "list-randomizer"],
  schema: "WebApplication",
  adsPositions: ["top", "after-tool"],
};
export default config;
