import type { ToolGuide } from "@/types/guide";

const guide: ToolGuide = {
  slug: "list-randomizer",
  intro: [
    "This free online list randomizer takes any list of names, tasks, prizes, or items and puts them in a random order, or pulls a random subset from them, in a single click. Type or paste your items into the text box, one per line or separated by commas, and choose whether to shuffle the entire list or pick a specific number of random winners from it.",
    "It's built for the situations where a fair, unbiased order or selection actually matters: assigning tasks so nobody feels the list was stacked, picking raffle or giveaway winners, generating a random presentation order, or just settling on a random meal plan from a list of options. The shuffle uses the Fisher-Yates algorithm, a well-established method for producing a genuinely random permutation of a list rather than a naive shuffle that can favor certain orderings.",
    "Results appear as a clean numbered list that you can copy to your clipboard in one click, ready to paste into an email, a spreadsheet, or a chat message, with no account or software installation required.",
  ],
  sections: [
    {
      heading: "How to Shuffle a List Fairly (Fisher-Yates Explained)",
      paragraphs: [
        "This tool shuffles using the Fisher-Yates algorithm, which works backward through the list: starting from the last item, it picks a random item from everything at or before that position and swaps them, then moves one position earlier and repeats, until the whole list has been shuffled. This guarantees every possible ordering of the list is equally likely, unlike simpler shuffling methods, such as randomly swapping pairs a fixed number of times, which can subtly favor some arrangements over others.",
        "For a list of names, tasks, or prize entries, that fairness matters: if a shuffle method has any bias, it can lead to certain items ending up near the top of the results more often than chance would predict, which defeats the point of randomizing in the first place. Fisher-Yates has been the standard, provably-fair shuffling method in computer science for exactly this reason.",
      ],
    },
    {
      heading: "Shuffle All vs Pick N: Choosing the Right Mode",
      paragraphs: [
        "Use Shuffle All when you want every item in your list reordered, like generating a random speaking order for a class or a random queue of tasks to work through. Use Pick N, with the number field next to it, when you only want a random subset pulled from a larger list, like selecting 3 winners from 200 raffle entries or picking one restaurant from a shortlist of ten.",
        "Pick N works by shuffling the full list first and then taking the first N results, so the chosen items are still drawn with the same fairness as a full shuffle, just truncated to the count you specify. If you ask for more winners than there are items in your list, the tool automatically caps the count at the list's total size.",
      ],
      bullets: [
        "Shuffle All: reorders every item, nothing is left out",
        "Pick N: selects a random subset of a specific size from the list",
        "Both modes use the same underlying Fisher-Yates shuffle for fairness",
      ],
    },
    {
      heading: "Picking Giveaway or Raffle Winners Transparently",
      paragraphs: [
        "For a social media giveaway, a raffle, or a classroom prize drawing, paste every eligible name or entry number into the box, one per line, set the Pick N count to however many winners you need, and click Pick N. Because the result comes from a genuine shuffle rather than a manually chosen order, it's easy to explain to participants how winners were selected, and the numbered result list makes it simple to screenshot or copy as proof of the draw.",
        "If some entries appear multiple times in your list (for example, someone who entered a giveaway more than once, which some giveaways intentionally allow for extra entries), leave the duplicates in; each line is still treated as its own separate entry with an equal chance of being picked, which matches how most giveaway rules work.",
      ],
    },
    {
      heading: "Entering Your List: One Per Line vs Comma-Separated",
      paragraphs: [
        "The text box accepts two input styles: one item per line, or a single line of items separated by commas. If your pasted text has more than one line, the tool treats each line as a separate item; if it's a single line, it falls back to splitting on commas instead. This means a list pasted from a spreadsheet column works immediately, and so does a list typed out as \"Alice, Bob, Charlie\" on one line.",
        "Extra whitespace around each item is trimmed automatically, and empty lines are ignored, so a list copied from a document with stray blank lines or trailing spaces won't produce empty entries in your shuffled result.",
      ],
    },
    {
      heading: "Randomizing Task Order, Names, and Assignments Fairly",
      paragraphs: [
        "Beyond giveaways, this tool is useful anywhere a fixed order needs to feel unbiased: a teacher randomizing which student presents first, a team lead randomizing who reviews which pull request, or a group randomizing the order people speak in a meeting. Because the same list shuffled twice produces two different, independent results, you can re-shuffle as many times as needed if the first result needs to be redone for any reason.",
        "For recurring randomization, like assigning a new task order every week, keep your source list saved separately (in a note or spreadsheet) and paste it in fresh each time, since the tool doesn't save your list between visits.",
      ],
    },
    {
      heading: "Copying and Using Your Randomized Results",
      paragraphs: [
        "Once a shuffle or pick finishes, the results appear as a numbered list on screen, and the Copy Result button copies every item, in its randomized order, to your clipboard as plain text separated by line breaks. That format pastes cleanly into an email, a spreadsheet column, a chat message, or a document without extra formatting to clean up.",
        "The numbered display also makes the result easy to read aloud or reference during a live drawing or meeting, since each item's position in the random order is labeled clearly from 1 down to the last item or winner.",
      ],
    },
  ],
  useCases: [
    { title: "Picking raffle or giveaway winners", description: "Paste every entry and use Pick N to fairly select a specific number of winners from the full list." },
    { title: "Randomizing presentation or speaking order", description: "Shuffle a class roster or team list to generate a fair, unbiased order for presentations or meetings." },
    { title: "Assigning tasks or chores randomly", description: "Shuffle a list of tasks or people to distribute assignments without anyone feeling the order was picked on purpose." },
    { title: "Choosing between options", description: "Enter a shortlist of restaurants, movies, or activities and use Pick N with a count of 1 to choose randomly." },
    { title: "Classroom activities and games", description: "Randomize student names for cold-calling, team assignments, or turn order in a classroom game." },
  ],
  mistakes: [
    { title: "Expecting duplicates to be automatically removed", description: "The tool doesn't deduplicate items; a name entered twice is treated as two separate, independently-weighted entries." },
    { title: "Pasting a single line and expecting line-by-line splitting", description: "A single line of text is split on commas, not treated as one item; add line breaks or commas to separate entries correctly." },
    { title: "Asking Pick N for more winners than items in the list", description: "The count is automatically capped at the list's total size, so you can't pick more winners than there are entries." },
    { title: "Assuming results are saved between visits", description: "Your list and results aren't stored; copy the output before navigating away if you need it later." },
  ],
  tips: [
    "Paste a spreadsheet column directly; each row becomes its own item automatically.",
    "Use Pick N instead of Shuffle All when you only need a specific number of winners or selections.",
    "Re-shuffle as many times as you like; each click produces a fresh, independent random order.",
    "Leave intentional duplicate entries in place if your giveaway rules allow multiple entries per person.",
    "Use the Copy Result button to paste the randomized list directly into a spreadsheet or message.",
    "Keep a saved copy of your source list elsewhere if you'll need to randomize it again later.",
  ],
  glossary: [
    { title: "Fisher-Yates shuffle", description: "An algorithm that produces a random permutation of a list where every possible ordering is equally likely, considered the standard for fair shuffling." },
    { title: "Pick N", description: "Selecting a specific number of random items from a larger list, commonly used for choosing giveaway or raffle winners." },
    { title: "Random permutation", description: "A reordering of a list's items where the resulting sequence is chosen with equal probability among all possible arrangements." },
    { title: "Entry weighting", description: "How much chance each item in a list has of being selected; duplicate entries increase an item's effective chance since each line counts separately." },
  ],
};

export default guide;
