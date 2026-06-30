"use client";
import { useState, useMemo } from "react";

interface StrengthInfo {
  score: number;
  label: string;
  color: string;
  barColor: string;
}

function getStrength(password: string): StrengthInfo {
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1) return { score, label: "Very Weak", color: "text-red-600", barColor: "bg-red-500" };
  if (score === 2) return { score, label: "Weak", color: "text-orange-600", barColor: "bg-orange-500" };
  if (score === 3) return { score, label: "Fair", color: "text-yellow-600", barColor: "bg-yellow-500" };
  if (score === 4) return { score, label: "Good", color: "text-blue-600", barColor: "bg-blue-500" };
  if (score === 5) return { score, label: "Strong", color: "text-green-600", barColor: "bg-green-500" };
  return { score, label: "Very Strong", color: "text-emerald-600", barColor: "bg-emerald-500" };
}

function estimateCrackTime(password: string): string {
  if (!password) return "—";
  let charSpace = 0;
  if (/[a-z]/.test(password)) charSpace += 26;
  if (/[A-Z]/.test(password)) charSpace += 26;
  if (/[0-9]/.test(password)) charSpace += 10;
  if (/[^A-Za-z0-9]/.test(password)) charSpace += 32;
  if (charSpace === 0) return "instant";
  const combinations = Math.pow(charSpace, password.length);
  const guessesPerSecond = 1e10;
  const seconds = combinations / guessesPerSecond / 2;
  if (seconds < 1) return "instantly";
  if (seconds < 60) return `${Math.round(seconds)} seconds`;
  if (seconds < 3600) return `${Math.round(seconds / 60)} minutes`;
  if (seconds < 86400) return `${Math.round(seconds / 3600)} hours`;
  if (seconds < 31536000) return `${Math.round(seconds / 86400)} days`;
  if (seconds < 31536000000) return `${Math.round(seconds / 31536000)} years`;
  return "centuries";
}

export default function PasswordStrengthChecker() {
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  const strength = useMemo(() => getStrength(password), [password]);
  const crackTime = useMemo(() => estimateCrackTime(password), [password]);

  const checks = [
    { label: "8+ characters", pass: password.length >= 8 },
    { label: "Uppercase letter (A–Z)", pass: /[A-Z]/.test(password) },
    { label: "Lowercase letter (a–z)", pass: /[a-z]/.test(password) },
    { label: "Number (0–9)", pass: /[0-9]/.test(password) },
    { label: "Symbol (!@#$...)", pass: /[^A-Za-z0-9]/.test(password) },
    { label: "12+ characters (recommended)", pass: password.length >= 12 },
  ];

  return (
    <div className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Password
        </label>
        <div className="relative">
          <input
            type={show ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password to check..."
            className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
          />
          <button
            onClick={() => setShow((s) => !s)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-sm"
          >
            {show ? "Hide" : "Show"}
          </button>
        </div>
      </div>

      {password && (
        <>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className={`font-semibold ${strength.color}`}>{strength.label}</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Crack time: ~{crackTime}
              </span>
            </div>
            <div className="w-full h-3 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-300 ${strength.barColor}`}
                style={{ width: `${Math.round((strength.score / 6) * 100)}%` }}
              />
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 space-y-2">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Checklist</h3>
            {checks.map(({ label, pass }) => (
              <div key={label} className="flex items-center gap-2 text-sm">
                <span className={pass ? "text-green-500" : "text-gray-300 dark:text-gray-600"}>
                  {pass ? "✅" : "○"}
                </span>
                <span className={pass ? "text-gray-800 dark:text-gray-200" : "text-gray-400 dark:text-gray-500"}>
                  {label}
                </span>
              </div>
            ))}
          </div>

          {strength.score < 4 && (
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
              <h3 className="text-sm font-semibold text-blue-700 dark:text-blue-300 mb-2">Tips to improve</h3>
              <ul className="text-sm text-blue-600 dark:text-blue-400 space-y-1 list-disc list-inside">
                {!checks[0].pass && <li>Make it at least 8 characters</li>}
                {!checks[1].pass && <li>Add uppercase letters</li>}
                {!checks[3].pass && <li>Add numbers</li>}
                {!checks[4].pass && <li>Add special characters like !@#$%</li>}
                {!checks[5].pass && <li>Use 12+ characters for best security</li>}
              </ul>
            </div>
          )}
        </>
      )}

      {!password && (
        <div className="flex items-center justify-center h-24 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
          <p className="text-gray-400 dark:text-gray-500">Type a password to check its strength</p>
        </div>
      )}
    </div>
  );
}
