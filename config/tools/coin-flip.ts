import type { ToolConfig } from "@/types/tool";
const config: ToolConfig = {
  slug: "coin-flip",
  title: "Coin Flip",
  description: "Flip a virtual coin online to get a random heads or tails result. A quick and fair decision-making tool for any situation that needs a 50/50 choice.",
  shortDescription: "Virtual coin flip for quick decisions — free",
  category: "utilities",
  keywords: ["coin flip", "flip a coin", "heads or tails", "virtual coin flip", "online coin flip", "random coin toss", "decision maker", "coin toss"],
  icon: "🪙",
  toolType: "utility",
  faq: [
    { question: "Is the coin flip truly random?", answer: "The result is generated using the browser's built-in random number function, giving statistically close to a 50% chance for heads or tails on each flip." },
    { question: "Can I flip multiple times at once?", answer: "Yes, the Flip 10x button runs ten flips in a row and adds them to your running heads/tails tally, useful for probability experiments." },
    { question: "Does the flip history get saved?", answer: "Your running total of heads, tails, and overall flips is shown during the session so you can track results, but it resets when you close the tab." },
  ],
  howItWorks: [
    { step: 1, title: "Click to flip", description: "Press the flip button or tap the coin to toss it virtually." },
    { step: 2, title: "See the result", description: "The coin animates and lands on heads or tails with a 50/50 probability." },
    { step: 3, title: "Check your stats", description: "View the running total of heads, tails, and flips below to track your session." },
  ],
  relatedTools: ["dice-roller", "random-number-generator", "list-randomizer"],
  schema: "WebApplication",
  adsPositions: ["top", "after-tool"],
};
export default config;
