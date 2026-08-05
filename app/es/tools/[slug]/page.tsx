import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getToolBySlug } from "@/config/tools";
import { es, esTools } from "@/lib/i18n/es";
import { arTools } from "@/lib/i18n/ar";
import ToolWidget from "@/components/tools/ToolWidget";
import RelatedTools from "@/components/tools/RelatedTools";
import ShareButtons from "@/components/ui/ShareButtons";
import { SITE_URL } from "@/lib/site";

interface Props {
  params: Promise<{ slug: string }>;
}

// Only generate Spanish pages for tools that have translations
const ES_SUPPORTED_SLUGS = Object.keys(esTools);

export async function generateStaticParams() {
  return ES_SUPPORTED_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  const esTool = esTools[slug];
  if (!tool) return {};

  const title = esTool?.title ?? tool.title;
  const description = esTool?.description ?? tool.description;
  const keywords = esTool?.keywords ?? tool.keywords;
  const url = `${SITE_URL}/es/tools/${slug}`;

  const languages: Record<string, string> = {
    "en": `${SITE_URL}/tools/${slug}`,
    "es": url,
  };

  // Add Arabic hreflang if Arabic translation exists
  if (arTools[slug]) {
    languages["ar"] = `${SITE_URL}/ar/tools/${slug}`;
  }

  return {
    title: `${title} — cleverly.tools`,
    description,
    keywords,
    alternates: {
      canonical: url,
      languages,
    },
    openGraph: {
      title: `${title} | cleverly.tools`,
      description,
      url,
      locale: "es_ES",
    },
  };
}

export default async function EsToolPage({ params }: Props) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) notFound();

  const esTool = esTools[slug];
  const title = esTool?.title ?? tool.title;
  const description = esTool?.description ?? tool.description;
  const url = `${SITE_URL}/es/tools/${slug}`;

  // Schema JSON-LD
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: title,
    description,
    url,
    inLanguage: "es",
    applicationCategory: "WebApplication",
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8" dir="ltr" lang="es">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 dark:text-gray-400 mb-6 flex gap-2 items-center">
          <Link href="/es" className="hover:text-blue-600">Inicio</Link>
          <span>/</span>
          <span className="text-gray-700 dark:text-gray-300">{title}</span>
          <span className="ml-auto flex gap-3">
            <Link href={`/tools/${slug}`} className="text-xs text-blue-500 hover:underline">
              English →
            </Link>
            {arTools[slug] && (
              <Link href={`/ar/tools/${slug}`} className="text-xs text-blue-500 hover:underline">
                عربي →
              </Link>
            )}
          </span>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-4xl">{tool.icon}</span>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{title}</h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-400">{description}</p>
        </div>

        {/* Tool Widget — same as English */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 mb-8 shadow-sm">
          <ToolWidget tool={tool} />
        </div>

        {/* How it works — Spanish */}
        {tool.howItWorks.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-5">
              {es.tool.howToUse}
            </h2>
            <div className="grid gap-4">
              {tool.howItWorks.map((step) => (
                <div key={step.step} className="flex gap-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {step.step}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{step.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* FAQ */}
        {tool.faq.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-5">
              {es.tool.faq}
            </h2>
            <div className="space-y-4">
              {tool.faq.map((item, i) => (
                <details key={i} className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl">
                  <summary className="flex items-center justify-between p-4 cursor-pointer font-medium text-gray-900 dark:text-white list-none">
                    {item.question}
                    <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <div className="px-4 pb-4 text-gray-600 dark:text-gray-400 text-sm">
                    {item.answer}
                  </div>
                </details>
              ))}
            </div>
          </section>
        )}

        <RelatedTools slugs={tool.relatedTools} />
        <ShareButtons url={url} title={title} description={description} />
      </div>
    </>
  );
}
