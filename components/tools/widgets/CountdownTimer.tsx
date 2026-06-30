"use client";
import { useState, useEffect, useRef } from "react";

export default function CountdownTimer() {
  const [target, setTarget] = useState("");
  const [message, setMessage] = useState("Time's Up! 🎉");
  const [remaining, setRemaining] = useState<number | null>(null);
  const [done, setDone] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!target) {
      setRemaining(null);
      setDone(false);
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    function tick() {
      const diff = new Date(target).getTime() - Date.now();
      if (diff <= 0) {
        setRemaining(0);
        setDone(true);
        if (intervalRef.current) clearInterval(intervalRef.current);
      } else {
        setRemaining(diff);
        setDone(false);
      }
    }

    tick();
    intervalRef.current = setInterval(tick, 1000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [target]);

  const days = remaining !== null ? Math.floor(remaining / 86400000) : 0;
  const hours = remaining !== null ? Math.floor((remaining % 86400000) / 3600000) : 0;
  const minutes = remaining !== null ? Math.floor((remaining % 3600000) / 60000) : 0;
  const seconds = remaining !== null ? Math.floor((remaining % 60000) / 1000) : 0;

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Target Date & Time
          </label>
          <input
            type="datetime-local"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Custom Message
          </label>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Time's Up!"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {target && !done && remaining !== null && (
        <div className="grid grid-cols-4 gap-3">
          {[
            { value: days, label: "Days" },
            { value: hours, label: "Hours" },
            { value: minutes, label: "Minutes" },
            { value: seconds, label: "Seconds" },
          ].map(({ value, label }) => (
            <div
              key={label}
              className="bg-blue-600 rounded-xl p-4 text-center text-white"
            >
              <div className="text-4xl font-bold font-mono">{String(value).padStart(2, "0")}</div>
              <div className="text-xs mt-1 opacity-80">{label}</div>
            </div>
          ))}
        </div>
      )}

      {done && (
        <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-10 text-center">
          <p className="text-3xl font-bold text-green-600 dark:text-green-400 animate-bounce">
            {message}
          </p>
        </div>
      )}

      {!target && (
        <div className="flex items-center justify-center h-32 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
          <p className="text-gray-400 dark:text-gray-500">Select a target date & time to start countdown</p>
        </div>
      )}
    </div>
  );
}
