"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { allTools, getFeaturedTools, getTrendingTools, getToolsByCategory } from "@/config/tools";
import { categories } from "@/data/categories";
import AdUnit from "@/components/ads/AdUnit";
import AnimatedToolCard from "@/components/ui/AnimatedToolCard";
import SearchBar from "@/components/tools/SearchBar";
import RecentTools from "@/components/tools/RecentTools";
import { EASING, DURATION } from "@/lib/animations";

function AnimatedSection({ children, className, id }: { children: React.ReactNode; className?: string; id?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.section
      ref={ref}
      id={id}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: DURATION.slow, ease: EASING.default }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

const QUICK_LINKS = [
  { slug: "tiktok-video-downloader", label: "TikTok" },
  { slug: "facebook-video-downloader", label: "Facebook" },
  { slug: "instagram-video-downloader", label: "Instagram" },
  { slug: "merge-pdf", label: "Merge PDF" },
  { slug: "background-remover", label: "Remove BG" },
  { slug: "qr-code-generator", label: "QR Code" },
];

export default function HomeClient({ articleCount }: { articleCount: number }) {
  const featured = getFeaturedTools();
  const trending = getTrendingTools();

  const stats = [
    { value: `${allTools.length}+`, label: "Free tools" },
    { value: `${categories.length}`, label: "Categories" },
    { value: `${articleCount}+`, label: "How-to guides" },
    { value: "3", label: "Languages" },
  ];

  return (
    <div className="min-h-screen">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white pt-16 pb-20 px-4">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-indigo-400/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DURATION.slow, ease: EASING.default }}
            className="text-4xl md:text-6xl font-bold mb-4 tracking-tight"
          >
            {allTools.length} Free Online Tools
            <br />
            <span className="text-blue-200">No Sign-Up. No Limits.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DURATION.slow, ease: EASING.default, delay: 0.1 }}
            className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto"
          >
            Download videos, merge PDFs, remove backgrounds, generate QR codes, calculate anything —
            straight from your browser.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DURATION.slow, ease: EASING.default, delay: 0.15 }}
            className="max-w-2xl mx-auto mb-5"
          >
            <SearchBar size="large" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: DURATION.normal }}
            className="flex flex-wrap items-center justify-center gap-2 text-sm text-blue-100"
          >
            <span className="opacity-80">Popular:</span>
            {QUICK_LINKS.map((q) => (
              <Link
                key={q.slug}
                href={`/tools/${q.slug}`}
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full border border-white/20 transition-colors"
              >
                {q.label}
              </Link>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Stats strip ── */}
      <div className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400">{s.value}</div>
              <div className="text-xs md:text-sm text-gray-500 dark:text-gray-400">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        <RecentTools />

        <AdUnit position="top" />

        {/* ── Categories ── */}
        <AnimatedSection>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Browse by Category</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
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
                  <span className="text-[10px] text-gray-400">{getToolsByCategory(cat.slug).length} tools</span>
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

        <AdUnit position="in-article" />

        {/* ── Why us ── */}
        <AnimatedSection className="grid sm:grid-cols-3 gap-4">
          {[
            { icon: "🔒", title: "Private by design", text: "PDF, image and converter tools run entirely in your browser. Your files are never uploaded." },
            { icon: "⚡", title: "Instant results", text: "No queues, no processing emails. Most tools finish in under a second." },
            { icon: "🆓", title: "Free, no catch", text: "No accounts, no watermarks, no daily limits, no premium upsell." },
          ].map((b) => (
            <div key={b.title} className="p-5 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
              <div className="text-3xl mb-2">{b.icon}</div>
              <h3 className="font-semibold text-gray-900 dark:text-white">{b.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{b.text}</p>
            </div>
          ))}
        </AnimatedSection>

        {/* ── All Tools, grouped by category ── */}
        <section id="all-tools" className="scroll-mt-24 space-y-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">All {allTools.length} Tools</h2>
          {categories.map((cat) => {
            const tools = getToolsByCategory(cat.slug);
            if (tools.length === 0) return null;
            return (
              <AnimatedSection key={cat.slug} id={`cat-${cat.slug}`} className="scroll-mt-24">
                <div className="flex items-baseline justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    {cat.icon} {cat.name}
                  </h3>
                  <Link href={`/category/${cat.slug}`} className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                    View category →
                  </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {tools.map((tool, i) => (
                    <AnimatedToolCard key={tool.slug} tool={tool} index={i % 8} />
                  ))}
                </div>
              </AnimatedSection>
            );
          })}
        </section>

        <AdUnit position="footer" />
      </div>
    </div>
  );
}
