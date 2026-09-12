import type { ToolGuide } from "@/types/guide";

const guide: ToolGuide = {
  slug: "morse-code-translator",
  intro: [
    "This free Morse code translator converts plain text into dots and dashes, and converts dots and dashes back into plain text, in both directions at once. Type a word into the text box and its Morse code appears instantly in the box next to it; paste a string of dots and dashes into the Morse box and the decoded English appears just as fast. There's no submit button and no page reload, since the translation updates as you type.",
    "The character set covers the 26 English letters (automatically capitalized), the digits 0 through 9, and four punctuation marks: period, comma, question mark, and exclamation point. Any character outside that set, including accented letters, symbols, or other punctuation, is shown as a question mark rather than a made-up code, so you always know when something didn't translate cleanly. A reference chart of the full alphabet and digit codes sits below the translator for quick lookup while you're decoding something by hand.",
    "Beyond translating, the tool can play the resulting Morse code out loud as a series of audio beeps, which is useful for practicing your ear, checking a message before sending it over an actual radio, or just hearing what a word sounds like in the code that carried telegraph and early radio traffic for over a century. Everything runs in the browser with no account and no message history stored anywhere.",
  ],
  sections: [
    {
      heading: "Morse Code Alphabet Chart (A-Z, 0-9, Punctuation)",
      paragraphs: [
        "The reference chart underneath the translator lists every letter A through Z and every digit 0 through 9 alongside its dot-dash pattern, which is the same chart used in ham radio study guides and Scouting handbooks. Samuel Morse and Alfred Vail didn't assign these codes randomly: common English letters like E (a single dot) and T (a single dash) got the shortest patterns, while rarely used letters like Q, X, and Z got longer ones, since that made average message-sending time shorter across real English text.",
        "For punctuation, only four marks are supported: period (.-.-.-), comma (--..--), question mark (..--..), and exclamation point (-.-.--). This covers the marks people actually type most often when practicing or sending short messages. Anything else, such as a colon, an at-sign, or an apostrophe, isn't in the lookup table and will come back as a question mark in either direction, so it's worth sticking to letters, digits, and these four marks if you need a message to decode cleanly on the other end.",
      ],
      bullets: [
        "E = . and T = - (the two shortest codes, for the two most common English letters)",
        "SOS = ... --- ... (three of the simplest, most recognizable patterns)",
        "Full A-Z and 0-9 chart displayed below the translator for quick reference",
        "Only period, comma, question mark, and exclamation point are supported punctuation",
      ],
    },
    {
      heading: "How to Learn Morse Code Fast: The Koch Method",
      paragraphs: [
        "Most people who try to memorize the entire Morse alphabet at once, then slowly speed up their reading, get stuck because their brain learns to count dots and dashes instead of recognizing each letter's rhythm as a single sound. The Koch method flips this: you start by learning just two letters at full target speed, add a third only once you can recognize the first two with about 90% accuracy, then keep adding one letter at a time. Speed never changes; only the alphabet you're tested on grows.",
        "You can run a simplified version of this with the translator. Type the two or three letters you're currently practicing into the text box, listen to the audio playback a few times with your eyes closed, then try writing down what you heard before checking it against the text box. Add one new letter once you're consistently getting it right, and keep the list short rather than jumping ahead to a full sentence too early.",
      ],
    },
    {
      heading: "SOS in Morse Code and Why It Was Chosen",
      paragraphs: [
        "Typing SOS into the translator produces ... --- ..., three dots, three dashes, three dots, with no letter spaces needed inside the pattern since it's meant to be sent as one continuous, unmistakable string. It's a common myth that SOS stands for something like \"Save Our Ship\"; it doesn't stand for anything. It was adopted as the international distress signal in 1906 specifically because S and O are two of the simplest, most symmetrical letters in the whole alphabet, making the pattern nearly impossible to misread even over a noisy line or by an inexperienced operator.",
        "Because the pattern is so short and simple, SOS is a good first thing to type into the tool when you want to confirm the audio playback is working correctly before trying to send or decode anything longer. If you hear three short beeps, three long beeps, then three short beeps again, everything is functioning as expected.",
      ],
    },
    {
      heading: "Morse Code Timing: Dots, Dashes, and Spacing Explained",
      paragraphs: [
        "Standard Morse code timing is built around one unit of time. A dot lasts one unit; a dash lasts three units, exactly three times as long as a dot, which is the ratio this tool's audio playback follows. The gap between the dots and dashes inside a single letter is one unit, the gap between separate letters is three units, and the gap between whole words is seven units, which is by far the longest pause you'll hear.",
        "In the text box, the translator represents a word break as \" / \" between groups of letters, matching that seven-unit word gap when you play the audio. If you're decoding Morse code by hand and pasting it into the Morse box, keep single spaces between individual letter codes and a \" / \" between words; without that word separator, the decoder has no way to know where one word ends and the next begins.",
      ],
      bullets: [
        "Dot = 1 unit, dash = 3 units",
        "Gap between elements in the same letter = 1 unit",
        "Gap between letters = 3 units",
        "Gap between words = 7 units, shown as \" / \" in the text output",
      ],
    },
    {
      heading: "Listening to Morse Code: How the Audio Playback Works",
      paragraphs: [
        "Pressing Play Audio generates a real 600 Hz tone directly in your browser using the Web Audio API, no audio file download required, and plays through the dots and dashes of whatever is currently in the Morse box at the standard 1:3 dot-to-dash length ratio. The button disables itself while a message is playing, so pressing it again mid-message won't overlap two versions of the same audio on top of each other.",
        "One limitation worth knowing: playback speed is fixed rather than adjustable in the current version of this tool, roughly equivalent to a beginner-friendly 15 words per minute using the standard PARIS timing method. That makes it well suited to verifying that a translation sounds right or getting a feel for standard dot-dash proportions, though it isn't yet a substitute for a dedicated trainer app if you specifically need to practice at multiple speeds.",
      ],
    },
    {
      heading: "Everyday and Hobby Uses for Morse Code Today",
      paragraphs: [
        "Morse code hasn't been required for a ham radio license in most countries for years, but plenty of amateur radio operators still learn and use it, since a CW (continuous wave) signal can get through under noisy conditions where voice can't. Outside of radio, it shows up in Scouting merit badges, escape room puzzle design, flashlight signaling for outdoor games, and as a way to hide a short secret message in a story, a tattoo, or a piece of jewelry.",
        "For any of these, this tool works best as a fast encode-decode helper rather than a full trainer: type a phrase to get its code instantly, paste a code you found somewhere to read what it says, or use the audio to double-check a pattern before committing it to a costume prop or a puzzle answer key. Just remember it won't handle accented letters, lowercase-specific codes, or punctuation outside the four supported marks.",
      ],
    },
  ],
  useCases: [
    { title: "Learning the Morse alphabet", description: "Practice recognizing letters by sound using the Koch method, starting with a couple of letters and adding more as accuracy improves." },
    { title: "Ham radio and CW practice", description: "Check how a callsign or short phrase sounds in Morse code before sending it over the air, or decode a pattern you heard." },
    { title: "Puzzles and escape rooms", description: "Encode a clue as Morse code for a puzzle, or decode dots and dashes found in a game or scavenger hunt." },
    { title: "Scouting badges and school projects", description: "Complete a Morse code activity or classroom assignment without memorizing the full chart from scratch." },
    { title: "Secret messages and novelty use", description: "Turn a short phrase into Morse code for a card, a tattoo design, a costume prop, or a fun message between friends." },
  ],
  mistakes: [
    { title: "Expecting punctuation beyond the four supported marks", description: "Only period, comma, question mark, and exclamation point are mapped; anything else, like an apostrophe or colon, decodes as a question mark." },
    { title: "Forgetting the word separator when decoding", description: "Pasted Morse code needs a \" / \" between words and single spaces between letters, or the decoder can't tell where one word ends and the next starts." },
    { title: "Assuming playback speed can be changed", description: "Audio always plays at the tool's fixed pace; there's no speed slider in the current version." },
    { title: "Typing lowercase letters and expecting a different code", description: "Text is automatically converted to uppercase before encoding, since Morse code doesn't distinguish case." },
  ],
  tips: [
    "Type a short phrase first to confirm the translation and audio both look and sound right before trying something longer.",
    "Use the reference chart below the translator instead of memorizing the whole alphabet up front.",
    "Practice with the Koch method: master two or three letters at full speed before adding a new one.",
    "Play SOS (... --- ...) first to confirm the audio is working, since it's the simplest recognizable pattern.",
    "Stick to letters, digits, and the four supported punctuation marks if the message needs to decode cleanly elsewhere.",
  ],
  glossary: [
    { title: "Dit and dah", description: "The spoken names for a dot and a dash in Morse code, used by operators instead of saying \"dot\" and \"dash\" out loud." },
    { title: "CW (continuous wave)", description: "The radio term for a Morse code signal, still used by amateur radio operators because it can get through under weak or noisy conditions." },
    { title: "Koch method", description: "A Morse code training approach that keeps speed constant and adds one new letter at a time only after high accuracy is reached." },
    { title: "PARIS timing", description: "A standard method for measuring Morse code speed in words per minute, based on the average length of the word \"PARIS\" sent repeatedly." },
    { title: "International Morse Code", description: "The modern standardized version of Morse code used worldwide for radio and telegraphy, covering the Latin alphabet, digits, and common punctuation." },
  ],
};

export default guide;
