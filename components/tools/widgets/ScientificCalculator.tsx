"use client";
import { useCallback, useState } from "react";

/* ------------------------------------------------------------------ *
 * Math engine
 * ------------------------------------------------------------------ */

const HISTORY_KEY = "ct:calc-history";
const MAX_HISTORY = 30;

type HistoryEntry = { expr: string; result: string };

class CalcError extends Error {}

function factorial(n: number): number {
  if (!isFinite(n)) throw new CalcError("Factorial needs a finite number");
  if (n < 0) throw new CalcError("Factorial is undefined for negative numbers");
  if (!Number.isInteger(n)) throw new CalcError("Factorial needs a whole number");
  if (n > 170) throw new CalcError("Factorial too large — 170! is the limit");
  let out = 1;
  for (let i = 2; i <= n; i++) out *= i;
  return out;
}

/** Rewrite postfix "5!" / "(2+3)!" / "sin(0)!" into FACT(...) calls. */
function expandFactorials(src: string): string {
  let s = src;
  let guard = 0;
  let at = s.indexOf("!");
  while (at !== -1) {
    if (guard++ > 100) throw new CalcError("Expression is too complex");
    let start = at - 1;
    if (start < 0) throw new CalcError("Nothing to take the factorial of");

    if (s[start] === ")") {
      let depth = 0;
      while (start >= 0) {
        if (s[start] === ")") depth++;
        else if (s[start] === "(") {
          depth--;
          if (depth === 0) break;
        }
        start--;
      }
      if (start < 0) throw new CalcError("Unbalanced parentheses");
      while (start > 0 && /[A-Za-z]/.test(s[start - 1])) start--; // keep any function name
    } else {
      while (start >= 0 && /[0-9.]/.test(s[start])) start--;
      start++;
      if (start > at - 1) throw new CalcError("Nothing to take the factorial of");
    }

    s = `${s.slice(0, start)}FACT(${s.slice(start, at)})${s.slice(at + 1)}`;
    at = s.indexOf("!");
  }
  return s;
}

/** Turn the on-screen expression into a JavaScript expression. */
function toJs(expr: string): string {
  // Scientific notation from a previous result ("1.2E+21") → explicit powers,
  // so the lowercase "e" stays free to mean Euler's number.
  let s = expr.replace(/(\d(?:\.\d+)?)E([+-]?\d+)/g, "($1*10**($2))");
  const swaps: [string, string][] = [
    ["sin⁻¹(", "ASIN("],
    ["cos⁻¹(", "ACOS("],
    ["tan⁻¹(", "ATAN("],
    ["sin(", "SIN("],
    ["cos(", "COS("],
    ["tan(", "TAN("],
    ["ln(", "LN("],
    ["log(", "LOG("],
    ["√(", "SQRT("],
    ["∛(", "CBRT("],
  ];
  for (const [from, to] of swaps) s = s.split(from).join(to);
  // Constants — safe now that every function name is uppercase.
  s = s.split("π").join("(PI)").split("e").join("(E)");
  s = s.split("×").join("*").split("÷").join("/").split("−").join("-");
  s = s.split("^").join("**").split("%").join("/100");
  // Implicit multiplication: 2π, 3(4+1), (1+2)(3+4).
  s = s.replace(/([0-9.)])\s*\(/g, "$1*(");
  s = expandFactorials(s);

  // Auto-close any parentheses the user left open.
  let open = 0;
  for (const ch of s) {
    if (ch === "(") open++;
    else if (ch === ")") open--;
    if (open < 0) throw new CalcError("Unbalanced parentheses");
  }
  s += ")".repeat(open);

  // Whitelist: after removing known helper names, only math punctuation may remain.
  const residue = s.replace(/ASIN|ACOS|ATAN|SIN|COS|TAN|SQRT|CBRT|LN|LOG|FACT|PI|E/g, "");
  if (!/^[0-9+\-*/().,\s]*$/.test(residue)) throw new CalcError("Invalid characters in expression");
  return s;
}

function formatNumber(value: number): string {
  if (Number.isInteger(value) && Math.abs(value) < 1e15) return String(value);
  if (value !== 0 && (Math.abs(value) >= 1e15 || Math.abs(value) < 1e-9)) {
    return value.toExponential(8).replace(/\.?0+e/, "e").toUpperCase();
  }
  return String(parseFloat(value.toPrecision(12)));
}

type EvalResult = { value: string } | { error: string };

