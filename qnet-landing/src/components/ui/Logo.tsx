import { site } from "@/config/site";

/** علامة الاسم – حرف "ن" ذهبي داخل دائرة + الاسم */
export default function Logo({ onDark = false, compact = false }: { onDark?: boolean; compact?: boolean }) {
  return (
    <a href="#top" className="group inline-flex items-center gap-3" aria-label={`${site.name} – ${site.role}`}>
      <span className="relative grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-gold-deep via-gold to-gold-light text-night shadow-[0_6px_18px_-6px_rgba(201,169,97,0.7)] transition-transform duration-500 ease-[var(--ease-premium)] group-hover:rotate-6">
        <span className="text-lg font-bold leading-none" aria-hidden>ن</span>
        <span className="absolute inset-0 rounded-full ring-1 ring-white/40" aria-hidden />
      </span>
      {!compact && (
        <span className="flex flex-col leading-tight">
          <span className={`text-[15px] font-bold ${onDark ? "text-white" : "text-ink"}`}>{site.name}</span>
          <span className={`text-[11px] font-medium tracking-wide ${onDark ? "text-white/55" : "text-muted"}`}>
            {site.roleLatin}
          </span>
        </span>
      )}
    </a>
  );
}
