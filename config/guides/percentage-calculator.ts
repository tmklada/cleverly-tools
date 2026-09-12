import type { ToolGuide } from "@/types/guide";

const guide: ToolGuide = {
  slug: "percentage-calculator",
  intro: [
    "A percentage calculator handles the handful of percent formulas that come up constantly in daily life, from figuring out a discount at checkout to finding a percentage increase on a bill or a test score. Instead of remembering which version of the formula applies to your situation, a percent calculator lets you pick the calculation type and get the answer immediately.",
    "This tool is useful for students checking homework, shoppers comparing sale prices, employees calculating a raise, and anyone who needs to calculate percentage changes for a budget or report. It covers the most common percent questions people search for: percentage of a number, percentage increase or decrease, and what percent one number is of another.",
    "Doing these calculations by hand is easy to get backward, especially percentage increase and decrease, where mixing up the old and new value flips the sign of the answer. An online tool applies the correct formula for each calculation type automatically, so you can trust the result without re-deriving the math every time.",
  ],
  sections: [
    {
      heading: "How to Calculate a Percentage of a Number (Formula + Example)",
      paragraphs: [
        "The most basic percentage formula finds a portion of a whole number. To calculate X percent of a number Y, convert the percentage to a decimal by dividing by 100, then multiply by Y. Written out, the formula is: (X ÷ 100) × Y. This single formula covers tips, discounts, taxes, and commission calculations.",
        "For example, to find 20% of 150, divide 20 by 100 to get 0.2, then multiply 0.2 by 150 for a result of 30. The same approach works for a restaurant tip: 18% of a $64 bill is (18 ÷ 100) × 64, which comes out to $11.52.",
      ],
      bullets: [
        "Formula: (percentage ÷ 100) × total number",
        "Example: 20% of 150 = 0.2 × 150 = 30",
        "Same formula works for tips, taxes, and commissions",
      ],
    },
    {
      heading: "Percentage Increase and Decrease Formulas Explained",
      paragraphs: [
        "Percentage change compares an old value to a new one and expresses the difference as a percentage of the original. The formula is ((new value − old value) ÷ old value) × 100. A positive result means an increase, and a negative result means a decrease. This formula is used everywhere from salary raises to price changes and population growth.",
        "For a percentage increase, take a salary that rises from $80,000 to $100,000: ((100,000 − 80,000) ÷ 80,000) × 100 gives a 25% increase. For a percentage decrease, a product priced at $200 that drops to $150 works out to ((150 − 200) ÷ 200) × 100, which equals −25%, meaning a 25% decrease.",
      ],
      bullets: [
        "Formula: ((new − old) ÷ old) × 100",
        "Positive result = percentage increase",
        "Negative result = percentage decrease",
      ],
    },
    {
      heading: "How to Find What Percent One Number Is of Another",
      paragraphs: [
        "This calculation answers questions like how much of a total a specific amount represents. Divide the part by the whole, then multiply by 100: (part ÷ whole) × 100. It's the formula behind grades, survey results, and budget breakdowns.",
        "As an example, if you answered 45 questions correctly out of 60 on a test, the score is (45 ÷ 60) × 100, which equals 75%. If your rent of $900 comes out of a $3,600 monthly income, rent takes up (900 ÷ 3,600) × 100, or 25%, of your income.",
      ],
    },
    {
      heading: "Percentage Points vs Percent Change: What's the Difference",
      paragraphs: [
        "Percentage points and percent change sound similar but measure different things, and mixing them up is a common source of confusion in news headlines and financial reports. A percentage point is a simple difference between two percentages, while percent change measures that difference relative to the starting value.",
        "For example, if an interest rate rises from 5% to 7%, that's a 2 percentage point increase, but it's also a 40% percent increase, since ((7 − 5) ÷ 5) × 100 = 40%. Both statements are technically correct, but they describe the same change very differently, so it matters which one is being used.",
      ],
    },
    {
      heading: "Reverse Percentage: Finding the Original Price Before a Discount",
      paragraphs: [
        "Sometimes you know the final price after a discount and need to work backward to find the original amount. The formula is: original value = final value ÷ (1 − discount as a decimal). This is the reverse of the standard discount calculation and is useful for checking whether a sale price is calculated correctly.",
        "For example, if a jacket is on sale for $60 after a 25% discount, the original price is 60 ÷ (1 − 0.25), or 60 ÷ 0.75, which equals $80. The same reverse logic works for finding a pre-tax price when you only have the total including tax.",
      ],
    },
    {
      heading: "Calculating Percentage Change Over Multiple Periods",
      paragraphs: [
        "Percentages don't always add up the way people expect when a value changes more than once. If a price rises 10% one year and then falls 10% the next, it does not return to the original amount, because the second percentage is calculated on the new, higher base rather than the original one.",
        "For example, a $100 item that rises 10% becomes $110. A 10% decrease from $110 is $11, bringing the price down to $99, not back to $100. This is why compounding several percentage changes in a row, whether it's price changes, population figures, or investment returns, requires multiplying the growth factors together rather than simply adding or subtracting the percentages.",
      ],
      bullets: [
        "A 10% increase followed by a 10% decrease does not cancel out",
        "Multiply successive growth factors, such as 1.10 × 0.90, instead of adding percentages",
        "Applies to prices, populations, exchange rates, and investment returns alike",
      ],
    },
  ],
  useCases: [
    { title: "Calculating a Discount or Sale Price", description: "Find the exact dollar amount off a purchase, or work backward from a sale price to see the original cost before the discount." },
    { title: "Figuring Out a Tip or Service Charge", description: "Quickly calculate a percentage of a restaurant bill or service invoice without doing mental math at the table." },
    { title: "Tracking a Salary or Price Increase", description: "See the exact percentage change between an old and new salary, rent, or price to compare offers or negotiate." },
    { title: "Calculating a Test or Grade Percentage", description: "Convert a raw score like 45 out of 60 into a percentage grade instantly for schoolwork or performance reviews." },
    { title: "Budgeting and Expense Breakdown", description: "Determine what percentage of your income or budget a specific expense category represents to spot overspending." },
  ],
  mistakes: [
    { title: "Reversing old and new values", description: "Swapping which number is the old value and which is the new value in a percentage change formula flips the sign of the result." },
    { title: "Confusing percentage points with percent change", description: "A change from 10% to 15% is 5 percentage points but a 50% relative increase; using the wrong term misleads readers." },
    { title: "Forgetting to convert percent to a decimal", description: "Multiplying by 20 instead of 0.2 when finding 20% of a number produces a result 100 times too large." },
    { title: "Applying discounts sequentially instead of correctly", description: "Two 10% discounts don't equal a 20% discount; each discount applies to the already-reduced price, giving a smaller total reduction." },
  ],
  tips: [
    "Double-check which value is the original when calculating percentage increase or decrease, since it goes in the denominator.",
    "Convert a percentage to a decimal by dividing by 100 before multiplying, not after.",
    "Use the reverse percentage formula to verify that a sale price matches the advertised discount percentage.",
    "Remember that stacked discounts multiply against each other rather than adding together.",
    "When comparing rates or scores, state whether you mean percentage points or percent change to avoid confusion.",
  ],
  glossary: [
    { title: "Percentage", description: "A way of expressing a number as a fraction of 100, often written with a percent sign." },
    { title: "Percentage Change", description: "The difference between an old and new value, expressed as a percentage of the original value." },
    { title: "Percentage Point", description: "A unit representing the arithmetic difference between two percentages, rather than a relative change." },
    { title: "Base Value", description: "The original or starting number that a percentage calculation is measured against." },
    { title: "Reverse Percentage", description: "The process of calculating an original value from a final amount and a known percentage change." },
  ],
};

export default guide;
