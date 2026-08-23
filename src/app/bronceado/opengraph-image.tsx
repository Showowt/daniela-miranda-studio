import { createOgImage, ogSize, ogContentType } from "@/lib/og";

export const alt =
  "Bronceado Brasileño y Camas de Bronceado en San Salvador — Piel Dorada";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return createOgImage({
    eyebrow: "Primer spa de bronceado de El Salvador",
    title: "Bronceado Brasileño y Camas de Bronceado",
  });
}
