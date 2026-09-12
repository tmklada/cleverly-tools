import type { ToolGuide } from "@/types/guide";

const guide: ToolGuide = {
  slug: "profit-margin-calculator",
  intro: [
    "A profit margin calculator answers the question every business eventually has to face: out of every dollar that comes in, how much actually stays as profit? Enter revenue and costs and it calculates gross profit margin, net profit margin, or markup percentage, depending on which figure you need — three related but distinct numbers that get confused with each other constantly, even by experienced business owners.",
    "This tool is useful for small business owners pricing a product, freelancers setting a rate, e-commerce sellers checking whether a sale price still leaves room for profit, and anyone reviewing a income statement who wants to see the margin behind the raw dollar figures. Because margin is a percentage rather than a dollar amount, it also makes it possible to compare profitability across products or time periods of very different sizes.",
    "Margin and markup look similar on the surface — both compare a selling price to a cost — but they're calculated against different bases and produce different percentages for the same numbers, which trips people up when pricing a product for a target profit level. This calculator keeps gross margin, net margin, and markup as separate, clearly labeled calculations so the right formula gets applied to the right question every time.",
  ],
  sections: [
    {
      heading: "Gross Margin vs Net Margin vs Markup (They Are Not the Same)",
      paragraphs: [
        "Gross margin, net margin, and markup all describe profitability, but they measure it against different numbers, and treating them as interchangeable is one of the most common pricing mistakes a business can make. Gross margin compares profit to revenue after subtracting only the direct cost of producing what you sold (cost of goods sold, or COGS). Net margin compares profit to revenue after subtracting COGS and every other operating expense, giving a fuller picture of what's actually left over.",
        "Markup is calculated differently from both: instead of dividing profit by revenue, it divides profit by cost. Because cost is always smaller than the resulting selling price (assuming you're profitable), a markup percentage is always higher than the margin percentage for the same sale — a $50 cost sold for $75 has a $25 profit, which is a 33.3% gross margin against the $75 revenue, but a 50% markup against the $50 cost.",
      ],
      bullets: [
        "Gross margin = profit ÷ revenue (after COGS only)",
        "Net margin = profit ÷ revenue (after COGS and all other expenses)",
        "Markup = profit ÷ cost, not revenue — always a higher number than margin",
      ],
    },
    {
      heading: "How to Calculate Gross Profit Margin (Formula + Example)",
      paragraphs: [
        "Gross profit margin is calculated as: ((revenue − cost of goods sold) ÷ revenue) × 100. It isolates how efficiently you're producing or acquiring what you sell, before any of the overhead costs of running the business — rent, salaries, marketing — come into the picture. It's the number to watch when evaluating whether a product itself is priced correctly, separate from how the rest of the business is run.",
        "For example, a business with $100,000 in revenue and $60,000 in cost of goods sold has a gross profit of $40,000. Dividing that by revenue and multiplying by 100 gives a gross margin of 40% — meaning 40 cents of every revenue dollar remains after covering the direct cost of the product, before any other business expenses are paid.",
      ],
      bullets: [
        "Formula: ((revenue − COGS) ÷ revenue) × 100",
        "Example: $100,000 revenue − $60,000 COGS = $40,000 gross profit → 40% gross margin",
      ],
    },
    {
      heading: "How to Calculate Net Profit Margin (Formula + Example)",
      paragraphs: [
        "Net profit margin goes further than gross margin by also subtracting operating expenses — rent, payroll, marketing, software, and everything else it costs to run the business beyond the direct cost of the product itself. The formula is: ((revenue − COGS − operating expenses) ÷ revenue) × 100. This is the more complete measure of profitability, and it's almost always lower than the gross margin for the same business.",
        "Using the same $100,000 revenue and $60,000 COGS example, add $20,000 in operating expenses: net profit is $100,000 − $60,000 − $20,000, which is $20,000, giving a net profit margin of 20%. Notice this is exactly half the 40% gross margin calculated for the same business — a reminder that gross margin alone can make a business look more profitable than it really is.",
      ],
      bullets: [
        "Formula: ((revenue − COGS − operating expenses) ÷ revenue) × 100",
        "Example: $100,000 revenue − $60,000 COGS − $20,000 expenses = $20,000 net profit → 20% net margin",
      ],
    },
    {
      heading: "Markup vs Margin: Why 50% Markup Isn't 50% Margin",
      paragraphs: [
        "Markup is calculated as: ((selling price − cost) ÷ cost) × 100 — profit measured against what the item cost you, not what you sold it for. This is a common source of pricing errors, because a 50% markup does not produce a 50% margin; it actually produces a 33.3% margin, since the same dollar amount is being divided by a larger number (the higher selling price) when calculating margin.",
        "For example, a product that costs $50 and is marked up by 50% sells for $75 (cost plus 50% of cost). The $25 profit divided by the $50 cost is indeed a 50% markup, but that same $25 profit divided by the $75 selling price is only 33.3% — a meaningfully different number if you were assuming markup and margin meant the same thing when setting a price target.",
      ],
      bullets: [
        "Formula: ((price − cost) ÷ cost) × 100",
        "Example: $50 cost sold for $75 → $25 profit → 50% markup, but only 33.3% margin",
      ],
    },
    {
      heading: "How to Price a Product for a Target Margin",
      paragraphs: [
        "If you know your cost and want to hit a specific gross margin target, the formula to work backward is: selling price = cost ÷ (1 − target margin as a decimal). This is more reliable than adding a markup percentage to cost, since markup and margin aren't the same number, and pricing off the wrong one will land you short of your actual margin goal.",
        "For example, to hit a 40% margin on a product that costs $60, divide $60 by (1 − 0.40), or $60 ÷ 0.60, which gives a selling price of $100. Checking the math: $100 revenue minus $60 cost is $40 profit, and $40 ÷ $100 is exactly the targeted 40% margin — confirming the formula produces the intended result rather than an approximation.",
      ],
    },
    {
      heading: "What Counts as a Good Profit Margin by Industry",
      paragraphs: [
        "There's no single margin number that applies across every business, since typical margins vary by industry based on inventory cost, competition, and overhead. Retail and grocery often run thin margins in the low single digits to around 5%, since the model relies on volume. Restaurants typically land in the 3-9% net margin range once food, labor, and rent are accounted for.",
        "Service-based and software businesses can run much higher, since there's often little cost of goods sold to subtract — software companies frequently report net margins in the 60-80% range. Because of this spread, the most useful comparison isn't a universal benchmark but your own industry average or your own margin over time.",
      ],
    },
  ],
  useCases: [
    { title: "Pricing a New Product", description: "Work backward from a target gross margin to find the correct selling price for a product given its known production cost." },
    { title: "Evaluating a Sale or Discount", description: "Check whether a discounted price still leaves an acceptable margin after cost of goods sold before running a promotion." },
    { title: "Comparing Product Lines", description: "Calculate margin across several products to see which ones are actually the most profitable per revenue dollar, not just the highest sellers." },
    { title: "Reviewing Monthly or Quarterly Financials", description: "Convert raw revenue and expense figures from a financial statement into gross and net margin percentages for a clearer profitability picture." },
    { title: "Setting Freelance or Service Rates", description: "Use the markup calculation to confirm a quoted rate covers costs by the intended percentage before finalizing a price with a client." },
  ],
  mistakes: [
    { title: "Using markup and margin interchangeably", description: "A 50% markup is only a 33.3% margin; pricing decisions based on confusing the two consistently undercharge for the intended profit level." },
    { title: "Calculating gross margin and assuming it reflects overall profitability", description: "Gross margin ignores operating expenses entirely; a business can have a healthy gross margin and still be unprofitable after overhead." },
    { title: "Comparing your margin to the wrong industry benchmark", description: "A 5% margin might be strong for a grocery retailer and alarmingly low for a software company; benchmarks only make sense within the same industry." },
    { title: "Forgetting to include all operating expenses in net margin", description: "Leaving out costs like software subscriptions, credit card fees, or part-time labor when calculating net margin overstates actual profitability." },
  ],
  tips: [
    "Remember that markup is always a higher percentage than margin for the same sale, since it's divided by cost instead of revenue.",
    "Use the price-for-target-margin formula (cost ÷ (1 − target margin)) rather than simply adding a markup percentage when pricing for a specific margin goal.",
    "Track both gross and net margin together, since a strong gross margin with a weak net margin points to high operating costs, not a pricing problem.",
    "Compare your margin against your own historical numbers as well as industry benchmarks to catch cost creep early.",
    "Recalculate margin whenever a supplier cost changes, since even a small COGS increase can meaningfully shrink margin if prices stay the same.",
  ],
  glossary: [
    { title: "Gross Profit Margin", description: "The percentage of revenue remaining after subtracting only the cost of goods sold, before other operating expenses." },
    { title: "Net Profit Margin", description: "The percentage of revenue remaining after subtracting cost of goods sold and all other operating expenses." },
    { title: "Markup", description: "Profit expressed as a percentage of cost rather than revenue; always a higher number than the equivalent margin." },
    { title: "Cost of Goods Sold (COGS)", description: "The direct cost of producing or acquiring the products or services a business sells, excluding overhead expenses." },
    { title: "Operating Expenses", description: "The ongoing costs of running a business beyond COGS, such as rent, salaries, marketing, and software." },
  ],
};

export default guide;
