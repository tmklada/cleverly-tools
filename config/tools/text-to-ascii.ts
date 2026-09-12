import type { ToolConfig } from "@/types/tool";
const config: ToolConfig = {
  slug: "text-to-ascii",
  title: "Text to ASCII Art Generator",
  description: "Convert any text into ASCII art with five font styles for free online. Create block letters, banner art, and decorative headings for terminals, readmes, and social media posts.",
  shortDescription: "Generate ASCII art text in dozens of font styles",
  category: "text",
  keywords: ["text to ascii art", "ascii art generator", "ascii text generator", "text art", "ascii font", "ascii banner generator", "figlet online"],
  icon: "🔠",
  toolType: "text",
  faq: [
    { question: "What is ASCII art text?", answer: "ASCII art text uses printable characters to form large stylized letters that look like custom fonts in plain text environments." },
    { question: "What can I use ASCII art for?", answer: "It is popular for README headers, terminal output, social media bios, email signatures, and any place where only plain text is allowed." },
    { question: "How many font styles are available?", answer: "Five font styles are available: Block, Banner, Digital LCD, Simple, and Shadow, ranging from large block letters to compact bracketed and LCD-style text." },
  ],
  howItWorks: [
    { step: 1, title: "Type your text", description: "Enter the word or phrase you want to convert to ASCII art." },
    { step: 2, title: "Choose a font style", description: "Pick one of five font styles: Block, Banner, Digital LCD, Simple, or Shadow." },
    { step: 3, title: "Copy the output", description: "Copy the ASCII art and paste it wherever you need it." },
  ],
  relatedTools: ["lorem-ipsum-generator", "morse-code-translator", "text-repeater"],
  schema: "WebApplication",
  adsPositions: ["top", "after-tool"],
};
export default config;
