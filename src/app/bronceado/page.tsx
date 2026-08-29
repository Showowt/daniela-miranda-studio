import type { Metadata } from "next";
import Link from "next/link";
import SiteChrome from "@/components/SiteChrome";
import JsonLd from "@/components/JsonLd";
import {
  Breadcrumbs,
  Faqs,
  RelatedServices,
  CtaBand,
} from "@/components/ServiceSections";
import {
  pageMetadata,
  serviceJsonLd,
  faqJsonLd,
  breadcrumbJsonLd,
  type Faq,
} from "@/lib/seo";
import { getService, AREAS_SERVED, WA_DEFAULT } from "@/lib/site";

const svc = getService("bronceado")!;

export const metadata: Metadata = pageMetadata({
  title: svc.title,
  description: svc.description,
  path: "bronceado",
  hasGeneratedOg: true,
  keywords: svc.keywords,
});

const faqs: Faq[] = [
  {
    q: "¿Cuánto cuesta el bronceado brasileño en El Salvador?",
    a: "En Piel Dorada ofrecemos bronceado en spray y membresías mensuales ilimitadas para broncearte todo el mes. Escríbenos por WhatsApp para conocer los precios actuales.",
  },
  {
    q: "¿Cuántas veces por semana debo usar la cama de bronceado?",
    a: "Para construir tu base se recomiendan 2 a 3 sesiones por semana; luego 1 a 2 semanales mantienen el color. Nuestro equipo te guía según tu tipo de piel.",
  },
  {
    q: "¿El bronceado brasileño es seguro?",
    a: "Sí. Usamos productos de alta calidad a base de DHA y protocolos controlados por tipo de piel para un bronceado parejo, natural y seguro, sin exposición a rayos UV.",
  },
  {
    q: "¿Cuánto dura un bronceado brasileño?",
    a: "Entre 7 y 10 días con el cuidado adecuado. Exfoliar antes e hidratar a diario después extiende la duración del color.",
  },
  {
    q: "¿Dónde puedo broncearme en San Salvador?",
    a: "En Piel Dorada — Beauty & Sun Spa, el primer spa de bronceado de El Salvador. Atendemos San Salvador, Escalón, Santa Elena, San Benito y Antiguo Cuscatlán.",
  },
];

