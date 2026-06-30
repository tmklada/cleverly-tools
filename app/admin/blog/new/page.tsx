import { requireAuth } from "@/lib/admin-auth";
import { createPostAction } from "../../actions";
import { allTools } from "@/config/tools";
import Link from "next/link";

export const metadata = { title: "New Article", robots: { index: false } };

const CATEGORIES = ["social-media", "pdf", "image", "calculators", "text", "developer", "health", "general"];

export default async function NewPostPage() {
  await requireAuth();

  return (
    <div className="min-h-screen bg-gray-950">
      <header className="bg-gray-900 border-b border-gray-800 px-6 py-4 flex items-center gap-3">
        <Link href="/admin/blog" className="text-gray-400 hover:text-white text-sm">← Blog</Link>
        <span className="text-gray-600">/</span>
        <span className="text-white font-medium">New Article</span>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-8">
        <form action={createPostAction} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-1">Title *</label>
              <input name="title" required placeholder="How to Download Facebook Videos in HD..."
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-1">Meta Description *</label>
              <textarea name="description" required rows={2} placeholder="Short description for Google (150-160 chars)..."
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Category *</label>
              <select name="category" required
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Related Tool</label>
              <select name="relatedTool"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">None</option>
                {allTools.map((t) => <option key={t.slug} value={t.slug}>{t.title}</option>)}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-1">Tags (comma separated)</label>
              <input name="tags" placeholder="facebook, video download, how-to"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <div className="md:col-span-2 flex items-center gap-2">
              <input type="checkbox" name="featured" id="featured" className="w-4 h-4 accent-blue-600" />
              <label htmlFor="featured" className="text-sm text-gray-300">Featured article (shown on top of blog)</label>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-1">Content (Markdown) *</label>
              <p className="text-xs text-gray-500 mb-2">Use ## for headings, **bold**, *italic*, - for lists, [text](url) for links</p>
              <textarea name="content" required rows={20} placeholder="## Introduction&#10;&#10;Write your article here using Markdown...&#10;&#10;## Step 1&#10;..."
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none font-mono text-sm" />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="submit"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors">
              Publish Article ✅
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
