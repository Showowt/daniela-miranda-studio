import type { JsonLdObject } from "@/lib/seo";

/**
 * Renders one or more JSON-LD objects as a <script type="application/ld+json">.
 * `<` is escaped to < to prevent XSS via injected strings (per Next docs).
 */
export default function JsonLd({
  data,
}: {
  data: JsonLdObject | JsonLdObject[];
}) {
  const payload = Array.isArray(data) ? data : [data];
  return (
    <>
      {payload.map((obj, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(obj).replace(/</g, "\\u003c"),
          }}
        />
      ))}
    </>
  );
}
