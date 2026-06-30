"use client";
import { useState, useEffect } from "react";

const TIMEZONES = [
  { label: "UTC", value: "UTC" },
  { label: "New York (EST)", value: "America/New_York" },
  { label: "Los Angeles (PST)", value: "America/Los_Angeles" },
  { label: "Chicago (CST)", value: "America/Chicago" },
  { label: "London (GMT)", value: "Europe/London" },
  { label: "Paris (CET)", value: "Europe/Paris" },
  { label: "Dubai (GST)", value: "Asia/Dubai" },
  { label: "Mumbai (IST)", value: "Asia/Kolkata" },
  { label: "Singapore (SGT)", value: "Asia/Singapore" },
  { label: "Tokyo (JST)", value: "Asia/Tokyo" },
  { label: "Sydney (AEST)", value: "Australia/Sydney" },
  { label: "São Paulo (BRT)", value: "America/Sao_Paulo" },
  { label: "Toronto (ET)", value: "America/Toronto" },
  { label: "Berlin (CET)", value: "Europe/Berlin" },
  { label: "Seoul (KST)", value: "Asia/Seoul" },
  { label: "Beijing (CST)", value: "Asia/Shanghai" },
  { label: "Moscow (MSK)", value: "Europe/Moscow" },
  { label: "Tel Aviv (IST)", value: "Asia/Jerusalem" },
  { label: "Riyadh (AST)", value: "Asia/Riyadh" },
];

function formatTime(date: Date, tz: string, use24h: boolean): string {
  return date.toLocaleTimeString("en-US", {
    timeZone: tz,
    hour: "2-digit",
    minute: "2-digit",
    hour12: !use24h,
  });
}

function formatDate(date: Date, tz: string): string {
  return date.toLocaleDateString("en-US", {
    timeZone: tz,
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export default function TimeZoneConverter() {
  const [sourceTime, setSourceTime] = useState("");
  const [sourceTz, setSourceTz] = useState("UTC");
  const [selectedTzs, setSelectedTzs] = useState(["America/New_York", "Europe/London", "Asia/Tokyo", "Australia/Sydney"]);
  const [use24h, setUse24h] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleTz = (tz: string) => {
    setSelectedTzs((prev) =>
      prev.includes(tz) ? prev.filter((t) => t !== tz) : [...prev, tz]
    );
  };

  const getConvertedDate = (): Date | null => {
    if (!sourceTime) return null;
    try {
      const [hours, minutes] = sourceTime.split(":").map(Number);
      const now = new Date();
      const dateStr = `${now.toDateString()} ${hours}:${minutes}:00`;
      const utcMs = new Date(dateStr + " " + sourceTz).getTime();
      if (isNaN(utcMs)) return null;
      // Use the Intl trick to parse a date in source tz
      const formatter = new Intl.DateTimeFormat("en-US", {
        timeZone: sourceTz,
        year: "numeric", month: "2-digit", day: "2-digit",
        hour: "2-digit", minute: "2-digit", second: "2-digit",
        hour12: false,
      });
      const base = new Date();
      base.setHours(hours, minutes, 0, 0);
      return base;
    } catch {
      return null;
    }
  };

  const convertedBase = getConvertedDate();

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-gray-900 dark:text-white">Convert Time</h3>
          <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 cursor-pointer">
            <input type="checkbox" checked={use24h} onChange={(e) => setUse24h(e.target.checked)} className="rounded" />
            24h format
          </label>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Time</label>
            <input
              type="time"
              value={sourceTime}
              onChange={(e) => setSourceTime(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Timezone</label>
            <select
              value={sourceTz}
              onChange={(e) => setSourceTz(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {TIMEZONES.map((tz) => (
                <option key={tz.value} value={tz.value}>{tz.label}</option>
              ))}
            </select>
          </div>
        </div>

        {convertedBase && (
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {selectedTzs.map((tz) => {
              const tzInfo = TIMEZONES.find((t) => t.value === tz);
              return (
                <div key={tz} className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{tzInfo?.label || tz}</p>
                  <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">{formatTime(convertedBase, tz, use24h)}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{formatDate(convertedBase, tz)}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="font-bold text-gray-900 dark:text-white mb-1">Current Time in Cities</h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">Updates every second. Click to select/deselect.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {TIMEZONES.map((tz) => (
            <button
              key={tz.value}
              onClick={() => toggleTz(tz.value)}
              className={`flex justify-between items-center px-3 py-2 rounded-lg text-sm transition-colors text-left ${
                selectedTzs.includes(tz.value)
                  ? "bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700"
                  : "bg-gray-50 dark:bg-gray-800 border border-transparent"
              }`}
            >
              <span className="text-gray-700 dark:text-gray-300 font-medium">{tz.label}</span>
              <span className="font-mono text-gray-900 dark:text-white">{formatTime(currentTime, tz.value, use24h)}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
