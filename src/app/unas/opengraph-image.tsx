import { createOgImage, ogSize, ogContentType } from "@/lib/og";

export const alt =
  "Uñas Acrílicas, Manicure y Pedicure en San Salvador — Piel Dorada";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return createOgImage({
    eyebrow: "Diseños que duran",
    title: "Uñas Acrílicas, Manicure y Pedicure",
  });
}
