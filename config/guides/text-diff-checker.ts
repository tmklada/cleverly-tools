import type { ToolGuide } from "@/types/guide";

const guide: ToolGuide = {
  slug: "text-diff-checker",
  intro: [
    "A text diff checker compares two blocks of text line by line and highlights exactly what changed between them — lines added, lines removed, and lines that stayed the same. Paste an original version into the left panel and a revised version into the right panel, click Compare Texts, and the tool shows a combined, color-coded view: green for added lines, red for removed lines, with a running count of how many lines and characters changed.",
    "It works on any plain text — source code, contracts, essays, emails, configuration files — since the comparison is based purely on matching lines of text, not on understanding the content's meaning. The comparison is always case-sensitive, so a line that only differs in capitalization will show up as one line removed and one added.",
    "This guide covers when a line-level diff is the right tool versus a word-level diff, how the underlying comparison algorithm works, and practical ways to use it for proofreading, code review, and contract comparison.",
  ],
  sections: [
    {
      heading: "Line Diff vs Word Diff: Which to Use for Proofreading vs Code",
      paragraphs: [
        "This tool compares text line by line, meaning each line is treated as a single unit — if even one word on a line changes, the entire line is marked as removed from the original and added in the modified version, rather than highlighting just the changed word within that line. This is exactly how most code diff tools work, and it's the standard way developers review pull requests, since source code is naturally organized into lines and a line-level change is usually a meaningful, reviewable unit.",
        "For proofreading prose, a line-level diff is most useful when your original and revised text are already broken into short lines or short paragraphs, since a single long paragraph with one word changed will show the whole paragraph as removed and re-added rather than pointing at the specific word. For that kind of fine-grained editing check, a word-level diff tool would highlight only the changed word, so keep in mind this tool's granularity is the line, not the word, when reading its output on prose with long paragraphs.",
        "A practical workaround for prose is to break your text into shorter lines — one sentence per line, for example — before pasting it in, which makes the line-level diff much more precise for catching small wording changes between two drafts.",
      ],
    },
    {
      heading: "How to Compare Two Versions of a Contract or Essay",
      paragraphs: [
        "When comparing two versions of a longer document like a contract or an essay draft, paste the earlier version into the Original Text panel and the newer version into Modified Text, then click Compare. Read the stats row first — lines added, lines removed, characters added, characters removed — to get a quick sense of how extensive the revision was before reading through every line.",
        "For a contract, pay particular attention to red (removed) lines, since a clause that was deleted entirely is often the change that matters most, and it's easy to overlook if you're scanning quickly for additions instead. Because the comparison is case-sensitive, a change like updating \"the Buyer\" to \"the buyer\" will register as a real change even though the meaning is unchanged, so treat purely cosmetic capitalization differences as noise when you see them appear.",
      ],
    },
    {
      heading: "How the Diff Algorithm Works (Longest Common Subsequence)",
      paragraphs: [
        "Behind the scenes, this tool uses a longest common subsequence (LCS) algorithm, a well-established method for finding the largest set of lines that appear in the same order in both texts without needing to appear consecutively. Everything in that common subsequence is marked unchanged, and everything else is classified as either removed from the original or added in the modified version.",
        "This is the same general approach used by version control systems like Git for their line-based diffs, which is why the output format here — with a plus sign for additions and a minus sign for deletions — will look familiar if you've ever reviewed a code diff before. One side effect of LCS-based diffing is that when a line is moved to a different position without changing its content, it's typically shown as unchanged rather than as a deletion-and-addition pair, since the algorithm looks for matching content regardless of exact position.",
      ],
    },
    {
      heading: "Using the Diff Output: Stats, Colors, and What They Mean",
      paragraphs: [
        "After clicking Compare, four stat tiles summarize the result: lines added, lines removed, characters added, and characters removed, giving you a numeric sense of the change size before reading the detailed diff. Below that, each line of the combined output is color-coded and prefixed — a green line with a plus sign was added in the modified version, a red line with a minus sign and strikethrough was removed from the original, and an unprefixed gray line was unchanged and appears in both versions.",
        "If the two texts are completely identical, the tool reports \"No differences found\" instead of an empty diff, which is a quick way to confirm two files or drafts match exactly without reading through them line by line.",
      ],
    },
    {
      heading: "Common Mistakes When Comparing Text",
      paragraphs: [
        "The most common mistake is pasting text that lost its original line breaks during copy-paste, often from a PDF or a web page, which collapses what should be many short lines into one long line and makes the diff far less precise, since a single-word change buried inside one giant line will mark that whole line as changed. Re-adding reasonable line breaks before pasting fixes this.",
        "Another common issue is forgetting the comparison is case-sensitive: two lines that read the same to a human eye but differ only in capitalization or trailing whitespace will show up as a full removal and addition, which can make a diff look far noisier than the actual substantive changes warrant.",
      ],
    },
  ],
  useCases: [
    { title: "Reviewing a contract revision", description: "Compare an old and new draft of a legal document to spot exactly which clauses were added or removed." },
    { title: "Checking an essay's edits", description: "See what changed between an original draft and a revised version after editing." },
    { title: "Comparing configuration files", description: "Spot differences between two versions of a config file, like an .env or JSON settings file." },
    { title: "Reviewing small code changes", description: "Paste two versions of a function or script to see exactly which lines were modified." },
    { title: "Verifying copy-paste accuracy", description: "Confirm two blocks of text are identical, or find the one line that differs, after copying content between systems." },
  ],
  mistakes: [
    { title: "Pasting text that lost its line breaks", description: "Text copied from a PDF often collapses into one long line, making the line-level diff far less useful." },
    { title: "Expecting word-level highlighting", description: "This tool marks whole lines as changed, not the specific word within a line that differs." },
    { title: "Forgetting case sensitivity", description: "A capitalization-only change will show as a full line removed and re-added, not as unchanged." },
    { title: "Ignoring the stats before reading line by line", description: "The added/removed counts give a fast sense of change size before you dig into the detailed diff." },
  ],
  tips: [
    "Break long paragraphs into shorter lines before pasting for a more precise, sentence-level comparison.",
    "Check the stats row first to gauge how large the revision is before reading every line.",
    "Remember the comparison is always case-sensitive when reviewing unexpected red-and-green pairs.",
    "Pay close attention to red (removed) lines in contract reviews, since deletions are easy to skim past.",
    "Re-add line breaks lost from a PDF or web copy-paste before comparing.",
  ],
  glossary: [
    { title: "Diff", description: "A comparison between two versions of text that highlights what was added, removed, or unchanged." },
    { title: "Longest common subsequence (LCS)", description: "An algorithm that finds the largest set of matching lines appearing in the same order in both texts, used as the basis for this tool's diff." },
    { title: "Line-level diff", description: "A comparison method that treats each full line as the unit of change, as opposed to comparing individual words." },
    { title: "Word-level diff", description: "A more granular comparison method that highlights the specific words that changed within a line, rather than marking the whole line as different." },
  ],
};

export default guide;
