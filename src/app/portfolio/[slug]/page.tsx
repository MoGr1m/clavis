/**
 * Кейс: hero (video) → журнальный текст с фото-вставками →
 * команда → плотная нижняя галерея.
 */

import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseHero } from "@/components/CaseHero";
import { CaseMagazineStory } from "@/components/CaseMagazineStory";
import { CasePhotoGrid } from "@/components/CasePhotoGrid";
import { CaseTeam } from "@/components/CaseTeam";
import { getProject, PROJECTS, projectCover, projectImage } from "@/lib/projects";
import { pageMeta } from "@/lib/seo";

type Props = {
  params: Promise<{ slug: string }>;
};

/** Статика по всем проектам */
export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

/** SEO кейса */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return pageMeta({ title: "Проект" });
  return pageMeta({
    title: `${project.name} — ${project.location}`,
    description: project.seoDescription,
    path: `/portfolio/${project.slug}`,
    ogImage: projectCover(project),
  });
}

/**
 * Делим кадры: 2–4 вставки в текст (пропуская обложку [0]),
 * остальное — в нижнюю сетку (включая обложку).
 */
function splitGallery(srcs: string[]): { insets: string[]; rest: string[] } {
  if (srcs.length <= 2) {
    return { insets: srcs.slice(0, 1), rest: srcs.slice(1) };
  }
  /* Цель: 3 вставки при ≥5 кадрах, иначе 2 */
  const insetCount = srcs.length >= 5 ? 3 : Math.min(2, srcs.length - 1);
  const insets = srcs.slice(1, 1 + insetCount);
  const rest = [srcs[0], ...srcs.slice(1 + insetCount)];
  return { insets, rest };
}

/** Кейс проекта */
export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const gallerySrcs = project.images.map((file) => projectImage(project, file));
  const { insets, rest } = splitGallery(gallerySrcs);

  return (
    <article>
      {/* Hero: muted loop video / фото */}
      <CaseHero project={project} />

      {/* Журнальная середина: текст ↔ фото */}
      <section className="reading-surface py-14 md:py-20">
        <CaseMagazineStory
          projectName={project.name}
          story={project.story}
          insets={insets}
        />

        <div className="container-narrow space-y-6 mt-10 md:mt-12">
          <ul className="flex flex-wrap gap-2">
            {project.highlights.map((h) => (
              <li
                key={h}
                className="text-[11px] uppercase tracking-[0.12em] border px-3 py-1"
                style={{ borderColor: "var(--surface-light-border)" }}
              >
                {h}
              </li>
            ))}
          </ul>

          {/* Команда — сохраняем */}
          <CaseTeam team={project.team} />

          <div className="pt-6 flex flex-wrap gap-3">
            <Link href="/contacts" className="btn-primary">
              Обсудить похожий проект
            </Link>
            <Link href="/portfolio" className="btn-ghost">
              К портфолио
            </Link>
          </div>
        </div>
      </section>

      {/* Плотная нижняя галерея */}
      <CasePhotoGrid projectName={project.name} images={rest} />
    </article>
  );
}
