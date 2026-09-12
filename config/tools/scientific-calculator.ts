import type { ToolConfig } from "@/types/tool";
const config: ToolConfig = {
  slug: "scientific-calculator",
  title: "Scientific Calculator",
  description: "A full-featured online scientific calculator with trigonometric, logarithmic, exponential, and power functions. Supports parentheses for complex expressions and full keyboard input — free to use on any device.",
  shortDescription: "Advanced online scientific calculator",
  category: "calculators",
  keywords: ["scientific calculator", "online scientific calculator", "advanced calculator", "trig calculator", "logarithm calculator", "sin cos tan calculator", "scientific calculator free"],
  icon: "🔢",
  featured: true,
  toolType: "calculator",
  faq: [
    { question: "What functions does the scientific calculator support?", answer: "The calculator supports sin, cos, tan, log, ln, square root, powers (xʸ), Pi, Euler's number (e), and parentheses for complex expressions." },
    { question: "Does it support degrees and radians for trig functions?", answer: "The sin, cos, and tan functions use JavaScript's Math library, which expects radians. Convert a degree value to radians (degrees × π ÷ 180) before applying a trig function if your angle is in degrees." },
    { question: "Can I use my keyboard instead of clicking buttons?", answer: "Yes. Click the calculator display once, then type numbers and operators directly, press Enter to evaluate, Backspace to delete, and Escape to clear." },
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
