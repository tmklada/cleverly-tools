import type { ToolGuide } from "@/types/guide";

const guide: ToolGuide = {
  slug: "timer-stopwatch",
  intro: [
    "This free online timer and stopwatch combines two tools in one tab: a countdown timer for counting down from a set amount of time, and a stopwatch with lap tracking for counting up and recording splits. Switch between the two modes with a single click, without needing separate apps for a study timer, a workout timer, and a lap timer.",
    "In timer mode, enter any hours, minutes, and seconds, then start, pause, resume, or reset the countdown, and a short beep sounds when time runs out. In stopwatch mode, start and stop the running clock and tap Lap at any point to record a split without stopping the count, then reset everything back to zero when you're done. Both modes display down to fractions of a second on the stopwatch and to the second on the timer.",
  ],
  sections: [
    {
      heading: "Pomodoro Timer: 25/5 Method Explained",
      paragraphs: [
        "The Pomodoro Technique breaks work into focused 25-minute sessions followed by a 5-minute break, repeating that cycle four times before taking a longer 15-30 minute break. To run this manually with the timer, set the fields to 0 hours, 25 minutes, 0 seconds, hit start, and work until the beep sounds. Then reset the fields to 0 hours, 5 minutes, 0 seconds for the break, and start again.",
        "This tool doesn't automate the switch between work and break intervals for you; there's no preset Pomodoro mode or automatic cycling between the 25-minute and 5-minute blocks, so you'll manually re-enter the time and hit start at each transition. For most people that's a small price for a tool with no sign-up and no app to install, and the manual reset is itself a short, deliberate pause between focus blocks.",
      ],
      bullets: [
        "Work interval: 0h 25m 0s",
        "Short break: 0h 5m 0s",
        "After four work intervals, take a longer 15-30 minute break",
        "Re-enter the next interval's time manually when the beep sounds",
      ],
    },
    {
      heading: "Countdown Timer for Cooking, Studying, and Workouts",
      paragraphs: [
        "For cooking, set hours, minutes, and seconds to match a recipe step, such as 12 minutes for pasta or 45 seconds for a quick sear, and let the beep tell you when to check the stove instead of watching the clock yourself. Because the input fields lock while the timer is running, there's no risk of accidentally changing the time mid-cook; hit Pause first if you need to adjust it.",
        "For studying or any focused work block, the same countdown works for anything from a quick 10-minute review session to a full 90-minute exam simulation. Resume picks up exactly where a paused timer left off rather than restarting from the original time, so stepping away briefly doesn't cost you the progress already made on that interval.",
      ],
    },
    {
      heading: "Stopwatch Lap Times: How to Time Intervals and Splits",
      paragraphs: [
        "Press Start on the stopwatch to begin counting up in hours, minutes, seconds, and hundredths, and press Lap at any point to record the current total elapsed time without pausing the clock. Each lap you record stays visible in a running list below the stopwatch, numbered in the order you tapped it, so you can review an entire session's pace after you finish rather than needing to write times down as you go.",
        "One detail matters for interpreting the list correctly: each recorded lap is the total elapsed time since you pressed Start, not the time since the previous lap. To find how long an individual interval took, such as your second mile split in a run, subtract the previous lap's time from the current one. For a session with only a couple of laps this is quick mental math; for many laps, jotting the times down and subtracting afterward is more reliable than doing it live.",
      ],
      bullets: [
        "Lap times shown are cumulative totals from the start, not individual splits",
        "Subtract one lap from the next to find that interval's actual duration",
        "The lap list scrolls, so a long session with many laps still stays reviewable",
        "Reset clears both the stopwatch and the full lap list together",
      ],
    },
    {
      heading: "Timer vs Stopwatch: Counting Down vs Counting Up",
      paragraphs: [
        "The timer counts down from a fixed amount of time you set in advance and alerts you with a beep at zero, which fits any task with a known target duration: a 20-minute workout block, a 5-minute presentation limit, a 3-minute egg timer. The stopwatch counts up from zero with no end point, which fits anything where the total duration is the thing you're trying to find out, like how long a task actually took or how fast a lap was.",
        "A simple way to decide which mode to use: if you know how long something should take and want a warning when that time is up, use the timer; if you don't know how long something will take and want to measure it after the fact, use the stopwatch. Some activities benefit from both across a single session, such as timing a workout's total length on the stopwatch while using the timer separately for each individual set's rest period.",
      ],
    },
    {
      heading: "Does It Keep Running in the Background? Browser Tab Limits",
      paragraphs: [
        "The stopwatch calculates elapsed time by comparing the current moment to when you pressed Start, so even if your browser slows down its internal updates while the tab is in the background, the displayed time catches up to the correct value as soon as you switch back, rather than losing accuracy. This makes it reliable for switching tabs mid-session on a laptop or desktop.",
        "The countdown timer works a little differently: it counts down one second at a time on an internal clock rather than comparing against a fixed end time, so if a mobile browser aggressively throttles background tabs to save battery, the countdown can run slightly slower than real time while the tab is out of view. For anything where the exact second matters, especially on a phone, keep the timer tab visible and active rather than switching away from it while it counts down.",
      ],
    },
    {
      heading: "Workout Intervals and Study Sessions With Lap Tracking",
      paragraphs: [
        "For interval workouts like running repeats or a timed circuit, start the stopwatch once at the beginning and tap Lap at the end of each repeat or station instead of resetting between them; this keeps the entire session in one continuous list you can review afterward, rather than several disconnected short recordings. Subtracting consecutive lap times afterward reveals each interval's pace, which is often more useful than the total session time alone.",
        "For studying with a technique that tracks total focus time across a day, the stopwatch's running total works alongside the countdown timer's fixed intervals: use the timer for structured blocks like Pomodoro sessions, and use the stopwatch separately if you also want a single running total of hours spent studying across a longer stretch, resetting it only at the start of a new day or project.",
      ],
    },
  ],
  useCases: [
    { title: "Pomodoro-style work sessions", description: "Run manual 25-minute work and 5-minute break intervals using the countdown timer to structure a focus session." },
    { title: "Cooking and recipe steps", description: "Set a precise countdown for a cooking step and get an audible beep instead of watching the clock." },
    { title: "Workout intervals and rest periods", description: "Time work sets with the timer and track total workout duration or lap splits with the stopwatch." },
    { title: "Study sessions and exam practice", description: "Use the countdown to simulate a timed exam or the stopwatch to track total study time in one sitting." },
    { title: "Running and lap-based training", description: "Record lap times during intervals or track repeats, then subtract consecutive laps to find individual split times." },
    { title: "Presentation and speech timing", description: "Countdown to a hard stop for a presentation, or use the stopwatch to rehearse and see how long a talk actually runs." },
  ],
  mistakes: [
    { title: "Assuming lap times are individual splits", description: "Each lap shows the cumulative total since Start, not the time since the previous lap; subtract to get the actual interval." },
    { title: "Expecting automatic Pomodoro cycling", description: "The timer doesn't switch between work and break intervals on its own; each new interval needs to be entered and started manually." },
    { title: "Trusting a backgrounded timer for exact precision", description: "On some mobile browsers, a countdown running in a background tab can drift slightly slower than real time." },
    { title: "Trying to edit the timer while it's running", description: "The hour, minute, and second fields lock while the timer is active; pause it first to change the time." },
  ],
  tips: [
    "Use the timer for anything with a known target duration and the stopwatch for anything you're measuring after the fact.",
    "Subtract consecutive lap times to find each interval's actual duration rather than reading lap numbers as splits.",
    "Pause before adjusting the timer's hours, minutes, or seconds, since the fields lock while it's running.",
    "Keep the browser tab active and visible during a precise countdown, especially on a phone.",
    "Reset the stopwatch and its lap list together at the start of a new, unrelated session to avoid mixing data.",
  ],
  glossary: [
    { title: "Split time", description: "The duration of one individual interval, found by subtracting one lap's cumulative time from the next lap's cumulative time." },
    { title: "Lap", description: "A recorded checkpoint on the stopwatch showing the total elapsed time at the moment you pressed the Lap button." },
    { title: "Pomodoro Technique", description: "A time-management method that alternates focused work intervals, typically 25 minutes, with short breaks, typically 5 minutes." },
    { title: "Tab throttling", description: "A browser's practice of slowing down background tabs to save battery or processing power, which can affect timers that aren't based on wall-clock comparisons." },
    { title: "Countdown timer", description: "A clock that starts from a set duration and counts down to zero, typically alerting the user when time is up." },
  ],
};

export default guide;
