import type { Metadata } from "next";
import Link from "next/link";
import SiteChrome from "@/components/SiteChrome";
import JsonLd from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/ServiceSections";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { BUSINESS, AREAS_SERVED, WA_DEFAULT } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Contacto | Piel Dorada — Beauty & Sun Spa en San Salvador",
  description:
    "Contacta a Piel Dorada — Beauty & Sun Spa en San Salvador. Agenda por WhatsApp al +503 7310 6004, síguenos en Instagram y reserva tu cita de belleza y bronceado.",
  path: "contacto",
});

export default function ContactoPage() {
  const schema = breadcrumbJsonLd([
    { name: "Inicio", path: "" },
    { name: "Contacto", path: "contacto" },
  ]);

  return (
    <SiteChrome>
      <JsonLd data={schema} />

      <div className="pd-container">
        <Breadcrumbs
          items={[
            { name: "Inicio", path: "/" },
            { name: "Contacto", path: "/contacto" },
          ]}
        />
      </div>

      <section className="pd-hero" style={{ paddingBottom: 20 }}>
        <div className="pd-container">
          <p className="pd-eyebrow">Estamos para ti</p>
          <h1 className="pd-h1">
            Contacto ·{" "}
            <span className="accent text-gradient-gold">San Salvador</span>
          </h1>
          <p className="pd-lead">
            Agenda tu cita de bronceado, micropigmentación, cejas, pestañas, uñas
            o faciales. La forma más rápida de reservar es por WhatsApp.
          </p>
          <div className="pd-cta-row">
            <a href={WA_DEFAULT} target="_blank" rel="noopener noreferrer" className="btn-gold">
              Escribir por WhatsApp
            </a>
            <Link href="/#lista-vip" className="btn-ghost">
              Únete a la Lista VIP
            </Link>
          </div>
        </div>
      </section>

      <section className="pd-section" style={{ paddingTop: 8 }}>
        <div className="pd-container">
          <div className="info-grid">
            <div className="info-card">
              <h3>WhatsApp &amp; Teléfono</h3>
              <a href={WA_DEFAULT} target="_blank" rel="noopener noreferrer">
                {BUSINESS.phoneDisplay}
              </a>
              <p style={{ marginTop: 8, fontSize: 13, color: "rgba(255,255,255,0.5)" }}>
                Respuesta rápida por WhatsApp para agendar y resolver dudas.
              </p>
            </div>

            <div className="info-card">
              <h3>Redes</h3>
              <a href={BUSINESS.instagram} target="_blank" rel="noopener noreferrer">
                Instagram {BUSINESS.instagramHandle}
              </a>
              <a href={BUSINESS.facebook} target="_blank" rel="noopener noreferrer">
                Facebook · Piel Dorada
              </a>
            </div>

            <div className="info-card">
              <h3>Ubicación</h3>
              <p>{BUSINESS.addressStreet}</p>
              <p>
                {BUSINESS.addressLocality}, {BUSINESS.addressRegion},{" "}
                {BUSINESS.countryName}
              </p>
              <a href={BUSINESS.mapsUrl} target="_blank" rel="noopener noreferrer">
                Ver en Google Maps →
              </a>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginTop: 8 }}>
                En Ciudad Merliot — a minutos de Santa Elena, San Benito,
                Antiguo Cuscatlán y San Salvador.
              </p>
            </div>

            <div className="info-card">
              <h3>Horario</h3>
              <p>Lunes a Sábado · 9:00 a.m. – 7:00 p.m.</p>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>
                Apertura {BUSINESS.openingLabel}. Reserva anticipada disponible
                por WhatsApp.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="pd-section">
        <div className="pd-container" style={{ textAlign: "center" }}>
          <p className="pd-eyebrow">Zonas que atendemos</p>
          <div className="chip-row">
            {AREAS_SERVED.map((a) => (
              <span className="chip" key={a}>{a}</span>
            ))}
          </div>
        </div>
      </section>
    </SiteChrome>
  );
}
