"use client";
import { useState, useCallback } from "react";

type TempUnit = "celsius" | "fahrenheit" | "kelvin";

function toCelsius(value: number, from: TempUnit): number {
  switch (from) {
    case "celsius": return value;
    case "fahrenheit": return (value - 32) * 5 / 9;
    case "kelvin": return value - 273.15;
  }
}

function fromCelsius(celsius: number, to: TempUnit): number {
  switch (to) {
    case "celsius": return celsius;
    case "fahrenheit": return celsius * 9 / 5 + 32;
    case "kelvin": return celsius + 273.15;
  }
}

function fmt(n: number): string {
  return parseFloat(n.toFixed(4)).toString();
}

interface Fields {
  celsius: string;
  fahrenheit: string;
  kelvin: string;
}

export default function TemperatureConverter() {
  const [fields, setFields] = useState<Fields>({ celsius: "", fahrenheit: "", kelvin: "" });

  const handleChange = useCallback((unit: TempUnit, val: string) => {
    if (val === "" || val === "-") {
      setFields({ celsius: "", fahrenheit: "", kelvin: "", [unit]: val });
      return;
    }
    const num = parseFloat(val);
    if (isNaN(num)) {
      setFields(prev => ({ ...prev, [unit]: val }));
      return;
    }
    const celsius = toCelsius(num, unit);
    setFields({
      celsius: unit === "celsius" ? val : fmt(fromCelsius(celsius, "celsius")),
      fahrenheit: unit === "fahrenheit" ? val : fmt(fromCelsius(celsius, "fahrenheit")),
      kelvin: unit === "kelvin" ? val : fmt(fromCelsius(celsius, "kelvin")),
    });
  }, []);

  const UNITS: { unit: TempUnit; label: string; symbol: string; color: string }[] = [
    { unit: "celsius", label: "Celsius", symbol: "°C", color: "blue" },
    { unit: "fahrenheit", label: "Fahrenheit", symbol: "°F", color: "orange" },
    { unit: "kelvin", label: "Kelvin", symbol: "K", color: "purple" },
  ];

  const colorMap: Record<string, string> = {
    blue: "border-blue-300 dark:border-blue-600 focus:ring-blue-500",
    orange: "border-orange-300 dark:border-orange-600 focus:ring-orange-500",
    purple: "border-purple-300 dark:border-purple-600 focus:ring-purple-500",
  };

  const badgeMap: Record<string, string> = {
    blue: "bg-blue-600",
    orange: "bg-orange-500",
    purple: "bg-purple-600",
  };

  function clear() {
    setFields({ celsius: "", fahrenheit: "", kelvin: "" });
  }

  return (
    <div className="space-y-5">
      <div className="space-y-4">
        {UNITS.map(({ unit, label, symbol, color }) => (
          <div key={unit}>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              <span className={`inline-block w-5 h-5 rounded-full ${badgeMap[color]} mr-2 align-middle`} />
              {label} ({symbol})
            </label>
            <div className="relative">
              <input
                type="number"
                value={fields[unit]}
                onChange={e => handleChange(unit, e.target.value)}
                placeholder={`Enter temperature in ${label}...`}
                className={`w-full px-4 py-3 pr-16 rounded-xl border-2 ${colorMap[color]} bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 transition-colors`}
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-mono font-bold">
                {symbol}
              </span>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={clear}
        className="w-full py-3 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 font-bold rounded-xl transition-colors"
      >
        Clear All
      </button>

      <div className="grid grid-cols-3 gap-3 text-center text-xs">
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-3">
          <div className="font-bold text-blue-700 dark:text-blue-300">Water Freezes</div>
          <div className="text-gray-500">0°C / 32°F / 273.15K</div>
        </div>
        <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-3">
          <div className="font-bold text-red-700 dark:text-red-300">Water Boils</div>
          <div className="text-gray-500">100°C / 212°F / 373.15K</div>
        </div>
        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-3">
          <div className="font-bold text-purple-700 dark:text-purple-300">Body Temp</div>
          <div className="text-gray-500">37°C / 98.6°F / 310.15K</div>
        </div>
      </div>
    </div>
  );
}
