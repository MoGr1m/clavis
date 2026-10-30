"use client";

/**
 * Карусель галереи: один кадр, фиксированная высота (~4:3).
 * Ландшафт → object-fit: cover; портрет → contain на тёмном фоне.
 * Ориентация — по intrinsic naturalWidth/Height; fallback: cover.
 */

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type TouchEvent,
} from "react";

type Props = {
  /** Имя проекта для alt */
  projectName: string;
  /** Пути к кадрам */
  images: string[];
};

/** cover | contain — как вписывать кадр */
type FitMode = "cover" | "contain";

/**
 * По размерам файла: шире → cover, выше → contain.
 * Если размеры неизвестны — cover (fallback).
 */
function fitFromSize(w: number, h: number): FitMode {
  if (!w || !h) return "cover";
  return w >= h ? "cover" : "contain";
}

/** Галерея-слайдер со смешанным fit */
export function GalleryCarousel({ projectName, images }: Props) {
  const [index, setIndex] = useState(0);
  /** fit по индексу слайда */
  const [fits, setFits] = useState<Record<number, FitMode>>({});
  const rootRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const total = images.length;

  /** Запомнить ориентацию кадра после загрузки */
  const rememberFit = useCallback((i: number, w: number, h: number) => {
    const mode = fitFromSize(w, h);
    setFits((prev) => (prev[i] === mode ? prev : { ...prev, [i]: mode }));
  }, []);

  /** Переход к кадру с зацикливанием */
  const go = useCallback(
    (next: number) => {
      if (total === 0) return;
      setIndex(((next % total) + total) % total);
    },
    [total],
  );

  const prev = useCallback(() => go(index - 1), [go, index]);
  const nextSlide = useCallback(() => go(index + 1), [go, index]);

  /** Клавиатура ←/→ */
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        nextSlide();
      }
    }

    el.addEventListener("keydown", onKey);
    return () => el.removeEventListener("keydown", onKey);
  }, [prev, nextSlide]);

  /** Свайп */
  function onTouchStart(e: TouchEvent) {
    touchStartX.current = e.touches[0]?.clientX ?? null;
  }

  function onTouchEnd(e: TouchEvent) {
    if (touchStartX.current == null) return;
    const endX = e.changedTouches[0]?.clientX ?? touchStartX.current;
    const dx = endX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(dx) < 40) return;
    if (dx > 0) prev();
    else nextSlide();
  }

  if (total === 0) return null;

  return (
    <div
      ref={rootRef}
      className="gallery-carousel"
      tabIndex={0}
      aria-roledescription="карусель"
      aria-label={`Галерея ${projectName}`}
    >
      <div className="flex items-end justify-between gap-4 mb-5 md:mb-6">
        <h2 className="font-display text-3xl">Галерея</h2>
        <p className="muted text-sm tabular-nums" aria-live="polite">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </p>
      </div>

      {/* Выше: ~4:3, высота фиксирована aspect-ом — footer не прыгает */}
      <div
        className="gallery-carousel__viewport relative w-full overflow-hidden"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {images.map((src, i) => {
          const fit = fits[i] ?? "cover";
          return (
            <div
              key={src}
              className="gallery-carousel__slide absolute inset-0 h-full w-full overflow-hidden bg-[#0a0908]"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                transform: `translate3d(${(i - index) * 100}%, 0, 0)`,
                transition: "transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)",
              }}
              aria-hidden={i !== index}
              data-fit={fit}
            >
              <Image
                src={src}
                alt={`${projectName} — кадр ${i + 1}`}
                fill
                sizes="(max-width:768px) 100vw, 1180px"
                /* style важнее utility-классов — cover/contain без гонок с CSS */
                style={{
                  objectFit: fit,
                  objectPosition: "center",
                }}
                priority={i === 0}
                onLoadingComplete={(img) => {
                  rememberFit(i, img.naturalWidth, img.naturalHeight);
                }}
              />
            </div>
          );
        })}

        {total > 1 ? (
          <>
            <button
              type="button"
              className="gallery-carousel__arrow gallery-carousel__arrow--prev"
              onClick={prev}
              aria-label="Предыдущий кадр"
            >
              ←
            </button>
            <button
              type="button"
              className="gallery-carousel__arrow gallery-carousel__arrow--next"
              onClick={nextSlide}
              aria-label="Следующий кадр"
            >
              →
            </button>
          </>
        ) : null}
      </div>

      {total > 1 ? (
        <div className="gallery-carousel__dots" role="tablist" aria-label="Кадры галереи">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Кадр ${i + 1}`}
              className={[
                "gallery-carousel__dot",
                i === index ? "is-active" : "",
              ].join(" ")}
              onClick={() => go(i)}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
