import type { ToolGuide } from "@/types/guide";

const guide: ToolGuide = {
  slug: "water-intake-calculator",
  intro: [
    "A water intake calculator estimates how many liters, cups, or ounces of water you should drink each day based on your body weight, activity level, and climate. It's a more personalized alternative to the generic \"drink eight glasses a day\" advice, which was never based on individual body size and doesn't account for someone training in the gym or living somewhere hot and humid.",
    "This daily water intake calculator is useful for anyone trying to build a consistent hydration habit: athletes tracking fluid needs around workouts, people adjusting for a hot climate or a physically demanding job, or anyone who just wants a personalized number instead of guessing. It converts your weight into a baseline fluid target, then adds extra water for activity and heat, giving a total you can translate directly into bottles or glasses through the day.",
    "Estimating hydration needs by hand means applying a weight-based baseline formula and then layering on activity and climate adjustments correctly, which most online guides skip or oversimplify. This calculator does the full calculation in one step and converts the result into liters, ounces, and standard cup sizes so you have a number that's easy to plan around.",
  ],
  sections: [
    {
      heading: "How Much Water Should You Drink a Day by Weight and Activity",
      paragraphs: [
        "This calculator starts with a baseline of 35 milliliters of water per kilogram of body weight, a commonly cited hydration guideline that scales fluid needs to body size rather than using one fixed number for everyone. A 60 kg person's baseline works out to 2,100 ml (about 2.1 liters), while an 90 kg person's baseline is 3,150 ml (about 3.15 liters), reflecting the fact that a larger body simply needs more water to function.",
        "On top of that baseline, the calculator adds a fixed amount for activity level: 0 ml extra for sedentary, 350 ml for moderate activity, and 700 ml for an active lifestyle, to account for water lost through sweat during exercise. For example, a 70 kg moderately active person gets a baseline of 2,450 ml plus 350 ml for activity, totaling 2,800 ml (2.8 liters) per day, before any climate adjustment is applied.",
        "These additions are deliberately simple rather than tied to exact exercise duration or sweat-rate testing, since most people don't have access to sweat-rate measurement. They're a reasonable estimate for typical daily activity and workouts, not a precise figure for elite endurance athletes, who often need more detailed, sport-specific hydration planning.",
      ],
      bullets: [
        "Baseline: 35 ml × body weight in kg",
        "Sedentary: +0 ml",
        "Moderate activity: +350 ml",
        "Active: +700 ml",
        "Total = baseline + activity adjustment + climate adjustment",
      ],
    },
    {
      heading: "Climate and Hot Weather: Why Your Water Needs Change With the Season",
      paragraphs: [
        "Heat increases fluid loss through sweat even without exercise, which is why this calculator includes a separate climate adjustment on top of activity level: 0 ml extra for a normal climate, 500 ml for hot conditions, and 1,000 ml for very hot conditions. Someone living in a temperate climate and someone living through a summer heatwave with the same weight and activity level can have meaningfully different real-world hydration needs.",
        "For example, a 70 kg moderately active person needs about 2,800 ml per day in a normal climate, but that rises to 3,300 ml in hot weather and 3,800 ml in very hot conditions. Travelers moving to a hotter destination, outdoor workers during summer, and anyone experiencing an extended heatwave should lean toward the higher climate setting rather than assuming their usual baseline still applies.",
      ],
    },
    {
      heading: "Does Coffee, Tea, and Other Beverages Count Toward Your Water Goal?",
      paragraphs: [
        "Nearly all beverages contribute to your total daily fluid intake, including coffee, tea, milk, and juice, not just plain water. The old idea that caffeinated drinks cause net dehydration has largely been overturned by more recent research: while caffeine does have a mild diuretic effect, the fluid volume in a cup of coffee or tea outweighs that effect for regular drinkers, so it still counts as a meaningful contribution toward your total.",
        "That said, water remains the best default choice because it has no added sugar, calories, or caffeine that could interfere with sleep or blood sugar goals. A practical approach is to treat this calculator's result as your total fluid target for the day, aim to get most of it from plain water, and count coffee, tea, and other drinks as a bonus rather than trying to hit the full number from water alone.",
      ],
    },
    {
      heading: "Signs of Proper Hydration: Urine Color, Thirst, and Other Indicators",
      paragraphs: [
        "Beyond hitting a calculated number, your body gives fairly reliable real-time feedback on hydration status. Urine color is the simplest indicator: pale yellow, similar to lemonade, generally signals good hydration, while dark yellow or amber suggests you should drink more soon. Very clear, colorless urine can actually indicate overhydration, which is uncommon but possible with excessive water intake in a short period.",
        "Thirst itself is also a reasonably reliable signal for most healthy adults, despite the common claim that \"if you're thirsty, you're already dehydrated.\" Other signs of inadequate hydration include headaches, fatigue, and dry mouth, while signs of proper hydration include steady energy levels and normal urination frequency (roughly every 3-4 hours while awake). Use these signals alongside your calculated target rather than relying on the number alone.",
      ],
      bullets: [
        "Pale yellow urine generally indicates good hydration",
        "Dark yellow or amber urine suggests you should drink more",
        "Urinating roughly every 3-4 hours while awake is a normal pattern",
        "Persistent thirst, headache, or fatigue can signal inadequate fluid intake",
      ],
    },
    {
      heading: "Who Needs More or Less Water Than the Standard Formula Suggests",
      paragraphs: [
        "This calculator's formula is designed for generally healthy adults and doesn't account for every situation that changes fluid needs. Pregnant and breastfeeding women typically need more fluid than the standard calculation, since breastfeeding alone can increase daily fluid needs by roughly 700 ml. People with certain medical conditions, including kidney disease, heart failure, or conditions requiring fluid restriction, may need less water than this calculator suggests and should follow their doctor's specific guidance instead.",
        "High-altitude environments, illness involving fever or vomiting, and certain medications (particularly diuretics) can also shift fluid needs in either direction. This calculator's results are informational and meant as a general starting point, not medical advice, and anyone with a health condition affecting fluid balance should get personalized guidance from a healthcare provider rather than relying on a generic formula.",
      ],
    },
  ],
  useCases: [
    { title: "Building a Daily Hydration Habit", description: "Get a specific liter or cup target you can track through the day instead of vaguely trying to 'drink more water.'" },
    { title: "Adjusting for a Workout Routine", description: "Recalculate at a higher activity level on training days to account for extra fluid lost through sweat during exercise." },
    { title: "Planning for Hot Weather or Travel", description: "Switch the climate setting before a summer trip or heatwave to see how much your fluid needs increase in the heat." },
    { title: "Supporting a Weight Loss or Fitness Goal", description: "Proper hydration supports digestion and energy levels during a calorie deficit; use this alongside a calorie calculator for a fuller daily plan." },
    { title: "Checking Water Needs for a Physically Demanding Job", description: "Outdoor or manual labor workers can use the active setting to estimate a more realistic daily fluid target than a generic guideline." },
  ],
  mistakes: [
    { title: "Using a flat 8-glasses rule for everyone", description: "The classic 8-glasses guideline ignores body weight entirely, so it underestimates needs for larger people and overestimates for smaller ones." },
    { title: "Forgetting to adjust for hot weather", description: "Sticking with a normal-climate estimate during a heatwave or a hot vacation can leave you meaningfully under-hydrated." },
    { title: "Assuming caffeinated drinks don't count at all", description: "Coffee and tea still contribute fluid to your daily total; they just shouldn't be your only source of hydration." },
    { title: "Ignoring medical fluid restrictions", description: "People with kidney or heart conditions may be advised to drink less than a standard calculator suggests and should follow their doctor's guidance instead." },
    { title: "Chugging large amounts at once instead of spacing intake", description: "Spreading fluid intake across the day is generally better tolerated and more effective than drinking the full target in one or two sittings." },
  ],
  tips: [
    "Spread your daily water target across the day rather than trying to drink it all at once.",
    "Check your urine color as a quick daily gut-check alongside your calculated target.",
    "Increase your activity or climate setting on hot days or heavy workout days rather than using one fixed number year-round.",
    "Keep a reusable water bottle with marked measurements to make hitting a liter-based goal easier to track.",
    "Count coffee, tea, and other beverages toward your total, but keep plain water as your primary source.",
    "If you have a kidney, heart, or other condition affecting fluid balance, follow your doctor's specific guidance over this general calculator.",
  ],
  glossary: [
    { title: "Baseline Hydration Need", description: "The minimum daily water requirement estimated from body weight alone, before activity or climate adjustments are added." },
    { title: "Activity Adjustment", description: "Extra fluid added to the baseline to account for water lost through sweat during exercise or physical activity." },
    { title: "Climate Adjustment", description: "Extra fluid added to account for increased sweat loss in hot or very hot environmental conditions." },
    { title: "Fluid Intake", description: "The total volume of liquid consumed in a day from all sources, including water, other beverages, and water content in food." },
    { title: "Diuretic Effect", description: "A mild fluid-loss effect associated with substances like caffeine, generally outweighed by the fluid volume of the beverage itself for regular drinkers." },
    { title: "Overhydration", description: "A less common condition caused by drinking excessive water in a short period, which can dilute the body's sodium levels." },
  ],
};

export default guide;
