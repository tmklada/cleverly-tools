import ToolCard from "./ToolCard";
import type { ToolConfig } from "@/types/tool";

interface ToolGridProps {
  tools: ToolConfig[];
  title?: string;
}

export default function ToolGrid({ tools, title }: ToolGridProps) {
  if (tools.length === 0) return null;

  return (
    <section>
      {title && (
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{title}</h2>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {tools.map((tool) => (
          <ToolCard key={tool.slug} tool={tool} />
        ))}
      </div>
    </section>
  );
}
