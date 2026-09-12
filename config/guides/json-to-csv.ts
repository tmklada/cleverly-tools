import type { ToolGuide } from "@/types/guide";

const guide: ToolGuide = {
  slug: "json-to-csv",
  intro: [
    "JSON is the format most APIs and databases return data in, but almost nobody wants to review a hundred records in raw curly-brace notation — a spreadsheet is faster to scan, sort, and filter. This JSON to CSV converter takes a JSON array of objects and turns it into a proper comma-separated table with one row per object and one column per key, ready to paste into Excel or Google Sheets.",
    "The conversion runs entirely in your browser: paste the array, click Convert, and the tool builds the column headers from the union of every key it finds across all your objects, then fills in each row underneath. Nested objects are flattened into dot-notation columns automatically, so you don't have to manually pull apart a response before it's usable in a spreadsheet.",
    "Because nothing is uploaded to a server, this works fine for data pulled from an internal API, a config export, or anything else you'd rather not send anywhere else. The output is downloadable as a .csv file or copyable straight to your clipboard, whichever fits the next step in your workflow.",
  ],
  sections: [
    {
      heading: "How Nested JSON Becomes Flat CSV Columns",
      paragraphs: [
        "CSV has no concept of nesting — every cell holds one flat value — so this tool walks into each object recursively and rewrites nested keys using dot notation. An object like {\"name\": \"Sam\", \"address\": {\"city\": \"NYC\", \"zip\": \"10001\"}} becomes three columns: name, address.city, and address.zip, with the nesting preserved only in the header name.",
        "Arrays are handled differently from nested objects: instead of expanding into multiple columns, an array value is serialized with JSON.stringify and dropped into a single cell as a text string, for example [\"red\",\"blue\"]. That keeps every row to exactly one line, but it also means you can't sort or filter by an individual array item directly in the spreadsheet — you'd need to split that column back out afterward if you need that level of detail.",
        "This approach covers the two most common shapes of API data — nested objects and arrays of tags or IDs — without pre-processing, but check which one you're looking at before building a pivot table around a column that's actually a JSON string.",
      ],
    },
    {
      heading: "Opening a CSV in Excel or Google Sheets Without Broken Columns",
      paragraphs: [
        "Every value the converter writes is wrapped in double quotes, whether it's text, a number, or a flattened sub-object, and any double quote already inside a value gets doubled so the parser downstream can tell the difference between a literal quote character and the end of the field. This is standard CSV quoting behavior, and it's what keeps a value containing a comma — like \"Miller, John\" — from being split into two columns by accident.",
        "If you open the downloaded file and see the whole spreadsheet crammed into column A, the file's delimiter and your spreadsheet app's import settings don't match; re-import through Excel's or Sheets' \"import from text\" wizard and explicitly choose comma as the separator rather than double-clicking the file to open it directly. Non-English characters occasionally render as garbled symbols too — that's an encoding mismatch, not a bug in the converted data, and choosing UTF-8 during import usually fixes it.",
      ],
    },
    {
      heading: "Why Every Object Needs the Same Keys (Or What Happens When They Don't)",
      paragraphs: [
        "Before writing a single row, the converter scans every object in your array and builds one master list of column headers from all the keys it finds anywhere, not just the first object. That protects you from a common failure mode: if only the third record out of fifty has an \"email\" field, the email column still gets created and appears for all fifty rows.",
        "The tradeoff is that any object missing a key that other objects have simply gets a blank cell in that column, with no warning. That's usually exactly what you want for optional fields, but it's worth a quick scan of the output for unexpectedly empty columns — it often means a field name is spelled two different ways somewhere in your source data, like \"zipCode\" in one record and \"zip_code\" in another, which the tool will treat as two separate columns rather than merging them.",
      ],
    },
    {
      heading: "CSV Quoting Rules: Commas, Quotes and Line Breaks Inside Fields",
      paragraphs: [
        "Because this converter quotes every field unconditionally rather than only quoting values that need it, you don't have to think about which values are \"risky\" — a product description containing commas, quotation marks, or even a line break is handled the same way as a plain number. A quote inside the text, such as a value like He said \"hello\", is escaped by doubling it to \"\"hello\"\" inside the wrapping quotes, which is exactly how Excel and Google Sheets expect it.",
        "This is the same escaping convention defined by the CSV standard (RFC 4180), so a file produced here should open cleanly in any spreadsheet tool, any programming language's CSV library, or any database's bulk import feature without special handling on the other end.",
      ],
    },
    {
      heading: "When JSON to CSV Is (and Isn't) the Right Format",
      paragraphs: [
        "The tool expects the top-level JSON to be an array of objects — if you paste a single object instead of an array, or an array of plain strings or numbers instead of objects, it stops with an error rather than guessing what you meant. That's a deliberate choice: guessing wrong on data you're about to import into a spreadsheet is worse than asking you to adjust the input.",
        "If your source JSON is a single object holding several nested arrays — a common API response shape like {\"users\": [...], \"meta\": {...}} — pull out just the array you want (here, \"users\") and paste that in on its own.",
      ],
    },
    {
      heading: "Downloading vs Copying Your Converted CSV",
      paragraphs: [
        "The Copy button puts the raw CSV text on your clipboard, which is the fastest path when you're about to paste directly into an already-open spreadsheet — Sheets and Excel will both split it into columns automatically on paste. The Download .csv button instead saves a file named data.csv through your browser's normal download flow, which is the better option when you need to attach the file, import it somewhere else, or keep it as a record.",
        "For a large array — hundreds of rows or more — downloading is usually more reliable than copy-pasting, since very large clipboard payloads can be truncated or slow to paste depending on your browser and operating system.",
      ],
    },
  ],
  useCases: [
    { title: "Exporting API responses to a spreadsheet", description: "Convert a JSON array pulled from an internal API or webhook payload into a CSV you can hand to a non-technical teammate." },
    { title: "Turning database exports into reports", description: "Take a JSON export from MongoDB, Firestore, or a REST endpoint and get it into Excel for pivot tables and charts." },
    { title: "Prepping mail-merge or bulk-upload data", description: "Convert a list of contact or product records into the flat CSV format most mail-merge and bulk-import tools expect." },
    { title: "Quick one-off conversions without a script", description: "Skip writing a Python or Node script for a single conversion when you just need the data in spreadsheet form right now." },
    { title: "Sharing structured data with non-developers", description: "Give colleagues who don't read JSON a familiar table instead, without losing any of the underlying values." },
    { title: "Reviewing flattened nested records", description: "Spot-check how a deeply nested API response looks once every field is pulled into its own dot-notation column." },
  ],
  mistakes: [
    { title: "Pasting a single object instead of an array", description: "The converter requires a top-level array of objects — wrap a lone object in square brackets, like [ {...} ], before converting." },
    { title: "Expecting array values to expand into columns", description: "An array inside an object is serialized into one cell as a JSON string, not split into separate columns — plan to post-process that column if you need it split out." },
    { title: "Ignoring inconsistent key names across records", description: "Two records using \"zip\" and \"zipCode\" for the same field produce two separate columns with partial data instead of one merged column." },
    { title: "Assuming column order is alphabetical", description: "Columns appear in the order keys are first encountered across your array, not sorted alphabetically — reorder them manually in your spreadsheet if needed." },
    { title: "Not checking for unexpectedly blank cells", description: "A blank cell usually means that key was missing on that particular object, which is easy to miss when scanning a wide table quickly." },
  ],
  tips: [
    "Wrap a single JSON object in square brackets before pasting it, since the converter requires an array.",
    "Scan for blank cells after converting — they usually point to inconsistent key names in your source data.",
    "Use Download .csv rather than Copy for large datasets, since huge clipboard pastes can be unreliable.",
    "If a spreadsheet opens with everything in one column, re-import through the app's text-import wizard and set the delimiter to comma explicitly.",
    "Flatten or stringify array values yourself beforehand if you need each array item in its own column.",
    "Keep JSON keys short and consistent, since they become your CSV column headers exactly as written.",
  ],
  glossary: [
    { title: "Flattening", description: "Converting a nested JSON structure into flat dot-notation keys, like address.city, so it fits into a single-level CSV column." },
    { title: "CSV", description: "Comma-separated values, a plain-text table format where each line is a row and commas separate the columns." },
    { title: "Quoting/Escaping", description: "Wrapping a CSV field in double quotes and doubling any internal quote characters so commas and quotes inside data don't break the column structure." },
    { title: "Header row", description: "The first line of a CSV file, listing the column names that every row below it lines up with." },
    { title: "Serialization", description: "Converting a data structure like an array into a plain text string, used here to fit an array value into a single CSV cell." },
    { title: "Dot notation", description: "A naming convention that represents nested structure with periods, such as address.zip, instead of actual nested brackets." },
  ],
};

export default guide;
