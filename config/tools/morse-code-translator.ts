import type { ToolConfig } from "@/types/tool";
const config: ToolConfig = {
  slug: "morse-code-translator",
  title: "Morse Code Translator",
  description: "Translate text to Morse code and Morse code back to text online for free. Encode and decode messages using dots and dashes with optional audio playback of the Morse signal.",
  shortDescription: "Translate text to Morse code and back instantly",
  category: "text",
  keywords: ["morse code translator", "text to morse code", "morse code decoder", "morse code converter", "encode morse code", "decode morse code", "morse code audio"],
  icon: "📡",
  toolType: "text",
  faq: [
    { question: "What is Morse code?", answer: "Morse code is a system that uses dots (.) and dashes (-) to represent letters and numbers, originally used for telegraph communication." },
    { question: "Can I hear the Morse code as audio?", answer: "Yes, the tool plays the Morse code as audio beeps at adjustable speed so you can learn or verify the output." },
    { question: "Does it support international characters?", answer: "Standard English letters, numbers, and punctuation are supported per the international Morse code standard." },
  ],
  howItWorks: [
    { step: 1, title: "Enter text or Morse code", description: "Type plain text to encode, or paste dots and dashes to decode." },
    { step: 2, title: "Translate instantly", description: "The translation appears automatically as you type in real time." },
    { step: 3, title: "Play or copy", description: "Play the audio signal or copy the Morse code output to use elsewhere." },
  ],
  relatedTools: ["text-to-ascii", "binary-to-text", "base64-encoder"],
  schema: "WebApplication",
  adsPositions: ["top", "after-tool"],
};
export default config;
