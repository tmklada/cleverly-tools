import type { ToolGuide } from "@/types/guide";

const guide: ToolGuide = {
  slug: "calorie-calculator",
  intro: [
    "A calorie calculator estimates how many calories your body burns in a day and tells you how many to eat depending on whether your goal is to lose weight, maintain it, or build muscle. It starts by calculating your BMR (Basal Metabolic Rate), the energy your body needs just to keep your heart beating and lungs breathing at rest, then multiplies that number by an activity factor to get your TDEE (Total Daily Energy Expenditure), the calories you burn including movement and exercise.",
    "This daily calorie calculator is useful for anyone starting a diet, tracking macros for the first time, or trying to understand why a generic \"2,000 calories a day\" guideline doesn't fit their situation. Because it factors in your age, gender, height, weight, and activity level, the result is a personalized starting point rather than a one-size-fits-all number pulled from a nutrition label.",
    "Calculating BMR and TDEE by hand means applying the Mifflin-St Jeor equation correctly, converting pounds to kilograms or inches to centimeters without a mistake, and then picking the right activity multiplier from a table, any of which is easy to fumble. An online calorie intake calculator applies the formula in one step, handles unit conversion automatically, and shows your maintenance, deficit, and surplus numbers side by side.",
  ],
  sections: [
    {
      heading: "How Many Calories Should I Eat to Lose Weight? (TDEE Method)",
      paragraphs: [
        "Weight loss comes down to eating fewer calories than your body burns, and TDEE is the number that tells you where that burn line sits. Once you know your TDEE, a calorie deficit of about 500 calories per day is the standard target for losing roughly 0.5 kg (1 lb) per week, since one pound of body fat represents approximately 3,500 stored calories. A larger deficit speeds up short-term loss but increases the risk of muscle loss and rebound hunger, which is why most dietitians avoid pushing much past 500–750 calories per day.",
        "For example, someone with a TDEE of 2,400 calories aiming to lose weight would target roughly 1,900 calories per day. This calculator shows that lose-weight number automatically alongside your maintenance calories, so you don't have to do the subtraction yourself or guess at how big a deficit is reasonable for your situation.",
        "Weight gain works the same way in reverse: adding roughly 500 calories above TDEE supports about 0.5 kg of gain per week, useful for people trying to build muscle who need a caloric surplus alongside resistance training. This tool shows that gain figure too, so you can see both directions from the same baseline.",
      ],
      bullets: [
        "Calorie deficit for ~0.5 kg (1 lb) loss/week: TDEE − 500",
        "Calorie surplus for ~0.5 kg (1 lb) gain/week: TDEE + 500",
        "1 lb of body fat ≈ 3,500 stored calories",
        "Deficits beyond 750–1,000 calories/day raise the risk of muscle loss and are not recommended without medical supervision",
      ],
    },
    {
      heading: "Mifflin-St Jeor vs Harris-Benedict: Which BMR Formula Is More Accurate",
      paragraphs: [
        "This calculator uses the Mifflin-St Jeor equation, published in 1990 and now considered the most accurate BMR formula for most adults, especially compared to the older Harris-Benedict equation from 1919 (revised in 1984). For men, Mifflin-St Jeor is BMR = 10 × weight(kg) + 6.25 × height(cm) − 5 × age + 5. For women, it's BMR = 10 × weight(kg) + 6.25 × height(cm) − 5 × age − 161. The only difference between the two is that final constant, 5 for men and −161 for women, which accounts for average differences in body composition.",
        "Harris-Benedict tends to overestimate BMR by about 5% compared to Mifflin-St Jeor in modern studies, likely because average body compositions have shifted since 1919. For a 35-year-old woman weighing 65 kg at 165 cm, Mifflin-St Jeor gives a BMR of about 1,364 calories, while Harris-Benedict lands closer to 1,430. That gap compounds across weeks of dieting, which is why this calculator uses the more accurate formula.",
      ],
    },
    {
      heading: "Understanding Your Activity Multiplier",
      paragraphs: [
        "TDEE is BMR multiplied by an activity factor that estimates how much extra energy your daily movement and exercise burn on top of resting metabolism. This calculator uses five standard levels: sedentary (little to no exercise, factor 1.2), lightly active (light exercise 1-3 days a week, factor 1.375), moderately active (moderate exercise 3-5 days a week, factor 1.55), very active (hard exercise 6-7 days a week, factor 1.725), and extra active (physical job plus training, factor 1.9).",
        "Picking the wrong activity level is one of the most common reasons people don't see the results they expect from a calorie target. Someone with a desk job who exercises twice a week is lightly active, not moderately active, even if two workouts feels like a lot personally. Overestimating activity level inflates your TDEE and, without meaning to, leads to eating in a surplus while thinking you're in a deficit.",
      ],
      bullets: [
        "Sedentary: little or no exercise (×1.2)",
        "Lightly active: light exercise 1–3 days/week (×1.375)",
        "Moderately active: moderate exercise 3–5 days/week (×1.55)",
        "Very active: hard exercise 6–7 days/week (×1.725)",
        "Extra active: physical job plus regular training (×1.9)",
      ],
    },
    {
      heading: "Macronutrient Split: How Protein, Carbs, and Fat Are Calculated",
      paragraphs: [
        "Beyond total calories, this calculator suggests a macronutrient breakdown so you know roughly how to split your intake between protein, carbohydrates, and fat. Protein is set at 2 grams per kilogram of body weight, a level supported by research on preserving muscle during a calorie deficit and supporting muscle growth during a surplus. Carbohydrates are set at 45% of total calories and fat at 30%, with protein filling the remainder, a balanced split suited to general health rather than a specific sport or medical diet.",
        "For someone at a 2,000-calorie target weighing 70 kg, that works out to about 140 g of protein (560 calories), 225 g of carbohydrates (900 calories), and 67 g of fat (600 calories), which together land close to the full calorie target once rounding is accounted for. These are reasonable defaults, not fixed rules: athletes, people on ketogenic or low-carb diets, and those with specific medical conditions often need a different split, ideally set with a dietitian.",
      ],
    },
    {
      heading: "Limitations of Calorie Calculators: Why the Number Is a Starting Point",
      paragraphs: [
        "Every BMR and TDEE formula is a population-based estimate, built from studying groups of people and finding an average relationship between age, weight, height, and metabolism. Individual metabolic rates can vary from the formula's prediction by 10% or more due to genetics, muscle mass, hormone levels, and other factors a simple calculator can't measure. That means your real TDEE could be a few hundred calories higher or lower than what this tool reports.",
        "The practical fix is to treat the calculated number as a starting point: eat at the suggested target for two to three weeks, track your actual weight change, and adjust by 100-200 calories if the scale isn't moving as predicted. This calculator's results are informational, not a substitute for guidance from a doctor or registered dietitian, especially for anyone with a medical condition or an eating disorder history.",
      ],
    },
  ],
  useCases: [
    { title: "Starting a Weight Loss Plan", description: "Get a personalized deficit target instead of guessing at a round number like 1,500 calories that may not match your actual metabolism." },
    { title: "Setting Up Macro Tracking", description: "Use the suggested protein, carb, and fat breakdown as your starting point in a food-logging app like MyFitnessPal or Cronometer." },
    { title: "Planning a Muscle-Building Phase", description: "Check your surplus target and protein needs before starting a bulking phase alongside a resistance training program." },
    { title: "Adjusting Intake After a Plateau", description: "Recalculate your TDEE after losing weight, since a lower body weight burns fewer calories and your old target may now be too high." },
    { title: "Comparing Activity Levels", description: "Re-run the calculator at a higher activity level to see how much extra you could eat if you added more exercise to your week." },
  ],
  mistakes: [
    { title: "Overestimating activity level", description: "Rounding up to 'very active' when you exercise a couple of times a week inflates TDEE and can stall weight loss without an obvious cause." },
    { title: "Cutting calories too aggressively", description: "A deficit larger than 750–1,000 calories per day increases muscle loss risk and often isn't sustainable long term." },
    { title: "Not recalculating after weight changes", description: "TDEE drops as body weight drops, so a calorie target that worked at a higher weight can stall progress if it's never updated." },
    { title: "Ignoring protein intake while cutting calories", description: "Low protein during a deficit increases the share of weight lost that comes from muscle rather than fat." },
    { title: "Treating the result as exact rather than a starting estimate", description: "BMR formulas are population averages; actual results should be adjusted based on real-world weight tracking over a few weeks." },
  ],
  tips: [
    "Track your weight for two to three weeks at your calculated calorie target before deciding whether to adjust it.",
    "Prioritize hitting your protein target even on days you go over your total calorie goal.",
    "Recalculate your TDEE every 5–10 lb of weight change, since a lighter or heavier body burns a different number of calories.",
    "Be honest about your activity level; most people overestimate how active their week actually is.",
    "Pair a moderate 500-calorie deficit with resistance training to preserve muscle while losing fat.",
    "Talk to a doctor or dietitian before pursuing an aggressive deficit or surplus, especially with any underlying health condition.",
  ],
  glossary: [
    { title: "BMR (Basal Metabolic Rate)", description: "The number of calories your body burns at complete rest just to maintain basic functions like breathing and circulation." },
    { title: "TDEE (Total Daily Energy Expenditure)", description: "Your BMR multiplied by an activity factor, representing total calories burned in a typical day including exercise and movement." },
    { title: "Calorie Deficit", description: "Eating fewer calories than your TDEE, which forces the body to draw on stored energy (fat) and results in weight loss over time." },
    { title: "Calorie Surplus", description: "Eating more calories than your TDEE, which provides extra energy the body can use to build new tissue, including muscle." },
    { title: "Mifflin-St Jeor Equation", description: "A widely used BMR formula from 1990 based on weight, height, age, and gender, generally considered more accurate than older formulas." },
    { title: "Macronutrients", description: "The three categories of nutrients that provide calories: protein, carbohydrates, and fat." },
  ],
};

export default guide;
