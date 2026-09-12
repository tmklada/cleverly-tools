import type { ToolGuide } from "@/types/guide";

const guide: ToolGuide = {
  slug: "html-to-text",
  intro: [
    "An HTML to text converter strips every tag out of a block of HTML markup and leaves only the text a browser would actually display. This tool works entirely in your browser: paste raw HTML source and the conversion runs automatically, giving you back clean text you can drop into an email, a spreadsheet, or a plain-text document. It's the fastest way to strip HTML tags from content copied out of a web page, a CMS export, or an HTML email template without opening a code editor.",
    "The converter is built for a specific, common problem: text copied from a web page rarely comes over clean. It drags along span tags, inline styles, tracking attributes, and empty divs that a word processor or a plain-text field doesn't need and often can't handle. Pasting that markup into a document, a text file, or a form can leave broken formatting behind even after you think you've cleaned it up by hand.",
    "Two toggles control how the conversion behaves. \"Preserve line breaks\" turns paragraph breaks, headings, and list items back into readable line breaks and bullets instead of collapsing everything into one run-on line. \"Decode HTML entities\" turns encoded characters like &amp; and &nbsp; back into the plain characters they represent, such as & and a normal space, so the output reads the way the original text was meant to read.",
  ],
  sections: [
    {
      heading: "How to Strip HTML Tags From Text Safely",
      paragraphs: [
        "Stripping HTML tags means removing every opening and closing tag, like <p>, <div>, <span>, and <a>, while keeping the text that sits between them. This tool does that by scanning the input for anything wrapped in angle brackets and deleting it, which handles ordinary content tags like paragraphs, headings, links, bold, and italics cleanly and predictably.",
        "There's one case worth knowing about before you paste anything: tags are removed, but the text sitting inside a <script> or <style> block is not treated any differently from regular content. If your HTML includes embedded JavaScript or CSS, that code's text will remain in the output once the surrounding tags are gone. For clean results, strip out <script> and <style> blocks before pasting, or check the output for leftover code and delete it manually.",
      ],
      bullets: [
        "Opening and closing tags (<p>, </p>, <div>, <span>, <a>) are removed automatically",
        "Text between tags is preserved exactly as written",
        "Attributes like class, id, and style disappear along with their tags",
        "Code inside <script> and <style> tags stays in the output as plain text — remove those blocks first if present",
      ],
    },
    {
      heading: "Why Copy-Pasting From Word or a Web Page Brings Hidden Formatting",
      paragraphs: [
        "When you copy text from a web page or a document like Google Docs or Word and paste it somewhere else, most apps don't just paste the visible words. They paste the underlying HTML, complete with font-size spans, color styles, and tracking classes the original site or document used for its own layout. That's why pasted text sometimes shows up in a different font, size, or color than the rest of your document, even though none of that markup is visible on screen.",
        "Running that same clipboard content, or the page's raw HTML source, through this converter removes all of it in one step. The output is markup-free text with no embedded styling information at all, so wherever you paste it next inherits the destination's own formatting instead of carrying over invisible leftovers from the source.",
      ],
    },
    {
      heading: "HTML Entities Explained: &amp;, &nbsp;, and Numeric Character References",
      paragraphs: [
        "HTML can't contain a literal < or & character in its text without breaking the markup, so those and other special characters are written as entities instead: &amp; for an ampersand, &lt; and &gt; for angle brackets, &quot; and &apos; for quote marks, and &nbsp; for a non-breaking space. This tool recognizes the common named entities, including &copy;, &reg;, &trade;, &mdash;, &ndash;, &hellip;, &laquo;, and &raquo;, and converts each one back to its plain character when \"decode HTML entities\" is checked.",
        "It also decodes decimal numeric references, the &#169; style codes that represent a character by its Unicode number, converting the number straight to the matching character. One limitation worth knowing: hexadecimal numeric references, written as &#xA9; instead of &#169;, are not recognized and pass through unchanged. If your source HTML uses hex entity codes, expect a few of them to survive the conversion untouched.",
      ],
      bullets: [
        "&amp; becomes &, &lt; becomes <, &gt; becomes >, &quot; becomes a quote mark, &apos; becomes an apostrophe",
        "&nbsp; becomes a regular space, &mdash; becomes an em dash, &hellip; becomes an ellipsis",
        "&#169; (decimal numeric reference) converts automatically to the copyright symbol",
        "&#xA9; (hexadecimal numeric reference) is not decoded and stays as-is",
      ],
    },
    {
      heading: "Preserving Paragraph and List Structure When Converting HTML to Text",
      paragraphs: [
        "With \"preserve line breaks\" turned on, the converter doesn't just strip tags blindly — it uses certain tags as signals for where a line break belongs before deleting them. A <br> becomes a single line break, a closing </p> or </h1> through </h6> becomes a blank line to separate paragraphs and headings, and a closing </div> becomes a line break to keep separate blocks from running together.",
        "List items get special treatment too: each <li> is converted to a line starting with a bullet character, so a bulleted or numbered HTML list reads as a plain-text list instead of one long sentence. After all the substitutions, the tool collapses any run of three or more blank lines down to two and trims leading and trailing whitespace, so the result doesn't end up with large gaps from HTML that had a lot of nested empty containers.",
      ],
    },
    {
      heading: "What This Tool Does Not Fix: Tables, Malformed HTML, and Live Pages",
      paragraphs: [
        "This converter works on the HTML text you paste, not on a live web page, so it can't fetch a URL for you — you need to copy the page's HTML source (via \"View Page Source\" or your browser's inspector) or the raw HTML string itself and paste that in. It also doesn't parse HTML into a structured document the way a browser does; it uses pattern matching to find and remove tags, which is fast and works well for typical content but has edge cases.",
        "Tables are the clearest example: <table>, <tr>, and <td> tags are stripped like any other tag, but there's no special handling to add spacing or line breaks between table cells, so a multi-column table often comes out as one run of text with the cell contents jammed together. Severely malformed HTML, such as an unclosed tag or angle brackets used outside of real markup, can also produce unexpected results since the tool has no way to know the author's intent.",
      ],
    },
    {
      heading: "Common Uses for Converting HTML to Plain Text",
      paragraphs: [
        "The most frequent use is cleaning content copied from a website or CMS before pasting it into a document, an email, or a plain-text field that doesn't accept HTML. It's also useful for preparing a plain-text fallback version of an HTML email template, since many email clients and spam filters expect a text alternative alongside the HTML version.",
        "Developers use it to quickly preview what an HTML string will read like once rendered, without opening a browser, and writers and researchers use it to pull the visible text out of scraped or exported HTML for a word count, a readability check, or import into a spreadsheet or database that only accepts plain text.",
      ],
    },
  ],
  useCases: [
    { title: "Cleaning pasted web content", description: "Strip hidden fonts, colors, and tracking spans out of text copied from a website before pasting it into a document or CMS." },
    { title: "Building a plain-text email fallback", description: "Convert an HTML email template into the plain-text version many email clients and spam filters expect alongside the HTML one." },
    { title: "Extracting text for word counts and SEO checks", description: "Pull the visible text out of a page's HTML source to run an accurate word count or readability check without markup inflating the numbers." },
    { title: "Prepping CMS export files", description: "Strip tags from HTML exported out of WordPress or another CMS before importing the content into a spreadsheet or a different system." },
    { title: "Reviewing HTML email or newsletter code", description: "Quickly read what an HTML string will look like once rendered, without opening a browser or email client." },
  ],
  mistakes: [
    { title: "Expecting script and style code to disappear", description: "Only the tags are removed; text inside <script> and <style> blocks stays in the output, so strip those blocks first if your HTML includes them." },
    { title: "Pasting hexadecimal entity codes", description: "The decoder handles named entities and decimal numeric references like &#169; but not hexadecimal ones like &#xA9;, which pass through unchanged." },
    { title: "Expecting table structure to survive", description: "Table, row, and cell tags are stripped without added spacing, so multi-column tables often come out with cell text run together." },
    { title: "Pasting a URL instead of HTML source", description: "The tool converts HTML text you paste in; it can't fetch a live page, so copy the page's HTML source first." },
  ],
  tips: [
    "Turn off \"preserve line breaks\" only if you specifically want one continuous line of text with no structure.",
    "Strip out <script> and <style> blocks manually before pasting if the source HTML includes embedded code.",
    "Use your browser's \"View Page Source\" rather than a rendered copy-paste when you need the true HTML markup.",
    "Check the output for leftover hexadecimal entity codes like &#xA9; if your source used them.",
    "Turn off \"decode HTML entities\" if you need to inspect the raw entity codes rather than their resolved characters.",
  ],
  glossary: [
    { title: "HTML tag", description: "A marker like <p> or <div> that wraps content to define its structure or styling; tags are removed during this conversion." },
    { title: "HTML entity", description: "A text code such as &amp; or &nbsp; used to represent a character that HTML can't include literally." },
    { title: "Block-level element", description: "An HTML element like a paragraph, heading, or div that starts on its own line, used here to decide where line breaks belong." },
    { title: "Numeric character reference", description: "An entity written as a number, such as &#169;, that identifies a character by its Unicode code point." },
    { title: "Plain text", description: "Text with no formatting or markup at all, just the raw characters — the output format this tool produces." },
  ],
};

export default guide;
