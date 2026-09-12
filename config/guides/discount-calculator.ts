import type { ToolGuide } from "@/types/guide";

const guide: ToolGuide = {
  slug: "discount-calculator",
  intro: [
    "A discount calculator handles the three questions that come up around a sale price: what's the final price after a percentage discount, what percentage discount does a sale price actually represent, and what happens when two or more coupons or markdowns are applied to the same item one after another. Enter the numbers you have and the tool calculates the rest, which removes the guesswork from a checkout math that's surprisingly easy to get wrong under pressure.",
    "This is useful for shoppers comparing sale prices before checkout, retailers setting markdown pricing, and anyone trying to figure out whether a coupon stack is actually as good a deal as it sounds. The math behind a single discount is simple, but stacked discounts in particular behave in a way that isn't intuitive — most people assume percentages add together, and that assumption is wrong.",
    "Doing this by hand isn't hard for a single discount, but it gets error-prone fast once a second coupon, a rounding step, or a reverse calculation (working backward from a sale price to the original) enters the picture. A calculator applies the correct formula for whichever direction you're solving, so the final number matches what the register will actually charge.",
  ],
  sections: [
    {
      heading: "How to Calculate a Percentage Discount and the Final Price",
      paragraphs: [
        "To find the price after a percentage discount, convert the discount percentage to a decimal and subtract it from 1, then multiply by the original price. The formula is: sale price = original price × (1 − discount ÷ 100). The amount saved is simply the original price minus the sale price, or equivalently, original price × (discount ÷ 100).",
        "For example, a $100 item with a 20% discount: sale price = 100 × (1 − 0.20), or 100 × 0.80, which equals $80. The amount saved is $20, matching 20% of the original $100. The same formula works regardless of the item's price — a $250 item at 20% off follows the identical calculation, just with different numbers.",
      ],
      bullets: [
        "Formula: sale price = original price × (1 − discount ÷ 100)",
        "Amount saved = original price × (discount ÷ 100)",
        "Example: $100 at 20% off → $100 × 0.80 = $80 sale price, $20 saved",
      ],
    },
    {
      heading: "How to Find What Discount Percentage Was Applied",
      paragraphs: [
        "Sometimes you already know the original price and the final sale price and want to know what percentage discount that represents — useful for comparing two different sales that are advertised with dollar amounts instead of percentages. The formula is: discount % = ((original price − sale price) ÷ original price) × 100.",
        "For example, an item originally priced at $100 that's now selling for $80: ((100 − 80) ÷ 100) × 100 equals 20%. This works in reverse for any pair of prices — a $250 item now selling for $200 is also a 20% discount, since ((250 − 200) ÷ 250) × 100 equals 20% as well, even though the dollar amount saved is different.",
      ],
      bullets: [
        "Formula: discount % = ((original price − sale price) ÷ original price) × 100",
        "Example: $100 original, $80 sale price → 20% discount",
      ],
    },
    {
      heading: "Stacked Discounts: Why 20% + 10% Is Not 30%",
      paragraphs: [
        "When two discounts apply to the same purchase, such as a storewide sale plus a coupon code, it's tempting to just add the two percentages together. That's incorrect, because the second discount applies to the already-reduced price from the first discount, not to the original price — the math has to be done as two sequential steps, not one combined percentage.",
        "For example, a $100 item with 20% off followed by an additional 10% off: the first discount brings the price to $80 (100 × 0.80). The second 10% discount then applies to that $80, not the original $100, bringing the price to $72 (80 × 0.90). The combined discount is 28%, not the 30% you'd get by simply adding the two percentages together.",
      ],
      bullets: [
        "Correct method: apply each discount to the running price, one after another",
        "Example: $100 → 20% off → $80 → additional 10% off → $72 (a 28% total discount, not 30%)",
        "Shortcut: multiply the surviving percentages together — 0.80 × 0.90 = 0.72, or 72% of the original price",
      ],
    },
    {
      heading: "How to Calculate the Original Price From a Sale Price and Discount",
      paragraphs: [
        "If you know the sale price and the discount percentage that was applied but not the original price, you can work backward using: original price = sale price ÷ (1 − discount ÷ 100). This is useful for confirming an advertised discount actually matches the difference between the two prices shown, or for figuring out what an item cost before a markdown.",
        "For example, if an item is on sale for $72 after a 28% discount, the original price is 72 ÷ (1 − 0.28), or 72 ÷ 0.72, which equals $100. This reverse calculation is also the right way to double-check a stacked-discount result — plugging the final price and the combined percentage back into this formula should return the original price you started with.",
      ],
      bullets: [
        "Formula: original price = sale price ÷ (1 − discount ÷ 100)",
        "Example: $72 sale price after a 28% discount → $72 ÷ 0.72 = $100 original price",
      ],
    },
    {
      heading: "Discounts vs Markdowns vs Coupons: What's the Difference",
      paragraphs: [
        "These terms describe the same underlying math — a reduction from an original price — but they're used in slightly different contexts. A discount is the general term for any price reduction, whether it's automatic at checkout or requires an action to claim. A markdown specifically refers to a retailer permanently lowering the listed price of an item, often for clearance or end-of-season inventory.",
        "A coupon is a specific mechanism for claiming a discount, usually requiring a code, a physical clipping, or a membership, and coupons are the type of discount most likely to be stacked with a separate storewide sale. Regardless of the label, the calculation is identical once you know the percentage or dollar amount being taken off the current price — the terminology just describes how the reduction is being offered, not how it's calculated.",
      ],
    },
  ],
  useCases: [
    { title: "Comparing Two Different Sales", description: "Convert a dollar-off sale and a percentage-off sale into the same terms to see which one actually offers the better price." },
    { title: "Stacking a Coupon With a Storewide Sale", description: "Calculate the true combined discount when a coupon code applies on top of an already-discounted sale price." },
    { title: "Setting Clearance or Markdown Pricing", description: "Work out the exact sale price needed to hit a target discount percentage when marking down inventory." },
    { title: "Verifying an Advertised Discount", description: "Check that the difference between an original and sale price actually matches the discount percentage a store is advertising." },
    { title: "Finding the Pre-Sale Price of an Item", description: "Work backward from a current sale price and known discount to figure out what an item cost before the markdown." },
  ],
  mistakes: [
    { title: "Adding stacked discount percentages together", description: "Two discounts of 20% and 10% do not combine into 30% off; each discount applies to the already-reduced price, giving 28% off instead." },
    { title: "Applying a discount to the wrong price", description: "A second coupon should apply to the current discounted price, not the original price, when discounts are stacked." },
    { title: "Mixing up the original and sale price in the discount-percentage formula", description: "Swapping which number is the original and which is the sale price in the formula produces an incorrect or negative percentage." },
    { title: "Rounding too early in a multi-step calculation", description: "Rounding the price after the first discount before applying a second discount can introduce small errors that compound across multiple steps." },
  ],
  tips: [
    "For stacked discounts, multiply the surviving percentages together (like 0.80 × 0.90) rather than adding the discount percentages.",
    "Use the reverse formula to double-check that an advertised discount matches the actual difference between the original and sale price.",
    "When comparing a percentage-off deal to a dollar-off deal, convert both to a final price on the same item to compare fairly.",
    "Keep full decimal precision through each step of a stacked discount calculation and round only at the very end.",
    "Remember that the order you apply two discounts in doesn't change the final price, since multiplication is commutative either way.",
  ],
  glossary: [
    { title: "Discount", description: "A reduction from an original price, expressed as either a percentage or a fixed dollar amount." },
    { title: "Stacked Discount", description: "Two or more discounts applied to the same purchase in sequence, where each one applies to the already-reduced price." },
    { title: "Markdown", description: "A permanent reduction to a retailer's listed price, often used for clearance or end-of-season inventory." },
    { title: "Original Price", description: "The full, pre-discount price of an item, used as the base value in discount percentage calculations." },
    { title: "Combined Discount Rate", description: "The single overall percentage reduction that results from applying multiple sequential discounts to the same price." },
  ],
};

export default guide;
