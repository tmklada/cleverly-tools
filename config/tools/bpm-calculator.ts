import type { ToolConfig } from "@/types/tool";
const config: ToolConfig = {
  slug: "bpm-calculator",
  title: "BPM Calculator",
  description: "Calculate BPM (beats per minute) by tapping along to any song online for free. Find the exact tempo of music by tapping the beat, or convert between BPM and millisecond delay values.",
  shortDescription: "Find song tempo by tapping the beat",
  category: "utilities",
  keywords: ["bpm calculator", "beats per minute calculator", "tap bpm", "find song bpm", "tempo calculator", "music bpm finder", "tap tempo online"],
  icon: "🥁",
  toolType: "utility",
  faq: [
    { question: "How do I calculate BPM by tapping?", answer: "Click or tap the spacebar in time with the beat of any song — the tool calculates the average BPM after a few taps." },
    { question: "How many taps do I need for an accurate result?", answer: "At least 4 taps are needed for a reliable estimate, and 8 or more taps gives a very accurate BPM." },
    { question: "Can I convert BPM to delay time for effects?", answer: "Yes, the tool also shows the millisecond delay value for each BPM, useful for setting up reverb and echo effects." },
  ],
  howItWorks: [
    { step: 1, title: "Play your music", description: "Start playing the song or beat you want to measure." },
    { step: 2, title: "Tap the beat", description: "Click the Tap button or press spacebar in time with the beat." },
    { step: 3, title: "Read the BPM", description: "The calculated BPM updates with each tap and stabilizes after a few beats." },
  ],
  relatedTools: ["metronome-online", "youtube-to-mp3", "age-calculator"],
  schema: "WebApplication",
  adsPositions: ["top", "after-tool"],
};
export default config;
