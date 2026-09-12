import type { ToolGuide } from "@/types/guide";

const guide: ToolGuide = {
  slug: "meta-tag-generator",
  intro: [
    "A meta tag generator builds the HTML snippets that tell search engines and social media platforms what a page is about, without you needing to remember the exact tag names or attribute order. This tool generates SEO meta tags, Open Graph tags for Facebook and LinkedIn previews, and Twitter Card tags for Twitter/X previews, all from one form, then lets you copy each group separately or all of them together.",
    "Fill in your page title, description, keywords, author, page URL, social sharing image, and Twitter handle, and the tool builds each tag set live as you type, along with a preview of how the title and description will look in a Google search result. Character counters next to the title and description fields turn on a warning color as you approach the length where search engines and social platforms typically start cutting text off.",
    "There's no account needed and nothing is saved; the generated tags are meant to be copied directly into the head section of your page's HTML, either by hand or through whatever templating system your site uses to manage page metadata.",
  ],
  sections: [
    {
      heading: "Meta Title and Description Length in 2026 (Pixel Limits, Not Just Characters)",
      paragraphs: [
        "This tool's counters flag a title around 50-60 characters and a description around 140-160 characters, which are the commonly cited safe zones for how much text Google typically displays before truncating a search result with an ellipsis. The counters turn yellow as a caution and red once you're past the limit, giving a quick visual check while you're still writing.",
        "It's worth understanding what these character counts are really standing in for: Google's search result display is actually based on pixel width, not a fixed character count, so a title full of narrow letters like \"i\" and \"l\" can run longer than 60 characters and still display fully, while a title full of wide capital letters can get cut off sooner. Character counts are a reliable approximation for planning purposes, and this tool's limits are set conservatively enough to work for the vast majority of titles and descriptions, but a title sitting right at the edge of the counter is worth previewing directly if the exact wording matters.",
      ],
      bullets: [
        "Title: aim for roughly 50-60 characters, shown as a caution then a red warning",
        "Description: aim for roughly 140-160 characters, same caution and warning pattern",
        "Google actually truncates by pixel width, so character count is a close approximation, not an exact rule",
        "Use the built-in Google preview to sanity-check how a borderline-length title actually displays",
      ],
    },
    {
      heading: "Open Graph and Twitter Card Tags Explained",
      paragraphs: [
        "Open Graph tags, identified by the \"og:\" prefix, control how a page appears when shared as a link on Facebook, LinkedIn, and several other platforms that support the same standard. This tool generates og:title, og:description, og:url, and og:image from the fields you fill in, plus a fixed og:type set to \"website,\" which is the correct type for the vast majority of ordinary pages, articles, and tools rather than a product page or a video.",
        "Twitter Card tags work the same way but use their own \"twitter:\" prefixed names, since Twitter/X historically used a separate standard before Open Graph adoption became more universal. This tool sets twitter:card to \"summary_large_image,\" which displays a large preview image rather than a small thumbnail, and fills in twitter:site from your handle along with twitter:title, twitter:description, and twitter:image so the Twitter preview matches the Open Graph one rather than needing separate copy.",
      ],
    },
    {
      heading: "How to Write a Meta Description That Improves Click-Through Rate",
      paragraphs: [
        "A meta description doesn't directly boost search rankings, but it functions as free ad copy underneath your title in search results, and a well-written one measurably affects whether someone clicks your result over a competitor's. The description field in this tool feeds directly into the Google preview box above the tag output, so you can see it in context rather than judging the sentence in isolation.",
        "The strongest descriptions state clearly what the page offers and, where relevant, what makes it useful to click right now: a specific benefit, a number, or a direct answer to what someone likely searched for. Avoid restating the title word for word in the description, since a searcher scanning the results sees the title and description as two separate pieces of information, not one continuous sentence, and duplicating them wastes the extra 150-160 characters you have to work with.",
      ],
    },
    {
      heading: "Where to Paste Meta Tags: The HTML head Section Explained",
      paragraphs: [
        "Every tag this tool generates belongs inside the head section of your page's HTML, the part between the opening head tag and closing head tag, before the visible body content starts. This includes the basic meta tags (charset, viewport, title, description, keywords, author), the Open Graph tags, and the Twitter Card tags; none of them render as visible content on the page itself, so placing them correctly in the head is what makes search engines and social platforms actually read them.",
        "If your site is built with a content management system, static site generator, or a framework, there's often a dedicated settings field or template for page metadata rather than a raw HTML file to edit directly; in that case, use the generated title and description text in those fields, and paste the Open Graph and Twitter tags into whatever custom head-tags or meta-tags section the platform provides, since manually editing an HTML file may not be how that platform expects metadata to be set.",
      ],
    },
    {
      heading: "OG Image Dimensions and Social Preview Best Practices",
      paragraphs: [
        "The OG Image URL field needs a direct, publicly accessible link to an image file, not a link to a webpage containing an image; if the URL doesn't resolve directly to a JPG, PNG, or similar file, most platforms will fail to load a preview image at all. The generally recommended size for this image is 1200 by 630 pixels, which matches the aspect ratio Facebook, LinkedIn, and Twitter's large-image card all expect, avoiding an awkward crop when the platform resizes it to fit its own preview layout.",
        "The same image URL feeds both og:image and twitter:image in this tool's output, which keeps your Facebook and Twitter previews visually consistent without maintaining two separate images. Since neither preview updates instantly everywhere, expect some social platforms to cache an old preview image for a period after you change it, particularly if the same URL was already shared before the image was updated.",
      ],
    },
    {
      heading: "Keywords Meta Tag: Does It Still Matter for SEO in 2026?",
      paragraphs: [
        "This tool includes a Keywords field that generates a meta name=\"keywords\" tag, but it's important to set expectations correctly: Google has publicly stated for years that it does not use this tag as a search ranking factor, and no major search engine currently treats it as meaningful for rankings. It's included here mainly for completeness and because a small number of other tools, internal search systems, or legacy platforms may still reference it.",
        "Spend your effort on the title and description instead, since those are what actually influence both rankings and click-through rate; treat the keywords field as optional and skip it entirely if you'd rather keep your generated tag output shorter and cleaner. Note also that this tool doesn't generate a canonical link tag or a robots meta tag, both of which are separate, commonly used tags; if your page needs either of those, they'll need to be added by hand alongside the tags generated here.",
      ],
    },
  ],
  useCases: [
    { title: "New page launches", description: "Generate a complete set of SEO, Open Graph, and Twitter tags before publishing a new page, all from one form." },
    { title: "Fixing broken social previews", description: "Rebuild og:image and twitter:image tags when a shared link shows no image or the wrong preview text." },
    { title: "Auditing existing meta descriptions", description: "Paste your current title and description in to check character length and preview how they display in search results." },
    { title: "Landing pages without a CMS field", description: "Generate the full tag block to paste directly into a static HTML page's head section." },
    { title: "Client or team handoff", description: "Produce a ready-to-paste tag block for a developer or content team without them needing to write the HTML themselves." },
  ],
  mistakes: [
    { title: "Linking the OG image to a webpage instead of an image file", description: "The OG Image URL must resolve directly to an image file; a link to a page containing the image won't generate a preview." },
    { title: "Duplicating the title inside the description", description: "Repeating the title word for word in the description wastes space that could describe the page's actual value to a searcher." },
    { title: "Expecting the keywords tag to affect rankings", description: "Major search engines don't use the keywords meta tag as a ranking factor; it's included here for completeness only." },
    { title: "Forgetting a canonical or robots tag when one is needed", description: "This tool doesn't generate those tags; add them separately if your page requires one." },
    { title: "Writing a title right at the character limit without previewing it", description: "Since Google truncates by pixel width, a title at exactly 60 characters can still get cut off depending on letter width; check the preview." },
  ],
  tips: [
    "Keep the title under the yellow-warning threshold and check the Google preview before finalizing it.",
    "Write a description that adds new information instead of repeating the title.",
    "Use a direct image file URL sized at 1200x630 for the OG Image field, not a link to a webpage.",
    "Skip the keywords field if you'd rather keep the tag output shorter; it has no ranking effect.",
    "Add a canonical tag and robots tag by hand if your page needs them, since this tool doesn't generate those.",
    "Re-share a test link on the platform itself if a social preview seems stuck on an old cached image.",
  ],
  glossary: [
    { title: "Open Graph tags", description: "A set of meta tags, prefixed \"og:\", that control how a page appears when shared as a link on Facebook, LinkedIn, and similar platforms." },
    { title: "Twitter Card", description: "A set of meta tags, prefixed \"twitter:\", that control how a page appears when shared as a link on Twitter/X." },
    { title: "Meta description", description: "An HTML tag providing a short summary of a page's content, commonly shown beneath the title in search engine results." },
    { title: "Canonical tag", description: "A separate HTML link tag that tells search engines which URL is the preferred version of a page when duplicate or similar URLs exist." },
    { title: "Pixel width truncation", description: "The way search engines cut off a title or description based on how much horizontal space the text actually occupies, rather than a strict character count." },
    { title: "head section", description: "The part of an HTML document, before the visible page content, where meta tags, the page title, and other page-level information belong." },
  ],
};

export default guide;
