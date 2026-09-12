import type { ToolGuide } from "@/types/guide";

const guide: ToolGuide = {
  slug: "number-to-words",
  intro: [
    "This number to words converter spells out any whole number or decimal as English text, in one of three formats: standard words, an ordinal (turning 1, 2, 3 into \"first,\" \"second,\" \"third\"), or a currency phrase with dollars and cents. Type a number, pick a format, and the spelled-out version appears instantly with its own copy button — no need to write it out by hand or remember the hyphenation and \"and\" rules English uses for numbers past one hundred.",
    "Spelling out numbers correctly matters most in a handful of specific, high-stakes situations: writing a check where the numeral and the words have to match exactly, drafting a legal contract or deed where spelled-out amounts prevent tampering with a numeral, or writing an invoice or formal letter where the convention is to spell out amounts in full. This tool handles numbers from zero up into the hundreds of trillions, applying the standard American English rules for hyphenating compound numbers and placing \"and\" correctly in currency amounts.",
  ],
  sections: [
    {
      heading: "How to Write Numbers in Words for Checks and Contracts",
      paragraphs: [
        "Writing a check requires the dollar amount spelled out in words on the line below the numeral box, and the two need to match exactly to avoid a bank rejecting or questioning the check. Switch this tool to Currency mode, type the amount, and it produces the full phrase, including both the dollar amount and the cents, such as \"one thousand two hundred thirty-four dollars and fifty-six cents\" for $1,234.56.",
        "Legal contracts and formal documents often spell out numbers for a different reason than a check does: not to prevent forgery on a single line, but to remove any ambiguity from a numeral that could otherwise be altered, misread, or formatted inconsistently across a long document. Standard mode, without the dollar and cent framing, produces the plain spelled-out number for these cases, such as \"one thousand two hundred thirty-four\" for a quantity, a term length, or any other whole number a contract needs written out in full.",
      ],
    },
    {
      heading: "Hyphenation Rules for Written-Out Numbers (Twenty-One, One Hundred and One)",
      paragraphs: [
        "American English hyphenates compound numbers from twenty-one through ninety-nine whenever the tens and ones digits are both non-zero: twenty-one, forty-five, ninety-nine. This tool applies that rule automatically, joining the tens word and the ones word with a hyphen rather than a space. Round numbers like twenty, thirty, or ninety need no hyphen since there's no ones digit to join.",
        "Above one hundred, this tool follows the American convention of not inserting \"and\" between the hundreds and the rest of the number, so 101 becomes \"one hundred one,\" not \"one hundred and one.\" That differs from British English, which traditionally does include the \"and\" in that position. The one place this tool does add \"and\" is in Currency mode, between the dollar amount and the cents, which follows standard check-writing convention rather than a general grammar rule.",
      ],
      bullets: [
        "21-99 with a non-zero ones digit: hyphenated (twenty-one, sixty-seven)",
        "Round tens (20, 30, 90): no hyphen needed",
        "Hundreds: no \"and\" inserted (\"one hundred one,\" not \"one hundred and one\")",
        "Currency mode: \"and\" appears between dollars and cents (\"ten dollars and fifty cents\")",
      ],
    },
    {
      heading: "Converting Large Numbers: Thousand, Million, Billion, and Trillion",
      paragraphs: [
        "This tool breaks a number down using the standard short-scale groupings English uses — thousand (1,000), million (1,000,000), billion (1,000,000,000), and trillion (1,000,000,000,000) — applying each group's name only when that portion of the number is non-zero. A number like 1,000,000 correctly becomes \"one million\" rather than \"one million zero thousand zero,\" since empty groups are skipped entirely.",
        "The largest number this tool accepts is 999,999,999,999,999, just under one quadrillion, and every group up through trillion is spelled out correctly and combined into one continuous phrase for numbers of any size within that range. Numbers past that limit, or negative numbers whose magnitude exceeds it, are rejected with a validation message rather than silently truncated.",
      ],
    },
    {
      heading: "Ordinal Numbers: First, Second, Twenty-First — and Where the Pattern Breaks",
      paragraphs: [
        "Ordinal mode converts a number into its ranking form: 1 becomes \"first,\" 2 becomes \"second,\" and most numbers follow a simple pattern of adding \"th\" to the end of the word, or \"h\" if the word already ends in \"t.\" Compound numbers work correctly too, since the tool applies the ordinal ending only to the final word: twenty-one correctly becomes \"twenty-first,\" and one hundred three becomes \"one hundred third.\"",
        "There's a real edge case worth knowing about: round multiples of ten (twenty, thirty, forty, and so on) don't follow the simple \"add th\" pattern in standard English — the correct forms are irregular, twentieth, thirtieth, fortieth, not a plain \"th\" tacked onto the end. This tool's simple suffix rule doesn't cover that irregular spelling change, so double-check any ordinal built from an exact multiple of ten before using it in a final document.",
      ],
    },
    {
      heading: "Common Uses for Spelling Out Numbers",
      paragraphs: [
        "Beyond checks and contracts, spelled-out numbers are standard on formal invoices, promissory notes, and legal affidavits, where a written amount next to the numeral reduces the chance of a costly transcription error. Ordinal numbers come up constantly in dates, rankings, event names, like the twenty-first annual conference, and addresses.",
        "Accessibility is another practical use: screen readers and voice interfaces sometimes read a plain numeral awkwardly, and providing a spelled-out label alongside a numeral in specific contexts, like a form field or an alt text description, can make an amount clearer when read aloud rather than displayed.",
      ],
    },
  ],
  useCases: [
    { title: "Writing check amounts", description: "Spell out a dollar amount in Currency mode to match the numeral written on a check exactly." },
    { title: "Drafting legal contracts and deeds", description: "Convert a numeric quantity or term length into words to remove ambiguity in a formal document." },
    { title: "Formatting invoices and receipts", description: "Add a spelled-out amount alongside a numeral on an invoice for extra clarity." },
    { title: "Writing dates and rankings", description: "Convert a number into its ordinal form for dates, anniversaries, or ranked lists." },
    { title: "Accessibility labels", description: "Provide a spelled-out version of a numeral for contexts where a written-out number reads more clearly aloud." },
  ],
  mistakes: [
    { title: "Expecting decimals to spell out digit by digit in Words mode", description: "Words and Ordinal mode use only the whole-number part; only Currency mode converts the decimal portion, and it does so as cents, not individual digits." },
    { title: "Trusting the ordinal form of an exact multiple of ten", description: "Round tens like twenty, thirty, and ninety produce an irregular ordinal in standard English (twentieth, thirtieth, ninetieth) that this tool's simple suffix rule doesn't apply — check those manually." },
    { title: "Assuming British \"and\" placement", description: "This tool follows the American convention and skips \"and\" after hundreds (\"one hundred one\"), unlike British English's \"one hundred and one.\"" },
    { title: "Entering a number above 999 trillion", description: "Numbers larger than 999,999,999,999,999 are rejected rather than converted, since that's the tool's supported range." },
  ],
  tips: [
    "Use Currency mode whenever you need cents spelled out, not just the whole dollar amount.",
    "Double-check ordinal forms of exact multiples of ten (twentieth, thirtieth) by hand, since the automated suffix rule doesn't cover that irregular spelling.",
    "Copy the spelled-out amount straight onto a check or contract to avoid a transcription mismatch with the numeral.",
    "Remember hyphens appear only between the tens and ones words (twenty-one), not elsewhere in the number.",
    "Enter negative numbers with a minus sign to get the correct \"negative\" prefix in the output.",
  ],
  glossary: [
    { title: "Ordinal number", description: "A number indicating position or rank, such as first, second, or twenty-first, as opposed to a cardinal number like one or two." },
    { title: "Short scale", description: "The number-naming system used in American English where each new group name (thousand, million, billion) represents one thousand times the previous one." },
    { title: "Cardinal number", description: "A number used for counting or quantity, such as one, two, or one hundred, as opposed to an ordinal like first or second." },
    { title: "Hyphenated compound number", description: "A two-word number from twenty-one to ninety-nine joined with a hyphen, such as forty-seven." },
    { title: "Currency phrase", description: "The spelled-out form of a monetary amount including both the whole-dollar words and the cents, as used on checks." },
  ],
};

export default guide;
