import type { ToolGuide } from "@/types/guide";

const guide: ToolGuide = {
  slug: "body-fat-calculator",
  intro: [
    "A body fat calculator estimates what portion of your total weight is fat versus muscle, bone, and water, using a handful of tape-measure readings instead of expensive lab equipment. The most common version, and the one built into this tool, is the U.S. Navy body fat formula, which relies on your neck, waist, height, and, for women, hip measurements.",
    "This body composition calculator is aimed at anyone who wants a more detailed health picture than weight or BMI alone can provide: people starting a strength training program, athletes tracking body recomposition, or anyone whose BMI looks high but who suspects it's driven by muscle rather than fat. It's an estimate, not a lab-grade measurement, and its results are informational only, not medical advice.",
    "Doing the Navy method by hand involves logarithms, which almost nobody wants to calculate with a pencil and paper. A fat percentage calculator runs the formula instantly from your measurements and shows you where you fall on the standard body fat percentage chart for your gender.",
  ],
  sections: [
    {
      heading: "The U.S. Navy Body Fat Formula Explained (Step-by-Step)",
      paragraphs: [
        "The Navy method estimates body density from a few circumference measurements, then converts that density into a body fat percentage. For men, the formula is: %BF = 495 ÷ (1.0324 − 0.19077 × log10(waist − neck) + 0.15456 × log10(height)) − 450, using inches for every measurement. For women, hip circumference is added: %BF = 495 ÷ (1.29579 − 0.35004 × log10(waist + hip − neck) + 0.22100 × log10(height)) − 450.",
        "Take a man with a 34-inch waist, 15-inch neck, and 70-inch height. Waist minus neck is 19, and the formula works out to a body fat estimate of about 10.9%. For a woman with a 36-inch waist, 42-inch hip, 13-inch neck, and 64-inch height, the combined figure of waist plus hip minus neck is 65, which produces an estimate of about 16.9%.",
      ],
      bullets: [
        "Men: %BF = 495 ÷ (1.0324 − 0.19077×log10(waist−neck) + 0.15456×log10(height)) − 450",
        "Women: %BF = 495 ÷ (1.29579 − 0.35004×log10(waist+hip−neck) + 0.22100×log10(height)) − 450",
        "All measurements are in inches in the original formula",
      ],
    },
    {
      heading: "How to Measure Your Neck, Waist, and Hip Correctly",
      paragraphs: [
        "The Navy formula is only as accurate as the measurements you feed into it, so technique matters. Measure your neck just below the larynx, with the tape sloping slightly downward toward the front. Measure your waist at the level of your navel for the standard version of this method, and keep the tape snug against the skin without compressing it.",
        "For hip measurement, wrap the tape around the widest part of your hips and buttocks. Take all measurements standing upright with muscles relaxed, not flexed, and read the tape at the end of a normal exhale rather than after sucking in your stomach. Measuring at the same time of day, ideally in the morning, keeps repeat measurements more consistent.",
      ],
    },
    {
      heading: "Body Fat Percentage Chart by Category",
      paragraphs: [
        "Body fat percentages are usually grouped into categories rather than judged against a single healthy number, and the ranges differ meaningfully between men and women because women naturally carry more essential fat. The American Council on Exercise breaks body fat into five bands: essential fat, athletes, fitness, average, and obese.",
      ],
      bullets: [
        "Essential fat: 2–5% (men), 10–13% (women)",
        "Athletes: 6–13% (men), 14–20% (women)",
        "Fitness: 14–17% (men), 21–24% (women)",
        "Average: 18–24% (men), 25–31% (women)",
        "Obese: 25%+ (men), 32%+ (women)",
      ],
    },
    {
      heading: "Body Fat Calculator vs Skinfold Calipers vs DEXA Scan: Accuracy Compared",
      paragraphs: [
        "No body fat method outside a lab is perfectly precise, but they differ in how close they get. The Navy tape-measurement method used in this calculator typically lands within about 3 to 4 percentage points of a DEXA scan, which is considered the clinical gold standard because it directly images bone, muscle, and fat using low-dose X-rays.",
        "Skinfold calipers, which pinch and measure skin-fold thickness at several body sites, can be similarly accurate but depend heavily on the technician's skill and consistency, with error ranging from about 3% to 8%. Bioelectrical impedance scales, the kind built into some bathroom scales, estimate body fat by sending a small electrical current through the body, but results shift noticeably with hydration level, making them the least consistent of the common home methods.",
      ],
    },
    {
      heading: "Essential Fat vs Storage Fat: Why the Numbers Differ by Gender",
      paragraphs: [
        "Not all body fat is optional. Essential fat is the minimum amount needed for basic physiological function, including hormone production, insulation, and cushioning for organs, and it's built into cell membranes and bone marrow throughout the body. Storage fat is the additional fat stored under the skin and around organs that most weight loss or gain actually affects.",
        "Men need only about 2 to 5% essential fat to maintain normal function, while women need roughly 10 to 13%, because essential fat also supports reproductive hormone regulation. This structural difference is why a healthy body fat range for women sits noticeably higher than for men at every category on the chart, and why extremely low body fat is riskier for women's health specifically.",
      ],
    },
    {
      heading: "How to Lower Body Fat Percentage Safely",
      paragraphs: [
        "Reducing body fat percentage comes down to two levers working together: a moderate calorie deficit to reduce total fat stores, and resistance training combined with adequate protein intake to preserve or build muscle while that fat comes off. Losing weight without strength training often reduces muscle along with fat, which can leave body fat percentage barely changed even as the scale drops.",
        "A realistic pace is roughly 0.5 to 1 percentage point of body fat reduction per month for most people, achieved through a moderate deficit rather than an extreme one, which tends to accelerate muscle loss. Re-measuring with the same method every few weeks, rather than daily, gives a more reliable trend line than chasing day-to-day fluctuations.",
      ],
    },
  ],
  useCases: [
    { title: "Tracking Body Recomposition Progress", description: "Monitor whether a training and diet plan is actually reducing fat and preserving muscle, which the scale alone can't show." },
    { title: "Checking a High BMI That May Be Muscle", description: "Confirm whether a BMI in the overweight range is driven by lean mass rather than excess fat before changing a fitness plan." },
    { title: "Setting a Body Composition Goal", description: "Use the category chart to set a specific target range, such as moving from the average band into the fitness band." },
    { title: "Comparing Measurement Methods Over Time", description: "Cross-check Navy method estimates against a caliper or scale reading to see how consistent your tracking method is." },
    { title: "Pre-Season Athletic Assessments", description: "Get a quick body fat baseline before a training season starts, then re-measure at set intervals to track change." },
  ],
  mistakes: [
    { title: "Measuring over clothing", description: "Bulky clothing adds inches to circumference readings and inflates the resulting body fat estimate significantly." },
    { title: "Sucking in the stomach during the waist measurement", description: "Holding your breath or flexing your abs gives an artificially low waist reading and an inaccurate result." },
    { title: "Comparing results across different methods", description: "A Navy method estimate and a bioelectrical impedance scale reading can differ by several points; track trends within one method." },
    { title: "Measuring at inconsistent times of day", description: "Water retention and food intake shift measurements throughout the day, so comparing a morning reading to an evening one skews trends." },
  ],
  tips: [
    "Take all three or four measurements twice and average them to reduce the chance of a single misread.",
    "Re-measure under the same conditions each time: same time of day, same tape tension, same posture.",
    "Track body fat percentage trends over weeks or months rather than reacting to a single measurement.",
    "Use the same method consistently rather than switching between calipers, scales, and the Navy formula.",
    "Pair body fat tracking with strength training so muscle loss doesn't accompany fat loss.",
  ],
  glossary: [
    { title: "Navy Body Fat Method", description: "A body fat estimation formula developed for the U.S. Navy that uses neck, waist, height, and hip circumference measurements." },
    { title: "Essential Fat", description: "The minimum body fat required for normal physiological function, including hormone regulation and organ cushioning." },
    { title: "DEXA Scan", description: "A low-dose X-ray scan that directly measures bone density, muscle mass, and fat mass, considered a clinical gold standard." },
    { title: "Bioelectrical Impedance", description: "A body fat estimation method that sends a small electrical current through the body and is sensitive to hydration levels." },
    { title: "Body Recomposition", description: "The process of simultaneously losing fat and gaining or maintaining muscle, often with little change in total body weight." },
  ],
};

export default guide;
