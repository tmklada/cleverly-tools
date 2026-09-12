import type { ToolGuide } from "@/types/guide";

const guide: ToolGuide = {
  slug: "cron-expression-builder",
  intro: [
    "Cron syntax is compact by design — five fields packed into one line like 0 9 * * 1-5 — which makes it fast to write once you know it and completely opaque if you don't. This cron expression builder lets you set each field individually with plain text inputs, shows a live human-readable description of what you've built, and lists sample upcoming run times so you can sanity-check the schedule before you deploy it anywhere.",
    "Nine common presets cover the schedules most people actually need — every 5 minutes, every weekday at 8 AM, the first of the month, and similar patterns — so you can start from something close and adjust individual fields rather than building an expression from a blank line. The description panel updates instantly as you type, translating symbols like */5 or 1-5 into a plain-English sentence.",
    "Everything runs client-side in your browser using plain JavaScript, with no server involved and no cron daemon actually running anywhere — this is a syntax builder and explainer, not a live scheduler. Once you've got the expression you want, copy it into whatever actually executes your job: a crontab file, a CI pipeline's schedule trigger, or a cloud scheduler.",
  ],
  sections: [
    {
      heading: "Cron Syntax Explained: The Five Fields and Their Ranges",
      paragraphs: [
        "A cron expression is five space-separated fields, always in the same order: minute (0–59), hour (0–23, 24-hour clock), day of month (1–31), month (1–12), and day of week (0–6, where 0 is Sunday). The expression 30 14 * * * means minute 30, hour 14, every day of the month, every month, every day of the week — in other words, 2:30 PM daily.",
        "Each field accepts an asterisk to mean \"any value,\" a specific number, or the special characters covered below for steps, ranges, and lists. There's no sixth field for seconds in standard cron — if you need sub-minute precision, cron itself isn't the right tool and you'll need a different scheduler that supports it.",
      ],
    },
    {
      heading: "Common Cron Examples: Every 5 Minutes, Every Weekday at 9 AM, First of the Month",
      paragraphs: [
        "Every 5 minutes is */5 * * * * — the step value in the minute field alone is enough, since every other field stays wide open with an asterisk. Every weekday at 8 AM is 0 8 * * 1-5 — minute 0, hour 8, any day of month, any month, weekdays 1 through 5 (Monday through Friday, since 0 is Sunday and 6 is Saturday).",
        "The first day of every month at midnight is 0 0 1 * * — the day-of-month field is locked to 1 while everything else stays open. A single weekly run, like every Monday at 9 AM, is 0 9 * * 1. All four of these are available as one-click presets in the builder above, and each one also fills in the individual minute/hour/day/month/weekday fields so you can see exactly which piece controls which part of the schedule.",
      ],
      bullets: [
        "*/5 * * * * — every 5 minutes",
        "0 8 * * 1-5 — every weekday at 8:00 AM",
        "0 0 1 * * — midnight on the 1st of every month",
        "0 9 * * 1 — every Monday at 9:00 AM",
        "0 0 * * 0 — midnight every Sunday",
      ],
    },
    {
      heading: "Cron Special Characters: Asterisk, Comma, Hyphen, Slash",
      paragraphs: [
        "The asterisk (*) means \"every value is fine\" for that field. A hyphen defines an inclusive range, like 1-5 for Monday through Friday in the weekday field, or 9-17 for the hours 9 AM through 5 PM. A slash after an asterisk or a range defines a step value — */15 in the minute field means every 15 minutes, and 0-30/10 would mean every 10 minutes between :00 and :30.",
        "A comma lists out specific, non-consecutive values in one field, such as 1,15 in the day-of-month field to run on both the 1st and the 15th. Standard cron parsers support all four of these, but this builder's plain-English description only translates asterisks, step values, and hyphen ranges into a sentence — a comma-separated list is shown as the raw field value rather than spelled out, so double-check a list-based field by reading the numbers directly rather than relying on the description text for that field.",
      ],
    },
    {
      heading: "Reading the Next Run Times — and Where the Preview Falls Short",
      paragraphs: [
        "The \"Next 5 Executions\" panel steps forward minute by minute from right now and lists the next five timestamps that match your minute and hour fields, which is a fast way to confirm that a time-of-day schedule like \"every day at 2:30 PM\" is actually landing on the time you intended.",
        "That preview only checks the minute and hour fields, though — it does not filter by day of month, month, or day of week. If you've built a schedule restricted to weekdays only, or the first of the month only, the listed \"next runs\" will still show every day at that time, not just the days your expression actually restricts it to. Treat the preview as a check on the time-of-day portion of your schedule, and verify day/month/weekday restrictions by reading the expression itself or testing it in your actual scheduler.",
      ],
    },
    {
      heading: "Day-of-Month vs Day-of-Week: The Two Fields That Confuse Everyone",
      paragraphs: [
        "In most cron implementations, when both the day-of-month and day-of-week fields are restricted to something other than an asterisk, the two conditions are combined with OR, not AND — the job runs if either condition matches, not only when both do. An expression like 0 0 15 * 1 doesn't mean \"the 15th, but only if it's a Monday\"; it means \"midnight on the 15th, and also midnight every Monday.\"",
        "The clean way to avoid this surprise is to leave one of the two fields as an asterisk whenever you're scheduling by the other — use day-of-month alone for \"the 15th of every month\" and day-of-week alone for \"every Monday,\" rather than trying to combine both into one field pair.",
      ],
    },
    {
      heading: "Where to Actually Deploy a Cron Expression: Crontab, CI/CD, and Task Schedulers",
      paragraphs: [
        "A standard crontab entry (edited with crontab -e on Linux or macOS) pairs the five-field expression with the actual command to run, and typically executes in the system's local timezone unless configured otherwise. GitHub Actions accepts the same five-field syntax under a workflow's schedule: cron: key, but always runs in UTC and only guarantees roughly five-minute scheduling precision, not exact-second timing.",
        "Cloud schedulers like AWS EventBridge Scheduler and Google Cloud Scheduler also accept standard cron syntax (sometimes alongside their own alternative rate-expression format), generally defaulting to UTC as well unless you explicitly set a timezone. Whichever platform you're deploying to, it's worth confirming its timezone default before trusting a schedule you built assuming local time.",
      ],
    },
  ],
  useCases: [
    { title: "Scheduling a nightly backup script", description: "Build a once-a-day cron expression for a database or file backup job and confirm the exact run time before deploying it." },
    { title: "Setting up CI pipeline schedules", description: "Generate the schedule field for a GitHub Actions or GitLab CI job that runs tests every weekday morning." },
    { title: "Configuring a Kubernetes CronJob", description: "Build and verify the schedule string a CronJob manifest needs without memorizing field order from scratch." },
    { title: "Validating a teammate's cron string", description: "Paste each field of an expression someone else wrote into the builder to confirm what it actually does before approving a deploy." },
    { title: "Building recurring jobs in no-code tools", description: "Generate a correct cron expression for automation platforms like Make or Zapier that accept raw cron syntax for custom schedules." },
  ],
  mistakes: [
    { title: "Expecting day-of-month and day-of-week to combine with AND", description: "Most cron implementations OR these two fields together when both are restricted, which produces more runs than intended." },
    { title: "Trusting the next-run preview for day- or weekday-restricted schedules", description: "The preview only matches on minute and hour, so it will list runs on days your expression actually excludes." },
    { title: "Treating cron as capable of second-level precision", description: "The smallest unit cron supports is one minute — there is no seconds field in standard five-field cron syntax." },
    { title: "Mixing up the minute and hour field order", description: "Cron always lists minute before hour, so 30 14 * * * is 2:30 PM, not 14 minutes past 2 AM." },
    { title: "Leaving a field blank instead of using an asterisk", description: "An empty field is invalid cron syntax — every field needs a value, even if that value is just *." },
  ],
  tips: [
    "Leave day-of-month or day-of-week as an asterisk when scheduling by the other field, to avoid OR-logic surprises.",
    "Confirm your deployment platform's default timezone (many run in UTC) before trusting a schedule built around local time.",
    "Use a comma-separated list for irregular but specific dates, and read the raw field values rather than the description for those.",
    "Double-check weekday- or month-restricted schedules against your actual scheduler, not just this tool's next-run preview.",
    "Copy the generated expression directly instead of retyping it, to avoid an accidental stray space breaking the field count.",
    "Start from the closest preset and adjust one field at a time rather than writing a full expression from scratch.",
  ],
  glossary: [
    { title: "Cron expression", description: "A five-field string (minute, hour, day of month, month, day of week) that defines a recurring schedule for a job." },
    { title: "Crontab", description: "The file or interface (edited with crontab -e) where scheduled cron jobs and their expressions are stored on a Unix-like system." },
    { title: "Step value", description: "A slash-prefixed number, like */5, that tells cron to trigger at that interval within a field's range instead of every single value." },
    { title: "Wildcard", description: "The asterisk character in a cron field, meaning every possible value for that field is acceptable." },
    { title: "OR logic (day fields)", description: "The behavior in most cron implementations where a restricted day-of-month and day-of-week both trigger the job independently, rather than requiring both to match." },
  ],
};

export default guide;
