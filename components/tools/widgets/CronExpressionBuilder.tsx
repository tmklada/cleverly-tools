"use client";
import { useState } from "react";

const PRESETS = [
  { label: "Every minute", value: "* * * * *" },
  { label: "Every 5 minutes", value: "*/5 * * * *" },
  { label: "Every hour", value: "0 * * * *" },
  { label: "Every day at midnight", value: "0 0 * * *" },
  { label: "Every day at noon", value: "0 12 * * *" },
  { label: "Every Monday 9am", value: "0 9 * * 1" },
  { label: "Every weekday 8am", value: "0 8 * * 1-5" },
  { label: "First day of month", value: "0 0 1 * *" },
  { label: "Every Sunday midnight", value: "0 0 * * 0" },
];

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function describeField(val: string, unit: string, items?: string[]): string {
  if (val === "*") return `every ${unit}`;
  if (val.startsWith("*/")) return `every ${val.slice(2)} ${unit}s`;
  if (val.includes("-")) {
    const [s, e] = val.split("-");
    return items ? `${items[parseInt(s)]} through ${items[parseInt(e)]}` : `${s} through ${e}`;
  }
  if (items) return items[parseInt(val)] || val;
  return val;
}

function describeCron(expr: string): string {
  const [min, hour, dom, month, dow] = expr.split(" ");
  const parts: string[] = [];

  const timeStr = min === "*" && hour === "*"
    ? "every minute"
    : `at ${hour === "*" ? "every hour" : hour.padStart(2, "0")}:${min === "*" ? "00" : min.padStart(2, "0")}`;

  parts.push(timeStr);
  if (dom !== "*") parts.push(`on day ${dom} of the month`);
  if (month !== "*") parts.push(`in ${describeField(month, "month", MONTHS)}`);
  if (dow !== "*") parts.push(`on ${describeField(dow, "day", DAYS_OF_WEEK)}`);

  return parts.join(", ");
}

function getNextRuns(expr: string, count: number): string[] {
  const [min, hour] = expr.split(" ");
  const now = new Date();
  const results: string[] = [];
  const d = new Date(now);

  const minVal = min === "*" ? null : min.startsWith("*/") ? parseInt(min.slice(2)) : parseInt(min);
  const hourVal = hour === "*" ? null : parseInt(hour);

  let attempts = 0;
  while (results.length < count && attempts < 10000) {
    attempts++;
    d.setSeconds(0, 0);
    d.setMinutes(d.getMinutes() + 1);

    const m = d.getMinutes();
    const h = d.getHours();

    const minMatch = min === "*" || (min.startsWith("*/") && m % (minVal ?? 1) === 0) || m === minVal;
    const hourMatch = hour === "*" || h === hourVal;

    if (minMatch && hourMatch) {
      results.push(d.toLocaleString("en-US", {
        weekday: "short", month: "short", day: "numeric",
        hour: "2-digit", minute: "2-digit",
      }));
    }
  }

  return results;
}

export default function CronExpressionBuilder() {
  const [minute, setMinute] = useState("0");
  const [hour, setHour] = useState("*");
  const [dom, setDom] = useState("*");
  const [month, setMonth] = useState("*");
  const [dow, setDow] = useState("*");
  const [copied, setCopied] = useState(false);

  const expr = `${minute} ${hour} ${dom} ${month} ${dow}`;
  const description = describeCron(expr);

  let nextRuns: string[] = [];
  try { nextRuns = getNextRuns(expr, 5); } catch { /* skip */ }

  const applyPreset = (value: string) => {
    const [m, h, d, mo, dw] = value.split(" ");
    setMinute(m);
    setHour(h);
    setDom(d);
    setMonth(mo);
    setDow(dw);
  };

  const copy = async () => {
    await navigator.clipboard.writeText(expr);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const Field = ({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) => (
    <div>
      <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || "*"}
        className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
      />
    </div>
  );

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="font-bold text-gray-900 dark:text-white mb-4">Presets</h3>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((p) => (
            <button key={p.value} onClick={() => applyPreset(p.value)}
              className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                expr === p.value
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}>
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="font-bold text-gray-900 dark:text-white mb-4">Builder</h3>
        <div className="grid grid-cols-5 gap-3">
          <Field label="Minute" value={minute} onChange={setMinute} placeholder="0-59" />
          <Field label="Hour" value={hour} onChange={setHour} placeholder="0-23" />
          <Field label="Day" value={dom} onChange={setDom} placeholder="1-31" />
          <Field label="Month" value={month} onChange={setMonth} placeholder="1-12" />
          <Field label="Weekday" value={dow} onChange={setDow} placeholder="0-6" />
        </div>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">* = any · */n = every n · ranges: 1-5 · lists: 1,3,5</p>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="font-mono text-2xl font-bold text-gray-900 dark:text-white">{expr}</div>
            <p className="text-sm text-blue-600 dark:text-blue-400 mt-1 capitalize">{description}</p>
          </div>
          <button onClick={copy} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors">
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>

        {nextRuns.length > 0 && (
          <div>
            <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">Next 5 Executions</h4>
            <div className="space-y-1">
              {nextRuns.map((run, i) => (
                <div key={i} className="flex items-center gap-3 text-sm">
                  <span className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs font-bold">{i + 1}</span>
                  <span className="text-gray-700 dark:text-gray-300 font-mono">{run}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
