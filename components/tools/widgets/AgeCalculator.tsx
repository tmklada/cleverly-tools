"use client";
import { useState } from "react";

export default function AgeCalculator() {
  const [dob, setDob] = useState("");
  const [result, setResult] = useState<{ years: number; months: number; days: number; nextBirthday: number } | null>(null);

  function calculate() {
    if (!dob) return;
    const birth = new Date(dob);
    const today = new Date();
    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();
    if (days < 0) { months--; days += new Date(today.getFullYear(), today.getMonth(), 0).getDate(); }
    if (months < 0) { years--; months += 12; }
    const next = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
    if (next <= today) next.setFullYear(today.getFullYear() + 1);
    const nextBirthday = Math.ceil((next.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    setResult({ years, months, days, nextBirthday });
  }

  return (
    <div className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date of Birth</label>
        <input type="date" value={dob} onChange={e => setDob(e.target.value)} max={new Date().toISOString().split("T")[0]}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>
      <button onClick={calculate} className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors">
        Calculate Age
      </button>
      {result && (
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-3">
            {[["Years", result.years, "🎂"], ["Months", result.months, "📅"], ["Days", result.days, "⏰"]].map(([label, val, icon]) => (
              <div key={String(label)} className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 text-center">
                <div className="text-2xl">{icon}</div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{val}</div>
                <div className="text-sm text-gray-500">{label}</div>
              </div>
            ))}
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4 text-center">
            <div className="text-sm text-gray-500">Next Birthday in</div>
            <div className="text-2xl font-bold text-green-700 dark:text-green-400">{result.nextBirthday} days 🎉</div>
          </div>
        </div>
      )}
    </div>
  );
}
