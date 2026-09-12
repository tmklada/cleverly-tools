import type { ToolGuide } from "@/types/guide";

const guide: ToolGuide = {
  slug: "css-minifier",
  intro: [
    "A CSS minifier strips out everything a browser doesn't need to render your styles correctly — comments, line breaks, indentation, and extra spaces around selectors and values — so the file that actually ships to visitors is smaller than the one you write and edit. This tool does exactly that: paste in your CSS, click Minify, and get back a single-line, compressed version along with a live comparison of the original size, the minified size, and the percentage saved.",
      "It also works the other way. If you've ever pasted production CSS into an editor and found one unreadable wall of text, the Beautify button reverses the process, re-indenting rules onto separate lines so you can read and edit them. Both directions run entirely in your browser using plain text transformations — nothing is uploaded to a server, so pasting proprietary or client CSS here is safe.",
    "This is a lightweight, whitespace-and-comment minifier, not a full CSS optimizer. It's built for the common case: you have a CSS file with normal formatting and want it smaller before deploying, without installing a build tool or a Node package for a one-off task. If you need deeper optimizations like removing unused selectors or merging duplicate rules, this tool explains below exactly where that line is so you know when to reach for something more powerful.",
  ],
  sections: [
    {
      heading: "What This CSS Minifier Actually Removes",
      paragraphs: [
        "The minifier works with a set of text transformations, not a full CSS parser. It strips every comment block written as /* ... */, collapses any run of whitespace — including newlines and tabs — into single spaces, and then removes the spaces that typically surround punctuation: after opening braces, before closing braces, around colons in declarations, after semicolons, and after commas in selector lists or multi-value properties. It also drops the final semicolon before a closing brace, since browsers don't require it.",
        "The result is CSS that's functionally identical to what you pasted in but takes up meaningfully less space on disk and over the network. It does not rename anything, reorder anything, or change any values — every color, unit, and selector in the output is exactly what you wrote, just packed tighter.",
      ],
      bullets: [
        "Input:  body {\n  margin: 0;\n  padding: 0; /* reset */\n}",
        "Output: body{margin:0;padding:0}",
      ],
    },
    {
      heading: "How Much Does Minifying CSS Actually Save? (With Gzip and Brotli)",
      paragraphs: [
        "The Original, Minified, and Saved figures shown after you click Minify are a direct byte comparison of what you pasted in versus what came out. How much you save depends entirely on your starting point: heavily commented, deeply indented CSS with a lot of blank lines might shrink by 40-60%, while CSS that was already written compactly might only drop 10-20%, because there's simply less whitespace left to remove.",
        "Minification and server compression solve overlapping but different problems. Gzip and Brotli, which most web servers apply automatically, already compress away a large share of repeated whitespace — so the real-world transfer-size difference between minified-then-gzipped and unminified-then-gzipped CSS is usually smaller than the raw percentage shown here. Minification still helps, especially for parse time, but don't expect on-the-wire savings to match the raw byte-savings number one-to-one.",
      ],
    },
    {
      heading: "Minify vs Compress vs Purge Unused CSS",
      paragraphs: [
        "These three terms get used interchangeably, but they're different operations. Minifying, which is what this tool does, removes formatting characters like whitespace and comments without touching the actual rules. Compressing (gzip or Brotli) happens at the HTTP layer, encoding the file — minified or not — into a smaller binary stream that the browser decodes on arrival; it's a server or CDN setting, not something you do to the source file itself. Purging unused CSS is a separate step entirely: it analyzes your HTML and JavaScript to find which selectors are never actually used, then deletes those rules outright, which can cut a large stylesheet by far more than minification alone.",
        "This tool only does the first of the three. It won't detect that .old-banner-style is dead code left over from a redesign, because that requires knowing your markup, not just your CSS. For the full pipeline — write readable CSS, purge what's unused, minify what's left, then let your server compress it — you'd pair this tool with a build-time purge step from something like a bundler plugin.",
      ],
    },
    {
      heading: "When to Minify vs When to Beautify",
      paragraphs: [
        "Minify when you're about to ship: right before you paste CSS into a production <style> tag, an email template with a strict size limit, or a static export that won't go through a build pipeline. It's also useful just to see the real, uncompressed size of a stylesheet at a glance via the size comparison.",
        "Beautify when you're on the receiving end: you've copied minified CSS from a live site's dev tools, inherited a legacy file with no formatting, or need to hand-edit something that was generated by a tool. The beautifier is a straightforward reversal of the minifier's own formatting rules — it adds a newline and two-space indent after each opening brace and after each semicolon, and a newline after each closing brace. It's built to make single-level rule blocks readable again, not to fully reformat deeply nested structures like @media queries containing multiple selectors, so double-check indentation on those before treating the output as final.",
      ],
    },
    {
      heading: "What This Minifier Does Not Do",
      paragraphs: [
        "Because it works by pattern-matching text rather than parsing CSS into a syntax tree, this tool intentionally stays conservative. It does not shorten color values (it won't turn #ffffff into #fff), remove redundant units from zero values (0px stays 0px), merge duplicate selectors, reorder properties, strip unused vendor prefixes, or detect and remove dead rules. Those optimizations require understanding CSS semantics, not just its punctuation, and getting them wrong can silently break a stylesheet.",
        "If your project needs that level of optimization, a build-time tool integrated into your bundler is the safer choice, since it can validate the output against your actual CSS syntax. This tool is meant for the fast, safe, no-install case: shrink the obvious whitespace and comments, see the size difference immediately, and move on.",
      ],
    },
    {
      heading: "Deploying Minified CSS Safely",
      paragraphs: [
        "Treat the minified output as a build artifact, not your source of truth. Keep editing the original, formatted CSS, and generate the minified version fresh each time you deploy — running the minifier on already-minified CSS won't hurt anything, but it also won't save further bytes, since there's no more whitespace left to strip. The Download button saves the result as a .min.css or .css file depending on which mode you last ran, so you can drop it straight into a project's assets folder without a manual copy-paste step.",
        "Finally, if you're not already using a bundler or build step, remember that a one-off minified file needs to be re-generated by hand every time you change the source CSS. For a small static site that's a fine trade-off for avoiding tooling; for anything that changes often, this tool is best used as a quick check or a stopgap, not a permanent workflow.",
      ],
    },
  ],
  useCases: [
    { title: "Shrinking CSS before a static site deploy", description: "Paste your stylesheet before pushing to production when you don't have a build pipeline set up to minify automatically." },
    { title: "Fitting CSS into size-limited email templates", description: "Compress inline or embedded styles to stay under the strict size limits many email clients enforce." },
    { title: "Reading minified CSS from a live website", description: "Copy a competitor's or your own site's compressed stylesheet from dev tools and beautify it to see the actual rules." },
    { title: "Embedding CSS in HTML exports or widgets", description: "Reduce the size of a <style> block embedded directly in an HTML file, snippet, or generated document." },
    { title: "Checking how much whitespace a stylesheet carries", description: "Use the Original vs Minified size comparison to see how much of a file is formatting versus actual rules." },
  ],
  mistakes: [
    { title: "Expecting minification to remove unused CSS", description: "This tool strips whitespace and comments only; it has no way to know which selectors your HTML actually uses, so dead rules stay in the output." },
    { title: "Assuming beautified nested at-rules will be perfectly formatted", description: "The beautifier reverses basic punctuation spacing; deeply nested structures like @media blocks with multiple rules may need manual indentation cleanup." },
    { title: "Re-minifying an already-minified file expecting more savings", description: "Once whitespace and comments are gone, running the tool again won't shrink the file further — there's nothing left to remove." },
    { title: "Editing the minified output directly", description: "Always keep and edit the original formatted CSS; regenerate the minified version each time instead of hand-editing compressed code." },
    { title: "Skipping server-side gzip or Brotli compression", description: "Minification and compression stack — serving minified CSS without gzip or Brotli enabled leaves real bandwidth savings on the table." },
  ],
  tips: [
    "Keep your original, formatted CSS as the source of truth and treat minified output as a disposable build artifact.",
    "Use Beautify to make sense of minified CSS you find in another site's page source or dev tools.",
    "Pair minification with gzip or Brotli compression on your server for the largest real-world size reduction.",
    "Check the Saved percentage as a rough signal of how much formatting bloat your original file had, not a guarantee for every file.",
    "Re-generate the minified file every time you edit the source rather than patching the compressed version by hand.",
    "For large projects, use a build-time minifier instead of this tool so minification happens automatically on every deploy.",
  ],
  glossary: [
    { title: "Minification", description: "Removing whitespace, comments, and other formatting characters from code without changing what it does." },
    { title: "Whitespace", description: "Spaces, tabs, and line breaks used for readability that have no effect on how a browser interprets CSS." },
    { title: "Gzip / Brotli compression", description: "Server-level encoding that compresses a file for transfer over the network, applied on top of, not instead of, minification." },
    { title: "Purging unused CSS", description: "Analyzing HTML and JavaScript to find and remove CSS rules that are never actually applied — a separate step from minification." },
    { title: "Beautify", description: "The reverse of minification: re-adding indentation and line breaks to make compressed code readable again." },
  ],
};

export default guide;
