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
    { question: "What types of dice can I roll?", answer: "You can roll standard D4, D6, D8, D10, D12, D20 dice, as well as custom dice with any number of sides." },
    { question: "Can I roll multiple dice at once?", answer: "Yes, select how many dice you want to roll and click once to see all results together with the total sum." },
    { question: "Is the dice roll truly random?", answer: "Yes, results use a secure random number generator to ensure each roll is statistically fair and unpredictable." },
  ],
  howItWorks: [
    { step: 1, title: "Choose your dice type", description: "Select the type of dice you want — D6 for standard, D20 for RPGs, or custom." },
    { step: 2, title: "Set the number of dice", description: "Choose how many dice to roll at the same time." },
    { step: 3, title: "Roll and see results", description: "Click roll to see individual results and the total sum instantly." },
  ],
  relatedTools: ["random-number-generator", "coin-flip", "list-randomizer"],
  schema: "WebApplication",
  adsPositions: ["top", "after-tool"],
};
export default config;
