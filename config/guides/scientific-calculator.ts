import type { ToolGuide } from "@/types/guide";

const guide: ToolGuide = {
  slug: "scientific-calculator",
  intro: [
    "A scientific calculator goes beyond basic addition and subtraction to handle the trigonometric, logarithmic, exponential, and root functions that show up in algebra, trigonometry, physics, and engineering coursework. Instead of juggling a physical calculator with dozens of small buttons, an online scientific calculator gives you the same sin, cos, tan, log, ln, square root, and power functions in a browser tab you can open from any device.",
    "This tool is built for students working through homework that needs more than arithmetic, professionals double-checking a formula, and anyone who needs to evaluate an expression with parentheses, exponents, or trig functions without reaching for a dedicated calculator app. You can build an expression using the on-screen buttons or type it directly on your keyboard, and the display shows both the expression you're building and the running result.",
    "Because the calculator evaluates full expressions rather than one operation at a time, it respects standard order of operations, which matters more than most people expect — two calculators can display different answers for the exact same string of numbers and operators if they don't apply the same evaluation rules. Understanding how the underlying math works also helps you catch a typo or a misplaced parenthesis before it produces a wrong answer.",
  ],
  sections: [
    {
      heading: "Order of Operations (PEMDAS) and Why Calculators Disagree",
      paragraphs: [
        "Order of operations is the set of rules that decides which part of an expression gets calculated first: Parentheses, Exponents, Multiplication and Division (left to right), then Addition and Subtraction (left to right), usually remembered with the acronym PEMDAS. This calculator evaluates a typed or built expression as a whole using standard order of operations, so 3 + 4 × 2 correctly returns 11, not 14.",
        "Two calculators can legitimately disagree on the same input when one evaluates strictly left to right without respecting PEMDAS and another applies the full rule set — this is a known source of confusion with cheap four-function calculators. Using parentheses removes any ambiguity, since (3 + 4) × 2 will always evaluate to 14 regardless of how the calculator handles precedence.",
      ],
      bullets: [
        "Order: Parentheses → Exponents → Multiplication/Division → Addition/Subtraction",
        "Example: 3 + 4 × 2 = 11 (multiplication happens before addition)",
        "Example: (3 + 4) × 2 = 14 (parentheses override the default order)",
      ],
    },
    {
      heading: "Radians vs Degrees in Trig Functions",
      paragraphs: [
        "The sin, cos, and tan functions in this calculator are built on standard math library functions, which always expect the input angle in radians, not degrees. A radian is the angle formed when the arc length equals the radius of a circle, and a full circle is 2π radians instead of 360 degrees. If you enter an angle in degrees expecting a trig function to treat it as degrees, the result will be wrong.",
        "To convert a degree value to radians before applying sin, cos, or tan, multiply the degree value by π and divide by 180: radians = degrees × (π ÷ 180). For example, to find the sine of 90 degrees, first convert: 90 × π ÷ 180 equals π/2 radians, and sin(π/2) equals 1, matching the known value of sin(90°).",
      ],
      bullets: [
        "Conversion: radians = degrees × π ÷ 180",
        "Example: sin(90°) → convert to π/2 radians → sin(π/2) = 1",
        "A full circle equals 2π radians, or 360 degrees",
      ],
    },
    {
      heading: "Logarithms Explained: log Base 10 vs Natural Log (ln)",
      paragraphs: [
        "This calculator provides two separate logarithm functions: log, which is the base-10 logarithm, and ln, the natural logarithm, which uses the mathematical constant e (approximately 2.71828) as its base. The base-10 log of a number answers the question, what power do I raise 10 to in order to get this number? For example, log(1000) equals 3, because 10³ equals 1000.",
        "The natural logarithm answers the same kind of question but with e as the base instead of 10, and it shows up constantly in calculus, compound growth, and exponential decay problems. For example, ln(e) equals 1, since e raised to the first power is e itself. Mixing up log and ln is a common source of wrong answers, since they produce different results for the same input unless the input is 1.",
      ],
    },
    {
      heading: "Understanding Exponents and Roots (Powers and Square Roots)",
      paragraphs: [
        "The xʸ button raises a base number to a power, so entering 2 xʸ 5 and pressing equals calculates 2 raised to the 5th power, which is 32. Exponents represent repeated multiplication: 2⁵ means 2 × 2 × 2 × 2 × 2. This same button handles fractional and negative exponents too, since a power isn't limited to whole positive numbers — 2 xʸ 0.5, for instance, calculates the square root of 2.",
        "The √ button calculates a square root directly, which is the inverse operation of squaring a number. The square root of 81 is 9, because 9 × 9 equals 81. Square roots of negative numbers aren't defined in the real number system this calculator works in, so entering a negative value under the root returns an error rather than a result.",
      ],
      bullets: [
        "Power example: 2 xʸ 5 = 32 (2 multiplied by itself 5 times)",
        "Square root example: √81 = 9",
        "A fractional exponent like xʸ 0.5 is equivalent to a square root",
      ],
    },
    {
      heading: "Using Parentheses to Control Complex Expressions",
      paragraphs: [
        "Parentheses let you override the default order of operations and group parts of an expression that should be calculated together before the rest of the equation is evaluated. This matters most when a calculation combines multiple operations, such as averaging two numbers before dividing: (15 + 25) ÷ 2 correctly calculates the average of 15 and 25 as 20, while 15 + 25 ÷ 2 would divide only the 25 by 2 first, giving a completely different result of 27.5.",
        "Parentheses can also be nested inside each other for more complex expressions, such as trig or log functions applied to the result of another calculation. Every opening parenthesis needs a matching closing one — an unbalanced expression, such as one open parenthesis with no closing bracket, produces an error when evaluated rather than a number.",
      ],
    },
    {
      heading: "Keyboard Shortcuts for Faster Calculation",
      paragraphs: [
        "In addition to clicking the on-screen buttons, this calculator accepts direct keyboard input once you click the calculator to focus it. Typing digits, +, −, ×, ÷ (as / and *), decimal points, and parentheses builds the expression exactly as if you'd tapped the matching buttons, which is faster for longer calculations.",
        "A few keys map to specific actions: Enter or the equals key evaluates the current expression, Backspace deletes the last character you typed, and Escape clears the calculator entirely, equivalent to pressing the AC button. The caret symbol (^) is also accepted as a shortcut for the power operator.",
      ],
      bullets: [
        "Enter or = evaluates the expression",
        "Backspace deletes the last character",
        "Escape clears the entire calculation",
      ],
    },
  ],
  useCases: [
    { title: "Algebra and Trigonometry Homework", description: "Evaluate expressions with trig functions, logarithms, exponents, and parentheses for coursework without switching between multiple tools." },
    { title: "Physics and Engineering Calculations", description: "Work through formulas that combine powers, roots, and trigonometric functions, common in mechanics, waves, and circuit calculations." },
    { title: "Checking Work Done by Hand", description: "Verify a manually solved equation by re-entering it into the calculator to confirm the order of operations was applied correctly." },
    { title: "Quick Scientific Notation-Style Calculations", description: "Use the power function to calculate large or small numbers, such as 10 xʸ 6, without writing out every zero by hand." },
    { title: "Finance and Growth Calculations", description: "Use the natural log and exponent functions for problems involving compound growth, decay rates, or doubling time." },
  ],
  mistakes: [
    { title: "Entering degrees into a trig function expecting radians", description: "sin, cos, and tan here evaluate in radians; entering a raw degree value without converting first produces an incorrect result." },
    { title: "Confusing log and ln", description: "log is base-10 and ln is base-e (natural log); using the wrong one gives a different answer for the same input." },
    { title: "Skipping parentheses in multi-step expressions", description: "Without grouping, order of operations may calculate a step in a different sequence than intended, especially with division and addition mixed together." },
    { title: "Leaving a parenthesis unclosed", description: "Every opening parenthesis needs a matching closing one; an unbalanced expression returns an error instead of a number." },
    { title: "Expecting a negative number under a square root to work", description: "Square roots of negative numbers aren't defined in real-number math, so the calculator returns an error rather than a result." },
  ],
  tips: [
    "Convert degrees to radians (degrees × π ÷ 180) before using sin, cos, or tan if your angle is given in degrees.",
    "Use parentheses generously in multi-step expressions to guarantee the calculation happens in the order you intend.",
    "Remember log is base-10 and ln is base-e; pick the one that matches the formula you're working from.",
    "Click the calculator once and use your keyboard for faster entry on longer expressions.",
    "Use the xʸ button with a fractional exponent like 0.5 as an alternative way to calculate a square root.",
    "Press Escape to instantly clear the whole calculation instead of clicking AC or backspacing character by character.",
  ],
  glossary: [
    { title: "Radian", description: "A unit for measuring angles based on the radius of a circle; standard math functions like sin and cos expect angles in radians, not degrees." },
    { title: "Logarithm", description: "The inverse of exponentiation; the power a base number must be raised to in order to produce a given value." },
    { title: "Natural Logarithm (ln)", description: "A logarithm using the mathematical constant e as its base, common in calculus and growth or decay calculations." },
    { title: "Exponent", description: "A number indicating how many times a base value is multiplied by itself, written as a superscript or with the xʸ function." },
    { title: "Order of Operations", description: "The standard sequence — parentheses, exponents, multiplication/division, addition/subtraction — used to evaluate a mathematical expression consistently." },
  ],
};

export default guide;
