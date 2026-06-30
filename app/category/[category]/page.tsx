import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCategoryBySlug } from "@/data/categories";
import { getToolsByCategory } from "@/config/tools";
import ToolGrid from "@/components/tools/ToolGrid";

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const cat = getCategoryBySlug(category);
  if (!cat) return {};

  return {
    title: `${cat.name} — Free Online Tools`,
    description: cat.description,
    alternates: { canonical: `https://cleverly.tools/category/${cat.slug}` },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const cat = getCategoryBySlug(category);
  if (!cat) notFound();

  const tools = getToolsByCategory(category);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-4xl">{cat.icon}</span>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{cat.name}</h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400">{cat.description}</p>
      </div>

      {tools.length > 0 ? (
        <ToolGrid tools={tools} />
      ) : (
        <div className="text-center py-20 text-gray-500">
          <div className="text-5xl mb-4">🔧</div>
          <p>Tools in this category are coming soon!</p>
        </div>
      )}
    </div>
  );
}
