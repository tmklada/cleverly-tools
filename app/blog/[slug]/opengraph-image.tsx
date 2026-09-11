import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { SITE_NAME } from "@/lib/site";
import { OG_SIZE, renderBlogCard } from "@/lib/og-cards";

export const alt = `${SITE_NAME} Blog`;
export const size = OG_SIZE;
export const contentType = "image/png";

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  return renderBlogCard({
    title: post?.title ?? `${SITE_NAME} Blog`,
    readingTime: post?.readingTime,
    date: post?.date,
    category: post?.category,
  });
}
