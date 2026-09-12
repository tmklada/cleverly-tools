import type { ToolConfig } from "@/types/tool";
const config: ToolConfig = {
  slug: "lorem-ipsum-generator",
  title: "Lorem Ipsum Generator",
  description: "Generate custom lorem ipsum placeholder text for your designs, wireframes, and mockups. Choose the number of paragraphs and words per paragraph and copy the dummy text in one click.",
  shortDescription: "Generate lorem ipsum placeholder text",
  category: "text",
  keywords: ["lorem ipsum generator", "placeholder text generator", "dummy text generator", "lorem ipsum online", "generate lorem ipsum", "fake text generator", "latin placeholder text"],
  icon: "📜",
  toolType: "text",
  faq: [
    { question: "What is Lorem Ipsum?", answer: "Lorem Ipsum is scrambled Latin text used as placeholder content in design and publishing. It has been the industry standard dummy text since the 1500s." },
    { question: "Can I customize the amount of text generated?", answer: "Yes. Use the sliders to set the number of paragraphs (1-10) and the number of words per paragraph (10-150) to match your layout needs." },
    { question: "Is the Lorem Ipsum text the same every time?", answer: "No. Every paragraph always starts with the word 'Lorem,' but the rest of the words are shuffled randomly on each click of Generate, so you get a fresh variation every time instead of the same fixed passage." },
  ],
  howItWorks: [
    { step: 1, title: "Choose text amount", description: "Set the number of paragraphs and the number of words per paragraph you need." },
    { step: 2, title: "Generate the text", description: "Click Generate to produce your lorem ipsum placeholder text instantly." },
    { step: 3, title: "Copy and use", description: "Click Copy to clipboard and paste the text into your design or document." },
  ],
  relatedTools: ["word-counter", "text-case-converter", "text-to-slug"],
  schema: "WebApplication",
  adsPositions: ["top", "after-tool"],
};
export default config;
