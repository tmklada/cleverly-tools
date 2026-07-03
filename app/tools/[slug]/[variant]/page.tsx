import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getToolBySlug } from "@/config/tools";
import { getAllVariants, getVariant, getVariantsForTool } from "@/config/variants";
import ToolWidget from "@/components/tools/ToolWidget";
import RelatedTools from "@/components/tools/RelatedTools";
import ShareButtons from "@/components/ui/ShareButtons";
import AdUnit from "@/components/ads/AdUnit";
import { SITE_URL, SITE_NAME } from "@/lib/site";
import Link from "next/link";

interface Props {
  params: Promise<{ slug: string; variant: string }>;
}

export async function generateStaticParams() {
  return getAllVariants();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, variant: variantSlug } = await params;
  const tool = getToolBySlug(slug);
  const variant = getVariant(slug, variantSlug);
  if (!tool || !variant) return {};

  const url = `${SITE_URL}/tools/${slug}/${variantSlug}`;

  return {
    title: variant.title,
    description: variant.description,
    keywords: variant.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: `${variant.title} | ${SITE_NAME}`,
      description: variant.description,
      url,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: variant.title,
      description: variant.description,
    },
  };
}

export default async function ToolVariantPage({ params }: Props) {
  const { slug, variant: variantSlug } = await params;
  const tool = getToolBySlug(slug);
  const variant = getVariant(slug, variantSlug);

  if (!tool || !variant) notFound();

  const allVariants = getVariantsForTool(slug);
  const url = `${SITE_URL}/tools/${slug}/${variantSlug}`;

  // JSON-LD
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: variant.title,
      description: variant.description,
      url,
      applicationCategory: "WebApplication",
      operatingSystem: "All",
      isAccessibleForFree: true,
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: tool.title, item: `${SITE_URL}/tools/${slug}` },
        { "@type": "ListItem", position: 3, name: variant.h1, item: url },
      ],
    },
    ...(tool.faq.length > 0 || (variant.extraFaq?.length ?? 0) > 0 ? [{
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [...tool.faq, ...(variant.extraFaq ?? [])].map(f => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    }] : []),
  ];

  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 dark:text-gray-400 mb-6 flex flex-wrap gap-2">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <span>/</span>
          <Link href={`/tools/${slug}`} className="hover:text-blue-600">{tool.title}</Link>
          <span>/</span>
          <span className="text-gray-700 dark:text-gray-300">{variant.h1}</span>
        </nav>

        <AdUnit position="top" className="mb-8" />

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-4xl">{tool.icon}</span>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{variant.h1}</h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-400">{variant.description}</p>
        </div>

        {/* Tool Widget */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 mb-8 shadow-sm">
          <ToolWidget tool={tool} />
        </div>

        <AdUnit position="after-tool" className="mb-8" />

        {/* Intro content */}
        <div className="prose prose-gray dark:prose-invert max-w-none mb-8">
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            {variant.intro.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1')}
          </p>
        </div>

        {/* How it works */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-5">
            How to Use This Tool
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

        {/* FAQ */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-5">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {[...tool.faq, ...(variant.extraFaq ?? [])].map((item, i) => (
              <details key={i} className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl">
                <summary className="flex items-center justify-between p-4 cursor-pointer font-medium text-gray-900 dark:text-white list-none">
                  {item.question}
                  <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="px-4 pb-4 text-gray-600 dark:text-gray-400 text-sm">{item.answer}</div>
              </details>
            ))}
          </div>
        </section>

        {/* Other variants */}
        {allVariants.length > 1 && (
          <section className="mb-10">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              More {tool.title} Options
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link href={`/tools/${slug}`}
                className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 border border-gray-200 dark:border-gray-700 transition-colors text-sm font-medium text-gray-700 dark:text-gray-300">
                🔧 {tool.title} — Main Tool
              </Link>
              {allVariants.filter(v => v.variantSlug !== variantSlug).map(v => (
                <Link key={v.variantSlug} href={`/tools/${slug}/${v.variantSlug}`}
                  className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 border border-gray-200 dark:border-gray-700 transition-colors text-sm font-medium text-gray-700 dark:text-gray-300">
                  → {v.title.split(" — ")[0]}
                </Link>
              ))}
            </div>
          </section>
        )}

        <RelatedTools slugs={tool.relatedTools} />
        <ShareButtons url={url} title={variant.title} description={variant.description} />
      </div>
    </>
  );
}
