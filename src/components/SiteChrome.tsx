import Link from "next/link";
import { SERVICES, BUSINESS, WA_DEFAULT } from "@/lib/site";
import Logo from "./Logo";

/* Shared cinematic shell for interior (service/content) pages.
   Static dark-luxury treatment — no autoplay video — for fast LCP.
   Server component: renders full HTML for crawlers. */

function Header({ active }: { active?: string }) {
  return (
    <header className="pd-header">
      <div className="pd-header-inner">
        <Link href="/" className="pd-brand" aria-label="Piel Dorada — inicio">
          <Logo variant="seal" size={40} />
          <span className="pd-brand-txt">
            <span className="pd-brand-name">Piel Dorada</span>
            <span className="pd-brand-sub">Beauty &amp; Sun Spa</span>
          </span>
        </Link>
        <nav className="pd-nav" aria-label="Servicios">
          {SERVICES.map((s) => (
            <Link
              key={s.slug}
              href={`/${s.slug}`}
              className={`pd-navlink${active === s.slug ? " is-active" : ""}`}
            >
              {s.nav}
            </Link>
          ))}
        </nav>
        <a
          href={WA_DEFAULT}
          target="_blank"
          rel="noopener noreferrer"
          className="pd-cta-btn"
        >
          Reservar
        </a>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="pd-footer">
      <div className="pd-footer-grid">
        <div>
          <Logo variant="seal" size={50} className="pd-footer-seal" />
          <div className="pd-footer-brand text-gradient-gold">Piel Dorada</div>
          <p className="pd-footer-tag">by Daniela Miranda Studios</p>
          <p className="pd-footer-note">
            El primer spa de bronceado brasileño y camas de bronceado en El
            Salvador. Micropigmentación, cejas, pestañas, uñas y faciales en{" "}
            {BUSINESS.city}.
          </p>
        </div>

        <div>
          <h4 className="pd-footer-h">Servicios</h4>
          <ul className="pd-footer-links">
            {SERVICES.map((s) => (
              <li key={s.slug}>
                <Link href={`/${s.slug}`}>{s.nav}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="pd-footer-h">Estudio</h4>
          <ul className="pd-footer-links">
            <li>
              <Link href="/sobre-daniela">Sobre Daniela</Link>
            </li>
            <li>
              <Link href="/blog">Blog</Link>
            </li>
            <li>
              <Link href="/contacto">Contacto</Link>
            </li>
            <li>
              <Link href="/#lista-vip">Lista VIP</Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="pd-footer-h">Contacto</h4>
          <ul className="pd-footer-links">
            <li>
              <a href={WA_DEFAULT} target="_blank" rel="noopener noreferrer">
                WhatsApp {BUSINESS.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={BUSINESS.instagram} target="_blank" rel="noopener noreferrer">
                Instagram {BUSINESS.instagramHandle}
              </a>
            </li>
            <li>
              <a href={BUSINESS.facebook} target="_blank" rel="noopener noreferrer">
                Facebook
              </a>
            </li>
            <li>{BUSINESS.city}, {BUSINESS.countryName}</li>
          </ul>
        </div>
      </div>

      <div className="pd-footer-bottom">
        <span>
          © 2026 Piel Dorada — Beauty &amp; Sun Spa · {BUSINESS.city}, El
          Salvador
        </span>
        <span className="pd-footer-mm">by MachineMind</span>
      </div>
    </footer>
  );
}

/** Floating WhatsApp button — conversion + UX signal on every page. */
function WhatsAppFloat() {
  return (
    <a
      href={WA_DEFAULT}
      target="_blank"
      rel="noopener noreferrer"
      className="wa-float"
      aria-label="Escríbenos por WhatsApp"
    >
      <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
      </svg>
    </a>
  );
}

export default function SiteChrome({
  children,
  active,
}: {
  children: React.ReactNode;
  active?: string;
}) {
  return (
    <div className="grain pd-page">
      <div className="pd-bg" aria-hidden="true" />
      <Header active={active} />
      <main className="pd-main">{children}</main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
