import type { ToolConfig } from "@/types/tool";
const config: ToolConfig = {
  slug: "bpm-calculator",
  title: "BPM Calculator",
  description: "Calculate BPM (beats per minute) by tapping along to any song online for free. Find the exact tempo of music by tapping the beat and see its classical tempo marking, from Grave to Presto.",
  shortDescription: "Find song tempo by tapping the beat",
  category: "utilities",
  keywords: ["bpm calculator", "beats per minute calculator", "tap bpm", "find song bpm", "tempo calculator", "music bpm finder", "tap tempo online"],
  icon: "🥁",
  toolType: "utility",
  faq: [
    { question: "How do I calculate BPM by tapping?", answer: "Click the Tap button in time with the beat of any song — the tool calculates the average BPM from the last 8 taps." },
    { question: "How many taps do I need for an accurate result?", answer: "At least 2 taps produce a reading, but 4 to 8 steady taps give a much more reliable and stable BPM." },
    { question: "Can I convert BPM to delay time for effects myself?", answer: "The tool shows BPM and its classical tempo marking; to get a millisecond delay for reverb or echo, divide 60000 by the BPM for a quarter-note value, then halve or quarter that for eighth or sixteenth notes." },
  ],
  howItWorks: [
    { step: 1, title: "Play your music", description: "Start playing the song or beat you want to measure." },
    { step: 2, title: "Tap the beat", description: "Click the Tap button in time with the beat." },
    { step: 3, title: "Read the BPM", description: "The calculated BPM updates with each tap and stabilizes after a few beats." },
  ],
  relatedTools: ["metronome-online", "youtube-to-mp3", "age-calculator"],
  schema: "WebApplication",
  adsPositions: ["top", "after-tool"],
};
export default config;
