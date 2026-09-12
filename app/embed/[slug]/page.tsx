import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getToolBySlug, allTools } from "@/config/tools";
import ToolWidget from "@/components/tools/ToolWidget";
import EmbedAutoHeight from "@/components/tools/EmbedAutoHeight";
import { SITE_URL, SITE_NAME } from "@/lib/site";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return allTools.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) return {};
  return {
    title: `${tool.title} — embeddable widget`,
    // The full tool page is the canonical version; this frame must not compete with it.
    robots: { index: false, follow: true },
    alternates: { canonical: `${SITE_URL}/tools/${tool.slug}` },
  };
}

export default async function EmbedPage({ params }: Props) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) notFound();

  const toolUrl = `${SITE_URL}/tools/${tool.slug}`;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 flex flex-col">
      <EmbedAutoHeight />

      <div className="flex items-center gap-2 px-4 pt-4 pb-3">
        <span className="text-xl leading-none">{tool.icon}</span>
        <h1 className="text-base font-bold text-gray-900 dark:text-white">{tool.title}</h1>
      </div>

      <div id="tool-widget" className="flex-1 px-4 pb-4">
        <ToolWidget tool={tool} />
      </div>

      <a
        href={toolUrl}
        target="_blank"
        rel="noopener"
        className="flex items-center justify-center gap-1.5 px-4 py-2.5 border-t border-gray-200 dark:border-gray-800 text-xs text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
      >
        <span aria-hidden>⚡</span>
        <span>
          {tool.title} by <strong className="font-semibold">{SITE_NAME}</strong>
        </span>
      </a>
    </div>
  );
}