function evaluate(expr: string, degrees: boolean): EvalResult {
  if (!expr.trim()) return { error: "Enter an expression first" };

  const toRad = (x: number) => (degrees ? (x * Math.PI) / 180 : x);
  const fromRad = (x: number) => (degrees ? (x * 180) / Math.PI : x);
  // Kill float dust so tan(180°) reads 0 instead of -1.2e-16.
  const snap = (x: number) => (Math.abs(x) < 1e-12 ? 0 : x);
  const need = (ok: boolean, message: string) => {
    if (!ok) throw new CalcError(message);
  };

  const helpers = {
    SIN: (x: number) => snap(Math.sin(toRad(x))),
    COS: (x: number) => snap(Math.cos(toRad(x))),
    TAN: (x: number) => {
      const asDeg = degrees ? x : (x * 180) / Math.PI;
      need(Math.abs((((asDeg - 90) % 180) + 180) % 180) > 1e-9, "tan is undefined at 90° plus any multiple of 180°");
      return snap(Math.tan(toRad(x)));
    },
    ASIN: (x: number) => {
      need(x >= -1 && x <= 1, "sin⁻¹ only accepts values between −1 and 1");
      return fromRad(Math.asin(x));
    },
    ACOS: (x: number) => {
      need(x >= -1 && x <= 1, "cos⁻¹ only accepts values between −1 and 1");
      return fromRad(Math.acos(x));
    },
    ATAN: (x: number) => fromRad(Math.atan(x)),
    SQRT: (x: number) => {
      need(x >= 0, "Square root of a negative number isn't a real number");
      return Math.sqrt(x);
    },
    CBRT: (x: number) => Math.cbrt(x),
    LN: (x: number) => {
      need(x > 0, "ln is only defined for numbers greater than zero");
      return Math.log(x);
    },
    LOG: (x: number) => {
      need(x > 0, "log is only defined for numbers greater than zero");
      return Math.log10(x);
    },
    FACT: factorial,
    PI: Math.PI,
    E: Math.E,
  };

  try {
    const js = toJs(expr);
    const names = Object.keys(helpers);
    const run = new Function(...names, `"use strict"; return (${js});`) as (...args: unknown[]) => unknown;
    const value = run(...names.map(n => helpers[n as keyof typeof helpers]));

    if (typeof value !== "number") return { error: "That expression doesn't produce a number" };
    if (Number.isNaN(value)) return { error: "Undefined result — check the expression" };
    if (!isFinite(value)) {
      return { error: /\/\s*0(?!\.)/.test(js) ? "Cannot divide by zero" : "Result is too large to display" };
    }
    return { value: formatNumber(value) };
  } catch (err) {
    if (err instanceof CalcError) return { error: err.message };
    return { error: "Invalid expression — check your brackets and operators" };
  }
}

/* ------------------------------------------------------------------ *
 * Keypad
 * ------------------------------------------------------------------ */

type Action = "clear" | "backspace" | "evaluate" | "negate" | "mc" | "mr" | "mplus" | "mminus" | "ms";
type ButtonDef = { label: string; value?: string; action?: Action; className?: string; span?: 2 | 3 };

const FN = "bg-blue-50 dark:bg-gray-700 hover:bg-blue-100 dark:hover:bg-gray-600 text-blue-700 dark:text-blue-200";
const MEM = "bg-purple-50 dark:bg-gray-700 hover:bg-purple-100 dark:hover:bg-gray-600 text-purple-700 dark:text-purple-200";

