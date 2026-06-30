"use client";
import { useState } from "react";

interface Zone {
  name: string;
  label: string;
  minPct: number;
  maxPct: number;
  color: string;
  bgColor: string;
  description: string;
}

const zones: Zone[] = [
  { name: "Zone 1", label: "Warm Up", minPct: 50, maxPct: 60, color: "text-blue-600", bgColor: "bg-blue-50 dark:bg-blue-900/20", description: "Light activity, recovery" },
  { name: "Zone 2", label: "Fat Burn", minPct: 60, maxPct: 70, color: "text-green-600", bgColor: "bg-green-50 dark:bg-green-900/20", description: "Optimal fat burning zone" },
  { name: "Zone 3", label: "Aerobic", minPct: 70, maxPct: 80, color: "text-yellow-600", bgColor: "bg-yellow-50 dark:bg-yellow-900/20", description: "Improves cardio endurance" },
  { name: "Zone 4", label: "Anaerobic", minPct: 80, maxPct: 90, color: "text-orange-600", bgColor: "bg-orange-50 dark:bg-orange-900/20", description: "Builds speed and power" },
  { name: "Zone 5", label: "Max Effort", minPct: 90, maxPct: 100, color: "text-red-600", bgColor: "bg-red-50 dark:bg-red-900/20", description: "Maximum performance" },
];

export default function HeartRateCalculator() {
  const [age, setAge] = useState("");
  const [result, setResult] = useState<{ maxHR: number; zones: { min: number; max: number }[] } | null>(null);

  function calculate() {
    const a = parseInt(age);
    if (!a || a < 1 || a > 120) return;
    const maxHR = 220 - a;
    const zoneRanges = zones.map(z => ({
      min: Math.round(maxHR * z.minPct / 100),
      max: Math.round(maxHR * z.maxPct / 100),
    }));
    setResult({ maxHR, zones: zoneRanges });
  }

  return (
    <div className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Age (years)</label>
        <input
          type="number"
          value={age}
          onChange={e => setAge(e.target.value)}
          onKeyDown={e => e.key === "Enter" && calculate()}
          placeholder="25"
          min="1"
          max="120"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
        />
      </div>

      <button onClick={calculate}
        className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-colors">
        Calculate Heart Rate Zones
      </button>

      {result && (
        <div className="space-y-4">
          <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-4 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">Maximum Heart Rate</p>
            <p className="text-4xl font-bold text-red-600">{result.maxHR} <span className="text-lg font-normal">BPM</span></p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Formula: 220 - {age} = {result.maxHR}</p>
          </div>

          <div className="space-y-2">
            {zones.map((zone, i) => {
              const { min, max } = result.zones[i];
              return (
                <div key={zone.name} className={`${zone.bgColor} rounded-xl px-4 py-3`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`font-bold text-sm ${zone.color}`}>{zone.name}</span>
                        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{zone.label}</span>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{zone.description}</p>
                    </div>
                    <div className="text-right">
                      <div className={`font-bold text-sm ${zone.color}`}>{min}–{max} BPM</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{zone.minPct}–{zone.maxPct}%</div>
                    </div>
                  </div>
                  <div className="mt-2 h-1.5 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${zone.color.replace("text-", "bg-")}`}
                      style={{ marginLeft: `${zone.minPct}%`, width: `${zone.maxPct - zone.minPct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
