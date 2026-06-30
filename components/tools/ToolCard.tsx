import Link from "next/link";
import type { ToolConfig } from "@/types/tool";

interface ToolCardProps {
  tool: ToolConfig;
}

export default function ToolCard({ tool }: ToolCardProps) {
  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="group relative flex flex-col gap-3 p-5 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-lg transition-all duration-200"
    >
      {/* Badges */}
      <div className="absolute top-3 right-3 flex gap-1">
        {tool.trending && (
          <span className="text-xs bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 px-2 py-0.5 rounded-full font-medium">
            🔥 Trending
          </span>
        )}
        {tool.isNew && (
          <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-2 py-0.5 rounded-full font-medium">
            ✨ New
          </span>
        )}
      </div>

      {/* Icon */}
      <div className="text-3xl">{tool.icon}</div>

      {/* Content */}
      <div>
        <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {tool.title}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
          {tool.shortDescription}
        </p>
      </div>

      {/* Arrow */}
      <div className="text-gray-300 dark:text-gray-600 group-hover:text-blue-500 transition-colors text-sm mt-auto">
        Use tool →
      </div>
    </Link>
  );
}
