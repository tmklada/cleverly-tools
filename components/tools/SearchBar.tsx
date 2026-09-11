"use client";

import { useState, useEffect, useRef, useId } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { searchTools } from "@/lib/search-tools";
import type { ToolConfig } from "@/types/tool";

interface SearchBarProps {
  size?: "default" | "large";
  autoFocus?: boolean;
  placeholder?: string;
}

export default function SearchBar({ size = "default", autoFocus = false, placeholder }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ToolConfig[]>([]);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [isMac, setIsMac] = useState(false);
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listId = useId();

  useEffect(() => {
    setIsMac(/Mac|iPhone|iPad/.test(navigator.platform));
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setOpen(false);
      return;
    }
    const found = searchTools(query, 7);
    setResults(found);
    setActive(0);
    setOpen(true);
  }, [query]);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onShortcut(e: KeyboardEvent) {
      const isShortcut = (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k";
      const isSlash = e.key === "/" && !["INPUT", "TEXTAREA"].includes((e.target as HTMLElement)?.tagName);
      if (isShortcut || isSlash) {
        e.preventDefault();
        inputRef.current?.focus();
        inputRef.current?.select();
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    if (size === "default") document.addEventListener("keydown", onShortcut);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onShortcut);
    };
  }, [size]);

  function goTo(tool: ToolConfig) {
    setOpen(false);
    setQuery("");
    router.push(`/tools/${tool.slug}`);
  }

  function goToResults() {
    if (!query.trim()) return;
    setOpen(false);
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      if (open && active < results.length && results[active]) goTo(results[active]);
      else goToResults();
      return;
    }
    if (!open) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, results.length));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Escape") {
      setOpen(false);
      inputRef.current?.blur();
    }
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (active < results.length && results[active]) goTo(results[active]);
    else goToResults();
  }

  const large = size === "large";

  return (
    <div ref={ref} className="relative w-full">
      <form onSubmit={onSubmit} className="relative" role="search">
        <input
          ref={inputRef}
          type="search"
          value={query}
          autoFocus={autoFocus}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.trim() && setOpen(true)}
          onKeyDown={onKeyDown}
          placeholder={placeholder ?? (large ? "What do you need? e.g. merge PDF, TikTok downloader, BMI…" : "Search 94 tools…")}
          aria-label="Search tools"
          aria-autocomplete="list"
          aria-controls={listId}
          aria-expanded={open}
          autoComplete="off"
          className={
            large
              ? "w-full pl-14 pr-4 py-4 md:py-5 rounded-2xl border-2 border-white/30 bg-white text-gray-900 text-base md:text-lg shadow-2xl shadow-blue-900/30 focus:outline-none focus:ring-4 focus:ring-blue-300/50 transition placeholder:text-gray-400"
              : "w-full pl-10 pr-14 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          }
        />
        <span className={`absolute top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none ${large ? "left-5 text-2xl" : "left-3"}`}>
          🔍
        </span>
        {!large && (
          <kbd className="hidden md:flex absolute right-3 top-1/2 -translate-y-1/2 items-center gap-0.5 text-[10px] font-medium text-gray-400 border border-gray-200 dark:border-gray-600 rounded px-1.5 py-0.5 pointer-events-none">
            {isMac ? "⌘" : "Ctrl"} K
          </kbd>
        )}
      </form>

      {open && (
        <div
          id={listId}
          role="listbox"
          className="absolute top-full mt-2 left-0 right-0 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 z-50 overflow-hidden text-left"
        >
          {results.length === 0 ? (
            <div className="px-4 py-4 text-sm text-gray-500">
              No tools match “{query}”.{" "}
              <Link href="/contact" className="text-blue-600 hover:underline" onClick={() => setOpen(false)}>
                Request this tool →
              </Link>
            </div>
          ) : (
            <>
              {results.map((tool, i) => (
                <Link
                  key={tool.slug}
                  href={`/tools/${tool.slug}`}
                  role="option"
                  aria-selected={i === active}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => { setOpen(false); setQuery(""); }}
                  className={`flex items-center gap-3 px-4 py-3 transition-colors ${
                    i === active ? "bg-blue-50 dark:bg-blue-900/30" : "hover:bg-gray-50 dark:hover:bg-gray-700"
                  }`}
                >
                  <span className="text-xl">{tool.icon}</span>
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-gray-900 dark:text-white truncate">{tool.title}</div>
                    <div className="text-xs text-gray-500 truncate">{tool.shortDescription}</div>
                  </div>
                  <span className="ml-auto text-[10px] uppercase tracking-wide text-gray-400 hidden sm:block">
                    {tool.category.replace(/-/g, " ")}
                  </span>
                </Link>
              ))}
              <button
                type="button"
                onMouseEnter={() => setActive(results.length)}
                onClick={goToResults}
                className={`w-full text-left px-4 py-2.5 text-xs font-medium border-t border-gray-100 dark:border-gray-700 transition-colors ${
                  active === results.length ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300" : "text-blue-600 dark:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700"
                }`}
              >
                See all results for “{query}” →
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
