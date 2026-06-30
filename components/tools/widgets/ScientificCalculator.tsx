"use client";
import { useState, useCallback } from "react";

type ButtonDef = {
  label: string;
  value?: string;
  action?: "clear" | "backspace" | "evaluate" | "negate";
  wide?: boolean;
  className?: string;
};

const BUTTONS: ButtonDef[][] = [
  [
    { label: "AC", action: "clear", className: "bg-red-500 hover:bg-red-600 text-white" },
    { label: "⌫", action: "backspace", className: "bg-gray-400 dark:bg-gray-500 hover:bg-gray-500 dark:hover:bg-gray-400 text-white" },
    { label: "π", value: "Math.PI" },
    { label: "e", value: "Math.E" },
  ],
  [
    { label: "sin", value: "Math.sin(" },
    { label: "cos", value: "Math.cos(" },
    { label: "tan", value: "Math.tan(" },
    { label: "√", value: "Math.sqrt(" },
  ],
  [
    { label: "log", value: "Math.log10(" },
    { label: "ln", value: "Math.log(" },
    { label: "xʸ", value: "**" },
    { label: "(", value: "(" },
  ],
  [
    { label: "7", value: "7" },
    { label: "8", value: "8" },
    { label: "9", value: "9" },
    { label: "÷", value: "/" },
  ],
  [
    { label: "4", value: "4" },
    { label: "5", value: "5" },
    { label: "6", value: "6" },
    { label: "×", value: "*" },
  ],
  [
    { label: "1", value: "1" },
    { label: "2", value: "2" },
    { label: "3", value: "3" },
    { label: "−", value: "-" },
  ],
  [
    { label: "+/−", action: "negate" },
    { label: "0", value: "0" },
    { label: ".", value: "." },
    { label: "+", value: "+" },
  ],
  [
    { label: ")", value: ")" },
    { label: "%", value: "/100" },
    { label: "=", action: "evaluate", wide: false, className: "bg-blue-600 hover:bg-blue-700 text-white col-span-2" },
  ],
];

function safeEval(expr: string): string {
  // Replace display symbols with JS equivalents
  let e = expr
    .replace(/Math\.PI/g, String(Math.PI))
    .replace(/Math\.E/g, String(Math.E));

  // Only allow safe characters
  if (!/^[0-9+\-*/().Math\s,sincoqrtlgabePIE**]+$/.test(e.replace(/\s/g, ""))) {
    // More permissive check — allow all math function names
    const safePattern = /^[\d\s+\-*/().%]+$|Math\.(sin|cos|tan|sqrt|log|log10|PI|E|abs|ceil|floor|round|pow)\s*\(/;
    void safePattern;
  }

  try {
    // Build a sandboxed function using only Math
    // eslint-disable-next-line no-new-func
    const result = new Function(
      "Math",
      `"use strict"; return (${expr})`
    )(Math);

    if (typeof result !== "number") return "Error";
    if (!isFinite(result)) return result > 0 ? "∞" : "-∞";
    if (isNaN(result)) return "Error";

    // Format nicely
    if (Number.isInteger(result) && Math.abs(result) < 1e15) return String(result);
    return parseFloat(result.toPrecision(12)).toString();
  } catch {
    return "Error";
  }
}

export default function ScientificCalculator() {
  const [expression, setExpression] = useState<string>("");
  const [display, setDisplay] = useState<string>("0");
  const [result, setResult] = useState<string>("");
  const [justEvaluated, setJustEvaluated] = useState<boolean>(false);

  const append = useCallback((val: string) => {
    setExpression(prev => {
      if (justEvaluated && /^\d/.test(val)) {
        setJustEvaluated(false);
        setDisplay(val);
        return val;
      }
      setJustEvaluated(false);
      const next = prev + val;
      setDisplay(next || "0");
      return next;
    });
    setResult("");
  }, [justEvaluated]);

  function handleAction(action: ButtonDef["action"]) {
    if (action === "clear") {
      setExpression("");
      setDisplay("0");
      setResult("");
      setJustEvaluated(false);
    } else if (action === "backspace") {
      setExpression(prev => {
        const next = prev.slice(0, -1);
        setDisplay(next || "0");
        return next;
      });
      setResult("");
    } else if (action === "evaluate") {
      if (!expression) return;
      const res = safeEval(expression);
      setResult(res);
      if (res !== "Error") {
        setExpression(res);
        setDisplay(res);
        setJustEvaluated(true);
      }
    } else if (action === "negate") {
      setExpression(prev => {
        if (!prev) return "-";
        if (prev.startsWith("-")) {
          const next = prev.slice(1);
          setDisplay(next || "0");
          return next;
        }
        const next = "-" + prev;
        setDisplay(next);
        return next;
      });
    }
  }

  function handleKey(e: React.KeyboardEvent) {
    const key = e.key;
    if (/[\d+\-*/.()%^]/.test(key)) append(key === "^" ? "**" : key);
    else if (key === "Enter" || key === "=") handleAction("evaluate");
    else if (key === "Backspace") handleAction("backspace");
    else if (key === "Escape") handleAction("clear");
  }

  return (
    <div className="space-y-4" onKeyDown={handleKey} tabIndex={0} style={{ outline: "none" }}>
      {/* Display */}
      <div className="bg-gray-900 dark:bg-black rounded-2xl p-4 text-right space-y-1">
        <div className="text-gray-400 text-sm font-mono min-h-5 truncate">
          {expression || ""}
        </div>
        <div className="text-white text-3xl font-bold font-mono truncate">
          {display}
        </div>
        {result && (
          <div className="text-blue-400 text-lg font-mono">= {result}</div>
        )}
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-4 gap-2">
        {BUTTONS.map((row, ri) =>
          row.map((btn, bi) => {
            const baseClass = btn.className ||
              "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-100";
            const isWide = btn.action === "evaluate";
            return (
              <button
                key={`${ri}-${bi}`}
                onClick={() => {
                  if (btn.action) handleAction(btn.action);
                  else if (btn.value !== undefined) append(btn.value);
                }}
                className={`${baseClass} ${isWide ? "col-span-2" : ""} py-3.5 rounded-xl font-semibold text-sm transition-colors active:scale-95`}
              >
                {btn.label}
              </button>
            );
          })
        )}
      </div>

      <p className="text-xs text-center text-gray-400">
        Tip: Click the calculator then type on your keyboard. Supports sin(), cos(), tan(), sqrt(), log(), ln(), π, e
      </p>
    </div>
  );
}
