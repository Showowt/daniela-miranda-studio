/* ═══════════════════════════════════════════════════════════════
   PIEL DORADA — single source of truth for NAP, geo, services.
   Every canonical URL, sitemap entry, schema @id, nav link and
   cross-link derives from here. Canonical host = www (apex 308s to it).
   ═══════════════════════════════════════════════════════════════ */

export const SITE_URL = "https://www.pieldoradasv.com";

export const BUSINESS = {
  name: "Piel Dorada — Beauty & Sun Spa",
  shortName: "Piel Dorada",
  alternateName: "Daniela Miranda Studio",
  founder: "Daniela Miranda",
  founderTitle: "Artista Miss PMU Internacional",
  phoneDisplay: "+503 6224 8518",
  phoneE164: "+50362248518",
  whatsappNumber: "50362248518",
  email: "hola@pieldoradasv.com",
  // Physical location — Jardines de Merliot, Santa Tecla (greater San Salvador metro)
  addressStreet:
    'Calle Cuyagualo, Lote No. 28-A, Polígono "L", Urbanización Jardines de Merliot',
  addressLocality: "Santa Tecla",
  addressRegion: "La Libertad",
  postalCode: "",
  // Marketing metro — primary search keyword; Merliot is greater San Salvador
  city: "San Salvador",
  region: "San Salvador",
  country: "SV",
  countryName: "El Salvador",
  geo: { lat: 13.6772, lng: -89.2707 },
  mapsUrl: "https://maps.google.com/?q=13.6772,-89.2707",
  openingLabel: "Septiembre 2026",
  instagram: "https://instagram.com/danielamirandapmu",
  instagramHandle: "@danielamirandapmu",
  instagramAlt: "https://instagram.com/damiranda_",
  facebook: "https://www.facebook.com/pieldoradasv",
  tiktok: "https://www.tiktok.com/@danielamirandastudio",
  tiktokHandle: "@danielamirandastudio",
  ogImage: `${SITE_URL}/og-share.jpg`,
} as const;

/** Areas served — geo-modifiers used across schema + local content. */
export const AREAS_SERVED = [
  "San Salvador",
  "Santa Tecla",
  "Ciudad Merliot",
  "Antiguo Cuscatlán",
  "Santa Elena",
  "Colonia Escalón",
  "Colonia San Benito",
  "Nuevo Cuscatlán",
  "Zona Rosa",
  "La Gran Vía",
  "Multiplaza",
] as const;

