import type { ToolConfig } from "@/types/tool";
const config: ToolConfig = {
  slug: "list-randomizer",
  title: "List Randomizer",
  description: "Shuffle any list of items into a random order instantly. Enter names, tasks, or any items and get a randomized list perfect for fair assignments or ordering.",
  shortDescription: "Shuffle any list into random order — free",
  category: "utilities",
  keywords: ["list randomizer", "shuffle list", "random order", "randomize list", "list shuffler", "random list generator", "item randomizer", "shuffle names"],
  icon: "🔀",
  toolType: "utility",
  faq: [
    { question: "How many items can I randomize?", answer: "You can shuffle up to hundreds of items at once. Just enter each item on a new line and click shuffle." },
    { question: "Can I shuffle the same list multiple times?", answer: "Yes, each shuffle produces a different random order. Click the shuffle button as many times as you need." },
    { question: "Can I copy the randomized list?", answer: "Yes, a copy button lets you instantly copy the shuffled list to your clipboard." },
  ],
  howItWorks: [
    { step: 1, title: "Enter your list", description: "Type or paste your items into the text area, one item per line." },
    { step: 2, title: "Click shuffle", description: "Press the shuffle button to randomly reorder all items." },
    { step: 3, title: "Copy or use the result", description: "Copy the randomized list to your clipboard or use it directly." },
  ],
  relatedTools: ["name-picker", "random-number-generator", "coin-flip"],
  schema: "WebApplication",
  adsPositions: ["top", "after-tool"],
};
export default config;
