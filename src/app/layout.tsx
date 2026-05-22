import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Daniela Miranda Studio | Micropigmentaci\u00f3n de Lujo en El Salvador",
  description:
    "La \u00fanica artista con t\u00edtulo Miss PMU Internacional en El Salvador. Micropigmentaci\u00f3n de cejas y labios con certificaci\u00f3n en 6 pa\u00edses. Belleza que traspasa fronteras.",
  keywords: [
    "micropigmentaci\u00f3n",
    "PMU",
    "cejas",
    "labios",
    "microblading",
    "powder brows",
    "lip blush",
    "hydra lips",
    "El Salvador",
    "San Salvador",
    "Daniela Miranda",
  ],
  openGraph: {
    title: "Daniela Miranda Studio | Belleza que traspasa fronteras",
    description:
      "Miss PMU Internacional. Micropigmentaci\u00f3n de cejas y labios con certificaci\u00f3n internacional en 6 pa\u00edses. San Salvador.",
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
      <body className="min-h-screen bg-cream-light text-text-dark antialiased">
        {children}
      </body>
    </html>
  );
}
