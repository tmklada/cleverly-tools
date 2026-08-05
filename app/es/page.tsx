import type { Metadata } from "next";
import Link from "next/link";
import { es, esTools } from "@/lib/i18n/es";
import { allTools, getFeaturedTools } from "@/config/tools";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Herramientas gratuitas en línea para todos — cleverly.tools",
  description: "Descargar videos de Facebook, TikTok, Instagram, YouTube. Herramientas PDF, imágenes y calculadoras. 100% gratis sin registro.",
  keywords: ["herramientas gratis", "descargar video", "descargar tiktok", "descargar facebook", "herramientas pdf", "calculadora imc"],
  alternates: {
    canonical: `${SITE_URL}/es`,
    languages: { "en": `${SITE_URL}`, "es": `${SITE_URL}/es` },
  },
  openGraph: {
    title: "Herramientas gratuitas en línea para todos — cleverly.tools",
    description: "Descargar videos, herramientas PDF, calculadoras y más. 100% gratis.",
    locale: "es_ES",
  },
};

const SPANISH_TOOLS = [
  "facebook-video-downloader",
  "tiktok-video-downloader",
  "instagram-video-downloader",
  "youtube-video-downloader",
  "merge-pdf",
  "bmi-calculator",
  "compress-pdf",
  "image-resizer",
];

export default function EsHomePage() {
  const featured = getFeaturedTools().slice(0, 8);

  return (
    <div className="min-h-screen" dir="ltr" lang="es">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {es.hero.title}
            <br />
            <span className="text-blue-200">{es.hero.titleHighlight}</span>
          </h1>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            {es.hero.description}
          </p>
          <div className="flex flex-wrap gap-3 justify-center text-sm">
            {[es.hero.badge1, es.hero.badge2, es.hero.badge3, es.hero.badge4].map((badge) => (
              <span key={badge} className="bg-white/10 px-3 py-1 rounded-full">{badge}</span>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-14">
        {/* Spanish Featured Tools */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            🔥 {es.tool.useTool.replace(" →", "")} — Herramientas más populares
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {SPANISH_TOOLS.map((slug) => {
              const tool = allTools.find(t => t.slug === slug);
              const esTool = esTools[slug];
              if (!tool) return null;
              return (
                <Link
                  key={slug}
                  href={`/es/tools/${slug}`}
                  className="group flex flex-col gap-3 p-5 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-blue-400 hover:shadow-lg transition-all"
                >
                  <div className="text-3xl">{tool.icon}</div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
                      {esTool?.title ?? tool.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                      {esTool?.shortDescription ?? tool.shortDescription}
                    </p>
                  </div>
                  <div className="text-gray-300 group-hover:text-blue-500 transition-colors text-sm">
                    {es.tool.useTool}
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* All Tools */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            ⚡ Todas las herramientas
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {featured.map((tool) => {
              const esTool = esTools[tool.slug];
              return (
                <Link
                  key={tool.slug}
                  href={esTool ? `/es/tools/${tool.slug}` : `/tools/${tool.slug}`}
                  className="group flex flex-col gap-3 p-5 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-blue-400 hover:shadow-md transition-all"
                >
                  <div className="text-3xl">{tool.icon}</div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors text-sm">
                      {esTool?.title ?? tool.title}
                    </h3>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Language switcher */}
        <div className="text-center pt-4 border-t border-gray-200 dark:border-gray-800 flex flex-wrap gap-4 justify-center">
          <Link href="/" className="text-blue-600 hover:underline text-sm">
            🌐 Switch to English
          </Link>
          <Link href="/ar" className="text-blue-600 hover:underline text-sm">
            🌐 Ver en Árabe
          </Link>
        </div>
      </div>
    </div>
  );
}
