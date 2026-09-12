import type { ToolGuide } from "@/types/guide";

const guide: ToolGuide = {
  slug: "heart-rate-calculator",
  intro: [
    "A heart rate zone calculator turns a single number, your age, into a full set of training targets: your estimated maximum heart rate and five zones ranging from light recovery to maximum effort. This tool uses the classic 220-minus-age formula to estimate max heart rate, then multiplies that number by five percentage ranges to produce BPM (beats per minute) targets for each zone.",
    "It's built for anyone using a heart rate monitor, fitness watch, or chest strap during exercise who wants to know what number on the display actually corresponds to fat-burning effort versus an all-out sprint. Enter your age, and the tool instantly returns your max heart rate along with the BPM range for all five zones, no manual percentage math required.",
    "Every formula here is a population-based estimate, not a lab measurement. This information is for general fitness planning and is not medical advice; anyone with a heart condition, or starting an exercise program after a long break, should check with a doctor before training near the higher zones.",
  ],
  sections: [
    {
      heading: "Max Heart Rate Formulas: 220−Age vs Tanaka vs Karvonen",
      paragraphs: [
        "This calculator uses the 220-minus-age formula (max HR = 220 − age), the most widely known method because it's simple to calculate and has been the default in gyms and fitness guides for decades. A 30-year-old gets an estimated max HR of 190 BPM; a 50-year-old gets 170 BPM. It's a quick estimate, not a measurement of your actual physiological ceiling.",
        "Two other formulas are common in exercise science. The Tanaka formula (208 − 0.7 × age) was developed from a larger, more modern dataset and tends to estimate a slightly higher max HR for older adults than 220-minus-age does. The Karvonen method doesn't estimate max HR directly; instead it factors in resting heart rate to calculate a heart rate reserve, which can produce more personalized zone targets for people who know their resting HR from a fitness tracker.",
        "For a 50-year-old, 220-minus-age gives 170 BPM while Tanaka gives about 173 BPM, a small but real difference that grows at older ages. This tool sticks with 220-minus-age for simplicity and consistency with most consumer fitness equipment; if your fitness watch reports a different max HR, that's likely because it's using Tanaka, Karvonen, or a value derived from an actual field test.",
      ],
      bullets: [
        "220 − age: simplest, most common, used by this calculator",
        "208 − (0.7 × age): Tanaka formula, generally considered more accurate for adults over 40",
        "Karvonen method: uses resting heart rate plus heart rate reserve for a more personalized estimate",
        "None of these replace a supervised VO2 max or graded exercise test for a precise number",
      ],
    },
    {
      heading: "Heart Rate Zones for Fat Burning, Cardio and VO2 Max",
      paragraphs: [
        "This tool divides your max heart rate into five standard zones. Zone 1 (50-60% of max HR) is warm-up and light recovery activity. Zone 2 (60-70%) is the commonly cited 'fat burning zone,' where the body draws a higher percentage of its energy from fat stores, though total calories burned per minute is lower than in harder zones. Zone 3 (70-80%) is aerobic, moderate-to-hard cardio that builds endurance.",
        "Zone 4 (80-90%) is anaerobic training, the intensity range used for interval work that builds speed and power but can't be sustained for long. Zone 5 (90-100%) is maximum effort, appropriate only in short bursts for trained individuals. For a 40-year-old with an estimated max HR of 180 BPM, that works out to Zone 2 at 108-126 BPM and Zone 4 at 144-162 BPM.",
        "Zone 2 gets the most attention because it's the 'fat burning zone,' but it's worth remembering that higher-intensity zones burn more total calories per minute even though a smaller share comes from fat directly; for pure weight loss, total calories burned across a week matters more than which single zone you trained in.",
      ],
      bullets: [
        "Zone 1 (50-60%): warm-up, active recovery",
        "Zone 2 (60-70%): fat-burning zone, sustainable moderate effort",
        "Zone 3 (70-80%): aerobic zone, builds cardio endurance",
        "Zone 4 (80-90%): anaerobic zone, interval and threshold training",
        "Zone 5 (90-100%): maximum effort, short bursts only",
      ],
    },
    {
      heading: "How Accurate Is the 220-Minus-Age Formula?",
      paragraphs: [
        "Research on the 220-minus-age formula has found it can be off by 10 to 20 beats per minute for a meaningful share of individuals, since it was derived by averaging data across a broad population rather than measuring any one person directly. Genetics, fitness level, and certain medications (particularly beta-blockers) can shift an individual's true max HR well away from the age-based estimate in either direction.",
        "In practice, this means the zones from this calculator are a reasonable starting point for someone with no prior data, but athletes who train seriously by heart rate often prefer a field test, like a hard effort during a structured warm-up-and-sprint protocol, or a lab-based VO2 max test to nail down a more precise number.",
      ],
    },
    {
      heading: "Using Heart Rate Zones for Different Training Goals",
      paragraphs: [
        "Someone training for general health and longevity typically spends most workouts in Zones 2 and 3, building an aerobic base without excessive fatigue. Someone training for a specific event, like a 5K or a cycling race, usually mixes in structured Zone 4 intervals once or twice a week alongside easier Zone 2 sessions, following the common 80/20 split where roughly 80% of training time is easy and 20% is hard.",
        "Zone 5 has a narrow, specific purpose: short, high-intensity efforts like hill sprints or the finishing kick of a race. Spending significant time here without a training background raises injury and burnout risk rather than building fitness faster.",
      ],
    },
    {
      heading: "Limitations and When to See a Doctor",
      paragraphs: [
        "This calculator provides a general estimate based on age alone; it does not account for resting heart rate, fitness level, medications, or underlying heart conditions, all of which can shift a person's real max heart rate and safe training zones. The results are informational, not a substitute for a fitness assessment or medical clearance.",
        "Anyone who is new to exercise, returning after a long break, pregnant, over 40 and starting a vigorous program, or managing a heart or blood pressure condition should talk to a doctor before training near Zone 4 or Zone 5, and should stop immediately if they experience chest pain, dizziness, or unusual shortness of breath during exercise.",
      ],
    },
  ],
  useCases: [
    { title: "Setting up a fitness tracker or heart rate monitor", description: "Enter your age to get BPM zone boundaries you can manually input into a Garmin, Apple Watch, or chest strap app." },
    { title: "Planning interval workouts", description: "Use the Zone 4 range to set target BPM for hard intervals during a structured cardio or HIIT session." },
    { title: "Checking whether a workout was actually easy", description: "Compare your average heart rate from a 'recovery run' against Zone 1-2 to confirm it was genuinely low intensity." },
    { title: "Choosing an intensity for steady-state cardio", description: "Target the Zone 2-3 range for a sustainable long run, ride, or swim aimed at building aerobic endurance." },
    { title: "Comparing to a device's built-in estimate", description: "Check the age-based estimate here against what your fitness watch reports to understand why the numbers might differ." },
  ],
  mistakes: [
    { title: "Treating 220-minus-age as an exact measurement", description: "It's a population average that can be off by 10-20 BPM for a given individual; use it as a starting estimate, not a hard ceiling." },
    { title: "Spending too much time in Zone 4-5", description: "Frequent high-intensity training without adequate recovery raises injury and burnout risk rather than accelerating fitness gains." },
    { title: "Chasing Zone 2 exclusively for weight loss", description: "Higher-intensity zones burn more total calories per minute; weekly calorie burn matters more than which single zone is targeted." },
    { title: "Ignoring medication effects on heart rate", description: "Beta-blockers and some other medications lower heart rate response to exercise, making age-based zones inaccurate for that individual." },
    { title: "Skipping a warm-up before higher-zone training", description: "Jumping straight into Zone 4-5 without a gradual warm-up increases cardiovascular strain and injury risk." },
  ],
  tips: [
    "Use this calculator's zones as a starting point, then adjust based on how workouts actually feel using the talk-test (can you speak in full sentences at Zone 2, only short phrases at Zone 4).",
    "Recalculate periodically as you age, since estimated max heart rate decreases over time under the 220-minus-age formula.",
    "If your fitness watch reports a different max heart rate, trust a value from an actual field or lab test over any age-based formula.",
    "Spend most cardio training time in Zones 2-3, reserving Zone 4-5 for structured interval sessions once or twice a week.",
    "Check with a doctor before training in higher zones if you're new to exercise, over 40, or manage a heart-related condition.",
    "Track resting heart rate over time; a rising resting heart rate over several weeks can be an early sign of overtraining or insufficient recovery.",
  ],
  glossary: [
    { title: "Maximum heart rate (max HR)", description: "The highest number of beats per minute your heart can theoretically achieve during maximal exertion, commonly estimated as 220 minus age." },
    { title: "Heart rate zone", description: "A percentage range of your max heart rate associated with a particular training intensity and physiological effect." },
    { title: "Fat-burning zone", description: "Zone 2, roughly 60-70% of max HR, where the body draws a higher percentage of energy from fat, though not necessarily the most total calories per minute." },
    { title: "Heart rate reserve", description: "The difference between your resting heart rate and your maximum heart rate, used in the Karvonen method to calculate more personalized zones." },
    { title: "VO2 max", description: "The maximum rate at which the body can use oxygen during intense exercise, a key measure of aerobic fitness typically found through a lab test." },
    { title: "Tanaka formula", description: "An alternative max heart rate formula (208 − 0.7 × age) derived from a larger modern dataset, often considered more accurate than 220-minus-age for older adults." },
  ],
};

export default guide;
