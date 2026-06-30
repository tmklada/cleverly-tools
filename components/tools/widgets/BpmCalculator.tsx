"use client";
import { useState, useCallback } from "react";

const TEMPO_CLASSES = [
  { name: "Grave", min: 0, max: 40 },
  { name: "Largo", min: 40, max: 60 },
  { name: "Adagio", min: 60, max: 66 },
  { name: "Andante", min: 66, max: 76 },
  { name: "Moderato", min: 76, max: 108 },
  { name: "Allegro", min: 108, max: 156 },
  { name: "Vivace", min: 156, max: 176 },
  { name: "Presto", min: 176, max: 999 },
];

function getTempoClass(bpm: number) {
  return TEMPO_CLASSES.find((t) => bpm >= t.min && bpm < t.max)?.name || "Unknown";
}

export default function BpmCalculator() {
  const [tapTimes, setTapTimes] = useState<number[]>([]);
  const [bpm, setBpm] = useState<number | null>(null);

  const handleTap = useCallback(() => {
    const now = Date.now();
    setTapTimes((prev) => {
      const updated = [...prev, now].slice(-8);
      if (updated.length >= 2) {
        const intervals = updated.slice(1).map((t, i) => t - updated[i]);
        const avg = intervals.reduce((a, b) => a + b, 0) / intervals.length;
        setBpm(Math.round(60000 / avg));
      }
      return updated;
    });
  }, []);

  const reset = () => {
    setTapTimes([]);
    setBpm(null);
  };

  const tempoClass = bpm ? getTempoClass(bpm) : null;

  return (
    <div className="max-w-md mx-auto space-y-6">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 text-center">
        <div className="mb-6">
          <div className="text-7xl font-black text-gray-900 dark:text-white mb-2">
            {bpm ?? "—"}
          </div>
          <div className="text-2xl font-medium text-gray-400 dark:text-gray-500">BPM</div>
          {tempoClass && (
            <div className="mt-2 inline-block px-4 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-semibold">
              {tempoClass}
            </div>
          )}
        </div>

        <button
          onClick={handleTap}
          className="w-full py-6 text-2xl font-bold bg-blue-600 hover:bg-blue-700 active:bg-blue-800 active:scale-95 text-white rounded-2xl transition-all select-none"
        >
          TAP
        </button>
        <p className="text-sm text-gray-400 dark:text-gray-500 mt-3">
          {tapTimes.length < 2 ? "Keep tapping to the beat..." : `Based on ${tapTimes.length} taps`}
        </p>

        <button
          onClick={reset}
          className="mt-4 px-6 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white border border-gray-300 dark:border-gray-600 rounded-lg transition-colors"
        >
          Reset
        </button>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">Tempo Classifications</h3>
        <div className="space-y-2">
          {TEMPO_CLASSES.map((t) => (
            <div
              key={t.name}
              className={`flex justify-between items-center px-3 py-2 rounded-lg transition-colors ${
                tempoClass === t.name
                  ? "bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700"
                  : "bg-gray-50 dark:bg-gray-800"
              }`}
            >
              <span className={`font-medium ${tempoClass === t.name ? "text-blue-700 dark:text-blue-300" : "text-gray-700 dark:text-gray-300"}`}>
                {t.name}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {t.max === 999 ? `${t.min}+` : `${t.min}–${t.max}`} BPM
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
