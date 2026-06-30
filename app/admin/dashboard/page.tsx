import { requireAuth } from "@/lib/admin-auth";
import { allTools } from "@/config/tools";
import { getAllPosts } from "@/lib/blog";
import { logoutAction } from "../actions";
import Link from "next/link";

export const metadata = { title: "Admin Dashboard", robots: { index: false } };

export default async function DashboardPage() {
  await requireAuth();

  const posts = getAllPosts();
  const tools = allTools;
  const categories = [...new Set(tools.map((t) => t.category))];

  const stats = [
    { label: "Total Tools", value: tools.length, icon: "🛠️", href: "/admin/tools" },
    { label: "Blog Posts", value: posts.length, icon: "📝", href: "/admin/blog" },
    { label: "Categories", value: categories.length, icon: "📂", href: "/admin/tools" },
    { label: "Featured", value: tools.filter((t) => t.featured).length, icon: "⭐", href: "/admin/tools" },
  ];

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">⚡</span>
          <div>
            <h1 className="text-white font-bold">cleverly.tools</h1>
            <p className="text-gray-400 text-xs">Admin Dashboard</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/" target="_blank" className="text-sm text-gray-400 hover:text-white transition-colors">
            View Site ↗
          </Link>
          <form action={logoutAction}>
            <button type="submit" className="text-sm text-red-400 hover:text-red-300 transition-colors">
              Logout
            </button>
          </form>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map(({ label, value, icon, href }) => (
            <Link key={label} href={href}
              className="bg-gray-900 border border-gray-800 rounded-2xl p-5 hover:border-gray-600 transition-colors">
              <div className="text-2xl mb-2">{icon}</div>
              <div className="text-3xl font-bold text-white">{value}</div>
              <div className="text-sm text-gray-400 mt-1">{label}</div>
            </Link>
          ))}
        </div>

        {/* Monitoring Alert */}
        <Link href="/admin/monitoring"
          className="flex items-center gap-3 bg-blue-900/20 border border-blue-800 rounded-2xl p-4 hover:bg-blue-900/30 transition-colors">
          <span className="text-2xl">🔍</span>
          <div>
            <div className="text-white font-semibold">Site Monitoring</div>
            <div className="text-blue-400 text-sm">Check tool health, API status & error logs →</div>
          </div>
        </Link>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <h2 className="text-white font-bold mb-4 flex items-center gap-2">
              <span>📝</span> Blog Management
            </h2>
            <div className="space-y-2">
              <Link href="/admin/blog/new"
                className="flex items-center gap-2 w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors text-sm">
                ✏️ Write New Article
              </Link>
              <Link href="/admin/blog"
                className="flex items-center gap-2 w-full px-4 py-3 bg-gray-800 hover:bg-gray-700 text-gray-200 font-medium rounded-xl transition-colors text-sm">
                📋 Manage Articles ({posts.length})
              </Link>
            </div>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <h2 className="text-white font-bold mb-4 flex items-center gap-2">
              <span>🛠️</span> Tools Management
            </h2>
            <div className="space-y-2">
              <Link href="/admin/tools"
                className="flex items-center gap-2 w-full px-4 py-3 bg-gray-800 hover:bg-gray-700 text-gray-200 font-medium rounded-xl transition-colors text-sm">
                📋 View All Tools ({tools.length})
              </Link>
              <Link href="/cleverly.tools" target="_blank"
                className="flex items-center gap-2 w-full px-4 py-3 bg-gray-800 hover:bg-gray-700 text-gray-200 font-medium rounded-xl transition-colors text-sm">
                🌐 View Live Site ↗
              </Link>
            </div>
          </div>
        </div>

        {/* Recent Posts */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white font-bold">Recent Blog Posts</h2>
            <Link href="/admin/blog" className="text-sm text-blue-400 hover:underline">View all →</Link>
          </div>
          <div className="space-y-2">
            {posts.slice(0, 5).map((post) => (
              <div key={post.slug} className="flex items-center justify-between py-2 border-b border-gray-800 last:border-0">
                <div>
                  <div className="text-sm text-white font-medium">{post.title}</div>
                  <div className="text-xs text-gray-500">{post.date} · {post.readingTime}</div>
                </div>
                <div className="flex gap-2">
                  <Link href={`/blog/${post.slug}`} target="_blank"
                    className="text-xs text-gray-400 hover:text-white px-2 py-1 rounded-lg hover:bg-gray-700 transition-colors">
                    View ↗
                  </Link>
                  <Link href={`/admin/blog/${post.slug}`}
                    className="text-xs text-blue-400 hover:text-blue-300 px-2 py-1 rounded-lg hover:bg-gray-700 transition-colors">
                    Edit
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
