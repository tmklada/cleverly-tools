import type { ToolConfig, ToolType } from "@/types/tool";

interface Benefit {
  icon: string;
  title: string;
  text: string;
}

const COMMON: Benefit[] = [
  { icon: "✅", title: "100% free, forever", text: "No hidden fees, no trial, no premium tier. Every feature is available to everyone." },
  { icon: "🚫", title: "No sign-up required", text: "No account, no email, no password. Open the page and start using the tool immediately." },
  { icon: "📱", title: "Works on any device", text: "Runs in your browser on iPhone, Android, Windows, Mac and Linux — nothing to install." },
];

const BY_TYPE: Partial<Record<ToolType, Benefit>> = {
  downloader: { icon: "🎬", title: "Original quality", text: "Get the highest quality available — HD when the source provides it, with no watermark added by us." },
  pdf: { icon: "🔒", title: "Your files stay private", text: "PDFs are processed entirely inside your browser. Nothing is uploaded to a server." },
  image: { icon: "🔒", title: "Images never leave your device", text: "Processing happens locally in your browser, so your photos are never uploaded or stored." },
  converter: { icon: "⚡", title: "Fast, local conversion", text: "Conversion runs on your own device, so there is no upload wait and no file size queue." },
  calculator: { icon: "🎯", title: "Instant, accurate results", text: "Results update as you type, using standard formulas you can trust and verify." },
  finance: { icon: "📊", title: "Clear breakdown", text: "See how the numbers are calculated, not just the final figure, so you can plan with confidence." },
  health: { icon: "🩺", title: "Based on standard formulas", text: "Uses widely accepted medical formulas. For guidance only — always consult a professional for health decisions." },
  developer: { icon: "🔒", title: "Nothing leaves your browser", text: "Your code, keys and data are processed locally and never sent to our servers." },
  text: { icon: "⚡", title: "Instant, as you type", text: "Paste your text and get results immediately — no submit button, no waiting." },
  seo: { icon: "📈", title: "Search-engine ready output", text: "Generates clean, valid markup you can paste straight into your site." },
  qr: { icon: "🖨️", title: "High-resolution download", text: "Download crisp PNG codes suitable for print, packaging, menus and posters." },
  utility: { icon: "⚡", title: "Zero setup", text: "No configuration needed — it just works the moment the page loads." },
};

export default function ToolBenefits({ tool }: { tool: ToolConfig }) {
  const special = tool.toolType ? BY_TYPE[tool.toolType] : undefined;
  const benefits = special ? [special, ...COMMON] : COMMON;

  return (
    <section className="mb-10">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-5">Why use our {tool.title}?</h2>
      <div className="grid sm:grid-cols-2 gap-4">
        {benefits.map((b) => (
          <div key={b.title} className="flex gap-3 p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <span className="text-2xl leading-none">{b.icon}</span>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white text-sm">{b.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{b.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
