import type { ToolGuide } from "@/types/guide";

const guide: ToolGuide = {
  slug: "json-formatter",
  intro: [
    "JSON (JavaScript Object Notation) is the standard format for exchanging structured data between servers, APIs, and applications, but raw JSON pulled from an API response or a config file is often crammed onto a single line with no spacing at all, making it nearly impossible to read by eye. This JSON formatter takes that dense text and reformats it with proper indentation, or checks it for syntax errors when something isn't parsing correctly.",
    "Paste any JSON into the input box and click Format to beautify it with two-space indentation, or click Minify to strip out all whitespace and collapse it back down to a single compact line for transmission or storage. If the JSON has a syntax error, the tool reports it immediately with the specific error message from the browser's own parser, rather than silently failing or showing a blank result.",
    "The formatter works entirely in your browser using the native JSON.parse and JSON.stringify functions built into JavaScript — the same parser every browser and Node.js application uses internally — so if your JSON passes here, it will parse correctly anywhere else too. Nothing you paste is sent to a server, which matters when the data includes API keys, internal config values, or other information you'd rather not transmit.",
  ],
  sections: [
    {
      heading: "How to Fix Invalid JSON: Trailing Commas, Single Quotes, Unquoted Keys",
      paragraphs: [
        "The three most common reasons JSON fails to parse all come from confusing it with a plain JavaScript object literal, which looks similar but follows looser rules. A trailing comma after the last item in an object or array, like {\"name\": \"Sam\",} with a comma right before the closing brace, is valid in a JavaScript object but not in JSON — it must be removed entirely.",
        "Single quotes around strings or keys, such as {'name': 'Sam'}, are also invalid JSON even though they work fine in JavaScript; every string and every key in valid JSON must use double quotes. Unquoted keys, like {name: \"Sam\"} instead of {\"name\": \"Sam\"}, hit the same problem — JSON requires every key to be a quoted string, with no exceptions.",
        "This tool doesn't auto-repair these issues; it reports exactly where parsing failed so you can fix the specific character causing the problem. Reading the error message carefully and checking the character at the position it references is usually faster than manually scanning the whole document for the mistake.",
      ],
    },
    {
      heading: "Reading a JSON Parse Error Message (Position and Token)",
      paragraphs: [
        "When JSON fails to parse, the error message typically names an unexpected token and a character position, such as reporting an unexpected token at a specific position in the string. That position counts characters from the very beginning of the pasted text, including all the whitespace and line breaks, so it takes a moment to translate into an actual line number in a long document.",
        "A practical way to locate the problem is to count from the start of a shorter document, or use your code editor's \"go to character\" or \"go to offset\" feature if it has one, then look immediately before and after that position for a missing comma, an extra comma, or a stray quote mark. The token named in the error message — often a comma, brace, or bracket character — tells you what the parser expected to see next but didn't find.",
      ],
    },
    {
      heading: "JSON Minify vs Beautify: When to Use Each",
      paragraphs: [
        "Beautifying (the Format button) adds line breaks and two-space indentation after every nested level, turning a dense wall of text into a structure a human can actually scan and understand at a glance. This is the right mode when debugging data, reviewing an API response, or preparing a JSON example for documentation or a teammate.",
        "Minifying strips out every unnecessary character — line breaks, indentation, and extra spaces — collapsing the same data down to the smallest possible size with no change in meaning. This matters for anything transmitted repeatedly or stored at scale, like a JSON config embedded in a URL parameter or a payload sent over a metered API, where every extra byte adds up.",
      ],
    },
    {
      heading: "JSON vs JavaScript Object Literals: Why They Look Similar But Aren't",
      paragraphs: [
        "JSON was designed to look like JavaScript object syntax, which is exactly why it's so easy to accidentally paste real JavaScript code into a JSON validator and get an error. JavaScript object literals allow single or double quotes, unquoted keys when they're valid identifiers, trailing commas, comments, and even function values — none of which are legal in JSON.",
        "If you're copying data directly out of JavaScript source code rather than an API response or a .json file, expect to need small edits before it validates as JSON: swap single quotes for double, quote every key, remove trailing commas, and delete any comments or function values, since JSON has no concept of executable code at all.",
      ],
    },
    {
      heading: "Formatting Deeply Nested JSON for Readability",
      paragraphs: [
        "JSON objects and arrays can nest inside each other to any depth, and API responses in particular often nest five or six levels deep — an array of objects, each containing another object, containing another array. Without indentation, tracking which closing brace or bracket belongs to which opening one becomes genuinely difficult, which is exactly the problem beautifying solves by indenting each nested level two spaces further than its parent.",
        "When debugging a deeply nested structure, it often helps to beautify first, visually scan for the specific key or value you're looking for using your editor's indentation guides, and only minify again right before sending the data somewhere that needs the compact form.",
      ],
    },
  ],
  useCases: [
    { title: "Debugging API responses", description: "Paste a raw API response to instantly see its full structure with proper indentation instead of scrolling through one dense line." },
    { title: "Validating config files", description: "Check a JSON configuration file for syntax errors before deploying, catching a missing comma or bracket before it breaks a build." },
    { title: "Minifying for production", description: "Compress a formatted JSON file down to its smallest size before embedding it in a build output or sending it over a network." },
    { title: "Learning JSON structure", description: "Beautify unfamiliar JSON data to study how its objects and arrays are organized before writing code to parse it." },
    { title: "Cleaning up copied JavaScript objects", description: "Convert a JavaScript object literal copied from source code into valid JSON by fixing quotes, keys, and trailing commas." },
    { title: "Sharing readable examples", description: "Format JSON before pasting it into documentation, a support ticket, or a message to a teammate so it's easy to read." },
  ],
  mistakes: [
    { title: "Leaving a trailing comma after the last item", description: "A comma right before a closing brace or bracket is valid in JavaScript but always invalid in JSON, and it's one of the most common parse errors." },
    { title: "Using single quotes instead of double quotes", description: "JSON strings and keys must use double quotes exclusively — single quotes will fail to parse even though they're valid JavaScript." },
    { title: "Pasting a JavaScript object instead of JSON", description: "Unquoted keys, comments, and function values are all legal JavaScript but not legal JSON, so code copied straight from a script often needs edits first." },
    { title: "Assuming the tool will auto-correct errors", description: "The formatter reports exactly where JSON is invalid but does not rewrite or repair it — the fix has to be made manually based on the error message." },
    { title: "Minifying before you're done debugging", description: "Compacting JSON back to one line makes it much harder to spot a remaining structural issue — beautify first, fix everything, then minify." },
  ],
  tips: [
    "Fix errors one at a time, starting from the character position named in the error message, then reformat to check for the next one.",
    "Always use double quotes for both keys and string values — JSON has no allowance for single quotes.",
    "Remove trailing commas after the last item in any object or array before validating.",
    "Beautify first to debug structure visually, and only minify right before sending or storing the final result.",
    "When copying data out of JavaScript source code, expect to quote unquoted keys and delete comments before it will validate as JSON.",
  ],
  glossary: [
    { title: "JSON", description: "JavaScript Object Notation, a lightweight text format for structured data made of objects, arrays, strings, numbers, booleans, and null." },
    { title: "Parsing", description: "The process of reading a text string and converting it into a structured data object a program can work with, which fails if the syntax is invalid." },
    { title: "Trailing comma", description: "An extra comma placed after the final item in an object or array, valid in JavaScript but always invalid in strict JSON." },
    { title: "Minification", description: "Removing all unnecessary whitespace and line breaks from data or code to reduce its file size without changing its meaning." },
    { title: "Object literal", description: "JavaScript's native syntax for writing an object directly in code, which resembles JSON but follows looser, more permissive rules." },
  ],
};

export default guide;
