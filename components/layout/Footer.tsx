import Link from "next/link";
import { categories } from "@/data/categories";
import { allTools, getToolsByCategory } from "@/config/tools";

const POPULAR_SLUGS = [
  "tiktok-video-downloader",
  "facebook-video-downloader",
  "instagram-video-downloader",
  "youtube-video-downloader",
  "merge-pdf",
  "compress-pdf",
  "background-remover",
  "image-compressor",
  "qr-code-generator",
  "bmi-calculator",
  "json-formatter",
  "password-generator",
];

export default function Footer() {
  const year = new Date().getFullYear();
  const popular = POPULAR_SLUGS.map((s) => allTools.find((t) => t.slug === s)).filter(Boolean);

  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl text-white mb-3">
              <span className="text-2xl">⚡</span>
              <span>cleverly<span className="text-blue-400">.tools</span></span>
            </Link>
            <p className="text-sm text-gray-400 max-w-xs">
              {allTools.length} free online tools in one place. Fast, private (most tools run entirely in your browser), and no registration required.
            </p>
            <div className="flex flex-wrap gap-2 mt-4 text-xs">
              <span className="bg-gray-800 px-2.5 py-1 rounded-full">✅ 100% Free</span>
              <span className="bg-gray-800 px-2.5 py-1 rounded-full">🔒 Privacy-first</span>
              <span className="bg-gray-800 px-2.5 py-1 rounded-full">📱 Mobile-friendly</span>
            </div>
            <div className="mt-5 text-sm text-gray-400">
              <span className="mr-2">🌍 Languages:</span>
              <Link href="/" className="hover:text-white">English</Link>
              <span className="mx-2 text-gray-600">·</span>
              <Link href="/ar" className="hover:text-white" lang="ar">العربية</Link>
              <span className="mx-2 text-gray-600">·</span>
              <Link href="/es" className="hover:text-white" lang="es">Español</Link>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-white mb-4">Categories</h3>
            <ul className="space-y-2 text-sm">
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <Link href={`/category/${cat.slug}`} className="hover:text-white transition-colors">
                    {cat.icon} {cat.name}
                    <span className="text-gray-600 ml-1">({getToolsByCategory(cat.slug).length})</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Tools */}
          <div>
            <h3 className="font-semibold text-white mb-4">Popular Tools</h3>
            <ul className="space-y-2 text-sm">
              {popular.map((tool) => tool && (
                <li key={tool.slug}>
                  <Link href={`/tools/${tool.slug}`} className="hover:text-white transition-colors">
                    {tool.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-white mb-4">cleverly.tools</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Blog &amp; Guides</Link></li>
              <li><Link href="/search" className="hover:text-white transition-colors">Search all tools</Link></li>
              <li><Link href="/embed" className="hover:text-white transition-colors">Embed a tool (free)</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact / Request a tool</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Use</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-gray-500">
          <p>© {year} cleverly.tools — All rights reserved.</p>
          <p>Not affiliated with Facebook, TikTok, Instagram, YouTube or X. Download only content you have the rights to.</p>
        </div>
      </div>
    </footer>
  );
}
