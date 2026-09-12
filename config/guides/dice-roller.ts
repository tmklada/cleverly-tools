import type { ToolGuide } from "@/types/guide";

const guide: ToolGuide = {
  slug: "dice-roller",
  intro: [
    "This free online dice roller replaces a physical set of dice for board games, tabletop role-playing games, and any quick decision that needs a fair random outcome. Pick a dice type, pick how many dice, and click Roll to see each individual result along with the total sum, all in under a second, with a short rolling animation before the numbers land.",
    "Six standard dice types are supported: D4, D6, D8, D10, D12, and D20, covering the shapes used in almost every board game and tabletop RPG system, from a basic six-sided die for Monopoly or Yahtzee to a twenty-sided die for Dungeons & Dragons. You can roll up to six dice of the same type at once, which covers the most common combinations like 2d6 for a board game move or a handful of d6s for a dice-pool system.",
    "Every roll is added to a short history list, so you can see your last several results without writing them down, whether you're tracking damage rolls in a combat round or just settling an argument about whose turn it is. There's no account, no ads blocking the dice, and no physical dice to lose under the couch.",
  ],
  sections: [
    {
      heading: "Dice Probability: Odds of Rolling a 7 With Two Dice",
      paragraphs: [
        "Rolling two six-sided dice (2d6) doesn't spread results evenly across 2 through 12; some totals are far more likely than others because there are more ways to combine two dice into a middle number than an extreme one. There's only one way to roll a 2 (1+1) or a 12 (6+6), but there are six different combinations that add up to 7 (1-6, 2-5, 3-4, 4-3, 5-2, 6-1), making 7 the single most common result, landing about 16.7% of the time.",
        "This matters for board games built around 2d6, like Settlers of Catan, where tiles numbered 6 and 8 produce resources more often than tiles numbered 2 or 12, and experienced players plan around that curve. Roll several batches of 2d6 with this tool and you'll see 7 come up noticeably more often than 2 or 12 over enough rolls, even though any single roll is unpredictable.",
      ],
      bullets: [
        "2 and 12 each have 1 combination out of 36 (about 2.8% each)",
        "7 has 6 combinations out of 36 (about 16.7%), the most likely total",
        "6 and 8 each have 5 combinations out of 36 (about 13.9% each)",
        "The full bell-shaped curve is why 2d6 games feel less swingy than a single d20",
      ],
    },
    {
      heading: "D20 Rolls, Advantage and Modifiers for D&D",
      paragraphs: [
        "A single d20 is the backbone of Dungeons & Dragons 5th edition and many other tabletop RPGs, used for attack rolls, skill checks, and saving throws, and unlike 2d6 it's a flat distribution: every number from 1 to 20 is exactly as likely as every other, at 5% each. That's what makes a natural 20 always feel possible and a natural 1 always feel like it's lurking, since neither extreme is rarer than rolling a 10 or 11.",
        "This tool rolls the raw die; it doesn't apply ability modifiers, proficiency bonuses, or advantage and disadvantage rules automatically. To roll with advantage (roll twice, keep the higher), set the dice count to 2, select D20, roll, and manually take the higher of the two results; for disadvantage, take the lower one instead. Add any modifier from your character sheet to the number shown after the roll, since the tool only returns the raw die faces and their sum.",
      ],
    },
    {
      heading: "Dice Notation Explained: 2d6, 3d8, and Similar Formats",
      paragraphs: [
        "Tabletop game books describe dice rolls in a shorthand format: the number before the \"d\" is how many dice to roll, and the number after it is how many sides each die has. So \"2d6\" means roll two six-sided dice and add them together, and \"3d8\" means roll three eight-sided dice and add those. This tool's controls map directly onto that notation: the number buttons set the count, and the dX buttons set the die type.",
        "To roll 4d10 for a damage instruction in a game manual, set the dice count to 4 and select D10, then read the Total field for the combined sum, which is exactly what \"4d10\" is asking for. If a rule calls for more dice than this tool supports in one click, roll in two batches and add the totals together afterward, since the same math applies regardless of whether all the dice are rolled in a single click.",
      ],
    },
    {
      heading: "Dice Types Explained: D4 vs D6 vs D8 vs D10 vs D12 vs D20",
      paragraphs: [
        "Each dice type shows up for a different reason in tabletop games. D4 (a four-sided pyramid in real life) is often used for small weapon damage or minor penalties. D6 is the most universally recognized die, used everywhere from Monopoly and Yahtzee to RPG damage rolls. D8, D10, and D12 fill in the middle range for medium-weight rolls, with D10 doubling as a percentile die when two are rolled together to generate a number from 1 to 100.",
        "D20 stands apart as the resolution die for most modern tabletop RPGs, since its flat 5%-per-face distribution makes it easy to compare a roll directly against a target difficulty number. This tool renders D6 results as classic pip-style dice faces and every other type as a plain numbered tile, so a six-sided roll looks and reads the way a physical die would on a table.",
      ],
    },
    {
      heading: "Board Games and Party Games That Use Dice",
      paragraphs: [
        "Beyond RPGs, plenty of everyday games lean on a quick dice roll: Yahtzee and Farkle use multiple d6s scored in combinations, Monopoly uses 2d6 to move around the board, and countless party games use a single die to decide turn order, a challenge number, or a random category. Rolling here removes the need to keep a physical set around, which is handy for a game night where dice have gone missing or you're playing a game explained over video call.",
        "For any game that specifies a total across several identical dice, like \"roll 3d6 for your stat,\" set the count and type to match, roll once, and read the total directly instead of adding the individual faces by hand. The individual results are still shown above the total, so you can double-check a rule that cares about the specific faces rolled rather than just the sum, like a game that rewards matching pairs.",
      ],
    },
    {
      heading: "How Fair Is a Virtual Dice Roll Compared to Real Dice?",
      paragraphs: [
        "Each die roll here is generated independently using the browser's built-in random number function, scaled to the number of sides on the selected die type, so every face has an equal chance of appearing on every roll, the same fairness principle a well-balanced physical die aims for. Unlike a real die, there's no risk of a chipped corner, an uneven table, or a slightly weighted mold nudging the odds in one direction.",
        "This level of randomness is well suited to games, practice rolls, and casual decisions, but it isn't built to cryptographic standards the way a password generator needs to be; that distinction only matters for security-sensitive use cases, not for board games or tabletop sessions, where statistical fairness is exactly what's needed.",
      ],
    },
  ],
  useCases: [
    { title: "Tabletop RPG sessions", description: "Roll d20s for attack rolls and skill checks, or smaller dice for weapon and spell damage, without needing a physical dice bag." },
    { title: "Board games missing a die", description: "Replace a lost or forgotten die for Monopoly, Yahtzee, or any game that calls for a standard roll." },
    { title: "Learning basic probability", description: "Roll batches of 2d6 or other combinations to see how dice totals cluster around the middle rather than spreading evenly." },
    { title: "Remote and video-call game nights", description: "Roll dice on screen so everyone on a video call can see the same result at the same time." },
    { title: "Random decisions", description: "Use a quick d6 or d20 roll to settle a tie, assign a task, or make a low-stakes choice." },
  ],
  mistakes: [
    { title: "Expecting a custom number of sides", description: "Only the six standard types (D4, D6, D8, D10, D12, D20) are available; there's no field for an arbitrary side count." },
    { title: "Forgetting to add modifiers", description: "The tool returns the raw die faces and their sum only; any character sheet bonus or penalty has to be added manually." },
    { title: "Assuming 2d6 spreads evenly like a d12", description: "Adding two dice together produces a bell curve centered on 7, not a flat distribution; each total has different odds." },
    { title: "Rolling more dice than one click supports", description: "Up to 6 dice can be rolled at once; a larger pool needs two rolls added together afterward." },
  ],
  tips: [
    "Match the dice count and type to the game's notation exactly, like setting 3 and D8 for a \"3d8\" instruction.",
    "For advantage or disadvantage in D&D, roll 2 D20s and manually take the higher or lower result.",
    "Use the history list to review your last several rolls during a session instead of writing them down.",
    "Remember the tool shows the raw total; add any character or game modifiers yourself.",
    "Roll a larger batch than one click supports by rolling twice and adding the two totals together.",
  ],
  glossary: [
    { title: "Dice notation", description: "Shorthand like \"2d6\" or \"4d10\" where the first number is how many dice to roll and the second is how many sides each die has." },
    { title: "Advantage / disadvantage", description: "A D&D 5th edition rule where two d20s are rolled and either the higher (advantage) or lower (disadvantage) result is used." },
    { title: "Flat distribution", description: "A probability spread where every possible outcome, like each face of a single die, is equally likely, unlike the bell curve produced by adding multiple dice." },
    { title: "Percentile roll", description: "A method of generating a number from 1 to 100 by rolling two ten-sided dice, one representing tens and one representing ones." },
    { title: "Dice pool", description: "A game system that rolls several dice at once and counts successes or totals them, rather than relying on a single die result." },
  ],
};

export default guide;
