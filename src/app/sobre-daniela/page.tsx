import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SiteChrome from "@/components/SiteChrome";
import JsonLd from "@/components/JsonLd";
import { Breadcrumbs, CtaBand, AllServicesGrid } from "@/components/ServiceSections";
import { pageMetadata, personJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { BUSINESS } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Sobre Daniela Miranda — Miss PMU Internacional | Piel Dorada",
  description:
    "Conoce a Daniela Miranda, la única artista Miss PMU Internacional de El Salvador y fundadora de Piel Dorada — Beauty & Sun Spa en San Salvador.",
  path: "sobre-daniela",
});

export default function SobreDanielaPage() {
  const schema = [
    personJsonLd(),
    breadcrumbJsonLd([
      { name: "Inicio", path: "" },
      { name: "Sobre Daniela", path: "sobre-daniela" },
    ]),
  ];

  return (
    <SiteChrome>
      <JsonLd data={schema} />

      <div className="pd-container">
        <Breadcrumbs
          items={[
            { name: "Inicio", path: "/" },
            { name: "Sobre Daniela", path: "/sobre-daniela" },
          ]}
        />
      </div>

      <section className="pd-hero" style={{ paddingBottom: 12 }}>
        <div className="pd-container">
          <p className="pd-eyebrow">La artista detrás de Piel Dorada</p>
          <h1 className="pd-h1">
            Daniela Miranda ·{" "}
            <span className="accent text-gradient-gold">Miss PMU Internacional</span>
          </h1>
        </div>
      </section>

      <section className="pd-section" style={{ paddingTop: 12 }}>
        <div
          className="pd-container"
          style={{
            display: "grid",
            gap: 32,
            gridTemplateColumns: "1fr",
            alignItems: "start",
          }}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              maxWidth: 380,
              margin: "0 auto",
              aspectRatio: "3 / 4",
              borderRadius: 20,
              overflow: "hidden",
              border: "1px solid rgba(201,168,76,0.3)",
              boxShadow: "0 24px 60px rgba(0,0,0,0.5)",
            }}
          >
            <Image
              src="/images/daniela-miranda.jpg"
              alt="Daniela Miranda, artista Miss PMU Internacional y fundadora de Piel Dorada en San Salvador"
              fill
              sizes="(max-width: 720px) 100vw, 380px"
              style={{ objectFit: "cover" }}
              priority
            />
          </div>

          <div className="pd-prose">
            <p>
              <strong>Daniela Miranda</strong> es la fundadora de Piel Dorada —
              Beauty &amp; Sun Spa y la única artista{" "}
              <strong>Miss PMU Internacional</strong> de El Salvador, una
              distinción que reconoce la excelencia en el arte del maquillaje
              permanente a nivel internacional.
            </p>
            <p>
              Su especialidad es transformar rostros con{" "}
              <Link href="/micropigmentacion">micropigmentación de cejas y
              labios</Link> de acabado natural: cejas que enmarcan la mirada y
              labios con color y vida. Cada trabajo combina técnica, precisión y
              un ojo estético formado a lo largo de años de práctica y
              certificaciones.
            </p>
            <p>
              Con Piel Dorada, Daniela lleva su visión un paso más allá: crear el{" "}
              <strong>primer spa de bronceado de lujo de El Salvador</strong>,
              donde el bronceado brasileño, la micropigmentación, las cejas,
              pestañas, uñas y faciales conviven bajo un mismo estándar de
              calidad y estética.
            </p>

            <h2>Lo que la distingue</h2>
            <ul>
              <li>Única artista <strong>Miss PMU Internacional</strong> de El Salvador.</li>
              <li>Especialista en micropigmentación de cejas y labios de acabado natural.</li>
              <li>Fundadora del primer spa de bronceado de lujo del país.</li>
              <li>Enfoque personalizado según el rostro y el tono de piel de cada clienta.</li>
            </ul>

            <p>
              Sigue su trabajo en Instagram{" "}
              <a href={BUSINESS.instagram} target="_blank" rel="noopener noreferrer">
                {BUSINESS.instagramHandle}
              </a>{" "}
              y descubre resultados reales de clientas reales.
            </p>
          </div>
        </div>
      </section>

      <section className="pd-section">
        <div className="pd-container">
          <h2 className="pd-section-title" style={{ textAlign: "center", marginBottom: 18 }}>
            Servicios de Piel Dorada
          </h2>
          <AllServicesGrid />
        </div>
      </section>

      <CtaBand
        title="Agenda con Daniela"
        text="Cejas, labios y belleza en manos de la única artista Miss PMU Internacional de El Salvador. Escríbenos por WhatsApp."
        waText="Hola 👑 quiero agendar con Daniela en Piel Dorada."
      />
    </SiteChrome>
  );
}
