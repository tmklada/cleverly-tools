import type { ToolGuide } from "@/types/guide";

const guide: ToolGuide = {
  slug: "rotate-pdf",
  intro: [
    "A sideways or upside-down PDF usually happens the same way every time: a page got scanned in the wrong orientation, or a phone camera captured a document while held the wrong way, and now every page in the file is turned 90 or 180 degrees from how it should read. This tool fixes that by rotating every page in the document by a single angle — 90, 180, or 270 degrees — and saving the result as a new, correctly oriented PDF you can download immediately.",
    "It's built for the everyday version of this problem: a scanned contract that came out landscape when it should be portrait, a receipt photographed sideways before being converted to PDF, or a document a colleague sent where every page needs turning the same direction. Rotation is applied uniformly across the whole file in one click, which covers the vast majority of real cases, since a bad scan or photo orientation almost always affects an entire document rather than just one page inside it.",
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
        "Open this page in Safari on iPhone or Chrome on Android, tap the upload area, and choose the PDF from your Files app, iCloud Drive, Google Drive, or wherever it's saved. Once it uploads, pick the rotation angle — 90°, 180°, or 270° — using the buttons on the page, then tap the rotate button.",
        "On Android, the corrected PDF saves straight to your Download folder with a confirmation notification. On iPhone, Safari commonly opens the result in a preview tab first; tap the Share icon there and choose 'Save to Files' to keep the corrected version in your Files app, or share it directly from that screen.",
      ],
      bullets: [
        "Upload the sideways PDF from your device or cloud storage",
        "Choose 90°, 180°, or 270° clockwise rotation",
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
      heading: "This Tool Rotates the Whole Document, Not Individual Pages",
      paragraphs: [
        "The rotation angle you choose applies to every page in the file at once. This matches the most common real-world scenario, where a scanner or camera captured an entire document sideways in one pass, so every page needs the same fix.",
        "If only some pages in a mixed document need rotating while others are already correct, the current workflow is to first split out just the misoriented pages using a page-extraction tool, rotate that smaller file, and then rejoin it with the correctly oriented pages using a PDF merge tool. This takes an extra step or two, but it keeps each tool doing one clearly defined job instead of trying to guess which individual pages need which treatment.",
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
    { title: "Standardizing mixed-orientation scans", description: "When an entire batch scan came out rotated the same wrong way, fix all pages at once instead of one at a time." },
  ],
  mistakes: [
    { title: "Confusing in-app viewing rotation with a permanent fix", description: "Rotating a page temporarily in a PDF viewer app doesn't change the underlying file; use this tool to make the rotation stick for everyone who opens it later." },
    { title: "Guessing the wrong direction on the first try", description: "If 90° makes the orientation worse, the page needed the opposite turn — try 270° instead, since the original upload is never altered." },
    { title: "Expecting per-page rotation angles in one pass", description: "This tool applies one chosen angle to every page at once; a document needing different pages rotated differently requires splitting and rejoining separately." },
    { title: "Rotating an already-correct document by mistake", description: "Always preview the current orientation before rotating, since applying a rotation to pages that are already correct will turn them the wrong way." },
    { title: "Uploading a password-protected PDF", description: "Encrypted files generally can't be processed by a browser-based tool until the password protection is removed first." },
  ],
  tips: [
    "Try 90° first if a page looks like it's turned a quarter-turn, and switch to 270° if that made it worse instead of better.",
    "Use 180° for pages that are fully upside down rather than sideways.",
    "Download and check the result before deleting your original file, in case you need to try a different angle.",
    "Split out only the misoriented pages first if a document has a mix of correct and incorrect pages, then rotate that smaller file.",
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
