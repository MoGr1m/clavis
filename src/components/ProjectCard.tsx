/**
 * Карточка проекта в витрине (контейнер клика).
 */

import Image from "next/image";
import Link from "next/link";
import { projectCover, type Project } from "@/lib/projects";

type Props = {
  project: Project;
};

/** Одна ячейка портфолио */
export function ProjectCard({ project }: Props) {
  return (
    <Link href={`/portfolio/${project.slug}`} className="project-card group block">
      <div className="project-card-media relative aspect-[4/3] overflow-hidden bg-[var(--bg-elevated)] mb-4">
        <Image
          src={projectCover(project)}
          alt={project.name}
          fill
          sizes="(max-width:768px) 100vw, 50vw"
          className="object-cover"
        />
      </div>
      <div className="flex items-baseline justify-between gap-3 mb-1">
        <h3 className="font-display text-2xl md:text-3xl">{project.name}</h3>
        <span className="muted text-xs uppercase tracking-[0.12em] shrink-0">
          {project.area}
        </span>
      </div>
      <p className="muted text-sm mb-1">
        {project.typeLabel} · {project.location}
      </p>
      <p className="text-sm max-w-prose opacity-90 line-clamp-2">{project.lead}</p>
    </Link>
  );
}
