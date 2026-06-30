"use client";
import { useState } from "react";

type Mode = "wakeup" | "bedtime";

function formatTime(date: Date): string {
  return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });
}

function addMinutes(date: Date, minutes: number): Date {
  return new Date(date.getTime() + minutes * 60000);
}

function subtractMinutes(date: Date, minutes: number): Date {
  return new Date(date.getTime() - minutes * 60000);
}

export default function SleepCalculator() {
  const [mode, setMode] = useState<Mode>("wakeup");
  const [time, setTime] = useState("07:00");
  const [results, setResults] = useState<{ time: string; cycles: number; hours: string }[] | null>(null);

  const FALL_ASLEEP_MINUTES = 14;
  const CYCLE_MINUTES = 90;

  function calculate() {
    const [h, m] = time.split(":").map(Number);
    const base = new Date();
    base.setHours(h, m, 0, 0);

    const times: { time: string; cycles: number; hours: string }[] = [];

    if (mode === "wakeup") {
      // Calculate bedtimes for 6, 5, 4, 3, 2, 1 cycles
      for (let cycles = 6; cycles >= 1; cycles--) {
        const totalMinutes = cycles * CYCLE_MINUTES + FALL_ASLEEP_MINUTES;
        const bedtime = subtractMinutes(base, totalMinutes);
        const sleepHours = (cycles * CYCLE_MINUTES / 60).toFixed(1);
        times.push({ time: formatTime(bedtime), cycles, hours: sleepHours });
      }
    } else {
      // Calculate wake up times for 1 to 6 cycles
      const fallAsleepTime = addMinutes(base, FALL_ASLEEP_MINUTES);
      for (let cycles = 1; cycles <= 6; cycles++) {
        const wakeTime = addMinutes(fallAsleepTime, cycles * CYCLE_MINUTES);
        const sleepHours = (cycles * CYCLE_MINUTES / 60).toFixed(1);
        times.push({ time: formatTime(wakeTime), cycles, hours: sleepHours });
      }
    }

    setResults(times);
  }

  const recommended = results ? results.filter(r => r.cycles >= 5 && r.cycles <= 6) : [];

  return (
    <div className="space-y-5">
      <div className="flex gap-2">
        {([["wakeup", "I want to wake up at..."], ["bedtime", "I want to go to sleep at..."]] as const).map(([m, label]) => (
          <button key={m} onClick={() => { setMode(m); setResults(null); }}
            className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${mode === m ? "bg-indigo-600 text-white" : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"}`}>
            {label}
          </button>
        ))}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {mode === "wakeup" ? "Wake up time" : "Bedtime"}
        </label>
        <input type="time" value={time} onChange={e => setTime(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-lg" />
      </div>

      <button onClick={calculate}
        className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-colors">
        Calculate Sleep Times
      </button>

      {results && (
        <div className="space-y-3">
          <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-3 text-sm text-indigo-700 dark:text-indigo-300">
            It takes approximately <strong>14 minutes</strong> to fall asleep. These times account for that.
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
              {mode === "wakeup" ? "Go to sleep at:" : "Wake up at:"}
            </p>
            {results.map((r) => {
              const isRecommended = r.cycles >= 5 && r.cycles <= 6;
              return (
                <div key={r.time} className={`flex items-center justify-between rounded-xl px-4 py-3 ${isRecommended ? "bg-indigo-600 text-white" : "bg-gray-50 dark:bg-gray-700/50"}`}>
                  <div>
                    <span className={`text-xl font-bold ${isRecommended ? "text-white" : "text-gray-900 dark:text-white"}`}>{r.time}</span>
                    {isRecommended && <span className="ml-2 text-xs bg-white/20 rounded px-1 py-0.5">Recommended</span>}
                  </div>
                  <div className={`text-right text-sm ${isRecommended ? "text-indigo-200" : "text-gray-500 dark:text-gray-400"}`}>
                    <div>{r.cycles} cycles</div>
                    <div>{r.hours}h sleep</div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-3 gap-2 text-xs text-center">
            {[["1 cycle", "1.5h", "bg-red-50 dark:bg-red-900/20 text-red-600"], ["4 cycles", "6h", "bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600"], ["6 cycles", "9h", "bg-green-50 dark:bg-green-900/20 text-green-600"]].map(([cycles, hours, cls]) => (
              <div key={cycles} className={`${cls} rounded-lg p-2`}>
                <div className="font-semibold">{cycles}</div>
                <div>{hours}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
