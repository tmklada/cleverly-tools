"use client";
import { useState, useMemo } from "react";

interface DiffLine {
  type: "added" | "removed" | "unchanged";
  text: string;
  lineNum?: number;
}

function computeDiff(original: string, modified: string): DiffLine[] {
  const origLines = original.split("\n");
  const modLines = modified.split("\n");

  // Simple LCS-based diff
  const m = origLines.length;
  const n = modLines.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (origLines[i - 1] === modLines[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  const result: DiffLine[] = [];
  let i = m, j = n;

  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && origLines[i - 1] === modLines[j - 1]) {
      result.unshift({ type: "unchanged", text: origLines[i - 1], lineNum: i });
      i--; j--;
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      result.unshift({ type: "added", text: modLines[j - 1], lineNum: j });
      j--;
    } else {
      result.unshift({ type: "removed", text: origLines[i - 1], lineNum: i });
      i--;
    }
  }

  return result;
}

export default function TextDiffChecker() {
  const [original, setOriginal] = useState("");
  const [modified, setModified] = useState("");
  const [showDiff, setShowDiff] = useState(false);

  const diff = useMemo(() => {
    if (!showDiff || (!original && !modified)) return [];
    return computeDiff(original, modified);
  }, [original, modified, showDiff]);

  const stats = useMemo(() => {
    const added = diff.filter(d => d.type === "added").length;
    const removed = diff.filter(d => d.type === "removed").length;
    const unchanged = diff.filter(d => d.type === "unchanged").length;
    const charsAdded = diff.filter(d => d.type === "added").reduce((s, d) => s + d.text.length, 0);
    const charsRemoved = diff.filter(d => d.type === "removed").reduce((s, d) => s + d.text.length, 0);
    return { added, removed, unchanged, charsAdded, charsRemoved };
  }, [diff]);

  function compare() {
    setShowDiff(true);
  }

  const lineClasses: Record<DiffLine["type"], string> = {
    added: "bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300 border-l-4 border-green-500",
    removed: "bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300 border-l-4 border-red-500 line-through",
    unchanged: "text-gray-700 dark:text-gray-300",
  };

  const prefixes: Record<DiffLine["type"], string> = {
    added: "+ ",
    removed: "- ",
    unchanged: "  ",
  };

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Original Text</label>
          <textarea
            value={original}
            onChange={e => { setOriginal(e.target.value); setShowDiff(false); }}
            rows={7}
            placeholder="Paste original text here..."
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Modified Text</label>
          <textarea
            value={modified}
            onChange={e => { setModified(e.target.value); setShowDiff(false); }}
            rows={7}
            placeholder="Paste modified text here..."
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none"
          />
        </div>
      </div>

      <button onClick={compare}
        className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors">
        Compare Texts
      </button>

      {showDiff && diff.length > 0 && (
        <div className="space-y-4">
          {/* Stats */}
          <div className="grid grid-cols-4 gap-2 text-center text-sm">
            {[
              ["Lines Added", stats.added, "text-green-600 bg-green-50 dark:bg-green-900/20"],
              ["Lines Removed", stats.removed, "text-red-600 bg-red-50 dark:bg-red-900/20"],
              ["Chars Added", stats.charsAdded, "text-green-600 bg-green-50 dark:bg-green-900/20"],
              ["Chars Removed", stats.charsRemoved, "text-red-600 bg-red-50 dark:bg-red-900/20"],
            ].map(([label, val, cls]) => (
              <div key={String(label)} className={`${cls} rounded-xl p-2`}>
                <div className="font-bold text-lg">{val}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{label}</div>
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex gap-4 text-xs">
            {[["bg-green-500", "+ Added"], ["bg-red-500", "- Removed"], ["bg-gray-300 dark:bg-gray-600", "  Unchanged"]].map(([bg, label]) => (
              <div key={label} className="flex items-center gap-1.5">
                <div className={`w-3 h-3 rounded ${bg}`} />
                <span className="text-gray-600 dark:text-gray-400">{label}</span>
              </div>
            ))}
          </div>

          {/* Diff output */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-600">
            <div className="overflow-x-auto max-h-96 overflow-y-auto">
              {diff.map((line, i) => (
                <div key={i} className={`flex text-xs font-mono px-4 py-1 ${lineClasses[line.type]}`}>
                  <span className="w-6 text-gray-400 select-none shrink-0">{prefixes[line.type]}</span>
                  <span className="whitespace-pre-wrap break-all">{line.text || " "}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {showDiff && diff.length === 0 && (
        <div className="text-center py-6 text-green-600 dark:text-green-400 font-semibold">
          No differences found — texts are identical!
        </div>
      )}
    </div>
  );
}
