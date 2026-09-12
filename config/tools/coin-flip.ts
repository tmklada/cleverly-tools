import type { ToolConfig } from "@/types/tool";
const config: ToolConfig = {
  slug: "coin-flip",
  title: "Coin Flip",
  description: "Flip a virtual coin online to get a random heads or tails result, one coin at a time or up to 100 at once. A quick and fair decision-making tool for any situation that needs a 50/50 choice.",
  shortDescription: "Virtual coin flip for quick decisions — free",
  category: "utilities",
  keywords: ["coin flip", "flip a coin", "heads or tails", "virtual coin flip", "online coin flip", "random coin toss", "decision maker", "coin toss"],
  icon: "🪙",
  toolType: "utility",
  faq: [
    { question: "Is the coin flip truly random?", answer: "Each flip comes from your browser's cryptographic random number generator (crypto.getRandomValues), using one unbiased bit per coin, so heads and tails are an exact 50/50 with no modulo bias." },
    { question: "Can I flip multiple coins at once?", answer: "Yes. Set any number from 1 to 100 and flip them together — you'll see every individual result plus the heads and tails totals and percentages for that batch, on top of your running session tally." },
    { question: "Does the flip history get saved?", answer: "Your running total of heads, tails, and overall flips is shown during the session so you can track results, but it resets when you close the tab or press Reset." },
  ],
  howItWorks: [
    { step: 1, title: "Choose how many coins", description: "Flip a single coin, or set any number up to 100 to toss them all in one go." },
    { step: 2, title: "See every result", description: "The coin animates, then all individual results appear with heads and tails counts and percentages for the batch." },
    { step: 3, title: "Check your stats", description: "View the running total of heads, tails, and flips below to track your whole session." },
  ],
  relatedTools: ["dice-roller", "random-number-generator", "list-randomizer"],
  schema: "WebApplication",
  adsPositions: ["top", "after-tool"],
};
export default config;
