/**
 * О студии: манифест, опыт, принципы.
 */

import Link from "next/link";
import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { MANIFEST } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "О студии",
  description:
    "Clavis — студия дизайна интерьера. Принципы: сдержанность, честность материала, свет, долговечность. Основатель — Татьяна Кожевникова.",
  path: "/about",
});

/** Страница «О нас» */
export default function AboutPage() {
  return (
    <div>
      <section className="container-page py-14 md:py-24">
        <p className="text-[11px] uppercase tracking-[0.18em] muted mb-3">О студии</p>
        <h1 className="font-display text-[clamp(2.4rem,7vw,4.5rem)] mb-6 max-w-3xl">
          {MANIFEST.tagline}
        </h1>
        <p className="text-xl muted max-w-2xl mb-8 md:mb-10">{MANIFEST.subtitle}</p>
        <p className="text-[11px] uppercase tracking-[0.16em]">
          Опыт · {MANIFEST.experience}
        </p>
      </section>

      <section className="reading-surface py-14 md:py-24">
        <div className="container-narrow">
          <blockquote className="mb-10">
            <p className="font-display text-3xl md:text-4xl leading-snug mb-6">
              «{MANIFEST.quote.text}»
            </p>
            <cite className="not-italic text-sm muted">
              {MANIFEST.quote.author}
              <br />
              {MANIFEST.quote.role}
            </cite>
          </blockquote>
          <p className="text-lg leading-relaxed mb-6">
            Clavis — boutique-студия интерьера. Мы проектируем жилые и коммерческие
            пространства, где важны свет, пропорции и честность материала.
          </p>
          <p className="text-lg leading-relaxed muted">
            На сайте — актуальная витрина из пяти сильных кейсов. Полный архив шире;
            витрину наращиваем по мере подготовки материалов.
          </p>
        </div>
      </section>

      <section className="container-page py-14 md:py-24">
        <h2 className="font-display text-3xl mb-8 md:mb-10">Принципы</h2>
        <ul className="grid gap-8 sm:grid-cols-2">
          {MANIFEST.principles.map((p) => (
            <li key={p.title} className="border-t hairline pt-5">
              <h3 className="font-display text-2xl mb-2">{p.title}</h3>
              <p className="muted">{p.text}</p>
            </li>
          ))}
        </ul>
        <div className="mt-12 md:mt-14 flex flex-wrap gap-3">
          <Link href="/portfolio" className="btn-primary">
            Смотреть проекты
          </Link>
          <Link href="/contacts" className="btn-ghost">
            Связаться
          </Link>
        </div>
      </section>
    </div>
  );
}
