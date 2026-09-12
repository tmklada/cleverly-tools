import type { ToolGuide } from "@/types/guide";

const guide: ToolGuide = {
  slug: "password-strength-checker",
  intro: [
    "A password strength checker looks at what you type and estimates how hard it would be for someone to guess or crack, but the number and label it shows you only mean something if you understand how they were calculated. This tool runs a straightforward checklist against your password — length, uppercase letters, lowercase letters, numbers, and symbols — and combines those into a strength score from Very Weak to Very Strong, along with a rough estimate of how long a brute-force attack would take to guess it.",
    "Nothing you type here ever leaves your browser. The check runs entirely in client-side JavaScript, with no network request, no server log, and nothing saved anywhere — you can safely test a password you actually plan to use, including one for a bank account or an email login, without it being transmitted or stored anywhere.",
    "The strength label and the crack-time estimate are both useful signals, not guarantees. They're explained in detail below so you know exactly what's being measured and, just as importantly, what isn't.",
  ],
  sections: [
    {
      heading: "How the Strength Score Is Actually Calculated",
      paragraphs: [
        "The strength label is based on a simple six-point checklist, not a password-cracking database or a dictionary lookup. Your password earns one point for each of the following it satisfies: at least 8 characters, at least 12 characters, contains an uppercase letter, contains a lowercase letter, contains a number, and contains a symbol. Those points are added up and mapped to a label — 0-1 points is Very Weak, 2 is Weak, 3 is Fair, 4 is Good, 5 is Strong, and 6 is Very Strong.",
        "This means the score rewards variety and length, not how common or predictable the password actually is. A password like Password123! would score close to the maximum here because it hits every character-type requirement and clears 12 characters, even though it starts with one of the most commonly used base words in real-world password breaches. The checklist below the strength bar shows exactly which of the six criteria you've met, so you can see precisely why a password scored the way it did.",
      ],
    },
    {
      heading: "Why Length Beats Complexity",
      paragraphs: [
        "Of the six checklist items, two are pure length thresholds (8 and 12 characters) and four are about character variety. In practice, length contributes more to how many attempts a brute-force attack needs than adding one more character type, because each additional character multiplies the total combinations, while a symbol only adds a fixed, often predictable, set of extra options.",
        "A 16-character password using only lowercase letters has a far larger combination space than an 8-character password crammed with uppercase, numbers, and symbols, even though the shorter one looks more complex at a glance. That's reflected in the crack-time estimate below, which is why security guidance has shifted from demanding complexity toward simply demanding length, often through a multi-word passphrase.",
      ],
    },
    {
      heading: "How Long Would It Take to Crack Your Password? (Entropy and Guess Rates)",
      paragraphs: [
        "The crack-time estimate next to the strength label is calculated separately from the checklist score, using a rough brute-force model. It figures out which character sets your password draws from — lowercase (26), uppercase (26), numbers (10), symbols (roughly 32) — adds those into a total character space, then raises that number to the power of your password's length to get the total possible passwords of that composition and length. It divides that by an assumed guessing speed of 10 billion attempts per second, halving the result on the assumption an attacker finds your password after searching about half the total space on average.",
        "This is a simplified, worst-case-for-the-attacker estimate: it assumes pure brute force, not a smarter attack using leaked password lists, dictionary words, or predictable patterns like appending 123! to a real word. Real attackers usually try those approaches first, so a password scoring centuries on this estimate could still be guessed in seconds if it's a well-known word with common substitutions. Treat the number as an order of magnitude, not a literal deadline.",
      ],
      bullets: [
        "abc123 (lowercase + numbers, 6 characters): a small combination space, crackable almost instantly by this estimate.",
        "Tr0ub4dor&3 (mixed case, numbers, symbols, 11 characters): a much larger space, but still a known example of a memorable-but-guessable pattern.",
        "A 16+ character passphrase of unrelated words: often the largest practical combination space without needing to memorize random characters.",
      ],
    },
    {
      heading: "What the Checklist Does and Doesn't Catch",
      paragraphs: [
        "The visible checklist under the strength bar shows exactly which of the six scoring criteria your password meets, updating in real time as you type. The suggestions box below only appears when your score is below Good, listing specifically which unmet criteria would raise it.",
        "What this checklist cannot do is recognize that a password is a real word, a known breached password, your name, a keyboard pattern like qwerty12345!, or a variation of something already leaked in a data breach. Those are exactly the passwords real attackers try first, before falling back to brute force, and a rule-based checklist has no way to flag them. A password can satisfy all six criteria here and still be one of the first guesses an attacker makes.",
      ],
    },
    {
      heading: "Turning a Weak Result Into a Strong Password",
      paragraphs: [
        "If your password scores below Good, the tool lists specific, actionable fixes rather than a generic strong password warning — it tells you exactly which of length, uppercase, numbers, and symbols is missing. The fastest way to jump several points at once is usually adding length: extending a password from 8 to 12+ characters satisfies two checklist items on its own and has the largest effect on the crack-time estimate.",
        "A reliable pattern that scores well here and holds up against real attacks is a passphrase of three or four unrelated words, with a number and symbol worked in somewhere unpredictable rather than tacked onto the end, since attackers already expect a trailing digit or exclamation point on an otherwise weak password.",
      ],
    },
    {
      heading: "Using a Password Manager Instead of Memorizing Everything",
      paragraphs: [
        "Checking password strength manually only scales so far — most people have dozens of accounts, and memorizing a unique, high-scoring password for each one isn't realistic. A password manager generates and stores long, random passwords for you, so you only need to remember one strong master password, which is exactly the kind of password worth running through a checker like this one first.",
        "A reasonable workflow: test your master password here to confirm it clears Strong or Very Strong with a comfortably long crack-time estimate, then let the manager handle generating and storing everything else, since machine-generated random strings will always outscore anything designed to be memorable.",
      ],
    },
  ],
  useCases: [
    { title: "Testing a new master password before committing to it", description: "Check a password manager's master password for strength and estimated crack time before relying on it for every account." },
    { title: "Understanding why a password was rejected during signup", description: "See exactly which length or character-type requirement a password is missing when a signup form's strength rules aren't clear." },
    { title: "Comparing passphrase vs complex-string strategies", description: "Test a long multi-word passphrase against a shorter complex password to see how much length affects the crack-time estimate." },
    { title: "Teaching password security basics", description: "Use the live checklist to visually demonstrate to someone why length and character variety both matter." },
    { title: "Auditing personal or shared passwords privately", description: "Check an existing password's strength without it ever being transmitted, since the entire check runs in your browser." },
  ],
  mistakes: [
    { title: "Assuming a high score means the password hasn't been breached", description: "The checklist only measures length and character variety — it can't detect that a password is a common word or already leaked in a data breach." },
    { title: "Relying on the crack-time estimate as an exact figure", description: "It's a rough brute-force calculation that ignores dictionary attacks and known password patterns, so treat it as an order of magnitude, not a guarantee." },
    { title: "Adding a symbol only at the end of a word", description: "Attackers expect trailing digits and punctuation on otherwise simple passwords; placing them mid-password is harder to predict." },
    { title: "Prioritizing character variety over length", description: "Two of the six checklist points are length-based, and length has a larger effect on the crack-time estimate than adding one more character type." },
    { title: "Reusing a Strong-scoring password across multiple accounts", description: "This tool only measures the password itself, not reuse risk — a single breach of one account still exposes every account sharing that password." },
  ],
  tips: [
    "Nothing typed into this checker is sent anywhere — it's safe to test a password you actually plan to use.",
    "Prioritize length first; extending a password past 12 characters raises the score and the crack-time estimate more than adding one more symbol.",
    "Use a passphrase of three or four unrelated words instead of a single dictionary word with characters swapped for numbers.",
    "Treat the crack-time estimate as a rough brute-force figure, not an exact guarantee, since it doesn't account for dictionary or breach-based attacks.",
    "Place numbers and symbols in the middle of a password rather than only at the end, where attackers expect them.",
    "Use a password manager to generate and store unique passwords, and reserve manual strength-checking for your master password.",
  ],
  glossary: [
    { title: "Entropy", description: "A measure of how unpredictable a password is, driven by both its length and how many different character types it draws from." },
    { title: "Brute-force attack", description: "An attack that tries every possible character combination until one matches, which is the basis for this tool's crack-time estimate." },
    { title: "Character space", description: "The total number of possible characters a password could use at each position, based on which character types (lowercase, uppercase, numbers, symbols) it contains." },
    { title: "Dictionary attack", description: "An attack that tries real words, common passwords, and known breached passwords first, rather than every random combination — not something this checklist can detect." },
    { title: "Passphrase", description: "A password made of several unrelated words strung together, often reaching strong length with less memorization effort than a complex random string." },
  ],
};

export default guide;
