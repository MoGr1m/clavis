"use client";

/**
 * HomeHero — карусель проектов на первом экране (как на clavis-interior.ru).
 * Все слайды в DOM; crossfade opacity на img/video (не на обёртке — video
 * иначе игнорирует fade). Вместе меняются имя / площадь / адрес.
 * Autoplay ~5 с, точки справа снизу, свайп на мобиле.
 */

import Image from "next/image";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type TouchEvent,
} from "react";
import { MANIFEST } from "@/lib/site";
import { projectCover, type Project } from "@/lib/projects";

type Props = {
  /** Все проекты витрины (ожидаем 5) */
  projects: Project[];
};

/** Интервал автосмены слайда, мс — как на проде */
const AUTOPLAY_MS = 5000;

/**
 * Длительность crossfade opacity, мс.
 * Должна совпадать с CSS `.home-hero__slide` (~1.1 с).
 */
const FADE_MS = 1100;

/** Ширина «мобильного» свайпа (как на проде ≤1023) */
const MOBILE_SWIPE_MAX = 1023;

/** Первый экран главной с каруселью проектов */
export function HomeHero({ projects }: Props) {
  const slides = projects.length > 0 ? projects : [];
  const total = slides.length;

  const [index, setIndex] = useState(0);
  /** Ключ для перезапуска анимации подписи при смене кадра */
  const [captionKey, setCaptionKey] = useState(0);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  /** Отложенный pause/reset уходящего видео — после конца fade */
  const fadeOutTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const swipeLocked = useRef(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const current = slides[index] ?? null;

  /** Перейти к слайду с зацикливанием */
  const goTo = useCallback(
    (next: number) => {
      if (total <= 1) return;
      setIndex(((next % total) + total) % total);
    },
    [total],
  );

  /** Сдвиг на delta (−1 / +1) */
  const step = useCallback(
    (delta: number) => {
      if (total <= 1) return;
      setIndex((i) => (i + delta + total) % total);
    },
    [total],
  );

  /** Запустить / перезапустить autoplay */
  const restartAutoplay = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (total <= 1) return;
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % total);
    }, AUTOPLAY_MS);
  }, [total]);

  useEffect(() => {
    restartAutoplay();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [restartAutoplay]);

  /**
   * Смена кадра: play только у активного video;
   * pause/reset уходящих — после FADE_MS (пока идёт crossfade).
   */
  useEffect(() => {
    setCaptionKey((k) => k + 1);

    if (fadeOutTimerRef.current) {
      clearTimeout(fadeOutTimerRef.current);
      fadeOutTimerRef.current = null;
    }

    const activeIndex = index;
    const activeVideo = videoRefs.current[activeIndex];
    if (activeVideo) {
      activeVideo.muted = true;
      const playPromise = activeVideo.play();
      if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch(() => {});
      }
    }

    fadeOutTimerRef.current = setTimeout(() => {
      videoRefs.current.forEach((v, i) => {
        if (!v || i === activeIndex) return;
        v.pause();
        try {
          v.currentTime = 0;
        } catch {
          /* ignore */
        }
      });
      fadeOutTimerRef.current = null;
    }, FADE_MS);

    return () => {
      if (fadeOutTimerRef.current) {
        clearTimeout(fadeOutTimerRef.current);
        fadeOutTimerRef.current = null;
      }
    };
  }, [index]);

  /** Свайп только на узком экране */
  function onTouchStart(e: TouchEvent) {
    if (typeof window !== "undefined" && window.innerWidth > MOBILE_SWIPE_MAX) {
      return;
    }
    if (total <= 1) return;
    const t = e.touches[0];
    if (!t) return;
    touchStart.current = { x: t.clientX, y: t.clientY };
  }

  function onTouchEnd(e: TouchEvent) {
    if (typeof window !== "undefined" && window.innerWidth > MOBILE_SWIPE_MAX) {
      return;
    }
    if (total <= 1) return;
    const start = touchStart.current;
    touchStart.current = null;
    if (!start) return;
    const t = e.changedTouches[0];
    if (!t) return;
    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;
    if (Math.abs(dx) < 48 || Math.abs(dx) <= Math.abs(dy)) return;
    swipeLocked.current = true;
    window.setTimeout(() => {
      swipeLocked.current = false;
    }, 400);
    if (dx < 0) step(1);
    else step(-1);
    restartAutoplay();
  }

  if (!current) return null;

  return (
    <section
      className="home-hero relative min-h-[min(92vh,920px)] flex items-end overflow-hidden"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      aria-roledescription="карусель"
      aria-label="Избранные проекты"
    >
      {/* Все слайды в DOM: crossfade через opacity на img/video */}
      <div className="home-hero__media absolute inset-0 z-0 bg-[#0a0908]" aria-hidden>
        {slides.map((project, i) => {
          const active = i === index;
          const hasVideo = Boolean(project.video);
          const cover = projectCover(project);
          return (
            <div
              key={project.slug}
              className={[
                "home-hero__slide absolute inset-0",
                active ? "is-active" : "",
              ].join(" ")}
              aria-hidden={!active}
            >
              {/* Обложка всегда в DOM — fallback под video и кадр без ролика */}
              <Image
                src={cover}
                alt=""
                fill
                priority={i === 0}
                sizes="100vw"
                className="home-hero__asset object-cover"
              />
              {hasVideo ? (
                <video
                  ref={(el) => {
                    videoRefs.current[i] = el;
                  }}
                  className="home-hero__asset home-hero__video"
                  src={project.video}
                  poster={project.videoPoster || cover}
                  muted
                  loop
                  playsInline
                  preload={active || i === 0 ? "auto" : "metadata"}
                />
              ) : null}
            </div>
          );
        })}

        {/* Оверлеи выше слайдов */}
        <div
          className="absolute inset-0 z-[2]"
          style={{ background: "var(--hero-overlay)" }}
        />
        <div
          className="absolute inset-x-0 bottom-0 z-[2] h-2/3 bg-gradient-to-t from-black/70 via-black/25 to-transparent"
        />
      </div>

      {/* Невидимые hit-зоны: клик по фону → кейс (активный слайд) */}
      {slides.map((project, i) => (
        <Link
          key={`hit-${project.slug}`}
          href={`/portfolio/${project.slug}`}
          aria-label={`Открыть проект: ${project.name}`}
          aria-hidden={i !== index}
          tabIndex={i === index ? 0 : -1}
          className={[
            "absolute inset-0 z-[1]",
            i === index ? "pointer-events-auto" : "pointer-events-none",
          ].join(" ")}
          onClick={(e) => {
            if (swipeLocked.current) {
              e.preventDefault();
            }
          }}
        />
      ))}

      <div className="relative z-[2] container-page w-full pb-12 pt-28 md:pb-16 md:pt-32 text-[#f5f1ec] pointer-events-none">
        <p className="motion-fade-up text-[11px] uppercase tracking-[0.28em] mb-4 md:mb-5 opacity-90">
          Студия дизайна интерьера
        </p>
        <h1 className="motion-fade-up motion-delay-1 font-display text-[clamp(3rem,11vw,7rem)] mb-4 md:mb-5">
          Clavis
        </h1>
        <p className="motion-fade-up motion-delay-2 max-w-xl text-base md:text-xl mb-2 md:mb-3 opacity-95">
          {MANIFEST.tagline}
        </p>

        {/* Подпись проекта — меняется вместе с кадром */}
        <div
          key={captionKey}
          className="home-hero__caption motion-fade-up mb-8 md:mb-10"
        >
          <Link
            href={`/portfolio/${current.slug}`}
            className="home-hero__project-link pointer-events-auto group inline-block"
          >
            <span className="block font-display text-xl md:text-2xl tracking-wide group-hover:opacity-90 transition-opacity">
              {current.name}
            </span>
            <span className="mt-1 block text-sm tracking-wide text-[#d9d0c6]/opacity-90">
              {current.area} · {current.location}
            </span>
          </Link>
        </div>

        <div className="hero-cta motion-fade-up motion-delay-3 flex flex-wrap gap-3 pointer-events-auto">
          <Link href="/contacts" className="btn-primary btn-on-media">
            Записаться на консультацию
          </Link>
          <Link href="/portfolio" className="btn-ghost btn-on-media">
            Смотреть проекты
          </Link>
        </div>
      </div>

      {/* Точки-индикаторы — как на проде: круглые, справа снизу */}
      {total > 1 ? (
        <div
          className="home-hero__dots absolute bottom-6 right-6 z-[3] flex items-center gap-2 md:bottom-8 md:right-10"
          role="tablist"
          aria-label="Проекты в карусели"
        >
          {slides.map((project, i) => (
            <button
              key={project.slug}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Показать проект: ${project.name}`}
              className={[
                "home-hero__dot",
                i === index ? "is-active" : "",
              ].join(" ")}
              onClick={() => {
                goTo(i);
                restartAutoplay();
              }}
            />
          ))}
        </div>
      ) : null}
    </section>
  );
}
