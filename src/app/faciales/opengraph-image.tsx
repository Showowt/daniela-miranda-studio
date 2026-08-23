import { createOgImage, ogSize, ogContentType } from "@/lib/og";

export const alt =
  "Limpieza Facial y Tratamientos de Belleza en San Salvador — Piel Dorada";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return createOgImage({
    eyebrow: "Piel radiante",
    title: "Limpieza Facial y Tratamientos de Belleza",
  });
}
