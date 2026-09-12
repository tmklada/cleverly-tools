import type { ToolGuide } from "@/types/guide";

const guide: ToolGuide = {
  slug: "keyword-density-checker",
  intro: [
    "Keyword density — how often a word shows up in your content relative to the total word count — used to be treated as a precise dial SEOs could tune to hit a magic number. This keyword density checker calculates that percentage for every meaningful word in a piece of text, so you can spot a term that's repeated far more (or less) than you intended before you publish, without pretending density alone is a ranking strategy.",
    "Paste in an article, product description, or landing page copy, and the tool counts every single word, filters out common stop words like \"the\" and \"and\" by default, and ranks the top 20 remaining words by how often they appear, each shown with a raw count and a percentage of total words. A minimum word-length slider and a stop-word toggle let you adjust what counts as a real keyword versus noise.",
    "Everything runs locally in your browser as you type — there's no submit button holding things up, the counts update live. It's built for a quick sanity check on repetition, not as a replacement for actual topical research or a guarantee about how a search engine will rank the page.",
  ],
  sections: [
    {
      heading: "How Keyword Density Is Calculated: The Simple Formula Behind the Percentage",
      paragraphs: [
        "The formula is exactly what it sounds like: density = (number of times a word appears ÷ total word count) × 100. If your article is 1,000 words long and the word \"budget\" appears 15 times, that's a 1.5% density for \"budget\" — nothing more mysterious than a count divided by a total.",
        "The total word count used as the denominator includes every word in your text, not just the filtered keywords shown in the results list — so switching the stop-word filter on or off changes which words appear in the top-20 list, but it does not change the total-word denominator each percentage is calculated against.",
      ],
    },
    {
      heading: "What Keyword Density Should You Aim For in 2026? (And Why the Number Is a Trap)",
      paragraphs: [
        "This tool's own color coding treats roughly 1–3% as a reasonable range, 3–5% as getting high, and above 5% as likely excessive — a rough guideline shared by a lot of SEO tools going back over a decade. It's a useful sanity check, but there's no research-backed exact percentage that search engines actually reward, and no external verification that any specific number correlates with better rankings today.",
        "Modern search ranking relies far more heavily on topical relevance and natural language understanding — systems designed to recognize synonyms, related concepts, and whether content actually and thoroughly answers a query — than on literal repeat counts of one exact phrase. Treat the density percentage as a repetition check, not a target to hit; content that reads naturally and covers a topic thoroughly, using varied related terms rather than the same exact word over and over, tends to serve readers (and search engines) better than content engineered to land in a specific density band.",
      ],
    },
    {
      heading: "Keyword Stuffing vs Natural Usage: What Google Actually Penalizes",
      paragraphs: [
        "Keyword stuffing is the practice of repeating a term or phrase far more than natural language would, often crammed into places a reader wouldn't normally read closely — image alt text, footer text, or a list of keyword variations with no sentence structure around them. Search engines' spam-fighting systems are built to recognize exactly this pattern: unnatural repetition disconnected from the actual flow of the content.",
        "A practical test: read the sentence containing a high-density word out loud. If it sounds like something you'd actually say to a person, it's very likely fine, no matter what the percentage reads. If it sounds like a word was awkwardly forced in for the sake of hitting a target, that's the version worth rewriting, and this tool is best used to flag where to look, not to justify keeping something that already reads oddly.",
      ],
    },
    {
      heading: "Why This Tool Only Counts Single Words, Not Phrases",
      paragraphs: [
        "It's worth being precise about a real limitation here: this checker counts individual words only. A two-word phrase like \"keyword density\" is not tracked as one unit — it shows up in the results as two separate rows, \"keyword\" and \"density,\" each with its own independent percentage. If your actual target phrase is a multi-word term, this tool won't tell you its combined frequency directly.",
        "The word-matching itself is also strictly alphabetic — it only recognizes runs of letters, so contractions like \"don't\" get split at the apostrophe into \"don\" and \"t,\" and hyphenated compounds like \"state-of-the-art\" get broken into separate words at each hyphen. For an exact count of a specific multi-word phrase, your browser's own Ctrl+F / Cmd+F find-and-count feature on the raw text will give you a more precise answer than this tool's word-by-word breakdown.",
      ],
    },
    {
      heading: "Stop Words and Minimum Length: Tuning the Filter to See What Matters",
      paragraphs: [
        "The stop-word filter removes a fixed list of common English function words — articles, prepositions, pronouns, and similar filler like \"the,\" \"and,\" \"is,\" and \"with\" — so the results list surfaces meaningful topic words instead of being dominated by words that appear constantly in any English sentence. This is the setting you'll want on for almost any normal SEO content review.",
        "The minimum word-length slider (2 to 8 characters) filters out short words below that threshold, which is a rougher second pass at reducing noise — raising it to 4 or 5 tends to push past short connector words that survive the stop-word list. Turn the stop-word filter off only when you specifically need raw, unfiltered word frequency — for instance, checking exact repetition in dialogue, lyrics, or legal text where common words matter to the count.",
      ],
    },
    {
      heading: "Reading the Color-Coded Density Bars",
      paragraphs: [
        "Each keyword row shows a horizontal bar alongside its raw count and percentage, colored green for roughly 1–3%, yellow for 3–5%, and red above 5% — a quick visual scan lets you spot the handful of words worth a closer look without reading every number individually. The three summary tiles above the list — total words, unique words, and number of keywords shown — give you a fast sense of the content's overall length and vocabulary variety before you even look at individual terms.",
        "A single red bar isn't automatically a problem on its own — a branded product name or a core, unavoidable technical term can legitimately repeat often in short copy. Use the color as a prompt to go read that word in context, not as an automatic verdict that something needs to be cut.",
      ],
    },
  ],
  useCases: [
    { title: "Pre-publish repetition check", description: "Scan a finished blog post or landing page for any word repeated far more than intended before it goes live." },
    { title: "Auditing existing page copy", description: "Paste in a live page's content to see if a target term is underused, overused, or roughly in line with the rest of the page." },
    { title: "Reviewing AI-generated or outsourced copy", description: "Check guest posts or AI-drafted content for unnatural repetition patterns that read as stuffed rather than written naturally." },
    { title: "Comparing pages targeting the same term", description: "Run several competing pages through the checker to see how differently each one actually uses the shared target keyword." },
    { title: "Spot-checking product description templates", description: "Verify a bulk-generated set of product descriptions isn't repeating the brand or product name at an unnatural rate." },
    { title: "Teaching writers about natural keyword usage", description: "Use the color-coded output as a quick visual example when explaining stuffing versus natural usage to a content writer." },
  ],
  mistakes: [
    { title: "Chasing an exact density percentage", description: "There's no verified magic number that improves rankings — treat the percentage as a repetition sanity check, not a target to engineer toward." },
    { title: "Expecting multi-word phrase tracking", description: "This tool counts single words only, so a two- or three-word target phrase won't show up as one combined percentage — use Ctrl+F for exact phrase counts instead." },
    { title: "Setting the minimum length too low", description: "A threshold of 2 or 3 lets short, low-signal words crowd the results list even with stop-word filtering on." },
    { title: "Disabling stop-word filtering by default", description: "With it off, common words like \"and\" or \"that\" can dominate the top of the list and bury the terms actually worth reviewing." },
    { title: "Flagging a high-density word without reading it in context", description: "A repeated brand name or necessary technical term can be legitimate — check the actual sentences before assuming a red bar means stuffing." },
  ],
  tips: [
    "Treat the density percentage as a rough repetition check, not a ranking-factor target to hit exactly.",
    "Raise the minimum word-length slider to 4 or 5 to filter out low-signal short words the stop-word list misses.",
    "Keep stop-word filtering on for typical SEO review; turn it off only when you need raw, unfiltered word counts.",
    "Use your browser's Ctrl+F / Cmd+F to count an exact multi-word phrase, since this tool only tracks single words.",
    "Read any word flagged red back in its actual sentence before deciding it needs to be cut.",
    "Compare density across a handful of competing pages for the same term rather than judging one page in isolation.",
  ],
  glossary: [
    { title: "Keyword density", description: "The percentage of a text made up of a given word, calculated as (occurrences ÷ total words) × 100." },
    { title: "Stop words", description: "Common function words like \"the,\" \"and,\" and \"is\" that carry little topical meaning on their own and are often filtered out of keyword analysis." },
    { title: "Keyword stuffing", description: "Repeating a word or phrase far beyond natural usage, often in a way search engines recognize as an attempt to manipulate rankings." },
    { title: "Topical relevance", description: "How thoroughly and naturally a piece of content covers a subject and its related concepts, which modern search ranking weighs more heavily than exact keyword repetition." },
    { title: "Tokenization", description: "The process of splitting text into individual units (here, single alphabetic words) for counting — this tool's tokenizer does not group multi-word phrases together." },
  ],
};

export default guide;
