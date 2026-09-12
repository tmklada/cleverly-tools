import type { ToolGuide } from "@/types/guide";

const guide: ToolGuide = {
  slug: "random-number-generator",
  intro: [
    "A random number generator produces one or more integers within a range you choose, instantly and without any sign-up. It's the tool behind a random number picker for games, a lottery number generator for a family pool, a dice roll simulator for tabletop games, or a quick way to pull a random sample for a school project or a work survey. Set a minimum and maximum, decide how many numbers you need, and click generate.",
    "The generator supports two modes: numbers can repeat across a single batch, or you can turn on \"Unique numbers only\" so every result in that batch is different, which matters for anything shaped like a draw rather than a series of independent rolls. Every batch you generate is added to a short history list below the results, so you can compare a new set against the last few without re-running the tool from scratch.",
    "Because everything runs in the browser with no account and no stored data tied to you, it works equally well for a one-off decision, like picking a number between 1 and 10 to settle an argument, and for repeated use, like generating a fresh set of raffle numbers every week for a recurring giveaway.",
  ],
  sections: [
    {
      heading: "Random Number Generator 1-100: How Fair Is It? (Crypto vs Math.random)",
      paragraphs: [
        "The default range on this tool is 1 to 100, one of the most common ranges people search for, whether it's a guessing game, a classroom number pick, or a stand-in for rolling a percentile die. Under the hood, the generator uses your browser's built-in Math.random() function, then scales and rounds the result into whole numbers across whatever min and max you set. Math.random() is a pseudorandom number generator: it produces a long sequence of numbers that looks statistically random and is evenly spread across your range, which is exactly what you want for a game, a raffle, or a classroom pick.",
        "It's worth being precise about what \"random\" means here, because not all random number generators are built for the same job. Math.random() is not cryptographically secure, meaning it isn't designed to resist an attacker trying to predict future values, the way a password generator or an encryption key generator needs to be. For a lottery pool, a dice simulator, a giveaway, or a statistics sample, that distinction doesn't matter; the numbers are unpredictable enough for everyday fairness. If you're generating anything security-sensitive, like a token or a secret key, use a purpose-built cryptographic tool instead, not a general random number generator.",
      ],
      bullets: [
        "Numbers are evenly distributed across your chosen min and max, inclusive",
        "Good fit for games, raffles, classroom picks, and casual decisions",
        "Not intended for passwords, tokens, or encryption keys",
        "Each click produces a fresh, independent batch of results",
      ],
    },
    {
      heading: "How to Pick Lottery Numbers or Raffle Winners Without Repeats",
      paragraphs: [
        "Turn on \"Unique numbers only\" whenever a repeated number would break the logic of what you're doing, which is the case for almost anything shaped like a lottery, a raffle, or a draw of assigned numbers. With this setting on, the generator builds the full list of possible numbers for your range, shuffles it, and takes the first however-many you asked for, so no value can appear twice in that batch. For a 6-number lottery pool drawn from 1 to 49, set min to 1, max to 49, count to 6, and check the unique box.",
        "If you ask for more unique numbers than actually exist in your range, such as 10 unique numbers from a range of only 5 possible values, the tool will tell you it can't be done rather than silently giving you duplicates or an incomplete list. This catch prevents a common mistake: assuming a small range can support a large unique draw when it mathematically can't.",
      ],
      bullets: [
        "Set min and max to match your real number pool (for example 1-49)",
        "Set count to how many numbers should be drawn",
        "Check \"Unique numbers only\" so no number repeats in that draw",
        "Watch for the range error if count exceeds the available pool size",
      ],
    },
    {
      heading: "Rolling Virtual Dice and Simulating Games of Chance",
      paragraphs: [
        "For a dice roll simulator, set min to 1 and max to whatever the die's highest face is: 6 for a standard die, 20 for a d20 in a tabletop role-playing game. Set count to the number of dice you're rolling at once, and leave \"Unique numbers only\" off, since real dice can absolutely land on the same face more than once in a single roll. Each number in the result represents one die's outcome, generated independently of the others.",
        "This same independent-rolls pattern applies beyond dice: simulating a coin flip as 1-2, picking a random card rank as 1-13, or generating a string of random digits for a made-up phone number in a mockup all work the same way, with repeats allowed because each value stands on its own rather than being drawn from a shared, shrinking pool.",
      ],
    },
    {
      heading: "Generating Multiple Random Numbers for Sampling and Statistics",
      paragraphs: [
        "Researchers, students, and analysts often need a random sample from a numbered list rather than a name list, such as choosing 20 random respondent IDs out of 500 survey entries for a spot-check. Set the range to match your ID numbers (1 to 500), set count to how many samples you need (20), and choose whether repeats are acceptable for your method. This mirrors the two standard sampling approaches taught in basic statistics.",
        "With \"Unique numbers only\" checked, you get sampling without replacement: each ID can only be selected once, which is the standard approach for most simple random samples, since surveying or auditing the same record twice adds no value. With it unchecked, you get sampling with replacement, where the same ID could theoretically be picked more than once, which is the correct method for certain simulations and bootstrapping exercises where that's mathematically intended rather than a mistake.",
      ],
    },
    {
      heading: "Random Numbers for Ticket Draws, Jersey Numbers, and Assignments",
      paragraphs: [
        "Plenty of everyday tasks call for assigning a random number to something rather than picking a winner: handing out raffle ticket numbers, assigning random jersey numbers to a new sports team, generating a random locker number, or numbering party favors for a game later. Set the range to match how many items or people you're numbering, set count to match as well, and turn on uniqueness so nobody ends up with a duplicate assignment.",
        "Because count is capped at 100 numbers per click, larger batches need to be generated in multiple rounds. The history panel keeps your last five generations visible underneath the current result, so if you're numbering a large group in batches, you can scroll back to confirm what was already assigned to the previous group without having to write it down separately.",
      ],
    },
    {
      heading: "Setting the Right Min, Max, and Count for Your Situation",
      paragraphs: [
        "The tool accepts negative numbers as well as positive ones for min and max, which is useful for anything measured on a scale that crosses zero, such as generating a random temperature offset or a random integer for a math worksheet that includes negative values. The only hard rule is that max must be strictly greater than min, otherwise there's no valid range to draw from and the tool will show an error instead of guessing at what you meant.",
        "Count is capped at 100 numbers per generation to keep results readable on screen; there's no cap on how many times you can click generate, so a very large batch just means running it more than once. If a batch with uniqueness enabled fails, the fastest fix is almost always to widen the range rather than lower the count, since a wider range gives the shuffle more values to draw from.",
      ],
    },
  ],
  useCases: [
    { title: "Games and dice rolls", description: "Simulate dice, card draws, or coin flips for tabletop games and party games without needing physical dice on hand." },
    { title: "Lottery and raffle numbers", description: "Draw a fair, repeat-free set of numbers for a family lottery pool, office raffle, or prize drawing." },
    { title: "Statistical sampling", description: "Pull a random sample of IDs from a numbered list for a survey spot-check, audit, or classroom statistics exercise." },
    { title: "Number assignments", description: "Hand out unique ticket numbers, jersey numbers, or locker numbers to a group of people or items." },
    { title: "Quick decisions", description: "Settle a tie, pick a starting player, or make any small decision that benefits from an unbiased random pick." },
  ],
  mistakes: [
    { title: "Leaving uniqueness off for a draw", description: "A raffle or lottery-style draw with \"Unique numbers only\" off can produce the same number twice, which breaks the logic of a fair drawing." },
    { title: "Requesting more unique numbers than the range allows", description: "Asking for 20 unique numbers from a range of only 10 possible values will always fail; widen the range instead of lowering expectations." },
    { title: "Treating this as a cryptographic random generator", description: "The tool is built on Math.random(), which is fine for games and draws but not designed for passwords, tokens, or security keys." },
    { title: "Confusing min and max", description: "Entering a minimum larger than the maximum returns an error instead of numbers, since the tool needs a valid low-to-high range to draw from." },
  ],
  tips: [
    "Turn on \"Unique numbers only\" for anything shaped like a draw, and leave it off for anything shaped like independent rolls.",
    "Match your min and max to the real range of your lottery, raffle, or number pool before generating.",
    "Use the count field to generate several numbers in one click instead of clicking generate repeatedly.",
    "Check the history list before starting a new batch if you need to avoid repeating a previous result.",
    "Widen the range first if a unique draw fails, since count usually can't be increased without a bigger pool.",
  ],
  glossary: [
    { title: "Pseudorandom number generator", description: "An algorithm, like the browser's Math.random(), that produces a sequence of numbers that behaves statistically like randomness without being cryptographically unpredictable." },
    { title: "Sampling with replacement", description: "A method where a value can be selected more than once because it stays available in the pool after each pick, used when uniqueness is turned off." },
    { title: "Sampling without replacement", description: "A method where each value is removed from the pool once picked, so it can't be selected again, used when \"Unique numbers only\" is turned on." },
    { title: "Cryptographically secure RNG", description: "A random number generator built to resist prediction by an attacker, required for passwords and encryption keys but unnecessary for games or raffles." },
    { title: "Range", description: "The inclusive span of possible values between the minimum and maximum you set, from which the generator draws its results." },
  ],
};

export default guide;
