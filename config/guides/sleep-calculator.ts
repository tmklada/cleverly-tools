import type { ToolGuide } from "@/types/guide";

const guide: ToolGuide = {
  slug: "sleep-calculator",
  intro: [
    "A sleep calculator works backward or forward from a single time you already know, either when you need to wake up or when you plan to go to bed, and returns several options that line up with the end of a complete 90-minute sleep cycle. Instead of chasing a round number of hours, it aims for a wake-up moment that lands between cycles rather than in the middle of one, which is the main reason two people who both sleep 7 hours can wake up feeling completely different.",
    "This tool adds about 14 minutes to every calculation to account for sleep latency, the average time it takes a healthy adult to fall asleep after getting into bed. Enter a wake-up time and it lists bedtimes for 1 through 6 full cycles; enter a bedtime and it lists wake-up times the same way, with 5 and 6 cycles marked as the recommended range for most adults.",
    "The results are informational and based on population averages for sleep-cycle length and fall-asleep time, not a medical assessment. Anyone dealing with chronic insomnia, sleep apnea symptoms, or persistent daytime fatigue should talk to a doctor rather than relying on a timing calculator alone.",
  ],
  sections: [
    {
      heading: "Sleep Cycles Explained: Why 90 Minutes Matters",
      paragraphs: [
        "A sleep cycle is a full loop through the stages of sleep: light sleep, progressively deeper non-REM sleep, and then a stretch of REM (rapid eye movement) sleep where most dreaming happens. Research on sleep architecture puts the average adult cycle at approximately 90 minutes, though individual cycles can run anywhere from about 70 to 120 minutes depending on age, stress, and sleep quality that night.",
        "Near the end of each cycle, the body passes through a brief window of lighter sleep before either waking naturally or rolling into the next cycle. An alarm that goes off during this light window produces a much easier wake-up than one that interrupts deep non-REM sleep, which is the physiological basis for timing an alarm to a cycle boundary instead of a flat number of hours.",
        "This is also why 8 hours of sleep can feel worse than 7.5: 8 hours lands in the middle of a sleep cycle for someone on a 90-minute rhythm, while 7.5 hours (five full cycles) ends right at a boundary. The calculator's cycle-based options are built around this idea rather than a single fixed sleep duration.",
      ],
      bullets: [
        "One sleep cycle: light sleep → deep non-REM sleep → REM sleep, about 90 minutes total",
        "Cycles repeat 4 to 6 times per night in a typical adult sleep period",
        "Waking near a cycle boundary reduces sleep inertia (that heavy, groggy feeling)",
        "Cycle length varies night to night by roughly 15-20 minutes, so this is an estimate, not a fixed clock",
      ],
    },
    {
      heading: "What Time Should I Go to Bed to Wake Up at 6 AM?",
      paragraphs: [
        "Working backward from a 6:00 AM wake-up, the calculator subtracts 14 minutes for falling asleep, then subtracts multiples of 90 minutes for each full cycle. Six cycles (9 hours of sleep) points to a bedtime of about 8:46 PM; five cycles (7.5 hours) points to about 10:16 PM; four cycles (6 hours) points to about 11:46 PM. The tool marks the 5- and 6-cycle options as recommended since most adults need 7 to 9 hours per night.",
        "If 8:46 PM feels unrealistic for your schedule, the 5-cycle option at 10:16 PM is the more practical everyday target for a 6:00 AM wake-up, still landing on a full cycle boundary and covering the low end of the recommended range. The 4-cycle result is shown mainly as a reference point for a short night, not a recommendation.",
        "The same backward math applies to any wake-up time: pick your alarm time, enter it, and read down the list rather than trying to count 90-minute blocks by hand, which gets error-prone once you cross midnight.",
      ],
    },
    {
      heading: "What Time Should I Wake Up If I Go to Bed Now?",
      paragraphs: [
        "Run in the other direction, the calculator adds 14 minutes to your bedtime for falling asleep, then adds multiples of 90 minutes for each cycle option. Going to bed at 11:00 PM, the tool lists wake-up times for 1 cycle (12:44 AM) up through 6 cycles (6:44 AM), again highlighting the 5- and 6-cycle results as the range most adults should target.",
        "This direction is the more common late-night use case: it's already close to bedtime and rather than guessing at a wake-up time, you check which nearby alarm setting lands on a full cycle. For an 11:00 PM bedtime, both 5:14 AM (5 cycles) and 6:44 AM (6 cycles) are shown so you can pick whichever fits how early you need to be up.",
      ],
      bullets: [
        "1 cycle ≈ 1.5 hours of sleep, useful mainly for a short nap-length reference",
        "4 cycles ≈ 6 hours, below the typical recommended range for adults",
        "5-6 cycles ≈ 7.5-9 hours, the range this tool marks as recommended",
      ],
    },
    {
      heading: "How Much Sleep Do Adults Actually Need?",
      paragraphs: [
        "General sleep guidelines for adults call for 7 to 9 hours per night, which maps to 5 or 6 complete 90-minute cycles. Consistently sleeping fewer than 5 cycles is linked to impaired concentration, slower reaction time, and greater long-term health risk, while regularly sleeping more than 6 cycles isn't harmful for most people but doesn't provide extra benefit and can sometimes signal an underlying sleep or health issue.",
        "Teenagers typically need more, in the 8-10 hour range, and older adults sometimes settle into a shorter but more consolidated 7-8 hour pattern; this calculator uses the general adult cycle length and doesn't adjust for age group. It also doesn't account for sleep debt: someone who's been shortchanging sleep for a week may need extra recovery sleep beyond what a single night's cycle calculation suggests.",
      ],
    },
    {
      heading: "Common Sleep Timing Mistakes",
      paragraphs: [
        "The most common mistake is fixating on a round number like exactly 8 hours rather than a cycle count, which can land an alarm in the middle of deep sleep even though the total duration looks fine on paper. A close second is ignoring the 14-minute fall-asleep buffer entirely and setting a bedtime for the exact moment you want to be asleep, which then pushes every subsequent cycle boundary later than planned.",
        "Inconsistent bedtimes across the week are another factor this calculator can't fix: shifting your sleep schedule by more than an hour between weekdays and weekends (sometimes called social jet lag) disrupts the body's internal clock regardless of how well any single night's cycles line up.",
      ],
    },
  ],
  useCases: [
    { title: "Setting a wake-up alarm", description: "Enter your bedtime to find the wake-up times that land on a full sleep cycle instead of guessing at a round number of hours." },
    { title: "Planning bedtime around a fixed morning commitment", description: "Enter a required wake-up time, like 6:00 AM for work, and see which bedtime gets you the recommended 5-6 cycles." },
    { title: "Adjusting for jet lag or a schedule change", description: "Recalculate bedtime or wake-up options when traveling across time zones or shifting to an earlier or later routine." },
    { title: "Comparing a short night against a full night", description: "See exactly how many cycles a 6-hour night covers versus an 8-hour night before deciding to stay up later." },
    { title: "Building a consistent sleep routine", description: "Use the same cycle-based bedtime each night to make it easier to establish a regular sleep schedule." },
  ],
  mistakes: [
    { title: "Targeting a round number of hours instead of a cycle count", description: "8 hours often lands mid-cycle for a 90-minute sleeper, while 7.5 or 9 hours lands on a cycle boundary and can produce an easier wake-up." },
    { title: "Ignoring the time it takes to actually fall asleep", description: "Setting a bedtime for the exact moment you want to be unconscious skips the roughly 14-minute buffer this calculator builds in." },
    { title: "Assuming cycle length is identical every night", description: "The 90-minute average is just that, an average; treat the calculator's times as a target window, not an exact science." },
    { title: "Keeping wildly different sleep times on weekends", description: "Even a perfectly timed weekday schedule gets undone by a multi-hour shift on weekends, which disrupts the body's internal clock." },
    { title: "Using this tool as a substitute for medical advice", description: "Persistent fatigue, snoring, or trouble falling or staying asleep are signs to see a doctor, not just adjust your alarm time." },
  ],
  tips: [
    "Aim for the 5- or 6-cycle options this calculator highlights as recommended for most adults.",
    "Keep your bedtime and wake-up time roughly consistent, including on weekends, to support your body's internal clock.",
    "Avoid caffeine within about 6 hours of your planned bedtime, since it can extend how long it actually takes you to fall asleep.",
    "If an alarm at a calculated cycle boundary still feels hard to wake up to, try the next cycle option up or down.",
    "Treat this tool's results as a starting point, not medical advice, and see a doctor for ongoing sleep problems.",
    "Dim lights and put screens away 30-60 minutes before your calculated bedtime to help you fall asleep closer to the 14-minute estimate.",
  ],
  glossary: [
    { title: "Sleep cycle", description: "One full loop through light sleep, deep sleep, and REM sleep, lasting approximately 90 minutes in most adults." },
    { title: "REM sleep", description: "Rapid eye movement sleep, a stage associated with dreaming and memory consolidation that occurs near the end of each sleep cycle." },
    { title: "Sleep latency", description: "The amount of time it takes to fall asleep after getting into bed; this calculator estimates it at 14 minutes." },
    { title: "Sleep inertia", description: "The groggy, disoriented feeling that follows waking during deep sleep rather than at a lighter, cycle-boundary stage." },
    { title: "Sleep debt", description: "The cumulative shortfall between the sleep you've gotten and the sleep you need, which can build up over several short nights." },
    { title: "Social jet lag", description: "The mismatch between your sleep schedule on workdays versus free days, which disrupts your body's internal clock similar to crossing time zones." },
  ],
};

export default guide;
