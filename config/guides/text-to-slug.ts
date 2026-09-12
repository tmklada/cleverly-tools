import type { ToolGuide } from "@/types/guide";

const guide: ToolGuide = {
  slug: "text-to-slug",
  intro: [
    "A slug is the part of a URL that identifies a specific page, and this tool converts any title, heading, or phrase into a clean, URL-friendly slug instantly as you type. Paste in a blog post title or product name, and the tool lowercases it, strips out accents and special characters, and replaces spaces with hyphens, so you get something like my-blog-post-title ready to drop straight into a CMS or router.",
    "It's built for developers, bloggers, and content editors who need a consistent slug format without doing the character replacement by hand every time. The conversion happens entirely in your browser as you type, with a one-click copy button once a valid slug is produced.",
    "This guide covers what makes a good slug for SEO, how to handle accented and non-Latin text, and the difference between hyphens and underscores in URLs.",
  ],
  sections: [
    {
      heading: "What Makes a Good URL Slug for SEO (Length, Stop Words, Hyphens vs Underscores)",
      paragraphs: [
        "A good slug is short, descriptive, and readable at a glance — search engines and users both benefit from a URL that hints at the page's content without needing to click through. As a rough guideline, keeping a slug under about 60 characters helps it display cleanly in search results and avoids URLs so long they become hard to share or remember.",
        "Removing common stop words like \"a,\" \"the,\" and \"of\" from a slug is a common practice for shortening it further, though this tool doesn't strip stop words automatically — it converts exactly what you give it, so if you want a shorter slug, trim the filler words from your input text before converting. Hyphens are the standard word separator in URLs, and this tool always uses hyphens rather than underscores, which matters because major search engines treat a hyphen as a word boundary but generally don't treat an underscore the same way, meaning \"blog-post-title\" is read as three words while \"blog_post_title\" risks being read as one long string.",
        "Consistency across a site also matters: mixing hyphen-based and underscore-based slugs, or changing a URL's slug after it's already indexed, can create broken links and lost search rankings if old URLs aren't redirected to the new ones.",
      ],
      bullets: [
        "Keep slugs under roughly 60 characters when possible",
        "Use hyphens, not underscores or spaces, between words",
        "Always lowercase — mixed case can cause duplicate-URL issues on case-sensitive servers",
        "Avoid changing a slug after a page is published and indexed",
      ],
    },
    {
      heading: "How to Handle Accents and Non-Latin Characters in Slugs",
      paragraphs: [
        "URLs are technically limited to a specific set of ASCII characters, so any title containing accented letters, symbols, or non-Latin scripts needs to be converted before it can safely become part of a URL. This tool normalizes accented Latin characters — turning café into cafe and naïve into naive — by stripping the diacritical marks while keeping the base letter, which is the standard approach for keeping a readable, ASCII-only slug from Western European text.",
        "For text in non-Latin scripts, such as Arabic, Hebrew, Chinese, or Cyrillic, the underlying letters have no direct ASCII equivalent, so this tool's character-removal step will strip out characters that don't match its lowercase-letter, digit, and hyphen pattern, which can leave a much shorter slug than expected or an empty result. In that case, either write a short manual English or transliterated title for the slug specifically, or rely on your CMS's own Unicode-slug support if it offers one, since some platforms do support percent-encoded Unicode slugs rather than converting everything to ASCII.",
      ],
    },
    {
      heading: "Slugs for Blog Posts vs Product Pages vs Documentation",
      paragraphs: [
        "A blog post slug usually mirrors a shortened version of the headline, since the goal is both readability and matching likely search terms — a slug like best-budget-laptops-2026 reads clearly and signals the page's topic. A product page slug is often shorter and more literal, frequently just the product name or a name-plus-model-number combination, since shoppers are usually searching for an exact product rather than a descriptive phrase.",
        "Documentation slugs tend to follow a hierarchical, keyword-focused pattern, like getting-started or api-authentication, optimized for someone scanning a sidebar or searching within the docs rather than arriving from a general web search. Whichever style fits your site, the same base rule applies: convert the meaningful words of the title, drop filler words if you want it shorter, and keep it consistent with the rest of your URL structure.",
      ],
    },
    {
      heading: "Using This Tool in Your Workflow",
      paragraphs: [
        "Type or paste your title into the input field, and the slug field below updates in real time — there's no button to click to trigger the conversion. Once a slug appears, click Copy to grab it and paste it directly into your CMS's URL or permalink field, your router configuration, or a file name.",
        "If your input text contains only special characters, emoji, or characters the tool can't convert to ASCII, no valid slug can be produced and a warning appears asking you to try different text. In that case, write a short plain-English or plain-ASCII description of the page instead of relying on the original title.",
      ],
    },
    {
      heading: "Slug Mistakes That Hurt SEO and Break Links",
      paragraphs: [
        "The most damaging slug mistake is changing an existing page's slug after it's indexed by search engines and linked to elsewhere, since every old link and every ranking signal tied to that URL becomes disconnected unless you set up a redirect. If a slug genuinely needs to change, plan a 301 redirect from the old URL to the new one rather than letting the old links break.",
        "A second common mistake is generating an overly generic slug, like page-1 or untitled-post, that gives search engines and readers no information about the content — always base the slug on a real, descriptive title even if you plan to refine the page's headline later. Finally, watch out for accidental duplicate slugs across a site; two different pages with the same slug will conflict in most content management systems, so check uniqueness before publishing.",
      ],
    },
  ],
  useCases: [
    { title: "Publishing a blog post", description: "Convert the post's headline into a clean permalink slug before publishing in a CMS." },
    { title: "Naming files consistently", description: "Turn a document or image title into a hyphenated, lowercase file name with no special characters." },
    { title: "Building dynamic routes", description: "Generate URL-safe route segments for a web app from user-entered titles or product names." },
    { title: "Cleaning up imported content", description: "Fix messy or inconsistent slugs when migrating content from another platform." },
    { title: "Creating product page URLs", description: "Convert a product name into a short, readable slug for an e-commerce page." },
  ],
  mistakes: [
    { title: "Changing a slug after publishing", description: "Editing a live page's slug breaks existing links and search rankings unless a redirect is set up." },
    { title: "Using underscores instead of hyphens", description: "Search engines generally treat hyphens as word separators but may not split words on underscores." },
    { title: "Relying on it for non-Latin scripts", description: "Text in scripts like Arabic, Hebrew, or Chinese has no ASCII equivalent and may be stripped out entirely." },
    { title: "Leaving slugs too long", description: "A very long slug is harder to read, share, and display fully in search results." },
    { title: "Publishing duplicate slugs", description: "Two pages sharing the same slug will conflict in most content management systems." },
  ],
  tips: [
    "Base every slug on a real, descriptive title rather than a placeholder like post-1.",
    "Remove filler words like \"the\" or \"a\" from your input text first if you want a shorter slug.",
    "Never change a published page's slug without setting up a redirect from the old URL.",
    "Keep slugs under roughly 60 characters so they display cleanly in search results.",
    "For non-Latin text, write a short plain-English title for the slug specifically rather than relying on automatic conversion.",
    "Check for duplicate slugs across your site before publishing a new page.",
  ],
  glossary: [
    { title: "Slug", description: "The part of a URL that identifies a specific page, typically lowercase words separated by hyphens." },
    { title: "Permalink", description: "The full, permanent URL of a page, which usually includes the slug as its final segment." },
    { title: "Diacritic", description: "An accent mark added to a letter, such as the acute accent in café, that this tool strips during conversion." },
    { title: "301 redirect", description: "A permanent server-side redirect from an old URL to a new one, used when a slug changes after publishing." },
    { title: "ASCII", description: "A standard character set of unaccented Latin letters, digits, and basic symbols that URLs are traditionally built from." },
  ],
};

export default guide;
