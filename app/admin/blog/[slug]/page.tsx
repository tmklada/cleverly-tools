import { requireAuth } from "@/lib/admin-auth";
import { getPostBySlug, getAllPosts } from "@/lib/blog";
import { updatePostAction } from "../../actions";
import { allTools } from "@/config/tools";
import { notFound } from "next/navigation";
import Link from "next/link";

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export const metadata = { title: "Edit Article", robots: { index: false } };

const CATEGORIES = ["social-media", "pdf", "image", "calculators", "text", "developer", "health", "general"];

export default async function EditPostPage({ params }: { params: Promise<{ slug: string }> }) {
  await requireAuth();
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <div className="min-h-screen bg-gray-950">
      <header className="bg-gray-900 border-b border-gray-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/admin/blog" className="text-gray-400 hover:text-white text-sm">← Blog</Link>
          <span className="text-gray-600">/</span>
          <span className="text-white font-medium truncate max-w-xs">{post.title}</span>
        </div>
        <Link href={`/blog/${post.slug}`} target="_blank"
          className="text-sm text-gray-400 hover:text-white">
          View Live ↗
        </Link>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-8">
        <form action={updatePostAction} className="space-y-6">
          <input type="hidden" name="slug" value={post.slug} />
          <input type="hidden" name="date" value={post.date} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-1">Title</label>
              <input name="title" defaultValue={post.title} required
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-1">Meta Description</label>
              <textarea name="description" defaultValue={post.description} required rows={2}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Category</label>
              <select name="category" defaultValue={post.category}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Related Tool</label>
              <select name="relatedTool" defaultValue={post.relatedTool ?? ""}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">None</option>
                {allTools.map((t) => <option key={t.slug} value={t.slug}>{t.title}</option>)}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-1">Tags (comma separated)</label>
              <input name="tags" defaultValue={post.tags.join(", ")}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <div className="md:col-span-2 flex items-center gap-2">
              <input type="checkbox" name="featured" id="featured" defaultChecked={post.featured} className="w-4 h-4 accent-blue-600" />
              <label htmlFor="featured" className="text-sm text-gray-300">Featured article</label>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-1">Content (Markdown)</label>
              <textarea name="content" defaultValue={post.content} required rows={25}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none font-mono text-sm" />
            </div>
          </div>

          <div className="flex gap-3">
            <button type="submit"
              className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition-colors">
              Save Changes ✅
            </button>
            <Link href="/admin/blog"
              className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-gray-300 font-medium rounded-xl transition-colors">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
