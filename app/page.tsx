import HomeClient from "@/components/home/HomeClient";
import { getAllPosts } from "@/lib/blog";
import { allTools } from "@/config/tools";
import { SITE_URL, SITE_NAME } from "@/lib/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: SITE_URL,
    languages: { en: SITE_URL, ar: `${SITE_URL}/ar`, es: `${SITE_URL}/es`, "x-default": SITE_URL },
  },
};

export default function HomePage() {
  const articleCount = getAllPosts().length;

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: `${allTools.length} free online tools — video downloaders, PDF tools, image editors, calculators and developer utilities. No registration required.`,
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: `${SITE_URL}/search?q={search_term_string}` },
      "query-input": "required name=search_term_string",
    },
  };

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/icon-512.png`,
    contactPoint: { "@type": "ContactPoint", email: "tawfik164@gmail.com", contactType: "customer support" },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
      <HomeClient articleCount={articleCount} />
    </>
  );
}
