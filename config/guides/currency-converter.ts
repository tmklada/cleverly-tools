import type { ToolGuide } from "@/types/guide";

const guide: ToolGuide = {
  slug: "currency-converter",
  intro: [
    "A currency converter answers a simple but constantly moving question: how much is this amount of money worth in another currency right now. Exchange rates shift throughout the trading day based on global supply and demand, so a number that was accurate yesterday can already be slightly off today. This tool pulls live exchange rate data so you're working from a current rate rather than a stale textbook figure.",
    "This currency conversion calculator is built for travelers budgeting a trip, online shoppers checking the real cost of a purchase from a foreign store, freelancers invoicing international clients, and anyone comparing prices quoted in a currency they don't use daily. It covers 10 major world currencies, including the US dollar, euro, British pound, Japanese yen, and the Israeli shekel and UAE dirham, enough to handle the currencies most people actually need to convert between.",
    "The rate this tool shows is the mid-market rate, the midpoint between what currency traders are buying and selling at, which is the same reference rate you'd see on financial news sites. It is not the exact rate a bank or card network will apply to a real transaction, which almost always includes a markup, a distinction worth understanding before assuming a converted number is exactly what you'll pay.",
  ],
  sections: [
    {
      heading: "Mid-Market Rate vs Bank Rate: Why Your Bank Charges More",
      paragraphs: [
        "The mid-market rate, sometimes called the interbank rate, is the true midpoint of what a currency is trading for on global markets at a given moment, with no markup added. It's the rate you'll see quoted on financial news, in this calculator, and in most rate-lookup tools. Banks, credit card networks, and currency exchange counters almost never give customers this exact rate; instead they add a margin, typically 1% to 4% for banks and cards, and sometimes 5% to 10% or more at airport exchange kiosks.",
        "This markup is usually built into the rate itself rather than shown as a separate fee, which makes it easy to miss. If the mid-market rate for USD to EUR is 0.92, a bank might actually give you 0.90, silently keeping the 2% difference. On a $2,000 currency exchange, that 2% gap is $40 you don't see itemized anywhere.",
        "Knowing the mid-market rate from a tool like this gives you a benchmark: before exchanging money or making a foreign currency purchase, check the mid-market rate here, then compare it to the rate your bank, card, or exchange counter actually offers. A gap of more than 2-3% is worth shopping around for a better option, such as a fee-free travel card or a specialist currency transfer service.",
      ],
    },
    {
      heading: "How Exchange Rates Are Set and Why They Change",
      paragraphs: [
        "Currency exchange rates are set by the foreign exchange (forex) market, the largest financial market in the world, where banks, governments, and traders buy and sell currencies continuously. Rates move based on supply and demand, which in turn responds to factors like a country's interest rates, inflation, political stability, trade balances, and overall economic outlook. A country raising interest rates, for example, often strengthens its currency because higher returns attract foreign investment.",
        "Because trading happens nearly around the clock across global markets, exchange rates change constantly, not just once a day. This tool refreshes its rate data regularly, so the figures shown reflect a recent snapshot rather than a fixed daily rate, though for everyday budgeting purposes small intra-day movements rarely matter much.",
        "A useful mental model: exchange rates for major, actively traded currency pairs like USD/EUR or USD/GBP tend to move gradually, often less than 1% in a normal day, while currencies tied to smaller or less stable economies can swing more sharply on news events. This is worth keeping in mind if you're converting a large amount and timing matters.",
      ],
      bullets: [
        "Exchange rates reflect supply and demand on the global forex market",
        "Interest rates, inflation, and political stability all influence a currency's value",
        "Major currency pairs (USD, EUR, GBP) typically move less than smaller, less-traded currencies",
        "The mid-market rate is the reference point; banks and cards add their own margin on top",
      ],
    },
    {
      heading: "Converting for Travel: Cash, Cards, and ATM Withdrawals",
      paragraphs: [
        "For travel budgeting, this calculator is most useful as a planning tool, converting your home currency into the destination currency at the current mid-market rate to estimate costs before you go. The rate you'll actually get when paying will depend on the method: a no-foreign-fee travel card typically comes closest to the mid-market rate, a standard credit card usually adds a 1-3% foreign transaction fee, and airport currency exchange counters are consistently the worst rates available, often 8-15% below mid-market.",
        "ATM withdrawals abroad usually apply a rate close to mid-market but add a flat withdrawal fee and sometimes a percentage fee from your own bank. A helpful habit: use this calculator to check the fair mid-market conversion before a trip, then compare that number to what your card statement or ATM receipt actually shows after the transaction to see the real cost of the fees applied.",
      ],
    },
    {
      heading: "Converting for Online Shopping and International Invoices",
      paragraphs: [
        "When shopping on a foreign retailer's site or receiving an invoice in a currency you don't use daily, this tool gives you the fair reference price before the payment processor adds its own conversion. Many international checkout pages offer \"dynamic currency conversion,\" letting you pay in your home currency instead of the store's currency; this almost always uses a worse rate than letting your card network do the conversion, so it's usually better to decline it and pay in the store's original currency.",
        "For freelancers and small businesses invoicing across borders, checking the mid-market rate at invoice time (and noting it on the invoice) creates a clear, defensible reference point if a client's bank applies a different rate on their end, helping avoid disputes over the converted amount received.",
      ],
    },
    {
      heading: "Currency Converter Accuracy: What This Tool Does and Doesn't Cover",
      paragraphs: [
        "This calculator pulls live exchange rate data for 10 major currencies and calculates conversions by routing through US dollars as the reference currency, which is standard practice since most currency pairs are quoted against the dollar. The quick-convert buttons for 1, 10, 100, and 1,000 units let you see common amounts converted at a glance without retyping the amount each time.",
        "This tool does not support cryptocurrency conversion, and it covers 10 major fiat currencies rather than all roughly 180 currencies in circulation worldwide; for less common currencies, a broader financial data provider would be needed. As with any online rate tool, treat the result as a close, current estimate for budgeting and comparison rather than the guaranteed final rate a specific bank or payment provider will apply to an actual transaction.",
      ],
    },
  ],
  useCases: [
    { title: "Budgeting for International Travel", description: "Convert your home currency into your destination's currency to estimate daily spending money, accommodation costs, and overall trip budget before you go." },
    { title: "Checking Online Purchase Prices", description: "Convert a foreign retailer's listed price into your own currency to understand the real cost before completing checkout." },
    { title: "Comparing Bank and Card Exchange Rates", description: "Check the mid-market rate here, then compare it against what your bank, card, or exchange counter actually offers to spot excessive markups." },
    { title: "Invoicing International Clients", description: "Reference the current mid-market rate when sending or receiving a cross-border invoice to set a fair, transparent conversion point." },
    { title: "Tracking Remittances", description: "Estimate how much money sent home will be worth in the recipient's local currency at the current exchange rate." },
    { title: "Following Currency Movements", description: "Check how a currency pair has shifted by comparing today's converted amount to a previous calculation for the same amount." },
  ],
  mistakes: [
    { title: "Assuming the mid-market rate is what you'll actually pay", description: "Banks, cards, and exchange counters add their own margin on top of the mid-market rate, so the real cost of a transaction is usually a bit worse than this tool's headline number." },
    { title: "Accepting dynamic currency conversion at checkout", description: "Choosing to pay in your home currency at a foreign checkout or ATM usually applies a worse rate than letting your card network convert it; paying in the local currency is typically cheaper." },
    { title: "Exchanging cash at airport kiosks", description: "Airport currency exchange counters often charge some of the largest markups available, sometimes 8-15% below the mid-market rate shown here." },
    { title: "Treating the rate as fixed for the day", description: "Exchange rates move continuously during trading hours; a rate checked in the morning may differ noticeably from one checked in the evening, especially during volatile market periods." },
    { title: "Expecting cryptocurrency or exotic currency support", description: "This tool covers 10 major fiat currencies only; it does not include cryptocurrency pairs or less commonly traded national currencies." },
  ],
  tips: [
    "Use the mid-market rate from this tool as a benchmark, then compare it to your bank or card's actual rate before a large transaction.",
    "Decline dynamic currency conversion offers at foreign checkouts and ATMs; paying in the local currency is usually cheaper.",
    "Avoid airport currency exchange counters when possible, since they typically apply the largest markups.",
    "For large or time-sensitive conversions, check the rate more than once, since it updates continuously throughout the trading day.",
    "Use the quick-convert buttons to sanity-check a rate against a round number like 100 or 1,000 before applying it to your actual amount.",
    "When invoicing internationally, note the mid-market rate and date at the time of invoicing to avoid disputes over currency conversion later.",
  ],
  glossary: [
    { title: "Mid-Market Rate", description: "The midpoint between the buy and sell price of a currency on the global market, with no markup added; the reference rate this tool displays." },
    { title: "Foreign Exchange (Forex) Market", description: "The global decentralized market where currencies are traded continuously, setting the exchange rates between all currency pairs." },
    { title: "Exchange Rate Margin", description: "The markup a bank, card network, or exchange service adds on top of the mid-market rate, which is how most currency conversion services generate revenue." },
    { title: "Dynamic Currency Conversion (DCC)", description: "An option at some foreign checkouts and ATMs to pay in your home currency instead of the local one, which typically applies a worse exchange rate." },
    { title: "Base Currency", description: "The reference currency (US dollars, in this tool) that other currencies' rates are quoted against when calculating a conversion." },
  ],
};

export default guide;
