import type { ToolGuide } from "@/types/guide";

const guide: ToolGuide = {
  slug: "word-counter",
  intro: [
    "A word counter tracks the words, characters, sentences, and paragraphs in a piece of text as you type or paste it, updating instantly with no need to click a button. It's built for anyone who has to hit a specific word count or character count: students meeting an assignment's minimum length, writers drafting a blog post, and anyone filling in a form field with a strict character limit. Everything runs locally in your browser as you type, so nothing you paste is sent anywhere or saved.",
    "Paste any text into the box and six live stats update immediately: total words, total characters, characters without spaces, sentence count, paragraph count, and an estimated reading time. There's no minimum or maximum length, so the tool works equally well for checking a single caption-length line of text or a full chapter draft.",
  ],
  sections: [
    {
      heading: "Word Count Targets: Essays, Blog Posts, Novels, Tweets",
      paragraphs: [
        "Word count expectations vary enormously by format. A standard five-paragraph school essay usually runs 500-800 words, while a college application essay is typically capped around 500-650 words by the application platform itself. A blog post aimed at ranking in search results commonly runs 1,200-2,000 words for a how-to guide, though a quick news-style post can still be effective at 300-500 words.",
        "Novel manuscripts vary by genre: a young adult novel typically runs 50,000-80,000 words, a genre thriller or romance novel 70,000-90,000, and an epic fantasy novel can reach 120,000 words or more. On the short end, a short story is usually under 7,500 words, and flash fiction is often under 1,000 words. Knowing the target range for your format before you start drafting saves a round of painful cutting or padding later.",
      ],
      bullets: [
        "School essay: 500-800 words",
        "College application essay: 500-650 words",
        "SEO blog post: 1,200-2,000 words",
        "Short story: under 7,500 words",
        "YA novel: 50,000-80,000 words",
        "Thriller / romance novel: 70,000-90,000 words",
      ],
    },
    {
      heading: "Reading Time and Speaking Time: How They're Calculated",
      paragraphs: [
        "Reading time estimates are built on average reading speed, and this tool calculates it using a standard 200 words-per-minute rate, which sits comfortably inside the range research typically finds: silent adult reading speed averages around 238 words per minute for easy material, while more technical or unfamiliar text is read more slowly. A 200 wpm baseline gives a reasonably conservative estimate that works across most types of writing.",
        "Speaking time is a different calculation entirely, based on how fast people talk rather than read, and the accepted average for a clear, well-paced presentation is around 150 words per minute. That means a 1,500-word speech runs about 10 minutes when read aloud at a natural pace, noticeably longer than the roughly 7-8 minutes the same text would take to read silently at 200 wpm.",
      ],
    },
    {
      heading: "Character Counts vs Word Counts: When Each One Matters",
      paragraphs: [
        "Word counts matter most for content meant to be read as prose, like essays, articles, and books, where length reflects depth of coverage rather than a technical constraint. Character counts matter for fields with a strict technical limit: meta descriptions for search engines are typically cut off around 155-160 characters, and many form fields, database columns, and legacy systems enforce hard character caps regardless of word count.",
        "This tool tracks characters both with and without spaces, since some platforms count spaces toward the limit and others don't specify clearly. When in doubt for any platform with a stated character limit, check the with-spaces total first, since that's the more common way limits are enforced.",
      ],
    },
    {
      heading: "Sentence and Paragraph Counting: How the Tool Defines Them",
      paragraphs: [
        "The tool counts a sentence as any run of text ending in a period, question mark, or exclamation point, so it can occasionally miscount abbreviations like \"Dr.\" or \"e.g.\" as sentence breaks, since it has no way to distinguish an abbreviation's period from an actual sentence ending. For most prose this produces an accurate count, but text heavy with abbreviations will read slightly higher than the true sentence count.",
        "Paragraphs are counted as blocks of text separated by a blank line, matching how most word processors and content management systems define a paragraph. If you paste text that lost its line breaks during a copy-paste from a PDF or website, the tool may show your writing as a single paragraph even though it reads as several visually.",
      ],
    },
    {
      heading: "Using a Word Counter for Assignments and Content Writing",
      paragraphs: [
        "For students, a strict word count minimum or maximum is often part of the grading rubric itself, so checking the live count while drafting avoids the last-minute scramble of cutting several hundred words the night before a deadline. Watching the sentence count alongside the word count can also flag overly long, run-on sentences that a word count alone wouldn't reveal.",
        "For content writers, matching a target word count set by an editor or SEO brief is a routine part of the job, and pasting a draft in throughout the writing process, rather than only at the end, makes it easier to notice when a section has grown disproportionately long compared to the rest of the piece.",
      ],
    },
    {
      heading: "Word Counter Limits With Non-Latin and Multilingual Text",
      paragraphs: [
        "This tool counts words by splitting text on whitespace, which works well for English and other space-separated languages but produces misleading results for languages like Chinese or Japanese, where words aren't separated by spaces at all; a full paragraph of Japanese text might register as a single \"word\" even though it contains many actual words.",
        "For character-based limits on platforms serving those languages, the character count is more reliable than the word count, since it doesn't depend on spacing conventions. If you're writing primarily in a non-space-separated language, treat the word count number as a rough approximation rather than an exact figure.",
      ],
    },
  ],
  useCases: [
    { title: "Meeting essay word count requirements", description: "Check a draft against an assignment's minimum or maximum word count before submitting it." },
    { title: "Writing to a content brief", description: "Match a target word count set by an editor, client, or SEO content brief for a blog post or article." },
    { title: "Fitting character-limited fields", description: "Check character counts for meta descriptions, form fields, and other places with a strict technical limit." },
    { title: "Estimating presentation length", description: "Use the reading time estimate as a rough guide, then adjust for a slower ~150 wpm speaking pace." },
    { title: "Editing for conciseness", description: "Track how word and sentence counts change as you cut or tighten a draft during revision." },
  ],
  mistakes: [
    { title: "Assuming reading time equals speaking time", description: "Reading time is based on silent reading speed; a spoken version of the same text takes noticeably longer." },
    { title: "Not accounting for pasted formatting", description: "Copy-pasting from a PDF can merge paragraphs, throwing off the paragraph count without changing the visible text." },
    { title: "Trusting sentence count for abbreviation-heavy text", description: "Abbreviations with periods, like \"Dr.\" or \"U.S.\", can inflate the sentence count above the true number." },
    { title: "Checking character count only at the end", description: "Waiting until a draft is finished to check a strict character limit often means a rushed, less careful cut." },
  ],
  tips: [
    "Paste your draft in early and re-check the count as you revise, not only right before submitting.",
    "Use the reading time as a rough guide and the ~150 wpm speaking rate for anything meant to be read aloud.",
    "Check both the with-spaces and without-spaces character counts when a platform's limit isn't clearly specified.",
    "Expect a slightly inflated sentence count in text with many abbreviations.",
    "Look up the word count target for your specific format before you start drafting, not after.",
  ],
  glossary: [
    { title: "Word count", description: "The total number of words in a piece of text, generally counted as groups of characters separated by whitespace." },
    { title: "Character count", description: "The total number of individual characters in a text, often tracked both with and without spaces." },
    { title: "Reading time", description: "An estimate of how long silent reading of a text would take, usually based on an average words-per-minute rate." },
    { title: "Speaking rate", description: "The average pace of spoken delivery, typically slower than silent reading speed, often cited around 150 words per minute." },
    { title: "SEO content brief", description: "A set of guidelines, often including a target word count, given to a writer before drafting an article meant to rank in search results." },
  ],
};

export default guide;
