import type { ToolGuide } from "@/types/guide";

const guide: ToolGuide = {
  slug: "rotate-pdf",
  intro: [
    "A sideways or upside-down PDF usually happens the same way every time: a page got scanned in the wrong orientation, or a phone camera captured a document while held the wrong way, and now pages in the file are turned 90 or 180 degrees from how they should read. This tool fixes that by rotating pages by 90, 180, or 270 degrees — or resetting them back to 0 — and saving the result as a new, correctly oriented PDF you can download immediately.",
    "It's built for the everyday version of this problem: a scanned contract that came out landscape when it should be portrait, a receipt photographed sideways before being converted to PDF, or a report where only pages 5 to 7 came out wrong. You can apply one angle to the whole document, type a selection like 2, 5-7 to rotate just those pages, or switch to page-by-page mode and give each page its own angle in a single pass.",
    "The rotation happens entirely inside your browser using the pdf-lib library — no upload to a server, no account, and no software to install. Because the file never leaves your device, this works just as well for sensitive documents like signed contracts or medical forms as it does for a casual scan you just want turned right-side up.",
  ],
  sections: [
    {
      heading: "Rotate PDF Pages Permanently vs Just for Viewing",
      paragraphs: [
        "Most PDF readers, including Adobe Acrobat Reader and the built-in preview apps on iPhone and Android, let you rotate a page temporarily just to view it more comfortably — but that rotation lives only inside that viewer session. Close the file and reopen it later, or send it to someone else, and it snaps back to its original sideways orientation, because nothing about the file itself changed.",
        "This tool does the opposite: it rewrites the actual page rotation data stored inside the PDF file, so the new orientation is baked into the document permanently. Once you download the rotated file, it will open right-side up in any PDF reader, on any device, for anyone you share it with, with no extra steps needed on their end.",
      ],
    },
    {
      heading: "How to Rotate a PDF on iPhone or Android",
      paragraphs: [
        "Open this page in Safari on iPhone or Chrome on Android, tap the upload area, and choose the PDF from your Files app, iCloud Drive, Google Drive, or wherever it's saved. Once it uploads, choose whether to rotate all pages, a typed selection like 2, 5-7, or each page individually, then pick the angle — 90°, 180°, 270°, or reset to 0° — and tap the rotate button.",
        "On Android, the corrected PDF saves straight to your Download folder with a confirmation notification. On iPhone, Safari commonly opens the result in a preview tab first; tap the Share icon there and choose 'Save to Files' to keep the corrected version in your Files app, or share it directly from that screen.",
      ],
      bullets: [
        "Upload the sideways PDF from your device or cloud storage",
        "Choose all pages, a selection like 2, 5-7, or page-by-page control",
        "Choose 90°, 180°, or 270° clockwise rotation, or reset to 0°",
        "Tap Rotate and download the corrected file",
      ],
    },
    {
      heading: "90°, 180°, or 270°: Picking the Right Angle",
      paragraphs: [
        "If a page is rotated a quarter-turn from correct — text running up the side of the screen instead of across it — 90° clockwise usually fixes it, though if that makes it worse rather than better, the page actually needed the opposite direction, which 270° (three quarter-turns clockwise, equivalent to one quarter-turn counterclockwise) will correct instead.",
        "180° is for pages that are fully upside down, where the text reads correctly but everything is flipped top-to-bottom and left-to-right. There's no harm in trying an angle, checking the downloaded result, and re-running with a different one if the first guess wasn't quite right — the original upload isn't modified, so you can experiment freely.",
      ],
    },
    {
      heading: "Rotating the Whole Document, a Page Range, or Each Page Separately",
      paragraphs: [
        "All pages mode applies one angle to every page at once, which matches the most common real-world scenario, where a scanner or camera captured an entire document sideways in one pass. Some pages mode takes a typed selection — 2, 5-7 uses the same comma-and-dash syntax as the Split PDF tool — and leaves every other page exactly as it was.",
        "Page by page mode shows a grid of numbered chips, one per page. Tapping a chip cycles it through keep, 90°, 180°, 270°, and reset, so a document where page 3 is upside down and page 8 is sideways can be fixed in one pass with different angles. There is no visual thumbnail of each page, because rendering page images in the browser would require an extra library this tool deliberately doesn't load — instead each chip prints the page's current angle and the angle it will end up at, so you can plan the fix from the numbers.",
        "Rotation is applied on top of whatever angle a page already carries. A page sitting at 90° that you rotate by another 90° ends up at 180°, not back at 90° — which is what you want when correcting a scan in two steps, and is exactly the detail many online rotators get wrong. If you'd rather start clean, the reset option sets the chosen pages to 0° regardless of where they were.",
      ],
    },
    {
      heading: "Why a Rotated PDF Might Still Look Wrong in Some Apps",
      paragraphs: [
        "Occasionally a PDF page has its content drawn in one orientation but carries separate rotation metadata that some older viewers ignore or interpret differently than newer ones. In rare cases, a file rotated correctly here might still display oddly in one specific older application, even though the file itself is now standards-compliant.",
        "If that happens, opening the downloaded file in a different, more current PDF reader (like a recent version of Adobe Reader, Preview on Mac, or a mobile PDF app) is usually enough to confirm the rotation is actually correct, and the issue is isolated to that one older viewer rather than the file.",
      ],
    },
  ],
  useCases: [
    { title: "Fixing scanned documents", description: "Correct an entire contract, form, or report that a scanner captured sideways or upside down, so it reads normally in any viewer." },
    { title: "Straightening phone-photographed pages", description: "Turn a document photographed with a phone held the wrong way into a properly oriented, shareable PDF." },
    { title: "Preparing files for printing", description: "Rotate a PDF before sending it to a printer that expects a specific page orientation, avoiding sideways printouts." },
    { title: "Correcting receipts and invoices before filing", description: "Fix the orientation of scanned receipts or invoices so they display correctly in accounting software or shared folders." },
    { title: "Standardizing mixed-orientation scans", description: "When some pages came out sideways and others upside down, set a different angle per page and fix the whole batch in one pass." },
  ],
  mistakes: [
    { title: "Confusing in-app viewing rotation with a permanent fix", description: "Rotating a page temporarily in a PDF viewer app doesn't change the underlying file; use this tool to make the rotation stick for everyone who opens it later." },
    { title: "Guessing the wrong direction on the first try", description: "If 90° makes the orientation worse, the page needed the opposite turn — try 270° instead, since the original upload is never altered." },
    { title: "Forgetting that rotation adds to the current angle", description: "Applying 90° to a page already stored at 90° leaves it at 180°, not 90°; use the reset option if you want a page set to a specific angle from scratch." },
    { title: "Rotating an already-correct document by mistake", description: "Always preview the current orientation before rotating, since applying a rotation to pages that are already correct will turn them the wrong way." },
    { title: "Uploading a password-protected PDF", description: "Encrypted files generally can't be processed by a browser-based tool until the password protection is removed first." },
  ],
  tips: [
    "Try 90° first if a page looks like it's turned a quarter-turn, and switch to 270° if that made it worse instead of better.",
    "Use 180° for pages that are fully upside down rather than sideways.",
    "Download and check the result before deleting your original file, in case you need to try a different angle.",
    "Use Some pages or Page by page mode when only part of a document is misoriented, instead of rotating everything.",
    "Open the rotated file in more than one PDF app if it looks off in one viewer, to confirm whether the file or the viewer is the issue.",
  ],
  glossary: [
    { title: "Page rotation", description: "Data stored inside a PDF page describing how it should be displayed — 0°, 90°, 180°, or 270° — independent of the page's actual content." },
    { title: "pdf-lib", description: "The open-source JavaScript library this tool uses to read and rewrite page rotation directly inside the browser." },
    { title: "Clockwise rotation", description: "The direction pages turn when you apply 90°, 180°, or 270° here, matching how most scanners and PDF standards describe rotation." },
    { title: "Client-side processing", description: "Running the entire rotation process on your own device instead of uploading the file to a remote server." },
    { title: "Viewer-only rotation", description: "A temporary display rotation applied inside a PDF reader app that does not change the saved file itself." },
  ],
};

export default guide;
