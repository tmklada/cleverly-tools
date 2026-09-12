import type { ToolGuide } from "@/types/guide";

const h2 = "text-xl font-bold text-gray-900 dark:text-white mb-4";
const p = "text-gray-600 dark:text-gray-400 leading-relaxed";

export default function ToolGuideContent({ guide, toolTitle }: { guide: ToolGuide; toolTitle: string }) {
  return (
    <article className="mb-10 space-y-10">
      <section>
        <h2 className={h2}>The Complete Guide to {toolTitle}</h2>
        <div className="space-y-3">
          {guide.intro.map((text, i) => <p key={i} className={p}>{text}</p>)}
        </div>
      </section>

      {guide.sections.map((s) => (
        <section key={s.heading}>
          <h2 className={h2}>{s.heading}</h2>
          <div className="space-y-3">
            {s.paragraphs.map((text, i) => <p key={i} className={p}>{text}</p>)}
            {s.bullets && s.bullets.length > 0 && (
              <ul className="list-disc pl-5 space-y-1.5 text-gray-600 dark:text-gray-400">
                {s.bullets.map((b, i) => <li key={i}>{b}</li>)}
              </ul>
            )}
          </div>
        </section>
      ))}

      <section>
        <h2 className={h2}>Common Use Cases</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {guide.useCases.map((u) => (
            <div key={u.title} className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">{u.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{u.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className={h2}>Common Mistakes to Avoid</h2>
        <div className="space-y-3">
          {guide.mistakes.map((m) => (
            <div key={m.title} className="flex gap-3 p-4 rounded-xl border border-amber-200 dark:border-amber-900/50 bg-amber-50/60 dark:bg-amber-900/10">
              <span className="text-amber-500 text-lg leading-none">⚠</span>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm">{m.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{m.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className={h2}>Pro Tips</h2>
        <ul className="space-y-2">
          {guide.tips.map((t, i) => (
            <li key={i} className="flex gap-3 text-gray-600 dark:text-gray-400">
              <span className="text-green-500 font-bold">✓</span>
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </section>

      {guide.glossary && guide.glossary.length > 0 && (
        <section>
          <h2 className={h2}>Key Terms Explained</h2>
          <dl className="grid sm:grid-cols-2 gap-x-6 gap-y-4">
            {guide.glossary.map((g) => (
              <div key={g.title}>
                <dt className="font-semibold text-gray-900 dark:text-white text-sm">{g.title}</dt>
                <dd className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">{g.description}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}
    </article>
  );
}
