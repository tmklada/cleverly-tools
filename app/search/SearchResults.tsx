"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { searchTools } from "@/lib/search-tools";
import { getTrendingTools } from "@/config/tools";
import { categories } from "@/data/categories";
import SearchBar from "@/components/tools/SearchBar";
import ToolCard from "@/components/tools/ToolCard";

export default function SearchResults() {
  const params = useSearchParams();
  const q = (params.get("q") ?? "").trim();
  const results = q ? searchTools(q, 40) : [];
  const fallback = getTrendingTools().slice(0, 8);

  return (
    <>
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
        {q ? <>Results for “{q}”</> : "Search tools"}
      </h1>
      <div className="max-w-2xl mb-8">
        <SearchBar size="large" autoFocus={!q} placeholder="Search 94 tools…" />
      </div>

      {q && results.length > 0 && (
        <>
          <p className="text-sm text-gray-500 mb-4">{results.length} tool{results.length === 1 ? "" : "s"} found</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {results.map((tool) => <ToolCard key={tool.slug} tool={tool} />)}
          </div>
        </>
      )}

      {q && results.length === 0 && (
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-8 text-center mb-10">
          <div className="text-4xl mb-3">🤔</div>
          <p className="font-semibold text-gray-900 dark:text-white">No tools match “{q}” yet.</p>
          <p className="text-sm text-gray-500 mt-1">
            Try a different word, browse a category below, or{" "}
            <Link href="/contact" className="text-blue-600 hover:underline">request this tool</Link> and we’ll build it.
          </p>
        </div>
      )}

      {(!q || results.length === 0) && (
        <>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Browse by category</h2>
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="text-sm px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-blue-900/30 transition-colors"
              >
                {cat.icon} {cat.name}
              </Link>
            ))}
          </div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">🔥 Popular right now</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {fallback.map((tool) => <ToolCard key={tool.slug} tool={tool} />)}
          </div>
        </>
      )}
    </>
  );
}
