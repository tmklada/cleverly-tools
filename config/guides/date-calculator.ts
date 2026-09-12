import type { ToolGuide } from "@/types/guide";

const guide: ToolGuide = {
  slug: "date-calculator",
  intro: [
    "A date calculator answers three questions people run into constantly: how much time sits between two dates, what date falls a certain number of days from today, and how many days remain until a future deadline. Whether you're figuring out a project timeline, checking how old a contract is, or counting down to a wedding, doing this by hand means tracking leap years and different month lengths, which is exactly the kind of detail that's easy to get wrong.",
    "This date duration calculator is built for anyone who needs an exact number rather than a rough guess: HR staff calculating tenure or notice periods, project managers tracking deadlines, event planners counting down to a date, and anyone settling a dispute over how many days have actually passed since something happened. It handles three common tasks in one tool, finding the difference between two dates, adding or subtracting time from a date, and counting days until or since a target date.",
    "The underlying calculation isn't just simple subtraction. Months have different lengths, leap years add an extra day roughly every four years, and a difference expressed as years, months, and days requires borrowing across month and year boundaries the same way you'd borrow when subtracting numbers by hand. This calculator handles all of that automatically and shows the result several ways, in days, weeks, and the years/months/days breakdown, so you can use whichever unit fits the situation.",
  ],
  sections: [
    {
      heading: "How to Calculate Days Between Two Dates (Inclusive vs Exclusive)",
      paragraphs: [
        "The most common date calculation is finding the number of days between a start and end date. This tool calculates the exclusive difference, meaning if you enter January 1 and January 10, it returns 9 days, the number of days that pass between the two dates, not counting both endpoints. This matches how most contracts, deadlines, and countdowns are meant to be read.",
        "Some situations call for an inclusive count instead, where both the start and end date are counted as full days. This comes up when counting a stay (checking in on day 1 and checking out on day 10 of a 10-night booking, versus a 9-day gap) or a rental period. To get the inclusive count from this tool's result, simply add 1 to the total days shown. Knowing which count a form or contract expects avoids off-by-one errors that can affect billing or eligibility.",
        "For example, calculating the gap between March 1, 2026 and April 15, 2026 gives 45 total days, roughly 6 weeks and 3 days, or expressed as a calendar breakdown, 1 month and 15 days. All three of these numbers describe the same span; which one is useful depends on whether you're filling out a form that wants days, or explaining a timeline in plain language.",
      ],
      bullets: [
        "Exclusive count: days that pass strictly between the two dates",
        "Inclusive count: exclusive count + 1, counts both start and end days",
        "The tool also converts the total into weeks and into an hours figure",
        "The years/months/days breakdown accounts for different month lengths automatically",
      ],
    },
    {
      heading: "Business Days vs Calendar Days: When Each One Matters",
      paragraphs: [
        "Calendar days count every day on the calendar, weekends included, and are the right measure for things like age, contract duration, or how long ago an event happened. Business days count only Monday through Friday, excluding weekends, and are the standard for things like shipping estimates, payment processing timelines, and most legal or administrative deadlines that specify \"business days\" or \"working days.\"",
        "This calculator includes an optional business days count alongside the standard calendar-day breakdown when calculating the difference between two dates. It counts weekdays only, meaning it excludes Saturdays and Sundays but does not exclude public holidays, since holiday calendars vary by country and even by organization. If a deadline specifically excludes public holidays, subtract those days manually from the business-day total after checking the relevant holiday calendar.",
        "As a concrete example, the calendar span from Monday, June 1 to Friday, June 12 is 11 calendar days but only 9 business days once the two weekends in between are excluded. That gap widens further whenever a public holiday falls inside the range, which is why business-day estimates from shipping carriers or banks sometimes run a day or two longer than expected.",
      ],
    },
    {
      heading: "How to Add or Subtract Days, Months, and Years From a Date",
      paragraphs: [
        "Beyond finding the gap between two known dates, this tool can also start from one date and add or subtract a number of years, months, and days to find a resulting date, useful for calculating a due date, a lease end date, or a follow-up appointment. Enter a base date and the years, months, and days to add, and the tool returns the resulting calendar date, including the day of the week.",
        "To subtract instead of add, enter negative numbers in the years, months, or days fields. For example, to find the date 90 days before a deadline, enter the deadline as the base date and -90 in the days field. This is often more reliable than counting backward on a physical calendar, especially across a month or year boundary.",
        "One nuance worth knowing: adding months to a date near the end of a month can shift the day if the target month is shorter. Adding 1 month to January 31 lands on either March 2 or March 3 in most date libraries, because February doesn't have 31 days, so the extra days roll over into March. This is standard JavaScript date-arithmetic behavior and matches how most calendar software handles the same edge case.",
      ],
    },
    {
      heading: "Counting Days Until a Deadline, Event, or Anniversary",
      paragraphs: [
        "The \"days until\" mode compares a target date against today and shows a plain countdown: a positive number of days remaining if the date is in the future, or the number of days that have already passed if the date is in the past. This is the fastest way to answer \"how many days until my flight\" or \"how long ago was my last dentist appointment\" without doing any manual subtraction.",
        "This mode is especially useful for recurring reminders like anniversaries and renewal dates, since re-entering the same target date each year (or letting it stay in the past) instantly shows how far away the next occurrence is, or how long it's been since the last one, without needing to know today's exact date offhand.",
      ],
    },
    {
      heading: "How Leap Years Affect Date Calculations",
      paragraphs: [
        "A leap year adds February 29, which happens in years divisible by 4, except century years not divisible by 400, so 2024 and 2028 are leap years but 2100 will not be. Any date calculation that spans a leap year, like a full year-long lease or a project running from one February into the next, needs to account for this extra day or the total will be off by one.",
        "Because this tool uses standard JavaScript Date arithmetic under the hood, leap years are handled automatically and correctly, they're baked into how the calendar itself works, not something calculated as a special case. This means a \"years between\" calculation that spans multiple leap years, say 2020 to 2030, correctly reflects the actual number of days in that span rather than assuming every year has exactly 365 days.",
      ],
    },
  ],
  useCases: [
    { title: "Calculating a Project Deadline", description: "Add a number of business or calendar days to a project start date to find a realistic delivery date, or check how many days remain before a deadline arrives." },
    { title: "Tracking Employment Tenure", description: "Calculate the exact years, months, and days an employee has worked, useful for anniversaries, vesting schedules, or notice period calculations." },
    { title: "Planning Events and Weddings", description: "Count down the days remaining until a wedding, birthday, or other event to help with timeline planning and vendor bookings." },
    { title: "Checking Visa or Stay Durations", description: "Calculate the number of days between an entry and exit date to verify a stay falls within a visa-free limit or visa validity period." },
    { title: "Setting Contract or Lease Dates", description: "Add a lease term in months or years to a start date to find the exact expiration date, including the day of the week." },
    { title: "Calculating Age or Time Since an Event", description: "Find the exact years, months, and days since a birth date, purchase date, or any past milestone." },
  ],
  mistakes: [
    { title: "Confusing inclusive and exclusive day counts", description: "Forgetting whether a form wants the exclusive gap or the inclusive count (gap + 1) leads to being off by exactly one day, which matters for billing and eligibility." },
    { title: "Treating business days as holiday-free automatically", description: "This tool's business-day count excludes weekends but not public holidays, so deadlines that also exclude holidays need manual adjustment." },
    { title: "Assuming every year has exactly 365 days", description: "Manually estimating a multi-year date range by multiplying years by 365 ignores leap years and will drift by roughly a day per leap year in the range." },
    { title: "Not accounting for month-end rollover when adding months", description: "Adding a month to a date near month-end (like January 31) can land in the following month if the target month is shorter, which is expected date-arithmetic behavior, not an error." },
    { title: "Mixing up date formats", description: "Entering dates in the wrong day/month order can silently produce a valid but incorrect date, so always confirm the date picker shows the date you intended." },
  ],
  tips: [
    "Check whether inclusive or exclusive counting applies before submitting a day count on an official form.",
    "Use negative numbers in the add/subtract mode to count backward from a date instead of manually counting days on a calendar.",
    "Turn on the business days option when the calculation is for shipping, payments, or a deadline defined in working days.",
    "Remember to manually subtract public holidays from a business-day count if your deadline specifically excludes them.",
    "For recurring anniversaries, re-enter the same date each year in the days-until mode to see the current countdown or elapsed time.",
    "When a date lands near a month boundary, double-check the resulting date and day of the week rather than assuming a round number of months landed cleanly.",
  ],
  glossary: [
    { title: "Inclusive Date Range", description: "A date span that counts both the start and end date as full days, one more than the exclusive gap between them." },
    { title: "Exclusive Date Range", description: "A date span that counts only the days strictly between the start and end date, not including either endpoint." },
    { title: "Business Day", description: "A weekday, Monday through Friday, typically used for shipping, banking, and administrative deadlines; this tool's count excludes weekends but not public holidays." },
    { title: "Leap Year", description: "A calendar year with an extra day, February 29, occurring in years divisible by 4 except century years not divisible by 400." },
    { title: "Date Arithmetic", description: "Adding or subtracting units of time (days, months, years) from a date to calculate another date, accounting for varying month lengths and leap years." },
  ],
};

export default guide;
