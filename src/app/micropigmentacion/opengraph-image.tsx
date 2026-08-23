import { createOgImage, ogSize, ogContentType } from "@/lib/og";

export const alt =
  "Micropigmentación de Cejas y Labios en San Salvador — Piel Dorada";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return createOgImage({
    eyebrow: "Por Daniela Miranda · Miss PMU Internacional",
    title: "Micropigmentación de Cejas y Labios",
  });
}
