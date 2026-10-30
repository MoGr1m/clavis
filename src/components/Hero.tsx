/**
 * Hero: бренд крупно + full-bleed кадр + короткая фраза + CTA.
 */

import Image from "next/image";
import Link from "next/link";
import { MANIFEST } from "@/lib/site";
import { projectCover, type Project } from "@/lib/projects";

type Props = {
  project: Project;
};

/** Первый экран главной */
export function Hero({ project }: Props) {
  return (
    <section className="relative min-h-[min(92vh,920px)] flex items-end overflow-hidden">
      <div className="hero-media absolute inset-0">
        <Image
          src={projectCover(project)}
          alt={project.name}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ background: "var(--hero-overlay)" }}
          aria-hidden
        />
        {/* Градиент снизу для читаемости текста на мобиле */}
        <div
          className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/70 via-black/25 to-transparent"
          aria-hidden
        />
      </div>

      <div className="relative container-page w-full pb-12 pt-28 md:pb-16 md:pt-32 text-[#f5f1ec]">
        <p className="motion-fade-up text-[11px] uppercase tracking-[0.28em] mb-4 md:mb-5 opacity-90">
          Студия дизайна интерьера
        </p>
        <h1 className="motion-fade-up motion-delay-1 font-display text-[clamp(3rem,11vw,7rem)] mb-4 md:mb-5">
          Clavis
        </h1>
        <p className="motion-fade-up motion-delay-2 max-w-xl text-base md:text-xl mb-2 md:mb-3 opacity-95">
          {MANIFEST.tagline}
        </p>
        <p className="motion-fade-up motion-delay-2 mb-8 md:mb-10 text-sm tracking-wide text-[#d9d0c6]/opacity-90">
          {project.name} · {project.area} · {project.location}
        </p>

        <div className="hero-cta motion-fade-up motion-delay-3 flex flex-wrap gap-3">
          <Link href="/contacts" className="btn-primary btn-on-media">
            Записаться на консультацию
          </Link>
          <Link href="/portfolio" className="btn-ghost btn-on-media">
            Смотреть проекты
          </Link>
        </div>
      </div>
    </section>
  );
}
