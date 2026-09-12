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
    { question: "What types of dice can I roll?", answer: "You can roll six standard dice types: D4, D6, D8, D10, D12, and D20, the same set used in most board games and tabletop RPGs." },
    { question: "Can I roll multiple dice at once?", answer: "Yes, choose up to 6 dice of the same type and click once to see all results together with the total sum." },
    { question: "Is the dice roll truly random?", answer: "Yes, each die uses the browser's random number generator to produce an independent, unbiased result every time, which is accurate enough for games and casual use." },
  ],
  howItWorks: [
    { step: 1, title: "Choose your dice type", description: "Select D4, D6, D8, D10, D12, or D20 depending on your game." },
    { step: 2, title: "Set the number of dice", description: "Choose how many dice (1 to 6) to roll at the same time." },
    { step: 3, title: "Roll and see results", description: "Click roll to see individual results and the total sum instantly." },
  ],
  relatedTools: ["random-number-generator", "coin-flip", "list-randomizer"],
  schema: "WebApplication",
  adsPositions: ["top", "after-tool"],
};
export default config;
