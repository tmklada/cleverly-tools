import type { ToolGuide } from "@/types/guide";

const guide: ToolGuide = {
  slug: "split-pdf",
  intro: [
    "Splitting a PDF means pulling specific pages out of a larger document and saving them as their own separate file, without touching the original. This tool lets you type in the pages you want — a single page, several individual pages, or several ranges at once like 1-3, 5, 8-10 — and it builds new PDFs containing just those pages, in order, ready to download. You choose whether each range becomes its own file, whether everything lands in one combined file, or whether every page is split into its own PDF. The rest of the original document is left completely untouched on your device.",
    "This is the tool for anyone who has one long PDF and only needs part of it: pulling a single signed page out of a 40-page contract, saving just the appendix from a report, or grabbing one chapter out of a scanned textbook to share separately. It works entirely inside your browser using the pdf-lib library, so the file you upload never gets sent anywhere — everything happens locally, then the extracted result downloads straight to your device.",
    "Because there's no server involved, there's also no waiting in a queue, no file size cap tied to a free plan, and no risk of a sensitive document — a contract, a medical record, a tax form — passing through a company's servers on its way to being split. Once you close the tab, nothing from the process remains anywhere except the files you chose to download.",
  ],
  sections: [
    {
      heading: "Split a PDF Into Separate Pages vs Extract a Page Range",
      paragraphs: [
        "The tool offers three modes, so the same page numbers can produce very different results. \"Split into separate PDFs\" turns every range you list into its own file: type 1-3, 5, 8-10 and you get three PDFs back in one pass, one per range. \"Extract into one PDF\" takes all the pages you listed and merges them into a single combined document instead. To pull out a range, like an appendix spanning pages 20 to 25, type 20-25 and you'll get one new PDF containing those six pages in order.",
        "If what you actually want is a separate file for every individual page, use the third mode, \"Every page its own PDF\" — one click turns a 30-page document into 30 single-page files. Each result appears in a list with its own download button, plus a Download all button that saves them one after another, so a multi-file split is still a single trip through the tool.",
      ],
    },
    {
      heading: "How the Page Range Syntax Works: Commas, Dashes, and Combinations",
      paragraphs: [
        "The input box accepts three patterns, and you can mix all of them in one entry separated by commas. A single number like 3 pulls just page 3. A dash between two numbers, like 5-9, pulls every page from 5 through 9 inclusive. Combining them, like 1,3,5-9,12, covers page 1, page 3, pages 5 through 9, and page 12 — in extract mode they all land in one output file, and in split mode each of those four entries becomes its own PDF.",
        "Within a single output file the tool removes duplicate page numbers and sorts everything into ascending order, regardless of what order you typed them in, so entering 9,1,5-7 extracts the same pages as 1,5-7,9. Anything the tool can't act on is reported instead of being silently skipped: a page number beyond the document's length, a backwards range like 9-3, a stray comma, or text that isn't a number each produce a specific message under the input box naming the entry at fault.",
      ],
      bullets: [
        "Single page: 3",
        "Range: 5-9",
        "Combined: 1,3,5-9,12",
        "Multiple ranges in split mode produce one PDF each: 1-3, 5, 8-10",
        "Duplicates are removed automatically; invalid or out-of-range entries are flagged with an inline message",
      ],
    },
    {
      heading: "How to Split a PDF on iPhone or Android",
      paragraphs: [
        "On a phone, open this page in Safari (iPhone) or Chrome (Android), tap the upload area, and select your PDF from the Files app, iCloud Drive, Google Drive, or wherever it's stored. Once uploaded, the tool reads the file and shows you the total page count so you know what range you're working with.",
        "Type the pages you want into the text field the same way you would on desktop, then tap the extract button. On Android, the new PDF saves directly to your Download folder; on iPhone, Safari may open it in a preview tab first, where you can tap Share and choose Save to Files to keep it in your Files app.",
      ],
    },
    {
      heading: "What Happens to Page Numbering, Bookmarks, and Quality After Splitting",
      paragraphs: [
        "The extracted pages keep their original content exactly as it was — text, images, and layout are copied over without re-rendering, so there's no quality loss from splitting a PDF this way. What does reset is the page numbering shown by your PDF viewer's own page counter: if you extract pages 10-15 from a 50-page document, your new file will show them as pages 1 through 6, since it's now a standalone six-page document.",
        "Internal bookmarks and any table-of-contents links from the original file are not guaranteed to carry over, since the new PDF is rebuilt from scratch using only the selected pages. If the original document had printed page numbers baked into the page content itself (as part of the visible text), those stay visible even though the file's own internal numbering has reset.",
      ],
    },
    {
      heading: "Common Reasons a Split PDF Comes Out Empty or Wrong",
      paragraphs: [
        "The most frequent issue is a typo in the page range, like entering a dash the wrong way around (9-5 instead of 5-9) or mistyping a comma as a period. The tool catches these and explains them under the input box rather than producing an empty file, but it's still worth checking the page count shown after upload against the range you typed. The other common surprise is picking the wrong mode: split mode gives you one file per range, while extract mode combines the same ranges into a single document.",
        "Password-protected or encrypted PDFs generally won't load correctly in a browser-based tool like this one, since the content is locked until the password is supplied elsewhere first. If your upload fails to show a page count at all, try opening the file in a PDF reader first to confirm it isn't corrupted or encrypted.",
      ],
    },
  ],
  useCases: [
    { title: "Extracting a signed page from a contract", description: "Pull just the signature page out of a long agreement to send as quick proof, without forwarding the entire document." },
    { title: "Saving one chapter from a scanned book or report", description: "Grab a specific range of pages from a large scanned PDF to share with a colleague who only needs that section." },
    { title: "Separating an appendix from the main document", description: "Extract the appendix or supporting exhibits from a report so they can be reviewed or filed as a standalone attachment." },
    { title: "Pulling a single invoice from a batch scan", description: "When several invoices were scanned into one long PDF, extract the specific page numbers for the one invoice you need to send." },
    { title: "Creating a smaller file for email attachments", description: "Extract just the relevant pages from a huge document so the resulting file is small enough to email, instead of sending the whole thing." },
  ],
  mistakes: [
    { title: "Reversing the order in a page range", description: "Typing 9-5 instead of 5-9 is rejected with a message asking you to put the smaller number first; the smaller number always goes first in a dash range." },
    { title: "Choosing the wrong mode for the job", description: "Split mode turns each range you list into its own PDF, while extract mode merges all the listed pages into one file — same input, very different output." },
    { title: "Not checking the total page count first", description: "The tool shows the page count right after upload — use it to confirm your page numbers are actually within range before extracting." },
    { title: "Uploading a password-protected PDF", description: "Encrypted files generally can't be read by browser-based tools until the password is removed through a separate step." },
    { title: "Assuming bookmarks carry over automatically", description: "Internal links and bookmarks from the original document aren't guaranteed to survive in the newly extracted file." },
  ],
  tips: [
    "Check the page count shown right after upload before typing your range, to avoid off-by-one mistakes.",
    "Use commas to combine individual pages and ranges in a single run, like 1,4,8-10 — one file each in split mode, one combined file in extract mode.",
    "Use the \"Every page its own PDF\" mode when you need each page saved as a separate file, then hit Download all.",
    "Open the extracted PDF right after downloading to confirm the right pages came through before deleting anything.",
    "Keep the original file until you've verified the split output, in case you need to re-extract with a different range.",
  ],
  glossary: [
    { title: "Page range", description: "A set of consecutive pages specified with a dash, such as 5-9, meaning every page from 5 through 9 inclusive." },
    { title: "pdf-lib", description: "The open-source JavaScript library this tool uses to read and copy pages from a PDF directly inside the browser." },
    { title: "Page extraction", description: "Pulling specific pages out of a source PDF and saving them as a new, independent document." },
    { title: "Client-side processing", description: "Running the entire split operation on your own device rather than uploading the file to a remote server." },
    { title: "PDF bookmarks", description: "Named links inside a PDF, often shown in a side panel, that jump a reader to a specific page or section." },
  ],
};

export default guide;
