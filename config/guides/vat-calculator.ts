import type { ToolGuide } from "@/types/guide";

const guide: ToolGuide = {
  slug: "vat-calculator",
  intro: [
    "Value Added Tax, or VAT, is a consumption tax applied at each stage of a product's sale in most countries outside the United States, and it shows up everywhere from restaurant receipts to business invoices to online checkout pages. The tricky part isn't the concept, it's the arithmetic: adding VAT to a price uses one formula, and pulling VAT back out of a price that already includes it uses a different one, and mixing the two up produces a wrong number every time.",
    "This VAT calculator is built for small business owners pricing products or writing invoices, freelancers who need to quote clients a price with or without tax, shoppers trying to figure out the pre-tax cost of something, and anyone doing bookkeeping who needs to split a gross receipt total into its net and tax components. It handles both directions, adding VAT to a net price and removing VAT from a gross price, at any rate you enter.",
    "VAT rates vary widely by country and even by product category within a country, so rather than hardcoding one rate, this tool lets you pick from common preset rates or enter any custom percentage, which means it works for VAT in the EU and UK, GST in Australia, and any other percentage-based sales tax or value-added tax system worldwide.",
  ],
  sections: [
    {
      heading: "How to Calculate VAT Inclusive and Exclusive Prices",
      paragraphs: [
        "Adding VAT to a net (pre-tax) price uses this formula: Gross Price = Net Price × (1 + VAT rate). For a $100 net price with 20% VAT, that's $100 × 1.20 = $120 gross. The VAT amount itself is simply the gross price minus the net price, or $20 in this example. This is the calculation a business does when setting a shelf price or invoice total from a known net cost.",
        "Removing VAT from a gross (tax-inclusive) price works differently, and this is where manual calculations most often go wrong: Net Price = Gross Price ÷ (1 + VAT rate). For a $120 gross price at 20% VAT, the net price is $120 ÷ 1.20 = $100, not $120 minus 20% of $120 (which would incorrectly give $96). The VAT amount is then the gross price minus that net price, or $20.",
        "The reason simply subtracting a percentage doesn't work when removing VAT is that the 20% in a VAT-inclusive price is 20% of the original net amount, not 20% of the gross total you're starting from. Since the net amount is smaller than the gross amount, taking 20% of the larger gross figure overstates the tax and understates the true net price. This calculator applies the correct divide-based formula automatically in its \"Remove VAT\" mode.",
      ],
      bullets: [
        "Add VAT: Gross = Net × (1 + rate) — e.g. $100 × 1.20 = $120 at 20% VAT",
        "Remove VAT: Net = Gross ÷ (1 + rate) — e.g. $120 ÷ 1.20 = $100 at 20% VAT",
        "VAT amount = Gross − Net either way",
        "Never subtract the VAT percentage directly from a gross price; it overstates the tax",
      ],
    },
    {
      heading: "VAT Rates by Country (EU, UK, Israel, UAE, and Beyond)",
      paragraphs: [
        "Standard VAT rates vary significantly by country: the UK charges 20%, Germany charges 19%, France charges 20%, and the Netherlands charges 21%. Israel applies an 18% VAT on most goods and services. In the Gulf region, the UAE charges a 5% VAT, one of the lowest rates globally. Outside VAT systems specifically, Australia uses a 10% Goods and Services Tax (GST), which functions the same way mathematically even though it isn't called VAT.",
        "Many countries also apply reduced VAT rates to specific categories, like food, books, or children's clothing, alongside their standard rate; the UK, for example, applies 0% to most food and 5% to domestic energy alongside its 20% standard rate. This calculator's preset buttons cover the most common standard rates (5%, 10%, 15%, 20%, 21%, 23%, 25%), and the custom rate field handles any other percentage, including Israel's 18% or a country-specific reduced rate.",
        "Because rates and rules change and vary by product category and country, always confirm the exact applicable rate for your specific transaction with an official source or accountant rather than assuming a country's headline rate applies uniformly to everything sold there.",
      ],
    },
    {
      heading: "VAT for Invoices: Net Price, VAT Amount, and Gross Total",
      paragraphs: [
        "A compliant VAT invoice typically needs to show all three figures clearly: the net price (the amount before tax, which is the seller's actual revenue for goods/services), the VAT amount (the tax being collected on behalf of the government), and the gross price (the total the customer actually pays). This calculator displays all three simultaneously, whichever direction you're calculating from, making it straightforward to pull the numbers you need directly onto an invoice.",
        "For a freelancer or small business, working in the \"Add VAT\" direction is typical when quoting a price, you know your net rate for the work and need to add the applicable VAT to invoice the client correctly. Working in the \"Remove VAT\" direction is more common when reconciling receipts or expenses, since a purchase receipt shows the gross amount paid and you need the net cost for expense reporting or reclaiming input VAT.",
      ],
    },
    {
      heading: "Reclaiming VAT: Input Tax vs Output Tax",
      paragraphs: [
        "In a standard VAT system, VAT-registered businesses charge VAT on their sales (called output tax) and pay VAT on their own business purchases (called input tax). At the end of a filing period, the business pays the government the difference between output tax collected and input tax paid, or receives a refund if input tax exceeded output tax. This calculator helps with the arithmetic on each individual transaction, splitting a price into net and VAT components, but it doesn't track running totals or file returns.",
        "For a purchase receipt showing only a gross total, use the \"Remove VAT\" mode to find the net cost and the VAT amount paid, which is the figure typically needed when claiming input VAT back or recording the correct pre-tax expense in bookkeeping software.",
      ],
    },
    {
      heading: "Common VAT Calculation Scenarios and Worked Examples",
      paragraphs: [
        "Scenario 1, pricing a product: a business wants to sell a product for a $50 net price in a country with 21% VAT. Using the Add VAT mode: $50 × 1.21 = $60.50 gross price, with $10.50 in VAT. Scenario 2, reading a receipt: a $60.50 receipt total at the same 21% rate breaks down (Remove VAT mode) to a $50 net cost and $10.50 in VAT, confirming the two directions are exact inverses of each other.",
        "Scenario 3, comparing net prices across VAT rates: the same $100 net price results in a $118 gross total in Israel (18% VAT) versus a $121 gross total in the Netherlands (21% VAT), a $3 difference driven entirely by the different tax rate applied to an identical underlying price. This kind of comparison is useful when pricing the same product for customers in different countries.",
      ],
    },
  ],
  useCases: [
    { title: "Pricing Products for Sale", description: "Add the applicable VAT rate to a net cost to set the correct customer-facing price that includes tax." },
    { title: "Writing Client Invoices", description: "Calculate the VAT amount to add to a quoted net rate so an invoice shows the net fee, VAT, and total correctly." },
    { title: "Reconciling Business Expenses", description: "Remove VAT from a gross receipt total to find the net cost for expense reporting or reclaiming input VAT." },
    { title: "Comparing Prices Across Countries", description: "See how the same net price translates into different gross totals under different countries' VAT or GST rates." },
    { title: "Checking a Receipt or Bill", description: "Verify that the VAT amount shown on a receipt matches what it should be for the stated rate and price." },
    { title: "Quoting International Clients", description: "Show a client both the VAT-exclusive and VAT-inclusive price so there's no confusion about which figure applies to their invoice." },
  ],
  mistakes: [
    { title: "Subtracting the VAT percentage directly from a gross price", description: "Removing VAT requires dividing by (1 + rate), not subtracting the percentage from the gross amount, which overstates the VAT and understates the net price." },
    { title: "Using the wrong country's rate", description: "VAT rates differ significantly by country (18% in Israel, 20% in the UK, 5% in the UAE), so using a default or remembered rate instead of confirming the correct one can misstate an invoice or price." },
    { title: "Ignoring reduced rates for specific categories", description: "Some goods and services qualify for a reduced or zero VAT rate in many countries; applying the standard rate to everything can overcharge tax on eligible items." },
    { title: "Mixing up net and gross on an invoice", description: "Labeling a VAT-inclusive price as the net amount (or vice versa) leads to charging or reporting the wrong tax amount." },
    { title: "Not verifying current rates before filing", description: "VAT rates and category rules change periodically, so relying on memory instead of checking the current official rate can lead to filing errors." },
  ],
  tips: [
    "Use the Add VAT mode when you know the net price and need the customer-facing total, and Remove VAT mode when you have a gross receipt and need the net cost.",
    "Double-check which VAT rate applies to your specific country and product category rather than assuming the standard rate covers everything.",
    "When quoting international clients, show both the net and gross price so there's no ambiguity about which figure includes tax.",
    "Use the custom rate field for any rate not covered by the presets, including Israel's 18% or a country's reduced rate.",
    "For bookkeeping, always keep the net, VAT, and gross figures separate on records rather than only storing the total paid.",
    "Re-verify the applicable VAT rate periodically, since governments do adjust rates and category rules over time.",
  ],
  glossary: [
    { title: "VAT (Value Added Tax)", description: "A consumption tax applied at each stage of production and sale in most countries outside the US, ultimately paid by the end consumer." },
    { title: "Net Price", description: "The price of a good or service before VAT or other taxes are added." },
    { title: "Gross Price", description: "The total price a customer pays, including VAT or other applicable taxes." },
    { title: "Output Tax", description: "The VAT a business charges its customers on sales, which it collects on behalf of the government." },
    { title: "Input Tax", description: "The VAT a business pays on its own purchases, which can often be reclaimed against the VAT it owes on sales." },
    { title: "GST (Goods and Services Tax)", description: "A consumption tax used in countries like Australia and Canada that functions mathematically the same way as VAT, just under a different name." },
  ],
};

export default guide;
