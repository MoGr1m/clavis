/**
 * Журнальная середина как на clavis-interior.ru/portfolio/…:
 * чередование рядов «большое фото | текст» / «текст | большое фото».
 * Текст в одной колонке с фото, не отдельный центрированный узкий поток.
 */

import Image from "next/image";

type Props = {
  /** Имя проекта для alt */
  projectName: string;
  /** Абзацы описания */
  story: string[];
  /** 2–4 пути к кадрам для вставок в текст */
  insets: string[];
};

type Row = {
  /** Фото слева (как 1.55fr | 1fr) или справа */
  imageSide: "left" | "right";
  /** Текст рядом с фото */
  text: string;
  /** Кадр */
  src: string;
  /** Индекс для alt */
  index: number;
};

/**
 * Собираем ряды: лишний первый абзац — лид; дальше пара «абзац + фото»
 * с чередованием стороны.
 */
function buildRows(story: string[], insets: string[]): {
  lead: string | null;
  rows: Row[];
  leftoverParas: string[];
} {
  const paras = [...story];
  const imgs = [...insets];
  const lead = paras.length > imgs.length ? paras.shift()! : null;
  const rows: Row[] = [];

  let i = 0;
  while (imgs.length && paras.length) {
    rows.push({
      imageSide: i % 2 === 0 ? "left" : "right",
      text: paras.shift()!,
      src: imgs.shift()!,
      index: i,
    });
    i += 1;
  }

  return { lead, rows, leftoverParas: paras };
}

/** Один editorial-ряд: фото + текст в двух колонках */
function MagRow({
  row,
  projectName,
}: {
  row: Row;
  projectName: string;
}) {
  const imageLeft = row.imageSide === "left";

  return (
    <div
      className={[
        "case-mag__row",
        imageLeft ? "case-mag__row--img-left" : "case-mag__row--img-right",
      ].join(" ")}
    >
      <figure className="case-mag__media">
        <div className="case-mag__frame">
          <Image
            src={row.src}
            alt={`${projectName} — кадр ${row.index + 1}`}
            fill
            sizes="(max-width:900px) 100vw, 60vw"
            className="object-cover object-center"
          />
        </div>
      </figure>

      <div className="case-mag__copy">
        <p className="case-mag__para text-lg leading-relaxed">{row.text}</p>
      </div>
    </div>
  );
}

/** Журнальный поток со сменой стороны фото */
export function CaseMagazineStory({ projectName, story, insets }: Props) {
  if (!story.length) return null;

  const { lead, rows, leftoverParas } = buildRows(story, insets);

  return (
    <div className="case-mag">
      {lead ? (
        <p className="case-mag__lead text-lg leading-relaxed">{lead}</p>
      ) : null}

      {rows.map((row) => (
        <MagRow key={row.src} row={row} projectName={projectName} />
      ))}

      {/* Остаток текста без пары-фото */}
      {leftoverParas.map((p, i) => (
        <p key={`tail-${i}`} className="case-mag__lead text-lg leading-relaxed">
          {p}
        </p>
      ))}
    </div>
  );
}
