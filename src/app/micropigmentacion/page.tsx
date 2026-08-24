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

const svc = getService("micropigmentacion")!;

export const metadata: Metadata = pageMetadata({
  title: svc.title,
  description: svc.description,
  path: "micropigmentacion",
  hasGeneratedOg: true,
});

const faqs: Faq[] = [
  {
    q: "¿Cuánto dura la micropigmentación de cejas?",
    a: "Entre 1 y 3 años, según tu tipo de piel, la técnica y el cuidado. Se incluye una sesión de retoque a las 4–6 semanas y se recomienda un retoque anual.",
  },
  {
    q: "¿La micropigmentación duele?",
    a: "Es un procedimiento muy tolerable. Aplicamos anestésico tópico para minimizar cualquier molestia durante la sesión.",
  },
  {
    q: "¿Cuál es la diferencia entre microblading y powder brows?",
    a: "El microblading imita pelo a pelo para un acabado natural; el powder brows (efecto polvo) da un acabado tipo maquillaje, difuminado y con más durabilidad, ideal para pieles grasas.",
  },
  {
    q: "¿Qué son los Hydra Lips?",
    a: "Es una micropigmentación de labios que aporta color, define el contorno y da un efecto hidratado y saludable, neutralizando tonos oscuros.",
  },
  {
    q: "¿Quién realiza la micropigmentación en Piel Dorada?",
    a: "Daniela Miranda, la única artista Miss PMU Internacional de El Salvador, con reconocimiento internacional en maquillaje permanente.",
  },
];

export default function MicropigmentacionPage() {
  const schema = [
    serviceJsonLd({
      serviceType: "Micropigmentación",
      name: "Micropigmentación de Cejas y Labios",
      description:
        "Micropigmentación de cejas, labios e Hydra Lips por Daniela Miranda, la única artista Miss PMU Internacional de El Salvador.",
    }),
    faqJsonLd(faqs),
    breadcrumbJsonLd([
      { name: "Inicio", path: "" },
      { name: "Micropigmentación", path: "micropigmentacion" },
    ]),
  ];

  return (
    <SiteChrome active="micropigmentacion">
      <JsonLd data={schema} />

      <div className="pd-container">
        <Breadcrumbs
          items={[
            { name: "Inicio", path: "/" },
            { name: "Micropigmentación", path: "/micropigmentacion" },
          ]}
        />
      </div>

      <section className="pd-hero">
        <div className="pd-container">
          <p className="pd-eyebrow">Por Daniela Miranda · Miss PMU Internacional</p>
          <h1 className="pd-h1">
            Micropigmentación de Cejas y Labios en{" "}
            <span className="accent text-gradient-gold">San Salvador</span>
          </h1>
          <p className="pd-lead">{svc.tagline}</p>
          <div className="pd-cta-row">
            <a href={WA_DEFAULT} target="_blank" rel="noopener noreferrer" className="btn-gold">
              Agendar valoración
            </a>
            <Link href="/sobre-daniela" className="btn-ghost">
              Conocer a Daniela
            </Link>
          </div>
          <div className="chip-row">
            {["Microblading", "Powder brows", "Cejas efecto polvo", "Hydra Lips", "Neutralización de labios", "Maquillaje permanente"].map((c) => (
              <span className="chip" key={c}>{c}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="pd-section">
        <div className="pd-container pd-narrow pd-prose">
          <p>
            Amanece con <strong>cejas perfectas</strong> todos los días. La
            micropigmentación es un maquillaje semipermanente que define, rellena
            y da forma a tus cejas y labios con pigmentos de alta calidad y un
            acabado natural. En Piel Dorada, tu rostro está en manos de{" "}
            <strong>Daniela Miranda</strong>, la única artista{" "}
            <strong>Miss PMU Internacional</strong> de El Salvador.
          </p>
        </div>
      </section>

      <section className="pd-section">
        <div className="pd-container">
          <h2 className="pd-section-title" style={{ textAlign: "center", marginBottom: 20 }}>
            Nuestros servicios de micropigmentación
          </h2>
          <div className="svc-grid">
            <div className="svc-card" id="cejas">
              <span className="chip" aria-hidden="true">👑</span>
              <h3>Cejas · Microblading &amp; Powder Brows</h3>
              <p>
                Diseñamos la forma ideal para tu rostro. Microblading pelo a pelo
                para un acabado natural, o powder brows (efecto polvo) para un
                acabado difuminado y de mayor durabilidad.
              </p>
              <span className="price">Precio: consultar</span>
            </div>
            <div className="svc-card" id="labios">
              <span className="chip" aria-hidden="true">💋</span>
              <h3>Labios · Hydra Lips</h3>
              <p>
                Aporta color, define el contorno y neutraliza tonos oscuros para
                unos labios con efecto hidratado, saludable y con un color que
                dura.
              </p>
              <span className="price">Consulta precio</span>
            </div>
            <div className="svc-card">
              <span className="chip" aria-hidden="true">✨</span>
              <h3>Retoque y mantenimiento</h3>
              <p>
                Incluye sesión de perfeccionamiento a las 4–6 semanas. Un retoque
                anual mantiene tus cejas y labios siempre impecables.
              </p>
              <span className="price">Retoque anual</span>
            </div>
          </div>
        </div>
      </section>

      <section className="pd-section">
        <div className="pd-container pd-narrow pd-prose">
          <h2>¿Por qué tu artista importa?</h2>
          <p>
            La micropigmentación es arte sobre la piel: el resultado depende
            enormemente de la técnica, el ojo estético y la experiencia de quien
            la realiza. La credencial <strong>Miss PMU Internacional</strong> de
            Daniela es un reconocimiento que ninguna otra artista en El Salvador
            posee. Conoce{" "}
            <Link href="/sobre-daniela">su trayectoria y su arte</Link>.
          </p>
          <p>
            ¿Cuánto dura y cómo se cuida? Lee nuestra guía:{" "}
            <Link href="/blog/cuanto-dura-la-micropigmentacion-de-cejas">
              ¿cuánto dura la micropigmentación de cejas?
            </Link>
          </p>
        </div>
      </section>

      <Faqs faqs={faqs} />

      <CtaBand
        title="Agenda tu micropigmentación"
        text="Cejas y labios perfectos con la única artista Miss PMU Internacional de El Salvador. Escríbenos para tu valoración personalizada."
        waText="Hola 👑 quiero información sobre micropigmentación de cejas/labios en Piel Dorada."
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
