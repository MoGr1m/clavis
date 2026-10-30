/**
 * Общие SEO-хелперы: title, description, Open Graph.
 */

import type { Metadata } from "next";

const SITE_NAME = "Clavis";
const SITE_URL = "https://clavis-interior.ru";
const DEFAULT_DESC =
  "Дизайн, который отражает то, как живут люди. Эстетика пространства. Точность реализации.";

/**
 * Собирает metadata для страницы (RU).
 * ogImage — путь от корня сайта, например /projects/ribs48/01.webp
 */
export function pageMeta(opts: {
  title: string;
  description?: string;
  path?: string;
  ogImage?: string;
}): Metadata {
  const description = opts.description || DEFAULT_DESC;
  const url = opts.path ? `${SITE_URL}${opts.path}` : SITE_URL;
  const images = opts.ogImage
    ? [{ url: opts.ogImage.startsWith("http") ? opts.ogImage : `${SITE_URL}${opts.ogImage}` }]
    : undefined;

  return {
    title: opts.title,
    description,
    openGraph: {
      type: "website",
      locale: "ru_RU",
      siteName: SITE_NAME,
      title: `${opts.title} · ${SITE_NAME}`,
      description,
      url,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: `${opts.title} · ${SITE_NAME}`,
      description,
      images: images?.map((i) => i.url),
    },
  };
}
