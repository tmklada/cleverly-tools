import type { ToolConfig } from "@/types/tool";
const config: ToolConfig = {
  slug: "scientific-calculator",
  title: "Scientific Calculator",
  description: "A full-featured online scientific calculator with trigonometric, logarithmic, exponential, and statistical functions. Supports brackets, memory, and calculation history — free to use on any device.",
  shortDescription: "Advanced online scientific calculator",
  category: "calculators",
  keywords: ["scientific calculator", "online scientific calculator", "advanced calculator", "trig calculator", "logarithm calculator", "sin cos tan calculator", "scientific calculator free"],
  icon: "🔢",
  featured: true,
  toolType: "calculator",
  faq: [
    { question: "What functions does the scientific calculator support?", answer: "The calculator supports sin, cos, tan, log, ln, square root, powers, factorials, Pi, Euler's number (e), and parentheses for complex expressions." },
    { question: "Does it support degrees and radians for trig functions?", answer: "Yes. You can switch between degrees (DEG) and radians (RAD) mode for all trigonometric calculations." },
    { question: "Is there a calculation history?", answer: "Yes. Your recent calculations are saved in a history panel so you can review or reuse previous results without recalculating." },
  ],
  howItWorks: [
    { step: 1, title: "Enter your expression", description: "Use the on-screen keypad or your keyboard to type a mathematical expression." },
    { step: 2, title: "Use scientific functions", description: "Click functions like sin, log, or sqrt to apply them to your calculation." },
    { step: 3, title: "View the result", description: "Press = or Enter to calculate and see the result instantly." },
  ],
  relatedTools: ["bmi-calculator", "percentage-calculator", "unit-converter"],
  schema: "WebApplication",
  adsPositions: ["top", "after-tool"],
};
export default config;
