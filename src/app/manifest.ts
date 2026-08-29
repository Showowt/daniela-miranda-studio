import type { MetadataRoute } from "next";

/* PWA / installability + mobile signals. Served at /manifest.webmanifest. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Piel Dorada — Beauty & Sun Spa",
    short_name: "Piel Dorada",
    description:
      "El primer spa de bronceado brasileño y camas de bronceado en El Salvador. Micropigmentación, cejas, pestañas, uñas y faciales por Daniela Miranda, Miss PMU Internacional.",
    start_url: "/",
    display: "standalone",
    background_color: "#0A0A08",
    theme_color: "#0A0A08",
    lang: "es-SV",
    dir: "ltr",
    categories: ["beauty", "lifestyle", "shopping"],
    icons: [
      { src: "/favicon.ico", sizes: "any", type: "image/x-icon" },
    ],
  };
}
