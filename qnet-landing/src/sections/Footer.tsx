import { ArrowUp, ExternalLink, Facebook, Instagram } from "lucide-react";
import Logo from "@/components/ui/Logo";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import { footer, a11y } from "@/content/ar";
import { site } from "@/config/site";
import { whatsappLink } from "@/lib/whatsapp";

export default function Footer() {
  const year = new Date().getFullYear();
  const socials = [
    { href: whatsappLink(), label: footer.whatsapp, Icon: WhatsAppIcon, aria: a11y.openWhatsapp },
    { href: site.social.instagram, label: footer.instagram, Icon: Instagram, aria: `${footer.instagram} – ${site.name}` },
    { href: site.social.facebook, label: footer.facebook, Icon: Facebook, aria: `${footer.facebook} – ${site.name}` },
  ].filter((s) => !!s.href);

  return (
    <footer className="relative border-t border-white/10 bg-night-2 pb-28 pt-14 text-white sm:pb-14">
      <div className="container-x">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo onDark />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/55">{footer.tagline}</p>
            <p className="mt-2 text-xs text-white/40">{site.roleLatin}</p>
          </div>

          <nav aria-label={footer.contactTitle} className="md:col-span-3">
            <h3 className="text-xs font-semibold tracking-[0.2em] text-white/40 uppercase">{footer.contactTitle}</h3>
            <ul className="mt-4 space-y-3">
              {socials.map(({ href, label, Icon, aria }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={aria}
                    className="group inline-flex items-center gap-2.5 text-[15px] text-white/75 transition hover:text-white"
                  >
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-white/[0.06] ring-1 ring-white/10 transition group-hover:bg-gold/15 group-hover:ring-gold/30">
                      <Icon className="h-4 w-4" />
                    </span>
                    {label}
                  </a>
                </li>
              ))}
              <li>
                <a href={`tel:+${site.whatsappNumber}`} className="text-[15px] text-white/75 transition hover:text-white" dir="ltr">
                  {site.phoneDisplay}
                </a>
              </li>
            </ul>
          </nav>

          <nav aria-label={footer.linksTitle} className="md:col-span-4">
            <h3 className="text-xs font-semibold tracking-[0.2em] text-white/40 uppercase">{footer.linksTitle}</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href={site.qnetOfficialUrl}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="inline-flex items-center gap-2 text-[15px] text-white/75 transition hover:text-white"
                >
                  {footer.officialSite}
                  <ExternalLink className="h-3.5 w-3.5 opacity-60" aria-hidden />
                </a>
              </li>
              <li>
                <a href="#top" className="inline-flex items-center gap-2 text-[15px] text-white/75 transition hover:text-white">
                  {footer.backToTop}
                  <ArrowUp className="h-3.5 w-3.5 opacity-60" aria-hidden />
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6">
          <p className="max-w-3xl text-xs leading-relaxed text-white/45">{footer.disclaimer}</p>
          <p className="mt-4 text-xs text-white/35">
            © {year} {site.name}. {footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
