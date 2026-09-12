import type { ToolGuide } from "@/types/guide";

const guide: ToolGuide = {
  slug: "ideal-weight-calculator",
  intro: [
    "An ideal weight calculator estimates a healthy target weight based on your height and gender, using formulas originally developed for medicine dosing and clinical nutrition. Instead of relying on a single number, this tool runs four well-known formulas, Devine, Robinson, Miller, and Hamwi, side by side so you can see a realistic range rather than one rigid figure that may not fit your body.",
    "This healthy weight calculator is useful for anyone setting a weight goal after a doctor's visit, comparing their current weight against a standard reference range, or just curious how their numbers stack up against decades-old clinical formulas that are still used today. It works for both metric and imperial units and adjusts automatically for gender, since the formulas use different constants for men and women.",
    "All four formulas share the same basic structure: a base weight for 5 feet of height, plus a fixed amount added for every inch above that. Calculating this by hand means picking the right formula, converting your height into inches correctly, and applying the right constants for your gender, any of which introduces room for error. An online calculator applies all four formulas at once and averages them for a quick, comparable target.",
  ],
  sections: [
    {
      heading: "Ideal Weight Formulas Compared: Devine, Robinson, Miller, and Hamwi",
      paragraphs: [
        "All four formulas calculate ideal body weight from height alone (in inches over 5 feet), plus a gender-specific base and increment. For men: Devine = 50 + 2.3 × (inches over 60), Robinson = 52 + 1.9 × (inches over 60), Miller = 56.2 + 1.41 × (inches over 60), and Hamwi = 48 + 2.7 × (inches over 60). For women, the constants shift lower: Devine = 45.5 + 2.3 × (inches over 60), Robinson = 49 + 1.7 × (inches over 60), Miller = 53.1 + 1.36 × (inches over 60), and Hamwi = 45.5 + 2.2 × (inches over 60).",
        "Take a man who is 5'10\" (70 inches), 10 inches over the 60-inch baseline. Devine gives 50 + 2.3×10 = 73 kg, Robinson gives 52 + 1.9×10 = 71 kg, Miller gives 56.2 + 1.41×10 = 70.3 kg, and Hamwi gives 48 + 2.7×10 = 75 kg. Averaging the four lands around 72.3 kg (about 159 lb), which is the kind of range this calculator shows instead of picking just one formula as the definitive answer.",
        "The Devine formula, created in 1974, was originally designed to help pharmacists dose medications correctly, not to set fitness goals, but it became the most widely cited ideal-weight formula in clinical settings. Robinson (1983) and Miller (1983) are later refinements that adjusted the constants based on updated population data, while Hamwi (1964) is the oldest of the four and tends to produce the widest range between short and tall individuals.",
      ],
      bullets: [
        "Devine (male): 50 + 2.3 × inches over 60",
        "Robinson (male): 52 + 1.9 × inches over 60",
        "Miller (male): 56.2 + 1.41 × inches over 60",
        "Hamwi (male): 48 + 2.7 × inches over 60",
        "Female formulas use lower base weights and smaller per-inch increments",
      ],
    },
    {
      heading: "Ideal Weight vs Healthy BMI Range: What's the Difference",
      paragraphs: [
        "Ideal weight formulas and BMI both use height to estimate a healthy weight, but they work differently. BMI defines a wide range (a BMI of 18.5 to 24.9) that covers many possible weights for a given height, while ideal weight formulas like Devine or Robinson output one specific number for that same height. Neither approach measures body composition, so both can be misleading for people with more or less muscle mass than average.",
        "In practice, the two methods often agree reasonably well for average body types but diverge for very tall or very short individuals, since BMI scales weight by height squared while ideal weight formulas scale it linearly per inch. If your ideal weight result and your healthy BMI range disagree by more than a few kilograms, it's a signal to treat both as rough guidelines rather than a strict target, and to consider a body composition measurement for a fuller picture.",
      ],
    },
    {
      heading: "Does Body Frame Size Change Your Ideal Weight?",
      paragraphs: [
        "None of the four formulas used here directly measure bone or frame size, but frame size is a well-documented reason why two people of the same height can have very different healthy weights. People with a larger frame, generally judged by wrist circumference relative to height, carry more bone and connective tissue and tend to sit above the calculated average without being overweight in any meaningful sense.",
        "If you know you have a small or large frame, treat this calculator's average as the middle of a broader window: a small-framed person might reasonably sit 5-10% below the average result, and a large-framed person 5-10% above it, without either being outside a healthy range. This is one more reason the tool shows a spread across four formulas rather than a single hard number.",
      ],
    },
    {
      heading: "Why These Formulas Were Originally Created for Medicine, Not Fitness",
      paragraphs: [
        "It's worth understanding where these formulas came from, because it explains their limitations. Devine's formula was published specifically to help clinicians calculate drug dosages that scale with body weight, since dosing an overweight or underweight patient by their actual weight can lead to over- or under-dosing for certain medications. Robinson and Miller refined the same idea using different patient population data, and Hamwi's version predates all of them, originally intended for dietitians estimating caloric needs.",
        "None of the four were designed as fitness or aesthetic targets, and none account for athletic muscle mass, pregnancy, growth in children, or age-related changes in body composition. Someone who lifts weights seriously will often weigh meaningfully more than their ideal weight result while being in excellent health, which is the same blind spot BMI has. This calculator's results are informational only and should not replace a conversation with a doctor or dietitian about a personal weight goal.",
      ],
    },
    {
      heading: "How to Use Your Ideal Weight Result Alongside Other Health Metrics",
      paragraphs: [
        "The most reliable way to use an ideal weight result is as one input among several, not a standalone verdict. Pair it with your BMI, and if you have access to one, a body fat percentage measurement, since a person can be within their ideal weight range and still carry an unhealthy amount of body fat, or be above their ideal weight range while being lean and muscular.",
        "If your current weight sits close to the average of the four formulas (within roughly 2-3 kg or 5-7 lb), that's generally a reassuring sign. If it's meaningfully higher or lower, use that as a prompt to look at the fuller picture, frame size, muscle mass, activity level, and how you actually feel, rather than treating the gap as an urgent problem to fix immediately.",
      ],
    },
  ],
  useCases: [
    { title: "Setting a Post-Diet Target Weight", description: "Use the averaged result as a reference point when deciding how much further to go after losing weight, rather than picking an arbitrary number." },
    { title: "Comparing Against a Doctor's Recommendation", description: "Check how a doctor's suggested target compares to the range from four standard clinical formulas before your next appointment." },
    { title: "Estimating Medication-Related Dosing Weight", description: "Some medication guidance references ideal body weight rather than actual weight; this calculator shows the same Devine-based figure clinicians use." },
    { title: "Tracking Progress Toward a Long-Term Goal", description: "Recalculate periodically during a fitness program to see how your current weight compares to the ideal-weight average over time." },
    { title: "Understanding Frame-Size Differences", description: "Compare your result against your known frame size to judge whether your actual healthy weight likely sits above or below the calculated average." },
  ],
  mistakes: [
    { title: "Treating the result as a strict target", description: "Ideal weight formulas produce an estimate for an average body type, not a mandatory number everyone should hit exactly." },
    { title: "Ignoring frame size and muscle mass", description: "None of the four formulas measure bone structure or muscle, so athletic or large-framed people will naturally sit above the calculated figure." },
    { title: "Using imperial height with metric weight settings", description: "Mixing units between height and weight inputs produces a result that doesn't match either measurement system correctly." },
    { title: "Comparing children's results to adult formulas", description: "All four formulas were developed for adults; children and teens need pediatric growth charts instead." },
    { title: "Relying on one formula instead of the range", description: "Picking just Devine or just Hamwi in isolation gives a narrower, less representative picture than averaging all four." },
  ],
  tips: [
    "Look at the full range across all four formulas rather than fixating on a single number.",
    "Factor in your known body frame size when deciding where in the range your personal target should sit.",
    "Cross-check your ideal weight result against your BMI category for a more complete picture.",
    "Remember these formulas don't account for muscle mass, so athletes should weigh this result alongside body fat percentage.",
    "Recalculate after significant height changes are ruled out, since these formulas depend entirely on height and gender.",
    "Discuss any specific weight goal with a doctor or dietitian rather than treating this calculator as medical guidance.",
  ],
  glossary: [
    { title: "Devine Formula", description: "A 1974 ideal body weight formula originally created for medication dosing, now the most widely cited clinical ideal-weight equation." },
    { title: "Robinson Formula", description: "A 1983 refinement of ideal body weight calculation using updated population data and slightly different per-inch increments than Devine." },
    { title: "Miller Formula", description: "A 1983 ideal body weight formula with a lower per-inch increment, generally producing the lowest estimates of the four." },
    { title: "Hamwi Formula", description: "The oldest of the four formulas (1964), originally developed for dietitians estimating caloric needs, tends to produce the widest range across heights." },
    { title: "Body Frame Size", description: "A classification of skeletal size (small, medium, large), typically estimated from wrist circumference, that affects healthy weight independent of height." },
    { title: "Ideal Body Weight (IBW)", description: "A calculated reference weight based on height and gender, historically used in clinical settings for medication dosing and nutrition planning." },
  ],
};

export default guide;
