import type { ToolGuide } from "@/types/guide";

const guide: ToolGuide = {
  slug: "text-to-ascii",
  intro: [
    "This text to ASCII art generator turns a short word or phrase into large stylized text built entirely out of plain characters — the kind of decorative heading you can paste into a terminal, a README file, a code comment, or a social media bio where only plain text is allowed. Type up to 20 characters, pick one of five font styles, and the ASCII art renders instantly with copy and download-as-.txt buttons.",
    "ASCII art text has a long history going back to early computer bulletin boards and print terminals, long before graphical fonts were an option, and command-line tools like figlet made it a staple of terminal software for splash screens and help banners. This generator brings the same idea to the browser: five distinct styles, from a bold multi-line block font to compact single-line bracketed and shadow effects, all generated instantly with no download or installation required.",
  ],
  sections: [
    {
      heading: "ASCII Art vs ASCII Character Codes: What This Tool Actually Generates",
      paragraphs: [
        "It's worth being clear about what \"ASCII\" means here, since the term covers two different things online. ASCII character codes are the numeric values, 0 through 127, that computers use to represent letters, digits, and symbols internally — that's a lookup table, not a visual style. ASCII art is a completely different idea: using printable characters like #, |, and spaces arranged across multiple lines to draw a picture or a large stylized letterform.",
        "This tool generates ASCII art, specifically stylized text banners, not a list of character codes. If you're looking to look up the numeric ASCII code for a character rather than draw one in block letters, that's a different kind of tool entirely; this one is for producing a decorative, copy-pasteable text banner out of a word or short phrase.",
      ],
    },
    {
      heading: "The Five Font Styles: Block, Banner, Digital LCD, Simple, and Shadow",
      paragraphs: [
        "Block is the most visually striking option: each letter is drawn as a five-row-tall grid of # characters and spaces, similar to classic figlet banners, and it supports uppercase and lowercase letters, which are automatically converted to uppercase, plus digits 0 through 9. Banner wraps each character individually in brackets, like [ H ] [ I ], producing a compact single-line effect that works for any character since it doesn't rely on a lookup table.",
        "Digital LCD stacks a small underline, the letter itself inside pipe characters, and a bottom underline across three lines to suggest a digital-display look, though it displays the actual letter rather than simulating true seven-segment digit shapes. Simple wraps the whole phrase in \">>> \" and \" <<<\", and Shadow prints the text in capitals with spaced-out letters, followed by a second, offset lowercase copy underneath to fake a drop-shadow effect.",
      ],
      bullets: [
        "Block: five-row #-based letters, A-Z, 0-9, and space only",
        "Banner: bracket wrapping around every character, any character supported",
        "Digital LCD: pipe-and-underline boxes suggesting a digital display",
        "Simple: single-line arrow-wrap around the whole phrase",
        "Shadow: spaced capitals with an offset lowercase echo underneath",
      ],
    },
    {
      heading: "Why the Block Font Silently Drops Unsupported Characters",
      paragraphs: [
        "The Block font works from a fixed lookup table that only has entries for the 26 letters and 10 digits, plus a blank space entry. Any character outside that set, including punctuation like ! and ?, accented letters, or symbols, isn't drawn at all — it falls back to the blank space pattern instead of showing an error, so it simply disappears from the output without any warning.",
        "The other four fonts don't have this limitation, since they don't map characters to a drawn shape; they wrap or space out whatever character you typed as-is, punctuation included. If your phrase needs an exclamation point, a question mark, or any symbol to render as itself rather than vanish, use Banner, Digital LCD, Simple, or Shadow instead of Block.",
      ],
    },
    {
      heading: "ASCII vs Unicode vs UTF-8 Explained",
      paragraphs: [
        "ASCII is the original 128-character encoding standard from the 1960s, covering unaccented English letters, digits, basic punctuation, and control codes — it's the foundation every modern text encoding still builds on for that core character set. Unicode is a much larger standard that assigns a unique number to essentially every character used in every written language, plus symbols and emoji, currently well past 140,000 characters.",
        "UTF-8 is not a different character set from Unicode; it's an encoding, meaning a specific method for storing Unicode's character numbers as bytes. UTF-8 stores the original 128 ASCII characters in exactly one byte each, identical to classic ASCII, which is why plain English ASCII art text like this tool produces displays correctly everywhere without any special encoding considerations.",
      ],
    },
    {
      heading: "Where to Use ASCII Art Text",
      paragraphs: [
        "README headers on GitHub and other code hosting platforms are one of the most common places for ASCII art banners, since they render reliably as plain text inside a code block regardless of what markdown renderer is used. Terminal applications and command-line tools often print an ASCII banner on startup for the same reason: it works in any terminal with no font or image support required.",
        "Outside of development, ASCII art text shows up in email signatures, social media bios and posts, Discord and forum messages, and anywhere else that only accepts plain text but a plain word doesn't stand out enough. Since the output is just characters, it also survives being copied between completely different platforms without any formatting loss, unlike an image or a styled font would.",
      ],
    },
  ],
  useCases: [
    { title: "README and documentation headers", description: "Add a large, eye-catching project name banner to a GitHub README or plain-text documentation file." },
    { title: "Terminal and CLI tool splash text", description: "Print a stylized banner when a command-line tool starts up, without needing any image or font support." },
    { title: "Social media bios and posts", description: "Make a name or short phrase stand out in a bio or post on a platform that only accepts plain text." },
    { title: "Email signatures", description: "Add a distinctive plain-text name or tagline to an email signature that renders the same in any email client." },
    { title: "Forum and Discord messages", description: "Create attention-grabbing plain-text headers in community platforms that don't support custom fonts or images." },
  ],
  mistakes: [
    { title: "Expecting punctuation to render in Block font", description: "The Block font only has letters, digits, and space in its lookup table; punctuation and symbols silently disappear instead of drawing." },
    { title: "Expecting true seven-segment digit shapes from Digital LCD", description: "This style boxes the actual character in pipes and underlines for a digital-display feel; it doesn't simulate real segment-based digit shapes." },
    { title: "Typing more than 20 characters", description: "Input is capped at 20 characters, so long phrases need to be shortened or split across multiple conversions." },
    { title: "Confusing ASCII art with ASCII character codes", description: "This tool draws stylized text banners; it doesn't look up or display the numeric ASCII code values for characters." },
  ],
  tips: [
    "Switch to Banner, Digital LCD, Simple, or Shadow if your phrase needs punctuation the Block font can't draw.",
    "Keep phrases short — 20 characters is the input limit, and shorter text reads better in Block font anyway.",
    "Use the Download .txt button to save the ASCII art with its exact spacing intact, since copy-paste in some apps can trim trailing spaces.",
    "Preview the output in a monospace font context, like a code block or terminal, since ASCII art misaligns in proportional fonts.",
    "Use Block for maximum visual impact in a README; use Banner or Simple for a compact one-line header.",
  ],
  glossary: [
    { title: "ASCII", description: "A 128-character text encoding standard from the 1960s covering basic English letters, digits, and punctuation." },
    { title: "ASCII art", description: "Images or stylized text drawn using printable characters like # and | arranged across multiple lines." },
    { title: "Unicode", description: "A much larger character standard that assigns a unique number to characters from virtually every written language, plus symbols and emoji." },
    { title: "UTF-8", description: "A byte-level encoding method for storing Unicode character numbers, backward-compatible with classic ASCII for the first 128 characters." },
    { title: "Monospace font", description: "A font where every character takes up the same width, required for ASCII art to line up correctly." },
    { title: "Figlet", description: "A classic command-line program that generates large ASCII art banners from text, a common reference point for this style of tool." },
  ],
};

export default guide;
