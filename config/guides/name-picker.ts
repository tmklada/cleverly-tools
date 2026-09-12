import type { ToolGuide } from "@/types/guide";

const guide: ToolGuide = {
  slug: "name-picker",
  intro: [
    "A random name picker takes a list of names and selects one or more winners using on-the-fly randomization, so nobody can claim the draw was rigged. This tool is built for anyone who needs a fast, visible way to make a random choice from a group: a random name picker for classroom call-outs, a random winner picker for a giveaway, or a simple random selector for splitting a team into groups. There is no sign-up and no limit on how many names you can add to the list.",
    "It works the same way whether you have five entries or five hundred. Paste one name per line, set how many winners you want to pick at once, and choose whether picked names should be removed from the pool before the next draw. The screen flashes through the list for a moment before locking on a result, which keeps a room's attention during a live drawing and gives everyone time to see the process happen rather than just the final answer.",
  ],
  sections: [
    {
      heading: "Random Name Picker for Classroom: Fair Ways to Call on Students",
      paragraphs: [
        "Cold-calling the same handful of students, or always picking the person sitting up front, is one of the most common complaints students have about classroom participation. A random name picker removes that bias by giving every name on the roster an equal shot each time you press pick. Paste the full class list once at the start of the term and reuse it every day instead of retyping names each morning.",
        "For daily use, turn on \"Remove picked names\" so a student who already answered today is taken out of the pool until you reset the list. This spreads participation across the whole class instead of only the most confident students, and it gives you a fast, defensible answer if a student asks why they were called on twice in the same week.",
      ],
      bullets: [
        "Paste the class roster once and reuse it every session",
        "Enable name removal so recent answers don't repeat",
        "Reset the list at the start of a new day or unit",
        "Use the pick count field to call on several students at once for group work",
      ],
    },
    {
      heading: "How to Pick a Giveaway Winner Fairly (and Prove It)",
      paragraphs: [
        "Running a raffle or social media giveaway invites the question \"was this actually random?\" A visible random winner picker answers that by letting entrants watch the draw happen, rather than trusting a screenshot of a name pulled from a hat off-camera. Paste every eligible entry exactly once, since duplicate entries will skew the odds even though the underlying draw itself is fair.",
        "For giveaways that need backup winners, set the pick count above one so the tool selects a first winner plus one or two alternates in the same draw. If the first winner does not respond within your deadline, you already have a verified alternate instead of running a second, separate draw that some entrants may trust less than the original one.",
      ],
    },
    {
      heading: "Picking Multiple Winners Without Repeats",
      paragraphs: [
        "The pick count field lets you draw more than one name in a single click, which is faster than running the picker repeatedly for a raffle with several prizes. When \"Remove picked names\" is off, each new draw treats the full list as available again, which is the right setting when you want independent draws, such as assigning a different random helper each day from the same class or team roster.",
        "Turn removal on when the same name should never win twice in one event, such as a door-prize raffle with unique prizes for each winner. Picked names collect in a visible list with a clear button, so you can see exactly who has already won and reset the pool cleanly before starting a new round of the same event.",
      ],
    },
    {
      heading: "Random Team Generator and Group Assignment Ideas",
      paragraphs: [
        "Splitting a group into teams by hand tends to reproduce existing friend groups or skill cliques without anyone intending it. Paste every participant's name into the picker and draw them one at a time, assigning each result to a team in turn, to build teams that are genuinely mixed. This works for classroom projects, office team-building days, and casual sports leagues without a dedicated team generator.",
        "For an odd number of participants or uneven team sizes, decide the team sizes before you start drawing so you know when to stop assigning names to a full team. Because the picker outputs one name (or a short list) per draw rather than pre-sorted teams, you are doing the sorting into groups manually as results come in.",
      ],
    },
    {
      heading: "How the Random Selection Actually Works (and Its Limits)",
      paragraphs: [
        "Behind the scenes, the picker shuffles the current pool of names and reveals a flashing sequence before settling on a result, so every name in the pool has an equal chance of being chosen on a given draw. This is a browser-based shuffle, not a cryptographic lottery system, which is more than sufficient for classroom draws, casual raffles, and team splits.",
        "For high-stakes drawings with legal or contractual requirements, such as a sweepstakes with a cash prize, check your local regulations first, since some jurisdictions require a specific audited random-number method or a witnessed draw. This tool is a practical, transparent way to make everyday decisions, not a substitute for compliance software in a regulated giveaway.",
      ],
    },
    {
      heading: "Fairness Perception: Why a Visible Draw Beats a Hidden One",
      paragraphs: [
        "People trust a random result more when they can see it happen than when they're simply told a name was chosen behind the scenes. Running the picker on a shared screen during a live class, a livestream, or a company meeting turns an abstract claim of fairness into something the audience actually watched unfold, which matters more for morale than the technical randomness itself.",
        "This matters especially in workplaces and communities where a previous draw felt unfair, even if it technically wasn't. Rebuilding trust after that kind of complaint is easier with a transparent, on-screen tool than with a private spreadsheet formula nobody in the room can verify, even if the spreadsheet's math was perfectly sound.",
      ],
    },
  ],
  useCases: [
    { title: "Classroom participation", description: "Call on students fairly during discussions, reading turns, or presentations without repeating the same few names every day." },
    { title: "Raffles and giveaways", description: "Draw a winner, plus backup winners, for a social media contest, office raffle, or community event in front of the audience." },
    { title: "Team and group splitting", description: "Assign people to teams, project groups, or seating arrangements without reproducing existing cliques or friend groups." },
    { title: "Chore and task rotation", description: "Decide who takes out the trash, leads the next meeting, or covers a shift by drawing a name instead of arguing about it." },
    { title: "Secret Santa and gift exchanges", description: "Draw names for a gift exchange, then manually re-draw any self-match before sharing results with the group." },
  ],
  mistakes: [
    { title: "Adding duplicate names", description: "Typing the same name twice, even by accident, doubles that person's odds without it being obvious until results look uneven." },
    { title: "Forgetting to enable removal", description: "Leaving \"Remove picked names\" off during a multi-round raffle can let the same person win more than once." },
    { title: "Not resetting between events", description: "Reusing a winners list from a previous drawing without clearing it first can carry old exclusions into a new, unrelated event." },
    { title: "Treating it as a certified lottery", description: "For prize draws with legal requirements, a browser-based picker may not meet the audit standard some contests demand." },
  ],
  tips: [
    "Paste one name per line and check the name count shown below the box before you draw.",
    "Use the pick count field to select several winners in one click instead of repeating single draws.",
    "Turn on name removal for any event where nobody should win twice.",
    "Screen-record or screen-share the draw for giveaways where entrants expect visible proof.",
    "Clear the winners list before starting a new, unrelated drawing.",
  ],
  glossary: [
    { title: "Random selector", description: "Any tool or method that chooses one or more items from a list without a predictable pattern." },
    { title: "Sampling without replacement", description: "A drawing method where each selected name is removed from the pool so it cannot be picked again, used when \"Remove picked names\" is on." },
    { title: "Sampling with replacement", description: "A drawing method where every name stays in the pool after each draw, used when repeat winners are allowed." },
    { title: "Draw", description: "One run of the picker that produces one or more winners from the current pool of names." },
    { title: "Pool", description: "The current set of names available to be picked, which shrinks over time if name removal is turned on." },
  ],
};

export default guide;
