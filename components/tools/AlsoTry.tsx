import Link from "next/link";
import { getRelatedTools, getToolsByCategory } from "@/config/tools";
import type { ToolConfig } from "@/types/tool";

export default function AlsoTry({ tool }: { tool: ToolConfig }) {
  const related = getRelatedTools(tool.relatedTools);
  const seen = new Set([tool.slug, ...related.map((t) => t.slug)]);
  const sameCategory = getToolsByCategory(tool.category).filter((t) => !seen.has(t.slug));
  const tools = [...related, ...sameCategory].slice(0, 6);
  if (tools.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 mb-8 text-sm">
      <span className="text-gray-500 dark:text-gray-400 font-medium mr-1">Also try:</span>
      {tools.map((t) => (
        <Link
          key={t.slug}
          href={`/tools/${t.slug}`}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-blue-900/30 dark:hover:text-blue-300 transition-colors"
        >
          <span>{t.icon}</span>
          {t.title}
        </Link>
      ))}
    </div>
  );
}
