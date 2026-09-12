import type { ToolGuide } from "@/types/guide";

const guide: ToolGuide = {
  slug: "csv-to-json",
  intro: [
    "A spreadsheet export is easy for a person to read but awkward for code to consume — most APIs, scripts, and no-code automation tools expect JSON, not rows and columns. This CSV to JSON converter parses pasted CSV text and turns it into a proper JSON array, using the first row as object keys by default so every row below becomes a structured record with named fields.",
    "It handles the CSV details that trip up a naive comma-split: values wrapped in quotes, commas that appear inside a quoted field, and doubled quote characters used to escape a literal quote. You also get to choose the delimiter — comma, semicolon, or tab — since not every CSV export actually uses commas, especially files produced by spreadsheet tools set to a European locale.",
    "Everything happens in your browser; there's no upload step, so you paste the CSV text directly into the input box. The output is a standard JSON array you can copy to your clipboard or download as a .json file, ready to drop into an API test, a script, or a database seed file.",
  ],
  sections: [
    {
      heading: "How This Parser Reads Quoted Fields, Commas, and Escaped Quotes",
      paragraphs: [
        "Rather than blindly splitting each line on every comma, the parser reads character by character and tracks whether it's currently inside a quoted field. A value like \"Miller, John\" stays as one field even though it contains a comma, because the parser only treats the delimiter as a column break when it's outside a pair of quotes.",
        "A literal quote character inside a quoted value is represented by two quote characters in a row — \"\"like this\"\" — and the parser collapses that pair back down to a single quote in the output. This is the same escaping convention used by Excel, Google Sheets, and most CSV libraries, so files exported from those tools should paste in and convert cleanly without manual cleanup.",
      ],
    },
    {
      heading: "Choosing the Right Delimiter: Comma, Semicolon, or Tab",
      paragraphs: [
        "Not every CSV file actually uses commas. Spreadsheet software set to certain regional formats exports semicolon-separated files instead, since a comma is already used as the decimal separator in those locales, and many database and BI tools export tab-separated data by default. This tool doesn't auto-detect which one your file uses — you select it manually with the delimiter buttons before converting.",
        "If the JSON output comes back with every row squeezed into a single field, that's the first thing to check: the file most likely uses a different delimiter than the one currently selected. Opening the raw CSV in a plain text editor for a few seconds is usually enough to confirm which character is actually separating the columns.",
      ],
    },
    {
      heading: "With Headers vs Without: What Changes in the JSON Output",
      paragraphs: [
        "With \"First row as headers\" checked, the first line of your CSV is treated as field names and every following row becomes an object keyed by those names — for example name,age,city on the first line turns each data row into {\"name\": ..., \"age\": ..., \"city\": ...}. This is the right setting for almost any normal spreadsheet export.",
        "Unchecking it treats every line, including the first, as plain data, and each row instead becomes a plain array of string values in their original column order, with no field names attached at all. Use this mode for raw data that never had a header row to begin with, or when you specifically want positional arrays rather than named objects.",
      ],
    },
    {
      heading: "Every Value Comes Out as a String — Even Numbers",
      paragraphs: [
        "This converter doesn't try to guess data types: a column containing 28 in the spreadsheet becomes \"age\": \"28\" in the JSON, a quoted string, not a number. The same goes for anything that looks like a boolean or a date — everything stays text exactly as it appeared in the CSV cell.",
        "That's usually fine for copying data into documentation or a quick API test, but if you're feeding the output into code that expects real numbers or booleans, plan on a small conversion step afterward — something like mapping Number(row.age) in JavaScript — rather than assuming the JSON types already match what a database column expects.",
      ],
    },
    {
      heading: "Common CSV Problems: Mismatched Column Counts, Blank Lines, Trailing Commas",
      paragraphs: [
        "Fully blank lines in your pasted CSV are skipped automatically before parsing begins, so stray empty rows at the end of an export won't turn into empty objects. Rows with a mismatched number of values compared to the header row are handled silently rather than flagged: a row with fewer values than there are headers gets empty strings for the missing trailing fields, and a row with more values than headers has the extras dropped without a warning.",
        "That silent handling means a spreadsheet with a ragged edge — one row accidentally missing a trailing comma, or an extra stray value typed into a cell past the last real column — won't produce an error message, only a JSON object that's subtly short a field or missing data you expected. Scanning a few converted rows against the original spreadsheet is worth doing before you trust the output for anything important.",
      ],
    },
    {
      heading: "Pasting CSV Instead of Uploading a File",
      paragraphs: [
        "There's no file-upload button on this tool — you paste the CSV content directly into the text box. If your data lives in an actual .csv file, open it first in a text editor, spreadsheet app, or your terminal, select all, and copy it in rather than looking for a browse-and-select option.",
        "For very large files this means copy-paste is doing the heavy lifting, which can get slow or hit clipboard limits in some browsers well before it hits any limit in the parser itself; splitting a huge export into smaller chunks and converting each separately is a practical workaround if you run into that.",
      ],
    },
  ],
  useCases: [
    { title: "Prepping API test payloads", description: "Convert a spreadsheet of test records into a JSON array you can paste directly into a request body or a testing tool." },
    { title: "Feeding CSV exports into automation tools", description: "Turn a CSV pulled from Google Analytics, a form export, or a CRM into JSON for a no-code workflow that expects structured objects." },
    { title: "Seeding a database with sample data", description: "Convert a spreadsheet of sample records into JSON to paste into a seed script or a document database's import tool." },
    { title: "Quick data inspection", description: "Eyeball a messy CSV export as structured JSON to spot missing values or formatting issues before writing real processing code." },
    { title: "Converting semicolon-delimited exports", description: "Handle CSVs from regional spreadsheet software that use semicolons instead of commas, without reformatting the file first." },
  ],
  mistakes: [
    { title: "Forgetting to switch the delimiter", description: "Leaving the delimiter on comma for a semicolon- or tab-separated file produces one giant field per row instead of proper columns." },
    { title: "Assuming numeric columns convert to numbers", description: "Every value comes out as a string, including things that look like numbers — convert types yourself afterward if your code needs real numbers." },
    { title: "Leaving 'First row as headers' unchecked by accident", description: "This produces arrays of values instead of named objects, which is easy to miss until the output looks structurally different than expected." },
    { title: "Trusting output from a CSV with ragged rows", description: "Rows with too few or too many values compared to the header row are silently padded or truncated rather than flagged as an error." },
    { title: "Looking for an upload button", description: "There isn't one — CSV text has to be pasted in directly, so open the file elsewhere and copy its contents first." },
  ],
  tips: [
    "Open the raw CSV in a text editor first to confirm which character actually separates the columns.",
    "Double-check the header checkbox matches your data — objects for named CSVs, arrays for headerless data.",
    "Convert numeric-looking string fields to real numbers in your own code after exporting the JSON.",
    "Spot-check a handful of converted rows against the original spreadsheet, especially near any ragged or edited rows.",
    "Break a very large CSV into smaller chunks before pasting if your browser struggles with the clipboard size.",
    "Use the Download .json button instead of copy for large output to avoid clipboard truncation.",
  ],
  glossary: [
    { title: "Delimiter", description: "The character that separates columns in a CSV file — typically a comma, but sometimes a semicolon or tab." },
    { title: "Header row", description: "The first line of a CSV file, listing column names that become the object keys in the converted JSON." },
    { title: "Quoting", description: "Wrapping a CSV field in double quotes so it can safely contain the delimiter character or line breaks without splitting into extra columns." },
    { title: "Type coercion", description: "Converting a value from one data type to another, such as turning the string \"28\" into the number 28 — something this tool does not do automatically." },
    { title: "JSON array", description: "A JSON structure containing an ordered list of values, in this case one object or array per row of the original CSV." },
  ],
};

export default guide;
