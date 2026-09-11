import { getToolBySlug } from "@/config/tools";
import { getAllVariants, getVariant } from "@/config/variants";
import { SITE_NAME } from "@/lib/site";
import { OG_SIZE, renderToolCard } from "@/lib/og-cards";

export const alt = `Free online tool on ${SITE_NAME}`;
export const size = OG_SIZE;
export const contentType = "image/png";

export async function generateStaticParams() {
  return getAllVariants().map(({ toolSlug, variantSlug }) => ({ slug: toolSlug, variant: variantSlug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string; variant: string }> }) {
  const { slug, variant: variantSlug } = await params;
  const tool = getToolBySlug(slug);
  const variant = getVariant(slug, variantSlug);

  // Variant titles are SEO-length ("... — Free, No App"); the h1 is the cleaner headline.
  return renderToolCard({
    icon: tool?.icon ?? "⚡",
    title: variant?.h1 ?? tool?.title ?? SITE_NAME,
    description: variant?.description ?? tool?.shortDescription ?? "Free online tools — no sign up required.",
  });
}
