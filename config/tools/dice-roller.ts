import type { ToolConfig } from "@/types/tool";
const config: ToolConfig = {
  slug: "dice-roller",
  title: "Dice Roller",
  description: "Roll virtual dice online with support for standard and custom dice types. Perfect for board games, tabletop RPGs, and any game that requires dice.",
  shortDescription: "Roll virtual dice for games — free online tool",
  category: "utilities",
  keywords: ["dice roller", "roll dice online", "virtual dice", "d20 roller", "rpg dice", "dice simulator", "random dice", "board game dice", "tabletop dice"],
  icon: "🎲",
  toolType: "utility",
  faq: [
    { question: "What types of dice can I roll?", answer: "The six standard presets are D4, D6, D8, D10, D12, and D20, and you can also type a custom number of sides — anything from 2 to 1000 — for percentile dice, D3, D100, or any house-rule die your game needs." },
    { question: "Can I roll multiple dice at once?", answer: "Yes, roll up to 10 dice of the same type in one click and see every individual die result alongside the combined total." },
    { question: "Can I add a modifier to the roll?", answer: "Yes. Set a positive or negative modifier and it is applied to the sum, so a 2d6+3 roll shows the individual dice, the dice subtotal, and the final total the way tabletop notation expects." },
    { question: "Is the dice roll truly random?", answer: "Yes. Each die uses your browser's cryptographic random number generator (crypto.getRandomValues) with rejection sampling, so every face is exactly equally likely with no modulo bias." },
  ],
  howItWorks: [
    { step: 1, title: "Choose your dice type", description: "Select a D4, D6, D8, D10, D12, or D20 preset, or type any custom number of sides from 2 to 1000." },
    { step: 2, title: "Set dice count and modifier", description: "Choose how many dice to roll together and add a plus or minus modifier if your game calls for one." },
    { step: 3, title: "Roll and see results", description: "Click roll to see each individual die, the dice subtotal, and the final total instantly." },
  ],
  relatedTools: ["random-number-generator", "coin-flip", "list-randomizer"],
  schema: "WebApplication",
  adsPositions: ["top", "after-tool"],
};
export default config;
