/**
 * Нижний фото-блок: плотная сетка без «дыр».
 * Одинаковый aspect у ячеек + object-cover + минимальный gap.
 */

import Image from "next/image";

type Props = {
  /** Имя проекта для alt */
  projectName: string;
  /** Пути к кадрам (остаток после журнальных вставок) */
  images: string[];
};

/** Плотная галерея «Фотографии проекта» */
export function CasePhotoGrid({ projectName, images }: Props) {
  if (!images.length) return null;

  return (
    <section className="case-photos" aria-labelledby="case-photos-heading">
      <div className="container-page">
        <h2
          id="case-photos-heading"
          className="font-display text-3xl md:text-4xl mb-6 md:mb-8"
        >
          Фотографии проекта
        </h2>
      </div>

      <div className="case-photos__grid">
        {images.map((src, i) => (
          <figure key={src} className="case-photos__cell">
            <Image
              src={src}
              alt={`${projectName} — фото ${i + 1}`}
              fill
              sizes="(max-width:768px) 100vw, (max-width:1100px) 50vw, 33vw"
              className="object-cover object-center"
              priority={i < 2}
            />
          </figure>
        ))}
      </div>
    </section>
  );
}
