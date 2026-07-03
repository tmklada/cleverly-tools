import type { ToolConfig } from "@/types/tool";
import { SITE_URL, SITE_NAME } from "@/lib/site";

interface ToolSchemaProps {
  tool: ToolConfig;
  url: string;
}

export default function ToolSchema({ tool, url }: ToolSchemaProps) {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: tool.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": tool.schema,
    name: tool.title,
    description: tool.description,
    url,
    applicationCategory: "WebApplication",
    operatingSystem: "All",
    isAccessibleForFree: true,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    featureList: tool.howItWorks.map(s => s.title),
    keywords: tool.keywords.join(", "),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: tool.category.replace(/-/g, " "),
        item: `${SITE_URL}/category/${tool.category}`,
      },
      { "@type": "ListItem", position: 3, name: tool.title, item: url },
    ],
  };

  // HowTo schema for tools with steps
  const howToSchema = tool.howItWorks.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `How to use ${tool.title}`,
    description: tool.description,
    totalTime: "PT1M",
    tool: [{ "@type": "HowToTool", name: tool.title }],
    step: tool.howItWorks.map((s) => ({
      "@type": "HowToStep",
      position: s.step,
      name: s.title,
      text: s.description,
    })),
  } : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {howToSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      )}
    </>
  );
}