const BUTTONS: ButtonDef[][] = [
  [
    { label: "MC", action: "mc", className: MEM },
    { label: "MR", action: "mr", className: MEM },
    { label: "M+", action: "mplus", className: MEM },
    { label: "M−", action: "mminus", className: MEM },
    { label: "MS", action: "ms", className: MEM },
  ],
  [
    { label: "AC", action: "clear", className: "bg-red-500 hover:bg-red-600 text-white" },
    { label: "⌫", action: "backspace", className: "bg-gray-400 dark:bg-gray-500 hover:bg-gray-500 dark:hover:bg-gray-400 text-white" },
    { label: "(", value: "(", className: FN },
    { label: ")", value: ")", className: FN },
    { label: "÷", value: "÷", className: FN },
  ],
  [
    { label: "sin", value: "sin(", className: FN },
    { label: "cos", value: "cos(", className: FN },
    { label: "tan", value: "tan(", className: FN },
    { label: "x²", value: "^2", className: FN },
    { label: "×", value: "×", className: FN },
  ],
  [
    { label: "sin⁻¹", value: "sin⁻¹(", className: FN },
    { label: "cos⁻¹", value: "cos⁻¹(", className: FN },
    { label: "tan⁻¹", value: "tan⁻¹(", className: FN },
    { label: "xʸ", value: "^", className: FN },
    { label: "−", value: "−", className: FN },
  ],
  [
    { label: "ln", value: "ln(", className: FN },
    { label: "log", value: "log(", className: FN },
    { label: "√", value: "√(", className: FN },
    { label: "∛", value: "∛(", className: FN },
    { label: "+", value: "+", className: FN },
  ],
  [
    { label: "7", value: "7" },
    { label: "8", value: "8" },
    { label: "9", value: "9" },
    { label: "n!", value: "!", className: FN },
    { label: "π", value: "π", className: FN },
  ],
  [
    { label: "4", value: "4" },
    { label: "5", value: "5" },
    { label: "6", value: "6" },
    { label: "1/x", value: "^(-1)", className: FN },
    { label: "e", value: "e", className: FN },
  ],
  [
    { label: "1", value: "1" },
    { label: "2", value: "2" },
    { label: "3", value: "3" },
    { label: "%", value: "%", className: FN },
    { label: "+/−", action: "negate" },
  ],
  [
    { label: "0", value: "0", span: 2 },
    { label: ".", value: "." },
    { label: "=", action: "evaluate", span: 2, className: "bg-blue-600 hover:bg-blue-700 text-white" },
  ],
];

/* ------------------------------------------------------------------ *
 * Component
 * ------------------------------------------------------------------ */

