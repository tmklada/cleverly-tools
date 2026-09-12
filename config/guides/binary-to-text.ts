import type { ToolGuide } from "@/types/guide";

const guide: ToolGuide = {
  slug: "binary-to-text",
  intro: [
    "Binary is how computers represent every character you type, but reading a string of 0s and 1s by hand is slow and error-prone even if you know the trick. This binary to text converter handles both directions: paste a binary string, separated into 8-digit groups by spaces, and it decodes each group into the character it represents; or type plain text and it encodes every character into its 8-bit binary form, plus the equivalent hexadecimal for each result.",
    "It's built for the most common use of binary-to-text conversion — standard English text and ASCII characters, where every character fits cleanly into one 8-bit byte. The tool also shows a hex equivalent alongside every conversion, since binary, decimal, and hex are three views of the same underlying number, making it easy to cross-check a value or plug it into code that expects hex instead of binary.",
    "Everything runs locally in your browser using standard character code math — nothing you type is sent to a server, which matters if you're decoding something you'd rather not paste into a random website.",
  ],
  sections: [
    {
      heading: "How Computers Store Text as Binary (8 Bits per Character)",
      paragraphs: [
        "A bit is a single 0 or 1, and a byte is a group of 8 bits. Standard ASCII text — the English letters, digits, punctuation, and basic symbols on a US keyboard — assigns every character a number from 0 to 255, which fits exactly into one byte. The letter A, for example, is character code 65, which in 8-bit binary is 01000001. Lowercase a is 97, or 01100001. Because every ASCII character fits in exactly one byte, a sentence of plain English text becomes a straightforward sequence of 8-bit groups, one per character, which is exactly the format this tool expects and produces.",
        "This 8-bits-per-character system is why binary text always looks like it comes in tidy blocks of eight when you're working with standard English content — it's not a coincidence or a formatting choice, it's the direct result of how ASCII assigns character codes.",
      ],
      bullets: [
        "A = 65 (decimal) = 01000001 (binary) = 41 (hex)",
        "a = 97 (decimal) = 01100001 (binary) = 61 (hex)",
        "space = 32 (decimal) = 00100000 (binary) = 20 (hex)",
      ],
    },
    {
      heading: "Binary, Decimal and Hexadecimal Conversion Table",
      paragraphs: [
        "Binary (base 2), decimal (base 10), and hexadecimal (base 16) are just different ways of writing the same number. Binary uses only 0 and 1; decimal is the normal counting system everyone learns first; hex uses 0-9 and then A-F to represent values 10 through 15, letting a single byte's full range (0-255) fit in just two hex digits instead of eight binary digits. That compactness is why hex shows up constantly in programming — for color codes, memory addresses, and encoded data — while binary is closer to what the hardware actually processes.",
        "Every result you get from converting text to binary in this tool also comes with its hex equivalent underneath, calculated the same way: each character's code is converted to a two-digit uppercase hex value and joined with spaces, giving you both formats without running the conversion twice.",
      ],
      bullets: [
        "Binary 00001010 = Decimal 10 = Hex 0A",
        "Binary 01111111 = Decimal 127 = Hex 7F",
        "Binary 11111111 = Decimal 255 = Hex FF",
      ],
    },
    {
      heading: "How This Converter Reads Binary Groups (And What Breaks the Format)",
      paragraphs: [
        "The Binary → Text field expects your input as 8-character groups of 0s and 1s, separated by spaces, exactly like 01001000 01100101 01101100 01101100 01101111 for the word Hello. The tool splits your input on whitespace, checks that every resulting group is exactly 8 characters long and contains only 0 and 1, and converts each group into one character. If a group is too short, too long, or contains anything other than 0 or 1 — including a stray letter, an extra space creating an empty group, or digits like 2 through 9 — the conversion stops and shows exactly which group failed.",
        "The most common way this trips people up is copying binary from a source that doesn't separate bytes with single spaces, such as one continuous run of digits with no gaps, or groups separated by commas or line breaks instead of spaces. Reformatting the input into clean, single-space-separated 8-character chunks before pasting will fix nearly every error this tool reports.",
      ],
    },
    {
      heading: "Converting Text to Binary: What charCodeAt Actually Does",
      paragraphs: [
        "Going the other direction, the Text → Binary field reads your input one character at a time, looks up each character's numeric code, and writes that number as binary, padded with leading zeros so it's always at least 8 digits. For standard English text, digits, and common punctuation, every character's code falls between 0 and 255, so every group comes out as exactly 8 bits, matching the format the Binary → Text side expects.",
        "This padding is important: without it, a character like newline (code 10) would produce 1010 instead of 00001010, which would silently break the 8-bit grouping that both directions of this tool, and most binary-text conventions in general, rely on. Padding every group to at least 8 digits keeps everything aligned to whole bytes.",
      ],
    },
    {
      heading: "ASCII vs Unicode: Why Non-English Text Doesn't Fit Neatly Into 8 Bits",
      paragraphs: [
        "This tool works reliably for standard ASCII text — English letters, numbers, and common symbols with character codes from 0 to 255. Characters outside that range, including Hebrew, Arabic, Cyrillic, Chinese, Japanese, Korean characters, and emoji, have character codes well above 255, so their binary representation needs 9 to 16 bits rather than a clean 8. When you convert that kind of text to binary here, those particular groups will come out longer than 8 digits, and pasting that result back into Binary → Text will fail, since the converter strictly expects every group to be exactly 8 characters.",
        "In practice, that means this tool is best suited to plain-English content, ASCII-based puzzles, learning exercises, and simple encode/decode tasks rather than full multilingual or emoji text. Real-world systems handle wider character sets with Unicode encodings like UTF-8, which use a variable number of bytes per character and additional marker bits — a more involved format than the straightforward one-byte-per-character mapping this tool is built around.",
      ],
    },
    {
      heading: "Reading the Hex Output Alongside Binary and Text",
      paragraphs: [
        "Both conversion directions display a hex equivalent alongside their main result — decoding binary shows you the resulting text plus its hex, and encoding text shows you the resulting binary plus the same hex value. This is useful when you're working with code, file formats, or protocols that expect hexadecimal rather than binary, since you get both without a separate conversion step.",
        "Each result also has its own Copy button, so you can grab just the text, just the hex, or just the binary depending on what you actually need next, rather than copying the whole page and trimming it down yourself.",
      ],
    },
  ],
  useCases: [
    { title: "Learning how binary and ASCII work", description: "Convert short words back and forth to see exactly how each letter maps to its 8-bit binary and hex representation." },
    { title: "Solving binary-encoded puzzles or riddles", description: "Decode binary strings from puzzles, escape rooms, or geocaching clues that use plain-English messages." },
    { title: "Encoding a short message as binary for a project", description: "Turn a short phrase into binary for a display, art piece, or programming exercise that expects 8-bit character codes." },
    { title: "Cross-checking ASCII character codes while coding", description: "Look up a character's decimal, binary, and hex code together instead of checking three separate references." },
    { title: "Verifying binary output from other tools or code", description: "Paste binary generated elsewhere to confirm it decodes to the expected text before using it further." },
  ],
  mistakes: [
    { title: "Pasting binary without spaces between bytes", description: "The converter needs each 8-bit group separated by a space; one continuous string of digits with no gaps will fail to parse." },
    { title: "Using groups that aren't exactly 8 characters", description: "A 7-digit or 9-digit group triggers an error — every byte must be padded to exactly 8 binary digits, including leading zeros." },
    { title: "Expecting Hebrew, Arabic, or emoji to round-trip correctly", description: "Characters with codes above 255 need more than 8 bits, so their binary groups won't match this tool's 8-bit-per-character format." },
    { title: "Including non-binary characters in a group", description: "Any digit other than 0 or 1, or a stray letter, makes that group invalid and stops the conversion with an error." },
    { title: "Dropping leading zeros when writing binary by hand", description: "10 and 00001010 are different lengths but the same number — always pad to 8 digits so the byte grouping stays consistent." },
  ],
  tips: [
    "Separate every 8-bit group with a single space so the converter can split your input correctly.",
    "Pad short binary groups with leading zeros to a full 8 digits before pasting them in.",
    "Use this tool for standard English text and ASCII-based puzzles rather than multilingual or emoji content.",
    "Check the hex output alongside binary when you need to plug a value into code that expects hexadecimal.",
    "If a conversion fails, look at the exact group named in the error message — it's usually a spacing or length issue.",
    "Copy just the text, hex, or binary you need using each result's own Copy button instead of copying everything.",
  ],
  glossary: [
    { title: "Bit", description: "A single binary digit, either 0 or 1 — the smallest unit of data a computer stores." },
    { title: "Byte", description: "A group of 8 bits, enough to represent one standard ASCII character (a value from 0 to 255)." },
    { title: "ASCII", description: "A character encoding standard that assigns English letters, digits, and symbols to numbers 0 through 255." },
    { title: "Hexadecimal", description: "A base-16 number system using 0-9 and A-F, commonly used as a shorter, more readable stand-in for binary." },
    { title: "Character code", description: "The numeric value assigned to a specific character, which this tool converts to and from binary and hex." },
    { title: "Unicode", description: "A much larger character standard covering non-English scripts and emoji, where many characters need more than 8 bits and don't fit this tool's byte-per-character format." },
  ],
};

export default guide;
