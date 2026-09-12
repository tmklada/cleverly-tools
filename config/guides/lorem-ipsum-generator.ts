import type { ToolGuide } from "@/types/guide";

const guide: ToolGuide = {
  slug: "lorem-ipsum-generator",
  intro: [
    "Lorem ipsum is placeholder text designers and developers drop into a layout when the real content isn't ready yet, so that a page, mockup, or document can be evaluated for spacing, font sizing, and visual flow without waiting on final copy. This generator produces that placeholder text on demand, sized to however much you need for the section you're filling in.",
    "You control two things: how many paragraphs to generate, from 1 to 10, and roughly how many words go into each paragraph, from 10 to 150. Click Generate and the tool builds fresh paragraphs on the spot, breaking the words into sentences of varying length so the output reads with natural rhythm rather than one unbroken block of text.",
    "Every paragraph starts with the word \"Lorem,\" but the words after that are pulled randomly from a pool of authentic Latin-derived vocabulary each time you generate, so no two runs produce identical text — useful when you need several different but visually similar blocks of filler across a design, like multiple card descriptions on the same page.",
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
        "Some lorem ipsum tools reproduce one fixed, memorized passage every time, always starting with the exact phrase \"Lorem ipsum dolor sit amet, consectetur adipiscing elit.\" This generator works differently: only the very first word of each paragraph is fixed as \"Lorem,\" and every word after that is chosen at random from a pool of about 100 Latin-derived words each time you click Generate, so the resulting text changes on every run.",
        "The tradeoff is that you won't get the exact, universally recognized classical passage that some clients or reviewers may specifically expect to see. What you gain instead is variety: generating text for five different sections of a page produces five distinct paragraphs rather than the same repeated block, which better simulates how real content of different lengths and word choices will eventually look in that layout.",
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
      heading: "Choosing Paragraph Count and Word Count for Your Layout",
      paragraphs: [
        "The Paragraphs slider (1-10) controls how many separate blocks of text are generated, each separated by a blank line in the output, which maps naturally onto a page section, a list of cards, or a multi-paragraph body of text. The Words per Paragraph slider (10-150) controls roughly how long each of those paragraphs runs, with sentences inside each paragraph varying in length automatically rather than being a fixed count you set separately.",
        "For a short UI element like a card description or a tooltip, a low word count around 15-25 words in a single paragraph is usually closer to what real content will look like than a long block. For a full body of article or blog text, several paragraphs at 60-100 words each better represents how that layout will behave once real copy is dropped in, including how paragraph breaks affect vertical spacing on the page.",
      ],
      bullets: [
        "Short UI copy (tooltips, card descriptions): 1 paragraph, 15-25 words",
        "A short paragraph of body text: 1 paragraph, 40-60 words",
        "A full article mockup: 3-5 paragraphs, 60-100 words each",
        "Maximum output: 10 paragraphs at 150 words each",
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
    { title: "Expecting the exact classic passage every time", description: "Only the first word of each paragraph is fixed as 'Lorem' — the rest is randomized on every generation, unlike some tools that repeat one fixed passage." },
    { title: "Leaving lorem ipsum in a design past the review stage", description: "Swap in real or realistic sample copy before final visual or usability review, since meaningless text can hide real content-fit problems." },
    { title: "Setting an unrealistically high word count for a small UI element", description: "A 150-word paragraph in a tooltip or card description won't reflect how that element will look with real, much shorter copy." },
    { title: "Trying to edit the generated text directly for a small change", description: "The output box is read-only; adjust the sliders and click Generate again rather than trying to type into the result." },
    { title: "Assuming more paragraphs always means a better layout test", description: "Match the paragraph count to what the actual content will realistically contain, not the maximum the sliders allow." },
  ],
  tips: [
    "Match your word count to the real content length you expect, rather than defaulting to the maximum every time.",
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
    { title: "Word count", description: "The number of individual words in a piece of text, used here to control roughly how long each generated paragraph is." },
  ],
};

export default guide;
