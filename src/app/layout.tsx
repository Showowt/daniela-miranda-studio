import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import JsonLd from "@/components/JsonLd";
import { businessJsonLd, websiteJsonLd } from "@/lib/seo";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0A0A08",
  colorScheme: "dark",
};

const siteUrl = "https://www.pieldoradasv.com";
const ogImage = `${siteUrl}/og-share.jpg`;

export const metadata: Metadata = {
  title:
    "Piel Dorada | Bronceado Brasileño y Belleza en San Salvador, El Salvador",
  description:
    "El primer spa de bronceado brasileño y camas de bronceado en El Salvador. Micropigmentación, cejas, pestañas y uñas por Daniela Miranda, artista Miss PMU Internacional. Agenda en San Salvador.",
  keywords: [
    "bronceado El Salvador",
    "bronceado brasileño San Salvador",
    "camas de bronceado",
    "solárium San Salvador",
    "spray tan El Salvador",
    "micropigmentación de cejas",
    "microblading San Salvador",
    "powder brows El Salvador",
    "laminado de cejas",
    "lifting de pestañas",
    "uñas acrílicas San Salvador",
    "spa de belleza San Salvador",
    "Piel Dorada",
    "Daniela Miranda",
    "Miss PMU Internacional",
  ],
  applicationName: "Piel Dorada",
  authors: [
    { name: "Daniela Miranda", url: "https://instagram.com/danielamirandapmu" },
  ],
  creator: "Daniela Miranda Studios",
  publisher: "Piel Dorada — Beauty & Sun Spa",
  category: "Beauty Salon",
  appleWebApp: {
    capable: true,
    title: "Piel Dorada",
    statusBarStyle: "black-translucent",
  },
  formatDetection: { telephone: true, address: true, email: true },
  metadataBase: new URL(siteUrl),
  alternates: { canonical: siteUrl },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
  openGraph: {
    title: "Piel Dorada — Bronceado Brasileño y Belleza en San Salvador",
    description:
      "El primer spa de bronceado brasileño y camas de bronceado en El Salvador. Micropigmentación, cejas, pestañas y uñas por Daniela Miranda, Miss PMU Internacional.",
    type: "website",
    locale: "es_SV",
    siteName: "Piel Dorada",
    url: siteUrl,
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: "Piel Dorada — Beauty & Sun Spa by Daniela Miranda Studios",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Piel Dorada — Bronceado Brasileño y Belleza en San Salvador",
    description:
      "El primer spa de bronceado brasileño en El Salvador. Por Daniela Miranda, Miss PMU Internacional.",
    images: [ogImage],
  },
  other: {
    "apple-mobile-web-app-title": "Piel Dorada",
    "geo.region": "SV-LI",
    "geo.placename": "Santa Tecla, San Salvador",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-SV" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body className="min-h-screen bg-[#0A0A08] text-white antialiased">
        <JsonLd data={businessJsonLd()} />
        <JsonLd data={websiteJsonLd()} />
        {children}
      </body>
    </html>
  );
}
