import type { ToolGuide } from "@/types/guide";

const guide: ToolGuide = {
  slug: "qr-code-generator",
  intro: [
    "A QR code is a two-dimensional barcode that stores text, a web address, or contact details in a grid of black and white squares that any modern smartphone camera can scan and decode instantly. This free QR code generator turns anything you type — a URL, a plain message, a phone number — into a scannable code you can download and use on posters, packaging, business cards, or digital screens.",
    "It's built for small business owners adding a menu or website link to printed materials, event organizers linking to registration pages, and anyone who needs a one-off QR code without installing an app or paying for a subscription service. You can adjust the image size and the error correction level, then download the result as a PNG image.",
    "Every QR code is generated locally in your browser using the open-source qrcode JavaScript library — the text or link you enter is never sent to a server to create the code. This matters if you're generating a QR code for something you'd rather not transmit anywhere, such as an internal document link, a private Wi-Fi password, or personal contact information.",
  ],
  sections: [
    {
      heading: "Static vs. Dynamic QR Codes: What This Tool Generates",
      paragraphs: [
        "A static QR code encodes the actual destination — the URL or text itself — directly into the pattern of the code, permanently. Once you download it, that code will always point to exactly what you typed; if the destination changes later (say, your website moves), the QR code itself has to be regenerated and reprinted. This tool generates static QR codes.",
        "A dynamic QR code instead encodes a short redirect link controlled by a separate service, so the QR code image itself never changes but the destination it redirects to can be updated at any time, and the service can often track how many times it was scanned. Dynamic codes require an ongoing service to manage the redirect, whereas a static code, like the ones this tool creates, works forever with no dependency on any third party — a meaningful advantage for printed materials that need to remain valid indefinitely.",
      ],
    },
    {
      heading: "QR Code Size and Error Correction for Printing",
      paragraphs: [
        "QR codes use error correction so they can still be scanned even if part of the code is smudged, torn, or partially covered by a logo. The QR standard defines four levels — L (about 7% of the code can be damaged and it still scans), M (about 15%), Q (about 25%), and H (about 30%) — with higher levels adding more redundant data, which makes the code's pattern denser and slightly larger for the same content. This tool offers the L, M, and H levels; H is the safest choice for printed materials that might get scuffed, wet, or partially obscured.",
        "As a rule of thumb for print, a QR code needs to be at least about 2 cm (roughly 0.8 inches) per side to scan reliably from a normal phone-scanning distance of around 30 cm (about 12 inches) — smaller than that and phone cameras start to struggle, especially in poor lighting. If the code will be scanned from further away, such as on a large poster or billboard, the minimum size scales up roughly in proportion to the scanning distance.",
      ],
      bullets: [
        "L: recovers from ~7% damage, smallest/densest-looking pattern for the same data",
        "M: recovers from ~15% damage, a reasonable general-purpose default",
        "H: recovers from ~30% damage, best for printed materials or codes with a logo overlay",
        "Minimum recommended print size: about 2 cm per side at a 30 cm scanning distance",
      ],
    },
    {
      heading: "How Much Text or How Long a URL Can a QR Code Hold?",
      paragraphs: [
        "QR codes can technically store thousands of characters, but practically speaking, the more data you encode, the denser and more complex the resulting grid becomes, which makes it harder for a camera to scan reliably, especially at a small printed size. For a URL, this generally isn't a concern, since most web addresses are well under 100 characters.",
        "If you're encoding a long block of plain text rather than a link, the resulting QR code will need to be printed noticeably larger to remain reliably scannable, because a denser pattern needs more physical size for a phone camera to resolve each individual square. For long content, it is usually more practical to encode a short link to a page containing the full text, rather than the text itself.",
      ],
    },
    {
      heading: "PNG Output and What to Download For Printing",
      paragraphs: [
        "This tool exports your QR code as a PNG image at a fixed pixel size you choose (128, 256, or 512 pixels square). PNG is a raster format, meaning it is made of a fixed grid of pixels, which is perfectly fine for screens and standard printing at a reasonable size, but enlarging a small PNG significantly beyond its native resolution can make the edges look soft or blocky when printed very large, such as on a banner or storefront sign.",
        "For most common use cases — flyers, business cards, product packaging, table tents, and digital displays — downloading at 512 pixels gives enough resolution for the code to scan cleanly and print sharply at typical sizes. If you need an extremely large printed QR code (for a billboard or building banner, for example), generate the code at 512 pixels and have a designer vectorize or regenerate it at a higher native resolution.",
      ],
    },
    {
      heading: "Common Uses: URLs, Contact Info, and Plain Text",
      paragraphs: [
        "The most common use of a QR code is encoding a website URL, which is what happens automatically when you type a link into this tool — scanning it opens the link directly in the phone's browser. You can also encode plain text, which phones typically display as a text snippet the user can read or copy, useful for short messages, Wi-Fi details written as text, or simple instructions.",
        "For contact information, many phones will recognize specially formatted text (a vCard format) as a set of contact details and offer to save it directly to the address book, though this depends on the exact formatting and the scanning phone's QR reader behavior rather than being guaranteed for any plain text you type.",
      ],
    },
  ],
  useCases: [
    { title: "Restaurant menus", description: "Link a printed table tent or window sticker to a digital menu page instead of reprinting menus every time prices change." },
    { title: "Business cards and flyers", description: "Add a scannable link to a portfolio, booking page, or contact form directly on a printed card or handout." },
    { title: "Event check-in and registration", description: "Print a QR code on invitations or posters that links straight to a registration or RSVP page." },
    { title: "Product packaging", description: "Link customers from physical packaging to instructions, warranty registration, or a product page without extra text on the box." },
    { title: "Wi-Fi and contact sharing", description: "Generate a code from formatted text so guests or clients can quickly access shared information by scanning instead of typing." },
  ],
  mistakes: [
    { title: "Printing the QR code too small", description: "A code smaller than roughly 2 cm per side often fails to scan reliably at a normal arm's-length distance, especially under poor lighting." },
    { title: "Choosing low error correction for printed materials", description: "The L level offers little tolerance for smudging, folding, or partial damage; H is the safer choice for anything printed and handled physically." },
    { title: "Encoding a URL that might change later", description: "This tool creates static codes with the destination baked in permanently — if the target URL will change, plan to reprint the code rather than relying on the destination staying the same." },
    { title: "Encoding long blocks of text directly", description: "Long text produces a dense, hard-to-scan pattern; link to a page with the full content instead of embedding paragraphs of text in the code." },
    { title: "Assuming every code tracks scans", description: "Static QR codes like the ones generated here have no built-in scan tracking; that requires a separate dynamic QR or link-shortening service." },
  ],
  tips: [
    "Use the H error correction level for anything that will be printed, handled, or exposed to wear.",
    "Test-scan the downloaded code on at least two different phone models before printing it in bulk.",
    "Keep the destination URL short and stable, since this tool's codes encode the exact link permanently.",
    "Download at 512 pixels for most printed uses to keep edges sharp even at business-card or flyer size.",
    "Leave a plain quiet zone (blank margin) of a similar width to one QR module around the printed code so scanners can find its edges.",
  ],
  glossary: [
    { title: "Static QR code", description: "A QR code with its destination encoded permanently in the pattern itself, which never changes once generated." },
    { title: "Dynamic QR code", description: "A QR code that redirects through a service which can update the destination later and often track scans, unlike a static code." },
    { title: "Error correction level", description: "A setting (L, M, Q, or H) controlling how much of a QR code can be damaged or obscured while still scanning correctly." },
    { title: "Quiet zone", description: "The blank margin required around a QR code's pattern so a scanner's camera can correctly detect its boundaries." },
    { title: "vCard", description: "A standardized text format for contact information that many phones can recognize inside a QR code and offer to save directly." },
  ],
};

export default guide;
