export interface GuideSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface GuideItem {
  title: string;
  description: string;
}

export interface ToolGuide {
  slug: string;
  intro: string[];
  sections: GuideSection[];
  useCases: GuideItem[];
  mistakes: GuideItem[];
  tips: string[];
  glossary?: GuideItem[];
}
