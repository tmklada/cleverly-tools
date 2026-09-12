import type { ToolGuide } from "@/types/guide";

const guide: ToolGuide = {
  slug: "dice-roller",
  intro: [
    "This free online dice roller replaces a physical set of dice for board games, tabletop role-playing games, and any quick decision that needs a fair random outcome. Pick a dice type, pick how many dice, add a plus or minus modifier if your game calls for one, and click Roll to see each individual die result along with the dice subtotal and the final total, all in under a second, with a short rolling animation before the numbers land.",
    "Six standard dice types are preset: D4, D6, D8, D10, D12, and D20, covering the shapes used in almost every board game and tabletop RPG system, from a basic six-sided die for Monopoly or Yahtzee to a twenty-sided die for Dungeons & Dragons. Beyond those, a custom-sides field takes any number from 2 to 1000, so a D3, a D100 percentile roll, or a house-rule D7 is a single typed number away. You can roll up to ten dice of the same type at once, which covers dice-pool systems as well as everyday combinations like 2d6 for a board game move.",
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
        "Modifiers are built in: type your ability modifier and proficiency bonus into the modifier field and the roll shows the raw die, the dice subtotal, and the final total with the bonus already applied, exactly the way a \"1d20+7\" instruction reads. Advantage and disadvantage still need a human decision, though — set the dice count to 2, select D20, roll, and take the higher result for advantage or the lower for disadvantage, since the tool sums dice rather than picking between them.",
      ],
    },
    {
      heading: "Dice Notation Explained: 2d6, 3d8, and Similar Formats",
      paragraphs: [
        "Tabletop game books describe dice rolls in a shorthand format: the number before the \"d\" is how many dice to roll, the number after it is how many sides each die has, and a trailing \"+3\" or \"-1\" is a modifier added to the result. So \"2d6\" means roll two six-sided dice and add them together, and \"3d8+2\" means roll three eight-sided dice, add those, then add 2. This tool's controls map directly onto that notation: the number buttons set the count, the dX buttons or the custom-sides field set the die type, and the modifier box handles the trailing bonus. The Roll button even shows the notation you've built.",
        "To roll 4d10 for a damage instruction in a game manual, set the dice count to 4 and select D10, then read the Total field for the combined sum, which is exactly what \"4d10\" is asking for. For an unusual die a preset doesn't cover, like the 1d100 behind a percentile table, type 100 into the custom-sides field instead of rolling two d10s.",
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
        "Each die roll here is generated independently using your browser's cryptographic random number generator (crypto.getRandomValues), the same source a password generator draws on, so every face has an equal chance of appearing on every roll. Unlike a real die, there's no risk of a chipped corner, an uneven table, or a slightly weighted mold nudging the odds in one direction.",
        "The tool also uses rejection sampling rather than a plain remainder, which matters for dice whose side count doesn't divide evenly into the random range: taking a simple modulo would make the lowest few faces come up very slightly more often. Rejecting and redrawing the rare out-of-range value removes that bias entirely, so a d100 or a custom d7 is exactly as fair as a d4.",
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
    { title: "Overlooking the custom-sides field", description: "The six presets aren't the whole set; typing any number from 2 to 1000 gives you a D3, D100, or any other die your game needs." },
    { title: "Leaving a stale modifier set", description: "The modifier stays put between rolls, so reset it to 0 when you move from a +7 attack roll to an unmodified damage roll." },
    { title: "Assuming 2d6 spreads evenly like a d12", description: "Adding two dice together produces a bell curve centered on 7, not a flat distribution; each total has different odds." },
    { title: "Expecting advantage to be automatic", description: "Rolling 2d20 sums both dice; for advantage or disadvantage, read the individual results and take the higher or lower yourself." },
    { title: "Rolling more dice than one click supports", description: "Up to 10 dice can be rolled at once; a larger pool needs two rolls added together afterward." },
  ],
  tips: [
    "Match the dice count, type, and modifier to the game's notation exactly, like setting 3, D8 and +2 for a \"3d8+2\" instruction.",
    "For advantage or disadvantage in D&D, roll 2 D20s and manually take the higher or lower of the two individual results.",
    "Use the history list to review your last several rolls during a session instead of writing them down.",
    "Type 100 into the custom-sides field for a true percentile roll instead of combining two d10s.",
    "Roll a larger batch than one click supports by rolling twice and adding the two totals together.",
  ],
  glossary: [
    { title: "Dice notation", description: "Shorthand like \"2d6\" or \"4d10\" where the first number is how many dice to roll and the second is how many sides each die has." },
    { title: "Advantage / disadvantage", description: "A D&D 5th edition rule where two d20s are rolled and either the higher (advantage) or lower (disadvantage) result is used." },
    { title: "Flat distribution", description: "A probability spread where every possible outcome, like each face of a single die, is equally likely, unlike the bell curve produced by adding multiple dice." },
    { title: "Modifier", description: "A fixed number added to or subtracted from a dice total, written as the \"+3\" in 2d6+3 and applied here by the modifier field." },
    { title: "Percentile roll", description: "A number from 1 to 100, traditionally rolled with two ten-sided dice (one for tens, one for ones) or here with a single custom d100." },
    { title: "Dice pool", description: "A game system that rolls several dice at once and counts successes or totals them, rather than relying on a single die result." },
  ],
};

export default guide;
