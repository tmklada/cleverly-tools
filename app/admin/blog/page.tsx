import { requireAuth } from "@/lib/admin-auth";
import { getAllPosts } from "@/lib/blog";
import { deletePostAction } from "../actions";
import Link from "next/link";

export const metadata = { title: "Blog Management", robots: { index: false } };

export default async function AdminBlogPage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string; deleted?: string; updated?: string }>;
}) {
  await requireAuth();
  const posts = getAllPosts();
  const params = await searchParams;

  return (
    <div className="min-h-screen bg-gray-950">
      <header className="bg-gray-900 border-b border-gray-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/admin/dashboard" className="text-gray-400 hover:text-white text-sm">← Dashboard</Link>
          <span className="text-gray-600">/</span>
          <span className="text-white font-medium">Blog</span>
        </div>
        <Link href="/admin/blog/new"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-xl transition-colors">
          ✏️ New Article
        </Link>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-8">
        {(params.success || params.deleted || params.updated) && (
          <div className="mb-6 bg-green-900/30 border border-green-700 text-green-400 rounded-xl px-4 py-3 text-sm">
            ✅ {params.success ? "Article published!" : params.deleted ? "Article deleted." : "Article updated!"}
          </div>
        )}

        <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left px-4 py-3 text-gray-400 font-medium">Title</th>
                <th className="text-left px-4 py-3 text-gray-400 font-medium hidden md:table-cell">Category</th>
                <th className="text-left px-4 py-3 text-gray-400 font-medium hidden md:table-cell">Date</th>
                <th className="text-right px-4 py-3 text-gray-400 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.slug} className="border-b border-gray-800 last:border-0 hover:bg-gray-800/50">
                  <td className="px-4 py-3">
                    <div className="text-white font-medium">{post.title}</div>
                    <div className="text-gray-500 text-xs mt-0.5">/blog/{post.slug}</div>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <span className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded-full">{post.category}</span>
                  </td>
                  <td className="px-4 py-3 text-gray-400 hidden md:table-cell">{post.date}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/blog/${post.slug}`} target="_blank"
                        className="text-xs text-gray-400 hover:text-white px-2 py-1 rounded hover:bg-gray-700 transition-colors">
                        View ↗
                      </Link>
                      <Link href={`/admin/blog/${post.slug}`}
                        className="text-xs text-blue-400 hover:text-blue-300 px-2 py-1 rounded hover:bg-gray-700 transition-colors">
                        Edit
                      </Link>
                      <form action={deletePostAction} onSubmit={(e) => { if (!confirm("Delete this post?")) e.preventDefault(); }}>
                        <input type="hidden" name="slug" value={post.slug} />
                        <button type="submit" className="text-xs text-red-400 hover:text-red-300 px-2 py-1 rounded hover:bg-gray-700 transition-colors">
                          Delete
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {posts.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <div className="text-3xl mb-2">📝</div>
              <p>No articles yet. <Link href="/admin/blog/new" className="text-blue-400 hover:underline">Write the first one →</Link></p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
