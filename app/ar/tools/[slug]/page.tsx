import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getToolBySlug, allTools } from "@/config/tools";
import { ar, arTools } from "@/lib/i18n/ar";
import ToolWidget from "@/components/tools/ToolWidget";
import RelatedTools from "@/components/tools/RelatedTools";
import ShareButtons from "@/components/ui/ShareButtons";
import { SITE_URL } from "@/lib/site";

interface Props {
  params: Promise<{ slug: string }>;
}

// Only generate Arabic pages for tools that have translations
const AR_SUPPORTED_SLUGS = Object.keys(arTools);

export async function generateStaticParams() {
  return AR_SUPPORTED_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  const arTool = arTools[slug];
  if (!tool) return {};

  const title = arTool?.title ?? tool.title;
  const description = arTool?.description ?? tool.description;
  const keywords = arTool?.keywords ?? tool.keywords;
  const url = `${SITE_URL}/ar/tools/${slug}`;

  return {
    title: `${title} — cleverly.tools`,
    description,
    keywords,
    alternates: {
      canonical: url,
      languages: {
        "en": `${SITE_URL}/tools/${slug}`,
        "ar": url,
      },
    },
    openGraph: {
      title: `${title} | cleverly.tools`,
      description,
      url,
      locale: "ar_AR",
    },
  };
}

export default async function ArToolPage({ params }: Props) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) notFound();

  const arTool = arTools[slug];
  const title = arTool?.title ?? tool.title;
  const description = arTool?.description ?? tool.description;
  const url = `${SITE_URL}/ar/tools/${slug}`;

  // Schema JSON-LD
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: title,
    description,
    url,
    inLanguage: "ar",
    applicationCategory: "WebApplication",
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8" dir="rtl" lang="ar">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 dark:text-gray-400 mb-6 flex gap-2 flex-row-reverse">
          <Link href="/ar" className="hover:text-blue-600">الرئيسية</Link>
          <span>/</span>
          <span className="text-gray-700 dark:text-gray-300">{title}</span>
          <span className="mr-auto">
            <Link href={`/tools/${slug}`} className="text-xs text-blue-500 hover:underline">
              English →
            </Link>
          </span>
        </nav>

        {/* Header */}
        <div className="mb-8 text-right">
          <div className="flex items-center gap-3 mb-3 flex-row-reverse">
            <span className="text-4xl">{tool.icon}</span>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{title}</h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-400">{description}</p>
        </div>

        {/* Tool Widget — same as English */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 mb-8 shadow-sm">
          <ToolWidget tool={tool} />
        </div>

        {/* How it works — Arabic */}
        {tool.howItWorks.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-5 text-right">
              كيفية الاستخدام
            </h2>
            <div className="grid gap-4">
              {tool.howItWorks.map((step) => (
                <div key={step.step} className="flex gap-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl flex-row-reverse">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {step.step}
                  </div>
                  <div className="text-right">
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
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-5 text-right">
              الأسئلة الشائعة
            </h2>
            <div className="space-y-4">
              {tool.faq.map((item, i) => (
                <details key={i} className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl">
                  <summary className="flex items-center justify-between p-4 cursor-pointer font-medium text-gray-900 dark:text-white list-none flex-row-reverse">
                    {item.question}
                    <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <div className="px-4 pb-4 text-gray-600 dark:text-gray-400 text-sm text-right">
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
