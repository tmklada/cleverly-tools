import type { ToolGuide } from "@/types/guide";

const guide: ToolGuide = {
  slug: "merge-pdf",
  intro: [
    "Merging PDF files means combining two or more separate PDF documents into a single file, in a specific page order, without changing the content of any page. It is one of the most common office tasks: joining a cover letter with a resume, stitching scanned receipts into one expense report, or combining chapter files into a single ebook. A good PDF merger online should keep fonts, images, and formatting exactly as they were in the source files.",
    "This free PDF combiner is built for anyone who needs to merge PDF files online without installing desktop software: students submitting assignments, freelancers assembling contracts, HR teams merging onboarding paperwork, and small business owners preparing proposals. There is no account to create and no software to download, so it works the same way on a work laptop, a personal Mac, or a shared computer where you cannot install anything.",
    "Every PDF you upload here is processed directly inside your browser using the pdf-lib JavaScript library — nothing is sent to a server. The files never leave your device, which matters when you are merging PDFs that contain contracts, medical forms, financial statements, or other sensitive documents. Once you close the tab, the files and the merged result are gone; there is no copy sitting on a remote server that could later leak.",
  ],
  sections: [
    {
      heading: "How to Merge PDF Files on iPhone or Android Without an App",
      paragraphs: [
        "You do not need a dedicated app to merge PDFs on a phone. Open this page in Safari on iPhone or Chrome on Android, tap the upload area, and pick your files from the Files app, iCloud Drive, Google Drive, or wherever the PDFs are stored. Because the tool is a website, it works the same on mobile as it does on desktop — the page just adapts to a smaller screen.",
        "The main difference on mobile is how you select multiple files: the native file picker on iOS and Android lets you tap several PDFs at once before confirming, exactly like selecting multiple photos. Processing still happens locally on the phone's browser engine, so a merge of a few small PDFs typically finishes in one to three seconds even on a mid-range phone.",
      ],
      bullets: [
        "No app store download or storage space needed",
        "Works in any modern mobile browser (Safari, Chrome, Firefox, Edge)",
        "Files can come from iCloud, Google Drive, Dropbox, or local storage",
      ],
    },
    {
      heading: "Controlling the Order of Files When You Merge",
      paragraphs: [
        "This tool merges whole PDF files, one after another, in the order you set — it does not reorder individual pages inside a single document. After you upload your files, each one appears in a list with up and down arrows next to it. Use those arrows to move a file higher or lower in the queue; the final merged PDF will place each document's pages, in their original internal order, exactly where that file sits in the list.",
        "If you need to change the order of pages inside one existing PDF (for example, moving page 5 before page 2 within the same document), that is a page-reordering task rather than a merge, and you would need a separate split-and-reassemble step first. For most real-world cases — combining a cover page, a report, and an appendix — setting the file order before clicking Merge is all that is required.",
      ],
    },
    {
      heading: "Merging Large or Many-Page PDFs in the Browser",
      paragraphs: [
        "Because merging runs on your device's own processor and memory rather than a remote server, performance depends on your computer, not on server load or a queue of other users' jobs. Combining a handful of PDFs that are a few megabytes each is nearly instant. Merging dozens of files, or files with hundreds of scanned image pages, takes longer and uses more memory, since the browser has to hold every page in memory before writing the final file.",
        "If a merge of very large files seems to stall, try merging them in two smaller batches and then merging those two results together, which keeps peak memory usage lower. Closing other browser tabs before a large merge also helps, since the available memory is shared across everything the browser is currently running.",
      ],
    },
    {
      heading: "What Happens to Bookmarks, Forms, and Metadata After Merging",
      paragraphs: [
        "Merging preserves the visual content of every page — text, images, and layout come through unchanged. Interactive elements are a different story: fillable form fields and internal bookmarks from the original files are not guaranteed to carry over into the combined document, since each source PDF's internal structure is rebuilt into one new file during the merge. If your workflow depends on clickable form fields staying editable after merging, test the result before sending it out.",
        "Document metadata, such as the author name or creation date embedded in each original file, is also not preserved individually — the merged file gets new metadata as a freshly created document. This is normal behavior for any browser-based PDF merger and is worth knowing before you rely on metadata for record-keeping.",
      ],
    },
    {
      heading: "Merge PDF vs. Print to PDF: Which One to Use",
      paragraphs: [
        "A common workaround people try is opening each PDF, printing it to a new PDF one after another, and hoping the pages stack in order — this is slower, error-prone, and can quietly degrade image quality because printing sometimes re-rasterizes pages. A dedicated PDF merge tool instead copies the original page data directly from one file into the new file, which is why quality and file size stay close to the sum of the originals rather than being re-encoded.",
        "Print-based merging can also silently drop or reorder pages if the print dialog's page-range settings are wrong, which is a common source of small merging mistakes. Copying pages directly, as this tool does, avoids that entire class of error.",
      ],
    },
  ],
  useCases: [
    { title: "Job applications", description: "Combine a cover letter, resume, and portfolio samples into one PDF so recruiters only need to open a single attachment." },
    { title: "Expense reports", description: "Merge scanned receipts and invoices into one document before submitting them to accounting or an expense management system." },
    { title: "Contracts and agreements", description: "Join a signed signature page, terms document, and appendix into a single file for a clean, complete legal record." },
    { title: "Academic submissions", description: "Combine a title page, essay, and bibliography exported separately from different word processors into one file for upload." },
    { title: "Real estate paperwork", description: "Merge inspection reports, disclosures, and offer letters into a single packet for buyers, sellers, or lenders." },
  ],
  mistakes: [
    { title: "Uploading files in the wrong order", description: "The merged PDF follows the order shown in the file list, not the order you happened to select them in the file picker — always check and reorder before merging." },
    { title: "Expecting page-level reordering", description: "This tool reorders whole files, not individual pages within one document; mixing up pages inside a single PDF requires a different, page-level tool." },
    { title: "Merging password-protected PDFs directly", description: "Encrypted PDFs generally cannot be read by browser-based tools until they are unlocked first, since the content is inaccessible without the password." },
    { title: "Assuming form fields survive intact", description: "Fillable form fields from the original files are not guaranteed to remain interactive after merging — verify the output before sending it to be filled out." },
    { title: "Merging huge batches on a low-memory device", description: "Very large merges can slow down or fail on phones and older laptops with limited RAM; splitting the job into smaller batches usually resolves this." },
  ],
  tips: [
    "Rename your files before uploading (e.g., 01-cover.pdf, 02-report.pdf) so the intended order is obvious in the file list.",
    "Merge in small batches first to confirm the output looks right before combining a large number of files at once.",
    "Close unused browser tabs before merging many large PDFs to free up memory for the process.",
    "Open the merged PDF immediately after downloading to confirm every page and image transferred correctly.",
    "Keep your original individual PDFs until you have verified the merged file, in case you need to redo the merge in a different order.",
  ],
  glossary: [
    { title: "PDF merging", description: "The process of combining the pages of two or more separate PDF files into a single new PDF document, in a chosen file order." },
    { title: "pdf-lib", description: "The open-source JavaScript library this tool uses to read, copy pages from, and assemble PDF files directly in the browser." },
    { title: "Page range", description: "A specific set of pages within a document, such as pages 1 through 5, sometimes used when only part of a file needs to be included." },
    { title: "Client-side processing", description: "Running a task entirely on the user's own device (in the browser) instead of uploading data to a remote server for processing." },
    { title: "PDF bookmarks", description: "Named links inside a PDF, often listed in a side panel, that jump the reader to a specific section or page of the document." },
  ],
};

export default guide;
