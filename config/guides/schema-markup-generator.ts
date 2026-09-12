import type { ToolGuide } from "@/types/guide";

const guide: ToolGuide = {
  slug: "schema-markup-generator",
  intro: [
    "Schema markup is a block of structured data, written in a format search engines can parse directly, that describes what a page is actually about — an article, a product for sale, a list of frequently asked questions, a local business, a recipe, or an event. Without it, Google has to infer meaning from headings and body text; with it, the meaning is stated explicitly, which is what opens the door to rich results like star ratings, expandable FAQ dropdowns, and event listings showing up directly in search results. This schema markup generator builds that code for you: pick a type, fill in plain-language fields like a title, price, or event date, and get back valid JSON-LD ready to paste into your page.",
    "It covers the six schema types most sites actually need — Article, Product, FAQ, LocalBusiness, Recipe, and Event — rather than trying to cover the entire schema.org vocabulary, which runs to hundreds of types most sites will never touch. LocalBusiness also lets you pick a more specific sub-type such as Restaurant, Store, Hotel, Hospital, School, or Gym, since Google treats those as more descriptive than the generic LocalBusiness type alone.",
    "Everything runs in your browser: the fields you type are assembled into a JSON object client-side and wrapped in a ready-to-copy script tag, with nothing sent to a server. That makes it safe to use even for unpublished product data or draft article details, and it means the generated code updates instantly as you type rather than waiting on a page reload.",
  ],
  sections: [
    {
      heading: "What Schema Markup Does for Rich Results (Stars, FAQs, and Event Listings)",
      paragraphs: [
        "Schema markup itself doesn't change how a page looks to visitors — it's invisible code sitting in the HTML. What it does is give Google a structured, unambiguous description of the page's content, which Google can then choose to surface as a rich result: a Product's price and availability shown inline, an Event's date and venue listed under the search snippet, or a Recipe's prep time and ingredient count displayed before a click.",
        "FAQPage markup, generated from the questions and answers you enter here, can make individual Q&A pairs expandable directly inside a search result, letting a user get an answer without visiting the page at all — which sounds like it costs a click, but in practice earns trust and visibility for the domain that answered correctly. Article markup helps Google attribute authorship and publish dates correctly, which matters for news and blog content in particular.",
        "None of this is guaranteed. Adding correct schema markup makes a page eligible for a rich result; it does not force Google to display one. Eligibility depends on the markup being accurate, matching the visible page content, and meeting Google's current policies for that result type, which do shift over time.",
      ],
    },
    {
      heading: "JSON-LD vs Microdata: Which Google Prefers",
      paragraphs: [
        "There are three ways to write schema markup: JSON-LD, Microdata, and RDFa. JSON-LD is a single self-contained script block placed anywhere in the page, separate from the visible HTML that displays content to users. Microdata and RDFa, by contrast, are written as extra attributes scattered directly inside the HTML tags that already render your content — a product name gets an itemprop attribute right on the same <h1> a visitor reads.",
        "Google has recommended JSON-LD as its preferred format for years, and this tool only outputs JSON-LD for that reason. It's easier to generate programmatically, easier to update without touching your page's visible markup, and easier to validate as a standalone block, since it isn't tangled into your design's HTML structure.",
        "The tradeoff is that because JSON-LD lives separately from the visible page, it's technically possible for it to drift out of sync with what a visitor actually sees — which is exactly why Google's guidelines require the structured data to accurately reflect the page's real, visible content rather than describing something aspirational.",
      ],
    },
    {
      heading: "Choosing the Right Schema Type: Article, Product, FAQ, LocalBusiness, Recipe, or Event",
      paragraphs: [
        "Article schema fits blog posts, news pieces, and long-form content pages, and asks for a headline, author, publish date, description, and canonical URL — the same fields Google uses to show byline and date information in search results. Product schema is built for a single item for sale, capturing name, brand, SKU, price, and currency, and automatically marks the item as in stock in the generated offer.",
        "FAQ schema takes a repeatable list of question-and-answer pairs — click 'Add FAQ' to add more rows — and turns each one into a Question/Answer pair inside a single FAQPage object. LocalBusiness schema covers a physical business with an address and phone number, and the sub-type dropdown (Restaurant, Store, Hotel, Hospital, School, Gym) lets you be more specific than the generic LocalBusiness category.",
        "Recipe schema takes prep time and cook time in minutes and automatically formats them into the ISO 8601 duration format (PT15M for 15 minutes) that schema.org requires, plus servings and a line-by-line ingredient list. Event schema covers a name, a combined date-and-time field, a location, an organizer, and a description — useful for webinars, conferences, and in-person meetups alike.",
      ],
    },
    {
      heading: "How to Test Structured Data Before You Publish It",
      paragraphs: [
        "This generator produces syntactically valid JSON-LD, but valid JSON and eligible-for-rich-results are two different things — a schema block can be well-formed and still be missing a field Google requires for that particular result type, or contain a value in the wrong format. Before publishing, paste the generated script tag into Google's Rich Results Test or the independent Schema Markup Validator at validator.schema.org, both of which check the code against the live schema.org and Google-specific requirements.",
        "Pay particular attention to date fields: Article's datePublished and Event's startDate both expect specific formats, and a malformed date is one of the most common reasons a schema block gets flagged. Run the test again after any edit to the underlying page content, since structured data that no longer matches what's visibly on the page is treated as a policy violation, not just a technical error.",
      ],
    },
    {
      heading: "Where to Paste Your JSON-LD Code (Head vs Body)",
      paragraphs: [
        "The 'Copy Script Tag' button copies the full <script type=\"application/ld+json\"> block, tags included, so you can paste it directly into your HTML without wrapping it yourself. Google reads structured data from either the <head> or the <body> of a page, so both placements work — most sites put it in the head alongside other meta tags, purely for organizational consistency rather than any technical requirement.",
        "If your site is built with a CMS or framework rather than raw HTML, look for a 'custom head code,' 'header scripts,' or SEO plugin field rather than editing template files directly — most platforms, from WordPress to Shopify to Webflow, have a supported place for exactly this kind of script injection that survives theme updates.",
      ],
    },
  ],
  useCases: [
    { title: "Blog posts and news articles", description: "Generate Article schema with author, publish date, and description so Google can correctly attribute and date the content in search results." },
    { title: "E-commerce product pages", description: "Add Product schema with price, currency, brand, and SKU to make a listing eligible for price and availability rich results." },
    { title: "FAQ and help pages", description: "Turn a list of common questions into FAQPage schema that can display as expandable answers directly in search results." },
    { title: "Local business listings", description: "Generate LocalBusiness schema with the correct sub-type, address, and phone number for a restaurant, store, clinic, or gym." },
    { title: "Recipe blogs", description: "Add Recipe schema with prep time, cook time, servings, and ingredients formatted the way schema.org and recipe rich results expect." },
    { title: "Webinars and in-person events", description: "Generate Event schema with date, location, and organizer details so an event page can appear with date and venue info in search." },
  ],
  mistakes: [
    { title: "Using placeholder text in the generated schema", description: "Leaving example values like 'My Business' or 'Brand Name' in the fields produces schema that technically validates but misrepresents the page — always replace every field with real content." },
    { title: "Adding FAQ schema for content not visibly on the page", description: "Google's guidelines require structured data to match what a visitor actually sees; FAQ markup for questions hidden or absent from the visible page can be treated as a policy violation." },
    { title: "Picking the generic LocalBusiness type when a specific one exists", description: "Choosing Restaurant, Hotel, or Gym instead of plain LocalBusiness gives Google a more precise signal and access to type-specific rich result features." },
    { title: "Skipping validation before publishing", description: "This tool generates syntactically correct JSON-LD, but only a validator checks whether the fields you filled in actually satisfy that schema type's requirements for rich results." },
    { title: "Expecting a rich result to appear immediately", description: "Correct schema markup makes a page eligible, not guaranteed — Google still decides whether and when to display a rich result based on relevance, trust, and its own current policies." },
  ],
  tips: [
    "Fill in every field with real, current content rather than placeholder text, since mismatched schema can be treated as a policy violation.",
    "Test the generated JSON-LD in Google's Rich Results Test or validator.schema.org before adding it to a live page.",
    "Pick the most specific LocalBusiness sub-type available instead of the generic LocalBusiness category.",
    "Keep FAQ questions and answers identical to the text that's actually visible on the page.",
    "Re-test your structured data any time you update the underlying page content it describes.",
    "Paste the copied script tag into your CMS's header or custom-code field rather than editing template files by hand.",
  ],
  glossary: [
    { title: "JSON-LD", description: "JavaScript Object Notation for Linked Data — a way of writing structured data as a single script block, separate from the page's visible HTML, and Google's preferred schema format." },
    { title: "Rich result", description: "A search result enhanced with extra visual elements like star ratings, images, or expandable text, made possible by structured data on the page." },
    { title: "Schema.org", description: "A shared vocabulary of types and properties, maintained jointly by Google, Bing, Yahoo, and Yandex, that defines how structured data like Article or Product should be described." },
    { title: "Structured data", description: "Data formatted in a standardized, machine-readable way so that search engines can extract specific facts from a page rather than guessing from unstructured text." },
    { title: "Microdata", description: "An older method of writing schema markup as attributes embedded directly inside a page's visible HTML tags, rather than in a separate script block." },
    { title: "Rich Results Test", description: "Google's free tool for checking whether a page's structured data is valid and eligible for rich results, available at search.google.com/test/rich-results." },
  ],
};

export default guide;
