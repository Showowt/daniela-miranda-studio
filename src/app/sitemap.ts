import type { MetadataRoute } from "next";
import { SITE_URL, STATIC_PAGES } from "@/lib/site";
import { POSTS } from "@/lib/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const pages: MetadataRoute.Sitemap = STATIC_PAGES.map((p) => ({
    url: p.slug ? `${SITE_URL}/${p.slug}` : `${SITE_URL}/`,
    lastModified: now,
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));

  const posts: MetadataRoute.Sitemap = POSTS.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.dateModified ?? post.datePublished),
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...pages, ...posts];
}
