import type { ToolGuide } from "@/types/guide";

const guide: ToolGuide = {
  slug: "bmi-calculator",
  intro: [
    "A BMI calculator is a quick screening tool that turns your height and weight into a single number, your Body Mass Index, and sorts that number into a category: underweight, normal weight, overweight, or obese. It's the same formula doctors, nurses, and insurers have used for decades, packaged into a free BMI calculator you can run from any phone or computer in a few seconds.",
    "This body mass index tool is useful for anyone who wants an informal check on their weight status: people starting a fitness plan, patients preparing for a doctor's visit, or anyone curious how their numbers line up against the standard BMI chart. It's a screening number, not a diagnosis, and it doesn't replace a conversation with a healthcare provider, but it gives you the same starting figure a clinic would calculate at a checkup.",
    "Using an online calculator beats doing the math by hand because it removes the risk of a squared-height error, converts between metric and imperial units automatically, and shows your category instantly instead of making you cross-reference a healthy weight chart afterward. Enter your numbers once and you have a result you can save and track over time.",
  ],
  sections: [
    {
      heading: "How to Calculate BMI Manually (Formula + Example)",
      paragraphs: [
        "The BMI formula is straightforward: divide your weight in kilograms by your height in meters, then divide that result by your height in meters again. In symbols, BMI = weight (kg) ÷ height (m)². If you only have pounds and inches, the imperial version is BMI = 703 × weight (lb) ÷ height (in)². Both formulas land on the same category when you check the result against the standard BMI chart.",
        "Take someone who weighs 70 kg and stands 1.75 m tall. Height squared is 1.75 × 1.75 = 3.0625. Divide 70 by 3.0625 and you get a BMI of 22.9, which falls in the normal weight range. In pounds and inches, a person weighing 154 lb at 5 feet 9 inches (69 inches) gets 703 × 154 ÷ (69 × 69) = 22.7 — the small gap comes from rounding during the unit conversion.",
      ],
      bullets: [
        "Metric formula: BMI = weight (kg) ÷ [height (m)]²",
        "Imperial formula: BMI = 703 × weight (lb) ÷ [height (in)]²",
        "Keep height to two decimal places in meters to avoid rounding errors",
        "An online BMI calculator applies the same formula instantly and skips the manual rounding",
      ],
    },
    {
      heading: "BMI Chart for Adults: Categories Explained",
      paragraphs: [
        "The World Health Organization divides adult BMI into four main categories that apply to both men and women aged 20 and over. A BMI under 18.5 is classified as underweight, 18.5 to 24.9 is normal weight, 25 to 29.9 is overweight, and 30 or above is obese. These are the same cutoffs a BMI calculator uses to label your result, and they're the version most clinics in the United States and internationally reference.",
        "Obesity itself is split into three classes because health risk climbs with each step up. Class I (30–34.9) carries a moderate increase in risk for conditions like type 2 diabetes and high blood pressure, Class II (35–39.9) raises that risk further, and Class III (40 and above), sometimes called severe obesity, is linked to the highest risk and is often the threshold doctors cite when discussing more intensive treatment options.",
      ],
      bullets: [
        "Underweight: below 18.5",
        "Normal weight: 18.5–24.9",
        "Overweight: 25–29.9",
        "Obesity Class I: 30–34.9",
        "Obesity Class II: 35–39.9",
        "Obesity Class III (severe): 40 and above",
      ],
    },
    {
      heading: "Is BMI Accurate for Athletes and Muscular People?",
      paragraphs: [
        "BMI has one well-known blind spot: it can't distinguish muscle from fat, because it only uses weight and height. Muscle is denser than fat, so a bodybuilder or competitive athlete can weigh more per inch of height than an average person while carrying very little body fat. The formula still divides that heavier weight by height squared and returns a number that can look overweight or even obese.",
        "A real-world example: a 6-foot (183 cm) rugby player weighing 220 lb (100 kg) comes out to a BMI of about 29.9, technically overweight, even with a lean body fat percentage around 12%. For athletes, weightlifters, and anyone with above-average muscle mass, a body fat percentage calculator or waist-to-height ratio paints a more honest picture than BMI alone. This tool's results are informational only and are not a substitute for medical advice.",
      ],
    },
    {
      heading: "BMI for Children, Teens, and Older Adults: What Changes",
      paragraphs: [
        "The standard 18.5–24.9 BMI chart only applies to adults aged 20 and up. For children and teens, doctors use BMI-for-age percentiles from CDC or WHO growth charts, because a healthy BMI shifts as kids grow. A BMI of 19 might be normal for a 15-year-old but underweight for a 25-year-old, so a BMI calculated for a child should be compared to a pediatric growth chart, not the adult categories.",
        "Older adults face the opposite issue. After age 65, people naturally lose muscle mass even if their weight stays the same, so a normal BMI can mask a low-muscle, higher-fat body composition. Some geriatric guidelines suggest a slightly higher healthy range, around 22 to 27, for seniors. Pregnant women should also skip BMI-based weight goals entirely and follow their doctor's pregnancy-specific weight gain recommendations instead.",
      ],
    },
    {
      heading: "BMI vs Body Fat Percentage: Which Should You Trust?",
      paragraphs: [
        "BMI and body fat percentage measure different things. BMI is a ratio of weight to height that takes seconds to calculate and needs no special equipment, which is why it's used for population-level health screening. Body fat percentage, measured through methods like the U.S. Navy tape-measurement method, skinfold calipers, or a DEXA scan, tells you what portion of your weight is actually fat versus muscle, bone, and water.",
        "Neither number tells the whole story on its own. BMI is the faster, free starting point and works well for tracking trends over months, while body fat percentage is more informative for assessing fitness and health risk, especially for muscular or older adults. Many people use a BMI calculator for a quick check and a body fat calculator for a more detailed picture before changing their diet or training plan.",
      ],
    },
  ],
  useCases: [
    { title: "Tracking Weight Loss Progress", description: "Recalculate your BMI every few weeks during a diet or fitness program to see whether your category is shifting alongside the number on the scale." },
    { title: "Preparing for a Doctor's Appointment", description: "Get the same BMI figure a nurse would record at check-in so you can ask informed questions during your visit." },
    { title: "Setting a Realistic Weight Goal", description: "Use the normal weight range for your height as a target window instead of chasing an arbitrary number on the scale." },
    { title: "Comparing Against Screening Standards", description: "Some employers, insurers, and fitness programs reference BMI cutoffs; check where you stand before a required health screening." },
    { title: "Checking a Family Member's Trend", description: "Quickly calculate BMI for a parent or partner to track long-term weight trends alongside other health markers." },
  ],
  mistakes: [
    { title: "Forgetting to square the height", description: "Dividing weight by height instead of height squared is the most common manual BMI error and produces a wildly wrong result." },
    { title: "Mixing metric and imperial units", description: "Entering weight in pounds with height in meters (or vice versa) breaks the formula; always keep units consistent." },
    { title: "Treating BMI as a diagnosis", description: "BMI is a screening tool, not a medical diagnosis, and shouldn't be used alone to judge someone's overall health." },
    { title: "Applying adult categories to a child", description: "Kids and teens need age- and sex-specific percentile charts, not the fixed 18.5–24.9 adult range." },
  ],
  tips: [
    "Recalculate your BMI every few weeks rather than daily, since normal water-weight fluctuation can shift the number without meaning anything.",
    "Pair your BMI result with a waist circumference measurement for a fuller picture of health risk.",
    "Keep units consistent — use kilograms with meters or pounds with inches, never a mix of the two systems.",
    "If you lift weights or play sports regularly, check your body fat percentage alongside your BMI.",
    "Track your BMI trend over months rather than reacting to a single day's reading.",
  ],
  glossary: [
    { title: "Body Mass Index (BMI)", description: "A number calculated from weight and height that estimates whether someone falls into an underweight, normal, overweight, or obese category." },
    { title: "Quetelet Index", description: "The original name for the BMI formula, developed in the 1830s by Belgian mathematician Adolphe Quetelet." },
    { title: "Obesity Class I, II, III", description: "Subcategories of obesity (30–34.9, 35–39.9, and 40+) that reflect increasing levels of associated health risk." },
    { title: "Body Fat Percentage", description: "The proportion of total body weight that is made up of fat, as opposed to muscle, bone, and water." },
    { title: "Waist-to-Height Ratio", description: "A ratio that compares waist circumference to height, often used alongside BMI to flag abdominal fat risk." },
  ],
};

export default guide;
