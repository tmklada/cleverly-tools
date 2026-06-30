import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getToolBySlug, allTools } from "@/config/tools";
import RelatedTools from "@/components/tools/RelatedTools";
import ToolSchema from "@/components/seo/ToolSchema";
import AdUnit from "@/components/ads/AdUnit";
import ToolWidget from "@/components/tools/ToolWidget";
import ShareButtons from "@/components/ui/ShareButtons";
import { SITE_URL, SITE_NAME } from "@/lib/site";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return allTools.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) return {};

  return {
    title: tool.title,
    description: tool.description,
    keywords: tool.keywords,
    alternates: {
      canonical: `${SITE_URL}/tools/${tool.slug}`,
    },
    openGraph: {
      title: `${tool.title} | ${SITE_NAME}`,
      description: tool.description,
      url: `${SITE_URL}/tools/${tool.slug}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${tool.title} | ${SITE_NAME}`,
      description: tool.description,
    },
  };
}

export default async function ToolPage({ params }: Props) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) notFound();

  const toolUrl = `${SITE_URL}/tools/${tool.slug}`;

  return (
    <>
      <ToolSchema tool={tool} url={toolUrl} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 dark:text-gray-400 mb-6 flex gap-2">
          <a href="/" className="hover:text-blue-600">Home</a>
          <span>/</span>
          <a href={`/category/${tool.category}`} className="hover:text-blue-600 capitalize">
            {tool.category.replace(/-/g, " ")}
          </a>
          <span>/</span>
          <span className="text-gray-700 dark:text-gray-300">{tool.title}</span>
        </nav>

        {/* Top Ad */}
        <AdUnit position="top" className="mb-8" />

        {/* Tool Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-4xl">{tool.icon}</span>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{tool.title}</h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-400">{tool.description}</p>
        </div>

        {/* Tool Widget */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 mb-8 shadow-sm">
          <ToolWidget tool={tool} />
        </div>

        {/* After Tool Ad */}
        <AdUnit position="after-tool" className="mb-8" />

        {/* How It Works */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-5">How to Use {tool.title}</h2>
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
            {tool.faq.map((item, i) => (
              <details
                key={i}
                className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl"
              >
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

        {/* Related Tools */}
        <RelatedTools slugs={tool.relatedTools} />

        {/* Share Buttons */}
        <ShareButtons
          url={toolUrl}
          title={`${tool.title} — Free Online Tool`}
          description={tool.shortDescription}
        />
      </div>
    </>
  );
}
