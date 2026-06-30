import Link from "next/link";
import { getRelatedTools } from "@/config/tools";

interface RelatedToolsProps {
  slugs: string[];
}

export default function RelatedTools({ slugs }: RelatedToolsProps) {
  const tools = getRelatedTools(slugs);
  if (tools.length === 0) return null;

  return (
    <section className="mt-10">
      <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Related Tools</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {tools.map((tool) => (
          <Link
            key={tool.slug}
            href={`/tools/${tool.slug}`}
            className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-200 border border-transparent transition-all"
          >
            <span className="text-2xl">{tool.icon}</span>
            <div>
              <div className="text-sm font-medium text-gray-900 dark:text-white">{tool.title}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">{tool.shortDescription}</div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
