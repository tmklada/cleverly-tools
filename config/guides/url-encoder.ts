import type { ToolGuide } from "@/types/guide";

const guide: ToolGuide = {
  slug: "url-encoder",
  intro: [
    "A URL encoder converts text into a format that's safe to use inside a web address or a query string, replacing characters URLs can't contain literally with a percent sign followed by a two-digit hex code — %20 for a space, %26 for an ampersand, and so on. This tool runs that conversion, and its reverse, instantly in the browser: paste text or a URL, click Encode or Decode, and copy the result.",
    "URLs are restricted to a specific, limited character set defined by the web standard that governs them, and anything outside that set — spaces, accented letters, symbols like & and =, or a raw non-ASCII character — has to be percent-encoded before it can safely travel inside a link, a query parameter, or an API request. Skipping this step is a common source of broken links, truncated form submissions, and API requests that silently drop part of their data at the first special character.",
  ],
  sections: [
    {
      heading: "Percent-Encoding Explained: Which Characters Must Be Escaped in a URL",
      paragraphs: [
        "Percent-encoding, defined by the web standard RFC 3986, replaces an unsafe character with a % followed by that character's two-digit hexadecimal ASCII value: a space becomes %20, an ampersand becomes %26, an equals sign becomes %3D, and a forward slash becomes %2F. RFC 3986 calls out a specific set of \"unreserved\" characters that never need encoding: uppercase and lowercase letters, digits, and four symbols — hyphen, period, underscore, and tilde. Everything else is a candidate for encoding depending on where it appears in the URL.",
        "Reserved characters like &, =, ?, #, and / have special meaning in URL syntax — & separates query parameters, = separates a parameter's name from its value, and # marks a fragment — so if one of those characters needs to appear as literal data rather than as a URL delimiter, it must be percent-encoded, or it will be misread as part of the URL's structure instead of as content.",
      ],
      bullets: [
        "Unreserved (never encoded): A-Z, a-z, 0-9, hyphen, period, underscore, tilde",
        "Reserved (structural, encode when used as literal data): & = ? # / : @",
        "Space becomes %20 with encodeURIComponent",
        "Non-ASCII characters (accented letters, emoji) are always percent-encoded, often as multiple %XX bytes",
      ],
    },
    {
      heading: "encodeURI vs encodeURIComponent: When to Use Which",
      paragraphs: [
        "JavaScript provides two different built-in functions for this, and mixing them up is a frequent source of broken URLs. encodeURI is meant for encoding a complete, already-structured URL — it leaves reserved characters like /, :, ?, &, and # alone since those are assumed to be legitimate parts of the URL's structure, and it only encodes characters that shouldn't appear in a URL at all, like spaces.",
        "encodeURIComponent is meant for encoding a single piece of data that will be inserted into a URL, such as one query parameter's value — it encodes reserved characters too, since a raw & or = inside a value would otherwise be misread as a delimiter rather than as part of the data. This tool's Encode and Decode buttons always use encodeURIComponent and decodeURIComponent, which is the correct and more commonly needed choice for encoding a value like a search term or form field rather than a full link; there's no separate encodeURI mode here for encoding an entire pre-built URL while leaving its slashes and colons untouched.",
      ],
    },
    {
      heading: "Why Spaces Become %20 or + in Query Strings",
      paragraphs: [
        "A literal space is not allowed in a URL at all, so it always needs to be represented some other way. The standard percent-encoded form is %20, and that's what this tool's encodeURIComponent-based Encode button produces. A different, older convention represents a space as a plus sign instead, but that convention applies specifically to the application/x-www-form-urlencoded format used by HTML form submissions, not to percent-encoding generally.",
        "This distinction matters when working with an API or a form library, since %20 and + are not interchangeable everywhere: a server expecting form-encoded data may treat + as a literal plus sign rather than a space if it's not in the right encoding context. This tool always outputs %20 for spaces, matching standard percent-encoding rather than the form-specific + convention.",
      ],
    },
    {
      heading: "Encoding Query Parameters and API Requests Correctly",
      paragraphs: [
        "When building a URL with multiple query parameters, each parameter's name and value should be encoded individually with encodeURIComponent before being joined together with & and = characters, rather than encoding the entire query string as one block. Encoding the whole string at once would leave the & and = separators themselves unencoded, which is exactly what's needed for them to work as delimiters — but it also means any literal & or = inside a value passed through unencoded won't be escaped.",
        "The safest pattern is: encode each value separately with this tool's Encode button, then assemble the full URL or request body by hand, joining the already-encoded pieces with the unencoded & and = separators. This avoids double-encoding a parameter that's already safe while making sure every literal special character inside a value is properly escaped.",
      ],
    },
    {
      heading: "Decoding a URL: Reading Percent-Encoded Data",
      paragraphs: [
        "Decoding reverses the process: every %XX sequence in the input is converted back to the character it represents, so %20 becomes a space and %26 becomes an ampersand again. This is useful for reading a long, encoded query string copied from a browser's address bar, a server log, or an API response, where the encoded form can be hard to read at a glance.",
        "Decoding can fail if the input contains a malformed percent sequence, such as a % not followed by two valid hex digits, since that isn't a legal percent-encoded value; this tool reports a decoding error in that case rather than guessing at the intended character. Paste the encoded string exactly as received, without adding or removing any % characters by hand, to avoid triggering that error.",
      ],
    },
  ],
  useCases: [
    { title: "Encoding query parameter values", description: "Convert a search term, form value, or user input into a safe format before appending it to a URL's query string." },
    { title: "Building API request URLs", description: "Percent-encode individual parameter values before assembling a full request URL for a REST API." },
    { title: "Reading encoded query strings", description: "Decode a long, hard-to-read encoded URL copied from a browser address bar or server log back into plain text." },
    { title: "Debugging broken links", description: "Check whether special characters in a URL were encoded correctly by comparing the encoded and decoded versions." },
    { title: "Preparing text for a redirect URL", description: "Encode a destination URL or message that needs to be passed as a parameter value within another URL." },
  ],
  mistakes: [
    { title: "Encoding an entire URL instead of just the parameter values", description: "Running a full URL through this Encode button will also escape the / and : characters that structure the URL, breaking it; encode each value separately instead." },
    { title: "Expecting a space to become a plus sign", description: "This tool outputs %20 for spaces, the standard percent-encoding form, not the + convention used specifically by HTML form submissions." },
    { title: "Double-encoding an already-encoded string", description: "Running Encode on text that already contains %20 or similar sequences turns the % itself into %25, producing a garbled double-encoded result." },
    { title: "Manually editing a percent-encoded string", description: "Adding or removing a % character by hand before decoding can produce an invalid sequence and trigger a decoding error." },
  ],
  tips: [
    "Encode each query parameter value separately, then join them with unencoded & and = characters yourself.",
    "Check whether an encoded string is already encoded before running Encode again, to avoid a double-encoded result.",
    "Remember this tool outputs %20 for spaces, not +, which matters when working with form-encoded data specifically.",
    "Use Decode to read a long encoded query string copied from a browser address bar or a server log.",
    "Paste encoded input exactly as received; editing a %XX sequence by hand can make it invalid.",
  ],
  glossary: [
    { title: "Percent-encoding", description: "A method defined by RFC 3986 for representing an unsafe or reserved character as % followed by its two-digit hexadecimal value." },
    { title: "Reserved character", description: "A character like &, =, or / that has a structural meaning in a URL and must be encoded when it needs to appear as literal data." },
    { title: "Unreserved character", description: "A character that's always safe in a URL without encoding: letters, digits, hyphen, period, underscore, and tilde." },
    { title: "Query string", description: "The part of a URL after the ? that holds parameter name-value pairs separated by & and =." },
    { title: "application/x-www-form-urlencoded", description: "The encoding format used by standard HTML form submissions, where a space is represented as + rather than %20." },
  ],
};

export default guide;
