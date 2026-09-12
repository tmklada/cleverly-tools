import type { ToolGuide } from "@/types/guide";

const guide: ToolGuide = {
  slug: "coin-flip",
  intro: [
    "This free online coin flip gives you a fast, fair heads-or-tails result whenever you need to make a quick 50/50 decision, without digging a real coin out of a pocket or a drawer. Click Flip Coin for a single toss with a short spinning animation, or set any number from 1 to 100 to flip a whole handful at once and see every result laid out side by side, useful for settling an argument, choosing who goes first, or just running a quick probability experiment.",
    "Every flip comes from your browser's cryptographic random number generator, taking one unbiased bit per coin, so heads and tails are an exact 50/50 with no rounding or modulo bias creeping in. Each multi-coin flip shows its own heads and tails counts and percentages, and a running statistics panel tracks your total flips across the whole session, so you can see how close your results are running to an even split.",
    "There's no sign-up, no ads interrupting the flip, and no physical coin to lose, drop, or argue about the edge case of it landing on its side.",
  ],
  sections: [
    {
      heading: "Is a Coin Flip Really 50/50? (Physical Bias vs Digital Randomness)",
      paragraphs: [
        "A real physical coin isn't perfectly 50/50 in practice: studies on coin flipping have found that a coin caught in the air is slightly more likely (by roughly 1%) to land on the same face it started on, because of small asymmetries in weight distribution, spin, and how it's caught. That bias is tiny and rarely matters for a casual decision, but it means a physical flip isn't quite the textbook ideal people assume it is.",
        "A digital flip like this one sidesteps that entirely: there's no physical coin with an off-center mint mark or a worn edge, just a random number generator producing heads or tails with an equal, unbiased 50% chance each time, regardless of how the previous flip landed. Over a small number of flips you'll still see streaks, like three heads in a row, purely from normal statistical variance, not from any bias in the system.",
      ],
    },
    {
      heading: "Using a Coin Flip to Make Decisions (And Why It Works)",
      paragraphs: [
        "A coin flip works well specifically for binary decisions where both options are genuinely acceptable and you just need a tiebreaker: who takes out the trash this week, which restaurant to pick between two equally good options, or who gets first pick in a friendly game. The value isn't randomness for its own sake, it's that a coin flip removes the friction of an argument by handing the decision to something neither side controls.",
        "It's a poor fit for decisions with real stakes or unequal outcomes, since a fair coin has no way to weigh a better option more heavily than a worse one. If the choice genuinely matters, use the flip only after narrowing things down to two options you'd both be equally fine with living with.",
      ],
      bullets: [
        "Good use: choosing who goes first in a board game or sports match",
        "Good use: breaking a tie between two equally good restaurant or movie options",
        "Poor use: any decision with real financial, health, or safety consequences",
        "Poor use: situations where one option is objectively better than the other",
      ],
    },
    {
      heading: "Coin Flip Probability: Streaks, Runs, and the Gambler's Fallacy",
      paragraphs: [
        "Each flip is independent, meaning the coin has no memory of what happened before it. If you flip five heads in a row, the chance of heads on the sixth flip is still exactly 50%, not lower just because heads is \"due\" for a break. Believing otherwise is known as the gambler's fallacy, and it's one of the most common misunderstandings about randomness.",
        "Streaks of three, four, or even five in a row happen more often than people expect purely from chance; with enough flips, runs like this are mathematically guaranteed to show up occasionally. Use the Flip 10x button a few times and watch the statistics panel to see this in action: your heads and tails percentages will hover close to 50/50 over time, even while individual short runs look uneven.",
      ],
    },
    {
      heading: "Flipping Multiple Coins at Once: Reading Every Result",
      paragraphs: [
        "Set the coin count to anything from 1 to 100 and a single click flips them all together. Every individual coin appears as its own marker, so you can read the actual sequence of heads and tails rather than just a summary, and the batch's own heads/tails counts and percentages are shown alongside them. This is far faster than clicking the single-flip button dozens of times when you want a batch result, like simulating a hundred coin tosses for a probability lesson or a quick group vote.",
        "Every coin in the batch also rolls into the session statistics panel below, which keeps a running total across all your flips. So you get two views at once: the exact outcomes of the flip you just made, and the long-run split of everything you've flipped since the page loaded.",
      ],
    },
    {
      heading: "Coin Flip in Sports, Games, and Everyday Decisions",
      paragraphs: [
        "Coin flips show up far beyond casual arguments: American football uses one to decide which team gets the ball first, cricket uses one to decide who bats or bowls first, and countless board games use a flip or its equivalent to set turn order. In each case, the flip works because both outcomes carry equal weight and neither team has a way to influence which side lands up.",
        "For classroom or personal use, this tool also works as a lightweight way to introduce basic probability: run a batch of flips, compare the resulting heads/tails percentage to the expected 50%, and talk through why small samples deviate more than large ones, a pattern that shows up in statistics far beyond coin flips.",
      ],
    },
  ],
  useCases: [
    { title: "Settling a quick disagreement", description: "Use a single flip to decide something low-stakes, like who picks the movie or takes the last slice." },
    { title: "Choosing turn order in a game", description: "Flip once at the start of a board game or match to fairly decide who goes first." },
    { title: "Running a probability demonstration", description: "Flip 100 coins at once, read the individual results and the batch percentage, then repeat and watch the session total converge toward a 50/50 split." },
    { title: "Remote or video-call decisions", description: "Flip on screen so everyone in a call can see the exact same result at the same time." },
    { title: "Practicing understanding of independent events", description: "Flip several times in a row to see that streaks happen naturally and don't change the next flip's odds." },
  ],
  mistakes: [
    { title: "Expecting heads to be \"due\" after a streak", description: "Each flip is independent; a run of heads doesn't make tails more likely on the next flip." },
    { title: "Confusing the batch results with the session total", description: "The result grid shows only the coins from the flip you just made; the statistics panel below is the running total for the whole session." },
    { title: "Using a coin flip for a high-stakes decision", description: "A flip is best for low-stakes tiebreakers between two acceptable options, not decisions with real consequences." },
    { title: "Expecting the session history to persist", description: "The running statistics reset when you close or refresh the tab; there's no saved log across sessions." },
  ],
  tips: [
    "Use a single flip for quick individual decisions and raise the coin count when you want a whole batch at once.",
    "Watch the statistics panel rather than a single flip if you want to see the 50/50 split play out.",
    "Flipping 100 coins in one click is the fastest way to see how much a real sample can wander from an exact half.",
    "Remember each flip is independent; past results never change the odds of the next one.",
    "Reserve coin flips for decisions where both outcomes are genuinely fine with you.",
    "Refresh the page to reset your running statistics back to zero for a fresh session.",
  ],
  glossary: [
    { title: "Independent event", description: "An event whose outcome isn't affected by previous events, meaning each coin flip has the same 50% odds regardless of past results." },
    { title: "Gambler's fallacy", description: "The mistaken belief that a random outcome is more or less likely because of what happened in recent independent trials." },
    { title: "Cryptographic random number generator", description: "A source of unpredictable values strong enough for security use, called here through the browser's crypto.getRandomValues to decide heads or tails with exactly equal probability on each flip." },
    { title: "Statistical variance", description: "The natural spread of results around an expected average, which is why small samples often look uneven even when the underlying odds are exactly 50/50." },
  ],
};

export default guide;
