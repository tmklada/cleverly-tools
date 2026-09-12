"use client";
import { useState } from "react";

const LOREM_WORDS = [
  "lorem","ipsum","dolor","sit","amet","consectetur","adipiscing","elit","sed","do",
  "eiusmod","tempor","incididunt","ut","labore","et","dolore","magna","aliqua","enim",
  "ad","minim","veniam","quis","nostrud","exercitation","ullamco","laboris","nisi","aliquip",
  "ex","ea","commodo","consequat","duis","aute","irure","in","reprehenderit","voluptate",
  "velit","esse","cillum","fugiat","nulla","pariatur","excepteur","sint","occaecat","cupidatat",
  "non","proident","sunt","culpa","qui","officia","deserunt","mollit","anim","id","est","laborum",
  "curabitur","pretium","tincidunt","lacus","donec","accumsan","orci","vitae","rhoncus","volutpat",
  "sapien","eros","facilisis","posuere","cubilia","curae","pellentesque","habitant","morbi",
  "tristique","senectus","netus","malesuada","fames","turpis","egestas","proin","pharetra",
  "lectus","condimentum","massa","tincidunt","diam","varius","vestibulum","ante","primis",
  "faucibus","orci","luctus","ultrices","posuere","cubilia","cursus","magna","fusce","feugiat",
];

/** The canonical opening designers and clients expect to see. */
const CLASSIC_OPENER = ["lorem", "ipsum", "dolor", "sit", "amet"];

type Mode = "paragraphs" | "sentences" | "words";

const MODE_LIMITS: Record<Mode, { min: number; max: number; step: number; label: string }> = {
  paragraphs: { min: 1, max: 10, step: 1, label: "Paragraphs" },
  sentences: { min: 1, max: 50, step: 1, label: "Sentences" },
  words: { min: 5, max: 500, step: 5, label: "Words" },
};

function pickWord(exclude: string = ""): string {
  let word = exclude;
  while (word === exclude) {
    word = LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)];
  }
  return word;
}

/** `count` lowercase words, optionally opening with "lorem ipsum dolor sit amet". */
function buildWords(count: number, startWithLorem: boolean): string[] {
  const words: string[] = startWithLorem ? CLASSIC_OPENER.slice(0, count) : [];
  while (words.length < count) {
    words.push(pickWord(words[words.length - 1] || ""));
  }
  return words;
}

function capitalize(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

/** Turn a flat word list into exactly one capitalised, full-stopped sentence. */
function toSentence(words: string[]): string {
  if (words.length === 0) return "";
  const chunk = [...words];
  chunk[0] = capitalize(chunk[0]);
  return chunk.join(" ") + ".";
}

/**
 * Split a flat word list into natural 8–17 word sentences.
 * A short remainder is absorbed into the previous sentence rather than
 * left as a stray one- or two-word fragment.
 */
function toSentences(words: string[]): string[] {
  const sentences: string[] = [];
  let start = 0;
  while (start < words.length) {
    let len = Math.min(8 + Math.floor(Math.random() * 10), words.length - start);
    // Don't leave a runt behind: if what's left over would be under 4 words,
    // take it all now instead of emitting "Volutpat." on its own.
    if (words.length - (start + len) < 4) len = words.length - start;
    sentences.push(toSentence(words.slice(start, start + len)));
    start += len;
  }
  return sentences;
}

function generateSentence(startWithLorem: boolean): string {
  const len = 8 + Math.floor(Math.random() * 10);
  return toSentence(buildWords(len, startWithLorem));
}

export default function LoremIpsumGenerator() {
  const [mode, setMode] = useState<Mode>("paragraphs");
  const [amount, setAmount] = useState<number>(3);
  const [wordsPerParagraph, setWordsPerParagraph] = useState<number>(50);
  const [startWithLorem, setStartWithLorem] = useState<boolean>(true);
  const [output, setOutput] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);

  const limits = MODE_LIMITS[mode];

  function changeMode(next: Mode) {
    setMode(next);
    const l = MODE_LIMITS[next];
    // Carry the count into the new mode's range instead of leaving it out of bounds.
    setAmount((prev) => Math.min(Math.max(prev, l.min), l.max));
  }

  function generate() {
    let text = "";
    if (mode === "words") {
      const words = buildWords(amount, startWithLorem);
      words[0] = capitalize(words[0]);
      text = words.join(" ") + ".";
    } else if (mode === "sentences") {
      const parts: string[] = [];
      for (let i = 0; i < amount; i++) {
        parts.push(generateSentence(startWithLorem && i === 0));
      }
      text = parts.join(" ");
    } else {
      const parts: string[] = [];
      for (let i = 0; i < amount; i++) {
        const words = buildWords(wordsPerParagraph, startWithLorem && i === 0);
        parts.push(toSentences(words).join(" "));
      }
      text = parts.join("\n\n");
    }
    setOutput(text);
    setCopied(false);
  }

  function copy() {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="space-y-5">
      <div>
        <span className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Generate
        </span>
        <div className="flex gap-2 flex-wrap">
          {(Object.keys(MODE_LIMITS) as Mode[]).map((m) => (
            <button
              key={m}
              onClick={() => changeMode(m)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors capitalize ${
                mode === m
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="lorem-amount"
            className="flex justify-between text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            <span>{limits.label}</span>
            <span className="text-blue-600 font-bold">{amount}</span>
          </label>
          <input
            id="lorem-amount"
            type="range"
            min={limits.min}
            max={limits.max}
            step={limits.step}
            value={amount}
            onChange={e => setAmount(+e.target.value)}
            className="w-full accent-blue-600"
          />
        </div>
        {mode === "paragraphs" && (
          <div>
            <label
              htmlFor="lorem-wpp"
              className="flex justify-between text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              <span>Words / paragraph</span>
              <span className="text-blue-600 font-bold">{wordsPerParagraph}</span>
            </label>
            <input
              id="lorem-wpp"
              type="range" min={10} max={150} step={5} value={wordsPerParagraph}
              onChange={e => setWordsPerParagraph(+e.target.value)}
              className="w-full accent-blue-600"
            />
          </div>
        )}
      </div>

      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={startWithLorem}
          onChange={e => setStartWithLorem(e.target.checked)}
          className="mt-0.5 w-4 h-4 accent-blue-600"
        />
        <span className="text-sm text-gray-700 dark:text-gray-300">
          Start with &ldquo;Lorem ipsum dolor sit amet&rdquo;
          <span className="block text-xs text-gray-500 dark:text-gray-400">
            Turn this off for fully randomised filler that doesn&rsquo;t open with the familiar line.
          </span>
        </span>
      </label>

      <div className="flex gap-3">
        <button
          onClick={generate}
          className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors"
        >
          ✨ Generate
        </button>
        {output && (
          <button
            onClick={copy}
            className={`px-5 py-3 rounded-xl font-bold text-sm transition-colors ${copied ? "bg-green-600 text-white" : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"}`}
          >
            {copied ? "✓ Copied!" : "Copy"}
          </button>
        )}
      </div>

      {output && (
        <textarea
          value={output}
          readOnly
          rows={10}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white text-sm leading-relaxed resize-none focus:outline-none"
        />
      )}
    </div>
  );
}
