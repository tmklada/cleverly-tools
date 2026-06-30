"use client";
import { useState, useMemo } from "react";

interface Match {
  index: number;
  length: number;
  value: string;
  groups: Record<string, string> | undefined;
}

export default function RegexTester() {
  const [pattern, setPattern] = useState<string>("");
  const [testString, setTestString] = useState<string>("Hello World! Hello TypeScript.");
  const [flags, setFlags] = useState<{ g: boolean; i: boolean; m: boolean; s: boolean }>({
    g: true, i: false, m: false, s: false,
  });
  const [error, setError] = useState<string>("");

  const activeFlags = Object.entries(flags)
    .filter(([, v]) => v)
    .map(([k]) => k)
    .join("");

  const { matches, highlighted } = useMemo(() => {
    setError("");
    if (!pattern) return { matches: [], highlighted: testString };
    try {
      const regex = new RegExp(pattern, activeFlags);
      const found: Match[] = [];

      if (flags.g) {
        let m: RegExpExecArray | null;
        const r = new RegExp(pattern, activeFlags);
        while ((m = r.exec(testString)) !== null) {
          found.push({ index: m.index, length: m[0].length, value: m[0], groups: m.groups });
          if (m[0].length === 0) r.lastIndex++;
        }
      } else {
        const m = regex.exec(testString);
        if (m) found.push({ index: m.index, length: m[0].length, value: m[0], groups: m.groups });
      }

      // Build highlighted string
      let result = "";
      let lastIdx = 0;
      const sortedMatches = [...found].sort((a, b) => a.index - b.index);
      for (const match of sortedMatches) {
        result += escapeHtml(testString.slice(lastIdx, match.index));
        result += `<mark class="bg-yellow-200 dark:bg-yellow-600 rounded px-0.5">${escapeHtml(match.value)}</mark>`;
        lastIdx = match.index + match.length;
      }
      result += escapeHtml(testString.slice(lastIdx));

      return { matches: found, highlighted: result };
    } catch (e) {
      setError("Invalid regex: " + (e as Error).message);
      return { matches: [], highlighted: escapeHtml(testString) };
    }
  }, [pattern, testString, activeFlags, flags.g]);

  function escapeHtml(str: string): string {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  return (
    <div className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Regex Pattern</label>
        <div className="flex items-center gap-2 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700">
          <span className="text-gray-400 font-mono">/</span>
          <input
            type="text"
            value={pattern}
            onChange={e => setPattern(e.target.value)}
            placeholder="e.g. \b\w+llo\b"
            className="flex-1 bg-transparent text-gray-900 dark:text-white font-mono focus:outline-none"
          />
          <span className="text-gray-400 font-mono">/{activeFlags}</span>
        </div>
      </div>

      <div className="flex gap-4 flex-wrap">
        {(["g", "i", "m", "s"] as const).map(flag => (
          <label key={flag} className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={flags[flag]}
              onChange={e => setFlags(prev => ({ ...prev, [flag]: e.target.checked }))}
              className="w-4 h-4 accent-blue-600"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300 font-mono font-bold">{flag}</span>
            <span className="text-xs text-gray-400">
              {flag === "g" ? "(global)" : flag === "i" ? "(case-insensitive)" : flag === "m" ? "(multiline)" : "(dotAll)"}
            </span>
          </label>
        ))}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Test String</label>
        <textarea
          value={testString}
          onChange={e => setTestString(e.target.value)}
          rows={4}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 text-red-700 dark:text-red-400 rounded-xl px-4 py-3 text-sm font-mono">
          ⚠️ {error}
        </div>
      )}

      {pattern && !error && (
        <>
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Highlighted Matches</label>
              <span className={`text-xs font-semibold px-2 py-1 rounded-lg ${matches.length > 0 ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300" : "bg-gray-100 dark:bg-gray-700 text-gray-500"}`}>
                {matches.length} match{matches.length !== 1 ? "es" : ""}
              </span>
            </div>
            <div
              className="px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-mono text-sm whitespace-pre-wrap break-all"
              dangerouslySetInnerHTML={{ __html: highlighted }}
            />
          </div>

          {matches.length > 0 && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Match List</label>
              <div className="space-y-1 max-h-48 overflow-y-auto">
                {matches.map((m, i) => (
                  <div key={i} className="flex items-start gap-3 bg-gray-50 dark:bg-gray-700 rounded-xl px-4 py-2">
                    <span className="text-xs text-blue-600 font-bold w-6 pt-0.5">#{i + 1}</span>
                    <div className="flex-1">
                      <span className="font-mono text-sm font-semibold text-gray-900 dark:text-white">&quot;{m.value}&quot;</span>
                      <span className="text-xs text-gray-400 ml-2">at index {m.index}</span>
                      {m.groups && Object.keys(m.groups).length > 0 && (
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                          Groups: {Object.entries(m.groups).map(([k, v]) => `${k}="${v}"`).join(", ")}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
