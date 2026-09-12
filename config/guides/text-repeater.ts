import type { ToolGuide } from "@/types/guide";

const guide: ToolGuide = {
  slug: "text-repeater",
  intro: [
    "A text repeater takes any word, phrase, or character and repeats it a set number of times, joined by a separator you choose, producing the result instantly as you adjust the settings. Type your text, drag the slider or type into the number box to set how many times it repeats — up to 10,000 — and pick a separator like a new line, comma, space, tab, or a custom string, and the output box updates immediately with a live character and word count.",
    "It's a small, purpose-built utility for developers testing how a UI handles repeated or long input, writers and social media users generating stylized repeated text, and anyone who needs placeholder or pattern content quickly without writing a script. Everything runs client-side in your browser, and a one-click Copy button grabs the full output.",
    "This guide covers common uses for repeated text, how separators change the output, and where a repeated-text pattern is useful versus where a different tool fits better.",
  ],
  sections: [
    {
      heading: "Separators Explained: New Line, Comma, Space, Tab, and Custom",
      paragraphs: [
        "The separator determines how each repetition of your text is joined to the next, and choosing the right one depends on what you're building. New Line puts each repetition on its own line, which is the natural choice for generating test rows for a spreadsheet, a list of sample log entries, or repeated lines of placeholder text in a document.",
        "Comma and Space separators produce a single continuous line, useful for generating a comma-separated list of test values or a long space-separated string to check how a text field or database column handles a large single-line input. Tab separation is handy for building tab-delimited test data to paste into a spreadsheet or a TSV file.",
        "The Custom option lets you type any separator string you want, such as \" | \" or \"---\", which is useful for generating a visual divider pattern or a specifically formatted delimiter that matches a data format you're testing against.",
      ],
      bullets: [
        "New Line: one repetition per line, good for test rows or repeated placeholder lines",
        "Comma: a single comma-separated line, good for test value lists",
        "Space: a single space-separated line, good for testing long single-line input",
        "Tab: tab-delimited output, good for spreadsheet or TSV test data",
        "Custom: any separator string you define, for specific formatting or visual dividers",
      ],
    },
    {
      heading: "Testing Input Limits and UI Behavior With Repeated Text",
      paragraphs: [
        "Developers commonly use repeated text to stress-test how a text field, database column, or UI component handles unusually long input — repeating a short string hundreds of times quickly produces a large block of text without writing a script or generating random filler. This is useful for checking whether a form field truncates text correctly, whether a UI element wraps or overflows with a long string, and whether a backend enforces a character limit the way it's supposed to.",
        "Because the tool shows a live character and word count for the generated output, you can dial in an exact target length — for example, repeating a 10-character string 150 times to test a 1,500-character limit — rather than guessing at how long a block of text will end up. With the cap at 10,000 repetitions, even a short seed string reaches well past the limits most databases and form fields enforce, so you can check what happens when a field is genuinely overwhelmed rather than merely full.",
      ],
    },
    {
      heading: "Repeated Text for Patterns, Filler Content, and Social Media",
      paragraphs: [
        "Repeated characters or short phrases are a common way to build a visual pattern or divider, like a row of equals signs or a repeated emoji used as a section break in a document or a social media caption. Repeating a word or phrase for emphasis is also a familiar stylistic device in casual writing and social posts, where a repeated word can read as enthusiasm or emphasis in a way a single instance doesn't convey.",
        "For placeholder or filler content specifically meant to look like natural prose rather than an obviously repeated string, a Lorem Ipsum generator is a better fit, since repeated text is visually and structurally repetitive in a way real filler text isn't — use this tool when the repetition itself is the point, not when you need generic-looking paragraph filler.",
      ],
    },
    {
      heading: "Generating Test Data for Development and QA",
      paragraphs: [
        "QA testers and developers often need a quick batch of near-identical sample data — repeated placeholder names, repeated sample rows, or a repeated test string with the row separated by new lines — to paste into a form, a spreadsheet, or a test script. This tool covers that case well for simple repeated values, though it won't generate genuinely varied or randomized data, since every repetition is identical.",
        "For test data that needs to look different from row to row, such as unique fake names or varied numeric values, a dedicated fake data or Lorem Ipsum generator is the more appropriate tool; use this one specifically when identical repetition, not variation, is what the test calls for.",
      ],
    },
    {
      heading: "How to Get the Output You Expect",
      paragraphs: [
        "Type your text into the input field first, since the output stays empty until there's something to repeat. Adjust the Repeat Times slider — it ranges from 1 to 10,000 — or type an exact number into the box beside it when the slider is too coarse, and watch the character and word count update above the output so you can confirm you've hit the length you're targeting.",
        "If you need a separator that isn't one of the presets, click Custom and type any string you like directly into the field that appears; it can be empty for no separator at all, producing one continuous repeated string with nothing between each instance.",
        "At the top of the range the output can run to hundreds of thousands of characters, so the tool renders only the first 20,000 on screen and notes how much has been left out. That keeps typing and dragging responsive; the Copy button always puts the complete string on your clipboard regardless of what the preview shows.",
      ],
    },
  ],
  useCases: [
    { title: "Stress-testing a text field", description: "Generate a long repeated string to check how a form field or database column handles unusually long input." },
    { title: "Building test data rows", description: "Create repeated sample rows separated by new lines or tabs for pasting into a spreadsheet or test script." },
    { title: "Creating a visual divider", description: "Repeat a character like a dash or equals sign to build a section separator for a document or caption." },
    { title: "Emphasizing text in a caption", description: "Repeat a word or phrase for stylistic emphasis in a social media post or message." },
    { title: "Hitting an exact character count", description: "Use the live character count to repeat a string until it matches a specific length limit you're testing." },
  ],
  mistakes: [
    { title: "Expecting varied output", description: "Every repetition is identical, so this tool isn't a substitute for randomized or unique test data." },
    { title: "Forgetting to set a separator", description: "Leaving the default separator when a different format is needed can produce output that doesn't match what you're pasting it into." },
    { title: "Assuming an unlimited repeat count", description: "The slider caps at 10,000 repetitions, which covers almost any testing need but isn't unlimited." },
    { title: "Thinking the preview is the whole output", description: "Above 20,000 characters only the start is displayed; Copy still gives you every repetition." },
    { title: "Using it for natural-looking filler text", description: "Repeated text looks structurally repetitive; a Lorem Ipsum generator is a better fit for realistic-looking placeholder prose." },
  ],
  tips: [
    "Use the live character count to hit an exact length when testing a specific input limit.",
    "Type into the number box instead of dragging the slider when you need a precise repeat count in the thousands.",
    "Pick New Line as the separator when generating test rows for a spreadsheet or list.",
    "Use the Custom separator option for any format the presets don't cover, including no separator at all.",
    "Reach for a Lorem Ipsum generator instead when you need varied, natural-looking filler text.",
    "Copy the output with the Copy button rather than manually selecting text from the output box.",
  ],
  glossary: [
    { title: "Separator", description: "The character or string placed between each repetition of the text, such as a new line, comma, or custom string." },
    { title: "Delimiter", description: "Another term for a separator, especially when referring to structured data formats like CSV or TSV." },
    { title: "TSV", description: "Tab-separated values, a plain-text data format where each field is separated by a tab character." },
    { title: "Placeholder text", description: "Temporary filler content used to represent where real content will eventually go, such as in a design mockup or test form." },
  ],
};

export default guide;
