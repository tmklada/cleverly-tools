import type { ToolGuide } from "@/types/guide";

const guide: ToolGuide = {
  slug: "regex-tester",
  intro: [
    "A regular expression, or regex, is a compact pattern language for matching, finding, or validating text — everything from checking that an email address is formatted correctly to pulling every phone number out of a block of pasted text. Writing one correctly on the first try is rare even for experienced developers, which is why testing a pattern against real sample text before dropping it into production code saves a lot of debugging later.",
    "This regex tester uses JavaScript's native regex engine, the same one that runs in every browser and in Node.js, so a pattern that works here will behave identically in actual JavaScript or TypeScript code. Type a pattern into the pattern field, toggle the g, i, m, and s flags as needed, and paste or type a test string — matches highlight instantly with no button to click, updating live as you type either field.",
    "Below the highlighted text, every match is listed individually with its position in the string and any capture groups it contains, including named groups. Everything runs directly in your browser using JavaScript's built-in RegExp object, so nothing you type is transmitted anywhere.",
  ],
  sections: [
    {
      heading: "Regex Cheat Sheet: Anchors, Quantifiers, Groups, and Lookaheads",
      paragraphs: [
        "Anchors pin a match to a specific position rather than letting it appear anywhere in the string: ^ matches the start of the string (or start of a line, with the m flag), and $ matches the end. Without anchors, a pattern like \\d{3} matches any three consecutive digits anywhere in the text; with ^\\d{3}$, the entire string must be exactly three digits and nothing else.",
        "Quantifiers control how many times something can repeat: * means zero or more, + means one or more, ? means zero or one, and {3} or {2,4} specify an exact count or a range. Groups, written with parentheses like (abc), let you apply a quantifier to a whole sequence at once and capture that piece of the match separately for later use, which is what shows up in this tool's Groups list next to each match.",
        "Lookaheads check for something without including it in the match: (?=abc) is a positive lookahead requiring abc to follow, and (?!abc) is negative, requiring it not to follow. JavaScript's regex engine also supports lookbehind with (?<=abc) and (?<!abc), checking what comes before the current position instead of after.",
      ],
      bullets: [
        "^ and $ — start and end anchors",
        "* + ? {n} {n,m} — quantifiers for repetition",
        "(...) — capturing group, (?:...) — non-capturing group",
        "(?<name>...) — named capture group",
        "(?=...) (?!...) — positive/negative lookahead",
        "(?<=...) (?<!...) — positive/negative lookbehind",
      ],
    },
    {
      heading: "Common Regex Patterns: Email, Phone, URL, and Date",
      paragraphs: [
        "These patterns cover the most frequently needed validations, written in plain JavaScript regex syntax you can paste directly into the pattern field to test against your own sample data. None are exhaustive against every edge case — real email and URL validation especially has messy edge cases — but each works well for everyday form validation.",
        "Paste your own sample strings into the test string box alongside these patterns to confirm they match what you expect, and just as importantly, to confirm they correctly fail to match invalid input you don't want to accept.",
      ],
      bullets: [
        "Email: ^[\\w.-]+@[\\w-]+\\.[a-zA-Z]{2,}$",
        "US phone number: ^\\(?\\d{3}\\)?[-.\\s]?\\d{3}[-.\\s]?\\d{4}$",
        "URL: ^https?:\\/\\/[\\w-]+(\\.[\\w-]+)+[\\w./?%&=-]*$",
        "Date (YYYY-MM-DD): ^\\d{4}-\\d{2}-\\d{2}$",
        "US ZIP code: ^\\d{5}(-\\d{4})?$",
      ],
    },
    {
      heading: "Understanding Regex Flags: g, i, m, and s",
      paragraphs: [
        "The g (global) flag is the difference between finding just the first match and finding every match in the whole test string — with it checked, this tool lists all matches; without it, only the first one appears. The i (case-insensitive) flag makes the pattern ignore uppercase versus lowercase, so hello matches Hello, HELLO, and hElLo equally.",
        "The m (multiline) flag changes what ^ and $ mean when the test string spans multiple lines: normally they mark the very start and end of the entire string, but with m enabled they also match the start and end of each individual line. The s flag, sometimes called dotAll, changes what the dot character matches — normally a dot matches any character except a line break, but with s enabled it matches line breaks too.",
        "This tool supports these four flags as checkboxes. JavaScript also has a u flag for full Unicode handling and a y flag for sticky matching from an exact position, not exposed here as toggles but worth knowing about if a pattern depends on Unicode code point behavior.",
      ],
    },
    {
      heading: "Capture Groups vs Named Groups: Reading the Match List",
      paragraphs: [
        "Every match found is listed below the highlighted text with its exact position in the string, letting you confirm not just that something matched but exactly where. If your pattern includes parentheses, JavaScript treats each as a capture group, extracting that specific portion of the match — useful for pulling a specific part out of a larger match, like the area code out of a full phone number.",
        "Named groups, written as (?<name>...) instead of a plain (...), let you label each captured piece instead of tracking it by position number, and this tool displays named groups directly under each match as name-value pairs. This becomes especially useful once a pattern has three or more groups, where remembering what capture group #2 versus #3 represents gets error-prone without names.",
      ],
    },
    {
      heading: "Global vs First-Match-Only: Why the g Flag Changes Everything",
      paragraphs: [
        "Forgetting the g flag is one of the most common regex debugging surprises: a pattern that looks correct but only seems to find the first occurrence in a longer string is very often just missing that flag rather than having an actual pattern bug. This tool defaults to the g flag checked, which matches how most real-world use cases — like highlighting every match or replacing every occurrence — actually need it to behave.",
        "There are legitimate reasons to leave it unchecked, though: if you only care whether a string matches at all (like a form validation check), or specifically want just the first occurrence, unchecking g gives a cleaner, single result instead of a list to sift through.",
      ],
    },
    {
      heading: "Common Regex Mistakes That Cause Unexpected Matches",
      paragraphs: [
        "Forgetting to escape special characters is a frequent source of bugs: characters like ., *, +, ?, (, ), [, and $ all have special meaning in regex, so matching a literal period in a domain name requires writing \\. instead of a bare dot, which otherwise matches any character at all.",
        "Overly greedy quantifiers are another common trap — a pattern like \".*\" applied to text with multiple quoted sections often matches from the first quote all the way to the last one, rather than stopping at the nearest closing quote, because * is greedy by default. Adding a question mark, as in \".*?\", makes it lazy instead, stopping at the first closing quote it finds.",
      ],
    },
  ],
  useCases: [
    { title: "Form validation patterns", description: "Test an email, phone, or ZIP code pattern against a range of valid and invalid sample inputs before adding it to a signup form." },
    { title: "Extracting data from text", description: "Check a pattern's global matches against a block of pasted text to confirm it correctly pulls out every phone number, date, or ID." },
    { title: "Debugging an existing regex", description: "Paste a regex that's misbehaving in production code alongside real sample data to see exactly which part of the pattern is matching incorrectly." },
    { title: "Learning regex syntax", description: "Experiment with anchors, quantifiers, and groups against live text to build an intuition for how each piece of a pattern behaves." },
    { title: "Reviewing a teammate's pattern", description: "Paste a regex from a pull request along with edge-case test strings to confirm it handles the inputs it's meant to." },
  ],
  mistakes: [
    { title: "Forgetting the g flag and assuming only one match exists", description: "Without the global flag, only the first match is found even if the pattern would match multiple times further in the string." },
    { title: "Not escaping special characters like the dot", description: "An unescaped period matches any character at all, not a literal period — write \\. when you specifically mean a dot." },
    { title: "Using a greedy quantifier when a lazy one was needed", description: "A quantifier like .* expands as far as possible by default; add a ? after it (.*?) to match the shortest possible string instead." },
    { title: "Testing only valid examples", description: "A pattern that correctly matches valid input but doesn't get tested against invalid input can still let bad data through undetected." },
    { title: "Expecting a replace feature", description: "This tool tests and highlights matches; it doesn't perform find-and-replace, so use your code editor or a script for actual text substitution." },
  ],
  tips: [
    "Test both valid and intentionally invalid sample strings to confirm a pattern rejects what it should, not just accepts what it should.",
    "Keep the g flag on whenever you expect more than one match in the test string.",
    "Escape special characters like . ( ) [ ] with a backslash whenever you mean them literally rather than as regex syntax.",
    "Use a lazy quantifier (.*? instead of .*) whenever a greedy match is grabbing more text than intended.",
    "Use named groups instead of positional ones once a pattern has three or more capture groups, to keep results easier to read.",
  ],
  glossary: [
    { title: "Anchor", description: "A regex symbol like ^ or $ that matches a position in the string, such as its start or end, rather than an actual character." },
    { title: "Quantifier", description: "A regex symbol like *, +, ?, or {n,m} that specifies how many times the preceding element can repeat." },
    { title: "Capture group", description: "A portion of a pattern wrapped in parentheses that extracts the matched text at that position for separate use." },
    { title: "Greedy vs lazy matching", description: "Greedy quantifiers match as much text as possible by default; adding a ? after one makes it lazy, matching as little as possible instead." },
    { title: "Lookahead/lookbehind", description: "A pattern that checks for text before or after the current position without including that text in the actual match." },
  ],
};

export default guide;
