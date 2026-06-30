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

function pickWord(exclude: string = ""): string {
  let word = exclude;
  while (word === exclude) {
    word = LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)];
  }
  return word;
}

function generateParagraph(wordCount: number): string {
  const words: string[] = [];
  for (let i = 0; i < wordCount; i++) {
    words.push(pickWord(words[words.length - 1] || ""));
  }
  const first = "Lorem";
  words[0] = first;
  const sentences: string[] = [];
  let start = 0;
  while (start < words.length) {
    const len = Math.min(8 + Math.floor(Math.random() * 10), words.length - start);
    const chunk = words.slice(start, start + len);
    chunk[0] = chunk[0].charAt(0).toUpperCase() + chunk[0].slice(1);
    sentences.push(chunk.join(" ") + ".");
    start += len;
  }
  return sentences.join(" ");
}

export default function LoremIpsumGenerator() {
  const [paragraphs, setParagraphs] = useState<number>(3);
  const [wordsPerParagraph, setWordsPerParagraph] = useState<number>(50);
  const [output, setOutput] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);

  function generate() {
    const parts: string[] = [];
    for (let i = 0; i < paragraphs; i++) {
      parts.push(generateParagraph(wordsPerParagraph));
    }
    setOutput(parts.join("\n\n"));
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
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="flex justify-between text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <span>Paragraphs</span>
            <span className="text-blue-600 font-bold">{paragraphs}</span>
          </label>
          <input
            type="range" min={1} max={10} value={paragraphs}
            onChange={e => setParagraphs(+e.target.value)}
            className="w-full accent-blue-600"
          />
        </div>
        <div>
          <label className="flex justify-between text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <span>Words / paragraph</span>
            <span className="text-blue-600 font-bold">{wordsPerParagraph}</span>
          </label>
          <input
            type="range" min={10} max={150} step={5} value={wordsPerParagraph}
            onChange={e => setWordsPerParagraph(+e.target.value)}
            className="w-full accent-blue-600"
          />
        </div>
      </div>

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