export default function BronceadoPage() {
  const schema = [
    serviceJsonLd({
      serviceType: "Bronceado Brasileño",
      name: "Bronceado Brasileño y Camas de Bronceado",
      description:
        "El primer spa con camas de bronceado y bronceado brasileño en El Salvador. Bronceado seguro, parejo y natural en San Salvador.",
    }),
    faqJsonLd(faqs),
    breadcrumbJsonLd([
      { name: "Inicio", path: "" },
      { name: "Bronceado", path: "bronceado" },
    ]),
  ];

  return (
    <SiteChrome active="bronceado">
      <JsonLd data={schema} />

      <div className="pd-container">
        <Breadcrumbs
          items={[
            { name: "Inicio", path: "/" },
            { name: "Bronceado", path: "/bronceado" },
          ]}
        />
      </div>

      {/* HERO */}
      <section className="pd-hero">
        <div className="pd-container">
          <p className="pd-eyebrow">Primer spa de bronceado de El Salvador</p>
          <h1 className="pd-h1">
            Bronceado Brasileño y Camas de Bronceado en{" "}
            <span className="accent text-gradient-gold">San Salvador</span>
          </h1>
          <p className="pd-lead">{svc.tagline}</p>
          <div className="pd-cta-row">
            <a href={WA_DEFAULT} target="_blank" rel="noopener noreferrer" className="btn-gold">
              Agendar mi bronceado
            </a>
            <Link href="#membresias" className="btn-ghost">
              Ver membresías
            </Link>
          </div>
          <div className="chip-row">
            {["Bronceado brasileño", "Camas de bronceado UV", "Spray tan", "Bronceado sin sol", "Membresías"].map((c) => (
              <span className="chip" key={c}>
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="pd-section">
        <div className="pd-container pd-narrow pd-prose">
          <p>
            Por primera vez en <strong>El Salvador</strong>, broncearte deja de
            depender del sol. Piel Dorada es el <strong>primer y único spa de
            bronceado del país</strong>, con camas de bronceado profesionales,
            bronceado brasileño y spray tan en un solo lugar en{" "}
            <strong>San Salvador</strong>. Un color dorado, parejo y natural —
            sin quemaduras, sin marcas y sin horas al sol.
          </p>
          <p>
            Ya sea para una <strong>boda</strong>, un <strong>viaje a la
            playa</strong>, un evento o simplemente para lucir radiante todo el
            año, diseñamos tu bronceado según tu tono de piel para un resultado
            que se ve real.
          </p>
        </div>
      </section>

      {/* SUB-SERVICES */}
      <section className="pd-section" id="servicios">
        <div className="pd-container">
          <h2 className="pd-section-title" style={{ textAlign: "center", marginBottom: 20 }}>
            Nuestras formas de broncearte
          </h2>
          <div className="svc-grid">
            <div className="svc-card" id="brasileno">
              <span className="chip" aria-hidden="true">🌴</span>
              <h3>Bronceado Brasileño</h3>
              <p>
                Una fina bruma a base de DHA que reacciona con tu piel para un
                dorado natural y uniforme. Sin rayos UV, sin manchas. Ideal
                cuando quieres color de inmediato.
              </p>
              <span className="price">Precio: consultar</span>
            </div>
            <div className="svc-card" id="camas-uv">
              <span className="chip" aria-hidden="true">☀️</span>
              <h3>Camas de Bronceado UV</h3>
              <p>
                Las primeras camas de bronceado profesionales de El Salvador.
                Ambiente controlado e higiénico para construir tu base de color
                de forma gradual y segura.
              </p>
              <span className="price">Sesiones y paquetes</span>
            </div>
            <div className="svc-card" id="spray-tan">
              <span className="chip" aria-hidden="true">💨</span>
              <h3>Spray Tan</h3>
              <p>
                Aplicación profesional de spray tan personalizada a la
                intensidad que buscas — desde un brillo sutil hasta un dorado
                profundo. Listo en minutos.
              </p>
              <span className="price">Precio: consultar</span>
            </div>
            <div className="svc-card" id="membresias">
              <span className="chip" aria-hidden="true">💎</span>
              <h3>Membresías de Bronceado</h3>
              <p>
                Broncéate todo el mes con nuestras membresías. La forma más
                inteligente de mantener tu color siempre perfecto y ahorrar en
                cada sesión.
              </p>
              <span className="price">Membresías mensuales</span>
            </div>
          </div>
        </div>
      </section>

      {/* SAFETY / PROSE */}
      <section className="pd-section">
        <div className="pd-container pd-narrow pd-prose">
          <h2>Bronceado seguro, siempre</h2>
          <p>
            La seguridad de tu piel es lo primero. En cada servicio evaluamos tu{" "}
            <strong>tipo de piel</strong>, controlamos la intensidad y respetamos
            los tiempos para lograr un bronceado parejo sin comprometer tu salud.
            El bronceado brasileño y el spray tan <strong>no usan radiación
            UV</strong>: el color proviene de una reacción natural sobre tu piel.
          </p>
          <h2>Cómo preparar tu piel</h2>
          <ul>
            <li>Exfolia tu piel 24 horas antes para un color uniforme.</li>
            <li>Hidrata a diario — la piel hidratada retiene el bronceado.</li>
            <li>Evita cremas con aceite justo antes de tu sesión de spray tan.</li>
            <li>Usa ropa holgada y oscura después de la aplicación.</li>
          </ul>
          <p>
            ¿Tienes dudas sobre qué opción es mejor para ti? Lee más en nuestro{" "}
            <Link href="/blog/que-es-el-bronceado-brasileno">
              blog sobre el bronceado brasileño
            </Link>{" "}
            o escríbenos por WhatsApp y te asesoramos.
          </p>
        </div>
      </section>

      <Faqs faqs={faqs} />

      <CtaBand
        title="Reserva tu primer bronceado"
        text="Sé de las primeras en broncearte en el primer spa de bronceado de El Salvador. Escríbenos por WhatsApp o únete a la Lista VIP para precio de miembro fundador."
        waText="Hola ✨ quiero agendar un bronceado en Piel Dorada — ¿me cuentan opciones y precios?"
      />

      {/* AREAS SERVED — local SEO */}
      <section className="pd-section">
        <div className="pd-container" style={{ textAlign: "center" }}>
          <p className="pd-eyebrow">Bronceado cerca de ti</p>
          <div className="chip-row">
            {AREAS_SERVED.map((a) => (
              <span className="chip" key={a}>
                {a}
              </span>
            ))}
          </div>
        </div>
      </section>

      <RelatedServices slugs={svc.related} />
    </SiteChrome>
  );
}
