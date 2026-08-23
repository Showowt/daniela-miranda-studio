import { createOgImage, ogSize, ogContentType } from "@/lib/og";

export const alt =
  "Laminado de Cejas, Lifting y Extensiones de Pestañas en San Salvador — Piel Dorada";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return createOgImage({
    eyebrow: "Realza tu mirada",
    title: "Laminado de Cejas, Lifting y Extensiones de Pestañas",
  });
}
