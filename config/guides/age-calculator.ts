import type { ToolGuide } from "@/types/guide";

const guide: ToolGuide = {
  slug: "age-calculator",
  intro: [
    "An age calculator answers the everyday question of how old you are with more precision than counting on your fingers: it takes your date of birth and returns your exact age in years, months, days, and even hours or minutes. It's the fastest way to run a date of birth calculator without pulling out a calendar and manually tracking leap years.",
    "This exact age calculator is handy for anyone filling out an official form, planning around a birthday, or simply curious how many days old they are. It's also useful as a birthday calculator when you want to know exactly how many days until your next birthday, or as a way to check someone else's age from their date of birth for a school, medical, or legal purpose.",
    "Doing this by hand is easy to get slightly wrong, because months have different lengths and leap years add an extra day every four years. An online tool applies the same date-math rules every time, so you get a reliable exact age calculation in one click instead of double-checking a calendar.",
  ],
  sections: [
    {
      heading: "How to Calculate Your Exact Age Manually (Formula + Example)",
      paragraphs: [
        "The basic formula for exact age is simple in theory: subtract your birth year from the current year. The catch is that you also need to check whether your birthday has already happened this calendar year. If it has, keep the year count as is; if it hasn't, subtract one more year. The same logic applies to the month and day components, which is where manual calculations usually go wrong.",
        "For example, someone born on March 3, 1995, calculating their age on September 12, 2026, starts with 2026 minus 1995, which equals 31 years. Since March 3 already passed this year, the 31 stays as is. Counting from March 3 to September 12 adds 6 months and 9 days, so the exact age is 31 years, 6 months, and 9 days, a level of detail a plain year-only calculation misses entirely.",
      ],
      bullets: [
        "Step 1: Subtract birth year from current year",
        "Step 2: Subtract 1 if this year's birthday hasn't occurred yet",
        "Step 3: Count the remaining months and days from the last birthday to today",
        "A date of birth calculator automates all three steps and accounts for different month lengths",
      ],
    },
    {
      heading: "How Many Days Until Your Next Birthday",
      paragraphs: [
        "To find the days until your next birthday, take your birth month and day and pair them with the current year. If that date has already passed, use the same month and day in the following year instead. Then count the number of days between today and that target date. This is the same countdown a birthday calculator runs in the background every time you check it.",
        "If your birthday is March 3 and today is September 12, 2026, your birthday already happened this year, so the next one falls on March 3, 2027. Counting from September 12, 2026 to March 3, 2027 comes to 172 days. An age calculator handles this instantly, including the different lengths of each month, so you don't have to count on a calendar by hand.",
      ],
    },
    {
      heading: "Leap Years and Age Calculation: What to Know",
      paragraphs: [
        "Leap years add an extra day, February 29, roughly every four years, and they're the main reason manual age calculations drift off by a day here and there. Any calculation that spans a leap year needs to count 366 days for that year instead of 365, and if you're counting months and days rather than just full years, you need to know whether the current stretch includes a February in a leap year.",
        "People born on February 29 present a special case, since their exact birth date only exists once every four years. Most calendars and forms treat their legal birthday as either February 28 or March 1 in common years, so someone born February 29, 2000 turns 26 in 2026, marked on February 28 or March 1 depending on local convention, even though their true calendar anniversary hasn't technically occurred.",
      ],
    },
    {
      heading: "Age in Different Units: Years, Months, Weeks, Hours, and Minutes",
      paragraphs: [
        "Age isn't only measured in years. A date of birth calculator can also express your age in total months, weeks, days, hours, or even minutes, which is useful for infants, medical forms, or just curiosity. Roughly speaking, one year equals 12 months, about 52 weeks, 365.25 days on average, 8,766 hours, and just under 526,000 minutes, though the exact figures shift slightly depending on how many leap years fall in the range.",
        "A person who is exactly 31 years old has lived through roughly 11,323 days, about 271,752 hours, and more than 16 million minutes. These larger numbers are mostly for milestone tracking, since some people mark their 10,000th day of life, but hospitals also use age in days or weeks for newborns, because a baby's age changes meaningfully from one week to the next in that first year.",
      ],
    },
    {
      heading: "Common Uses for an Exact Age Calculator",
      paragraphs: [
        "An exact age calculator comes up in more situations than casual curiosity. Legal age thresholds for voting, driving, drinking, or signing contracts depend on your precise date of birth, and government forms often ask for age as of a specific date rather than today. Immigration applications, background checks, and legal documents frequently require this exact, dated calculation rather than a rounded age in years.",
        "Medical and school settings rely on it too: pediatric medication dosages are often based on age in months for young children, and school district cutoff dates determine which grade a child enters based on their exact birth date. Retirement planning also depends on precise age, since pension and benefit eligibility is frequently tied to a specific birthday rather than just a birth year.",
      ],
    },
  ],
  useCases: [
    { title: "Checking Legal Age Requirements", description: "Confirm your exact age as of a specific date for voting, driving, alcohol purchase, or contract signing rules that use precise cutoffs." },
    { title: "Filling Out Official Forms", description: "Get an exact age in years, months, and days for immigration, insurance, or government paperwork that requires more than a rounded figure." },
    { title: "Planning a Birthday Countdown", description: "See exactly how many days remain until your next birthday to plan a party, trip, or milestone celebration in advance." },
    { title: "Tracking a Baby's Age in Weeks", description: "Calculate a newborn's age in days or weeks for pediatric appointments, since early development is measured in short intervals." },
    { title: "Comparing Ages Between Two People", description: "Enter two birth dates to see the exact age gap in years and months between siblings, partners, or coworkers." },
  ],
  mistakes: [
    { title: "Forgetting to adjust for an unpassed birthday", description: "If this year's birthday hasn't happened yet, you need to subtract one extra year from a simple year-to-year subtraction." },
    { title: "Ignoring leap years in manual counts", description: "Skipping the extra day in a leap year throws off day-based and hour-based age calculations by at least 24 hours." },
    { title: "Confusing calendar age with a legal cutoff date", description: "School enrollment and eligibility rules often use age as of a fixed date, not today, which changes the result." },
    { title: "Assuming every month has 30 days", description: "Manually counting months and days without accounting for 28, 29, 30, and 31-day months leads to small but real errors." },
  ],
  tips: [
    "Double-check the target date field if you need your age as of a specific past or future date, not just today.",
    "For February 29 birthdays, confirm which convention, February 28 or March 1, the form or law you're dealing with uses in common years.",
    "Use the months-and-days breakdown, not just full years, when filling out medical or legal forms that ask for precise age.",
    "Save the result if you track multiple family members' ages or birthdays regularly, so you don't have to recalculate each time.",
    "For newborns, check age in weeks rather than months during the first months, since pediatric guidance is often week-based.",
  ],
  glossary: [
    { title: "Chronological Age", description: "A person's exact age calculated from their birth date and a specific reference date, usually today." },
    { title: "Leap Year", description: "A calendar year with 366 days instead of 365, created by adding February 29 roughly every four years." },
    { title: "Age as of Date", description: "An age calculated relative to a specified date, such as an application deadline, rather than the current date." },
    { title: "Birthday Countdown", description: "The number of days remaining between today and the next occurrence of a person's birth date." },
    { title: "Date of Birth (DOB)", description: "The calendar date on which a person was born, used as the starting point for every age calculation." },
  ],
};

export default guide;
