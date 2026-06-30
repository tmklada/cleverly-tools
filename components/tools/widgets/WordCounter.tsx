"use client";
import { useState } from "react";

export default function WordCounter() {
  const [text, setText] = useState("");

  const words = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
  const chars = text.length;
  const charsNoSpace = text.replace(/\s/g, "").length;
  const sentences = text.trim() === "" ? 0 : text.split(/[.!?]+/).filter(s => s.trim()).length;
  const paragraphs = text.trim() === "" ? 0 : text.split(/\n\s*\n/).filter(p => p.trim()).length;
  const readTime = Math.max(1, Math.ceil(words / 200));

  const stats = [
    { label: "Words", value: words, icon: "📝" },
    { label: "Characters", value: chars, icon: "🔤" },
    { label: "Chars (no spaces)", value: charsNoSpace, icon: "⌨️" },
    { label: "Sentences", value: sentences, icon: "📖" },
    { label: "Paragraphs", value: paragraphs, icon: "📄" },
    { label: "Read time", value: `~${readTime} min`, icon: "⏱️" },
  ];

  return (
    <div className="space-y-5">
      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Type or paste your text here..."
        rows={8}
        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
      />
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {stats.map(({ label, value, icon }) => (
          <div key={label} className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl p-4 text-center">
            <div className="text-xl mb-1">{icon}</div>
            <div className="text-xl font-bold text-gray-900 dark:text-white">{value}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">{label}</div>
          </div>
        ))}
      </div>
      {text && (
        <button onClick={() => setText("")} className="text-sm text-gray-400 hover:text-red-500 transition-colors">
          Clear text ✕
        </button>
      )}
    </div>
  );
}
