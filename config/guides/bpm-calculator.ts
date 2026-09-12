import type { ToolGuide } from "@/types/guide";

const guide: ToolGuide = {
  slug: "bpm-calculator",
  intro: [
    "This free online BPM calculator finds the tempo of any song by having you tap along to the beat instead of asking you to already know the number. Play the track, click the Tap button in time with the beat, and the tool calculates the average beats per minute from your last 8 taps, updating live as you keep tapping and stabilizing once you've tapped a steady rhythm a few times.",
    "Alongside the raw BPM number, the tool shows which classical tempo marking that speed falls into, from Grave at the slowest end up through Presto at the fastest, using the same Italian terms found in sheet music and DAW tempo displays. That gives musicians, DJs, and producers a quick sense of how a track's tempo compares to traditional tempo language, not just a bare number.",
    "It's useful anywhere you need a song's tempo and don't have it labeled: matching two tracks for a DJ transition, figuring out a workout playlist's pace, or setting a metronome or delay effect to match a recording you're working from.",
  ],
  sections: [
    {
      heading: "How to Find the BPM of a Song by Tapping",
      paragraphs: [
        "Start playing the song, then click the Tap button in time with the beat, ideally on the kick drum or the most obvious rhythmic pulse rather than a melody note that might fall off-beat. After your second tap, a BPM number appears and updates with every additional tap, calculated from the average time interval between your last 8 taps converted into beats per minute.",
        "The more consistently you tap, the more the number settles into a stable, accurate reading; a shaky first tap or two will swing the number around before it converges. If you lose the beat or want to start over, the Reset button clears your tap history and the BPM display so you can begin a fresh, clean measurement.",
      ],
      bullets: [
        "Tap on the strongest, most consistent beat (usually the kick drum or a clear downbeat)",
        "Keep tapping steadily; the calculation only uses your most recent 8 taps",
        "Use Reset if you miss a beat badly, rather than trying to average through the mistake",
      ],
    },
    {
      heading: "How Many Taps Do You Need for an Accurate Reading?",
      paragraphs: [
        "A BPM reading appears after just 2 taps, but that first number is based on a single interval and can be thrown off by even a small timing slip. By 4 to 8 taps, the average has enough data points to smooth out small human timing errors, and the displayed BPM should stay steady within a beat or two even as you keep tapping.",
        "The calculation always uses only the most recent 8 taps, sliding the window forward as you continue, so a long tapping session doesn't get thrown off by how you started; a shaky first attempt drops out of the average once you've tapped 8 more times cleanly after it.",
      ],
    },
    {
      heading: "BPM to Milliseconds: Setting Delay and Reverb Times in Music Production",
      paragraphs: [
        "Once you know a track's BPM, you can calculate the exact millisecond length of a musical note at that tempo using a simple formula: a quarter note in milliseconds equals 60,000 divided by the BPM. At 120 BPM, that's 60,000 ÷ 120 = 500ms per quarter note; at 140 BPM, it's about 428ms. From there, an eighth note is half that value and a sixteenth note is a quarter of it, which is exactly the math delay and reverb plugins use internally when you dial in a tempo-synced effect.",
        "This matters in production because a delay or echo set to a musically related time value, like a dotted eighth note, locks into the groove of the track instead of drifting against it, which is why producers reach for BPM-to-ms conversion constantly when setting up effects manually rather than relying on a plugin's built-in tempo sync.",
      ],
      bullets: [
        "Quarter note (ms) = 60,000 ÷ BPM",
        "Eighth note (ms) = quarter note ÷ 2",
        "Sixteenth note (ms) = quarter note ÷ 4",
        "Dotted eighth note (ms) = eighth note × 1.5 (a classic delay setting popularized in reggae and pop production)",
      ],
    },
    {
      heading: "Typical BPM Ranges by Genre (House 120-130, Hip-Hop 80-100, DnB 170-180)",
      paragraphs: [
        "Most genres cluster around a recognizable tempo range, which is part of why tapping out a BPM can also tell you something about a track's genre or feel. House and techno typically sit around 120-130 BPM, a range built for a steady four-on-the-floor dance pulse. Hip-hop and R&B often run slower, around 80-100 BPM, though the half-time or double-time feel of a beat can make the same track read as either range depending on what you tap along to.",
        "Drum and bass and its related styles push into 170-180 BPM, technically fast but often felt at half that speed because of how the drum patterns are programmed. Pop tracks are typically in the 100-130 BPM range, and ballads often drop below 80 BPM. None of these ranges are strict rules, but they're useful sanity checks: if you tap out 95 BPM on a track that clearly feels like a house record, you may be tapping every other beat rather than every beat.",
      ],
    },
    {
      heading: "Understanding the Tempo Classification (Grave to Presto)",
      paragraphs: [
        "Below the BPM number, the tool highlights which classical tempo marking your measured speed falls under: Grave (under 40 BPM), Largo (40-60), Adagio (60-66), Andante (66-76), Moderato (76-108), Allegro (108-156), Vivace (156-176), and Presto (176 and above). These Italian terms come from centuries of sheet music notation, long before digital BPM numbers existed, and they're still used today in classical scores and some DAW tempo displays.",
        "Knowing the classification is mostly useful for context and vocabulary, like recognizing that a 132 BPM track sits in Allegro territory, described historically as \"fast, quick, and bright,\" which matches the energetic feel most dance and pop tracks in that range actually have.",
      ],
    },
  ],
  useCases: [
    { title: "DJ beatmatching", description: "Tap out the tempo of a track that isn't labeled to help match or blend it with another song's BPM." },
    { title: "Setting tempo-synced delay and reverb", description: "Find a song's BPM, then use the millisecond formulas to manually set delay or reverb times that lock to the groove." },
    { title: "Building workout playlists", description: "Tap along to a track to check its BPM against a target pace for running, cycling, or interval training." },
    { title: "Transcribing or covering a song", description: "Measure the original tempo before setting up a metronome to practice or record a cover at the right speed." },
    { title: "Sorting a music library by feel", description: "Tap a handful of unlabeled tracks to get a rough sense of which ones share a similar energy or tempo range." },
  ],
  mistakes: [
    { title: "Tapping on the melody instead of the beat", description: "Tap on the rhythmic pulse, usually the kick drum or clearest downbeat, not a melody note that can fall off the grid." },
    { title: "Judging BPM from only 2-3 taps", description: "A couple of taps can be thrown off by small timing slips; keep tapping until the number stabilizes." },
    { title: "Tapping every other beat on a half-time or double-time groove", description: "Some genres feel slower or faster than their actual BPM; compare your reading against typical genre ranges if it seems off." },
    { title: "Expecting the tool to show a millisecond value directly", description: "The tool displays BPM and its tempo classification only; convert to milliseconds yourself with 60,000 ÷ BPM." },
  ],
  tips: [
    "Tap on the kick drum or clearest downbeat rather than a melody note for the most accurate reading.",
    "Keep tapping for at least 6-8 beats before trusting the displayed number.",
    "Use Reset and start over if you clearly miss a beat, rather than trying to tap through the mistake.",
    "Convert BPM to milliseconds with 60,000 ÷ BPM to manually set delay or reverb times.",
    "Compare your result against typical genre BPM ranges if the number seems unexpectedly high or low.",
    "Double or halve your tapped BPM if a track feels like it's being measured at the wrong speed for its genre.",
  ],
  glossary: [
    { title: "BPM (beats per minute)", description: "A measurement of tempo describing how many beats occur in one minute of music." },
    { title: "Tap tempo", description: "A method of measuring tempo by tapping a button in time with a beat rather than entering a number directly." },
    { title: "Quarter note", description: "A standard note duration representing one beat in most time signatures, used as the base unit for converting BPM to milliseconds." },
    { title: "Tempo-synced delay", description: "An audio effect whose repeat timing is set to a musical note length calculated from the track's BPM, so it stays in rhythm with the song." },
    { title: "Half-time / double-time feel", description: "When a track's perceived tempo is half or double its programmed BPM, common in genres like drum and bass or trap." },
    { title: "Classical tempo marking", description: "Italian terms like Allegro or Adagio historically used in sheet music to describe a range of tempos rather than one exact BPM." },
  ],
};

export default guide;
