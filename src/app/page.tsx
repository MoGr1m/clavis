/**
 * Главная: Hero → манифест → портфолио → услуги → процесс → FAQ → CTA.
 */

import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { ProjectCard } from "@/components/ProjectCard";
import { PROJECTS, projectCover } from "@/lib/projects";
import { pageMeta } from "@/lib/seo";
import { FAQ, MANIFEST, PROCESS_STEPS, SERVICES } from "@/lib/site";

const heroProject = PROJECTS.find((p) => p.slug === "ribs-48") ?? PROJECTS[0];

export const metadata: Metadata = pageMeta({
  title: "Студия дизайна интерьера",
  description:
    "Clavis — boutique-студия интерьера в Москве. Жилые и коммерческие проекты, прозрачные цены, точная реализация.",
  path: "/",
  ogImage: projectCover(heroProject),
});

/** Главная страница */
export default function HomePage() {
  return (
    <>
      <Hero project={heroProject} />

      <section className="container-page py-16 md:py-28">
        <div className="grid gap-12 md:grid-cols-[1.1fr_0.9fr] md:items-end">
          <div>
            <p className="text-[11px] uppercase tracking-[0.18em] muted mb-4">Манифест</p>
            <h2 className="font-display text-[clamp(2rem,4vw,3.4rem)] mb-6 max-w-xl">
              {MANIFEST.subtitle}
            </h2>
            <p className="text-lg max-w-lg opacity-90">{MANIFEST.tagline}</p>
          </div>
          <blockquote className="border-l border-[var(--border)] pl-6">
            <p className="font-display text-2xl md:text-3xl mb-4 leading-snug">
              «{MANIFEST.quote.text}»
            </p>
            <cite className="not-italic text-sm muted">
              {MANIFEST.quote.author} · {MANIFEST.quote.role}
            </cite>
          </blockquote>
        </div>

        <ul className="mt-14 md:mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {MANIFEST.principles.map((p) => (
            <li key={p.title}>
              <h3 className="font-display text-xl mb-2">{p.title}</h3>
              <p className="muted text-sm">{p.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-t hairline py-16 md:py-28">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-10 md:mb-12">
            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] muted mb-3">Портфолио</p>
              <h2 className="font-display text-[clamp(2rem,4vw,3rem)]">Избранные проекты</h2>
            </div>
            <Link href="/portfolio" className="btn-ghost">
              Все проекты
            </Link>
          </div>
          <div className="grid gap-10 md:grid-cols-2">
            {PROJECTS.slice(0, 4).map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* Светлая зона — услуги удобно читать на тёмном сайте */}
      <section className="reading-surface py-16 md:py-28">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-10 md:mb-12">
            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] muted mb-3">Услуги</p>
              <h2 className="font-display text-[clamp(2rem,4vw,3rem)]">Прозрачные цены</h2>
            </div>
            <Link href="/services" className="btn-ghost">
              Подробнее
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((s) => (
              <div
                key={s.id}
                className="border-t pt-5"
                style={{ borderColor: "var(--surface-light-border)" }}
              >
                <h3 className="font-display text-xl mb-2">{s.title}</h3>
                <p className="text-sm mb-3 opacity-80">{s.price}</p>
                <p className="muted text-sm">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-16 md:py-28">
        <p className="text-[11px] uppercase tracking-[0.18em] muted mb-3">Процесс</p>
        <h2 className="font-display text-[clamp(2rem,4vw,3rem)] mb-10 md:mb-12">
          Как мы работаем
        </h2>
        <ol className="grid gap-8 sm:grid-cols-2 md:grid-cols-5">
          {PROCESS_STEPS.map((step) => (
            <li key={step.n}>
              <p className="font-display text-4xl muted mb-3">{step.n}</p>
              <h3 className="text-base mb-2">{step.title}</h3>
              <p className="muted text-sm">{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-y hairline">
        <div className="container-page py-14 md:py-20 grid gap-8 md:grid-cols-[1fr_1.2fr] md:items-center">
          <div className="relative aspect-[4/3] overflow-hidden bg-[var(--bg-elevated)]">
            <Image
              src="/projects/ribs48/12.webp"
              alt="Rib's 48"
              fill
              sizes="(max-width:768px) 100vw, 40vw"
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.18em] muted mb-3">Пресса</p>
            <h2 className="font-display text-3xl md:text-4xl mb-4">
              Marie Claire Maison о Rib&apos;s 48
            </h2>
            <p className="muted max-w-md mb-6">
              Коммерческий интерьер, где материал и свет важнее декора.
            </p>
            <Link href="/portfolio/ribs-48" className="btn-ghost">
              Смотреть кейс
            </Link>
          </div>
        </div>
      </section>

      <section className="reading-surface py-16 md:py-28">
        <div className="container-narrow">
          <p className="text-[11px] uppercase tracking-[0.18em] muted mb-3">FAQ</p>
          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] mb-8 md:mb-10">
            Частые вопросы
          </h2>
          <div className="space-y-5">
            {FAQ.map((item) => (
              <details
                key={item.q}
                className="border-b pb-4"
                style={{ borderColor: "var(--surface-light-border)" }}
              >
                <summary className="cursor-pointer font-display text-xl py-2 list-none flex justify-between gap-4">
                  <span>{item.q}</span>
                  <span aria-hidden className="opacity-50">
                    +
                  </span>
                </summary>
                <p className="muted text-sm pt-2 pb-2 max-w-prose">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-16 md:py-28 text-center">
        <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] mb-4">
          Обсудим ваш объект
        </h2>
        <p className="muted mb-8 max-w-md mx-auto">
          Короткий разговор о задаче, сроках и составе работ — без обязательств.
        </p>
        <Link href="/contacts" className="btn-primary">
          Записаться на консультацию
        </Link>
      </section>
    </>
  );
}
