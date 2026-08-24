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

const svc = getService("faciales")!;

export const metadata: Metadata = pageMetadata({
  title: svc.title,
  description: svc.description,
  path: "faciales",
  hasGeneratedOg: true,
});

const faqs: Faq[] = [
  {
    q: "¿Cada cuánto debo hacerme una limpieza facial?",
    a: "Se recomienda una limpieza facial profunda cada 4 a 6 semanas para mantener la piel limpia, oxigenada y radiante.",
  },
  {
    q: "¿La limpieza facial sirve para el acné?",
    a: "Sí, ayuda a descongestionar los poros y a controlar la grasa. Adaptamos el tratamiento a tu tipo de piel y necesidades.",
  },
  {
    q: "¿Ofrecen depilación?",
    a: "Sí, ofrecemos servicios de depilación facial y corporal como parte de nuestra oferta de belleza integral.",
  },
];

export default function FacialesPage() {
  const schema = [
    serviceJsonLd({
      serviceType: "Limpieza Facial",
      name: "Limpieza Facial y Tratamientos de Belleza",
      description:
        "Limpieza facial profunda, tratamientos faciales y depilación en San Salvador. Piel radiante en Piel Dorada — Beauty & Sun Spa.",
    }),
    faqJsonLd(faqs),
    breadcrumbJsonLd([
      { name: "Inicio", path: "" },
      { name: "Faciales", path: "faciales" },
    ]),
  ];

  return (
    <SiteChrome active="faciales">
      <JsonLd data={schema} />

      <div className="pd-container">
        <Breadcrumbs
          items={[
            { name: "Inicio", path: "/" },
            { name: "Faciales", path: "/faciales" },
          ]}
        />
      </div>

      <section className="pd-hero">
        <div className="pd-container">
          <p className="pd-eyebrow">Piel radiante</p>
          <h1 className="pd-h1">
            Limpieza Facial y Tratamientos de Belleza en{" "}
            <span className="accent text-gradient-gold">San Salvador</span>
          </h1>
          <p className="pd-lead">{svc.tagline}</p>
          <div className="pd-cta-row">
            <a href={WA_DEFAULT} target="_blank" rel="noopener noreferrer" className="btn-gold">
              Agendar mi facial
            </a>
          </div>
          <div className="chip-row">
            {["Limpieza facial profunda", "Tratamiento facial", "Depilación", "Cuidado de la piel"].map((c) => (
              <span className="chip" key={c}>{c}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="pd-section">
        <div className="pd-container pd-narrow pd-prose">
          <p>
            Una piel sana es la mejor base de belleza. En Piel Dorada cuidamos tu
            rostro con limpiezas faciales profundas y tratamientos personalizados
            que dejan tu piel limpia, oxigenada y luminosa — en{" "}
            <strong>San Salvador</strong>.
          </p>
          <h2>Tratamientos disponibles</h2>
          <ul>
            <li><strong>Limpieza facial profunda</strong> — descongestiona poros y renueva la piel.</li>
            <li><strong>Tratamientos faciales personalizados</strong> — según tu tipo de piel y objetivos.</li>
            <li><strong>Depilación</strong> facial y corporal.</li>
          </ul>
          <p>
            Combina tu facial con un{" "}
            <Link href="/bronceado">bronceado</Link> o una sesión de{" "}
            <Link href="/unas">uñas</Link> para una experiencia de belleza
            completa.
          </p>
        </div>
      </section>

      <Faqs faqs={faqs} />

      <CtaBand
        title="Reserva tu tratamiento facial"
        text="Cuida tu piel en el ambiente premium de Piel Dorada. Escríbenos por WhatsApp para agendar."
        waText="Hola 🧖‍♀️ quiero información sobre limpieza facial / tratamientos en Piel Dorada."
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
