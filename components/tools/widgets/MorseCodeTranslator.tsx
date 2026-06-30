"use client";
import { useState, useRef } from "react";

const MORSE: Record<string, string> = {
  A: ".-", B: "-...", C: "-.-.", D: "-..", E: ".", F: "..-.", G: "--.",
  H: "....", I: "..", J: ".---", K: "-.-", L: ".-..", M: "--", N: "-.",
  O: "---", P: ".--.", Q: "--.-", R: ".-.", S: "...", T: "-", U: "..-",
  V: "...-", W: ".--", X: "-..-", Y: "-.--", Z: "--..",
  "0": "-----", "1": ".----", "2": "..---", "3": "...--", "4": "....-",
  "5": ".....", "6": "-....", "7": "--...", "8": "---..", "9": "----.",
  ".": ".-.-.-", ",": "--..--", "?": "..--..", "!": "-.-.--",
};

const REVERSE_MORSE: Record<string, string> = Object.fromEntries(
  Object.entries(MORSE).map(([k, v]) => [v, k])
);

function textToMorse(text: string): string {
  return text.toUpperCase().split("").map((c) => {
    if (c === " ") return " / ";
    return MORSE[c] || "?";
  }).join(" ");
}

function morseToText(morse: string): string {
  return morse.split(" / ").map((word) =>
    word.split(" ").map((code) => REVERSE_MORSE[code] || "?").join("")
  ).join(" ");
}

export default function MorseCodeTranslator() {
  const [text, setText] = useState("");
  const [morse, setMorse] = useState("");
  const [copiedText, setCopiedText] = useState(false);
  const [copiedMorse, setCopiedMorse] = useState(false);
  const [playing, setPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const handleTextChange = (val: string) => {
    setText(val);
    setMorse(val ? textToMorse(val) : "");
  };

  const handleMorseChange = (val: string) => {
    setMorse(val);
    setText(val ? morseToText(val) : "");
  };

  const copyText = async () => {
    await navigator.clipboard.writeText(text);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  const copyMorse = async () => {
    await navigator.clipboard.writeText(morse);
    setCopiedMorse(true);
    setTimeout(() => setCopiedMorse(false), 2000);
  };

  const playMorse = async () => {
    if (playing) return;
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    }
    const ctx = audioCtxRef.current;
    const unit = 80; // ms per dot
    setPlaying(true);

    const beep = (duration: number, startTime: number) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = 600;
      gain.gain.setValueAtTime(0.3, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration / 1000);
      osc.start(startTime);
      osc.stop(startTime + duration / 1000);
    };

    let time = ctx.currentTime + 0.1;
    const symbols = morse.replace(/ \/ /g, " SPACE ").split(" ");
    let totalTime = 0;

    for (const sym of symbols) {
      if (sym === "SPACE") {
        time += (unit * 7) / 1000;
        totalTime += unit * 7;
      } else {
        for (const s of sym) {
          if (s === ".") {
            beep(unit, time);
            time += (unit * 2) / 1000;
            totalTime += unit * 2;
          } else if (s === "-") {
            beep(unit * 3, time);
            time += (unit * 4) / 1000;
            totalTime += unit * 4;
          }
        }
        time += (unit * 2) / 1000;
        totalTime += unit * 2;
      }
    }

    setTimeout(() => setPlaying(false), totalTime + 200);
  };

  const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const DIGITS = "0123456789".split("");

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Text</label>
              <button onClick={copyText} className="text-xs text-blue-600 dark:text-blue-400 hover:underline">
                {copiedText ? "Copied!" : "Copy"}
              </button>
            </div>
            <textarea
              value={text}
              onChange={(e) => handleTextChange(e.target.value)}
              placeholder="Type your text here..."
              rows={5}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Morse Code</label>
              <button onClick={copyMorse} className="text-xs text-blue-600 dark:text-blue-400 hover:underline">
                {copiedMorse ? "Copied!" : "Copy"}
              </button>
            </div>
            <textarea
              value={morse}
              onChange={(e) => handleMorseChange(e.target.value)}
              placeholder="... --- ..."
              rows={5}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>
        </div>

        {morse && (
          <div className="mt-4 flex justify-end">
            <button
              onClick={playMorse}
              disabled={playing}
              className="flex items-center gap-2 px-5 py-2 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white rounded-lg font-medium transition-colors"
            >
              {playing ? "Playing..." : "▶ Play Audio"}
            </button>
          </div>
        )}
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">Morse Code Reference</h3>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-1 text-sm">
          {[...ALPHABET, ...DIGITS].map((ch) => (
            <div key={ch} className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 rounded px-2 py-1">
              <span className="font-bold text-gray-900 dark:text-white w-4">{ch}</span>
              <span className="font-mono text-gray-500 dark:text-gray-400 text-xs">{MORSE[ch]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
