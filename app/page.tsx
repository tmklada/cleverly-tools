import Link from "next/link";
import ToolGrid from "@/components/tools/ToolGrid";
import { allTools, getFeaturedTools, getTrendingTools } from "@/config/tools";
import { categories } from "@/data/categories";
import AdUnit from "@/components/ads/AdUnit";

export default function HomePage() {
  const featured = getFeaturedTools();
  const trending = getTrendingTools();

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Free Online Tools
            <br />
            <span className="text-blue-200">For Everyone</span>
          </h1>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Download videos, convert PDFs, edit images, calculate anything.
            All free. No registration required.
          </p>
          <div className="flex flex-wrap gap-3 justify-center text-sm">
            <span className="bg-white/10 px-3 py-1 rounded-full">✅ 100% Free</span>
            <span className="bg-white/10 px-3 py-1 rounded-full">⚡ Instant Results</span>
            <span className="bg-white/10 px-3 py-1 rounded-full">🔒 No Registration</span>
            <span className="bg-white/10 px-3 py-1 rounded-full">📱 Works on All Devices</span>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-14">
        {/* Top Ad */}
        <AdUnit position="top" />

        {/* Categories */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Browse by Category</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="flex flex-col items-center gap-2 p-4 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-blue-400 hover:shadow-md transition-all text-center group"
              >
                <span className="text-2xl">{cat.icon}</span>
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Trending */}
        {trending.length > 0 && (
          <ToolGrid tools={trending} title="🔥 Trending Tools" />
        )}

        {/* Featured */}
        {featured.length > 0 && (
          <ToolGrid tools={featured} title="⭐ Featured Tools" />
        )}

        {/* All Tools */}
        <ToolGrid tools={allTools} title="All Tools" />

        {/* Footer Ad */}
        <AdUnit position="footer" />
      </div>
    </div>
  );
}
