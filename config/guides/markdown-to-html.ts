import type { ToolGuide } from "@/types/guide";

const guide: ToolGuide = {
  slug: "markdown-to-html",
  intro: [
    "Markdown is a lightweight way to format text using plain characters instead of a rich-text editor, and this tool converts Markdown into HTML instantly in your browser as you type. Type or paste Markdown into the editor on the left, and a live, rendered HTML preview appears on the right, updating with every keystroke, with a button to copy the raw HTML source when you're ready to use it.",
    "It's built for anyone who writes in Markdown but needs actual HTML for a website, email template, or CMS field that doesn't render Markdown natively — writers, developers, and documentation authors who want to skip manually typing HTML tags. The tool covers the Markdown syntax most people actually use day to day: headings H1 through H6, bold, italic and strikethrough text, links and images, inline and fenced code, blockquotes, horizontal rules, ordered and unordered lists, and GitHub-style tables.",
    "This guide walks through the syntax the tool supports, the difference between CommonMark and GitHub Flavored Markdown, and how the converter keeps the generated HTML safe by escaping raw tags and rejecting dangerous link URLs.",
  ],
  sections: [
    {
      heading: "Markdown Syntax Cheat Sheet (Headings, Lists, Links, Code)",
      paragraphs: [
        "Headings are written with one to six hash symbols at the start of a line — a single # produces a top-level heading and ###### produces a sixth-level heading, each getting progressively smaller in the rendered output. Bold text is wrapped in double asterisks, like **bold**, italic text in single asterisks, like *italic*; three asterisks on each side, ***like this***, produces bold and italic together, and double tildes, ~~like this~~, produce strikethrough.",
        "Links use the format [link text](https://example.com), with the visible text in square brackets immediately followed by the URL in parentheses, and an image is the same syntax with an exclamation mark in front: ![alt text](image.jpg). Inline code — a short snippet meant to sit within a sentence — is wrapped in single backticks, like `example`, while a longer, multi-line code block is wrapped in triple backticks on their own lines before and after the code.",
        "An unordered list is written as separate lines each starting with a hyphen and a space, like \"- First item\", and a numbered list uses \"1. First item\" instead; indent a nested item by two spaces and it becomes a sub-list inside its parent. A line starting with \"> \" becomes a blockquote, a line of three or more hyphens becomes a horizontal rule, and a block of pipe-separated rows becomes a table.",
      ],
      bullets: [
        "# Heading 1 through ###### Heading 6",
        "**bold**, *italic*, ***bold italic***, ~~strikethrough~~",
        "[link text](https://example.com) and ![alt text](image.jpg)",
        "`inline code` and triple-backtick fenced code blocks",
        "- Unordered list item, 1. Ordered list item (indent two spaces to nest)",
        "> Blockquote line, --- horizontal rule",
        "| Column | Column | with |---|:---:| alignment row for tables",
      ],
    },
    {
      heading: "Markdown Flavors: CommonMark vs GitHub Flavored Markdown",
      paragraphs: [
        "Markdown started as an informal specification, and different platforms implemented it slightly differently until CommonMark emerged as a more precise, standardized version of the core syntax. CommonMark defines exactly how ambiguous cases should render — like nested lists or emphasis next to punctuation — so that Markdown behaves consistently across tools that follow the spec.",
        "GitHub Flavored Markdown (GFM) builds on CommonMark and adds extra features that have become common expectations for developers: tables, automatic linking of raw URLs, strikethrough text using double tildes, and task list checkboxes. This tool implements a practical subset of both specifications — including GFM pipe tables with column alignment and strikethrough — rather than every corner case, so a few rarely used features such as automatic linking of bare URLs, task list checkboxes, footnotes, and reference-style link definitions pass through as plain text.",
      ],
    },
    {
      heading: "What This Converter Supports (and What It Doesn't)",
      paragraphs: [
        "This tool handles the syntax everyday Markdown writing actually uses: headings one through six levels deep, bold, italic, bold-italic combined, strikethrough, inline code, fenced code blocks, links, images, blockquotes, horizontal rules, ordered and unordered lists with nesting, and GitHub-style pipe tables including the alignment row. As you type, the preview pane renders the formatted result live, and the Copy HTML button grabs the generated HTML markup, complete with styling classes, ready to paste elsewhere.",
        "Because the output is real HTML, the converter is deliberately strict about safety: every piece of text and every code block is HTML-escaped, so a raw tag typed into your Markdown shows up as visible text instead of running, and link and image URLs are filtered — http, https, mailto, relative paths, and data:image URLs are kept, while schemes like javascript: are refused and left as plain text. A handful of less common features are still outside the scope of a lightweight converter: bare-URL autolinking, task list checkboxes, footnotes, reference-style links, and raw inline HTML pass-through.",
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
        "Another frequent issue is forgetting the space after the marker — \"#Heading\" and \"-item\" are not valid Markdown anywhere, and they render as plain text, while \"# Heading\" and \"- item\" work as expected. With tables, the most common mistake is omitting the alignment row: a pipe table needs the |---|---| line directly under the header row, otherwise the rows are treated as ordinary paragraphs full of pipe characters.",
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
    { title: "Leaving out a table's alignment row", description: "A pipe table needs the |---|---| line directly below the header row; without it the rows stay plain text full of pipe characters." },
    { title: "Forgetting the space after a marker", description: "\"#Heading\" or \"-item\" render as plain text — Markdown needs a space after the hash or hyphen." },
    { title: "Expecting bare URLs to become links", description: "A raw URL typed on its own isn't auto-linked; wrap it in [text](url) form to get an anchor tag." },
    { title: "Using a javascript: or data:text URL", description: "Unsafe URL schemes are rejected on purpose and the link stays as plain text; use http, https, mailto, a relative path, or a data:image URL." },
    { title: "Skipping blank lines around blocks", description: "Missing blank lines before or after a code block, table, or list can cause inconsistent rendering when the same Markdown is used in other tools." },
  ],
  tips: [
    "All six heading levels work, so use #### through ###### for deep documentation structure.",
    "Numbered lists convert to real <ol> elements, and indenting an item two spaces nests it inside the item above.",
    "Check the live preview as you type rather than only after pasting a full document.",
    "Copy the raw HTML with the Copy HTML button rather than copying the rendered preview text.",
    "Add colons to a table's alignment row (:---, :---:, ---:) to control left, center, and right column alignment.",
    "Keep a blank line before and after code blocks, tables, and lists for the most predictable results.",
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
