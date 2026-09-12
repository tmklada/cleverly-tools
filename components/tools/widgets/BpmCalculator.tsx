"use client";
import { useState, useCallback, useEffect } from "react";

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

/**
 * Note lengths as a multiple of a quarter note.
 * Quarter-note milliseconds = 60000 / BPM, so every row is
 * (60000 / BPM) * factor. Dotted = x1.5, triplet = x2/3.
 */
const NOTE_VALUES = [
  { name: "Whole", factor: 4 },
  { name: "Half", factor: 2 },
  { name: "Quarter", factor: 1 },
  { name: "Eighth", factor: 0.5 },
  { name: "Sixteenth", factor: 0.25 },
];

function getTempoClass(bpm: number) {
  return TEMPO_CLASSES.find((t) => bpm >= t.min && bpm < t.max)?.name || "Unknown";
}

function formatMs(ms: number) {
  if (!Number.isFinite(ms)) return "—";
  return ms >= 100 ? ms.toFixed(1) : ms.toFixed(2);
}

/** True when the keyboard focus is somewhere the spacebar means "type a space". */
function isTypingTarget(el: EventTarget | null): boolean {
  if (!(el instanceof HTMLElement)) return false;
  const tag = el.tagName;
  return (
    tag === "INPUT" ||
    tag === "TEXTAREA" ||
    tag === "SELECT" ||
    tag === "BUTTON" ||
    el.isContentEditable
  );
}

export default function BpmCalculator() {
  const [tapTimes, setTapTimes] = useState<number[]>([]);
  const [bpm, setBpm] = useState<number | null>(null);
  const [manualBpm, setManualBpm] = useState<string>("");
  const [spaceActive, setSpaceActive] = useState(false);

  const handleTap = useCallback(() => {
    const now = Date.now();
    setManualBpm("");
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

  // Spacebar taps. Ignored while the user is typing in a field, and the default
  // page-scroll behaviour is suppressed so the page doesn't jump on every tap.
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.code !== "Space" && e.key !== " ") return;
      if (isTypingTarget(e.target)) return;
      if (e.repeat) {
        e.preventDefault();
        return;
      }
      e.preventDefault();
      setSpaceActive(true);
      handleTap();
    }
    function onKeyUp(e: KeyboardEvent) {
      if (e.code === "Space" || e.key === " ") setSpaceActive(false);
    }
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, [handleTap]);

  const reset = () => {
    setTapTimes([]);
    setBpm(null);
    setManualBpm("");
  };

  const parsedManual = parseFloat(manualBpm);
  const activeBpm =
    manualBpm !== "" && !Number.isNaN(parsedManual) && parsedManual > 0 ? parsedManual : bpm;

  const tempoClass = activeBpm ? getTempoClass(activeBpm) : null;
  const quarterMs = activeBpm ? 60000 / activeBpm : null;

  return (
    <div className="max-w-md mx-auto space-y-6">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 text-center">
        <div className="mb-6">
          <div className="text-7xl font-black text-gray-900 dark:text-white mb-2">
            {activeBpm ? Math.round(activeBpm) : "—"}
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
          className={`w-full py-6 text-2xl font-bold bg-blue-600 hover:bg-blue-700 active:bg-blue-800 active:scale-95 text-white rounded-2xl transition-all select-none ${spaceActive ? "scale-95 bg-blue-800" : ""}`}
        >
          TAP
        </button>
        <p className="text-sm text-gray-400 dark:text-gray-500 mt-3">
          {tapTimes.length < 2 ? "Keep tapping to the beat..." : `Based on ${tapTimes.length} taps`}
        </p>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
          Tip: press the{" "}
          <kbd className="px-1.5 py-0.5 rounded border border-gray-300 dark:border-gray-600 font-mono text-[11px]">
            Space
          </kbd>{" "}
          bar to tap without using the mouse.
        </p>

        <button
          onClick={reset}
          className="mt-4 px-6 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white border border-gray-300 dark:border-gray-600 rounded-lg transition-colors"
        >
          Reset
        </button>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
            BPM to Milliseconds (Delay &amp; Reverb Times)
          </h3>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
            Quarter note = 60000 ÷ BPM. Dotted notes are 1.5×, triplets are 2/3×.
          </p>
        </div>

        <div>
          <label
            htmlFor="manual-bpm"
            className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1"
          >
            Or type a BPM directly
          </label>
          <input
            id="manual-bpm"
            type="number"
            min={1}
            max={999}
            step="any"
            value={manualBpm}
            onChange={(e) => setManualBpm(e.target.value)}
            placeholder={bpm ? String(bpm) : "120"}
            className="w-32 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {quarterMs === null ? (
          <p className="text-sm text-gray-400 dark:text-gray-500">
            Tap the beat or enter a BPM above to see the millisecond table.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
                  <th className="py-2 pr-2 font-semibold">Note</th>
                  <th className="py-2 px-2 font-semibold text-right">Straight</th>
                  <th className="py-2 px-2 font-semibold text-right">Dotted</th>
                  <th className="py-2 pl-2 font-semibold text-right">Triplet</th>
                </tr>
              </thead>
              <tbody>
                {NOTE_VALUES.map(({ name, factor }) => {
                  const straight = quarterMs * factor;
                  return (
                    <tr
                      key={name}
                      className="border-b border-gray-100 dark:border-gray-800 last:border-0"
                    >
                      <td className="py-2 pr-2 font-medium text-gray-700 dark:text-gray-300">
                        {name}
                      </td>
                      <td className="py-2 px-2 text-right font-mono text-gray-900 dark:text-white">
                        {formatMs(straight)} ms
                      </td>
                      <td className="py-2 px-2 text-right font-mono text-gray-600 dark:text-gray-400">
                        {formatMs(straight * 1.5)} ms
                      </td>
                      <td className="py-2 pl-2 text-right font-mono text-gray-600 dark:text-gray-400">
                        {formatMs((straight * 2) / 3)} ms
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-3">
              Use the straight column for tempo-synced delay, the dotted column for the classic
              &ldquo;dotted eighth&rdquo; delay, and the triplet column for swung or shuffled
              rhythms. Convert to Hz for an LFO by dividing 1000 by the millisecond value.
            </p>
          </div>
        )}
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
