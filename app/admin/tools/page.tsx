import { requireAuth } from "@/lib/admin-auth";
import { allTools } from "@/config/tools";
import Link from "next/link";

export const metadata = { title: "Tools Management", robots: { index: false } };

const CATEGORY_ICONS: Record<string, string> = {
  "social-media": "📱",
  pdf: "📄",
  image: "🖼️",
  calculators: "🧮",
  text: "📝",
  developer: "💻",
};

export default async function AdminToolsPage() {
  await requireAuth();

  const byCategory = allTools.reduce<Record<string, typeof allTools>>((acc, tool) => {
    if (!acc[tool.category]) acc[tool.category] = [];
    acc[tool.category].push(tool);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gray-950">
      <header className="bg-gray-900 border-b border-gray-800 px-6 py-4 flex items-center gap-3">
        <Link href="/admin/dashboard" className="text-gray-400 hover:text-white text-sm">← Dashboard</Link>
        <span className="text-gray-600">/</span>
        <span className="text-white font-medium">Tools ({allTools.length})</span>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-8 space-y-6">
        <div className="bg-blue-900/20 border border-blue-800 rounded-xl p-4 text-sm text-blue-300">
          💡 To add a new tool, create a config file in <code className="bg-blue-900/30 px-1 rounded">config/tools/</code> and add a widget in <code className="bg-blue-900/30 px-1 rounded">components/tools/widgets/</code>. Then register both in the index and ToolWidget files.
        </div>

        {Object.entries(byCategory).map(([category, tools]) => (
          <div key={category} className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-800 flex items-center justify-between">
              <h2 className="text-white font-bold flex items-center gap-2">
                <span>{CATEGORY_ICONS[category] ?? "🔧"}</span>
                <span className="capitalize">{category.replace("-", " ")}</span>
                <span className="text-gray-500 font-normal text-sm">({tools.length})</span>
              </h2>
              <Link href={`/category/${category}`} target="_blank"
                className="text-xs text-gray-400 hover:text-white">View category ↗</Link>
            </div>
            <div className="divide-y divide-gray-800">
              {tools.map((tool) => (
                <div key={tool.slug} className="flex items-center justify-between px-4 py-3 hover:bg-gray-800/50">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{tool.icon}</span>
                    <div>
                      <div className="text-white text-sm font-medium">{tool.title}</div>
                      <div className="text-gray-500 text-xs">/{tool.slug}</div>
                    </div>
                    <div className="flex gap-1 ml-2">
                      {tool.featured && <span className="text-xs bg-yellow-900/30 text-yellow-400 px-1.5 py-0.5 rounded">featured</span>}
                      {tool.trending && <span className="text-xs bg-orange-900/30 text-orange-400 px-1.5 py-0.5 rounded">trending</span>}
                      {tool.isNew && <span className="text-xs bg-green-900/30 text-green-400 px-1.5 py-0.5 rounded">new</span>}
                    </div>
                  </div>
                  <Link href={`/tools/${tool.slug}`} target="_blank"
                    className="text-xs text-gray-400 hover:text-white px-2 py-1 rounded hover:bg-gray-700 transition-colors">
                    View ↗
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
