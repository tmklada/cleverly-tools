"use client";
import { useState, useRef, useCallback, useEffect } from "react";

const COMMON_TEMPOS = [
  { label: "Largo", bpm: 50 },
  { label: "Andante", bpm: 80 },
  { label: "Moderato", bpm: 100 },
  { label: "Allegro", bpm: 140 },
  { label: "Presto", bpm: 180 },
];

export default function MetronomeOnline() {
  const [bpm, setBpm] = useState(100);
  const [isPlaying, setIsPlaying] = useState(false);
  const [beat, setBeat] = useState(false);
  const [tapTimes, setTapTimes] = useState<number[]>([]);
  const [tapBpm, setTapBpm] = useState<number | null>(null);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const getAudioCtx = () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    }
    return audioCtxRef.current;
  };

  const playClick = useCallback(() => {
    const ctx = getAudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = 880;
    gain.gain.setValueAtTime(0.5, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.05);
    setBeat(true);
    setTimeout(() => setBeat(false), 100);
  }, []);

  const startStop = useCallback(() => {
    if (isPlaying) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = null;
      setIsPlaying(false);
      setBeat(false);
    } else {
      playClick();
      const interval = Math.round(60000 / bpm);
      intervalRef.current = setInterval(playClick, interval);
      setIsPlaying(true);
    }
  }, [isPlaying, bpm, playClick]);

  useEffect(() => {
    if (isPlaying) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      playClick();
      const interval = Math.round(60000 / bpm);
      intervalRef.current = setInterval(playClick, interval);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [bpm]);

  const handleTap = () => {
    const now = Date.now();
    setTapTimes((prev) => {
      const next = [...prev, now].slice(-8);
      if (next.length >= 2) {
        const intervals = next.slice(1).map((t, i) => t - next[i]);
        const avg = intervals.reduce((a, b) => a + b, 0) / intervals.length;
        const calculatedBpm = Math.round(60000 / avg);
        setTapBpm(calculatedBpm);
        setBpm(Math.min(300, Math.max(20, calculatedBpm)));
      }
      return next;
    });
  };

  const changeBpm = (delta: number) => {
    setBpm((prev) => Math.min(300, Math.max(20, prev + delta)));
  };

  return (
    <div className="max-w-md mx-auto space-y-6">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
        <div className="flex justify-center mb-8">
          <div
            className={`w-32 h-32 rounded-full border-4 flex items-center justify-center transition-all duration-75 ${
              beat
                ? "bg-blue-500 border-blue-400 scale-110 shadow-lg shadow-blue-500/50"
                : "bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600 scale-100"
            }`}
          >
            <span className={`text-3xl font-bold ${beat ? "text-white" : "text-gray-400 dark:text-gray-500"}`}>♩</span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-4 mb-6">
          <button
            onClick={() => changeBpm(-1)}
            className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-bold text-xl transition-colors"
          >
            −
          </button>
          <div className="text-center">
            <input
              type="number"
              min={20}
              max={300}
              value={bpm}
              onChange={(e) => setBpm(Math.min(300, Math.max(20, parseInt(e.target.value) || 60)))}
              className="w-24 text-center text-4xl font-bold text-gray-900 dark:text-white bg-transparent focus:outline-none"
            />
            <p className="text-sm text-gray-500 dark:text-gray-400">BPM</p>
          </div>
          <button
            onClick={() => changeBpm(1)}
            className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-bold text-xl transition-colors"
          >
            +
          </button>
        </div>

        <input
          type="range"
          min={20}
          max={300}
          value={bpm}
          onChange={(e) => setBpm(parseInt(e.target.value))}
          className="w-full mb-6 accent-blue-500"
        />

        <div className="flex gap-3">
          <button
            onClick={startStop}
            className={`flex-1 py-3 rounded-xl font-bold text-white transition-colors ${
              isPlaying
                ? "bg-red-500 hover:bg-red-600"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isPlaying ? "⏹ Stop" : "▶ Start"}
          </button>
          <button
            onClick={handleTap}
            className="flex-1 py-3 rounded-xl font-bold bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white transition-colors"
          >
            Tap Tempo
          </button>
        </div>

        {tapBpm && (
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-3">
            Tap BPM: <span className="font-bold text-blue-500">{tapBpm}</span>
          </p>
        )}
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">Common Tempos</h3>
        <div className="flex flex-wrap gap-2">
          {COMMON_TEMPOS.map((t) => (
            <button
              key={t.label}
              onClick={() => setBpm(t.bpm)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                bpm === t.bpm
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              {t.label} ({t.bpm})
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
