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

export const metadata: Metadata = {
  title: "Piel Dorada by Daniela Miranda Studios | Beauty & Sun Spa | El Salvador",
  description:
    "Piel Dorada — El Salvador's premier Beauty & Sun Spa by Daniela Miranda Studios. An oasis of luxury, beauty, and golden transformation. Coming soon.",
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
  ],
  openGraph: {
    title: "Piel Dorada by Daniela Miranda Studios | Coming Soon",
    description:
      "El Salvador's premier Beauty & Sun Spa. An oasis of luxury, beauty, and golden transformation. Próximamente.",
    type: "website",
    locale: "es_SV",
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
