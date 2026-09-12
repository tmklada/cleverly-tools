"use client";
import { useState, useEffect, useMemo, useRef } from "react";

/** Flags for the most-converted currencies. The rest show their ISO code only. */
const FLAGS: Record<string, string> = {
  USD: "🇺🇸", EUR: "🇪🇺", GBP: "🇬🇧", JPY: "🇯🇵", CAD: "🇨🇦", AUD: "🇦🇺",
  CHF: "🇨🇭", CNY: "🇨🇳", INR: "🇮🇳", ILS: "🇮🇱", AED: "🇦🇪", SAR: "🇸🇦",
  TRY: "🇹🇷", RUB: "🇷🇺", BRL: "🇧🇷", MXN: "🇲🇽", ZAR: "🇿🇦", SEK: "🇸🇪",
  NOK: "🇳🇴", DKK: "🇩🇰", PLN: "🇵🇱", CZK: "🇨🇿", HUF: "🇭🇺", SGD: "🇸🇬",
  HKD: "🇭🇰", NZD: "🇳🇿", KRW: "🇰🇷", THB: "🇹🇭", EGP: "🇪🇬", NGN: "🇳🇬",
  PHP: "🇵🇭", IDR: "🇮🇩", MYR: "🇲🇾", PKR: "🇵🇰", UAH: "🇺🇦", RON: "🇷🇴",
};

/** Currency symbols worth showing in the big result line. */
const SYMBOLS: Record<string, string> = {
  USD: "$", EUR: "€", GBP: "£", JPY: "¥", CNY: "¥", INR: "₹", ILS: "₪",
  KRW: "₩", RUB: "₽", TRY: "₺", NGN: "₦", THB: "฿", VND: "₫", UAH: "₴",
  PHP: "₱", PLN: "zł", BRL: "R$", CAD: "C$", AUD: "A$", NZD: "NZ$", CHF: "Fr",
};

/** Codes that Intl.DisplayNames does not know (local/pegged issues on er-api). */
const EXTRA_NAMES: Record<string, string> = {
  FOK: "Faroese Króna",
  GGP: "Guernsey Pound",
  IMP: "Isle of Man Pound",
  JEP: "Jersey Pound",
  KID: "Kiribati Dollar",
  TVD: "Tuvaluan Dollar",
  CNH: "Chinese Yuan (Offshore)",
  XCG: "Caribbean Guilder",
};

const QUICK_AMOUNTS = [1, 10, 100, 1000];

function buildNamer(): (code: string) => string {
  let display: Intl.DisplayNames | null = null;
  try {
    display = new Intl.DisplayNames(["en"], { type: "currency" });
  } catch {
    display = null;
  }
  return (code: string) => {
    if (EXTRA_NAMES[code]) return EXTRA_NAMES[code];
    try {
      const name = display?.of(code);
      if (name && name !== code) return name;
    } catch {
      /* fall through to the code */
    }
    return code;
  };
}

interface CurrencyOption {
  code: string;
  name: string;
  flag: string;
}

interface RatesPayload {
  base: string;
  rates: Record<string, number>;
  updatedAt: string | null;
  count: number;
}

