import type { ToolGuide } from "@/types/guide";

const guide: ToolGuide = {
  slug: "password-generator",
  intro: [
    "A password generator creates a random string of characters that's far harder to guess than anything a person would think up, whether that's a birthday, a pet's name, or a reused favorite. This tool generates passwords entirely in your browser using the Web Crypto API's cryptographically secure random number source, not a simple pseudo-random function, so the output isn't predictable even if someone knew the exact moment it was generated. It's built for anyone creating a new account, resetting a compromised password, or replacing a weak one flagged by a password manager.",
    "Choose a length from 6 to 64 characters and toggle uppercase letters, lowercase letters, numbers, and symbols on or off, then generate. The tool shows a simple strength label based on how many character types you've included, plus a one-click copy button so you can paste the result straight into a signup form or your password manager without retyping it by hand.",
  ],
  sections: [
    {
      heading: "How Long Should a Password Be in 2026? (Entropy Explained)",
      paragraphs: [
        "Password strength is usually measured in bits of entropy, which comes from two things: how many possible characters could appear at each position, and how many positions, the length, there are. With all four character types enabled, this generator draws from 88 possible characters (26 uppercase, 26 lowercase, 10 digits, 26 symbols), giving about 6.5 bits of entropy per character. A 12-character password from that full set has roughly 78 bits of entropy; a 16-character password has about 103 bits.",
        "For comparison, a lowercase-only password draws from just 26 characters, about 4.7 bits each, so it needs roughly 22 characters to match the entropy of a 16-character password using all four character types. As a practical baseline for 2026, aim for at least 12 characters with all character types enabled for everyday accounts, and 16 or more for anything protecting financial data, email, or a password manager's own master password.",
      ],
      bullets: [
        "All 4 types (88 characters): about 6.5 bits per character",
        "Letters + numbers (62 characters): about 6.0 bits per character",
        "Upper + lowercase only (52 characters): about 5.7 bits per character",
        "Lowercase only (26 characters): about 4.7 bits per character",
      ],
    },
    {
      heading: "Passphrase vs Random Password",
      paragraphs: [
        "A passphrase strings together several random dictionary words, such as \"correct-horse-battery-staple,\" and relies on picking each word from a large enough list to stay hard to guess. Using a common 7,776-word list, each word contributes about 13 bits of entropy, so a five-word passphrase reaches roughly 65 bits and a six-word passphrase reaches about 78 bits, comparable to a 10-12 character random password from this generator.",
        "The tradeoff is memorability versus density: a passphrase is easier for a human to type and recall, while a random-character password packs more entropy into fewer characters, which matters for fields with strict length limits. This tool generates the random-character type rather than word-based passphrases, so if you specifically want a memorable passphrase you'll need a dedicated word-based generator; for anything stored in a password manager rather than memorized, a random password is usually the better fit anyway.",
      ],
    },
    {
      heading: "Choosing the Right Character Types for Each Account",
      paragraphs: [
        "Most sites accept all four character types, so leaving uppercase, lowercase, numbers, and symbols all enabled maximizes entropy for a given length. Some older systems, certain PINs, or specific banking portals restrict which symbols are allowed or cap the total length; if a generated password gets rejected, try disabling symbols first before shortening the length, since length contributes more to security than any single character type does.",
        "For a master password you'll type by hand regularly, such as your password manager's own login, consider a slightly shorter, memorable passphrase instead of a long random string, since you can't copy-paste your way into an app you haven't unlocked yet. For every other account, where the password manager fills it in automatically, generate the longest, most complex string the site will accept.",
      ],
    },
    {
      heading: "Why Randomness Quality Matters",
      paragraphs: [
        "Not all \"random\" is equal. Some online generators and simple scripts use pseudo-random functions that are fast but predictable if an attacker knows the algorithm and roughly when the password was created. This tool instead uses the browser's Web Crypto API, a cryptographically secure random number source built specifically so its output can't be reconstructed, even by someone with detailed knowledge of the generation method.",
        "There is a theoretical, extremely small mapping bias when converting random numbers into characters from a set that doesn't evenly divide the random range, but at the scale involved here it has no practical effect on security. Everything happens locally in your browser: no password is transmitted anywhere or stored on a server, which is exactly how a password generator should behave.",
      ],
    },
    {
      heading: "Common Password Mistakes This Tool Helps You Avoid",
      paragraphs: [
        "Reused passwords are the single biggest risk in most account breaches, since one leaked password gets tried against every other account you own. Generating a unique password for every account, and storing it in a password manager rather than memorizing it, removes the temptation to reuse a password you already know by heart.",
        "Predictable patterns, like capitalizing only the first letter and adding \"1!\" at the end, are exactly the kind of shortcut password-cracking tools are built to check first. A fully random string, with the length slider pushed up and all four character types enabled, avoids that pattern entirely, which is the main advantage of generating a password instead of inventing one yourself.",
      ],
    },
    {
      heading: "Generating Passwords for API Keys and System Secrets",
      paragraphs: [
        "The same length and character-type controls used for account passwords also work for generating random strings for other purposes, like a temporary API key placeholder, a database password, or a router admin password, though some systems restrict which symbols are valid in these contexts more strictly than a typical login form does.",
        "For a secret that will live in a configuration file or environment variable rather than being typed by a person, there's no memorability requirement at all, so pushing the length up toward the 64-character maximum with every character type enabled produces the strongest possible result for that specific use.",
      ],
    },
  ],
  useCases: [
    { title: "New account signups", description: "Generate a unique, strong password for every new account instead of reusing one you already use elsewhere." },
    { title: "Password manager master passwords", description: "Create a long, high-entropy password specifically for the one account that protects all your others." },
    { title: "Replacing a breached password", description: "Quickly generate a fresh, unrelated password after a data breach notification for any affected account." },
    { title: "Shared or guest accounts", description: "Generate a temporary strong password for a shared device, guest login, or temporary account access." },
    { title: "Meeting password policy requirements", description: "Hit minimum length and complexity requirements set by workplace IT or banking security policies instantly." },
  ],
  mistakes: [
    { title: "Choosing a short length to make it easier to remember", description: "Shorter passwords lose entropy fast; use a password manager instead of memorizing long strings." },
    { title: "Disabling symbols out of habit", description: "Removing symbols shrinks the character set from 88 to 62, meaningfully lowering entropy per character." },
    { title: "Reusing a generated password across sites", description: "A strong password generated for one account still becomes a risk everywhere else if it's reused." },
    { title: "Writing the password down somewhere unencrypted", description: "A strong random password loses its advantage if it ends up in a plain text file or a sticky note." },
  ],
  tips: [
    "Set the length slider to at least 16 characters for accounts protecting sensitive data.",
    "Keep all four character types enabled unless a specific site rejects one of them.",
    "Store generated passwords in a password manager rather than memorizing or writing them down.",
    "Generate a brand-new password rather than tweaking an old one after any breach notice.",
    "Use a memorable passphrase, not a random-character password, for your password manager's own master password.",
  ],
  glossary: [
    { title: "Entropy", description: "A measure, in bits, of how unpredictable a password is; higher entropy means more possible combinations an attacker would have to try." },
    { title: "Character set", description: "The full pool of characters a password can draw from, such as uppercase letters, lowercase letters, numbers, and symbols." },
    { title: "Passphrase", description: "A password made of several random dictionary words strung together instead of random individual characters." },
    { title: "Brute-force attack", description: "An attack method that tries every possible character combination until it finds the correct password." },
    { title: "CSPRNG", description: "A cryptographically secure random number generator, a random number source designed so its output cannot be predicted even by someone who knows the algorithm." },
  ],
};

export default guide;
