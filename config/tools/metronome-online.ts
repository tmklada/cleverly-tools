import type { ToolConfig } from "@/types/tool";
const config: ToolConfig = {
  slug: "metronome-online",
  title: "Online Metronome",
  description: "Use a free online metronome to keep perfect time during music practice, with adjustable BPM and time signature. No download needed — works instantly in your browser with accurate click sounds.",
  shortDescription: "Free online metronome for music practice",
  category: "utilities",
  keywords: ["online metronome", "free metronome", "metronome bpm", "music metronome", "tempo keeper", "practice metronome", "beat counter online"],
  icon: "🎼",
  toolType: "utility",
  faq: [
    { question: "What BPM range does the metronome support?", answer: "The metronome works from 20 BPM (very slow) to 300 BPM (extremely fast) to cover all musical styles." },
    { question: "Can I change the time signature?", answer: "Yes, you can set 2/4, 3/4, 4/4, 6/8, and other common time signatures with accented beats." },
    { question: "Does it work on mobile?", answer: "Yes, the metronome works on smartphones and tablets — just open it in your mobile browser." },
  ],
  howItWorks: [
    { step: 1, title: "Set your tempo", description: "Enter the BPM or use the +/- buttons to set your desired tempo." },
    { step: 2, title: "Choose time signature", description: "Select how many beats per measure and which beat gets the accent." },
    { step: 3, title: "Press start", description: "Click Start and the metronome begins clicking at your set tempo." },
  ],
  relatedTools: ["bpm-calculator", "youtube-to-mp3", "time-zone-converter"],
  schema: "WebApplication",
  adsPositions: ["top", "after-tool"],
};
export default config;
