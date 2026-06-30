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
    { question: "Is the coin flip truly random?", answer: "Yes, the result is generated using a cryptographically secure random function, giving exactly a 50% chance for heads or tails each flip." },
    { question: "Can I flip multiple coins at once?", answer: "Yes, you can flip multiple coins simultaneously and see all results at once, useful for group decisions or probability experiments." },
    { question: "Does the result history get saved?", answer: "Your flip history is shown during the session so you can track results, but it is cleared when you close the tab." },
  ],
  howItWorks: [
    { step: 1, title: "Click to flip", description: "Press the flip button or tap the coin to toss it virtually." },
    { step: 2, title: "See the result", description: "The coin animates and lands on heads or tails with a 50/50 probability." },
    { step: 3, title: "Check your history", description: "View your flip history below to track how many heads and tails you've gotten." },
  ],
  relatedTools: ["dice-roller", "random-number-generator", "list-randomizer"],
  schema: "WebApplication",
  adsPositions: ["top", "after-tool"],
};
export default config;
