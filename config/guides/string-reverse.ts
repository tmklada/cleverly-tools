import type { ToolGuide } from "@/types/guide";

const guide: ToolGuide = {
  slug: "string-reverse",
  intro: [
    "A string reverse tool flips text backwards, but \"backwards\" can mean more than one thing, and this tool computes all of them from a single piece of text you paste in: the full string reversed character by character, each individual word reversed while the word order stays the same, the order of the words reversed while each word stays spelled correctly, and a Unicode mirror-flip version that turns the text visually upside down using lookalike characters. All four results appear together instantly, each with its own copy button.",
    "Reversing a string is a common exercise in programming interviews and coding practice, and it's also a genuinely useful text trick outside of code — for building a simple cipher, checking whether a word or phrase is a palindrome, generating novelty text for social media, or testing how a script or regex handles reversed input. This tool covers both the practical and the playful uses without requiring you to write any code yourself.",
  ],
  sections: [
    {
      heading: "Reverse a String in JavaScript, Python, and Excel (and Why Emoji Break It)",
      paragraphs: [
        "In JavaScript, the standard way to reverse a string is to split it into an array of characters, reverse the array's order, and join it back into a string: text.split(\"\").reverse().join(\"\"). Python does it even more compactly with slice notation, text[::-1], which reads the string backward in one step. Excel has no built-in reverse function, so it's usually done with a formula combining TEXTJOIN, MID, and ROW, or with a short macro — which is exactly the kind of case where pasting the text into a tool like this one instead is faster than building a formula.",
        "All of these approaches, including this tool's \"Reversed String\" result, work by reversing individual character units, not by reversing meaning. That causes a specific problem with emoji and other multi-part symbols: many emoji are actually built from two or more separate Unicode characters joined together, such as a skin-tone modifier or a zero-width joiner combining multiple emoji into one. Reversing those units independently can break the emoji apart or scramble it into a different, broken symbol instead of just flipping its position.",
      ],
    },
    {
      heading: "Character Reverse vs Word Reverse vs Word-Order Reverse: What's the Difference",
      paragraphs: [
        "These three results sound similar but do different things, and mixing them up is the most common confusion with a reverse tool. The full \"Reversed String\" result reverses every character in the entire input, including spaces, so \"Hello World\" becomes \"dlroW olleH\" — the words are no longer readable on their own.",
        "\"Reversed Words (keep order)\" instead reverses the letters inside each word individually but leaves the words in their original positions, turning \"Hello World\" into \"olleH dlroW\". \"Reversed Word Order\" does the opposite: it keeps every word spelled correctly but reverses the sequence they appear in, turning \"Hello World\" into \"World Hello\". Pick the one that matches what you're actually trying to do — a cipher usually wants full character reversal, while re-ordering a sentence for style wants word-order reversal.",
      ],
      bullets: [
        "Reversed String: \"Hello World\" becomes \"dlroW olleH\" (every character flipped)",
        "Reversed Words (keep order): \"Hello World\" becomes \"olleH dlroW\" (each word flipped, order kept)",
        "Reversed Word Order: \"Hello World\" becomes \"World Hello\" (words kept intact, order flipped)",
      ],
    },
    {
      heading: "Mirror Text: How the Unicode Upside-Down Flip Works",
      paragraphs: [
        "The \"Mirror Text\" result is different from the other three because it doesn't just reorder characters — it substitutes each letter, digit, and punctuation mark with a different Unicode character chosen to look like a mirror image or upside-down version of the original, then reverses the order so the whole thing reads correctly flipped. The lowercase letter \"e,\" for example, is replaced with \"ǝ,\" an existing Unicode character that happens to look like an upside-down e.",
        "This only works for characters that have a visually similar Unicode lookalike available; the tool's mirror map covers the 26 lowercase and uppercase English letters, the 10 digits, and a handful of common punctuation marks. Any character outside that set, including accented letters, most punctuation, and non-Latin scripts, is left unchanged rather than mirrored, since no matching lookalike character exists to substitute.",
      ],
    },
    {
      heading: "Checking for Palindromes With a Reverse Tool",
      paragraphs: [
        "A palindrome is a word or phrase that reads the same forwards and backwards, like \"level\" or \"racecar.\" The simplest way to test one by hand is to compare the original text against the \"Reversed String\" result: if the two match, it's a palindrome. This tool doesn't run that comparison automatically, but reading the reversed output side by side with your input makes the check quick for short words and phrases.",
        "For phrase-level palindromes like \"A man, a plan, a canal, Panama,\" remember that a proper check normally ignores spaces, punctuation, and letter case, none of which this tool strips out automatically. Removing spaces and punctuation and converting everything to one case before pasting it in will give you an accurate character-by-character reversed comparison.",
      ],
    },
    {
      heading: "Common Uses for Reversing Text",
      paragraphs: [
        "Beyond testing palindromes, reversing text is a quick way to build a simple substitution-style puzzle or novelty message for social media, since a fully reversed sentence reads as intentional gibberish until someone runs it back through a mirror or a reverse tool. Reversed word order also comes up when formatting certain display quirks or working around older systems that render text in an unexpected direction.",
        "On the development side, reversing strings is one of the most common small exercises used to practice loops, array methods, or recursion in a new programming language, and it's also useful for a quick sanity check when writing or debugging a function that's supposed to process text symmetrically, such as a string-matching or encoding routine.",
      ],
    },
  ],
  useCases: [
    { title: "Testing palindromes", description: "Compare original text against its reversed version to check whether a word or phrase reads the same forwards and backwards." },
    { title: "Practicing coding exercises", description: "Check your own JavaScript, Python, or Excel string-reversal logic against a known-correct result." },
    { title: "Creating novelty social posts", description: "Generate mirror-flipped or backwards text for a playful caption, bio, or message." },
    { title: "Fixing word order quickly", description: "Reverse the order of words in a short phrase without retyping it by hand." },
    { title: "Building simple text puzzles or ciphers", description: "Turn a message into reversed text as a lightweight puzzle for someone to decode." },
  ],
  mistakes: [
    { title: "Reversing text with emoji or accented characters", description: "Multi-part Unicode characters like many emoji can break apart when reversed character by character instead of flipping cleanly." },
    { title: "Confusing word reverse with word-order reverse", description: "Reversing each word's letters and reversing the order of the words are different results — check which one you actually need." },
    { title: "Expecting Mirror Text to flip every character", description: "Only letters, digits, and a handful of punctuation marks have a mirrored lookalike; other characters pass through unchanged." },
    { title: "Forgetting to strip spaces and punctuation before a phrase palindrome check", description: "A proper phrase palindrome check ignores spacing, punctuation, and case, none of which this tool removes automatically." },
  ],
  tips: [
    "Use the full \"Reversed String\" result when checking a single-word palindrome.",
    "Strip spaces, punctuation, and case differences yourself before checking a phrase-level palindrome.",
    "Use \"Reversed Word Order\" when you want a sentence read back-to-front but each word still spelled correctly.",
    "Avoid Mirror Text for accented letters or non-Latin scripts since no lookalike character exists for them.",
    "Copy straight from the result box that matches your need — all four versions are generated at once.",
  ],
  glossary: [
    { title: "Palindrome", description: "A word, phrase, or sequence that reads the same forwards and backwards, such as \"level\" or \"racecar.\"" },
    { title: "Unicode", description: "The character-encoding standard that assigns a unique number to virtually every letter, symbol, and emoji, including the mirrored lookalike characters this tool uses." },
    { title: "Mirror text", description: "Text rewritten using visually similar Unicode characters so it reads as an upside-down or mirrored version of the original." },
    { title: "Character reversal", description: "Reversing the order of individual characters in a string, as opposed to reversing the order of whole words." },
    { title: "Zero-width joiner", description: "A special Unicode character used to combine multiple emoji characters into a single displayed emoji, which can break apart under character-by-character reversal." },
  ],
};

export default guide;
