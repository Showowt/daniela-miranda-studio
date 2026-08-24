/* ═══════════════════════════════════════════════════════════════
   SEO helpers — per-page metadata + JSON-LD schema builders.
   All URLs use the canonical www host (see site.ts).
   ═══════════════════════════════════════════════════════════════ */

import type { Metadata } from "next";
import { SITE_URL, BUSINESS, AREAS_SERVED, SERVICES } from "./site";

export type JsonLdObject = Record<string, unknown>;

const BUSINESS_ID = `${SITE_URL}/#business`;
const PERSON_ID = `${SITE_URL}/#daniela`;

/** Absolute URL for a path ("" → home). */
export function url(path = ""): string {
  const clean = path.replace(/^\//, "");
  return clean ? `${SITE_URL}/${clean}` : `${SITE_URL}/`;
}

/** Per-route metadata with canonical + OG + Twitter, all consistent.
 *  Set `hasGeneratedOg: true` on routes that ship an `opengraph-image.tsx`
 *  so the file convention supplies og:image/twitter:image (no duplicate). */
export function pageMetadata(opts: {
  title: string;
  description: string;
  path?: string;
  ogImage?: string;
  ogTitle?: string;
  hasGeneratedOg?: boolean;
}): Metadata {
  const canonical = url(opts.path ?? "");
  const ogTitle = opts.ogTitle ?? opts.title;
  const image = opts.ogImage ?? BUSINESS.ogImage;

  const openGraph: Metadata["openGraph"] = {
    title: ogTitle,
    description: opts.description,
    url: canonical,
    type: "website",
    locale: "es_SV",
    siteName: BUSINESS.shortName,
  };
  const twitter: Metadata["twitter"] = {
    card: "summary_large_image",
    title: ogTitle,
    description: opts.description,
  };

  if (!opts.hasGeneratedOg) {
    openGraph.images = [
      { url: image, width: 1200, height: 630, alt: BUSINESS.name, type: "image/jpeg" },
    ];
    twitter.images = [image];
  }

  return {
    title: opts.title,
    description: opts.description,
    alternates: { canonical },
    openGraph,
    twitter,
  };
}

/** Sitewide LocalBusiness / BeautySalon — inject once in root layout. */
export function businessJsonLd(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    "@id": BUSINESS_ID,
    name: BUSINESS.name,
    alternateName: BUSINESS.alternateName,
    description:
      "El primer spa de bronceado brasileño y camas de bronceado en El Salvador. Micropigmentación, cejas, pestañas, uñas y faciales por Daniela Miranda, artista Miss PMU Internacional.",
    url: SITE_URL,
    telephone: BUSINESS.phoneE164,
    priceRange: "$$",
    image: BUSINESS.ogImage,
    logo: `${SITE_URL}/images/daniela-miranda.jpg`,
    currenciesAccepted: "USD",
    paymentAccepted: "Cash, Credit Card, Bank Transfer",
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS.addressStreet,
      addressLocality: BUSINESS.addressLocality,
      addressRegion: BUSINESS.addressRegion,
      addressCountry: BUSINESS.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: BUSINESS.geo.lat,
      longitude: BUSINESS.geo.lng,
    },
    hasMap: BUSINESS.mapsUrl,
    areaServed: AREAS_SERVED.map((name) => ({ "@type": "Place", name })),
    founder: {
      "@type": "Person",
      "@id": PERSON_ID,
      name: BUSINESS.founder,
      jobTitle: BUSINESS.founderTitle,
      sameAs: [BUSINESS.instagram],
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "09:00",
        closes: "19:00",
      },
    ],
    sameAs: [BUSINESS.instagram, BUSINESS.instagramAlt, BUSINESS.facebook],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Servicios de Piel Dorada",
      itemListElement: SERVICES.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.serviceType },
      })),
    },
  };
}

/** Daniela Miranda — Person / E-E-A-T (used on /sobre-daniela). */
export function personJsonLd(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": PERSON_ID,
    name: BUSINESS.founder,
    jobTitle: BUSINESS.founderTitle,
    worksFor: { "@id": BUSINESS_ID },
    knowsAbout: [
      "Micropigmentación",
      "Microblading",
      "Powder Brows",
      "Bronceado Brasileño",
      "Maquillaje Permanente",
    ],
    sameAs: [BUSINESS.instagram, BUSINESS.instagramAlt, BUSINESS.facebook],
    image: `${SITE_URL}/images/daniela-miranda.jpg`,
  };
}

/** Per-service Service schema. */
export function serviceJsonLd(opts: {
  serviceType: string;
  name: string;
  description: string;
  priceFrom?: string;
}): JsonLdObject {
  const schema: JsonLdObject = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: opts.serviceType,
    name: opts.name,
    provider: { "@id": BUSINESS_ID },
    areaServed: { "@type": "City", name: BUSINESS.city },
    description: opts.description,
  };
  if (opts.priceFrom) {
    schema.offers = {
      "@type": "Offer",
      priceCurrency: "USD",
      price: opts.priceFrom,
    };
  }
  return schema;
}

export type Faq = { q: string; a: string };

/** FAQPage — wins featured snippets. */
export function faqJsonLd(faqs: Faq[]): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/** BreadcrumbList for an internal page. */
export function breadcrumbJsonLd(
  items: { name: string; path: string }[],
): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: url(it.path),
    })),
  };
}

/** Article/BlogPosting schema for blog posts. */
export function articleJsonLd(opts: {
  title: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
}): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: opts.title,
    description: opts.description,
    mainEntityOfPage: url(opts.path),
    datePublished: opts.datePublished,
    dateModified: opts.dateModified ?? opts.datePublished,
    image: opts.image ?? BUSINESS.ogImage,
    author: { "@id": PERSON_ID, name: BUSINESS.founder },
    publisher: { "@id": BUSINESS_ID },
  };
}
