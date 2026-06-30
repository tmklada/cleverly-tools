import type { ToolConfig } from "@/types/tool";
const config: ToolConfig = {
  slug: "name-picker",
  title: "Random Name Picker",
  description: "Pick a random name or winner from a list instantly. Great for classroom activities, prize draws, team assignments, and fair random selection from any group.",
  shortDescription: "Pick a random name from your list — free tool",
  category: "utilities",
  keywords: ["random name picker", "name picker wheel", "pick a winner", "random winner picker", "classroom name picker", "random selector", "wheel of names", "draw names"],
  icon: "🎯",
  toolType: "utility",
  faq: [
    { question: "Is the selection truly random and fair?", answer: "Yes, the picker uses a secure random algorithm so every name has an equal chance of being selected each time." },
    { question: "Can I remove a name after it's been picked?", answer: "Yes, picked names can be removed from the pool automatically so the same name won't be selected twice in a row." },
    { question: "How many names can I add?", answer: "You can add as many names as needed. The picker works well for small groups of 5 or large lists of hundreds of entries." },
  ],
  howItWorks: [
    { step: 1, title: "Add your names", description: "Enter all names or items into the list, one per line." },
    { step: 2, title: "Pick a random winner", description: "Click the pick button and a random name is selected instantly." },
    { step: 3, title: "Continue picking", description: "Remove picked names and continue until everyone has been selected." },
  ],
  relatedTools: ["list-randomizer", "coin-flip", "dice-roller"],
  schema: "WebApplication",
  adsPositions: ["top", "after-tool"],
};
export default config;
