import type { ToolGuide } from "@/types/guide";

const guide: ToolGuide = {
  slug: "hash-generator",
  intro: [
    "A hash generator takes any text and runs it through a cryptographic hash function, producing a fixed-length string of letters and numbers that acts as a unique fingerprint for that exact input. Change even a single character in the original text and the resulting hash comes out completely different, which is what makes hashes useful for spotting tampering, comparing files, or storing password checks without storing the password itself.",
    "This tool generates SHA-1, SHA-256, and SHA-512 hashes simultaneously using the Web Crypto API built into your browser, so nothing you type is sent to a server. Paste or type any text, click Generate, and all three hash values appear side by side with individual copy buttons.",
    "MD5 is not available here because the Web Crypto API, the browser standard this tool relies on for secure hashing, doesn't implement it; MD5 is also considered cryptographically broken and shouldn't be used for anything security-related in 2026 regardless of availability.",
  ],
  sections: [
    {
      heading: "SHA-256 vs SHA-1 vs MD5: Which Hash Should You Use?",
      paragraphs: [
        "SHA-256 is the current general-purpose standard: it produces a 64-character hexadecimal hash, is used throughout modern software (including Bitcoin, TLS certificates, and Git's newer object format), and has no known practical collision attacks. SHA-1 produces a shorter 40-character hash and was the standard through the 2000s, but researchers demonstrated a real collision attack against it in 2017, and major browsers and certificate authorities have since deprecated it for security purposes.",
        "MD5, once the most common hash function for checksums, is now considered broken: collisions (two different inputs producing the same hash) can be generated in seconds on ordinary hardware. It still shows up for basic file-integrity checks where security isn't the concern, like verifying a download wasn't corrupted in transit, but should never be used for passwords, digital signatures, or anything where an attacker might deliberately try to fake a match.",
        "For any new project in 2026, SHA-256 is the safe default. This tool also includes SHA-512, which produces a longer 128-character hash and offers a wider security margin, useful for high-security applications, though SHA-256 is fast enough and secure enough for the overwhelming majority of use cases.",
      ],
      bullets: [
        "SHA-1: 40 hex characters, deprecated for security use since 2017",
        "SHA-256: 64 hex characters, current general-purpose standard",
        "SHA-512: 128 hex characters, wider security margin for high-security needs",
        "MD5: not supported here; considered broken and unsuitable for any security purpose",
      ],
    },
    {
      heading: "How to Verify a File Download With a Hash (Checksum)",
      paragraphs: [
        "Software publishers often post a SHA-256 checksum alongside a download link so you can confirm the file you received matches exactly what they published, with no corruption or tampering in between. Since this tool hashes text rather than files directly, the workflow is to generate the file's hash on your own machine first, using a command-line tool, and then compare that value against the one the publisher posted.",
        "On macOS or Linux, running shasum -a 256 filename in Terminal prints the SHA-256 hash of that file. On Windows, CertUtil -hashfile filename SHA256 does the same from Command Prompt. Copy the resulting hash and compare it character by character against the publisher's posted value; if even one character differs, the file was altered or corrupted and shouldn't be trusted.",
        "This tool is useful for the comparison step, or for hashing a piece of text (like a license key, API token, or short snippet) where you want a reliable fingerprint without needing a command-line tool at all.",
      ],
      bullets: [
        "macOS/Linux: shasum -a 256 filename",
        "Windows: CertUtil -hashfile filename SHA256",
        "Compare the output character by character against the publisher's posted hash",
        "Any mismatch, even one character, means the file was altered or corrupted",
      ],
    },
    {
      heading: "How Hashing Is Used to Store Passwords Securely",
      paragraphs: [
        "Well-built systems never store your actual password; they store a hash of it, so that even if the database is breached, the raw passwords aren't directly exposed. When you log in, the system hashes what you typed and compares it to the stored hash rather than comparing plain text passwords.",
        "In practice, secure systems don't use a raw SHA-256 hash for this either. They use a purpose-built password-hashing algorithm like bcrypt, scrypt, or Argon2, which are deliberately slow and include a random 'salt' added to each password before hashing. This defends against attackers using massive precomputed tables (called rainbow tables) or brute-force guessing at high speed, something a fast general-purpose hash like SHA-256 is actually vulnerable to precisely because it's designed to be fast.",
      ],
    },
    {
      heading: "Hashing vs Encryption: What's the Difference?",
      paragraphs: [
        "Hashing is one-way: you can turn text into a hash, but there's no operation that turns the hash back into the original text. Encryption is two-way: encrypted data (ciphertext) can be decrypted back into its original form using the correct key. This distinction is why hashing is used for verification (does this match what I expect?) while encryption is used for confidentiality (can only the intended recipient read this?).",
        "A related and common confusion: hashing the same input always produces the same output, which is by design, but that also means a hash alone doesn't hide the content of short, guessable inputs. Hashing 'password123' with SHA-256 always produces the exact same 64-character string, and that string appears in publicly available lookup tables for common passwords, so hashing alone isn't a substitute for the salted, slow algorithms real password systems use.",
      ],
    },
    {
      heading: "Practical Uses for a Text Hash Generator",
      paragraphs: [
        "Beyond password systems and file checksums, developers use hash generators to create consistent cache keys from variable input, detect duplicate content by comparing hashes of two pieces of text instead of the full text itself, and generate deterministic IDs for records where the same input should always produce the same identifier.",
        "For anyone testing an API or database migration, hashing a snippet of text before and after a transformation is a quick way to confirm the content came through unchanged, without manually diffing long strings character by character.",
      ],
    },
  ],
  useCases: [
    { title: "Verifying a downloaded file's checksum", description: "Generate a file's SHA-256 hash with a command-line tool, then paste it here alongside the publisher's posted value to confirm they match." },
    { title: "Fingerprinting a piece of text", description: "Generate a hash of a document, license key, or config value to detect later whether it changed, without storing the full text elsewhere." },
    { title: "Learning how password hashing works", description: "Hash a sample password to see how drastically the output changes for even a one-character difference in input." },
    { title: "Creating a deterministic cache or record key", description: "Use a SHA-256 hash of an input string as a consistent, fixed-length key for caching or database lookups." },
    { title: "Comparing two pieces of text for an exact match", description: "Hash both pieces of text and compare the short hash values instead of scanning long strings for differences." },
  ],
  mistakes: [
    { title: "Using MD5 or SHA-1 for anything security-related", description: "Both are considered broken for security purposes; use SHA-256 or SHA-512 for anything beyond basic non-security file comparison." },
    { title: "Assuming a hash can be reversed", description: "Hashing is one-way by design; if you need to recover the original data, you need encryption, not hashing." },
    { title: "Storing raw SHA-256 hashes of passwords in production systems", description: "Real password storage needs a slow, salted algorithm like bcrypt or Argon2, not a fast general-purpose hash." },
    { title: "Expecting this tool to hash a file directly", description: "This tool hashes text input only; hash the file with a command-line tool first, then compare the result here." },
    { title: "Not checking for whitespace or formatting differences before comparing hashes", description: "An extra space or line break changes the entire hash, even though the visible text might look identical." },
  ],
  tips: [
    "Use SHA-256 as your default choice unless you have a specific reason to need SHA-1 (rare, legacy compatibility) or SHA-512 (extra security margin).",
    "When verifying a download, compare the full hash string character by character rather than just the first and last few characters.",
    "Remember that identical input always produces identical output; hash a test string twice to confirm the tool behaves as expected.",
    "Don't rely on a raw hash to protect a real password in an application; use a dedicated password-hashing library instead.",
    "Trim accidental leading or trailing whitespace from your input before hashing if you're comparing against a hash generated elsewhere.",
  ],
  glossary: [
    { title: "Hash function", description: "An algorithm that converts input of any length into a fixed-length string of characters, producing a completely different output for even a tiny change in input." },
    { title: "Checksum", description: "A hash value used specifically to verify that a file or piece of data hasn't been altered or corrupted." },
    { title: "Collision", description: "When two different inputs produce the same hash output; a well-designed hash function makes collisions extremely difficult to find deliberately." },
    { title: "Salt", description: "Random data added to an input before hashing, used in password storage to make precomputed lookup-table attacks ineffective." },
    { title: "Web Crypto API", description: "A browser-standard interface for performing cryptographic operations like hashing directly in JavaScript, without sending data to a server." },
    { title: "Hexadecimal", description: "A base-16 number system using digits 0-9 and letters a-f; hash outputs are typically displayed as hexadecimal strings." },
  ],
};

export default guide;
