import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog — Free Tools Guides & Tutorials",
  description: "Guides, tutorials and tips for using free online tools. Learn how to download videos, merge PDFs, convert images and more.",
  alternates: { canonical: `${SITE_URL}/blog` },
};

const CATEGORY_LABELS: Record<string, string> = {
  "social-media": "📱 Social Media",
  pdf: "📄 PDF",
  image: "🖼️ Image",
  health: "⚖️ Health",
  general: "⚡ General",
  developer: "💻 Developer",
  calculators: "🧮 Calculators",
};

export default function BlogPage() {
  const posts = getAllPosts();
  const featured = posts.filter((p) => p.featured);
  const rest = posts.filter((p) => !p.featured);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Blog</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Guides, tutorials and tips for getting the most out of free online tools.
        </p>
      </div>

      {/* Featured Posts */}
      {featured.length > 0 && (
        <section className="mb-12">
          <h2 className="text-lg font-bold text-gray-700 dark:text-gray-300 mb-4">Featured</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {featured.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}
                className="group block bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 hover:border-blue-400 hover:shadow-md transition-all">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-full font-medium">
                    {CATEGORY_LABELS[post.category] ?? post.category}
                  </span>
                  <span className="text-xs text-gray-400">{post.readingTime}</span>
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-2 leading-snug">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{post.description}</p>
                <div className="mt-4 text-xs text-gray-400">{new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* All Posts */}
      {rest.length > 0 && (
        <section>
          <h2 className="text-lg font-bold text-gray-700 dark:text-gray-300 mb-4">All Articles</h2>
          <div className="space-y-4">
            {rest.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}
                className="group flex items-start gap-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-5 hover:border-blue-400 hover:shadow-sm transition-all">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs text-gray-400">{CATEGORY_LABELS[post.category] ?? post.category}</span>
                    <span className="text-gray-300">·</span>
                    <span className="text-xs text-gray-400">{post.readingTime}</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-1">{post.description}</p>
                </div>
                <span className="text-gray-300 dark:text-gray-600 group-hover:text-blue-400 transition-colors mt-1">→</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {posts.length === 0 && (
        <div className="text-center py-20 text-gray-400">
          <div className="text-4xl mb-3">✍️</div>
          <p>Articles coming soon!</p>
        </div>
      )}
    </div>
  );
}
