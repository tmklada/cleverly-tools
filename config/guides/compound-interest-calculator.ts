import type { ToolGuide } from "@/types/guide";

const guide: ToolGuide = {
  slug: "compound-interest-calculator",
  intro: [
    "A compound interest calculator projects how a lump sum or a series of contributions grows over time when interest is added not just to your original principal, but also to the interest you've already earned. It's the same math behind an investment calculator, a savings calculator, and a future value calculator, all built around one core formula that most people would rather not solve by hand.",
    "This tool is useful for anyone planning a savings goal, comparing investment growth across different accounts, or checking how a loan's interest compounds against them. It works for retirement accounts, high-yield savings accounts, certificates of deposit, and even for understanding how compounding works against you in credit card debt.",
    "The compound interest formula involves an exponent, and getting the exponent or the rate-per-period wrong is easy to do by hand, especially when comparing monthly versus daily compounding. An online calculator runs the exact formula instantly and lets you test different rates, time periods, and contribution amounts without redoing the algebra each time.",
  ],
  sections: [
    {
      heading: "How to Calculate Compound Interest (Formula + Example)",
      paragraphs: [
        "The standard compound interest formula is A = P(1 + r/n)^(nt), where A is the final amount, P is the principal, r is the annual interest rate as a decimal, n is the number of times interest compounds per year, and t is the number of years. This single formula covers savings accounts, bonds, and most standard investment growth projections.",
        "For example, a $10,000 deposit earning 5% annual interest, compounded monthly, over 10 years works out to A = 10,000 × (1 + 0.05/12)^(12×10). That's 10,000 × (1.004167)^120, which equals approximately $16,470. Of that total, about $6,470 is interest earned on top of the original $10,000 principal.",
      ],
      bullets: [
        "A = P(1 + r/n)^(nt)",
        "P = principal, r = annual rate (decimal), n = compounds per year, t = years",
        "Example: $10,000 at 5% compounded monthly for 10 years ≈ $16,470",
      ],
    },
    {
      heading: "How Compounding Frequency Affects Your Returns",
      paragraphs: [
        "The n in the compound interest formula represents how often interest is calculated and added back to the balance, and it has a real, if modest, effect on your final total. More frequent compounding means interest starts earning its own interest sooner, so daily compounding will always slightly outperform monthly, which slightly outperforms annual, for the same stated rate.",
        "Consider $10,000 at 6% annual interest over 10 years under three compounding schedules. Compounded annually, it grows to about $17,908. Compounded monthly, it reaches about $18,194. Compounded daily, it reaches about $18,221. The gap between annual and daily compounding here is roughly $313, small compared to the total but meaningful over larger balances and longer time horizons.",
      ],
    },
    {
      heading: "Compound Interest vs Simple Interest: Side-by-Side Example",
      paragraphs: [
        "Simple interest is calculated only on the original principal using A = P(1 + rt), so the amount of interest earned each year stays the same. Compound interest is calculated on the principal plus all interest already earned, so the amount earned each year keeps increasing. Over short periods the difference is small, but it becomes dramatic over decades.",
        "Take $5,000 invested for 20 years at an 8% annual rate. With simple interest, the total is 5,000 × (1 + 0.08 × 20) = $13,000. With annual compound interest, the total is 5,000 × (1.08)^20, which comes to roughly $23,305. Compounding nearly doubles the outcome compared to simple interest over that same 20-year stretch.",
      ],
    },
    {
      heading: "The Rule of 72: Estimating How Long It Takes to Double Your Money",
      paragraphs: [
        "The Rule of 72 is a quick mental shortcut for estimating how many years it takes an investment to double at a given compound annual rate, without running the full formula. Divide 72 by the annual interest rate (as a whole number, not a decimal) to get the approximate number of years to double.",
        "At a 6% annual rate, money doubles in roughly 72 ÷ 6 = 12 years. At 9%, it takes about 72 ÷ 9 = 8 years. At 4%, it takes about 18 years. The Rule of 72 is an approximation that works best for rates between about 6% and 10%, and a full compound interest calculator gives a more exact answer for rates outside that range.",
      ],
      bullets: [
        "6% annual rate → doubles in about 12 years",
        "8% annual rate → doubles in about 9 years",
        "9% annual rate → doubles in about 8 years",
      ],
    },
    {
      heading: "How Regular Contributions Change a Compound Interest Projection",
      paragraphs: [
        "Most real savings plans aren't a single lump sum; they involve adding money regularly, such as a monthly deposit into a retirement or savings account. Adding contributions changes the calculation to a future value of an annuity, which combines growth on the existing balance with growth on each new contribution, compounded from the date it's added.",
        "For example, contributing $200 per month for 30 years at a 7% annual rate compounded monthly, with no starting balance, grows to roughly $244,000. Of that total, only $72,000 came directly from contributions (200 × 12 × 30); the remaining amount, over $170,000, came from compound growth on those contributions over time.",
      ],
    },
    {
      heading: "Compound Interest in Debt: Why It Works Against You",
      paragraphs: [
        "Compound interest isn't only a savings tool; it also applies to credit card balances and some loans, where it works in the lender's favor instead of yours. Credit cards typically compound daily at annual percentage rates well above 20%, so unpaid interest gets added to the balance and starts generating its own interest almost immediately.",
        "A $5,000 balance at a 22% APR compounding daily, with only minimum payments made, can take many years to pay off and can cost several thousand dollars in interest beyond the original balance. Running the same compound interest formula on a debt, rather than a deposit, is a useful way to see exactly how expensive carrying a balance really is.",
      ],
    },
  ],
  useCases: [
    { title: "Projecting Retirement Savings Growth", description: "Estimate how a 401(k), IRA, or brokerage balance could grow over decades given an assumed average annual return and contribution schedule." },
    { title: "Comparing Savings Account Interest Rates", description: "See the real dollar difference between two savings accounts with different rates or compounding frequencies before opening one." },
    { title: "Planning a College or Down Payment Fund", description: "Work backward from a savings goal and time frame to see what monthly contribution and rate are needed to reach it." },
    { title: "Evaluating a CD or Bond Offer", description: "Check the actual future value of a certificate of deposit or bond given its stated rate, term, and compounding schedule." },
    { title: "Understanding Credit Card Debt Growth", description: "See how quickly unpaid interest compounds on a credit card balance to understand the real cost of carrying debt." },
  ],
  mistakes: [
    { title: "Entering the rate as a whole number instead of a decimal", description: "Using 5 instead of 0.05 for a 5% rate produces a wildly inflated and incorrect result in the compound interest formula." },
    { title: "Mismatching the compounding period and the rate", description: "Using an annual rate directly in a monthly formula without dividing by 12 overstates growth significantly." },
    { title: "Ignoring compounding frequency when comparing accounts", description: "Two accounts with the same stated rate can produce different results if one compounds daily and the other compounds annually." },
    { title: "Forgetting that contributions compound from their own start date", description: "A contribution made in year 20 has far less time to grow than one made in year one, even at the same rate." },
  ],
  tips: [
    "Always convert a percentage rate to a decimal before plugging it into the compound interest formula.",
    "Use the same time unit for the rate and the compounding frequency to avoid mismatched calculations.",
    "Run the Rule of 72 as a fast sanity check before trusting a detailed projection.",
    "Compare accounts using the same time horizon and contribution schedule, not just the headline interest rate.",
    "Apply the same compound interest logic to debt to see how quickly an unpaid balance can grow.",
  ],
  glossary: [
    { title: "Principal", description: "The original amount of money deposited or borrowed, before any interest is added." },
    { title: "Compounding Frequency", description: "How often interest is calculated and added to the balance, such as daily, monthly, quarterly, or annually." },
    { title: "Annual Percentage Rate (APR)", description: "The yearly interest rate charged or earned, not accounting for the effect of compounding within the year." },
    { title: "Future Value", description: "The projected value of an investment or savings balance at a specific point in the future, after growth." },
    { title: "Rule of 72", description: "A shortcut formula that estimates how many years it takes an investment to double at a given annual rate." },
  ],
};

export default guide;
