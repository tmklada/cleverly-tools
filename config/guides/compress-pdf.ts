import type { ToolGuide } from "@/types/guide";

const guide: ToolGuide = {
  slug: "compress-pdf",
  intro: [
    "PDF compression reduces a document's file size so it is faster to email, quicker to upload, and lighter to store, without changing what is printed on each page. The need comes up constantly: an email provider rejecting a 20 MB attachment, a government portal capping uploads at 5 MB, or a company shared drive that fills up because every scanned contract is stored at full resolution.",
    "This tool compresses PDFs entirely inside your browser rather than on a remote server. It reads the PDF's internal structure with the pdf-lib library and rewrites it in a more compact form, then hands you the smaller file to download — your document is never uploaded anywhere. That makes it a reasonable option for people who want to shrink a PDF quickly without sending contracts, tax documents, or medical records to a third-party server.",
    "It is worth setting expectations correctly: browser-based PDF compression is genuinely more limited than what a dedicated desktop tool like Adobe Acrobat can do, because deep image recompression and font subsetting are heavier operations. This tool works best on PDFs that have redundant internal structure (common with files re-saved multiple times or exported from certain office software) and will do little to a PDF that is already tightly optimized.",
  ],
  sections: [
    {
      heading: "Compress PDF to Under 1 MB or 100 KB for Email and Government Portals",
      paragraphs: [
        "Many email systems block attachments over 20-25 MB, and government or university portals often cap uploads far lower, sometimes at 1 MB or even a few hundred kilobytes. Whether a PDF can actually reach that target depends almost entirely on what is inside it: a text-only contract of a few pages is often already under 200 KB, while a 20-page scanned document full of high-resolution photos might start at 15 MB and be difficult to bring under 1 MB without reducing image quality.",
        "If your file does not shrink enough after compression, the biggest lever is usually the scan resolution or embedded photos, not the PDF wrapper itself. Scanning documents at 150-200 DPI instead of 300-600 DPI before creating the PDF in the first place produces a dramatically smaller starting file, which is often more effective than compressing an already-scanned high-resolution PDF after the fact.",
      ],
      bullets: [
        "A 300 DPI scanned page can be 3-5x larger than the same page at 150 DPI",
        "Text-based PDFs (not scanned images) compress far more predictably",
        "Removing unused embedded fonts or unnecessary pages reduces size before compression even runs",
      ],
    },
    {
      heading: "Lossless vs. Lossy PDF Compression Explained",
      paragraphs: [
        "Lossless compression rewrites the file more efficiently without discarding any visual information — every pixel and character stays exactly as sharp as before, but redundant internal data is stripped out. This tool performs a lossless-style structural cleanup: it rebuilds the PDF's internal object structure with pdf-lib, which can shrink files that carry duplicate or bloated internal objects, while leaving the actual images and text completely untouched.",
        "Lossy compression, by contrast, actually re-encodes embedded images at a lower quality or resolution, which is how tools achieve the largest size reductions (sometimes 60-80%) on image-heavy PDFs, at the cost of some visible quality loss if pushed too far. Because this tool does not re-encode images, savings on scanned or photo-heavy PDFs will typically be smaller than what a lossy image-recompression tool can achieve.",
      ],
    },
    {
      heading: "Why Some PDFs Barely Shrink After Compression",
      paragraphs: [
        "It is normal to compress a PDF and see little to no size reduction, or occasionally a file that is a few bytes larger than the original. This happens when the source PDF was already saved efficiently — for example, by Adobe Acrobat, a modern printer driver, or another compression tool — leaving little redundant structure left to remove. A PDF that has already been compressed once will rarely shrink much further with a second lossless pass.",
        "The files most likely to see a meaningful reduction are older PDFs, PDFs re-saved many times by different editing tools, and PDFs created by combining multiple documents (such as a merged file), since these often accumulate duplicate fonts, images, or metadata that a structural rewrite can clean up.",
      ],
    },
    {
      heading: "Compress PDF vs. Compress the Images Inside It",
      paragraphs: [
        "If a PDF is large mainly because of embedded photos and this tool's structural compression does not bring it down enough, a more effective approach is to reduce the size of the images before they go into the PDF at all. Exporting scanned pages as JPEG at 70-80% quality, or resizing photos to the resolution actually needed for on-screen or standard printing (150-300 DPI), then rebuilding the PDF, usually produces a smaller final file than compressing the finished PDF after the fact.",
        "For PDFs made up mostly of standalone images rather than mixed documents, it can be faster to extract the images, compress them individually with an image compressor, and reassemble the PDF, rather than relying on PDF-level compression alone.",
      ],
    },
    {
      heading: "Is It Safe to Compress Confidential or Legal PDFs Online?",
      paragraphs: [
        "Because this tool processes the file entirely in your browser and never transmits it to a server, there is no upload step where a confidential contract, tax return, or medical record could be intercepted or stored remotely. This is a meaningfully different privacy model from web tools that require uploading your file to a server for processing, and it is one of the main reasons to choose a browser-based compressor for sensitive documents.",
        "The tradeoff is processing power: since your own device does the work instead of a server farm, very large files (over roughly 50-100 MB) can be slower to process or use more memory than they would on a dedicated server-side compression service.",
      ],
    },
  ],
  useCases: [
    { title: "Email attachments", description: "Shrink a scanned contract or report below your email provider's attachment limit so it sends on the first try instead of bouncing." },
    { title: "Government and university portals", description: "Meet strict upload size caps for applications, tax filings, or admissions documents that reject files over a set size." },
    { title: "Website downloads", description: "Reduce the size of PDF brochures, menus, or spec sheets hosted on a website so they load faster for visitors." },
    { title: "Cloud storage limits", description: "Free up space in a shared drive or inbox by compressing archived PDFs that rarely need to stay at full original size." },
    { title: "Faster sharing over messaging apps", description: "Bring a PDF down to a size that transfers quickly over WhatsApp, Slack, or other apps with attachment size limits." },
  ],
  mistakes: [
    { title: "Expecting the same results as Adobe Acrobat", description: "Browser-based compression rewrites the file's internal structure but does not re-encode images the way professional desktop tools do, so savings on photo-heavy PDFs are often smaller." },
    { title: "Compressing an already-optimized PDF", description: "A PDF that has already been compressed once, or was created by modern software, may show little or no size reduction on a second pass." },
    { title: "Not checking the actual bottleneck", description: "If a PDF is large because of high-resolution scans, compressing the finished PDF helps less than reducing image resolution or quality before the PDF was created." },
    { title: "Compressing instead of removing content", description: "If a PDF contains unnecessary pages, duplicate scans, or blank pages, deleting them first will often reduce size more than compression alone." },
  ],
  tips: [
    "Compress scanned documents at 150-200 DPI when possible instead of 300+ DPI to start with a smaller file.",
    "If a PDF barely shrinks, it was likely already saved efficiently — try trimming unused pages or images instead.",
    "For image-heavy PDFs, compress the photos before building the PDF for a bigger size reduction than compressing after the fact.",
    "Always compare the compressed file's page count and image quality against the original before deleting your source file.",
    "Keep the original PDF until you have confirmed the compressed version opens correctly in the software you plan to send it to.",
  ],
  glossary: [
    { title: "DPI (dots per inch)", description: "A measure of scan or print resolution; higher DPI means more detail and a larger file size, especially for scanned pages." },
    { title: "Lossless compression", description: "A method of reducing file size that removes redundant data without discarding any visual quality from images or text." },
    { title: "Lossy compression", description: "A method of reducing file size by discarding some image detail, trading a degree of quality for a larger reduction in size." },
    { title: "PDF object stream", description: "An internal structure PDFs use to group multiple objects together; how these are organized affects the file's final size." },
    { title: "Client-side processing", description: "Performing a task, such as compression, entirely on the user's own device in the browser rather than on a remote server." },
  ],
};

export default guide;
