import { createOgImage, ogSize, ogContentType } from "@/lib/og";

export const alt =
  "Daniela Miranda, Miss PMU Internacional — Piel Dorada, San Salvador";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return createOgImage({
    eyebrow: "La artista de Piel Dorada",
    title: "Daniela Miranda · Miss PMU Internacional",
  });
}