/** wa.me deep link with a pre-filled message. */
export function waLink(text: string): string {
  return `https://wa.me/${BUSINESS.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

export const WA_DEFAULT = waLink(
  "Hola ✨ me interesa Piel Dorada — quisiera más información y agendar.",
);

export type ServiceDef = {
  slug: string; // route under /
  nav: string; // short nav label
  h1: string; // page H1 (contains primary keyword)
  title: string; // <title>
  description: string; // meta description (150–160 chars)
  tagline: string; // hero sub-line
  serviceType: string; // schema serviceType
  emoji: string;
  icon: string; // bespoke line-icon name (see components/Icon.tsx)
  priceFrom?: string; // schema Offer price (USD, soft "desde")
  keywords: string[];
  /** Related slugs for internal linking (topical authority). */
  related: string[];
};

/* ── SERVICE UNIVERSE (drives nav, sitemap, cross-links, schema) ── */
export const SERVICES: ServiceDef[] = [
  {
    slug: "bronceado",
    nav: "Bronceado",
    h1: "Bronceado Brasileño y Camas de Bronceado en San Salvador",
    title:
      "Bronceado Brasileño y Camas de Bronceado en San Salvador | Piel Dorada",
    description:
      "El primer y único spa con camas de bronceado y bronceado brasileño en El Salvador. Bronceado seguro, parejo y natural en San Salvador. Membresías mensuales disponibles.",
    tagline:
      "El primer spa de bronceado de lujo del país — camas de bronceado, bronceado brasileño y spray tan en San Salvador.",
    serviceType: "Bronceado Brasileño",
    emoji: "☀️",
    icon: "sun",
    priceFrom: "45",
    keywords: [
      "bronceado El Salvador",
      "bronceado San Salvador",
      "bronceado brasileño El Salvador",
      "camas de bronceado San Salvador",
      "cama solar El Salvador",
      "solárium San Salvador",
      "spray tan El Salvador",
      "bronceado sin sol El Salvador",
    ],
    related: ["micropigmentacion", "cejas-pestanas", "unas"],
  },
  {
    slug: "micropigmentacion",
    nav: "Micropigmentación",
    h1: "Micropigmentación de Cejas y Labios en San Salvador",
    title: "Micropigmentación de Cejas y Labios en San Salvador | Piel Dorada",
    description:
      "Micropigmentación de cejas, labios e Hydra Lips por Daniela Miranda, la única artista Miss PMU Internacional de El Salvador. Cejas perfectas y naturales en San Salvador.",
    tagline:
      "Cejas y labios perfectos con la única artista Miss PMU Internacional de El Salvador.",
    serviceType: "Micropigmentación",
    emoji: "👑",
    icon: "crown",
    priceFrom: "150",
    keywords: [
      "micropigmentación de cejas El Salvador",
      "micropigmentación de labios San Salvador",
      "microblading San Salvador",
      "powder brows El Salvador",
      "Hydra Lips El Salvador",
      "maquillaje permanente El Salvador",
      "Miss PMU Internacional El Salvador",
    ],
    related: ["cejas-pestanas", "bronceado", "sobre-daniela"],
  },
  {
    slug: "cejas-pestanas",
    nav: "Cejas & Pestañas",
    h1: "Laminado de Cejas, Lifting y Extensiones de Pestañas en San Salvador",
    title:
      "Laminado de Cejas, Lifting y Extensiones de Pestañas | San Salvador",
    description:
      "Laminado de cejas, lifting y extensiones de pestañas en San Salvador. Realza tu mirada con Piel Dorada. Agenda tu cita en Colonia Escalón / San Benito.",
    tagline:
      "Realza tu mirada: laminado de cejas, lifting y extensiones de pestañas en San Salvador.",
    serviceType: "Laminado de Cejas y Pestañas",
    emoji: "✨",
    icon: "eye",
    priceFrom: "40",
    keywords: [
      "laminado de cejas San Salvador",
      "lifting de pestañas El Salvador",
      "extensiones de pestañas San Salvador",
      "diseño de cejas San Salvador",
      "pestañas pelo a pelo San Salvador",
    ],
    related: ["micropigmentacion", "bronceado", "unas"],
  },
  {
    slug: "unas",
    nav: "Uñas",
    h1: "Uñas Acrílicas, Manicure y Pedicure en San Salvador",
    title: "Uñas Acrílicas, Manicure y Pedicure en San Salvador | Piel Dorada",
    description:
      "Uñas acrílicas, esmaltado permanente, manicure y pedicure spa en San Salvador. Diseños elegantes y duraderos en Piel Dorada. Agenda hoy.",
    tagline:
      "Uñas acrílicas, esmaltado permanente y pedicure spa — diseños elegantes que duran.",
    serviceType: "Uñas y Manicure",
    emoji: "💅",
    icon: "polish",
    priceFrom: "20",
    keywords: [
      "uñas acrílicas San Salvador",
      "esmaltado permanente El Salvador",
      "manicure San Salvador",
      "pedicure spa San Salvador",
      "uñas gel El Salvador",
      "nail art San Salvador",
    ],
    related: ["cejas-pestanas", "bronceado", "faciales"],
  },
  {
    slug: "faciales",
    nav: "Faciales",
    h1: "Limpieza Facial y Tratamientos de Belleza en San Salvador",
    title: "Limpieza Facial y Tratamientos Faciales en San Salvador | Piel Dorada",
    description:
      "Limpieza facial profunda, tratamientos faciales y depilación en San Salvador. Piel radiante y cuidada en Piel Dorada — Beauty & Sun Spa. Agenda tu cita.",
    tagline:
      "Piel radiante: limpieza facial profunda y tratamientos de belleza en San Salvador.",
    serviceType: "Limpieza Facial",
    emoji: "🧖‍♀️",
    icon: "droplet",
    priceFrom: "35",
    keywords: [
      "limpieza facial San Salvador",
      "facial El Salvador",
      "depilación San Salvador",
      "tratamiento facial San Salvador",
      "spa de belleza San Salvador",
    ],
    related: ["unas", "bronceado", "micropigmentacion"],
  },
];

export function getService(slug: string): ServiceDef | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

/** All indexable non-service routes (for sitemap + nav). */
export const STATIC_PAGES = [
  { slug: "", changeFrequency: "weekly" as const, priority: 1 },
  { slug: "bronceado", changeFrequency: "weekly" as const, priority: 0.9 },
  { slug: "micropigmentacion", changeFrequency: "weekly" as const, priority: 0.9 },
  { slug: "cejas-pestanas", changeFrequency: "weekly" as const, priority: 0.8 },
  { slug: "unas", changeFrequency: "weekly" as const, priority: 0.8 },
  { slug: "faciales", changeFrequency: "monthly" as const, priority: 0.7 },
  { slug: "sobre-daniela", changeFrequency: "monthly" as const, priority: 0.7 },
  { slug: "contacto", changeFrequency: "monthly" as const, priority: 0.6 },
  { slug: "blog", changeFrequency: "weekly" as const, priority: 0.6 },
];
