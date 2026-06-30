export type AdPosition = "top" | "after-tool" | "sidebar" | "in-article" | "footer";

export type ToolType = "downloader" | "calculator" | "text" | "developer" | "converter" | "pdf" | "image";

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
  title: string;
  description: string;
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
