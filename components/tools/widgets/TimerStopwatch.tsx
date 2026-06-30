"use client";
import { useState, useRef, useEffect, useCallback } from "react";

function pad(n: number, digits = 2) {
  return String(n).padStart(digits, "0");
}

function beep() {
  try {
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = 880;
    gain.gain.setValueAtTime(0.5, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.8);
  } catch {}
}

export default function TimerStopwatch() {
  const [tab, setTab] = useState<"timer" | "stopwatch">("timer");

  // Timer state
  const [timerH, setTimerH] = useState("0");
  const [timerM, setTimerM] = useState("0");
  const [timerS, setTimerS] = useState("0");
  const [timerRemaining, setTimerRemaining] = useState<number | null>(null);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerDone, setTimerDone] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Stopwatch state
  const [swElapsed, setSwElapsed] = useState(0);
  const [swRunning, setSwRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);
  const swRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const swStartRef = useRef<number>(0);
  const swBaseRef = useRef<number>(0);

  // Timer logic
  const startTimer = useCallback(() => {
    const total =
      parseInt(timerH || "0") * 3600 +
      parseInt(timerM || "0") * 60 +
      parseInt(timerS || "0");
    if (total <= 0) return;
    if (timerRemaining === null) setTimerRemaining(total);
    setTimerDone(false);
    setTimerRunning(true);
  }, [timerH, timerM, timerS, timerRemaining]);

  useEffect(() => {
    if (timerRunning) {
      timerRef.current = setInterval(() => {
        setTimerRemaining((prev) => {
          if (prev === null || prev <= 0) return prev;
          if (prev === 1) {
            setTimerRunning(false);
            setTimerDone(true);
            beep();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [timerRunning]);

  function resetTimer() {
    setTimerRunning(false);
    setTimerRemaining(null);
    setTimerDone(false);
  }

  const displayRemaining = timerRemaining !== null
    ? timerRemaining
    : parseInt(timerH || "0") * 3600 + parseInt(timerM || "0") * 60 + parseInt(timerS || "0");
  const dispH = Math.floor(displayRemaining / 3600);
  const dispM = Math.floor((displayRemaining % 3600) / 60);
  const dispS = displayRemaining % 60;

  // Stopwatch logic
  function startSw() {
    swStartRef.current = Date.now();
    setSwRunning(true);
  }

  function stopSw() {
    swBaseRef.current += Date.now() - swStartRef.current;
    setSwRunning(false);
  }

  function resetSw() {
    setSwRunning(false);
    setSwElapsed(0);
    swBaseRef.current = 0;
    setLaps([]);
  }

  function addLap() {
    setLaps((prev) => [...prev, swElapsed]);
  }

  useEffect(() => {
    if (swRunning) {
      swRef.current = setInterval(() => {
        setSwElapsed(swBaseRef.current + (Date.now() - swStartRef.current));
      }, 50);
    } else {
      if (swRef.current) clearInterval(swRef.current);
    }
    return () => { if (swRef.current) clearInterval(swRef.current); };
  }, [swRunning]);

  const swMs = swElapsed % 1000;
  const swSec = Math.floor(swElapsed / 1000) % 60;
  const swMin = Math.floor(swElapsed / 60000) % 60;
  const swHr = Math.floor(swElapsed / 3600000);

  return (
    <div className="space-y-5">
      <div className="flex gap-2">
        {(["timer", "stopwatch"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-5 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
              tab === t
                ? "bg-blue-600 text-white"
                : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "timer" && (
        <div className="space-y-5">
          <div className="flex gap-3 justify-center">
            {[
              { label: "H", value: timerH, set: setTimerH },
              { label: "M", value: timerM, set: setTimerM },
              { label: "S", value: timerS, set: setTimerS },
            ].map(({ label, value, set }) => (
              <div key={label} className="text-center">
                <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">{label}</label>
                <input
                  type="number"
                  min="0"
                  max={label === "H" ? 99 : 59}
                  value={value}
                  onChange={(e) => { set(e.target.value); resetTimer(); }}
                  disabled={timerRunning}
                  className="w-20 px-2 py-2 text-center rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))}
          </div>

          <div className={`text-center py-8 rounded-xl ${timerDone ? "bg-green-50 dark:bg-green-900/30" : "bg-gray-50 dark:bg-gray-700/50"}`}>
            <div className="font-mono text-6xl font-bold text-gray-900 dark:text-white">
              {pad(dispH)}:{pad(dispM)}:{pad(dispS)}
            </div>
            {timerDone && (
              <p className="mt-3 text-green-600 dark:text-green-400 font-semibold text-lg animate-pulse">
                Time&apos;s up! ⏰
              </p>
            )}
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => (timerRunning ? setTimerRunning(false) : startTimer())}
              className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors"
            >
              {timerRunning ? "Pause" : timerRemaining !== null ? "Resume" : "Start"}
            </button>
            <button
              onClick={resetTimer}
              className="flex-1 py-3 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-800 dark:text-white font-bold rounded-xl transition-colors"
            >
              Reset
            </button>
          </div>
        </div>
      )}

      {tab === "stopwatch" && (
        <div className="space-y-5">
          <div className="text-center py-8 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
            <div className="font-mono text-6xl font-bold text-gray-900 dark:text-white">
              {pad(swHr)}:{pad(swMin)}:{pad(swSec)}
            </div>
            <div className="font-mono text-2xl text-gray-500 dark:text-gray-400 mt-1">
              .{pad(Math.floor(swMs / 10))}
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => (swRunning ? stopSw() : startSw())}
              className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors"
            >
              {swRunning ? "Stop" : "Start"}
            </button>
            <button
              onClick={addLap}
              disabled={!swRunning}
              className="flex-1 py-3 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 disabled:opacity-50 text-gray-800 dark:text-white font-bold rounded-xl transition-colors"
            >
              Lap
            </button>
            <button
              onClick={resetSw}
              className="flex-1 py-3 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-800 dark:text-white font-bold rounded-xl transition-colors"
            >
              Reset
            </button>
          </div>

          {laps.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Laps</h3>
              <div className="space-y-1 max-h-48 overflow-y-auto">
                {laps.map((lap, i) => {
                  const ms = lap % 1000;
                  const s = Math.floor(lap / 1000) % 60;
                  const m = Math.floor(lap / 60000) % 60;
                  const h = Math.floor(lap / 3600000);
                  return (
                    <div
                      key={i}
                      className="flex justify-between px-4 py-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg text-sm"
                    >
                      <span className="text-gray-500 dark:text-gray-400">Lap {i + 1}</span>
                      <span className="font-mono font-semibold text-gray-900 dark:text-white">
                        {pad(h)}:{pad(m)}:{pad(s)}.{pad(Math.floor(ms / 10))}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
