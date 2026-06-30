"use client";
import { useState } from "react";

type SchemaType = "Article" | "Product" | "FAQ" | "LocalBusiness" | "Recipe" | "Event";

const schemaTypes: SchemaType[] = ["Article", "Product", "FAQ", "LocalBusiness", "Recipe", "Event"];

interface FAQItem { question: string; answer: string; }

export default function SchemaMarkupGenerator() {
  const [type, setType] = useState<SchemaType>("Article");
  const [copied, setCopied] = useState(false);

  // Article
  const [articleTitle, setArticleTitle] = useState("");
  const [articleAuthor, setArticleAuthor] = useState("");
  const [articleDate, setArticleDate] = useState("");
  const [articleDesc, setArticleDesc] = useState("");
  const [articleUrl, setArticleUrl] = useState("");

  // Product
  const [productName, setProductName] = useState("");
  const [productDesc, setProductDesc] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCurrency, setProductCurrency] = useState("USD");
  const [productBrand, setProductBrand] = useState("");
  const [productSku, setProductSku] = useState("");

  // FAQ
  const [faqItems, setFaqItems] = useState<FAQItem[]>([{ question: "", answer: "" }]);

  // LocalBusiness
  const [bizName, setBizName] = useState("");
  const [bizAddress, setBizAddress] = useState("");
  const [bizCity, setBizCity] = useState("");
  const [bizPhone, setBizPhone] = useState("");
  const [bizType, setBizType] = useState("LocalBusiness");

  // Recipe
  const [recipeName, setRecipeName] = useState("");
  const [recipeDesc, setRecipeDesc] = useState("");
  const [recipePrepTime, setRecipePrepTime] = useState("");
  const [recipeCookTime, setRecipeCookTime] = useState("");
  const [recipeServings, setRecipeServings] = useState("");
  const [recipeIngredients, setRecipeIngredients] = useState("");

  // Event
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventDesc, setEventDesc] = useState("");
  const [eventOrganizer, setEventOrganizer] = useState("");

  function generateSchema(): string {
    let schema: Record<string, unknown> = {};

    switch (type) {
      case "Article":
        schema = {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: articleTitle,
          description: articleDesc,
          author: { "@type": "Person", name: articleAuthor },
          datePublished: articleDate,
          url: articleUrl,
        };
        break;
      case "Product":
        schema = {
          "@context": "https://schema.org",
          "@type": "Product",
          name: productName,
          description: productDesc,
          brand: { "@type": "Brand", name: productBrand },
          sku: productSku,
          offers: {
            "@type": "Offer",
            price: productPrice,
            priceCurrency: productCurrency,
            availability: "https://schema.org/InStock",
          },
        };
        break;
      case "FAQ":
        schema = {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqItems.filter(i => i.question).map(item => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: { "@type": "Answer", text: item.answer },
          })),
        };
        break;
      case "LocalBusiness":
        schema = {
          "@context": "https://schema.org",
          "@type": bizType,
          name: bizName,
          address: {
            "@type": "PostalAddress",
            streetAddress: bizAddress,
            addressLocality: bizCity,
          },
          telephone: bizPhone,
        };
        break;
      case "Recipe":
        schema = {
          "@context": "https://schema.org",
          "@type": "Recipe",
          name: recipeName,
          description: recipeDesc,
          prepTime: `PT${recipePrepTime}M`,
          cookTime: `PT${recipeCookTime}M`,
          recipeYield: recipeServings,
          recipeIngredient: recipeIngredients.split("\n").filter(Boolean),
        };
        break;
      case "Event":
        schema = {
          "@context": "https://schema.org",
          "@type": "Event",
          name: eventName,
          description: eventDesc,
          startDate: eventDate,
          location: { "@type": "Place", name: eventLocation },
          organizer: { "@type": "Organization", name: eventOrganizer },
        };
        break;
    }

    return JSON.stringify(schema, null, 2);
  }

  const output = generateSchema();
  const scriptTag = `<script type="application/ld+json">\n${output}\n</script>`;

  function copy() {
    navigator.clipboard.writeText(scriptTag);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function addFaq() {
    setFaqItems(prev => [...prev, { question: "", answer: "" }]);
  }

  function updateFaq(i: number, field: keyof FAQItem, value: string) {
    setFaqItems(prev => prev.map((item, idx) => idx === i ? { ...item, [field]: value } : item));
  }

  const inputCls = "w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm";
  const labelCls = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1";

  return (
    <div className="space-y-5">
      <div>
        <label className={labelCls}>Schema Type</label>
        <div className="flex flex-wrap gap-2">
          {schemaTypes.map(t => (
            <button key={t} onClick={() => setType(t)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${type === t ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"}`}>
              {t}
            </button>
          ))}
        </div>
      </div>

      {type === "Article" && (
        <div className="space-y-3">
          {[
            { label: "Title", value: articleTitle, setter: setArticleTitle, placeholder: "My Article Title" },
            { label: "Author", value: articleAuthor, setter: setArticleAuthor, placeholder: "John Doe" },
            { label: "Published Date", value: articleDate, setter: setArticleDate, placeholder: "2024-01-15", type: "date" },
            { label: "URL", value: articleUrl, setter: setArticleUrl, placeholder: "https://..." },
            { label: "Description", value: articleDesc, setter: setArticleDesc, placeholder: "Brief description..." },
          ].map(({ label, value, setter, placeholder, type: t }) => (
            <div key={label}>
              <label className={labelCls}>{label}</label>
              <input type={t || "text"} value={value} onChange={e => setter(e.target.value)} placeholder={placeholder} className={inputCls} />
            </div>
          ))}
        </div>
      )}

      {type === "Product" && (
        <div className="space-y-3">
          <div><label className={labelCls}>Product Name</label><input value={productName} onChange={e => setProductName(e.target.value)} placeholder="Awesome Product" className={inputCls} /></div>
          <div><label className={labelCls}>Brand</label><input value={productBrand} onChange={e => setProductBrand(e.target.value)} placeholder="Brand Name" className={inputCls} /></div>
          <div><label className={labelCls}>SKU</label><input value={productSku} onChange={e => setProductSku(e.target.value)} placeholder="SKU-001" className={inputCls} /></div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className={labelCls}>Price</label><input type="number" value={productPrice} onChange={e => setProductPrice(e.target.value)} placeholder="29.99" className={inputCls} /></div>
            <div><label className={labelCls}>Currency</label>
              <select value={productCurrency} onChange={e => setProductCurrency(e.target.value)} className={inputCls}>
                {["USD", "EUR", "GBP", "ILS", "CAD", "AUD"].map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <div><label className={labelCls}>Description</label><textarea value={productDesc} onChange={e => setProductDesc(e.target.value)} placeholder="Product description..." rows={2} className={`${inputCls} resize-none`} /></div>
        </div>
      )}

      {type === "FAQ" && (
        <div className="space-y-3">
          {faqItems.map((item, i) => (
            <div key={i} className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 space-y-2">
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">Q{i + 1}</p>
              <input value={item.question} onChange={e => updateFaq(i, "question", e.target.value)} placeholder="Question" className={inputCls} />
              <textarea value={item.answer} onChange={e => updateFaq(i, "answer", e.target.value)} placeholder="Answer" rows={2} className={`${inputCls} resize-none`} />
            </div>
          ))}
          <button onClick={addFaq} className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400">+ Add FAQ</button>
        </div>
      )}

      {type === "LocalBusiness" && (
        <div className="space-y-3">
          <div><label className={labelCls}>Business Name</label><input value={bizName} onChange={e => setBizName(e.target.value)} placeholder="My Business" className={inputCls} /></div>
          <div><label className={labelCls}>Business Type</label>
            <select value={bizType} onChange={e => setBizType(e.target.value)} className={inputCls}>
              {["LocalBusiness", "Restaurant", "Store", "Hotel", "Hospital", "School", "Gym"].map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div><label className={labelCls}>Street Address</label><input value={bizAddress} onChange={e => setBizAddress(e.target.value)} placeholder="123 Main St" className={inputCls} /></div>
          <div><label className={labelCls}>City</label><input value={bizCity} onChange={e => setBizCity(e.target.value)} placeholder="New York" className={inputCls} /></div>
          <div><label className={labelCls}>Phone</label><input value={bizPhone} onChange={e => setBizPhone(e.target.value)} placeholder="+1 555-0100" className={inputCls} /></div>
        </div>
      )}

      {type === "Recipe" && (
        <div className="space-y-3">
          <div><label className={labelCls}>Recipe Name</label><input value={recipeName} onChange={e => setRecipeName(e.target.value)} placeholder="Chocolate Cake" className={inputCls} /></div>
          <div className="grid grid-cols-3 gap-3">
            <div><label className={labelCls}>Prep (min)</label><input type="number" value={recipePrepTime} onChange={e => setRecipePrepTime(e.target.value)} placeholder="15" className={inputCls} /></div>
            <div><label className={labelCls}>Cook (min)</label><input type="number" value={recipeCookTime} onChange={e => setRecipeCookTime(e.target.value)} placeholder="30" className={inputCls} /></div>
            <div><label className={labelCls}>Servings</label><input value={recipeServings} onChange={e => setRecipeServings(e.target.value)} placeholder="8" className={inputCls} /></div>
          </div>
          <div><label className={labelCls}>Description</label><textarea value={recipeDesc} onChange={e => setRecipeDesc(e.target.value)} placeholder="Delicious..." rows={2} className={`${inputCls} resize-none`} /></div>
          <div><label className={labelCls}>Ingredients (one per line)</label><textarea value={recipeIngredients} onChange={e => setRecipeIngredients(e.target.value)} placeholder={"2 cups flour\n1 cup sugar"} rows={4} className={`${inputCls} resize-none`} /></div>
        </div>
      )}

      {type === "Event" && (
        <div className="space-y-3">
          <div><label className={labelCls}>Event Name</label><input value={eventName} onChange={e => setEventName(e.target.value)} placeholder="Annual Conference" className={inputCls} /></div>
          <div><label className={labelCls}>Date & Time</label><input type="datetime-local" value={eventDate} onChange={e => setEventDate(e.target.value)} className={inputCls} /></div>
          <div><label className={labelCls}>Location</label><input value={eventLocation} onChange={e => setEventLocation(e.target.value)} placeholder="Convention Center, NYC" className={inputCls} /></div>
          <div><label className={labelCls}>Organizer</label><input value={eventOrganizer} onChange={e => setEventOrganizer(e.target.value)} placeholder="My Company" className={inputCls} /></div>
          <div><label className={labelCls}>Description</label><textarea value={eventDesc} onChange={e => setEventDesc(e.target.value)} placeholder="Event details..." rows={2} className={`${inputCls} resize-none`} /></div>
        </div>
      )}

      <div>
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Generated JSON-LD</p>
          <button onClick={copy} className="text-xs px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
            {copied ? "Copied!" : "Copy Script Tag"}
          </button>
        </div>
        <pre className="bg-gray-900 text-green-400 text-xs p-4 rounded-xl overflow-x-auto whitespace-pre-wrap">{scriptTag}</pre>
      </div>
    </div>
  );
}
