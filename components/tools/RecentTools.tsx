"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getToolBySlug } from "@/config/tools";
import { getRecentTools, getFavoriteTools, USER_TOOLS_EVENT } from "@/lib/user-tools";
import type { ToolConfig } from "@/types/tool";

function resolve(slugs: string[]): ToolConfig[] {
  return slugs.map((s) => getToolBySlug(s)).filter((t): t is ToolConfig => Boolean(t));
}

function Row({ title, tools, hint }: { title: string; tools: ToolConfig[]; hint?: string }) {
  if (tools.length === 0) return null;
  return (
    <div>
      <div className="flex items-baseline justify-between mb-3">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">{title}</h2>
        {hint && <span className="text-xs text-gray-400">{hint}</span>}
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 [scrollbar-width:thin]">
        {tools.map((tool) => (
          <Link
            key={tool.slug}
            href={`/tools/${tool.slug}`}
            className="flex-shrink-0 flex items-center gap-2 pl-3 pr-4 py-2 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-blue-400 hover:shadow-sm text-sm font-medium text-gray-800 dark:text-gray-200 transition-all"
          >
            <span className="text-lg">{tool.icon}</span>
            <span className="whitespace-nowrap">{tool.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function RecentTools() {
  const [recent, setRecent] = useState<ToolConfig[]>([]);
  const [favorites, setFavorites] = useState<ToolConfig[]>([]);

  useEffect(() => {
    const load = () => {
      setFavorites(resolve(getFavoriteTools()));
      setRecent(resolve(getRecentTools()));
    };
    load();
    window.addEventListener(USER_TOOLS_EVENT, load);
    window.addEventListener("storage", load);
    return () => {
      window.removeEventListener(USER_TOOLS_EVENT, load);
      window.removeEventListener("storage", load);
    };
  }, []);

  if (recent.length === 0 && favorites.length === 0) return null;

  return (
    <section className="space-y-6 bg-blue-50/60 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/40 rounded-2xl p-5 md:p-6">
      <Row title="★ Your saved tools" tools={favorites} hint="Saved on this device" />
      <Row title="🕒 Recently used" tools={recent} />
    </section>
  );
}
