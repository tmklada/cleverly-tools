import { notFound, permanentRedirect } from "next/navigation";
import { getToolBySlug } from "@/config/tools";

interface Props {
  params: Promise<{ slug: string }>;
}

// Old external links pointed at /<tool-slug>; send them to the real tool page.
export default async function LegacyToolRedirect({ params }: Props) {
  const { slug } = await params;
  if (getToolBySlug(slug)) permanentRedirect(`/tools/${slug}`);
  notFound();
}