function CurrencyPicker({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: CurrencyOption[];
  onChange: (code: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, [open]);

  const selected = options.find((o) => o.code === value);
  const q = query.trim().toLowerCase();
  const filtered = q
    ? options.filter((o) => o.code.toLowerCase().includes(q) || o.name.toLowerCase().includes(q))
    : options;

  return (
    <div className="relative" ref={boxRef}>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>
      <button
        type="button"
        onClick={() => {
          setOpen((v) => !v);
          setQuery("");
        }}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="w-full px-3 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-left focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center gap-2"
      >
        <span aria-hidden="true">{selected?.flag}</span>
        <span className="font-semibold">{selected?.code ?? value}</span>
        <span className="truncate text-sm text-gray-500 dark:text-gray-400">{selected?.name}</span>
        <span className="ml-auto text-gray-400" aria-hidden="true">▾</span>
      </button>

      {open && (
        <div className="absolute z-20 mt-1 w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg">
          <div className="p-2 border-b border-gray-100 dark:border-gray-700">
            <input
              autoFocus
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`Search ${options.length} currencies...`}
              aria-label="Search currencies"
              className="w-full px-3 py-2 rounded-md border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <ul role="listbox" className="max-h-64 overflow-y-auto py-1">
            {filtered.length === 0 && (
              <li className="px-3 py-3 text-sm text-gray-500 dark:text-gray-400">No currency matches “{query}”.</li>
            )}
            {filtered.map((o) => (
              <li key={o.code}>
                <button
                  type="button"
                  role="option"
                  aria-selected={o.code === value}
                  onClick={() => {
                    onChange(o.code);
                    setOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-sm flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                    o.code === value ? "bg-blue-50 dark:bg-blue-900/30 font-semibold" : ""
                  }`}
                >
                  <span className="w-5" aria-hidden="true">{o.flag}</span>
                  <span className="w-12 font-mono text-gray-900 dark:text-white">{o.code}</span>
                  <span className="truncate text-gray-600 dark:text-gray-300">{o.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default function CurrencyConverter() {
  const [data, setData] = useState<RatesPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [amount, setAmount] = useState("1");
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("EUR");

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const res = await fetch("/api/rates");
        const json = await res.json();
        if (cancelled) return;
        if (!res.ok || !json?.rates) {
          setError(json?.error || "Failed to load live exchange rates. Please try again.");
          return;
        }
        setData(json as RatesPayload);
      } catch {
        if (!cancelled) setError("Failed to load live exchange rates. Please check your connection and try again.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const options: CurrencyOption[] = useMemo(() => {
    if (!data) return [];
    const nameOf = buildNamer();
    return Object.keys(data.rates)
      .map((code) => ({ code, name: nameOf(code), flag: FLAGS[code] ?? "" }))
      .sort((a, b) => a.code.localeCompare(b.code));
  }, [data]);

  const rates = data?.rates;

  /** All rates are quoted against USD, so convert through USD as the pivot. */
  const convert = (amt: number, fromC: string, toC: string): number | null => {
    if (!rates || !rates[fromC] || !rates[toC]) return null;
    return (amt / rates[fromC]) * rates[toC];
  };

  const swap = () => {
    setFrom(to);
    setTo(from);
  };

  const numericAmount = parseFloat(amount);
  const result = convert(isNaN(numericAmount) ? 0 : numericAmount, from, to);
  const unitRate = convert(1, from, to);
  const updatedLabel = data?.updatedAt
    ? new Date(data.updatedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    : "";
  const fromName = options.find((o) => o.code === from)?.name ?? from;

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        {loading ? (
          <div className="flex flex-col items-center gap-3 py-10">
            <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-gray-500 dark:text-gray-400">Loading live exchange rates...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 text-red-700 dark:text-red-400">
            <p className="font-semibold mb-1">Live rates unavailable</p>
            <p className="text-sm">{error}</p>
            <p className="text-sm mt-2">
              Conversion is disabled rather than showing outdated numbers. Please reload the page in a moment.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Amount</label>
              <input
                type="number"
                inputMode="decimal"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-xl font-bold"
              />
            </div>

            <CurrencyPicker label="From" value={from} options={options} onChange={setFrom} />

            <div className="flex justify-center my-3">
              <button
                onClick={swap}
                title="Swap currencies"
                className="px-6 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full font-medium text-sm transition-colors"
              >
                ⇄ Swap
              </button>
            </div>

            <CurrencyPicker label="To" value={to} options={options} onChange={setTo} />

            <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-5 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                {amount || 0} {fromName} =
              </p>
              <p className="text-4xl font-black text-blue-700 dark:text-blue-300 break-all">
                {SYMBOLS[to] ?? ""}
                {result === null
                  ? "—"
                  : result.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mt-1">{to}</p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-3">
                {unitRate !== null && `1 ${from} = ${unitRate.toFixed(4)} ${to}`}
                {updatedLabel && ` · Rates last updated: ${updatedLabel}`}
              </p>
            </div>

            <div className="mt-4">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Quick convert:</p>
              <div className="flex gap-2">
                {QUICK_AMOUNTS.map((a) => (
                  <button
                    key={a}
                    onClick={() => setAmount(String(a))}
                    className="flex-1 py-2 text-sm bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg transition-colors"
                  >
                    {a.toLocaleString("en-US")}
                  </button>
                ))}
              </div>
            </div>

            <p className="mt-4 text-center text-xs text-gray-400 dark:text-gray-500">
              {options.length} currencies · mid-market rates, updated daily
            </p>
          </>
        )}
      </div>
    </div>
  );
}
