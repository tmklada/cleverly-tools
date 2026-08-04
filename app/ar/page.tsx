import type { Metadata } from "next";
import Link from "next/link";
import { ar, arTools } from "@/lib/i18n/ar";
import { allTools, getFeaturedTools, getTrendingTools } from "@/config/tools";
import { categories } from "@/data/categories";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "أدوات مجانية عبر الإنترنت — cleverly.tools",
  description: "تحميل مقاطع فيديو من فيسبوك، تيك توك، إنستغرام، يوتيوب. أدوات PDF، الصور، والحسابات. مجاني 100% بدون تسجيل.",
  keywords: ["أدوات مجانية", "تحميل فيديو", "تحميل تيك توك", "تحميل فيسبوك", "أدوات pdf", "حاسبة"],
  alternates: {
    canonical: `${SITE_URL}/ar`,
    languages: { "en": `${SITE_URL}`, "ar": `${SITE_URL}/ar` },
  },
  openGraph: {
    title: "أدوات مجانية عبر الإنترنت — cleverly.tools",
    description: "تحميل فيديوهات، أدوات PDF، حسابات وأكثر. مجاني 100%.",
    locale: "ar_AR",
  },
};

const ARABIC_TOOLS = [
  "facebook-video-downloader",
  "tiktok-video-downloader",
  "instagram-video-downloader",
  "youtube-video-downloader",
  "merge-pdf",
  "bmi-calculator",
];

export default function ArHomePage() {
  const featured = getFeaturedTools().slice(0, 8);

  return (
    <div className="min-h-screen" dir="rtl" lang="ar">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {ar.hero.title}
            <br />
            <span className="text-blue-200">{ar.hero.titleHighlight}</span>
          </h1>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            {ar.hero.description}
          </p>
          <div className="flex flex-wrap gap-3 justify-center text-sm">
            {[ar.hero.badge1, ar.hero.badge2, ar.hero.badge3, ar.hero.badge4].map((badge) => (
              <span key={badge} className="bg-white/10 px-3 py-1 rounded-full">{badge}</span>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-14">
        {/* Arabic Featured Tools */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-right">
            🔥 الأدوات الأكثر استخداماً
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ARABIC_TOOLS.map((slug) => {
              const tool = allTools.find(t => t.slug === slug);
              const arTool = arTools[slug];
              if (!tool) return null;
              return (
                <Link
                  key={slug}
                  href={`/ar/tools/${slug}`}
                  className="group flex flex-col gap-3 p-5 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-blue-400 hover:shadow-lg transition-all"
                >
                  <div className="text-3xl">{tool.icon}</div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors text-right">
                      {arTool?.title ?? tool.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 text-right line-clamp-2">
                      {arTool?.shortDescription ?? tool.shortDescription}
                    </p>
                  </div>
                  <div className="text-gray-300 group-hover:text-blue-500 transition-colors text-sm text-right">
                    ← استخدم الأداة
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* All Tools */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-right">
            ⚡ جميع الأدوات
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {featured.map((tool) => {
              const arTool = arTools[tool.slug];
              return (
                <Link
                  key={tool.slug}
                  href={arTool ? `/ar/tools/${tool.slug}` : `/tools/${tool.slug}`}
                  className="group flex flex-col gap-3 p-5 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-blue-400 hover:shadow-md transition-all"
                >
                  <div className="text-3xl">{tool.icon}</div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors text-right text-sm">
                      {arTool?.title ?? tool.title}
                    </h3>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Language switcher */}
        <div className="text-center pt-4 border-t border-gray-200 dark:border-gray-800">
          <Link href="/" className="text-blue-600 hover:underline text-sm">
            🌐 Switch to English
          </Link>
        </div>
      </div>
    </div>
  );
}
