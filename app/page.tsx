"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { allTools, getFeaturedTools, getTrendingTools } from "@/config/tools";
import { categories } from "@/data/categories";
import AdUnit from "@/components/ads/AdUnit";
import AnimatedToolCard from "@/components/ui/AnimatedToolCard";
import { EASING, DURATION } from "@/lib/animations";

function AnimatedSection({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: DURATION.slow, ease: EASING.default }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

export default function HomePage() {
  const featured = getFeaturedTools();
  const trending = getTrendingTools();

  const badges = ["✅ 100% Free", "⚡ Instant Results", "🔒 No Registration", "📱 All Devices"];

  return (
    <div className="min-h-screen">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-20 px-4">
        {/* Background glow blobs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-indigo-400/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DURATION.slow, ease: EASING.default }}
            className="text-4xl md:text-6xl font-bold mb-4 tracking-tight"
          >
            Free Online Tools
            <br />
            <span className="text-blue-200">For Everyone</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DURATION.slow, ease: EASING.default, delay: 0.1 }}
            className="text-lg text-blue-100 mb-10 max-w-2xl mx-auto"
          >
            Download videos, convert PDFs, edit images, calculate anything.
            All free. No registration required.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DURATION.slow, ease: EASING.default, delay: 0.18 }}
            className="flex flex-wrap gap-3 justify-center text-sm"
          >
            {badges.map((badge, i) => (
              <motion.span
                key={badge}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + i * 0.07, duration: DURATION.normal, ease: EASING.default }}
                className="bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/20"
              >
                {badge}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        <AdUnit position="top" />

        {/* ── Categories ── */}
        <AnimatedSection>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Browse by Category</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.slug}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.04, duration: DURATION.normal, ease: EASING.default }}
                whileHover={{ y: -4, transition: { duration: 0.15 } }}
              >
                <Link
                  href={`/category/${cat.slug}`}
                  className="flex flex-col items-center gap-2 p-4 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-blue-400 hover:shadow-md transition-colors text-center group h-full"
                >
                  <span className="text-2xl">{cat.icon}</span>
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {cat.name}
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>

        {/* ── Trending ── */}
        {trending.length > 0 && (
          <AnimatedSection>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">🔥 Trending Tools</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {trending.map((tool, i) => (
                <AnimatedToolCard key={tool.slug} tool={tool} index={i} />
              ))}
            </div>
          </AnimatedSection>
        )}

        {/* ── Featured ── */}
        {featured.length > 0 && (
          <AnimatedSection>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">⭐ Featured Tools</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {featured.slice(0, 8).map((tool, i) => (
                <AnimatedToolCard key={tool.slug} tool={tool} index={i} />
              ))}
            </div>
          </AnimatedSection>
        )}

        {/* ── All Tools ── */}
        <AnimatedSection>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">All Tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {allTools.map((tool, i) => (
              <AnimatedToolCard key={tool.slug} tool={tool} index={i % 12} />
            ))}
          </div>
        </AnimatedSection>

        <AdUnit position="footer" />
      </div>
    </div>
  );
}