function loadHistory(): HistoryEntry[] {
  try {
    const raw = typeof window === "undefined" ? null : window.localStorage.getItem(HISTORY_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter(
        (e): e is HistoryEntry =>
          !!e && typeof e === "object" && typeof (e as HistoryEntry).expr === "string" && typeof (e as HistoryEntry).result === "string"
      )
      .slice(0, MAX_HISTORY);
  } catch {
    return []; // storage blocked or corrupt — start fresh
  }
}

export default function ScientificCalculator() {
  const [expression, setExpression] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [degrees, setDegrees] = useState<boolean>(true);
  const [memory, setMemory] = useState<number | null>(null);
  // This widget is client-only (loaded with ssr:false), so reading storage
  // during the first render is safe and avoids a second render pass.
  const [history, setHistory] = useState<HistoryEntry[]>(loadHistory);
  const [justEvaluated, setJustEvaluated] = useState<boolean>(false);

  const saveHistory = useCallback((entries: HistoryEntry[]) => {
    setHistory(entries);
    try {
      window.localStorage.setItem(HISTORY_KEY, JSON.stringify(entries));
    } catch {
      /* quota or private mode — history just won't persist */
    }
  }, []);

  const append = useCallback((val: string) => {
    setError("");
    setExpression(prev => {
      // After "=", a digit starts fresh but an operator continues from the result.
      const base = justEvaluated && /^[0-9.(]/.test(val) ? "" : prev;
      return base + val;
    });
    setJustEvaluated(false);
    setResult("");
  }, [justEvaluated]);

  const currentValue = useCallback((): number | null => {
    const src = expression.trim() || result;
    if (!src) return null;
    const res = evaluate(src, degrees);
    return "value" in res ? Number(res.value) : null;
  }, [expression, result, degrees]);

  const doEvaluate = useCallback(() => {
    if (!expression.trim()) return;
    const res = evaluate(expression, degrees);
    if ("error" in res) {
      setError(res.error);
      setResult("");
      return;
    }
    setError("");
    setResult(res.value);
    saveHistory([{ expr: expression, result: res.value }, ...history].slice(0, MAX_HISTORY));
    setExpression(res.value);
    setJustEvaluated(true);
  }, [expression, degrees, history, saveHistory]);

  const handleAction = useCallback((action: Action) => {
    switch (action) {
      case "clear":
        setExpression("");
        setResult("");
        setError("");
        setJustEvaluated(false);
        break;
      case "backspace":
        setError("");
        setExpression(prev => prev.slice(0, -1));
        setJustEvaluated(false);
        break;
      case "evaluate":
        doEvaluate();
        break;
      case "negate":
        setExpression(prev => (prev.startsWith("−") ? prev.slice(1) : "−" + prev));
        break;
      case "mc":
        setMemory(null);
        break;
      case "mr":
        if (memory !== null) append(formatNumber(memory).replace("-", "−"));
        break;
      case "ms": {
        const v = currentValue();
        if (v === null) setError("Nothing to store in memory");
        else setMemory(v);
        break;
      }
      case "mplus": {
        const v = currentValue();
        if (v === null) setError("Nothing to add to memory");
        else setMemory((memory ?? 0) + v);
        break;
      }
      case "mminus": {
        const v = currentValue();
        if (v === null) setError("Nothing to subtract from memory");
        else setMemory((memory ?? 0) - v);
        break;
      }
    }
  }, [doEvaluate, memory, append, currentValue]);

  function handleKey(e: React.KeyboardEvent) {
    const key = e.key;
    if (/^[0-9.()!%]$/.test(key)) append(key);
    else if (key === "+") append("+");
    else if (key === "-") append("−");
    else if (key === "*") append("×");
    else if (key === "/") append("÷");
    else if (key === "^") append("^");
    else if (key === "Enter" || key === "=") handleAction("evaluate");
    else if (key === "Backspace") handleAction("backspace");
    else if (key === "Escape") handleAction("clear");
    else return;
    e.preventDefault();
  }

  return (
    <div className="space-y-4" onKeyDown={handleKey} tabIndex={0} style={{ outline: "none" }}>
      {/* Mode + memory bar */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="inline-flex rounded-xl overflow-hidden border border-gray-200 dark:border-gray-600">
          <button
            onClick={() => setDegrees(true)}
            aria-pressed={degrees}
            className={`px-4 py-1.5 text-sm font-semibold transition-colors ${degrees ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"}`}
          >
            DEG
          </button>
          <button
            onClick={() => setDegrees(false)}
            aria-pressed={!degrees}
            className={`px-4 py-1.5 text-sm font-semibold transition-colors ${!degrees ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"}`}
          >
            RAD
          </button>
        </div>
        {memory !== null && (
          <span className="px-3 py-1 rounded-lg bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-200 text-xs font-bold font-mono">
            M = {formatNumber(memory)}
          </span>
        )}
      </div>

      {/* Display */}
      <div className="bg-gray-900 dark:bg-black rounded-2xl p-4 text-right space-y-1">
        <div className="text-gray-400 text-xs font-mono">{degrees ? "DEG" : "RAD"}</div>
        <div className="text-white text-3xl font-bold font-mono truncate">{expression || "0"}</div>
        {result && !error && <div className="text-blue-400 text-lg font-mono">= {result}</div>}
        {error && <div className="text-red-400 text-sm font-medium">{error}</div>}
      </div>

      {/* Keypad */}
      <div className="grid grid-cols-5 gap-2">
        {BUTTONS.map((row, ri) =>
          row.map((btn, bi) => (
            <button
              key={`${ri}-${bi}`}
              onClick={() => {
                if (btn.action) handleAction(btn.action);
                else if (btn.value !== undefined) append(btn.value);
              }}
              className={`${btn.className || "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-100"} ${btn.span === 3 ? "col-span-3" : btn.span === 2 ? "col-span-2" : ""} py-3.5 rounded-xl font-semibold text-sm transition-colors active:scale-95`}
            >
              {btn.label}
            </button>
          ))
        )}
      </div>

      {/* History */}
      <div className="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2 bg-gray-50 dark:bg-gray-800">
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">History</span>
          {history.length > 0 && (
            <button
              onClick={() => saveHistory([])}
              className="text-xs font-semibold text-red-600 dark:text-red-400 hover:underline"
            >
              Clear history
            </button>
          )}
        </div>
        {history.length === 0 ? (
          <p className="px-4 py-3 text-sm text-gray-400">No calculations yet — your recent results will be saved here.</p>
        ) : (
          <ul className="max-h-44 overflow-y-auto divide-y divide-gray-100 dark:divide-gray-700">
            {history.map((entry, idx) => (
              <li key={`${entry.expr}-${idx}`}>
                <button
                  onClick={() => {
                    setExpression(entry.expr);
                    setResult(entry.result);
                    setError("");
                    setJustEvaluated(false);
                  }}
                  className="w-full text-right px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <span className="block text-xs text-gray-500 dark:text-gray-400 font-mono truncate">{entry.expr}</span>
                  <span className="block text-sm font-bold text-gray-900 dark:text-white font-mono">= {entry.result}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <p className="text-xs text-center text-gray-400">
        Tip: click the calculator, then type on your keyboard. Enter evaluates, Backspace deletes, Escape clears. Switch DEG/RAD to change how sin, cos and tan read angles.
      </p>
    </div>
  );
}
