import type { ToolGuide } from "@/types/guide";

const guide: ToolGuide = {
  slug: "tip-calculator",
  intro: [
    "A tip calculator takes a bill total and a tip percentage and instantly gives you the tip amount, the grand total, and, if you're out with a group, exactly how much each person owes. It removes the mental math of applying a percentage under time pressure at a restaurant table, which is where most tipping mistakes and awkward under-tipping happen.",
    "This restaurant tip calculator and bill splitter is built for everyday situations: dinner with friends where the check needs to be split evenly, a solo meal where you just want to confirm 18% versus 20% before tapping a card machine, or a group outing where uneven shares need to be worked out fast. It also supports rounding the total up to a clean number, useful when paying with cash.",
    "Doing this by hand means calculating a percentage of the subtotal, deciding whether tax should be included in that percentage, and then dividing everything evenly (or unevenly) across a group, all while a table of people wait for an answer. An online tip calculator does all three steps at once and shows the per-person breakdown clearly enough to read off a phone screen.",
  ],
  sections: [
    {
      heading: "How to Calculate a Tip: The Basic Formula",
      paragraphs: [
        "The core tip formula is simple: tip amount = bill × (tip percentage ÷ 100), and total = bill + tip amount. For a $85.00 bill at a 20% tip, the tip amount is 85 × 0.20 = $17.00, bringing the total to $102.00. This calculator applies that formula the moment you enter a bill amount and pick a percentage, and updates instantly if you change either number.",
        "Splitting the total across a group is just as direct: divide both the tip amount and the total by the number of people. For that same $85 bill split four ways with a 20% tip, each person pays a $4.25 tip share and a $25.50 total share. This calculator shows both the per-person tip and the per-person total separately, so a group can see exactly what portion of their payment is the tip versus the food and drink itself.",
      ],
      bullets: [
        "Tip amount = bill × (tip % ÷ 100)",
        "Total = bill + tip amount",
        "Tip per person = tip amount ÷ number of people",
        "Total per person = total ÷ number of people",
      ],
    },
    {
      heading: "Tipping Etiquette by Country: How Much to Tip Around the World",
      paragraphs: [
        "Tipping norms vary enormously by country, and using U.S.-style tipping habits abroad can either overpay unnecessarily or feel out of place depending on local custom. In the United States and Canada, 15-20% at restaurants is standard, with many servers relying on tips as a significant part of their income. In the United Kingdom and much of Western Europe, a smaller tip of 5-10%, or simply rounding up the bill, is typical, and a service charge is often already included on the check.",
        "In Japan, tipping is generally not expected and can even be seen as awkward or confusing, since excellent service is considered part of the standard job, not something requiring extra payment. In Australia and New Zealand, tipping is optional and modest (rounding up or 10% for great service) since minimum wages there are structured differently than in the U.S. Always check whether a service charge is already added to the bill before tipping on top of it, since double-tipping is a common mistake for travelers.",
      ],
      bullets: [
        "United States / Canada: 15-20% standard at restaurants",
        "United Kingdom / Western Europe: 5-10% or round up, often service-charge inclusive",
        "Japan: tipping generally not expected or practiced",
        "Australia / New Zealand: optional, typically 10% for excellent service",
      ],
    },
    {
      heading: "How Much to Tip for Different Services: Restaurants, Delivery, and More",
      paragraphs: [
        "Tip percentages also shift depending on the type of service, not just the country. In the U.S., standard restaurant tipping guidance suggests 15% for adequate service, 18-20% for good service, and 25% or more for exceptional service. Food delivery drivers are typically tipped 15-20% of the order total or a flat $3-5 for shorter trips, while taxi and rideshare drivers usually get 10-15%, sometimes handled automatically through the app.",
        "For services like haircuts, spa treatments, or hotel housekeeping, tipping conventions run differently again, often a flat amount per service ($5-20 depending on the service type and region) rather than a percentage of a bill. When in doubt for a service this calculator wasn't specifically built for, 15-20% is a reasonable general default in tipping-culture countries, adjusted up for exceptional service and down for below-average service.",
      ],
    },
    {
      heading: "Tipping on Pre-Tax vs Post-Tax Total: Does It Matter?",
      paragraphs: [
        "There are two common approaches to calculating a restaurant tip: applying the percentage to the pre-tax subtotal, or applying it to the total including sales tax. Tipping on the pre-tax subtotal is the more traditional and widely recommended approach, since the tip is meant to reward the server's service, not the local tax rate, and this is what most etiquette guides suggest.",
        "The practical difference is usually small. On a $100 bill with 8% sales tax ($108 total) at a 20% tip, tipping on the pre-tax subtotal gives a $20 tip, while tipping on the post-tax total gives $21.60, a $1.60 difference. Either approach is broadly acceptable and won't be seen as under-tipping by most servers; use whichever matches your personal preference or local custom, and this calculator lets you apply the percentage to your entered bill amount directly.",
      ],
    },
    {
      heading: "How to Split a Bill With Tip Fairly Among a Group",
      paragraphs: [
        "The simplest way to split a shared bill is evenly: add the tip to the subtotal, then divide the total by the number of people, which is exactly what this calculator does when you enter a headcount. This works well for groups who ordered roughly similar amounts and don't want to itemize who had what.",
        "For groups where one person ordered a $40 steak and another had a $12 salad, an even split can feel unfair, and some groups prefer to calculate each person's individual subtotal, add a proportional share of tax and tip to each, and settle up separately. This calculator handles the even-split case directly; for itemized splitting, calculate each person's own subtotal first, then run that individual amount through the tip calculator separately to get their fair share of the tip and total.",
      ],
    },
  ],
  useCases: [
    { title: "Splitting a Group Dinner Bill", description: "Enter the total bill and number of diners to see exactly what each person owes, including their share of the tip." },
    { title: "Deciding Between Tip Percentages", description: "Compare the tip amount at 15%, 18%, and 20% before choosing what to leave, especially for a borderline service experience." },
    { title: "Rounding Up for a Cash Tip", description: "Use the round-up option to land on a clean total that's easy to pay with cash without needing exact change." },
    { title: "Tipping for Delivery or Rideshare", description: "Apply a custom percentage or flat-equivalent amount to a delivery or ride total to quickly figure out a fair tip." },
    { title: "Traveling in a Different Tipping Culture", description: "Check standard local tipping norms before applying a percentage, since expectations vary significantly by country." },
  ],
  mistakes: [
    { title: "Tipping on top of an already-included service charge", description: "Some restaurants, especially in Europe, add a service charge automatically; tipping again on top of it means paying twice for the same thing." },
    { title: "Assuming U.S. tipping norms apply everywhere", description: "A 20% tip in Japan or many parts of Asia can come across as unusual or even confusing rather than generous." },
    { title: "Splitting unevenly ordered bills equally without discussion", description: "An even split can shortchange someone who ordered less, especially in larger groups; agree on the split method before the bill arrives." },
    { title: "Forgetting to account for rounding when paying by card", description: "If a group is paying with multiple cards, small rounding differences from an even split can leave a few cents unaccounted for." },
    { title: "Under-tipping for exceptional service out of habit", description: "Defaulting to the same percentage regardless of service quality misses the chance to reward genuinely excellent service appropriately." },
  ],
  tips: [
    "Agree on how the bill will be split before ordering if the group's orders are likely to be very uneven.",
    "Check the bill for an already-included service charge before adding a tip on top of it.",
    "When traveling, look up local tipping norms in advance rather than defaulting to your home country's percentage.",
    "Use the round-up option when paying cash to avoid dealing with small coins in change.",
    "Tip on the pre-tax subtotal if you want to follow the more traditional etiquette guideline.",
    "For delivery and rideshare, a flat minimum ($3-5) is often more appropriate than a percentage on very small orders.",
  ],
  glossary: [
    { title: "Gratuity", description: "Another term for a tip: a voluntary payment given in addition to the bill to reward service." },
    { title: "Service Charge", description: "A mandatory fee, often a fixed percentage, added automatically to a bill by some restaurants, distinct from a voluntary tip." },
    { title: "Subtotal", description: "The bill amount before sales tax and tip are added." },
    { title: "Bill Splitting", description: "Dividing a shared bill, either evenly or by individual order, among multiple people paying together." },
    { title: "Tip Percentage", description: "The portion of the bill, expressed as a percentage, given as a tip, commonly 15-20% at restaurants in the United States." },
  ],
};

export default guide;
