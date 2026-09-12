import type { ToolGuide } from "@/types/guide";

const guide: ToolGuide = {
  slug: "image-to-base64",
  intro: [
    "Base64 encoding turns the raw binary data of an image file into a long string of plain text characters, which can then be pasted directly into HTML, CSS, or JSON instead of linking out to a separate image file. This image to Base64 converter does that conversion entirely in your browser: upload a JPG, PNG, GIF, WebP, SVG, or BMP, and it produces both the raw Base64 string and the full data URL — the string with a data:image/...;base64, prefix that browsers recognize as an image source on its own.",
    "The tool gives you both formats because they're used differently. The plain Base64 string is what you'd embed inside a JSON payload, a config file, or a database text field, where you're going to build the data:image/... wrapper yourself. The data URL is ready to drop straight into an <img src=\"...\"> attribute or a CSS background-image: url(...) declaration with no further assembly needed.",
    "As with the other image tools here, nothing is uploaded anywhere — the FileReader API reads the file directly in your browser and encodes it locally, so the image never leaves your machine. That also means there's no file size limit imposed by a server upload, only the practical limit of how large a Base64 string is reasonable to work with, which is discussed below.",
  ],
  sections: [
    {
      heading: "When to Use a Base64 Data URI Instead of an Image File (and the 33% Size Penalty)",
      paragraphs: [
        "Base64 encoding is not a compression technique — it's the opposite. Converting binary data into text characters inflates the file size by roughly 33%, because Base64 represents every 3 bytes of original data as 4 text characters. A 30 KB PNG icon becomes roughly a 40 KB string once encoded, and that inflated size is what actually gets sent over the network or stored in a database, not the original file size.",
        "The tradeoff is worth it in specific situations: a small icon or logo that would otherwise cost a separate HTTP request, an image needed inside an email where external images often get blocked by the recipient's client, or a single-file HTML prototype that needs to be fully self-contained with no external assets at all.",
        "It stops being worth it once the image is large. A 33% size penalty on a 20 KB icon is a rounding error; the same 33% penalty on a 500 KB photo adds real, avoidable weight to a page, and unlike a normal image file, that inflated string can't be cached separately by the browser or served from a CDN.",
      ],
    },
    {
      heading: "Base64 Images in CSS, HTML and Email Templates",
      paragraphs: [
        "In CSS, a Base64 data URL slots directly into any property that accepts a url() value: background-image: url(\"data:image/png;base64,iVBOR...\") works exactly like background-image: url(\"logo.png\") but with the image data inlined right in the stylesheet, which is common for small repeating background patterns or icon sprites where a separate file adds an unnecessary request.",
        "In HTML, the data URL goes straight into the src attribute: <img src=\"data:image/png;base64,...\">, and it behaves like any other image tag from there — it can be resized with CSS, given alt text, and styled normally. This is common inside CMS templates or component libraries where a tiny icon needs to ship inline with the markup rather than as a separate asset.",
        "Email is the classic use case, since many email clients block or strip externally hosted images by default until the recipient clicks 'show images,' but a Base64-inlined image renders immediately with no such prompt. The catch is that not every email client supports inline Base64 images consistently — Outlook's desktop versions in particular have historically had partial or no support — so it's worth testing across clients rather than assuming universal support.",
      ],
    },
    {
      heading: "How This Tool Encodes Your Image (Data URL vs Raw Base64 String)",
      paragraphs: [
        "Under the hood, this tool uses the browser's built-in FileReader.readAsDataURL method, which reads the uploaded file and returns a complete data URL string in the format data:[mime type];base64,[encoded data]. The mime type portion is read directly from the file, so a PNG produces data:image/png;base64,... and a JPEG produces data:image/jpeg;base64,....",
        "The 'Base64 String' box below the preview strips off that data:...;base64, prefix and shows only the encoded characters — useful when you're going to construct the data URL yourself, such as inside a JSON field where you'd rather store just the raw string and prepend the correct MIME type at render time. The 'Data URL' box keeps the full string intact, ready to paste directly as-is.",
      ],
    },
    {
      heading: "Base64 and Page Performance: Caching, Render-Blocking, and File Size Limits",
      paragraphs: [
        "A normal image file, linked by URL, is fetched in parallel with other page resources and cached by the browser independently — visit a second page on the same site and that same logo loads instantly from cache. A Base64 image embedded inside a CSS or HTML file has no such independent cache entry; it's downloaded again every time the file containing it is downloaded, even if the underlying stylesheet or page hasn't otherwise changed.",
        "There's also no hard technical size limit enforced by this tool, but practical limits apply on the receiving end: some browsers and older versions of Internet Explorer historically capped data URL length, and very large Base64 strings inside a stylesheet can noticeably slow CSS parsing, since the browser has to hold and decode that inflated text before it can render anything using it.",
      ],
    },
    {
      heading: "When Not to Use Base64 (Large Photos, CMS Content Images)",
      paragraphs: [
        "Full-size photos, hero images, product photography, and any content image over roughly 10-20 KB are almost always better served as a normal linked file. Linked images benefit from browser caching, parallel loading, CDN distribution, and lazy loading, none of which a Base64-inlined image gets — and the 33% size penalty compounds the larger the source image is.",
        "The practical rule of thumb: reach for Base64 encoding for small, repeated, or structurally necessary assets — icons, small logos, email images, UI sprites — and keep everything else as a normal image file referenced by URL.",
      ],
    },
  ],
  useCases: [
    { title: "Inline email images", description: "Encode a small logo or icon as a Base64 data URL so it displays immediately in email clients that block external images by default." },
    { title: "Self-contained HTML prototypes", description: "Embed an icon or small graphic directly in a single HTML file with no external asset dependencies, useful for demos and quick mockups." },
    { title: "CSS icon and background sprites", description: "Inline a small repeating background pattern or icon directly in a stylesheet's background-image property to avoid an extra HTTP request." },
    { title: "JSON configs and API payloads", description: "Store a small image as a Base64 string inside a JSON field or API response, where a separate file reference isn't practical." },
    { title: "Database-stored thumbnails", description: "Save a small avatar or thumbnail directly as a text string in a database column instead of managing a separate file storage system." },
    { title: "Offline or air-gapped documentation", description: "Embed diagrams or screenshots directly in a markdown or HTML document so it stays fully readable without an internet connection or asset folder." },
  ],
  mistakes: [
    { title: "Base64-encoding a full-size photo", description: "Photos and large content images get roughly 33% heavier when encoded and lose the ability to be cached or loaded in parallel — keep them as normal linked files." },
    { title: "Forgetting the size penalty when comparing file sizes", description: "The encoded string is always larger than the original file; budget for that inflation rather than assuming the Base64 output matches the source file size." },
    { title: "Inlining the same image on many pages", description: "A linked image file is cached once and reused across every page that references it; a Base64 copy is re-downloaded with every page or stylesheet that contains it." },
    { title: "Assuming every email client renders inline images identically", description: "Base64 image support varies across email clients, especially older desktop Outlook versions — test important email templates across multiple clients." },
    { title: "Copying the raw Base64 string where a full data URL is needed", description: "An <img> src or CSS url() needs the complete data:[mime];base64, prefix — copy the Data URL box, not the Base64 String box, for those uses." },
  ],
  tips: [
    "Reserve Base64 encoding for small icons, logos, and email images rather than full-size photos.",
    "Copy the Data URL box when pasting directly into an <img> src or CSS url(), and the Base64 String box when building your own data URL elsewhere.",
    "Budget for roughly 33% more size than the original file when estimating how much a Base64 string will add to a page.",
    "Test Base64-embedded images across multiple email clients before relying on them in a production email template.",
    "Keep large content images as normal linked files so they benefit from browser caching and parallel loading.",
    "Use Base64 for single-file prototypes or offline documents where avoiding external asset files matters more than page weight.",
  ],
  glossary: [
    { title: "Base64", description: "An encoding scheme that represents binary data as plain text characters, commonly used to embed files like images directly inside HTML, CSS, or JSON." },
    { title: "Data URL / Data URI", description: "A string beginning with data: that encodes a file's content and MIME type directly in the URL itself, letting a browser render it without a separate file request." },
    { title: "MIME type", description: "A label identifying a file's format, such as image/png or image/jpeg, used in a data URL to tell the browser how to interpret the encoded data." },
    { title: "Render-blocking", description: "A delay in displaying page content caused by the browser needing to fully download and parse a resource, such as a stylesheet containing a large Base64 string, before rendering." },
    { title: "HTTP request", description: "A single network call a browser makes to fetch a resource like an image; Base64 encoding avoids an extra request by embedding the data directly in the page." },
  ],
};

export default guide;
