"use client";

import Link from "next/link";
import { useState } from "react";
import SearchBar from "@/components/tools/SearchBar";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-gray-900 dark:text-white">
            <span className="text-2xl">⚡</span>
            <span>cleverly<span className="text-blue-600">.tools</span></span>
          </Link>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <SearchBar />
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="/category/social-media" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors">
              Social Media
            </Link>
            <Link href="/category/pdf" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors">
              PDF
            </Link>
            <Link href="/blog" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors">
              Blog
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-3">
          <SearchBar />
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 py-3 space-y-2">
          <Link href="/category/social-media" className="block py-2 text-gray-600 dark:text-gray-300" onClick={() => setMobileMenuOpen(false)}>
            📱 Social Media
          </Link>
          <Link href="/category/pdf" className="block py-2 text-gray-600 dark:text-gray-300" onClick={() => setMobileMenuOpen(false)}>
            📄 PDF Tools
          </Link>
          <Link href="/blog" className="block py-2 text-gray-600 dark:text-gray-300" onClick={() => setMobileMenuOpen(false)}>
            ✍️ Blog
          </Link>
        </div>
      )}
    </header>
  );
}
