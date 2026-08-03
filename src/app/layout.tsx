import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";

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
};

const siteUrl = "https://www.pieldoradasv.com";
const ogImage = `${siteUrl}/og-share.jpg`;

export const metadata: Metadata = {
  title: "Piel Dorada — Lista VIP | Beauty & Sun Spa | El Salvador",
  description:
    "Únete a la Lista VIP de Piel Dorada — Beauty & Sun Spa by Daniela Miranda Studios. Bronceado de lujo, micropigmentaci\u00f3n y bienestar. Apertura Septiembre 2026.",
  keywords: [
    "Piel Dorada",
    "beauty spa",
    "sun spa",
    "El Salvador",
    "Daniela Miranda",
    "luxury spa",
    "coming soon",
    "tanning",
    "beauty",
    "wellness",
    "San Salvador",
    "micropigmentaci\u00f3n",
    "bronceado",
  ],
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "Piel Dorada — Beauty & Sun Spa | Septiembre 2026",
    description:
      "Tu momento de brillar comienza aqu\u00ed. Beauty & Sun Spa by Daniela Miranda Studios. San Salvador, El Salvador. Pr\u00f3ximamente.",
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
    title: "Piel Dorada — Beauty & Sun Spa | Septiembre 2026",
    description:
      "Tu momento de brillar comienza aqu\u00ed. By Daniela Miranda Studios. San Salvador, El Salvador.",
    images: [ogImage],
  },
  other: {
    "apple-mobile-web-app-title": "Piel Dorada",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body className="min-h-screen bg-[#0A0A08] text-white antialiased">
        {children}
      </body>
    </html>
  );
}
