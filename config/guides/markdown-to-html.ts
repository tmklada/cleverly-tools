import type { ToolGuide } from "@/types/guide";

const guide: ToolGuide = {
  slug: "markdown-to-html",
  intro: [
    "Markdown is a lightweight way to format text using plain characters instead of a rich-text editor, and this tool converts Markdown into HTML instantly in your browser as you type. Type or paste Markdown into the editor on the left, and a live, rendered HTML preview appears on the right, updating with every keystroke, with a button to copy the raw HTML source when you're ready to use it.",
    "It's built for anyone who writes in Markdown but needs actual HTML for a website, email template, or CMS field that doesn't render Markdown natively — writers, developers, and documentation authors who want to skip manually typing HTML tags. The tool covers the core Markdown syntax most people actually use day to day: headings, bold and italic text, links, inline and fenced code, blockquotes, and unordered lists.",
    "This guide walks through the syntax the tool supports, the difference between CommonMark and GitHub Flavored Markdown, and what to do when you need a feature — like tables or images — that this converter doesn't currently handle.",
  ],
  sections: [
    {
      heading: "Markdown Syntax Cheat Sheet (Headings, Lists, Links, Code)",
      paragraphs: [
        "Headings are written with one to three hash symbols at the start of a line — a single # produces a top-level heading, ## a second-level heading, and ### a third-level heading, each getting progressively smaller in the rendered output. Bold text is wrapped in double asterisks, like **bold**, and italic text in single asterisks, like *italic*; combining three asterisks on each side, ***like this***, produces bold and italic together.",
        "Links use the format [link text](https://example.com), with the visible text in square brackets immediately followed by the URL in parentheses. Inline code — a short snippet meant to sit within a sentence — is wrapped in single backticks, like `example`, while a longer, multi-line code block is wrapped in triple backticks on their own lines before and after the code.",
        "An unordered list is written as separate lines each starting with a hyphen and a space, like \"- First item\", and consecutive list lines are automatically grouped into a single bulleted list in the output. A line starting with \"> \" becomes a blockquote, commonly used to set off a quotation or a callout note from the surrounding text.",
      ],
      bullets: [
        "# Heading 1, ## Heading 2, ### Heading 3",
        "**bold**, *italic*, ***bold italic***",
        "[link text](https://example.com)",
        "`inline code` and triple-backtick fenced code blocks",
        "- Unordered list item",
        "> Blockquote line",
      ],
    },
    {
      heading: "Markdown Flavors: CommonMark vs GitHub Flavored Markdown",
      paragraphs: [
        "Markdown started as an informal specification, and different platforms implemented it slightly differently until CommonMark emerged as a more precise, standardized version of the core syntax. CommonMark defines exactly how ambiguous cases should render — like nested lists or emphasis next to punctuation — so that Markdown behaves consistently across tools that follow the spec.",
        "GitHub Flavored Markdown (GFM) builds on CommonMark and adds extra features that have become common expectations for developers: tables, automatic linking of raw URLs, strikethrough text using double tildes, and task list checkboxes. This tool implements a practical subset of core Markdown syntax rather than the full CommonMark or GFM specification, so features like tables, ordered numbered lists, and images aren't converted yet — if your Markdown relies on those, they'll pass through as plain text rather than being formatted.",
      ],
    },
    {
      heading: "What This Converter Supports (and What It Doesn't)",
      paragraphs: [
        "This tool reliably handles the syntax most everyday Markdown writing actually uses: headings one through three levels deep, bold, italic, bold-italic combined, inline code, fenced code blocks, links, blockquotes, and unordered lists. As you type, the preview pane renders the formatted result live, and the Copy HTML button grabs the generated HTML markup, complete with styling classes, ready to paste elsewhere.",
        "It does not currently convert Markdown tables, ordered (numbered) lists, or image syntax like ![alt text](image.jpg) — any of these will appear as literal characters in the output rather than being transformed. If your document needs tables or images, build the HTML for those sections separately, or use a full-featured Markdown library in your own codebase for documents that depend heavily on those features.",
      ],
    },
    {
      heading: "Common Uses for Markdown-to-HTML Conversion",
      paragraphs: [
        "Developers often draft documentation, README content, or release notes in Markdown because it's fast to type and readable even in plain text, then need the equivalent HTML to embed in a documentation site, help center article, or internal wiki that doesn't render Markdown directly. Writers moving content from a Markdown-based note-taking app into an email platform or CMS field that expects HTML face the same conversion need.",
        "Because the conversion runs entirely client-side in your browser, it's also useful for quickly previewing how a piece of Markdown will actually look once formatted, without needing to commit it to a repository or publish it somewhere just to check the rendering.",
      ],
    },
    {
      heading: "Markdown Formatting Mistakes to Watch For",
      paragraphs: [
        "A very common mistake is forgetting the blank line before and after a fenced code block or a list, which can cause the surrounding text to merge into the block in some Markdown parsers; this tool is forgiving about most spacing, but keeping a consistent habit of blank lines around structural elements avoids surprises when you move the same Markdown to a stricter parser elsewhere.",
        "Another frequent issue is using four hash symbols or more, like ####, expecting a fourth-level heading — since this converter only handles one, two, and three hashes, anything deeper renders as plain text starting with literal hash characters rather than a smaller heading. Similarly, numbered lists written as \"1. First item\" won't convert to an ordered list here; rewrite them as hyphen-prefixed unordered items if list formatting matters more than the numbering.",
      ],
    },
  ],
  useCases: [
    { title: "Converting README content", description: "Turn a Markdown README into HTML for embedding in a website or documentation portal." },
    { title: "Formatting a CMS field", description: "Convert draft content written in Markdown into HTML for a platform that expects rich HTML input." },
    { title: "Previewing Markdown quickly", description: "Check how Markdown syntax will render before committing or publishing it elsewhere." },
    { title: "Building email content", description: "Generate simple, styled HTML from Markdown for an email template that doesn't support Markdown natively." },
    { title: "Writing documentation snippets", description: "Draft a help article in fast-to-type Markdown, then export the HTML for a help center." },
  ],
  mistakes: [
    { title: "Expecting table support", description: "Markdown tables aren't converted by this tool and will appear as plain text with pipe characters." },
    { title: "Using four or more hash symbols", description: "Only single, double, and triple hash headings (H1-H3) are converted; deeper heading levels render as plain text." },
    { title: "Writing numbered lists", description: "Lines starting with \"1.\" are not converted into an ordered list — use hyphen-prefixed unordered items instead." },
    { title: "Including image syntax", description: "Image markdown like ![alt](src) isn't rendered; it passes through as literal text." },
    { title: "Skipping blank lines around blocks", description: "Missing blank lines before or after a code block or list can cause inconsistent rendering when the same Markdown is used in other tools." },
  ],
  tips: [
    "Stick to single, double, and triple hash headings — deeper levels aren't converted.",
    "Use hyphen-prefixed lines for lists, since numbered lists aren't converted to ordered HTML lists.",
    "Check the live preview as you type rather than only after pasting a full document.",
    "Copy the raw HTML with the Copy HTML button rather than copying the rendered preview text.",
    "Build tables and images separately in HTML if your document needs them, since this converter skips both.",
    "Keep a blank line before and after code blocks and lists for the most predictable results.",
  ],
  glossary: [
    { title: "Markdown", description: "A lightweight plain-text formatting syntax that converts into HTML, using characters like # and * to indicate structure and emphasis." },
    { title: "CommonMark", description: "A precise, standardized specification of core Markdown syntax intended to make rendering consistent across different tools." },
    { title: "GitHub Flavored Markdown (GFM)", description: "An extension of CommonMark used on GitHub that adds features like tables, task lists, and strikethrough text." },
    { title: "Fenced code block", description: "A multi-line code snippet in Markdown, marked off by a line of triple backticks before and after the code." },
    { title: "Inline code", description: "A short code snippet within a sentence, marked off by a single backtick on each side." },
  ],
};

export default guide;
