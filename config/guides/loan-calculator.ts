import type { ToolGuide } from "@/types/guide";

const guide: ToolGuide = {
  slug: "loan-calculator",
  intro: [
    "A loan calculator turns three numbers, the amount you want to borrow, the interest rate, and the repayment term, into the figure that actually matters day to day: your monthly payment. Whether you're pricing out a mortgage, a car loan, a personal loan, or a business line of credit, the underlying math is identical, so one calculator can handle all of them as long as you know the loan amount, annual interest rate, and term in years.",
    "This loan payment calculator is built for anyone comparing offers before they sign anything: a buyer weighing two mortgage quotes with different rates, a car shopper checking whether a 60-month or 72-month term fits their budget, or someone consolidating credit card debt into a personal loan and wanting to see the real monthly cost. It also shows total interest paid over the life of the loan, which is often more revealing than the monthly payment alone.",
    "Doing this math by hand means applying the amortization formula correctly, converting an annual rate to a monthly one, and raising a number to a power dozens or hundreds of times depending on the term, all of which is easy to get wrong with a basic calculator app. An online monthly payment calculator applies the formula exactly once, instantly, and lets you tweak the rate or term to see how the payment changes without redoing the arithmetic from scratch.",
  ],
  sections: [
    {
      heading: "Loan Amortization Explained: How Monthly Payments Are Calculated",
      paragraphs: [
        "Every fixed-rate installment loan, mortgages included, uses the same amortization formula: M = P × [r(1+r)^n] / [(1+r)^n − 1]. Here, M is the monthly payment, P is the principal (the amount borrowed), r is the monthly interest rate (the annual rate divided by 12), and n is the total number of monthly payments (the term in years multiplied by 12). The formula guarantees that the loan balance reaches exactly zero after the final payment.",
        "Take a $20,000 personal loan at 7% annual interest over 5 years. The monthly rate r is 0.07 / 12 = 0.005833, and n is 60 payments. Plugging into the formula gives a monthly payment of about $396.02. Over 60 months that's $23,761.20 total, meaning $3,761.20 goes to interest. Change the term to 3 years instead and the payment rises to roughly $617.66, but total interest drops to about $2,235.76, because the bank charges interest for less time.",
        "This is why a loan calculator is more useful than just asking a lender for \"the payment\": it lets you see the interest cost as a separate line item and test how a shorter term or a lower rate changes that number before you commit to either.",
      ],
      bullets: [
        "Amortization formula: M = P × [r(1+r)^n] / [(1+r)^n − 1]",
        "r = annual interest rate ÷ 12 (monthly rate)",
        "n = loan term in years × 12 (total number of payments)",
        "Total interest = (M × n) − P",
      ],
    },
    {
      heading: "APR vs Interest Rate: Why Your Payment May Differ From the Advertised Rate",
      paragraphs: [
        "The interest rate is the percentage a lender charges on the principal each year, and it's the number you plug into the amortization formula to get your monthly payment. The APR (annual percentage rate) is broader: it wraps the interest rate together with lender fees, origination charges, and sometimes mortgage insurance, then expresses the whole package as a yearly percentage. Two loans with the same interest rate can have different APRs if one lender charges higher upfront fees.",
        "This calculator, like most simple loan calculators, works off the stated interest rate to compute principal and interest. If a lender quotes you an APR that's noticeably higher than the interest rate, that gap tells you fees are being financed into the loan, and the true monthly cost will run a bit higher than the number this tool shows. Always ask a lender for both figures before comparing two loan offers side by side.",
      ],
    },
    {
      heading: "Mortgage vs Car Loan vs Personal Loan: What Changes in the Math",
      paragraphs: [
        "The amortization formula doesn't care what the loan is for, only the amount, rate, and term, so a mortgage and a personal loan at the same rate and term use identical math, just with different inputs and results. What differs between loan types is typical rate ranges and terms: mortgages commonly run 15 to 30 years, car loans run 3 to 7 years, and personal loans run 2 to 7 years, usually at higher rates since most are unsecured.",
        "Mortgages carry one extra wrinkle this calculator doesn't include: property taxes, homeowners insurance, and sometimes PMI (private mortgage insurance) get added to the monthly bill by most lenders, a figure often called PITI (principal, interest, taxes, insurance). This tool shows the P&I portion only. On a $300,000 mortgage at 6.5% over 30 years, principal and interest alone come to about $1,896 a month, before taxes and insurance are added on top.",
      ],
    },
    {
      heading: "How Extra Payments Shorten Your Loan and Cut Interest",
      paragraphs: [
        "Because interest is charged on the remaining balance each month, any extra payment applied directly to principal reduces the balance the very next calculation cycle, which lowers all future interest charges and effectively shortens the loan. This calculator shows the standard payment schedule, but you can approximate the effect of extra payments by re-running the numbers with a shorter term at the same rate to see how much faster the loan clears and how much interest that saves.",
        "On the earlier $20,000, 7%, 5-year loan example, paying an extra $50 a month toward principal would retire the loan roughly 7 months early and save a few hundred dollars in interest, even though the total extra cash paid in is smaller than the interest saved. This is the core reason financial advisors recommend paying down high-interest debt ahead of schedule whenever the loan terms allow it without a prepayment penalty.",
      ],
    },
    {
      heading: "Fixed-Rate vs Variable-Rate Loans: How This Calculator Applies to Each",
      paragraphs: [
        "This calculator assumes a fixed interest rate for the full term, which matches most personal loans, auto loans, and fixed-rate mortgages: the rate and payment you calculate today stay the same for the life of the loan. Variable-rate loans, including adjustable-rate mortgages (ARMs) and many lines of credit, start at a lower introductory rate that resets periodically based on a benchmark index, so the payment can rise or fall after the initial fixed period ends.",
        "For a variable-rate loan, use this tool to estimate your payment at the current rate, but treat the result as a snapshot rather than a permanent number. Re-run the calculation with a higher assumed rate to stress-test your budget in case the rate resets upward.",
      ],
    },
  ],
  useCases: [
    { title: "Comparing Mortgage Offers", description: "Plug in the rate and term from two or three lender quotes to see which produces the lowest monthly payment and total interest before choosing one." },
    { title: "Budgeting for a Car Purchase", description: "Test different loan terms on the same car price to see how a 48-month versus 72-month loan changes your monthly payment and total cost." },
    { title: "Planning Debt Consolidation", description: "Check whether rolling several credit card balances into one personal loan actually lowers your combined monthly payment at a given rate." },
    { title: "Evaluating a Refinance", description: "Compare your current loan's remaining payments against a new rate and term to see whether refinancing would genuinely save money." },
    { title: "Setting a Realistic Purchase Budget", description: "Work backward from a monthly payment you can afford to estimate the maximum loan amount you should borrow at current rates." },
  ],
  mistakes: [
    { title: "Using the annual rate instead of the monthly rate", description: "Forgetting to divide the annual interest rate by 12 before applying the formula produces a payment many times too high." },
    { title: "Confusing APR with the interest rate", description: "Entering a lender's advertised APR as the interest rate can understate or overstate the true principal-and-interest payment depending on included fees." },
    { title: "Ignoring taxes and insurance on a mortgage", description: "The calculated payment covers principal and interest only; actual mortgage bills are usually higher once taxes and insurance are escrowed in." },
    { title: "Comparing loans by monthly payment alone", description: "A lower monthly payment from a longer term often means paying significantly more total interest over the life of the loan." },
    { title: "Not checking for prepayment penalties", description: "Some loans charge a fee for paying off early, which can offset the interest savings from extra payments." },
  ],
  tips: [
    "Compare loans by total interest paid, not just the monthly payment, to see the true cost of a longer term.",
    "Ask every lender for both the interest rate and the APR so you can spot hidden fees before comparing offers.",
    "Run the same loan amount at a couple of different terms to find the shortest one your budget can comfortably handle.",
    "If your loan allows extra payments without penalty, even small additional amounts toward principal can shave months off the term.",
    "For mortgages, remember to budget separately for property taxes and insurance on top of the calculated payment.",
    "Re-check your payment estimate whenever a quoted rate changes, since even a 0.5% difference can shift the monthly cost noticeably on larger loans.",
  ],
  glossary: [
    { title: "Principal", description: "The original amount of money borrowed, before interest is added." },
    { title: "Amortization", description: "The process of paying off a loan through regular fixed payments that cover both interest and a portion of the principal." },
    { title: "APR (Annual Percentage Rate)", description: "A yearly cost figure that combines the interest rate with lender fees, giving a fuller picture of a loan's true cost than the interest rate alone." },
    { title: "Term", description: "The length of time, usually expressed in months or years, over which a loan is scheduled to be fully repaid." },
    { title: "PITI", description: "Shorthand for Principal, Interest, Taxes, and Insurance, the four components typically bundled into a monthly mortgage payment." },
    { title: "Adjustable-Rate Mortgage (ARM)", description: "A mortgage whose interest rate starts fixed for an introductory period, then adjusts periodically based on a market index." },
  ],
};

export default guide;
