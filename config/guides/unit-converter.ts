import type { ToolGuide } from "@/types/guide";

const guide: ToolGuide = {
  slug: "unit-converter",
  intro: [
    "A unit converter takes the guesswork out of switching between measurement systems, whether you're reading a recipe in milliliters and only own cups, checking a European shoe size, or converting a US contractor's square-foot quote into square meters for a client abroad. Instead of memorizing dozens of conversion factors or hunting down the right formula each time, this tool covers eight of the most commonly needed categories, length, weight, temperature, time, volume, area, speed, and digital storage, in one place.",
    "This unit conversion calculator is built for students checking homework, travelers converting distances and luggage weights, cooks scaling recipes between metric and US customary measures, and professionals in construction, shipping, or manufacturing who move between metric and imperial units daily. Every measurement category supports both metric (SI) units like meters, kilograms, and Celsius and imperial or US customary units like feet, pounds, and Fahrenheit, so it works no matter which system you're starting from.",
    "Manual unit conversion means looking up or remembering a conversion factor, multiplying or dividing correctly, and often converting through an intermediate step, kilometers to meters to feet, for example. A mistake in any step throws off the whole result. This calculator applies the exact conversion factor for the two units you pick and updates the answer instantly, so you can compare several unit pairs in seconds without re-deriving the math each time.",
  ],
  sections: [
    {
      heading: "Metric to Imperial Conversion Chart (Length, Weight, Volume)",
      paragraphs: [
        "The most frequent conversions people search for involve going between the metric system and imperial or US customary units. For length, 1 meter equals about 3.28 feet, 1 kilometer equals about 0.621 miles, and 1 inch equals exactly 2.54 centimeters. For weight, 1 kilogram equals about 2.205 pounds, and 1 pound equals about 453.6 grams. For volume, 1 liter equals about 0.264 US gallons, and 1 US gallon equals about 3.785 liters.",
        "These figures are approximations rounded for readability, but the calculator itself uses full-precision constants, for example 1 mile equals exactly 1,609.344 meters and 1 pound equals exactly 0.45359237 kilograms, so results stay accurate even for large numbers or scientific work. A quick example: converting 5 miles to kilometers means 5 × 1.609344, which gives 8.05 kilometers exactly.",
        "Area conversions follow the same pattern but with squared factors, which is where manual math trips people up most. Since 1 meter equals about 3.28 feet, 1 square meter equals about 3.28² or 10.76 square feet, not 3.28 square feet. The calculator handles this automatically since area units store their own dedicated conversion factor rather than squaring a length factor on the fly.",
      ],
      bullets: [
        "1 meter ≈ 3.28 feet | 1 kilometer ≈ 0.621 miles | 1 inch = 2.54 cm exactly",
        "1 kilogram ≈ 2.205 pounds | 1 pound = 453.59237 grams exactly",
        "1 liter ≈ 0.264 US gallons | 1 US gallon = 3.785411784 liters exactly",
        "1 square meter ≈ 10.76 square feet | 1 acre = 4,046.86 square meters",
        "1 m/s ≈ 3.6 km/h ≈ 2.237 mph",
      ],
    },
    {
      heading: "How to Convert Units Manually: Dimensional Analysis",
      paragraphs: [
        "The standard method for converting by hand is dimensional analysis: multiply the starting value by a conversion factor written as a fraction so the unwanted unit cancels out. To convert 12 feet to meters, use the fraction (0.3048 meters / 1 foot): 12 feet × 0.3048 meters/foot = 3.6576 meters. The unit \"feet\" appears once on top and once on the bottom, so it cancels, leaving meters.",
        "For multi-step conversions, chain several fractions together. Converting 60 miles per hour to meters per second requires two conversions at once, distance and time: 60 miles/hour × 1609.344 meters/mile × 1 hour/3600 seconds ≈ 26.82 meters/second. This is exactly the kind of calculation where a calculator with a dedicated Speed category saves time, since it applies both conversions in one step.",
        "The key habit worth building, even when using an automated tool, is sanity-checking the direction of the conversion: if you're going from a smaller unit to a larger one (centimeters to meters), the number should get smaller, and vice versa. This catches the most common manual error, multiplying when you should have divided.",
      ],
    },
    {
      heading: "Common Length, Weight, and Volume Conversions People Search For",
      paragraphs: [
        "Some conversions come up constantly: feet to meters for real estate and construction, pounds to kilograms for luggage limits and body weight, and liters to gallons for fuel economy and cooking. A US airline's 50-pound checked bag limit is about 22.68 kilograms, useful to know before weighing luggage on a metric scale. A European car's fuel economy rating in liters per 100 km doesn't translate directly to US miles per gallon, it's an inverse relationship, so converting the units alone isn't enough; the calculation needs to also invert the ratio.",
        "In cooking, volume conversions are especially fiddly because US customary units nest awkwardly: 1 US cup equals 16 tablespoons equals 48 teaspoons, and 1 US gallon equals 4 quarts equals 8 pints equals 16 cups. Recipe conversions between metric and US volumes also technically depend on ingredient density since a cup measures volume, not weight, but for a straight volume-to-volume conversion (liters to cups, for example), this tool gives the standard equivalence.",
      ],
    },
    {
      heading: "Area and Speed Conversions for Real Estate, Land, and Travel",
      paragraphs: [
        "Area conversions matter most for real estate and land measurement: 1 acre equals about 4,047 square meters or 0.405 hectares, and 1 hectare equals 2.471 acres. A US home listed at 2,000 square feet is about 185.8 square meters, a useful check when comparing listings across countries that use different standard units.",
        "Speed conversions come up in travel and sports: a car doing 100 km/h is traveling about 62.1 mph, and a runner's pace in minutes per kilometer converts to minutes per mile by multiplying by roughly 1.609. Nautical contexts use knots, where 1 knot equals 1 nautical mile per hour, or about 1.151 mph, a detail that matters for anyone converting maritime or aviation speeds into everyday units.",
      ],
    },
    {
      heading: "Why Conversion Factors Differ: Exact vs Approximate Constants",
      paragraphs: [
        "Some conversion factors are defined exactly by international agreement: 1 inch is defined as exactly 2.54 centimeters, and 1 pound is defined as exactly 0.45359237 kilograms. Others, like the conversion between a US gallon and a liter, are exact by definition of the US gallon (231 cubic inches) but look like long decimals once expressed in metric. This calculator uses these exact defined constants rather than rounded textbook approximations, which matters when converting very large or very precise values, like engineering measurements or bulk shipping weights, where rounding errors compound.",
        "Temperature is the one category that does not work by multiplication at all, and this tool handles it with the correct offset formulas rather than a conversion factor. Celsius to Fahrenheit is °F = °C × 9/5 + 32, Celsius to Kelvin is K = °C + 273.15, and Rankine is the Fahrenheit-sized degree counted from absolute zero (°R = °C × 9/5 + 491.67). That is why 100 °C is 212 °F and 373.15 K, and why −40 °C and −40 °F are the same temperature, the single point where the two scales cross. The Time category uses the average Gregorian calendar length for months and years (1 year = 365.2425 days), and the Digital Storage category uses decimal SI units where 1 KB = 1,000 bytes, the convention drive manufacturers use, which is labelled directly in the tool.",
      ],
    },
  ],
  useCases: [
    { title: "Planning International Travel", description: "Convert distances, luggage weight limits, and speed limits between metric and imperial before a trip so road signs and airline rules make sense immediately." },
    { title: "Cooking From Foreign Recipes", description: "Convert milliliters and grams from a European or Asian recipe into US cups, tablespoons, and ounces without guessing at approximate substitutions." },
    { title: "Comparing Real Estate Listings", description: "Convert square meters to square feet or hectares to acres when comparing property sizes listed in a different country's standard units." },
    { title: "Construction and DIY Projects", description: "Convert material measurements between metric and imperial when working from plans, tools, or supplies that use a different unit system." },
    { title: "Checking Fitness and Sports Data", description: "Convert running pace, cycling speed, or body weight between metric and imperial units to compare against goals or other athletes' stats." },
    { title: "Academic and Scientific Work", description: "Quickly verify unit conversions for homework or lab reports without manually looking up conversion constants each time." },
  ],
  mistakes: [
    { title: "Squaring a length factor incorrectly for area", description: "Multiplying a linear conversion factor directly instead of squaring it (or using a dedicated area factor) produces area results that are off by a large margin." },
    { title: "Forgetting which gallon or ton is meant", description: "US and imperial gallons differ (3.785 vs 4.546 liters), as do the short ton, long ton, and metric ton, so picking the wrong regional unit skews results." },
    { title: "Rounding too early in multi-step conversions", description: "Rounding an intermediate result before the final step compounds error, especially over several chained conversions like mph to m/s." },
    { title: "Assuming volume converts directly to weight", description: "A cup or liter measures volume, not mass, so converting a recipe's volume units doesn't account for ingredient density; flour and water don't weigh the same per cup." },
    { title: "Converting temperature with a multiplication factor", description: "Temperature needs an offset formula (°F = °C × 9/5 + 32), not a plain multiplier, so scaling 20 °C by 1.8 gives 36, not the correct 68 °F. Use the Temperature category, which applies the offset for you." },
    { title: "Mixing up 1,000-byte and 1,024-byte storage units", description: "This tool's Digital Storage category uses decimal SI units (1 KB = 1,000 bytes), the convention drive makers use. Windows reports binary units (1 KiB = 1,024 bytes), which is why a 1 TB drive shows as roughly 931 GB there." },
  ],
  tips: [
    "Double-check whether a source is using US customary or imperial units, since gallons and some other units differ between the two systems.",
    "For area conversions, always use a dedicated area unit rather than squaring a length conversion factor by hand.",
    "When converting recipe volumes, remember that ingredient density still matters if you ever need to convert to weight.",
    "Use the swap button to quickly check a conversion in both directions without re-selecting units.",
    "For very large or very small numbers, check the exponential notation the tool shows rather than rounding by eye.",
    "Bookmark the specific category you use most, like Length or Volume, so repeat conversions are faster to set up.",
  ],
  glossary: [
    { title: "SI Units", description: "The International System of Units, the modern form of the metric system, using base units like the meter, kilogram, and liter." },
    { title: "Imperial Units", description: "The system of measurement historically used in the United Kingdom, including units like the mile, pound, and imperial gallon, which differs slightly from US customary units." },
    { title: "US Customary Units", description: "The measurement system used in the United States, similar to imperial units but with some differences, most notably the US gallon and fluid ounce." },
    { title: "Conversion Factor", description: "The fixed multiplier used to convert a value from one unit to another, such as 0.3048 to convert feet to meters." },
    { title: "Dimensional Analysis", description: "A method of converting units by multiplying by conversion fractions so that unwanted units cancel out, leaving the desired unit." },
    { title: "Base Unit", description: "The reference unit within a category (such as meters for length or liters for volume) that all other units in that category are converted through." },
  ],
};

export default guide;
