import type { Metadata } from "next";
import Link from "next/link";
import { allTools, getToolsByCategory } from "@/config/tools";
import { categories } from "@/data/categories";
import EmbedGenerator from "@/components/tools/EmbedGenerator";
import { SITE_URL, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Embed a Free Tool on Your Website",
  description: `Add a working calculator, converter or generator to your site in one paste. ${allTools.length} free embeddable widgets — no account, no API key, no fees.`,
  keywords: [
    "embeddable calculator",
    "embed calculator on website",
    "free widget for website",
    "embeddable tools",
    "iframe calculator",
    "add calculator to blog",
    "free embeddable widgets",
  ],
  alternates: { canonical: `${SITE_URL}/embed` },
  openGraph: {
    title: `Embed a Free Tool on Your Website | ${SITE_NAME}`,
    description: `${allTools.length} working tools you can drop into any page with one line of HTML.`,
    url: `${SITE_URL}/embed`,
    type: "website",
  },
};

const STEPS = [
  { n: 1, title: "Pick a tool", text: "Choose any of our tools below and see a live preview of exactly what your readers will get." },
  { n: 2, title: "Copy the code", text: "One click copies a plain HTML snippet. No script tags to install, no API key to manage." },
  { n: 3, title: "Paste it in your page", text: "Works in WordPress (Custom HTML block), Webflow, Ghost, Squarespace, Notion, plain HTML — anywhere you can paste HTML." },
];

const FAQ = [
  {
    q: "Is it really free?",
    a: "Yes. There is no fee, no account, no API key and no usage limit. The only condition is that you keep the small credit line that comes with the snippet.",
  },
  {
    q: "Will it slow my page down?",
    a: "The snippet uses loading=\"lazy\", so the widget is only fetched when a reader scrolls near it. Nothing loads on your page until then, and the tool runs in its own frame, so it cannot block your own scripts or styles.",
  },
  {
    q: "Do my visitors' files get uploaded anywhere?",
    a: "For most tools, no. PDF, image and calculator widgets do all their work inside the visitor's own browser, so files never leave their device. Tools that fetch something from the internet, such as the video downloaders and currency rates, are the exception.",
  },
  {
    q: "Can I change the size?",
    a: "Yes. Pick one of the height presets above, or edit the height and max-width values in the snippet to match your layout. The widget is responsive and fills whatever width you give it.",
  },
  {
    q: "Can I remove the credit line?",
    a: "Please don't — it is the only thing we ask for in exchange, and it is what keeps these widgets free for everyone. You are welcome to restyle it to match your typography.",
  },
  {
    q: "Will the widget keep working?",
    a: "The widget always loads the current version of the tool, so fixes and new features appear in your page automatically without you changing anything.",
  },
];

export default function EmbedLandingPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <nav className="text-sm text-gray-500 dark:text-gray-400 mb-6 flex gap-2">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <span>/</span>
          <span className="text-gray-700 dark:text-gray-300">Embed</span>
        </nav>

        <header className="mb-10 max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Put a working tool on your website — free
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Writing about mortgages, fitness or file formats? Instead of telling readers to go somewhere
            else, give them the calculator right there in your article. Pick a tool, copy one line of HTML,
            paste it in. All {allTools.length} of our tools can be embedded.
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-4 text-sm text-gray-500 dark:text-gray-400">
            <span>✅ No account</span>
            <span>🔑 No API key</span>
            <span>💸 No fees or limits</span>
            <span>⚡ Loads lazily</span>
          </div>
        </header>

        <section className="mb-12 p-5 md:p-6 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50/60 dark:bg-gray-800/40">
          <EmbedGenerator />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-5">How it works</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {STEPS.map((s) => (
              <div key={s.n} className="p-5 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm mb-3">
                  {s.n}
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{s.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{s.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Every tool you can embed</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Open any tool to preview its widget and grab the code.
          </p>
          <div className="space-y-8">
            {categories.map((cat) => {
              const tools = getToolsByCategory(cat.slug);
              if (tools.length === 0) return null;
              return (
                <div key={cat.slug}>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-3">
                    {cat.icon} {cat.name}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {tools.map((t) => (
                      <Link
                        key={t.slug}
                        href={`/embed/${t.slug}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-blue-900/30 transition-colors"
                      >
                        <span>{t.icon}</span> {t.title}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mb-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-5">Questions</h2>
          <div className="space-y-3 max-w-3xl">
            {FAQ.map((item) => (
              <details key={item.q} className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl">
                <summary className="flex items-center justify-between p-4 cursor-pointer font-medium text-gray-900 dark:text-white list-none">
                  {item.q}
                  <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="px-4 pb-4 text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{item.a}</div>
              </details>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
