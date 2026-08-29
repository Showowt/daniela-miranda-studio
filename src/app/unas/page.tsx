import type { Metadata } from "next";
import Link from "next/link";
import SiteChrome from "@/components/SiteChrome";
import JsonLd from "@/components/JsonLd";
import { Breadcrumbs, Faqs, RelatedServices, CtaBand } from "@/components/ServiceSections";
import {
  pageMetadata,
  serviceJsonLd,
  faqJsonLd,
  breadcrumbJsonLd,
  type Faq,
} from "@/lib/seo";
import { getService, AREAS_SERVED, WA_DEFAULT } from "@/lib/site";

const svc = getService("unas")!;

export const metadata: Metadata = pageMetadata({
  title: svc.title,
  description: svc.description,
  path: "unas",
  hasGeneratedOg: true,
  keywords: svc.keywords,
});

const faqs: Faq[] = [
  {
    q: "¿Cuánto dura el esmaltado permanente?",
    a: "Entre 2 y 3 semanas sin descascararse, manteniendo el brillo desde el primer día. Es ideal si buscas una manicure que dure y se vea impecable.",
  },
  {
    q: "¿Cuánto duran las uñas acrílicas?",
    a: "Con buen cuidado, de 3 a 4 semanas. Se recomienda un relleno cada 2 a 3 semanas para mantenerlas siempre perfectas.",
  },
  {
    q: "¿Ofrecen nail art y diseños personalizados?",
    a: "Sí. Desde acabados nude y elegantes hasta nail art detallado, diseñamos tus uñas a tu estilo para cualquier ocasión.",
  },
  {
    q: "¿Hacen manicure y pedicure spa?",
    a: "Sí, ofrecemos manicure y pedicure spa completos, con cuidado de cutículas, exfoliación e hidratación para manos y pies impecables.",
  },
];

export default function UnasPage() {
  const schema = [
    serviceJsonLd({
      serviceType: "Uñas y Manicure",
      name: "Uñas Acrílicas, Manicure y Pedicure",
      description:
        "Uñas acrílicas, esmaltado permanente, manicure y pedicure spa en San Salvador. Diseños elegantes y duraderos en Piel Dorada.",
    }),
    faqJsonLd(faqs),
    breadcrumbJsonLd([
      { name: "Inicio", path: "" },
      { name: "Uñas", path: "unas" },
    ]),
  ];

  return (
    <SiteChrome active="unas">
      <JsonLd data={schema} />

      <div className="pd-container">
        <Breadcrumbs
          items={[
            { name: "Inicio", path: "/" },
            { name: "Uñas", path: "/unas" },
          ]}
        />
      </div>

      <section className="pd-hero">
        <div className="pd-container">
          <p className="pd-eyebrow">Diseños que duran</p>
          <h1 className="pd-h1">
            Uñas Acrílicas, Manicure y Pedicure en{" "}
            <span className="accent text-gradient-gold">San Salvador</span>
          </h1>
          <p className="pd-lead">{svc.tagline}</p>
          <div className="pd-cta-row">
            <a href={WA_DEFAULT} target="_blank" rel="noopener noreferrer" className="btn-gold">
              Agendar mi cita
            </a>
          </div>
          <div className="chip-row">
            {["Uñas acrílicas", "Esmaltado permanente", "Uñas gel", "Manicure", "Pedicure spa", "Nail art"].map((c) => (
              <span className="chip" key={c}>{c}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="pd-section">
        <div className="pd-container pd-narrow pd-prose">
          <p>
            Unas uñas bien cuidadas lo cambian todo. En Piel Dorada creamos
            manos y pies impecables con acabados elegantes y duraderos — desde un
            nude sofisticado hasta nail art detallado — en{" "}
            <strong>San Salvador</strong>.
          </p>
        </div>
      </section>

      <section className="pd-section">
        <div className="pd-container">
          <h2 className="pd-section-title" style={{ textAlign: "center", marginBottom: 20 }}>
            Nuestros servicios de uñas
          </h2>
          <div className="svc-grid">
            <div className="svc-card">
              <span className="chip" aria-hidden="true">💅</span>
              <h3>Uñas Acrílicas</h3>
              <p>Estructura, forma y largo a tu medida, con diseños que van de lo clásico a lo atrevido.</p>
              <span className="price">Precio: consultar</span>
            </div>
            <div className="svc-card">
              <span className="chip" aria-hidden="true">✨</span>
              <h3>Esmaltado Permanente</h3>
              <p>Color y brillo intactos por 2 a 3 semanas, sin descascararse. La manicure que dura.</p>
              <span className="price">Precio: consultar</span>
            </div>
            <div className="svc-card">
              <span className="chip" aria-hidden="true">🌸</span>
              <h3>Manicure &amp; Pedicure Spa</h3>
              <p>Cuidado completo de cutículas, exfoliación e hidratación para manos y pies suaves.</p>
              <span className="price">Consulta precio</span>
            </div>
          </div>
        </div>
      </section>

      <Faqs faqs={faqs} />

      <CtaBand
        title="Reserva tus uñas"
        text="Diseños elegantes que duran, en el ambiente premium de Piel Dorada. Escríbenos por WhatsApp para agendar."
        waText="Hola 💅 quiero agendar uñas / manicure / pedicure en Piel Dorada."
      />

      <section className="pd-section">
        <div className="pd-container" style={{ textAlign: "center" }}>
          <p className="pd-eyebrow">Atendemos en</p>
          <div className="chip-row">
            {AREAS_SERVED.map((a) => (
              <span className="chip" key={a}>{a}</span>
            ))}
          </div>
        </div>
      </section>

      <RelatedServices slugs={svc.related} />
    </SiteChrome>
  );
}
