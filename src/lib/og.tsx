import { ImageResponse } from "next/og";

/* Shared branded OG image generator (1200×630) for social previews.
   Satori-compatible: flexbox + inline styles + solid colors only. */

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

const GOLD = "#E9CB72";
const GOLD_SOFT = "rgba(201,168,76,0.55)";

export function createOgImage({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: 64,
          backgroundColor: "#0A0A08",
          backgroundImage:
            "linear-gradient(135deg, #0A0A08 0%, #14110A 55%, #0A0A08 100%)",
          fontFamily: "sans-serif",
        }}
      >
        {/* Gold frame */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            border: `2px solid ${GOLD_SOFT}`,
            borderRadius: 28,
            padding: "56px 64px",
            justifyContent: "space-between",
            backgroundImage:
              "linear-gradient(180deg, rgba(201,168,76,0.10) 0%, rgba(201,168,76,0) 45%)",
          }}
        >
          {/* Brand */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontSize: 34,
                fontWeight: 600,
                letterSpacing: 8,
                color: GOLD,
              }}
            >
              PIEL DORADA
            </div>
            <div
              style={{
                fontSize: 18,
                letterSpacing: 6,
                color: "rgba(255,255,255,0.5)",
                marginTop: 8,
              }}
            >
              BEAUTY &amp; SUN SPA
            </div>
          </div>

          {/* Headline */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", width: 72, height: 3, backgroundColor: GOLD, marginBottom: 22 }} />
            <div
              style={{
                fontSize: 22,
                letterSpacing: 3,
                textTransform: "uppercase",
                color: GOLD,
                marginBottom: 16,
              }}
            >
              {eyebrow}
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 58,
                fontWeight: 700,
                lineHeight: 1.12,
                color: "#FFFFFF",
                maxWidth: 940,
              }}
            >
              {title}
            </div>
          </div>

          {/* Footer */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ fontSize: 22, color: "rgba(255,255,255,0.55)" }}>
              San Salvador, El Salvador
            </div>
            <div style={{ fontSize: 22, fontWeight: 600, color: GOLD }}>
              pieldoradasv.com
            </div>
          </div>
        </div>
      </div>
    ),
    { ...ogSize },
  );
}
