import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCategoryBySlug, categories } from "@/data/categories";
import { getToolsByCategory } from "@/config/tools";
import ToolGrid from "@/components/tools/ToolGrid";
import { SITE_URL } from "@/lib/site";

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const cat = getCategoryBySlug(category);
  if (!cat) return {};

  const toolCount = getToolsByCategory(category).length;

  return {
    title: `${cat.name} — ${toolCount} Free Online Tools`,
    description: `${cat.description} ${toolCount} free tools, no registration required. Works on all devices.`,
    keywords: [`free ${cat.name.toLowerCase()}`, `online ${cat.name.toLowerCase()}`, "free tools", "no signup"],
    alternates: { canonical: `${SITE_URL}/category/${cat.slug}` },
    openGraph: {
      title: `${cat.name} — Free Online Tools`,
      description: cat.description,
      url: `${SITE_URL}/category/${cat.slug}`,
      type: "website",
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const cat = getCategoryBySlug(category);
  if (!cat) notFound();

  const tools = getToolsByCategory(category);
  const featured = tools.filter(t => t.featured);
  const rest = tools.filter(t => !t.featured);

  // JSON-LD for category page
  const categorySchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${cat.name} — Free Online Tools`,
    description: cat.description,
    url: `${SITE_URL}/category/${cat.slug}`,
    hasPart: tools.slice(0, 10).map(tool => ({
      "@type": "WebApplication",
      name: tool.title,
      url: `${SITE_URL}/tools/${tool.slug}`,
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(categorySchema) }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-4xl">{cat.icon}</span>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{cat.name}</h1>
            <span className="text-sm bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-full">
              {tools.length} free tools
            </span>
          </div>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl">{cat.description}</p>
          <div className="flex gap-2 mt-3 text-xs text-gray-400">
            <span>✅ 100% Free</span>
            <span>·</span>
            <span>⚡ Instant Results</span>
            <span>·</span>
            <span>🔒 No Registration</span>
          </div>
        </div>

        {tools.length > 0 ? (
          <div className="space-y-10">
            {featured.length > 0 && (
              <div>
                <h2 className="text-lg font-bold text-gray-700 dark:text-gray-300 mb-4">⭐ Most Popular</h2>
                <ToolGrid tools={featured} />
              </div>
            )}
            {rest.length > 0 && (
              <div>
                {featured.length > 0 && <h2 className="text-lg font-bold text-gray-700 dark:text-gray-300 mb-4">All {cat.name}</h2>}
                <ToolGrid tools={rest} />
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-500">
            <div className="text-5xl mb-4">🔧</div>
            <p>Tools in this category are coming soon!</p>
          </div>
        )}
      </div>
    </>
  );
}
