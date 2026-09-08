import { Reveal } from "./Reveal";

type Props = {
  eyebrow?: string;
  title: string;
  text?: string;
  align?: "center" | "start";
  onDark?: boolean;
  id?: string;
};

export default function SectionHeading({ eyebrow, title, text, align = "center", onDark = false, id }: Props) {
  const center = align === "center";
  return (
    <div className={`${center ? "mx-auto text-center" : "text-start"} max-w-2xl`}>
      {eyebrow && (
        <Reveal>
          <span
            className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold tracking-wide ${
              onDark ? "glass-dark text-gold-light" : "bg-white hairline text-gold-ink"
            }`}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden />
            {eyebrow}
          </span>
        </Reveal>
      )}
      <Reveal delay={0.08}>
        <h2
          id={id}
          className={`mt-5 text-balance text-3xl font-bold leading-[1.15] tracking-tight sm:text-4xl lg:text-5xl ${
            onDark ? "text-white" : "text-ink"
          }`}
        >
          {title}
        </h2>
      </Reveal>
      {text && (
        <Reveal delay={0.16}>
          <p className={`mt-5 text-pretty text-base leading-relaxed sm:text-lg ${onDark ? "text-white/65" : "text-muted"}`}>
            {text}
          </p>
        </Reveal>
      )}
    </div>
  );
}
