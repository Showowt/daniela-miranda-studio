import type { Metadata } from "next";
import Link from "next/link";
import SiteChrome from "@/components/SiteChrome";
import JsonLd from "@/components/JsonLd";
import { Breadcrumbs, CtaBand } from "@/components/ServiceSections";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { POSTS } from "@/lib/posts";

export const metadata: Metadata = pageMetadata({
  title: "Blog de Belleza y Bronceado | Piel Dorada El Salvador",
  description:
    "Consejos sobre bronceado brasileño, camas de bronceado, micropigmentación, cejas y belleza en El Salvador. Guías de Piel Dorada — Beauty & Sun Spa.",
  path: "blog",
});

export default function BlogPage() {
  const schema = breadcrumbJsonLd([
    { name: "Inicio", path: "" },
    { name: "Blog", path: "blog" },
  ]);

  return (
    <SiteChrome>
      <JsonLd data={schema} />

      <div className="pd-container">
        <Breadcrumbs
          items={[
            { name: "Inicio", path: "/" },
            { name: "Blog", path: "/blog" },
          ]}
        />
      </div>

      <section className="pd-hero" style={{ paddingBottom: 20 }}>
        <div className="pd-container">
          <p className="pd-eyebrow">Belleza, bronceado y cuidado</p>
          <h1 className="pd-h1">
            El blog de{" "}
            <span className="accent text-gradient-gold">Piel Dorada</span>
          </h1>
          <p className="pd-lead">
            Guías prácticas sobre bronceado brasileño, camas de bronceado,
            micropigmentación y belleza — pensadas para El Salvador.
          </p>
        </div>
      </section>

      <section className="pd-section" style={{ paddingTop: 8 }}>
        <div className="pd-container">
          <div className="post-grid">
            {POSTS.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="post-card">
                <span className="post-cat">{post.category}</span>
                <h2>{post.title}</h2>
                <p>{post.excerpt}</p>
                <span className="post-more">Leer más →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </SiteChrome>
  );
}
