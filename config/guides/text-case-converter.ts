import type { ToolGuide } from "@/types/guide";

const guide: ToolGuide = {
  slug: "text-case-converter",
  intro: [
    "A text case converter takes any block of text and reformats it into a different letter case with one click: UPPERCASE, lowercase, Title Case, Sentence case, camelCase, snake_case, kebab-case, or PascalCase. It's a free online text transformer built for anyone who needs to reformat text quickly, whether that's a writer fixing a headline, a developer converting a variable name between naming conventions, or anyone who accidentally left the Caps Lock key on for a paragraph.",
    "Paste or type text into the box, click any of the eight conversion buttons, and the result appears in a second box below with its own copy button. Nothing is uploaded or saved; the conversion happens directly in your browser, so it works the same for a single word as it does for several paragraphs of pasted text.",
    "The eight case options split naturally into two groups: readable text cases (UPPERCASE, lowercase, Title Case, Sentence case) meant for headlines, captions, and prose, and code-style identifier cases (camelCase, snake_case, kebab-case, PascalCase) meant for variable names, file names, and URL slugs.",
  ],
  sections: [
    {
      heading: "Title Case vs Sentence Case: Rules by Style Guide (AP, Chicago, APA)",
      paragraphs: [
        "Sentence case capitalizes only the first letter of the text and the first letter after any period, question mark, or exclamation point, treating the rest as normal lowercase prose, the same way a standard sentence reads. This tool's Sentence case button does exactly that, which makes it a reliable match for how most style guides define sentence case, since there's little disagreement on the rule itself.",
        "Title Case is more variable across style guides, and it's worth knowing exactly what this tool does before using it for a publication with a house style. This converter capitalizes the first letter of every word in the text, including short words like \"a,\" \"of,\" \"the,\" and \"in.\" That's a simple, consistent rule, but it differs from AP style, Chicago style, and APA style, which all keep certain short words, articles, and prepositions lowercase in a title unless they're the first or last word. If your publication follows one of those specific style guides, run the conversion first and then manually lowercase the small connecting words the guide requires.",
      ],
      bullets: [
        "Sentence case: capitalize the first letter of each sentence, lowercase the rest",
        "This tool's Title Case: capitalize every word, no exceptions for short words",
        "AP, Chicago, and APA title case: keep short articles and prepositions lowercase unless first or last word",
        "For strict style-guide compliance, convert first, then hand-fix the small words",
      ],
    },
    {
      heading: "camelCase, snake_case, kebab-case: Which to Use in Code",
      paragraphs: [
        "These three naming conventions all solve the same problem, joining multiple words into a single identifier with no spaces, but different programming languages and platforms have settled on different conventions by tradition. camelCase joins words with no separator and capitalizes every word except the first, producing something like userFirstName; this is the standard for variables and function names in JavaScript, Java, and many other C-family languages.",
        "snake_case joins words with underscores and keeps everything lowercase, producing user_first_name; Python's official style guide favors this for variable and function names, and it's also common in database column names and configuration keys. kebab-case joins words with hyphens, also fully lowercase, producing user-first-name; it doesn't work as a variable name in most programming languages since hyphens are read as subtraction, but it's the standard convention for URL slugs, CSS class names, and HTML attributes.",
      ],
      bullets: [
        "camelCase: firstName — variables and functions in JavaScript, Java, C#",
        "snake_case: first_name — Python variables, database columns, config keys",
        "kebab-case: first-name — URL slugs, CSS classes, HTML attributes",
        "kebab-case cannot be used as a variable name in most languages due to the hyphen",
      ],
    },
    {
      heading: "PascalCase Explained: Class Names, Components, and File Naming",
      paragraphs: [
        "PascalCase looks almost identical to camelCase, joining words with no separator, except the very first word is also capitalized: UserFirstName instead of userFirstName. This small difference carries a specific meaning in most programming languages, so the two conventions aren't interchangeable even though they look similar at a glance.",
        "PascalCase is the standard naming convention for class names in languages like Java, C#, and Python, and it's also the convention React and other component-based frameworks use for component names, such as UserProfileCard.tsx. Because the distinction between camelCase and PascalCase matters to how code compiles or how a framework recognizes a component, always double check you've picked the button matching your language's convention rather than assuming the two are the same style.",
      ],
    },
    {
      heading: "UPPERCASE and lowercase: Simple but Common Text Transformations",
      paragraphs: [
        "These two buttons do exactly what they say, converting every letter in the text to all capitals or all lowercase, with no other changes to spacing, punctuation, or word boundaries. UPPERCASE is commonly needed for legal disclaimers, constant names in some programming styles (though true constant naming, like MAX_RETRY_COUNT, combines uppercase with underscores, which this tool doesn't produce as a single dedicated button), warning labels, or fixing text that was typed with Caps Lock on by mistake.",
        "lowercase is useful for normalizing text before a comparison, cleaning up a list of email addresses or usernames that should be lowercase by convention, or simply toning down text that was typed in all caps for emphasis but needs to read as plain prose instead.",
      ],
    },
    {
      heading: "How This Tool Handles Punctuation, Numbers, and Special Characters",
      paragraphs: [
        "For the code-style conversions, any character that isn't a letter or a number, including spaces, punctuation, and symbols, is treated as a word boundary and gets stripped out or replaced. In snake_case and kebab-case, runs of these boundary characters collapse into a single underscore or hyphen, and any leading or trailing separator is removed automatically, so \"Hello, World!\" becomes hello_world rather than _hello_world_ or hello__world.",
        "Numbers are preserved as part of a word rather than treated as their own boundary, so \"Page 2 Title\" converts to page2Title in camelCase rather than splitting the number off into its own segment. Because Sentence case and Title Case rely on periods, question marks, and exclamation points to detect word or sentence boundaries, text with unusual punctuation, abbreviations, or missing spacing after punctuation can produce a slightly different capitalization pattern than you'd get proofreading it by hand.",
      ],
    },
    {
      heading: "Converting Code Identifiers Between Naming Conventions",
      paragraphs: [
        "A common real-world task is converting an identifier from one convention to another, such as taking a database column named user_email_address and turning it into the camelCase userEmailAddress a JavaScript API expects, or the PascalCase UserEmailAddress a C# class property needs. Paste the identifier in with its existing separators, whether underscores, hyphens, or spaces, and the tool treats them the same way, stripping the old separator and applying the new casing rule.",
        "This works equally well in the other direction, converting a camelCase or PascalCase name back into snake_case or kebab-case, which comes up often when mapping a frontend JavaScript object's field names to a backend API's snake_case convention, or generating a URL slug from a page's PascalCase component name.",
      ],
    },
  ],
  useCases: [
    { title: "Fixing accidental Caps Lock text", description: "Convert text typed entirely in capitals back to normal sentence case or lowercase without retyping it." },
    { title: "Formatting headlines and titles", description: "Apply Title Case or Sentence case consistently across blog post titles, headings, or document sections." },
    { title: "Renaming variables and functions", description: "Convert an identifier between camelCase, snake_case, PascalCase, or kebab-case to match a language's naming convention." },
    { title: "Generating URL slugs", description: "Turn a page title or product name into a clean kebab-case slug suitable for a URL." },
    { title: "Mapping API field names", description: "Convert field names between a frontend's camelCase convention and a backend or database's snake_case convention." },
    { title: "Cleaning up pasted text", description: "Normalize text copied from a source with inconsistent casing before pasting it into a document or form." },
  ],
  mistakes: [
    { title: "Assuming Title Case matches your style guide", description: "This tool capitalizes every word; AP, Chicago, and APA style all keep certain short words lowercase, so a manual check is still needed for strict style compliance." },
    { title: "Mixing up camelCase and PascalCase", description: "The two look similar but differ in whether the first letter is capitalized, which matters for whether code expects a variable or a class/component name." },
    { title: "Using kebab-case as a variable name", description: "Hyphens are read as subtraction in most programming languages, so kebab-case only works for slugs, CSS classes, and file names, not variables." },
    { title: "Expecting SCREAMING_SNAKE_CASE from the UPPERCASE button", description: "UPPERCASE only capitalizes letters; it doesn't add underscores between words the way a constant-naming convention would." },
  ],
  tips: [
    "Run Title Case first, then manually lowercase any short words your specific style guide requires kept lowercase.",
    "Double check camelCase versus PascalCase output before pasting into code, since the two only differ by one capital letter.",
    "Use kebab-case for URL slugs and CSS classes, never as an actual variable name in code.",
    "Paste text with its original spacing and punctuation intact; the tool uses those to detect word boundaries.",
    "Use snake_case when preparing values for a Python codebase or a database column name.",
  ],
  glossary: [
    { title: "camelCase", description: "A naming convention that joins words with no separator and capitalizes every word except the first, such as firstName." },
    { title: "PascalCase", description: "A naming convention identical to camelCase except the first word is also capitalized, such as FirstName, commonly used for classes and components." },
    { title: "snake_case", description: "A naming convention that joins words with underscores and keeps all letters lowercase, such as first_name." },
    { title: "kebab-case", description: "A naming convention that joins words with hyphens and keeps all letters lowercase, such as first-name, used for URL slugs and CSS classes." },
    { title: "Title Case", description: "A capitalization style where the first letter of each word is capitalized, though style guides vary on whether short words are exceptions." },
    { title: "Sentence case", description: "A capitalization style where only the first letter of each sentence is capitalized, matching normal prose writing." },
  ],
};

export default guide;
