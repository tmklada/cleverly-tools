"use client";
import { useState } from "react";

function daysBetween(d1: Date, d2: Date): number {
  return Math.floor(Math.abs(d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24));
}

function countBusinessDays(start: Date, end: Date): number {
  let count = 0;
  const d = new Date(Math.min(start.getTime(), end.getTime()));
  const e = new Date(Math.max(start.getTime(), end.getTime()));
  while (d <= e) {
    const day = d.getDay();
    if (day !== 0 && day !== 6) count++;
    d.setDate(d.getDate() + 1);
  }
  return count;
}

function dateDiff(d1: Date, d2: Date) {
  const start = new Date(Math.min(d1.getTime(), d2.getTime()));
  const end = new Date(Math.max(d1.getTime(), d2.getTime()));
  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();
  let days = end.getDate() - start.getDate();
  if (days < 0) { months--; const tmp = new Date(end.getFullYear(), end.getMonth(), 0); days += tmp.getDate(); }
  if (months < 0) { years--; months += 12; }
  return { years, months, days };
}

function addToDate(base: Date, years: number, months: number, days: number): Date {
  const d = new Date(base);
  d.setFullYear(d.getFullYear() + years);
  d.setMonth(d.getMonth() + months);
  d.setDate(d.getDate() + days);
  return d;
}

type Tab = "between" | "add" | "until";

export default function DateCalculator() {
  const [tab, setTab] = useState<Tab>("between");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [businessDays, setBusinessDays] = useState(false);
  const [addBase, setAddBase] = useState("");
  const [addYears, setAddYears] = useState(0);
  const [addMonths, setAddMonths] = useState(0);
  const [addDays, setAddDays] = useState(0);
  const [untilDate, setUntilDate] = useState("");

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const renderBetween = () => {
    if (!startDate || !endDate) return null;
    const d1 = new Date(startDate);
    const d2 = new Date(endDate);
    if (isNaN(d1.getTime()) || isNaN(d2.getTime())) return null;
    const totalDays = daysBetween(d1, d2);
    const { years, months, days } = dateDiff(d1, d2);
    const bd = countBusinessDays(d1, d2);
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
        {[
          { label: "Years", value: years },
          { label: "Months", value: months },
          { label: "Days (remaining)", value: days },
          { label: "Total Days", value: totalDays },
          { label: "Weeks", value: Math.floor(totalDays / 7) },
          { label: "Hours", value: totalDays * 24 },
          ...(businessDays ? [{ label: "Business Days", value: bd }] : []),
        ].map((r) => (
          <div key={r.label} className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">{r.value.toLocaleString()}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{r.label}</p>
          </div>
        ))}
      </div>
    );
  };

  const renderAdd = () => {
    if (!addBase) return null;
    const base = new Date(addBase);
    if (isNaN(base.getTime())) return null;
    const result = addToDate(base, addYears, addMonths, addDays);
    return (
      <div className="mt-4 bg-green-50 dark:bg-green-900/20 rounded-xl p-4 text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Result Date</p>
        <p className="text-2xl font-bold text-green-700 dark:text-green-300">
          {result.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
        </p>
      </div>
    );
  };

  const renderUntil = () => {
    if (!untilDate) return null;
    const target = new Date(untilDate);
    if (isNaN(target.getTime())) return null;
    const diff = daysBetween(today, target);
    const isPast = target < today;
    return (
      <div className={`mt-4 rounded-xl p-6 text-center ${isPast ? "bg-red-50 dark:bg-red-900/20" : "bg-blue-50 dark:bg-blue-900/20"}`}>
        <p className="text-5xl font-black mb-2" style={{ color: isPast ? "#ef4444" : "#3b82f6" }}>{diff}</p>
        <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
          {isPast ? "days ago" : "days until"}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {target.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
        </p>
      </div>
    );
  };

  return (
    <div className="max-w-xl mx-auto">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex gap-2 mb-6 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
          {(["between", "add", "until"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                tab === t
                  ? "bg-white dark:bg-gray-700 shadow text-gray-900 dark:text-white"
                  : "text-gray-500 dark:text-gray-400"
              }`}
            >
              {t === "between" ? "Between Dates" : t === "add" ? "Add/Subtract" : "Days Until"}
            </button>
          ))}
        </div>

        {tab === "between" && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Start Date</label>
                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">End Date</label>
                <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
            <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
              <input type="checkbox" checked={businessDays} onChange={(e) => setBusinessDays(e.target.checked)} className="rounded" />
              Include business days count
            </label>
            {renderBetween()}
          </div>
        )}

        {tab === "add" && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Base Date</label>
              <input type="date" value={addBase} onChange={(e) => setAddBase(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Years", val: addYears, set: setAddYears },
                { label: "Months", val: addMonths, set: setAddMonths },
                { label: "Days", val: addDays, set: setAddDays },
              ].map(({ label, val, set }) => (
                <div key={label}>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>
                  <input type="number" value={val} onChange={(e) => set(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-400 dark:text-gray-500">Use negative numbers to subtract</p>
            {renderAdd()}
          </div>
        )}

        {tab === "until" && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Target Date</label>
              <input type="date" value={untilDate} onChange={(e) => setUntilDate(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Today: {today.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>
            {renderUntil()}
          </div>
        )}
      </div>
    </div>
  );
}
