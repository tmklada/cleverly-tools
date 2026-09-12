import type { ToolGuide } from "@/types/guide";

const guide: ToolGuide = {
  slug: "base64-encoder",
  intro: [
    "Base64 encoding converts data into a string of plain text characters (A-Z, a-z, 0-9, plus + and /) that can safely pass through systems designed to handle text but not raw binary, like email bodies, JSON payloads, or URL query parameters. This tool encodes any text you type or paste into its Base64 representation, and decodes a Base64 string back to its original text, entirely in your browser.",
    "It's built for developers working with APIs that expect Base64-encoded fields, anyone decoding a Base64 string they found in a config file or JWT token, or anyone needing to safely embed short text inside a system that would otherwise choke on special characters. This tool works on typed or pasted text, not on uploaded files.",
    "Type or paste your content into the box, click Encode or Decode, and copy the result. Everything happens locally in your browser using the standard btoa and atob functions, so nothing you enter is transmitted anywhere.",
  ],
  sections: [
    {
      heading: "What Is Base64 and Why Does It Make Data 33% Larger?",
      paragraphs: [
        "Base64 works by taking 3 bytes (24 bits) of original data and re-encoding them as 4 characters, each representing 6 bits, drawn from a 64-character alphabet. Because 4 output characters always replace 3 input bytes, every Base64-encoded string ends up about 33% larger than the original data it represents, a fixed ratio that holds regardless of what's being encoded.",
        "This size increase is the tradeoff for compatibility: Base64's 64-character alphabet only uses letters, digits, and two symbols, all of which are safe to transmit through systems built for plain ASCII text, like older email protocols that couldn't reliably carry raw binary data. The extra size is a small price for guaranteed compatibility across systems that would otherwise corrupt or reject non-text content.",
        "For example, the 11-character text 'Hello World' encodes to 'SGVsbG8gV29ybGQ=' at 16 characters, roughly a 45% increase for this short example (the exact percentage varies slightly for very short strings due to padding). Longer inputs converge closer to the standard 33% overhead.",
      ],
      bullets: [
        "3 bytes of input become 4 characters of Base64 output",
        "Fixed overhead: encoded output is roughly 33% larger than the original",
        "Alphabet: A-Z, a-z, 0-9, plus '+' and '/' (with '=' used for padding)",
        "Not compression — Base64 always increases size, it never reduces it",
      ],
    },
    {
      heading: "Base64 Encoding vs Encryption: A Common Misconception",
      paragraphs: [
        "Base64 is encoding, not encryption, and it provides zero confidentiality. Anyone who sees a Base64 string can decode it back to the original text in seconds using this tool, a browser console, or a one-line command, with no password or key required. If you see a Base64 string and want to know what it says, decode it here; there's no security barrier to overcome.",
        "This matters because some systems mistakenly present Base64-encoded values, like an API key or a config setting, as though they're protected. They aren't. Base64 exists purely to make binary-safe data pass safely through text-only channels; if you need actual confidentiality, that requires real encryption with a secret key, not encoding.",
      ],
    },
    {
      heading: "Base64 for Images in CSS and HTML (Data URIs)",
      paragraphs: [
        "One common use of Base64 is embedding a small image directly inside HTML or CSS as a data URI, avoiding a separate network request for a tiny icon or background image. A data URI looks like data:image/png;base64, followed by the Base64-encoded image bytes, and browsers render it exactly like a normal externally-linked image.",
        "This trick works best for small, frequently reused assets, like a favicon-sized icon or a simple SVG, since the 33% size overhead and the fact that the encoded string can't be cached separately from the page mean it's a poor fit for large photos or images used across many pages. This text-based tool handles the text side of that workflow (encoding a snippet or decoding a data URI's Base64 portion back to inspect it), though converting binary image files to Base64 typically requires an image-specific converter or a short script.",
      ],
    },
    {
      heading: "Where Base64 Shows Up in Everyday Development",
      paragraphs: [
        "Base64 appears constantly once you know to look for it: the middle segment of a JWT (JSON Web Token) is Base64-encoded JSON, email attachments are Base64-encoded inside the MIME message format, and HTTP Basic Authentication sends credentials as a Base64-encoded 'username:password' string in a request header.",
        "In every one of these cases, decoding reveals plain, readable text; none of them rely on Base64 for security. A JWT's payload can be decoded and read by anyone who has the token, which is exactly why sensitive data shouldn't be put directly into a JWT payload without additional encryption, and why HTTP Basic Auth should only ever be used over an HTTPS connection.",
      ],
      bullets: [
        "JWT tokens: header and payload segments are Base64-encoded JSON",
        "Email (MIME): attachments are Base64-encoded to survive text-only transport",
        "HTTP Basic Authentication: credentials sent as a Base64-encoded string in a header",
        "Data URIs: small images and fonts embedded directly in HTML or CSS",
      ],
    },
    {
      heading: "Troubleshooting Common Base64 Decoding Errors",
      paragraphs: [
        "The most frequent decoding error comes from a truncated or partially copied Base64 string, since a valid string's length must be a multiple of 4 (padded with = characters if needed); pasting only part of a longer string produces an invalid-string error rather than garbled output. Double-check that you copied the complete value, including any trailing = padding characters.",
        "Another common issue is URL-safe Base64, a variant that replaces the standard + and / characters with - and _ to avoid conflicting with URL syntax. This tool expects standard Base64; a URL-safe string will need those characters swapped back before it decodes correctly here.",
      ],
    },
  ],
  useCases: [
    { title: "Decoding a JWT payload", description: "Paste the middle segment of a JSON Web Token to reveal the plain JSON claims it contains." },
    { title: "Preparing a value for an API request", description: "Encode a string to Base64 before sending it in a JSON field or header that an API expects to be Base64-formatted." },
    { title: "Inspecting a data URI", description: "Decode the Base64 portion of a data:image or data:text URI found in HTML or CSS to see what it actually contains." },
    { title: "Decoding HTTP Basic Auth credentials", description: "Decode a Base64-encoded 'username:password' string found in an Authorization header during debugging." },
    { title: "Passing text through a binary-unsafe field", description: "Encode text containing special characters before storing it somewhere that only reliably accepts plain ASCII." },
  ],
  mistakes: [
    { title: "Assuming Base64 provides security", description: "Base64 is encoding, not encryption; anyone can decode it instantly with no key or password required." },
    { title: "Pasting a truncated Base64 string", description: "A valid Base64 string's length is always a multiple of 4; a partial copy-paste produces a decoding error." },
    { title: "Mixing up URL-safe and standard Base64", description: "URL-safe Base64 swaps + and / for - and _; decode a URL-safe string here only after converting those characters back." },
    { title: "Expecting Base64 to reduce file size", description: "Base64 always increases size by about 33%; it's for compatibility, not compression." },
    { title: "Trying to encode or decode a binary file directly in a text box", description: "This tool works on text input; encoding actual binary files (images, PDFs) needs a file-specific converter." },
  ],
  tips: [
    "Never treat a Base64 string as a secure way to hide sensitive data; use real encryption if confidentiality matters.",
    "Copy the entire Base64 string, including trailing '=' padding characters, before pasting it here to decode.",
    "If a decode fails, check whether the string uses URL-safe characters ('-' and '_') instead of standard ('+' and '/').",
    "Reserve Base64-embedded images for small, frequently reused assets rather than large photos.",
    "Remember the 33% size increase when deciding whether to Base64-encode a large payload versus sending it as raw binary.",
  ],
  glossary: [
    { title: "Base64", description: "An encoding scheme that represents binary or text data using a 64-character alphabet of letters, digits, and two symbols, making it safe for text-only systems." },
    { title: "Data URI", description: "A way to embed data, such as a small image, directly inside HTML or CSS using a Base64-encoded string instead of linking to an external file." },
    { title: "JWT (JSON Web Token)", description: "A compact token format with Base64-encoded header and payload segments, commonly used for authentication; the payload is readable by anyone with the token." },
    { title: "Padding", description: "The '=' character(s) added to the end of a Base64 string when the input length isn't an exact multiple of 3 bytes." },
    { title: "MIME", description: "The standard format used for structuring email messages, including how binary attachments are Base64-encoded to travel through text-only mail systems." },
    { title: "URL-safe Base64", description: "A Base64 variant that replaces '+' and '/' with '-' and '_' so the encoded string can be used inside a URL without extra escaping." },
  ],
};

export default guide;
