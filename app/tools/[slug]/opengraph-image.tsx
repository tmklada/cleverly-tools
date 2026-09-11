import { allTools, getToolBySlug } from "@/config/tools";
import { SITE_NAME } from "@/lib/site";
import { OG_SIZE, renderToolCard } from "@/lib/og-cards";

export const alt = `Free online tool on ${SITE_NAME}`;
export const size = OG_SIZE;
export const contentType = "image/png";

export async function generateStaticParams() {
  return allTools.map((tool) => ({ slug: tool.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  return renderToolCard({
    icon: tool?.icon ?? "⚡",
    title: tool?.title ?? SITE_NAME,
    description: tool?.shortDescription ?? "Free online tools — no sign up required.",
  });
}
