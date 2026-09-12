import type { ToolGuide } from "@/types/guide";

const guide: ToolGuide = {
  slug: "time-zone-converter",
  intro: [
    "This free time zone converter solves the everyday headache of figuring out what time it is somewhere else, without opening a dozen browser tabs or doing mental math with UTC offsets. Pick a time and a source zone, choose one or more destination zones, and see every equivalent time laid out side by side, updated instantly as you change any input.",
    "The tool covers 19 major zones and cities spanning every populated region: North America (New York, Los Angeles, Chicago, Toronto), Europe (London, Paris, Berlin, Moscow), the Middle East (Dubai, Riyadh, Tel Aviv), Asia-Pacific (Mumbai, Singapore, Tokyo, Seoul, Beijing, Sydney), and South America (São Paulo), plus UTC itself as a neutral reference point. A separate grid below the converter shows the live current time in all 19 zones at once, updating every second, so you can glance at it the way you'd glance at a wall of office clocks.",
    "Switching between 12-hour and 24-hour display is a single checkbox, useful since some zones (and some people) default to one format over the other. Whether you're scheduling a call with a remote teammate, checking if it's a reasonable hour to text a friend abroad, or just curious what time it is in Tokyo right now, this covers it without needing a dedicated calendar app.",
  ],
  sections: [
    {
      heading: "UTC vs GMT: What's the Difference?",
      paragraphs: [
        "UTC (Coordinated Universal Time) and GMT (Greenwich Mean Time) share the same numerical value most of the year and are often used interchangeably in casual conversation, but they're not technically the same thing. GMT is a specific time zone, historically tied to the prime meridian in Greenwich, London, while UTC is a global time standard maintained using atomic clocks that every time zone in the world is defined as an offset from, such as UTC+5:30 or UTC-8.",
        "The practical difference shows up around daylight saving time: London itself shifts to British Summer Time (UTC+1) for part of the year, so \"GMT\" as a zone label can drift from the literal London clock, while UTC never shifts for daylight saving at all, since it's a fixed reference rather than a local civil time. This tool lists UTC as its own selectable zone precisely because it's the one constant everyone can convert against, regardless of what daylight saving changes are happening anywhere else.",
      ],
    },
    {
      heading: "Scheduling Meetings Across Time Zones (Best Overlap Hours)",
      paragraphs: [
        "The hardest part of scheduling across time zones isn't the math, it's finding a window where nobody has to join at an unreasonable hour. A common approach is to check the current-time grid for every city involved, find the zone with the earliest reasonable start (usually the one furthest west or with the most people online early), and see what that same moment looks like everywhere else before proposing a time.",
        "For a common example, a working morning in New York (9 AM to 11 AM Eastern) typically lands in the early-to-mid afternoon in London and Paris, the evening in Dubai and Moscow, and very late at night or already the next day in Singapore, Tokyo, and Sydney. That's why teams spanning the US and Asia-Pacific often settle for a narrow overlap window in the very early US morning or the US teammate's late evening, since there's rarely a slot that's comfortable for everyone at once across that many hours of separation.",
      ],
      bullets: [
        "Toggle on the destination cities relevant to your meeting before entering a time",
        "Check the current-time grid first to get a feel for how far apart everyone actually is",
        "US-to-Asia scheduling usually means someone takes an early morning or late evening slot",
        "US-to-Europe scheduling has a much wider comfortable overlap, often late US morning through early US afternoon",
      ],
    },
    {
      heading: "Daylight Saving Time and Why Some Zones Shift Twice a Year",
      paragraphs: [
        "Not every zone observes daylight saving time, and the ones that do don't all switch on the same dates. The United States and Canada shift in early March and early November, the European Union shifts in late March and late October, and countries like Japan, China, and most of the Middle East don't observe daylight saving at all, staying on the same offset year-round. This is exactly why a gap that's four hours apart in January can become three or five hours apart in July, depending on which side of the pair actually observes the change.",
        "Because this converter always calculates using today's real date and each zone's official rules, the displayed times already reflect whichever side of the daylight saving switch the world is currently on; there's no separate date field to preview a specific future date, so a conversion checked in January versus one checked in July for the same two cities can show a different offset between them, which is expected and correct rather than a bug.",
      ],
    },
    {
      heading: "Time Zone Abbreviations Explained (EST, PST, IST, GST and More)",
      paragraphs: [
        "Time zone abbreviations are one of the most confusing parts of scheduling internationally, partly because the same three letters can mean different things in different places. IST, for example, refers to India Standard Time (UTC+5:30) in Mumbai, but it separately refers to Israel Standard Time (UTC+2) in Tel Aviv, a completely different offset. This tool sidesteps that ambiguity by labeling each entry with both a city name and its common abbreviation, like \"Mumbai (IST)\" and \"Tel Aviv (IST)\" listed as distinct, unambiguous options.",
        "A few common ones worth knowing: EST/EDT covers US Eastern time, PST/PDT covers US Pacific time, GST covers Gulf Standard Time used in Dubai (UTC+4, no daylight saving), and CST is genuinely ambiguous on its own since it can mean US Central Standard Time, China Standard Time, or Cuba Standard Time depending on context. When in doubt, referencing the city rather than the abbreviation avoids the mix-up entirely.",
      ],
    },
    {
      heading: "Remote Team Scheduling Across the US, Europe, and Asia",
      paragraphs: [
        "Distributed teams spanning three or more regions usually settle into one of two patterns: a rotating meeting time that shifts who has to join early or late each week, or a fixed \"core hours\" window that a majority of the team can hit even if it's inconvenient for one region. Selecting your team's key cities in the destination list and checking the current-time grid regularly helps make that trade-off visible instead of guessing at it.",
        "It also helps for smaller day-to-day coordination: knowing that a Berlin-based teammate's workday is already ending when a San Francisco-based teammate's is just starting explains a lot about response-time gaps that might otherwise look like someone being slow to reply, when it's really just the clock.",
      ],
    },
    {
      heading: "Common Time Zone Conversion Mistakes",
      paragraphs: [
        "The most common mistake is assuming a time zone gap stays fixed year-round; as covered above, daylight saving changes on different dates in different countries mean the gap between two specific cities can shift by an hour for a few weeks each spring and fall, even if neither city itself changes its own clock during that window. Another frequent mix-up is treating an ambiguous abbreviation like CST as if it only ever means one thing, when it depends entirely on which country is using it.",
        "It's also easy to forget that \"tomorrow\" and \"yesterday\" are relative to each zone: a meeting at 9 PM Tokyo time can land on the previous calendar day in New York, which trips people up when they're coordinating around a specific date rather than just a time. Double-checking the date shown for each destination, not just the time, avoids scheduling something a full day off from what was intended.",
      ],
    },
  ],
  useCases: [
    { title: "Scheduling international meetings", description: "Find what a proposed meeting time looks like across every city your team or clients are in before sending the invite." },
    { title: "Checking if it's a good time to call", description: "Confirm a friend or family member abroad is awake before dialing, based on their local time." },
    { title: "Travel planning", description: "See what time it'll be at your destination when you land, to plan check-in, jet lag adjustment, or your first day's schedule." },
    { title: "Coordinating remote work", description: "Understand overlapping work hours with colleagues or clients in different regions before agreeing on deadlines or calls." },
    { title: "Following global events live", description: "Convert a live event's start time (a launch, a match, a stream) from its home zone into your own local time." },
  ],
  mistakes: [
    { title: "Assuming the gap between two zones never changes", description: "Daylight saving time starts and ends on different dates in different countries, so the offset between two specific cities can shift by an hour for part of the year." },
    { title: "Treating CST or IST as unambiguous", description: "Some abbreviations mean different things in different countries; checking the city name avoids the confusion." },
    { title: "Ignoring the date change", description: "A time near midnight in one zone can fall on the previous or next calendar day elsewhere, which matters for scheduling around a specific date." },
    { title: "Expecting a custom date picker", description: "Conversions are always based on today's date and today's daylight saving rules; there's no separate field to preview a different date." },
  ],
  tips: [
    "Reference the current-time grid first to get a quick feel for how far apart two zones actually are right now.",
    "Use city names rather than abbreviations when communicating a time to avoid CST- or IST-style ambiguity.",
    "Double-check the date shown next to each converted time, not just the hour, when scheduling something specific.",
    "Remember conversions reflect today's daylight saving rules, which can shift by an hour at different points in the year.",
    "Toggle 24-hour format on if you're coordinating with a region where that's the standard, to avoid AM/PM mix-ups.",
  ],
  glossary: [
    { title: "UTC (Coordinated Universal Time)", description: "The global time standard that every time zone is defined as a fixed or seasonal offset from, unaffected by daylight saving." },
    { title: "Daylight saving time (DST)", description: "The practice of shifting clocks forward for part of the year to extend evening daylight, observed by some countries and not others." },
    { title: "UTC offset", description: "The number of hours (and sometimes minutes) a time zone differs from UTC, such as UTC+5:30 for India Standard Time." },
    { title: "Core hours", description: "A shared block of time a distributed team agrees everyone should be available for, even if it falls outside normal hours for some members." },
    { title: "IANA time zone", description: "A standardized time zone identifier like \"America/New_York\" or \"Asia/Tokyo\" that encodes both the offset and the local daylight saving rules." },
  ],
};

export default guide;
