export type AdPosition = "top" | "after-tool" | "sidebar" | "in-article" | "footer";

export type ToolType = "downloader" | "calculator" | "text" | "developer" | "converter" | "pdf" | "image" | "utility" | "seo" | "health" | "finance" | "qr";

export type ToolSchema = "SoftwareApplication" | "WebApplication";

export interface FAQ {
  question: string;
  answer: string;
}

export interface HowItWorksStep {
  step: number;
  title: string;
  description: string;
}

export interface ToolConfig {
  slug: string;
  /** On-page H1. Keep it natural — it is not the search-result title. */
  title: string;
  /**
   * The <title> Google shows in search results, written to earn the click.
   * Used verbatim (no site-name suffix). Falls back to `title` when absent.
   */
  seoTitle?: string;
  /** On-page intro paragraph under the H1. */
  description: string;
  /** The search-result snippet. Falls back to `description` when absent. */
  metaDescription?: string;
  shortDescription: string;
  category: string;
  keywords: string[];
  icon: string;
  faq: FAQ[];
  howItWorks: HowItWorksStep[];
  relatedTools: string[];
  schema: ToolSchema;
  adsPositions: AdPosition[];
  toolType?: ToolType;
  featured?: boolean;
  trending?: boolean;
  isNew?: boolean;
}

export interface Category {
  slug: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}
