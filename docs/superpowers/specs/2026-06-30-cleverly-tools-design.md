# cleverly.tools — Architecture Design
**Date:** 2026-06-30

## Overview
A single-domain online tools platform built for global English-speaking audience. Hundreds of tools under one domain, each with its own SEO-optimized route. Modular, scalable to 500+ tools.

## Domain
`cleverly.tools`

## Tech Stack
- **Framework:** Next.js 15 (App Router) — SSR + SSG + file-based routing
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4 + dark/light mode
- **Database:** JSON/TS config files for tools, Supabase for blog/admin
- **Hosting:** Vercel (CDN, auto-deploy, zero cost to start)
- **Download API:** RapidAPI Social Media Downloader (maintained externally)

## Architecture Decisions
1. **One platform, one codebase** — all tools are routes under cleverly.tools
2. **URL extractor only** — we never store content, users download from source CDN
3. **Config-driven tools** — adding a new tool = one TS config file, no new code
4. **Centralized components** — Header, Footer, SEO, Ads changed once, updates everywhere

## Folder Structure
```
cleverly-tools/
├── app/
│   ├── page.tsx                        ← Homepage
│   ├── layout.tsx                      ← Root layout (Header, Footer)
│   ├── tools/[slug]/
│   │   ├── page.tsx                    ← Dynamic tool page
│   │   └── loading.tsx
│   ├── category/[category]/page.tsx
│   ├── blog/[slug]/page.tsx
│   ├── admin/page.tsx
│   └── api/
│       └── download/route.ts           ← API route for URL extraction
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Sidebar.tsx
│   ├── tools/
│   │   ├── ToolCard.tsx
│   │   ├── ToolGrid.tsx
│   │   ├── RelatedTools.tsx
│   │   └── SearchBar.tsx
│   ├── ads/
│   │   └── AdUnit.tsx                  ← Single ad component, centrally controlled
│   └── seo/
│       ├── ToolSchema.tsx
│       └── Breadcrumb.tsx
├── config/
│   └── tools/
│       ├── facebook-video-downloader.ts
│       ├── tiktok-video-downloader.ts
│       ├── instagram-video-downloader.ts
│       └── index.ts                    ← Tool registry
├── lib/
│   ├── downloaders/
│   │   ├── facebook.ts
│   │   ├── tiktok.ts
│   │   └── instagram.ts
│   └── seo.ts
└── data/
    └── categories.ts
```

## Tool Config Schema
Each tool is defined by one TypeScript config file:
```ts
{
  slug: string
  title: string
  description: string
  category: string
  keywords: string[]
  faq: { question: string; answer: string }[]
  relatedTools: string[]
  howItWorks: string[]
  schema: "SoftwareApplication" | "WebApplication"
  adsPositions: ("top" | "after-tool" | "sidebar" | "in-article" | "footer")[]
}
```

## Download Flow (Safe/Legal)
```
User pastes URL → Our API Route → RapidAPI extracts CDN URL → 
We return direct URL → User downloads from source platform's CDN
We never store content. We are URL extractors only.
```

## SEO System (Auto per tool)
- Unique title + description from config
- Canonical URL
- Open Graph + Twitter Cards
- FAQ Schema (JSON-LD)
- Breadcrumb Schema
- Software Application Schema
- Auto XML Sitemap (dynamic)
- robots.txt (configured from day 1)

## Ads System
Single `AdUnit` component with `position` prop:
```tsx
<AdUnit position="top" />
<AdUnit position="after-tool" />
<AdUnit position="sidebar" />
```
Enable/disable/swap ad network from one place. No touching individual pages.

## Analytics
- Google Analytics 4
- Google Tag Manager
- Microsoft Clarity
- Google Search Console verification tag

## Build Phases
1. **Core Platform** — Next.js setup, layout, homepage, tool engine, SEO
2. **Facebook Video Downloader** — first tool + RapidAPI integration
3. **TikTok + Instagram Downloaders** — reuse tool engine
4. **Blog System** — supporting articles per tool
5. **Admin Area** — add/edit tools and articles
6. **Analytics + GSC** — Google integration
7. **Ads** — ad network integration

## Success Criteria
- Tool page loads under 2s (Core Web Vitals green)
- Each tool page fully SEO-optimized on launch
- Adding new tool requires zero code changes (config only)
- Platform handles 500+ tools without refactoring
