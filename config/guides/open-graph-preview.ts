import type { ToolGuide } from "@/types/guide";

const guide: ToolGuide = {
  slug: "open-graph-preview",
  intro: [
    "The title and description you write for a page and the card that actually shows up when someone pastes your link into Facebook, LinkedIn, Twitter, or a WhatsApp chat are controlled by an entirely separate set of tags called Open Graph, and it's easy to publish a page without ever checking what its share card looks like until a customer sends you a screenshot of a broken preview. This tool lets you type in your Open Graph values and immediately see how the resulting card would render across the major platforms, before you've deployed anything.",
    "You enter the title, description, image URL, site name, and page URL by hand, and the tool renders four cards — a Facebook/LinkedIn-style card, a Twitter Card, a WhatsApp chat preview, and a Google search-result snippet — along with the exact meta tag HTML you'd paste into your page's head. A live length check sits above them, showing your title and description character counts against each platform's truncation point and flagging the ones that will be cut. Because everything is generated from what you type rather than fetched from a live page, you can experiment freely with different title lengths or image URLs before touching your actual site.",
    "This is a preview and tag-generation tool, not a live crawler — it doesn't reach out to your website to pull its current tags for you. For that, you'll want your browser's view-source or an extension, described below, then bring those values in here to check how they'll actually render.",
  ],
  sections: [
    {
      heading: "Open Graph Tags Explained: og:title, og:description, og:image, og:type",
      paragraphs: [
        "Open Graph is a set of meta tags, originally introduced by Facebook, that platforms read to build a link preview card instead of trying to guess from your page's visible content. og:title and og:description set the headline and summary text shown on the card, og:image sets the preview picture, and og:type describes what kind of content the page is — website is the default and works for the vast majority of pages, with article, video, and a handful of others available for more specific content.",
        "og:url and og:site_name round out the core set: og:url gives the canonical link to attribute the share to, and og:site_name shows your site's name in smaller text alongside the title on some platforms. Twitter reads its own parallel twitter:title, twitter:description, and twitter:image tags, which is why the generated code block below includes both sets.",
      ],
    },
    {
      heading: "Recommended OG Image Size (1200x630) and Why Your Preview Looks Wrong",
      paragraphs: [
        "The widely recommended Open Graph image size is 1200×630 pixels, which lands close to a 1.91:1 aspect ratio — the shape most platforms crop link-preview images to. Going much smaller than the platform's minimum (generally cited around 200×200) risks the image being rejected or ignored entirely, and a very different aspect ratio gets cropped in ways that can cut off a logo or a face awkwardly.",
        "If the image box in this tool's preview shows a plain gray placeholder instead of your picture, there are two likely causes: no image URL was entered, or the URL was entered but failed to load (a broken link, a private/localhost URL, or a server blocking hotlinking) — the tool simply hides a failed image rather than showing a broken-image icon, so it's worth opening the image URL directly in a new tab to confirm it actually loads before assuming the tool is at fault.",
      ],
    },
    {
      heading: "How to Force Facebook or LinkedIn to Refresh a Cached Preview",
      paragraphs: [
        "Social platforms cache the Open Graph data they scrape from your page the first time a link is shared, which means updating your title, description, or image afterward often doesn't change what people see when they paste your link — they're still looking at the old cached card. Each major platform has its own tool to force a re-scrape: Facebook's Sharing Debugger, LinkedIn's Post Inspector, and historically Twitter's Card Validator.",
        "The general workflow is the same everywhere: paste your URL into the platform's debugger tool, let it re-fetch and display your current tags, and confirm the new title, description, and image show up correctly there before assuming your live page is broken. This preview tool helps you get the tag values right before you publish; the platform debuggers are what you use afterward to make sure the live page matches.",
      ],
    },
    {
      heading: "Why This Tool Can't Auto-Fetch Tags From Your Live URL",
      paragraphs: [
        "Browsers enforce a security rule called CORS (Cross-Origin Resource Sharing) that blocks a webpage's JavaScript from reading the raw HTML of a different website unless that website explicitly opts in with the right response headers — and almost no site does this for arbitrary pages. That's why entering just a URL here doesn't pull in your title, description, or image automatically; there's no reliable, permission-based way for client-side JavaScript running in your browser to scrape another domain's page.",
        "Server-side tools, including the platform debuggers mentioned above, don't have this restriction because the request happens from their server, not your browser — which is why Facebook's and LinkedIn's debuggers can fetch live tags while an in-browser tool like this one cannot. The workaround is quick: view your page's source, or use a browser extension that reads meta tags, to find your current og: values, then paste those into the fields here.",
      ],
    },
    {
      heading: "Reading the Four Previews: Facebook/LinkedIn, Twitter Card, WhatsApp, and Google",
      paragraphs: [
        "The Facebook/LinkedIn preview renders the large-image card style both platforms use by default, pairing your og:image with the domain, title, and description underneath. The Twitter Card preview reflects the summary_large_image card type (the layout generated in the meta tags below), which most link previews on that platform use today.",
        "The WhatsApp preview is deliberately shaped differently, because WhatsApp's card is: instead of a full-width banner it uses a small square thumbnail on the left with the bold title, description, and domain stacked beside it, all inside a chat bubble. That compact crop is the single biggest reason a card that looks great on Facebook can look wrong in a chat — a wide 1200×630 image gets squeezed into a square, so anything important near the left or right edge disappears. Keep the logo or focal point near the centre and it survives both crops.",
        "The Google Search preview is a separate case worth noting: search result snippets are influenced by your page's actual <title> tag and meta description, plus what Google decides to show based on the query — not by Open Graph tags at all. It's included here as a convenient side-by-side reference since search and social snippets often get written together, but changing your og:title won't change what Google shows in search results.",
      ],
    },
    {
      heading: "Writing OG Titles and Descriptions That Don't Get Cut Off",
      paragraphs: [
        "Every platform truncates at a different point, so the tool checks your text against all five at once and tells you which ones will cut it. The practical limits it uses are Facebook 88 characters of title and 200 of description, LinkedIn 119 and 160, X (Twitter) 70 and 200, WhatsApp 65 and 160, and Google 60 and 155. WhatsApp and Google are the tightest, which means a title written to fit Facebook comfortably can still be cut in half in a chat message.",
        "Front-load the important information — your core message or keyword — in the first several words of both fields, so even a truncated version on a narrow mobile screen still makes sense on its own. The counters turn amber the moment you cross a platform's limit, and each preview card carries its own badge, so you can either aim for the tightest limit and fit everywhere, or knowingly accept a cut on one platform while the rest stay intact. Text past the limit still lives in the tag; it just doesn't get shown.",
      ],
    },
  ],
  useCases: [
    { title: "Checking a new page before publishing", description: "Preview a blog post or landing page's share card before it goes live, catching a missing image or an overlong title early." },
    { title: "Debugging a broken link preview", description: "Reproduce your current og:title, og:description, and og:image values here to see exactly how they're rendering across platforms." },
    { title: "Writing OG tags from scratch", description: "Draft title, description, and image values for a new page and copy the generated meta tag HTML straight into your site." },
    { title: "Auditing a client site's social sharing setup", description: "Enter a client's existing tag values to demonstrate how their current link previews look before proposing changes." },
    { title: "Comparing description lengths across platforms", description: "See the same description rendered in Facebook, Twitter, WhatsApp, and Google-style cards side by side, with a length check showing exactly which platforms will truncate it." },
    { title: "Checking how a link looks shared in a chat", description: "Preview the WhatsApp card's square thumbnail crop before sending a link to a customer or a group." },
  ],
  mistakes: [
    { title: "Expecting the tool to fetch tags from a pasted URL", description: "This is a manual-entry preview, not a live scraper — CORS restrictions prevent browser-based tools from reading another site's HTML, so you have to type in the values yourself." },
    { title: "Using an image smaller than roughly 200x200", description: "Images below most platforms' minimum size threshold are often rejected or ignored, leaving the card with no image at all." },
    { title: "Forgetting to re-scrape after changing og:image", description: "Platforms cache Open Graph data, so an image swap on your live page won't show up in shares until you force a refresh through that platform's debugger tool." },
    { title: "Writing a description well past 160 characters", description: "WhatsApp, LinkedIn, and Google all cut around 155-160 characters; watch the length check rather than assuming Facebook's roomier 200 applies everywhere." },
    { title: "Designing the image only for the wide Facebook crop", description: "WhatsApp squeezes the same picture into a small square, so keep the logo or focal point near the centre instead of the edges." },
    { title: "Using a relative image path instead of an absolute URL", description: "og:image needs a full https:// URL — a relative path like /images/cover.jpg won't resolve correctly when a platform's server fetches it." },
  ],
  tips: [
    "View your page's source or use a meta-tag browser extension to find your current OG values before pasting them in here.",
    "Keep titles under about 60 characters and descriptions under about 155 to fit every platform in the length check without a warning.",
    "Watch for the amber badges on each preview card — they tell you which platform is about to cut your text.",
    "Always use a full, absolute image URL starting with https:// rather than a relative path.",
    "Re-scrape with Facebook's Sharing Debugger or LinkedIn's Post Inspector after every og:image or og:title change on your live site.",
    "Check the image URL by opening it directly in a new browser tab if the preview shows a gray placeholder instead of your picture.",
    "Remember the Google Search preview reflects your title tag and meta description, not your Open Graph tags.",
  ],
  glossary: [
    { title: "Open Graph protocol", description: "A set of meta tags, prefixed og:, that social platforms read to build a link preview card for a shared page." },
    { title: "og:image", description: "The Open Graph tag specifying the picture shown in a link's preview card, recommended at roughly 1200x630 pixels." },
    { title: "CORS", description: "Cross-Origin Resource Sharing, a browser security rule that blocks a page's JavaScript from reading another site's raw content unless that site explicitly allows it." },
    { title: "Twitter Card", description: "Twitter's own version of Open Graph-style tags (prefixed twitter:) used to render link previews on that platform." },
    { title: "Meta tag", description: "An HTML tag placed in a page's head section that provides metadata about the page rather than visible content." },
    { title: "Scraper cache", description: "The stored copy of a page's Open Graph data that a platform keeps after its first fetch, which can show stale info until forcibly refreshed." },
  ],
};

export default guide;
