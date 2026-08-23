import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteChrome from "@/components/SiteChrome";
import JsonLd from "@/components/JsonLd";
import { Breadcrumbs, Faqs, RelatedServices, CtaBand } from "@/components/ServiceSections";
import {
  pageMetadata,
  articleJsonLd,
  faqJsonLd,
  breadcrumbJsonLd,
} from "@/lib/seo";
import { POSTS, getPost } from "@/lib/posts";
import { getService } from "@/lib/site";

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return pageMetadata({
    title: `${post.title} | Piel Dorada`,
    description: post.description,
    path: `blog/${post.slug}`,
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const service = getService(post.service);

  const schema = [
    articleJsonLd({
      title: post.title,
      description: post.description,
      path: `blog/${post.slug}`,
      datePublished: post.datePublished,
      dateModified: post.dateModified,
    }),
    faqJsonLd(post.faqs),
    breadcrumbJsonLd([
      { name: "Inicio", path: "" },
      { name: "Blog", path: "blog" },
      { name: post.title, path: `blog/${post.slug}` },
    ]),
  ];

  return (
    <SiteChrome>
      <JsonLd data={schema} />

      <div className="pd-container">
        <Breadcrumbs
          items={[
            { name: "Inicio", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: post.category, path: "/blog" },
          ]}
        />
      </div>

      <article>
        <header className="pd-hero" style={{ paddingBottom: 12, textAlign: "left" }}>
          <div className="pd-container pd-narrow">
            <p className="pd-eyebrow" style={{ marginBottom: 12 }}>
              {post.category} · {post.readMins} min de lectura
            </p>
            <h1 className="pd-h1" style={{ textAlign: "left" }}>
              {post.title}
            </h1>
            <p className="pd-lead" style={{ margin: "16px 0 0" }}>
              {post.description}
            </p>
          </div>
        </header>

        <div className="pd-section" style={{ paddingTop: 16 }}>
          <div
            className="pd-container pd-narrow pd-prose"
            dangerouslySetInnerHTML={{ __html: post.body }}
          />
        </div>
      </article>

      <Faqs faqs={post.faqs} />

      {service && (
        <section className="pd-section" style={{ paddingTop: 0 }}>
          <div className="pd-container pd-narrow" style={{ textAlign: "center" }}>
            <Link href={`/${service.slug}`} className="btn-gold">
              Ver servicio: {service.nav}
            </Link>
          </div>
        </section>
      )}

      <CtaBand />

      {service && <RelatedServices slugs={service.related} />}
    </SiteChrome>
  );
}
