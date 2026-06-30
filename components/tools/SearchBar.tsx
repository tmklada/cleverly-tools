"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { allTools } from "@/config/tools";
import type { ToolConfig } from "@/types/tool";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ToolConfig[]>([]);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setOpen(false);
      return;
    }
    const q = query.toLowerCase();
    const filtered = allTools.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        t.keywords.some((k) => k.includes(q)) ||
        t.category.includes(q)
    );
    setResults(filtered.slice(0, 6));
    setOpen(filtered.length > 0);
  }, [query]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/?search=${encodeURIComponent(query)}`);
      setOpen(false);
    }
  }

  return (
    <div ref={ref} className="relative w-full">
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search tools..."
          className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
      </form>

      {open && (
        <div className="absolute top-full mt-2 left-0 right-0 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 z-50 overflow-hidden">
          {results.map((tool) => (
            <Link
              key={tool.slug}
              href={`/tools/${tool.slug}`}
              onClick={() => { setOpen(false); setQuery(""); }}
              className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <span className="text-xl">{tool.icon}</span>
              <div>
                <div className="text-sm font-medium text-gray-900 dark:text-white">{tool.title}</div>
                <div className="text-xs text-gray-500">{tool.shortDescription}</div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
