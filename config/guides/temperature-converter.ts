import type { ToolGuide } from "@/types/guide";

const guide: ToolGuide = {
  slug: "temperature-converter",
  intro: [
    "A temperature converter turns a single number into its equivalent on the other two major scales, so you never have to remember whether to multiply by 9/5 or 5/9, or whether 32 gets added or subtracted. Type a value in Celsius, Fahrenheit, or Kelvin and the other two fields update immediately, which makes it useful for cooking with a foreign recipe, checking a weather forecast from another country, reading a lab report, or converting a fever reading a doctor gave you in a scale you don't normally use.",
    "Celsius and Fahrenheit are the two scales most people run into daily, since Celsius is the standard in most of the world and Fahrenheit is still standard in the United States. Kelvin shows up less often in daily life but is the scale science actually runs on, since it starts at absolute zero and has no negative numbers, which makes it the natural unit for physics, chemistry, and engineering calculations.",
    "The formulas themselves are simple, but they're also easy to get backward under pressure, especially the Fahrenheit-to-Celsius direction, where forgetting to subtract 32 before scaling throws the result off by tens of degrees. A converter applies the correct formula every time and shows all three scales together, so you can sanity-check a number instead of just trusting a mental calculation.",
  ],
  sections: [
    {
      heading: "Celsius to Fahrenheit Formula (With a Worked Example)",
      paragraphs: [
        "To convert Celsius to Fahrenheit, multiply the Celsius value by 9/5 (or 1.8) and then add 32. Written as a formula: °F = (°C × 9/5) + 32. The multiplication step scales the size of a degree, since a Fahrenheit degree is smaller than a Celsius degree, and the addition step shifts the zero point, since 0°C does not line up with 0°F.",
        "As an example, to convert 100°C, multiply 100 by 9/5 to get 180, then add 32 for a result of 212°F, which is the boiling point of water at sea level. For a more everyday number, normal human body temperature of 37°C converts to (37 × 9/5) + 32, which works out to 98.6°F.",
      ],
      bullets: [
        "Formula: °F = (°C × 9/5) + 32",
        "Example: 100°C → (100 × 1.8) + 32 = 212°F",
        "Example: 37°C → (37 × 1.8) + 32 = 98.6°F",
      ],
    },
    {
      heading: "Fahrenheit to Celsius Formula and a Faster Mental Estimate",
      paragraphs: [
        "Going the other direction, subtract 32 from the Fahrenheit value first, then multiply by 5/9. The formula is °C = (°F − 32) × 5/9. Doing the subtraction before the multiplication matters — reversing the order of operations gives a completely wrong answer, which is one of the most common mistakes people make converting by hand.",
        "For example, converting 68°F: subtract 32 to get 36, then multiply by 5/9 for a result of 20°C, a comfortable room temperature. When you just need a rough estimate without a calculator, a quick shortcut is to subtract 32 and divide by 2 instead of multiplying by 5/9 — it overestimates slightly, but it's close enough to get a feel for how warm or cold something is.",
      ],
    },
    {
      heading: "What Is Kelvin and When Do You Need It?",
      paragraphs: [
        "Kelvin is the temperature scale used in science because it's an absolute scale — 0 Kelvin, or absolute zero, is the coldest temperature theoretically possible, the point at which atomic motion stops. Unlike Celsius and Fahrenheit, Kelvin never goes negative, which makes it the required unit for formulas in physics, chemistry, and thermodynamics where a negative temperature wouldn't make physical sense.",
        "Converting to Kelvin from Celsius is the simplest of the three conversions: just add 273.15, since a Kelvin degree is the same size as a Celsius degree and only the zero point differs. So 0°C, the freezing point of water, equals 273.15 K, and 0 K equals −273.15°C. You'll see Kelvin most often in scientific papers, gas law calculations, astronomy, and color-temperature ratings for lighting and camera equipment.",
      ],
      bullets: [
        "Formula: K = °C + 273.15",
        "Absolute zero (0 K) = −273.15°C = −459.67°F",
        "Kelvin has no negative values in practical use",
      ],
    },
    {
      heading: "Common Temperature Reference Points: Body Temp, Oven Temps, Weather",
      paragraphs: [
        "Having a few fixed reference points memorized makes it much easier to sanity-check a conversion, since you'll immediately notice if a result looks wrong. Water's freezing and boiling points are the most useful anchors because they're identical everywhere and don't depend on altitude adjustments for typical household use.",
        "Recipe and appliance temperatures are where these conversions come up most in daily life, since US recipes and appliances are usually labeled in Fahrenheit while much of the rest of the world uses Celsius. A moderate oven at 350°F is close to 177°C, and a hot oven at 425°F is roughly 218°C.",
      ],
      bullets: [
        "Water freezes: 0°C / 32°F / 273.15 K",
        "Water boils (sea level): 100°C / 212°F / 373.15 K",
        "Normal body temperature: 37°C / 98.6°F / 310.15 K",
        "Comfortable room temperature: about 20–22°C / 68–72°F",
        "Moderate oven: 350°F ≈ 177°C",
      ],
    },
    {
      heading: "Converting Between Fahrenheit and Kelvin Directly",
      paragraphs: [
        "Fahrenheit and Kelvin conversions are less common than the Celsius pairings, but they come up when comparing a US weather report to a scientific measurement. Rather than memorizing a separate formula, it's easier to convert through Celsius as an intermediate step: convert Fahrenheit to Celsius first, then add 273.15 to reach Kelvin.",
        "For a direct formula, Kelvin from Fahrenheit is K = (°F − 32) × 5/9 + 273.15. For example, a hot summer day of 95°F converts to (95 − 32) × 5/9 + 273.15, which is 35°C plus 273.15, or about 308.15 K. Going the other way, Fahrenheit from Kelvin is °F = (K − 273.15) × 9/5 + 32.",
      ],
    },
    {
      heading: "Why Three Different Temperature Scales Exist",
      paragraphs: [
        "Fahrenheit was defined in the early 1700s by Daniel Gabriel Fahrenheit using a brine mixture as the zero point and, in later versions, average human body temperature as a reference near the top of the scale. Celsius, originally called centigrade, was designed later around the more intuitive reference points of water freezing at 0 and boiling at 100, which is why it's easier to reason about for everyday use.",
        "Kelvin was introduced in the mid-1800s specifically for scientific work, built on the same degree size as Celsius but anchored to absolute zero instead of water's freezing point. The result is three scales that measure the same physical quantity but express it differently, which is exactly why a reliable converter is more practical than memorizing every formula and doing the arithmetic by hand each time.",
      ],
    },
  ],
  useCases: [
    { title: "Following a Foreign Recipe", description: "Convert oven temperatures from Celsius to Fahrenheit (or the reverse) so a recipe from another country bakes correctly on your appliance." },
    { title: "Reading an International Weather Forecast", description: "Quickly translate a Celsius forecast into Fahrenheit, or vice versa, when checking the weather for travel or planning outdoor activities abroad." },
    { title: "Checking a Fever Reading", description: "Convert a body temperature reading between Celsius and Fahrenheit when a thermometer or medical chart uses a different scale than you're used to." },
    { title: "Science and Lab Coursework", description: "Convert between Celsius and Kelvin for chemistry and physics problems that require an absolute temperature scale in the calculation." },
    { title: "Home Brewing and Cooking Precision", description: "Verify fermentation, candy, or roasting temperatures given in one scale against equipment or thermometers calibrated in another." },
  ],
  mistakes: [
    { title: "Multiplying before subtracting when converting to Celsius", description: "The Fahrenheit-to-Celsius formula requires subtracting 32 first; multiplying by 5/9 before subtracting gives a badly wrong result." },
    { title: "Mixing up 9/5 and 5/9", description: "Using 5/9 when converting Celsius to Fahrenheit (or 9/5 the other way) is a common slip that produces an answer far off from the correct value." },
    { title: "Forgetting Kelvin has no degree symbol", description: "Kelvin values are written as 300 K, not 300°K — a small but common labeling error in scientific and technical writing." },
    { title: "Assuming 0°C and 0°F are the same starting point", description: "The two scales have different zero points, so a simple ratio without the +32/−32 shift will always be incorrect." },
  ],
  tips: [
    "Memorize that 0°C = 32°F and 100°C = 212°F as quick anchors to sanity-check any conversion.",
    "For a fast mental estimate from Fahrenheit to Celsius, subtract 32 and divide by 2 rather than by 1.8.",
    "Remember that Kelvin and Celsius share the same degree size, so converting between them is just adding or subtracting 273.15.",
    "Double-check oven temperature conversions before baking, since even a 10-degree Celsius error can noticeably change a bake time.",
    "When in doubt about which formula to use, convert through Celsius as the middle step rather than memorizing a direct Fahrenheit-to-Kelvin formula.",
  ],
  glossary: [
    { title: "Celsius", description: "A temperature scale where water freezes at 0 degrees and boils at 100 degrees at sea level; the standard scale in most of the world." },
    { title: "Fahrenheit", description: "A temperature scale where water freezes at 32 degrees and boils at 212 degrees; the standard scale used in the United States." },
    { title: "Kelvin", description: "An absolute temperature scale that starts at absolute zero, with the same degree size as Celsius, used mainly in science." },
    { title: "Absolute Zero", description: "The theoretical coldest possible temperature, equal to 0 Kelvin, −273.15°C, or −459.67°F, at which atomic motion stops." },
    { title: "Degree Interval", description: "The size of one unit of change on a temperature scale; Fahrenheit degrees are smaller than Celsius or Kelvin degrees." },
  ],
};

export default guide;
