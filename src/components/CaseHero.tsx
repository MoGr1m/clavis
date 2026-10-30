"use client";

/**
 * Hero кейса: фото или muted loop-видео на весь фон + текст поверх.
 * Видео не отдельная секция — только фон под заголовком.
 */

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import type { Project } from "@/lib/projects";
import { projectCover, projectImage } from "@/lib/projects";

type Props = {
  project: Project;
};

/** Шапка кейса с optional video-фоном */
export function CaseHero({ project }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasVideo = Boolean(project.video);
  const poster = project.videoPoster || projectCover(project);
  const fallbackImage = projectImage(project, project.images[0]);

  /** Автозапуск muted loop */
  useEffect(() => {
    if (!hasVideo) return;
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    const p = v.play();
    if (p && typeof p.catch === "function") p.catch(() => {});
  }, [hasVideo, project.video]);

  return (
    <header className="case-hero relative flex min-h-[min(70vh,760px)] items-end overflow-hidden text-[#f5f1ec]">
      {/* Фон: видео или статичный кадр */}
      <div className="case-hero__media absolute inset-0 overflow-hidden bg-black" aria-hidden>
        {hasVideo ? (
          <video
            ref={videoRef}
            className="case-hero__video absolute inset-0 h-full w-full object-cover"
            src={project.video}
            poster={poster}
            muted
            loop
            playsInline
            autoPlay
            preload="metadata"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <Image
            src={fallbackImage}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        )}
        <div className="case-hero__overlay absolute inset-0 pointer-events-none" />
      </div>

      <div className="case-hero__content container-page relative z-[1] pb-12 pt-28 md:pb-14 md:pt-32 lg:pl-[clamp(2.5rem,7vw,6.5rem)] lg:pr-6">
        {/* case-hero__copy — на lg+ уже колонки, не у самого края */}
        <div className="case-hero__copy lg:max-w-[40rem]">
          <Link
            href="/portfolio"
            className="text-[11px] uppercase tracking-[0.16em] opacity-80 mb-5 inline-block"
          >
            ← Все проекты
          </Link>
          <h1 className="font-display text-[clamp(2.6rem,8vw,5.5rem)] mb-4">
            {project.name}
          </h1>
          <p className="max-w-2xl text-base md:text-lg opacity-95 mb-5 md:mb-6">
            {project.lead}
          </p>
          <dl className="flex flex-wrap gap-x-8 gap-y-2 text-sm opacity-90">
            <div>
              <dt className="sr-only">Площадь</dt>
              <dd>{project.area}</dd>
            </div>
            <div>
              <dt className="sr-only">Тип</dt>
              <dd>{project.typeLabel}</dd>
            </div>
            <div>
              <dt className="sr-only">Локация</dt>
              <dd>{project.location}</dd>
            </div>
            <div>
              <dt className="sr-only">Год</dt>
              <dd>{project.year}</dd>
            </div>
          </dl>
        </div>
      </div>
    </header>
  );
}
