import type { ToolGuide } from "@/types/guide";

const guide: ToolGuide = {
  slug: "metronome-online",
  intro: [
    "An online metronome keeps a steady click track so you can practice music at a fixed tempo without a physical device. This free metronome runs entirely in the browser from 20 to 300 BPM, which covers everything from a slow largo to a fast prestissimo passage, and needs no download or account. It's built for musicians of any level who want a practice metronome for their instrument, a beat counter for rehearsal, or a quick way to double-check the tempo of a piece.",
    "Set the tempo with the plus and minus buttons, the number field, or the slider, then press start to hear an audible click and watch a pulsing beat indicator move in time with it. A tap tempo button is included for figuring out the BPM of a song by ear, and five common tempo presets, Largo, Andante, Moderato, Allegro, and Presto, give you a quick starting point instead of guessing a number from scratch.",
  ],
  sections: [
    {
      heading: "Metronome BPM Chart: Tempo Markings from Largo to Prestissimo",
      paragraphs: [
        "Traditional tempo markings describe a range of BPM rather than one exact number, and this tool's five quick-select presets map to representative points inside those ranges: Largo at 50 BPM, Andante at 80, Moderato at 100, Allegro at 140, and Presto at 180. Composers used these Italian words for centuries before digital BPM numbers existed, so knowing both the word and the number helps when reading sheet music that only gives you one of them.",
        "The full traditional chart is wider than the five presets on the quick-select row. Use the number field or slider to dial in any BPM from 20 to 300 once you know which marking, or exact tempo from your sheet music, you're aiming for.",
      ],
      bullets: [
        "Largo: about 40-60 BPM (broad, very slow)",
        "Adagio: about 66-76 BPM (slow, expressive)",
        "Andante: about 76-108 BPM (walking pace)",
        "Moderato: about 108-120 BPM (moderate)",
        "Allegro: about 120-168 BPM (fast, bright)",
        "Presto / Prestissimo: about 168-200+ BPM (very fast)",
      ],
    },
    {
      heading: "How to Practice With a Metronome (Slow-Practice Method)",
      paragraphs: [
        "The most reliable way to learn a difficult passage is to slow it down until you can play it with zero mistakes, then increase the tempo gradually. Set the metronome 20-30% below the target tempo, play the passage cleanly several times in a row, then raise the BPM by 4-8 beats and repeat. This feels slower than most players want to go, which is exactly why it works: mistakes at speed are almost always mistakes that were never fixed at a slower tempo first.",
        "Resist the urge to jump straight to performance tempo. If you make the same error twice at a new BPM, drop back down 8-10 BPM rather than pushing through, since practicing a mistake at speed trains your hands to repeat it. Small, consistent BPM increases across several sessions produce far more reliable results than one long session at a tempo you can't yet control.",
      ],
    },
    {
      heading: "Time Signatures and Accents Explained",
      paragraphs: [
        "A time signature tells you how many beats are in each measure and which note value counts as one beat: 4/4 has four beats per measure, 3/4 (waltz time) has three, and 6/8 groups eight eighth notes into two larger beats. In live playing, the first beat of each measure, the downbeat, is usually played slightly louder than the others so a listener can feel where each measure starts.",
        "This metronome produces a single, unaccented click at your chosen BPM rather than a per-beat accent pattern tied to a specific time signature. To practice in 3/4 or 6/8, count the beat pattern yourself against the click, for example silently counting \"1-2-3\" and stressing beat one, or set the BPM to match the larger pulse of the measure instead of every subdivision.",
      ],
    },
    {
      heading: "Tap Tempo: Finding the BPM of a Song by Ear",
      paragraphs: [
        "If you know how a song feels but not its exact BPM, the tap tempo button solves that. Tap it in time with the beat at least four or five times; the tool averages the gaps between your taps and converts that average into a BPM, then sets the metronome to match. More taps generally produce a more accurate result than two or three, since it smooths out small timing variations in your own tapping.",
        "This is useful for matching a metronome to a backing track, figuring out the tempo of a song you want to learn by ear, or setting up a click track for a rehearsal when the sheet music doesn't list a BPM. The calculated tempo is clamped to the tool's 20-300 BPM range, so an unusually slow or fast tap sequence still lands on a usable number.",
      ],
    },
    {
      heading: "Metronome Practice for Different Instruments",
      paragraphs: [
        "Drummers and guitarists often keep the click on beat one only, in their head, since a literal click on every eighth note can clash with syncopated rhythms; pianists and string players more commonly practice with a click on every beat while learning a new piece, then wean off it once the tempo feels internalized. Wind and brass players frequently use a metronome to check that long tones and scale runs stay even across a full breath.",
        "Whatever the instrument, plug in headphones or raise the volume enough to hear the click clearly over your own playing, since a click you can't hear defeats the purpose. Practicing scales, arpeggios, and rhythm exercises against a steady BPM, not only full songs, builds the internal sense of time that eventually lets you play accurately without any click at all.",
      ],
    },
    {
      heading: "Metronome vs a Live Drummer or Backing Track",
      paragraphs: [
        "A metronome produces a perfectly even click with zero variation in timing, which is useful for building a stable internal sense of tempo but different from playing with a human drummer, who naturally adds small, musical timing variations. Practicing exclusively with a metronome can make playing with a live rhythm section feel unexpectedly rigid at first, so alternating metronome practice with playing along to real recordings helps bridge that gap.",
        "For recording a click track to lay down a rhythm section, most digital audio workstations include their own internal metronome tied to the session's BPM, which stays perfectly synced to recorded tracks in a way a browser-based metronome playing through speakers cannot, since there's no way to align it sample-for-sample with a separate recording device.",
      ],
    },
  ],
  useCases: [
    { title: "Slow-practice technique", description: "Break down a difficult passage at a reduced BPM, then raise the tempo gradually once it's clean at the slower speed." },
    { title: "Band and ensemble rehearsal", description: "Set one steady BPM so every player in a rehearsal room locks to the same tempo instead of gradually drifting apart." },
    { title: "Songwriting and production", description: "Check or set the BPM of a new song idea before recording, or match a click track to an existing recording." },
    { title: "Sight-reading practice", description: "Pick a slow, steady tempo and commit to playing through a new piece without stopping, even through small mistakes." },
    { title: "Warm-ups and technical exercises", description: "Run scales, arpeggios, and rhythm drills at a fixed tempo to build consistent timing before a practice session." },
  ],
  mistakes: [
    { title: "Practicing only at performance tempo", description: "Skipping the slow-practice stage means mistakes get built into muscle memory instead of corrected early." },
    { title: "Ignoring the click when it's inconvenient", description: "Turning the metronome off during hard sections is exactly when steady timing matters most." },
    { title: "Jumping BPM in large steps", description: "Raising the tempo by 20 or more BPM at once often brings the same errors back; smaller 4-8 BPM increases hold up better." },
    { title: "Expecting accented time signatures", description: "This tool gives one unaccented click per beat, not a per-measure accent pattern, so meter has to be counted mentally." },
  ],
  tips: [
    "Start 20-30% below your target tempo and only increase speed once a passage is completely clean.",
    "Use the tap tempo button when you know a song's feel but not its exact BPM.",
    "Increase tempo in small 4-8 BPM steps rather than large jumps.",
    "Pick the closest tempo marking preset as a starting point, then fine-tune with the slider.",
    "Wear headphones or raise the volume enough that the click stays audible over your instrument.",
  ],
  glossary: [
    { title: "BPM", description: "Beats per minute, the number of clicks the metronome produces every 60 seconds." },
    { title: "Tempo marking", description: "A traditional Italian term such as Andante or Allegro that describes a range of BPM rather than one exact number." },
    { title: "Downbeat", description: "The first, usually emphasized, beat of a measure." },
    { title: "Time signature", description: "A pair of numbers at the start of a piece showing how many beats are in each measure and which note counts as one beat." },
    { title: "Tap tempo", description: "A method of setting BPM by tapping a button in time with a beat instead of typing a number directly." },
  ],
};

export default guide;
