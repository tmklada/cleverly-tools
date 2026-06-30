"use client";
import { useState, useMemo } from "react";

const STOP_WORDS = new Set(["the", "a", "an", "and", "or", "but", "in", "on", "at", "to", "for", "of", "with", "by", "from", "is", "are", "was", "were", "be", "been", "being", "have", "has", "had", "do", "does", "did", "will", "would", "could", "should", "may", "might", "shall", "can", "it", "its", "this", "that", "these", "those", "i", "you", "he", "she", "we", "they", "me", "him", "her", "us", "them", "my", "your", "his", "our", "their", "not", "as", "if", "so", "up", "out", "about", "into", "through", "than", "then", "when", "where", "which", "who", "what", "how", "all", "just", "also", "more", "no", "very"]);

interface KeywordData {
  word: string;
  count: number;
  pct: number;
}

export default function KeywordDensityChecker() {
  const [content, setContent] = useState("");
  const [minLength, setMinLength] = useState(3);
  const [useStopWords, setUseStopWords] = useState(true);

  const analysis = useMemo(() => {
    if (!content.trim()) return null;

    const words = content.toLowerCase().match(/\b[a-z]+\b/g) || [];
    const totalWords = words.length;
    const uniqueWords = new Set(words).size;

    const filtered = words.filter(w =>
      w.length >= minLength && (!useStopWords || !STOP_WORDS.has(w))
    );

    const freq: Record<string, number> = {};
    for (const w of filtered) {
      freq[w] = (freq[w] || 0) + 1;
    }

    const sorted: KeywordData[] = Object.entries(freq)
      .map(([word, count]) => ({ word, count, pct: Math.round((count / totalWords) * 1000) / 10 }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 20);

    return { totalWords, uniqueWords, keywords: sorted };
  }, [content, minLength, useStopWords]);

  function getDensityColor(pct: number): string {
    if (pct > 5) return "text-red-600 bg-red-50 dark:bg-red-900/20";
    if (pct > 3) return "text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20";
    return "text-green-600 bg-green-50 dark:bg-green-900/20";
  }

  function getDensityBar(pct: number): string {
    if (pct > 5) return "bg-red-500";
    if (pct > 3) return "bg-yellow-500";
    return "bg-green-500";
  }

  return (
    <div className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Paste your content here
        </label>
        <textarea
          value={content}
          onChange={e => setContent(e.target.value)}
          rows={6}
          placeholder="Paste your article, blog post, or any text here to analyze keyword density..."
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-sm"
        />
      </div>

      <div className="flex flex-wrap gap-4 items-center">
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Min word length: {minLength}</label>
          <input type="range" min={2} max={8} value={minLength} onChange={e => setMinLength(Number(e.target.value))}
            className="block w-32 mt-1 accent-blue-600" />
        </div>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={useStopWords} onChange={e => setUseStopWords(e.target.checked)}
            className="w-4 h-4 rounded accent-blue-600" />
          <span className="text-sm text-gray-700 dark:text-gray-300">Filter stop words</span>
        </label>
      </div>

      {analysis && (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-3 text-center">
            {[
              ["Total Words", analysis.totalWords.toLocaleString(), "text-blue-600"],
              ["Unique Words", analysis.uniqueWords.toLocaleString(), "text-purple-600"],
              ["Top Keywords", analysis.keywords.length.toString(), "text-green-600"],
            ].map(([label, value, color]) => (
              <div key={label} className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-3">
                <div className={`text-2xl font-bold ${color}`}>{value}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{label}</div>
              </div>
            ))}
          </div>

          <div>
            <div className="flex gap-3 text-xs mb-2">
              {[["green", "1–3%", "Optimal"], ["yellow", "3–5%", "High"], ["red", ">5%", "Too high"]].map(([c, range, label]) => (
                <div key={c} className="flex items-center gap-1">
                  <div className={`w-2 h-2 rounded-full bg-${c}-500`} />
                  <span className="text-gray-600 dark:text-gray-400">{range} {label}</span>
                </div>
              ))}
            </div>

            <div className="space-y-1.5">
              {analysis.keywords.map(({ word, count, pct }) => (
                <div key={word} className="flex items-center gap-3">
                  <div className="w-24 text-sm font-medium text-gray-700 dark:text-gray-300 truncate">{word}</div>
                  <div className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-full h-4 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${getDensityBar(pct)} transition-all`}
                      style={{ width: `${Math.min(pct * 5, 100)}%` }}
                    />
                  </div>
                  <div className="w-10 text-right text-xs text-gray-500 dark:text-gray-400">{count}x</div>
                  <div className={`w-14 text-right text-xs font-semibold rounded px-1 py-0.5 ${getDensityColor(pct)}`}>{pct}%</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {!content && (
        <div className="text-center py-8 text-gray-400 dark:text-gray-500 text-sm">
          Paste text above to see keyword density analysis
        </div>
      )}
    </div>
  );
}
