import type { ToolGuide } from "@/types/guide";

const guide: ToolGuide = {
  slug: "robots-txt-generator",
  intro: [
    "A robots.txt file is a plain text file placed at the root of a website — at yourdomain.com/robots.txt — that tells search engine crawlers and other automated bots which parts of the site they're allowed to request. It's read before a bot crawls anything else, so a single misplaced line can either leave sensitive areas exposed to crawling or accidentally block search engines from your entire site.",
    "This tool generates a valid robots.txt file through three modes: Allow All (a simple file permitting every crawler everywhere), Block All (disallowing every crawler from every page), and Custom Rules, where you build one or more rules by specifying a user-agent along with allow and disallow paths. Quick-start templates for WordPress, Next.js, and Shopify fill in a sensible starting point for those platforms, which you can then edit directly.",
    "Once your rules are set, the tool shows a live preview of the exact file content, with buttons to copy it to your clipboard or download it directly as robots.txt, ready to upload to your site's root directory.",
  ],
  sections: [
    {
      heading: "Robots.txt Syntax: User-agent, Disallow, Allow, and Sitemap",
      paragraphs: [
        "Every robots.txt file is built from a small set of directives. User-agent names which crawler a rule applies to — an asterisk means the rule applies to all bots, while a specific name like Googlebot targets only that one. Disallow tells that user-agent not to crawl a given path, and Allow explicitly permits a path, which matters most when it carves out an exception inside a broader Disallow rule.",
        "Sitemap is different from the other three: rather than controlling access, it simply points crawlers to your sitemap file's full URL so they can discover your pages more efficiently. This tool includes a dedicated Sitemap field in Allow All and Block All modes, and a per-rule Sitemap field in Custom Rules mode, and it always writes the URL out in full rather than as a relative path, since that's what the directive requires.",
        "One directive this tool doesn't generate a dedicated field for is Crawl-delay, which some crawlers use to space out how frequently they request pages. If you need it, add a line reading Crawl-delay: followed by a number of seconds directly into the Custom Rules text after generating your other rules, positioned under the relevant User-agent line.",
      ],
      bullets: [
        "User-agent: * — applies the rule to every crawler",
        "Disallow: /admin/ — blocks crawling of that specific path and everything under it",
        "Allow: /public/ — explicitly permits a path, often as an exception inside a Disallow block",
        "Sitemap: https://example.com/sitemap.xml — points crawlers to your sitemap file",
      ],
    },
    {
      heading: "Robots.txt Mistakes That Block Google From Your Whole Site",
      paragraphs: [
        "The single most damaging robots.txt mistake is a line reading Disallow: / under User-agent: *, since that one slash means \"everything,\" blocking every page on the entire site from every crawler that respects the file. This tool's Block All mode generates exactly that line on purpose, which is useful for a staging environment or a site not yet ready for search engines, but it should never be left in place on a live production site.",
        "A second common mistake is disallowing a path that unintentionally covers pages you actually want indexed — for example, disallowing /blog when you meant to disallow only /blog/drafts. Because Disallow rules match anything starting with that path, it's worth double-checking each rule against your actual site structure before uploading, especially when editing a template rather than writing rules from scratch.",
      ],
    },
    {
      heading: "How to Block AI Crawlers (GPTBot, CCBot) in Robots.txt",
      paragraphs: [
        "Beyond search engines, a growing number of bots crawl the web specifically to gather training data for AI systems — GPTBot (OpenAI) and CCBot (Common Crawl, used by several AI companies) are two of the most common. If you'd rather these bots not access your site's content, you can block them using the same Disallow mechanism as any other crawler, just targeted at their specific user-agent name instead of the wildcard asterisk.",
        "In this tool's Custom Rules mode, add a separate rule with the user-agent set to GPTBot and Disallow set to /, then repeat with a new rule for CCBot and any other bot name you want to block; each bot needs its own User-agent line since a single rule can't target multiple named bots at once. Note that robots.txt is a voluntary standard — well-behaved crawlers respect it, but it can't technically force a bot to comply if it chooses to ignore the file.",
      ],
      bullets: [
        "GPTBot — used by OpenAI for crawling content",
        "CCBot — used by Common Crawl, whose data feeds multiple AI companies",
        "Add one User-agent rule per bot name you want to block; a shared wildcard rule won't target them individually",
      ],
    },
    {
      heading: "Robots.txt vs Noindex: Blocking Crawling Doesn't Mean Blocking Indexing",
      paragraphs: [
        "It's a common misunderstanding that disallowing a page in robots.txt keeps it out of search results entirely — it doesn't. Disallow only tells a crawler not to fetch the page's content; if search engines discover the URL some other way, such as a link from another site, they can still list the bare URL in search results without a title or description pulled from the page.",
        "To reliably keep a specific page out of search results, use a noindex meta tag or HTTP header on that page itself instead of, or in addition to, a robots.txt rule — and note that for noindex to be seen at all, the page generally needs to remain crawlable, since a page blocked from crawling can't have its noindex tag read either. This tool generates only robots.txt content; a noindex tag needs to be added separately in your page's HTML head or server response.",
      ],
    },
    {
      heading: "Using the WordPress, Next.js, and Shopify Templates",
      paragraphs: [
        "Clicking a quick template switches the tool into Custom Rules mode and fills the editable text area with a starting file tailored to that platform's typical folder structure: WordPress disallows /wp-admin/, /wp-includes/, and search result URLs while allowing uploaded media; Next.js disallows /api/ and /_next/ (its internal build assets) while allowing everything else; Shopify disallows cart, checkout, and account paths that shouldn't be crawled or indexed.",
        "These templates use a placeholder sitemap URL of https://example.com/sitemap.xml, which you need to replace with your actual domain and sitemap path before using the file — the tool doesn't automatically detect or substitute your real domain. Since the template loads into an editable text box, you can also add, remove, or adjust any line directly rather than being limited to the platform's default rule set.",
      ],
    },
  ],
  useCases: [
    { title: "Launching a new website", description: "Generate a starting robots.txt using Allow All or a platform template before your site goes live." },
    { title: "Keeping a staging site out of search results", description: "Use Block All mode to disallow every crawler while a site is still in development, then switch it before launch." },
    { title: "Protecting private or admin areas", description: "Use Custom Rules to disallow paths like /admin/, /login, or /wp-admin/ that shouldn't be crawled." },
    { title: "Pointing crawlers to your sitemap", description: "Add your sitemap URL to help search engines discover and prioritize your pages more efficiently." },
    { title: "Opting out of AI training crawlers", description: "Add specific Disallow rules for GPTBot, CCBot, and similar bots if you don't want your content used for AI training." },
  ],
  mistakes: [
    { title: "Leaving Block All active on a live site", description: "A Disallow: / rule under User-agent: * blocks every crawler from your entire site — only use this mode for staging or pre-launch." },
    { title: "Assuming Disallow prevents a page from being indexed", description: "Disallow only blocks crawling; a disallowed URL can still appear in search results if discovered another way. Use a noindex tag for that instead." },
    { title: "Forgetting to replace the placeholder sitemap URL in a template", description: "The WordPress, Next.js, and Shopify templates use example.com by default — swap in your actual domain and sitemap path." },
    { title: "Trying to block multiple AI bots with one rule", description: "Each bot needs its own User-agent line; a single wildcard rule doesn't target named bots like GPTBot or CCBot specifically." },
    { title: "Expecting a dedicated Crawl-delay field", description: "This tool doesn't have one; add a Crawl-delay line manually inside the Custom Rules text area if you need it." },
  ],
  tips: [
    "Start from the platform template closest to your site (WordPress, Next.js, or Shopify) instead of writing rules from scratch.",
    "Always replace the placeholder example.com sitemap URL with your real domain before uploading the file.",
    "Use noindex meta tags, not robots.txt, when the goal is specifically keeping a page out of search results.",
    "Double-check that a Disallow path doesn't accidentally cover pages you actually want crawled.",
    "Add one User-agent rule per bot name if you're blocking multiple AI crawlers like GPTBot and CCBot.",
    "Re-download the file after every edit and re-upload it to your site's root directory to apply the changes.",
  ],
  glossary: [
    { title: "User-agent", description: "The name a robots.txt rule uses to identify which crawler it applies to, or an asterisk to apply to all crawlers." },
    { title: "Disallow", description: "A robots.txt directive that tells a crawler not to request a given path." },
    { title: "Allow", description: "A robots.txt directive that explicitly permits a path, often used as an exception inside a broader Disallow rule." },
    { title: "Crawl budget", description: "The number of pages a search engine is willing to crawl on a site within a given time, which disallowing low-value pages helps preserve for important ones." },
    { title: "Noindex", description: "A separate meta tag or HTTP header, not part of robots.txt, that tells search engines not to include a specific page in search results." },
    { title: "GPTBot / CCBot", description: "Automated crawlers used respectively by OpenAI and Common Crawl to gather web content, commonly for AI training data." },
  ],
};

export default guide;
