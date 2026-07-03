import Link from "next/link";
import type { BlogPost } from "@/lib/blog";

interface RelatedArticlesProps {
  articles: BlogPost[];
}

export default function RelatedArticles({ articles }: RelatedArticlesProps) {
  if (articles.length === 0) return null;

  return (
    <section className="mt-10">
      <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
        📚 Related Guides
      </h2>
      <div className="space-y-3">
        {articles.map((article) => (
          <Link
            key={article.slug}
            href={`/blog/${article.slug}`}
            className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800 rounded-xl hover:bg-blue-100 dark:hover:bg-blue-900/20 transition-colors group"
          >
            <div>
              <div className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors text-sm">
                {article.title}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                {article.readingTime}
              </div>
            </div>
            <span className="text-blue-400 text-sm ml-4 shrink-0">Read →</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
