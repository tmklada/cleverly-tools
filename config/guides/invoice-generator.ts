import type { ToolGuide } from "@/types/guide";

const guide: ToolGuide = {
  slug: "invoice-generator",
  intro: [
    "An invoice generator lets you build a clean, professional invoice in your browser without opening a spreadsheet template or design tool. You fill in your business details, your client's details, and a list of items or services, and a formatted invoice appears instantly on the right side of the screen, ready to print or save as a PDF. It's built for freelancers, contractors, and small business owners who need to bill a client today, not after setting up accounting software.",
    "Everything you enter stays in your browser for the current session. Nothing is uploaded to a server, which keeps client names, amounts, and contact details private, but it also means the form resets if you refresh the page, so finish and download the invoice before you navigate away. There's no account to create and no monthly fee.",
    "This guide covers what a proper invoice needs, how invoices differ from receipts and quotes, and common billing terms freelancers run into. It is general information about invoicing practices, not legal or tax advice — check with an accountant or your local tax authority for rules that apply to your business.",
  ],
  sections: [
    {
      heading: "What a Legally Valid Invoice Must Include (Invoice Number, Dates, Tax ID)",
      paragraphs: [
        "Most jurisdictions expect a business invoice to include a unique invoice number, the invoice date, your business name and address, the client's name and address, and a description of what was sold with quantities and unit prices. A sequential or dated numbering scheme, like INV-2026-001, makes it easy to track which invoices are outstanding and avoids issuing two invoices with the same number, which can cause bookkeeping headaches later.",
        "Depending on where you operate and how your business is registered, you may also need a tax identification number, a VAT or GST registration number, and a clear breakdown of any tax charged separately from the subtotal. This tool lets you set a single tax rate that's applied to the subtotal and shown as its own line before the total, which covers the common case of one flat sales tax or VAT rate on the whole invoice.",
        "A due date is optional but strongly recommended, since an invoice with no due date gives a client no clear deadline to work against. If you leave the due date blank, many clients will treat the invoice as due whenever it's convenient for them, which is rarely in your favor.",
      ],
      bullets: [
        "Unique invoice number (sequential or dated)",
        "Invoice date and due date",
        "Your business name, address, and contact details",
        "Client name, address, and contact details",
        "Itemized description, quantity, and rate per line",
        "Tax rate and amount, shown separately from the subtotal",
      ],
    },
    {
      heading: "Invoice vs Receipt vs Quote",
      paragraphs: [
        "An invoice is a request for payment sent after work is delivered or agreed to, and it records what's owed and by when. A receipt is issued after payment has actually been received, and it confirms the transaction is complete — the two documents look similar but serve opposite ends of the same transaction, and confusing them can create real bookkeeping errors if a client mistakes an invoice for proof they already paid.",
        "A quote, sometimes called an estimate, comes before any work starts and states a proposed price so the client can decide whether to proceed. Quotes are often non-binding and can change once the actual scope of work becomes clear, whereas an invoice reflects the final, agreed amount for work that has already happened or is confirmed to happen. Using the right document at the right stage keeps client expectations clear and avoids disputes over what was originally promised.",
      ],
    },
    {
      heading: "How to Invoice as a Freelancer (Payment Terms, Net 30, Late Fees)",
      paragraphs: [
        "Payment terms tell the client how long they have to pay, and the most common freelance terms are Net 15, Net 30, or Net 60, meaning payment is due 15, 30, or 60 days after the invoice date. Shorter terms like Net 15 or even due-on-receipt are increasingly common for freelancers and small contractors, since long payment windows tie up cash flow that a small business often can't afford to wait on.",
        "Whatever terms you choose, state them clearly in the notes field so there's no ambiguity about when payment is expected. If you charge a late fee for overdue invoices, mention the rate and how it's calculated directly in the notes or terms text, since a late fee that isn't disclosed on the original invoice is much harder to enforce after the fact.",
        "Sending the invoice promptly after finishing the work, rather than batching several invoices together at the end of the month, tends to get you paid faster, since clients are more likely to prioritize a fresh invoice than one that's been sitting for weeks.",
      ],
      bullets: [
        "Net 15: payment due 15 days after the invoice date",
        "Net 30: payment due 30 days after the invoice date (common default)",
        "Due on receipt: payment expected immediately",
        "State any late fee percentage directly on the invoice",
      ],
    },
    {
      heading: "Building and Sending Your Invoice With This Tool",
      paragraphs: [
        "Start by filling in your business name, address, and email, then do the same for the client in the Client Info panel — both update the invoice preview below in real time. Add an invoice number, invoice date, and due date, then add as many line items as needed with a description, quantity, and rate; the amount and running subtotal recalculate automatically as you type.",
        "Set a tax rate as a percentage if applicable, and use the notes field for payment terms, a thank-you message, or bank details for wire transfer. When everything looks right, click Print / Download Invoice — this opens your browser's print dialog, where you can print a paper copy or choose \"Save as PDF\" to generate a PDF file to email or store.",
      ],
    },
    {
      heading: "Common Invoicing Mistakes That Delay Payment",
      paragraphs: [
        "The most common cause of late payment isn't a difficult client — it's an invoice missing a clear due date, a wrong total from a manual calculation error, or an amount that doesn't match what was verbally agreed. Automating the line-item math, as this tool does, removes the arithmetic errors, but it can't catch a wrong rate or quantity you typed in yourself, so it's still worth a final read-through before sending.",
        "Sending an invoice to the wrong contact, or one that's missing the client's correct billing name, can also send it straight to a black hole in a larger company's accounts payable process. If you're billing a business rather than an individual, ask up front who or which department should receive invoices and whether they require a purchase order number referenced on it.",
      ],
    },
  ],
  useCases: [
    { title: "Billing a freelance client", description: "Send a one-off invoice for a completed project without setting up full accounting software." },
    { title: "Recurring service billing", description: "Reuse the same business details each month and just update the line items and invoice number." },
    { title: "Small business sales", description: "Itemize products sold with quantities and a tax rate for a walk-in or online customer." },
    { title: "Contractor project billing", description: "Break a project into line items like labor, materials, and travel, each billed separately." },
    { title: "Quick quote-to-invoice", description: "Draft a price breakdown for a client before work starts, then reuse the same format once it's done." },
  ],
  mistakes: [
    { title: "Leaving the due date blank", description: "Without a due date, clients have no clear deadline, which is one of the most common causes of slow payment." },
    { title: "Reusing the same invoice number", description: "A duplicate invoice number across clients or months makes bookkeeping and tax filing harder to reconcile." },
    { title: "Forgetting to note payment terms", description: "Late fees or net-30 terms are hard to enforce if they weren't stated on the original invoice." },
    { title: "Refreshing before saving", description: "Since invoice data isn't stored permanently, refreshing or closing the tab before printing or saving loses your entries." },
    { title: "Skipping the tax line for taxable sales", description: "Leaving tax out when it applies can create a mismatch between what's invoiced and what's actually owed." },
  ],
  tips: [
    "Use a consistent invoice numbering scheme, like INV-2026-001, so numbers never repeat across clients.",
    "Always set a due date, even for informal work, since it gives the client a concrete deadline.",
    "State payment terms and any late fee in the notes field, not just verbally.",
    "Double-check quantities and rates before printing, since the tool can't catch a wrong number you typed in.",
    "Save the invoice as a PDF right after finishing it, since the form resets on refresh.",
    "For recurring clients, keep a copy of a finished invoice as a template to speed up next month's billing.",
  ],
  glossary: [
    { title: "Net 30", description: "Payment terms meaning the invoice is due 30 days after the invoice date; Net 15 and Net 60 work the same way with different day counts." },
    { title: "Line item", description: "A single row on an invoice describing one product or service, its quantity, and its rate." },
    { title: "Subtotal", description: "The total of all line items before tax is added." },
    { title: "Purchase order (PO) number", description: "A reference number a business issues before a purchase, which some companies require on the invoice for their accounts payable to process it." },
    { title: "Accounts payable", description: "The department or process within a business responsible for reviewing and paying incoming invoices." },
    { title: "Late fee", description: "An extra charge applied to an invoice paid after its due date, typically a flat amount or a percentage of the total." },
  ],
};

export default guide;
