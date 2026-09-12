import type { ToolConfig } from "@/types/tool";
const config: ToolConfig = {
  slug: "lorem-ipsum-generator",
  title: "Lorem Ipsum Generator",
  description: "Generate custom lorem ipsum placeholder text for your designs, wireframes, and mockups. Choose paragraphs, sentences, or words, set the exact amount, and copy the dummy text in one click.",
  shortDescription: "Generate lorem ipsum placeholder text",
  category: "text",
  keywords: ["lorem ipsum generator", "placeholder text generator", "dummy text generator", "lorem ipsum online", "generate lorem ipsum", "fake text generator", "latin placeholder text"],
  icon: "📜",
  toolType: "text",
  faq: [
    { question: "What is Lorem Ipsum?", answer: "Lorem Ipsum is scrambled Latin text used as placeholder content in design and publishing. It has been the industry standard dummy text since the 1500s." },
    { question: "Can I generate sentences or words instead of paragraphs?", answer: "Yes. Switch between three output modes: paragraphs (1-10, with 10-150 words each), sentences (1-50), or words (5-500), so you can fill a body of copy, a subheading, or a short label with the right amount of text." },
    { question: "Can I customize the amount of text generated?", answer: "Yes. Each mode has its own slider — paragraphs 1-10 plus words per paragraph 10-150, sentences 1-50, or words 5-500 — so you can match the text to your layout exactly." },
    { question: "Does it start with 'Lorem ipsum dolor sit amet'?", answer: "By default yes, because that opening is what clients and designers expect to see. There's a toggle to turn it off if you'd rather have fully randomised filler that doesn't begin with the familiar line." },
    { question: "Is the Lorem Ipsum text the same every time?", answer: "No. Apart from the optional classic opening line, the words are shuffled randomly on each click of Generate, so you get a fresh variation every time instead of the same fixed passage." },
  ],
  howItWorks: [
    { step: 1, title: "Pick an output mode", description: "Choose paragraphs, sentences, or words depending on how much text your layout needs." },
    { step: 2, title: "Set the amount", description: "Use the slider to set the exact count, plus words per paragraph when generating paragraphs, and decide whether to start with the classic 'Lorem ipsum dolor sit amet' line." },
    { step: 3, title: "Generate, copy and use", description: "Click Generate, then Copy to clipboard, and paste the text into your design or document." },
  ],
  relatedTools: ["word-counter", "text-case-converter", "text-to-slug"],
  schema: "WebApplication",
  adsPositions: ["top", "after-tool"],
};
export default config;
