import type { ToolGuide } from "@/types/guide";

const guide: ToolGuide = {
  slug: "lorem-ipsum-generator",
  intro: [
    "Lorem ipsum is placeholder text designers and developers drop into a layout when the real content isn't ready yet, so that a page, mockup, or document can be evaluated for spacing, font sizing, and visual flow without waiting on final copy. This generator produces that placeholder text on demand, sized to however much you need for the section you're filling in.",
    "Start by choosing what you want to measure text in: paragraphs, sentences, or words. Paragraph mode generates 1 to 10 blocks and lets you set roughly how many words go into each, from 10 to 150. Sentence mode generates 1 to 50 standalone sentences, which suits a subheading or a card blurb. Word mode generates 5 to 500 words, which is the right unit when you're filling a label, a menu item, or a fixed-width component. Click Generate and the tool builds fresh text on the spot, breaking words into sentences of varying length so the output reads with natural rhythm rather than one unbroken block.",
    "A toggle controls whether the text opens with the classic \"Lorem ipsum dolor sit amet\" line. It's on by default, because that opening is what clients and reviewers expect to recognise, but turn it off and the whole output is randomised. Either way, the words after the opening are pulled randomly from a pool of authentic Latin-derived vocabulary each time you generate, so no two runs produce identical text — useful when you need several different but visually similar blocks of filler across a design, like multiple card descriptions on the same page.",
  ],
  sections: [
    {
      heading: "Where Does Lorem Ipsum Come From? (Cicero, 45 BC)",
      paragraphs: [
        "The vocabulary behind lorem ipsum traces back to a passage from Cicero's \"De Finibus Bonorum et Malorum,\" a Latin philosophical text written around 45 BC discussing the theory of ethics. The words \"dolorem ipsum\" appear in that original text, which is where the placeholder text's name comes from, even though the scrambled, reordered version used in design has long since drifted from any coherent Latin meaning.",
        "The text became standard in publishing after a 1960s type specimen sheet used a passage derived from Cicero's writing to fill an ad layout, and it was picked up again by desktop publishing software in the 1980s and 90s, cementing it as the default placeholder text across the design and printing industries. That history is why lorem ipsum is made of real Latin word roots rather than random keyboard characters, even though it isn't actually readable Latin.",
      ],
    },
    {
      heading: "Why This Generator's Output Is Randomized, Not the Classic Fixed Passage",
      paragraphs: [
        "Some lorem ipsum tools reproduce one fixed, memorized passage every time, always starting with the exact phrase \"Lorem ipsum dolor sit amet, consectetur adipiscing elit.\" This generator gives you both behaviours. With the \"Start with Lorem ipsum dolor sit amet\" toggle on — the default — your output opens with that familiar line, which is what most designers and clients expect to see at the top of a mockup. Everything after it is chosen at random from a pool of about 100 Latin-derived words on each click of Generate.",
        "Turn the toggle off and even the opening is randomised, so there's no recognisable phrase at all. Either way you get variety: generating text for five different sections of a page produces five distinct blocks rather than the same repeated passage, which better simulates how real content of different lengths and word choices will eventually look in that layout.",
      ],
    },
    {
      heading: "Lorem Ipsum vs Real Placeholder Text for Design Reviews",
      paragraphs: [
        "Lorem ipsum is deliberately meaningless, which is exactly its advantage during layout and visual design review: since nobody can actually read it for content, reviewers focus on spacing, line length, font size, and hierarchy instead of getting distracted by whether the wording itself is good. That makes it well suited for early-stage mockups where the visual structure matters more than the message.",
        "The tradeoff shows up later in the process: once a design moves toward final review or user testing, real or realistic sample copy (even placeholder copy written in plain English) tends to reveal problems lorem ipsum can't, like a headline that's too long for its container in the actual target language, or a button label that doesn't fit at the intended width. A practical workflow is to block out early layouts with lorem ipsum from this tool, then swap in real or near-final copy before final visual or usability review.",
      ],
    },
    {
      heading: "Choosing Paragraphs, Sentences, or Words for Your Layout",
      paragraphs: [
        "Pick the mode that matches the unit your design actually thinks in. Paragraph mode generates 1-10 separate blocks separated by a blank line, which maps onto a page section, a list of cards, or a multi-paragraph body of text, and the Words per Paragraph slider (10-150) sets roughly how long each block runs. Sentence mode generates 1-50 sentences as one continuous run, which is the right shape for a subheading, a meta description, or a short card blurb where a full paragraph would overflow. Word mode generates an exact 5-500 words, which is what you want when a component has a hard character budget — a nav label, a button, a truncated list item.",
        "For a short UI element like a card description or a tooltip, 15-25 words or two or three sentences is usually closer to what real content will look like than a long block. For a full body of article or blog text, several paragraphs at 60-100 words each better represents how that layout will behave once real copy is dropped in, including how paragraph breaks affect vertical spacing on the page. In every mode the sentences inside the output vary in length automatically, so the rhythm stays natural rather than mechanical.",
      ],
      bullets: [
        "Short UI copy (tooltips, card descriptions): word mode, 15-25 words",
        "A subheading or meta description: sentence mode, 1-2 sentences",
        "A short paragraph of body text: paragraph mode, 1 paragraph, 40-60 words",
        "A full article mockup: paragraph mode, 3-5 paragraphs, 60-100 words each",
        "Maximum output: 10 paragraphs at 150 words each, 50 sentences, or 500 words",
      ],
    },
    {
      heading: "Copying the Generated Text Into Your Project",
      paragraphs: [
        "After clicking Generate, the output appears in a read-only text box with paragraphs separated by blank lines, and a Copy button sends the whole block to your clipboard in one click, including those paragraph breaks. Pasting into most design tools, word processors, or code editors preserves the paragraph structure, so multi-paragraph output drops into a layout with its breaks already in the right place.",
        "If you need a different amount of text after copying, there's no way to edit the existing output directly in place — adjust the sliders and click Generate again to produce a new block, which replaces what was there before rather than appending to it.",
      ],
    },
  ],
  useCases: [
    { title: "Filling in a wireframe or mockup", description: "Generate paragraphs to drop into text blocks so a layout can be reviewed before real copy is written." },
    { title: "Testing how a design handles long content", description: "Generate a longer paragraph to check whether a container, card, or column handles overflow or wrapping correctly." },
    { title: "Populating a CMS or database with sample entries", description: "Generate several short paragraphs to use as filler content while testing a content management system or template." },
    { title: "Demonstrating a font or typography choice", description: "Generate a paragraph of running text to see how a typeface reads in actual sentences rather than a single headline." },
    { title: "Filling multiple similar sections with distinct text", description: "Generate several separate outputs so repeated layout elements, like a row of cards, don't all show identical filler." },
  ],
  mistakes: [
    { title: "Expecting the exact classic passage every time", description: "The toggle fixes only the opening 'Lorem ipsum dolor sit amet' — everything after it is randomized on every generation, unlike tools that repeat one fixed passage word for word." },
    { title: "Using paragraph mode for a one-line element", description: "Switch to sentence or word mode for labels, subheadings, and card blurbs so the amount of text matches the component." },
    { title: "Leaving lorem ipsum in a design past the review stage", description: "Swap in real or realistic sample copy before final visual or usability review, since meaningless text can hide real content-fit problems." },
    { title: "Setting an unrealistically high word count for a small UI element", description: "A 150-word paragraph in a tooltip or card description won't reflect how that element will look with real, much shorter copy." },
    { title: "Trying to edit the generated text directly for a small change", description: "The output box is read-only; adjust the sliders and click Generate again rather than trying to type into the result." },
    { title: "Assuming more paragraphs always means a better layout test", description: "Match the paragraph count to what the actual content will realistically contain, not the maximum the sliders allow." },
  ],
  tips: [
    "Match the mode to the component: words for labels, sentences for subheadings, paragraphs for body copy.",
    "Match your word count to the real content length you expect, rather than defaulting to the maximum every time.",
    "Leave the classic opening on when a client will see the mockup, and turn it off when you want nothing recognisable.",
    "Generate a fresh block for each repeated layout element so filler text doesn't look identical across a page.",
    "Use a short, single paragraph for buttons, tooltips, and card descriptions instead of a long block.",
    "Swap lorem ipsum for real or near-final copy before moving from layout review to usability testing.",
    "Copy the output as soon as you're happy with it, since generating again replaces the current text rather than adding to it.",
  ],
  glossary: [
    { title: "Lorem ipsum", description: "Scrambled Latin-derived placeholder text used in design and publishing since the 1960s, based on a passage from Cicero's writing." },
    { title: "Placeholder text", description: "Any filler text used to represent where real content will eventually go in a design, layout, or document." },
    { title: "Cicero", description: "The ancient Roman philosopher whose 45 BC text 'De Finibus Bonorum et Malorum' is the original source of lorem ipsum's vocabulary." },
    { title: "Filler content", description: "Sample text, images, or data used temporarily in a design or system before final content is available." },
    { title: "Word count", description: "The number of individual words in a piece of text, used here both as an output mode and to control roughly how long each generated paragraph is." },
    { title: "Output mode", description: "Whether the generator measures its output in paragraphs, sentences, or words, so the amount of filler matches the component being designed." },
  ],
};

export default guide;
