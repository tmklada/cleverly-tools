import type { ToolConfig } from "@/types/tool";
const config: ToolConfig = {
  slug: "scientific-calculator",
  title: "Scientific Calculator",
  description: "A full-featured online scientific calculator with trigonometric, logarithmic, exponential, and power functions, a DEG/RAD toggle, factorials, memory keys, and saved calculation history. Supports parentheses for complex expressions and full keyboard input — free to use on any device.",
  shortDescription: "Advanced online scientific calculator",
  category: "calculators",
  keywords: ["scientific calculator", "online scientific calculator", "advanced calculator", "trig calculator", "logarithm calculator", "sin cos tan calculator", "scientific calculator free", "factorial calculator", "degrees radians calculator"],
  icon: "🔢",
  featured: true,
  toolType: "calculator",
  faq: [
    { question: "What functions does the scientific calculator support?", answer: "The calculator supports sin, cos, tan and their inverses, log (base 10), ln, square root, cube root, squares, powers (xʸ), reciprocals (1/x), factorials (n!), percentages, Pi, Euler's number (e), and parentheses for complex expressions." },
    { question: "Does it support degrees and radians for trig functions?", answer: "Yes. Use the DEG/RAD toggle above the display to switch modes, and sin, cos, tan and their inverses follow it immediately — in DEG mode sin(30) returns 0.5, and in RAD mode sin(π ÷ 2) returns 1." },
    { question: "Does it have memory keys and calculation history?", answer: "Yes. MS stores the current value, MR recalls it, M+ and M− add to or subtract from it, and MC clears it, with an on-screen indicator whenever memory holds a value. Every calculation is also saved to a scrollable history list you can click to reuse an entry, or clear at any time." },
    { question: "Can I calculate a factorial?", answer: "Yes. Enter a whole number and press n! — for example 5! returns 120. Negative numbers, decimals, and anything above 170! return a clear explanation instead of an error code." },
    { question: "Can I use my keyboard instead of clicking buttons?", answer: "Yes. Click the calculator display once, then type numbers and operators directly, press Enter to evaluate, Backspace to delete, and Escape to clear." },
  ],
  howItWorks: [
    { step: 1, title: "Enter your expression", description: "Use the on-screen keypad or your keyboard to type a mathematical expression." },
    { step: 2, title: "Use scientific functions", description: "Click functions like sin, log, √ or n! to apply them, and set DEG or RAD first if your calculation involves angles." },
    { step: 3, title: "View the result", description: "Press = or Enter to calculate and see the result instantly." },
  ],
  relatedTools: ["bmi-calculator", "percentage-calculator", "unit-converter"],
  schema: "WebApplication",
  adsPositions: ["top", "after-tool"],
};
export default config;
