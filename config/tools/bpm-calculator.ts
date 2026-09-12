import type { ToolConfig } from "@/types/tool";
const config: ToolConfig = {
  slug: "bpm-calculator",
  title: "BPM Calculator",
  description: "Calculate BPM (beats per minute) by tapping along to any song online for free. Find the exact tempo of music by tapping the beat or the spacebar, see its classical tempo marking from Grave to Presto, and read off the BPM-to-milliseconds table for delay and reverb times.",
  shortDescription: "Find song tempo by tapping the beat",
  category: "utilities",
  keywords: ["bpm calculator", "beats per minute calculator", "tap bpm", "find song bpm", "tempo calculator", "music bpm finder", "tap tempo online", "bpm to ms", "bpm to delay time", "note length calculator"],
  icon: "🥁",
  toolType: "utility",
  faq: [
    { question: "How do I calculate BPM by tapping?", answer: "Click the Tap button — or just press the spacebar — in time with the beat of any song, and the tool calculates the average BPM from the last 8 taps." },
    { question: "Can I use the spacebar to tap?", answer: "Yes. Pressing the spacebar anywhere on the page registers a tap and the page won't scroll while you do it, so you can keep both hands free to follow the beat. Typing in a text field still inserts a normal space." },
    { question: "How many taps do I need for an accurate result?", answer: "At least 2 taps produce a reading, but 4 to 8 steady taps give a much more reliable and stable BPM." },
    { question: "How do I convert BPM to milliseconds for delay and reverb?", answer: "The tool does it for you: a BPM-to-milliseconds table shows whole, half, quarter, eighth, and sixteenth notes with dotted and triplet variants. The underlying formula is 60000 ÷ BPM for a quarter note, so 120 BPM gives a 500 ms quarter, a 250 ms eighth, and a 750 ms dotted quarter." },
    { question: "Can I enter a BPM instead of tapping?", answer: "Yes, type any BPM into the field above the table and every note length recalculates instantly, which is handy when you already know a track's tempo and just need the delay times." },
  ],
  howItWorks: [
    { step: 1, title: "Play your music", description: "Start playing the song or beat you want to measure." },
    { step: 2, title: "Tap the beat", description: "Click the Tap button or press the spacebar in time with the beat." },
    { step: 3, title: "Read the BPM and note times", description: "The BPM updates with each tap, and the millisecond table gives you delay and reverb times for every note length." },
  ],
  relatedTools: ["metronome-online", "youtube-to-mp3", "age-calculator"],
  schema: "WebApplication",
  adsPositions: ["top", "after-tool"],
};
export default config;
