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

const svc = getService("cejas-pestanas")!;

export const metadata: Metadata = pageMetadata({
  title: svc.title,
  description: svc.description,
  path: "cejas-pestanas",
  hasGeneratedOg: true,
  keywords: svc.keywords,
});

const faqs: Faq[] = [
  {
    q: "¿Cuánto dura el laminado de cejas?",
    a: "Entre 4 y 6 semanas. Es un tratamiento que peina y fija tus cejas hacia arriba para una forma más definida y poblada, sin químicos agresivos.",
  },
  {
    q: "¿Qué diferencia hay entre lifting y extensiones de pestañas?",
    a: "El lifting curva y realza tus pestañas naturales (dura 6–8 semanas); las extensiones añaden fibras individuales para más largo y volumen (con retoques cada 2–3 semanas).",
  },
  {
    q: "¿El laminado de cejas o el lifting de pestañas dañan el vello natural?",
    a: "No, cuando se realizan con productos de calidad y por manos expertas. Respetamos los tiempos de exposición para cuidar tu vello natural.",
  },
  {
    q: "¿Cuánto duran las extensiones de pestañas?",
    a: "El efecto se mantiene con retoques cada 2 a 3 semanas, según tu ciclo natural de pestañas y el cuidado que les des.",
  },
];

export default function CejasPestanasPage() {
  const schema = [
    serviceJsonLd({
      serviceType: "Laminado de Cejas y Pestañas",
      name: "Laminado de Cejas, Lifting y Extensiones de Pestañas",
      description:
        "Laminado de cejas, lifting y extensiones de pestañas en San Salvador. Realza tu mirada con Piel Dorada.",
    }),
    faqJsonLd(faqs),
    breadcrumbJsonLd([
      { name: "Inicio", path: "" },
      { name: "Cejas y Pestañas", path: "cejas-pestanas" },
    ]),
  ];

  return (
    <SiteChrome active="cejas-pestanas">
      <JsonLd data={schema} />

      <div className="pd-container">
        <Breadcrumbs
          items={[
            { name: "Inicio", path: "/" },
            { name: "Cejas y Pestañas", path: "/cejas-pestanas" },
          ]}
        />
      </div>

      <section className="pd-hero">
        <div className="pd-container">
          <p className="pd-eyebrow">Realza tu mirada</p>
          <h1 className="pd-h1">
            Laminado de Cejas, Lifting y Extensiones de Pestañas en{" "}
            <span className="accent text-gradient-gold">San Salvador</span>
          </h1>
          <p className="pd-lead">{svc.tagline}</p>
          <div className="pd-cta-row">
            <a href={WA_DEFAULT} target="_blank" rel="noopener noreferrer" className="btn-gold">
              Agendar mi cita
            </a>
            <Link href="/micropigmentacion" className="btn-ghost">
              Ver micropigmentación
            </Link>
          </div>
          <div className="chip-row">
            {["Laminado de cejas", "Diseño de cejas", "Lifting de pestañas", "Extensiones pelo a pelo", "Volumen de pestañas"].map((c) => (
              <span className="chip" key={c}>{c}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="pd-section">
        <div className="pd-container pd-narrow pd-prose">
          <p>
            Tu mirada es tu firma. En Piel Dorada realzamos tus cejas y pestañas
            naturales con técnicas modernas y productos de alta calidad, para un
            resultado impecable que se ve fresco y natural — en{" "}
            <strong>San Salvador</strong>.
          </p>
        </div>
      </section>

      <section className="pd-section">
        <div className="pd-container">
          <h2 className="pd-section-title" style={{ textAlign: "center", marginBottom: 20 }}>
            Nuestros tratamientos
          </h2>
          <div className="svc-grid cols-3">
            <div className="svc-card" id="laminado">
              <span className="chip" aria-hidden="true">✨</span>
              <h3>Laminado de Cejas</h3>
              <p>
                Peina y fija tus cejas hacia arriba para una forma definida, más
                poblada y ordenada. Efecto de cejas perfectas por 4 a 6 semanas.
              </p>
              <span className="price">Precio: consultar</span>
            </div>
            <div className="svc-card" id="lifting">
              <span className="chip" aria-hidden="true">👁️</span>
              <h3>Lifting de Pestañas</h3>
              <p>
                Curva y eleva tus pestañas naturales desde la raíz para una
                mirada abierta y despierta, sin necesidad de extensiones. Dura
                6 a 8 semanas.
              </p>
              <span className="price">Precio: consultar</span>
            </div>
            <div className="svc-card" id="extensiones">
              <span className="chip" aria-hidden="true">💫</span>
              <h3>Extensiones de Pestañas</h3>
              <p>
                Fibras individuales aplicadas pelo a pelo o en volumen para más
                largo y densidad. Personalizamos el estilo a tu gusto y a tus
                facciones.
              </p>
              <span className="price">Pelo a pelo · Volumen</span>
            </div>
          </div>
        </div>
      </section>

      <Faqs faqs={faqs} />

      <CtaBand
        title="Agenda cejas y pestañas perfectas"
        text="Laminado, lifting o extensiones — te ayudamos a elegir lo mejor para tu mirada. Escríbenos por WhatsApp."
        waText="Hola ✨ quiero agendar laminado de cejas / lifting / extensiones en Piel Dorada."
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
