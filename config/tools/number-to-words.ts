import type { ToolConfig } from "@/types/tool";
const config: ToolConfig = {
  slug: "number-to-words",
  title: "Number to Words Converter",
  description: "Convert any number to words in English for free online, including large numbers, decimals, and currency amounts. Useful for writing checks, legal documents, and accessibility labels.",
  shortDescription: "Convert numbers to spelled-out English words",
  category: "text",
  keywords: ["number to words", "numbers in words", "convert number to text", "spell out numbers", "number words converter", "amount in words", "check writing words"],
  icon: "🔢",
  toolType: "text",
  faq: [
    { question: "What is Number to Words used for?", answer: "It is commonly used for writing check amounts, legal contracts, invoices, and anywhere numbers must be spelled out in full." },
    { question: "What is the largest number supported?", answer: "Numbers up to 999,999,999,999,999 (999 trillion) are fully supported, including proper use of trillion, billion, million, and thousand." },
    { question: "Can it handle decimal numbers?", answer: "In Words and Ordinal mode only the whole-number part is converted, so 3.14 becomes 'three'. In Currency mode the decimal part is converted too, as cents — 3.14 becomes 'three dollars and fourteen cents'." },
  ],
  howItWorks: [
    { step: 1, title: "Enter a number", description: "Type any whole number or decimal into the input field." },
    { step: 2, title: "Choose format", description: "Select standard text, ordinal (1st, 2nd), or currency format." },
    { step: 3, title: "Copy the result", description: "The spelled-out version appears instantly — copy it with one click." },
  ],
  relatedTools: ["percentage-calculator", "loan-calculator", "age-calculator"],
  schema: "WebApplication",
  adsPositions: ["top", "after-tool"],
};
export default config;
