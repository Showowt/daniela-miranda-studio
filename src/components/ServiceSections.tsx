import Link from "next/link";
import { SERVICES, getService, WA_DEFAULT, BUSINESS } from "@/lib/site";
import type { Faq } from "@/lib/seo";

/* Shared building blocks for service / content pages. Server components. */

export function Breadcrumbs({
  items,
}: {
  items: { name: string; path: string }[];
}) {
  return (
    <nav className="breadcrumb" aria-label="Ruta de navegación">
      {items.map((it, i) => (
        <span key={it.path} style={{ display: "contents" }}>
          {i < items.length - 1 ? (
            <>
              <Link href={it.path || "/"}>{it.name}</Link>
              <span aria-hidden="true">/</span>
            </>
          ) : (
            <span style={{ color: "rgba(255,255,255,0.55)" }}>{it.name}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

export function Faqs({ faqs, title = "Preguntas frecuentes" }: { faqs: Faq[]; title?: string }) {
  return (
    <section className="pd-section">
      <div className="pd-container pd-narrow">
        <h2 className="pd-section-title" style={{ textAlign: "center", marginBottom: 24 }}>
          {title}
        </h2>
        <div className="faq">
          {faqs.map((f) => (
            <div className="faq-item" key={f.q}>
              <h3>{f.q}</h3>
              <p>{f.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function RelatedServices({ slugs }: { slugs: string[] }) {
  const items = slugs.map(getService).filter(Boolean);
  if (items.length === 0) return null;
  return (
    <section className="pd-section">
      <div className="pd-container">
        <h2 className="pd-section-title" style={{ textAlign: "center", marginBottom: 8 }}>
          También te puede interesar
        </h2>
        <div className="related-grid">
          {items.map((s) => (
            <Link key={s!.slug} href={`/${s!.slug}`} className="related-card">
              <span className="r-emoji" aria-hidden="true">
                {s!.emoji}
              </span>
              <span className="r-text">
                <span className="r-title">{s!.nav}</span>
                <span className="r-sub">Ver servicio →</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CtaBand({
  title = "Agenda tu cita en San Salvador",
  text = "Escríbenos por WhatsApp y con gusto te asesoramos. Apertura Septiembre 2026 — reserva tu lugar hoy.",
  waText,
}: {
  title?: string;
  text?: string;
  waText?: string;
}) {
  const href = waText
    ? `https://wa.me/${BUSINESS.whatsappNumber}?text=${encodeURIComponent(waText)}`
    : WA_DEFAULT;
  return (
    <section className="pd-section">
      <div className="cta-band">
        <h2>{title}</h2>
        <p>{text}</p>
        <div className="pd-cta-row">
          <a href={href} target="_blank" rel="noopener noreferrer" className="btn-gold">
            Reservar por WhatsApp
          </a>
          <Link href="/#lista-vip" className="btn-ghost">
            Únete a la Lista VIP
          </Link>
        </div>
      </div>
    </section>
  );
}

/** Compact grid of all services — used on hubs for internal linking. */
export function AllServicesGrid({ exclude }: { exclude?: string }) {
  return (
    <div className="svc-grid cols-3">
      {SERVICES.filter((s) => s.slug !== exclude).map((s) => (
        <Link
          key={s.slug}
          href={`/${s.slug}`}
          className="svc-card"
          style={{ textDecoration: "none" }}
        >
          <span className="chip" aria-hidden="true">
            {s.emoji}
          </span>
          <h3>{s.nav}</h3>
          <p>{s.tagline}</p>
        </Link>
      ))}
    </div>
  );
}
