/**
 * Услуги и цены — целиком в светлой reading-surface.
 */

import Link from "next/link";
import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { SERVICES, SERVICES_CUSTOM } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Услуги и цены",
  description:
    "Дизайн-проект от 6 000 ₽/м², 3D-визуализация, концепт, декор. Прозрачный прайс студии Clavis.",
  path: "/services",
});

/** Страница услуг */
export default function ServicesPage() {
  return (
    <div>
      <section className="container-page py-14 md:py-20">
        <p className="text-[11px] uppercase tracking-[0.18em] muted mb-3">Услуги</p>
        <h1 className="font-display text-[clamp(2.4rem,7vw,4.5rem)] mb-4">
          Состав работ и цены
        </h1>
        <p className="muted max-w-xl">
          Прозрачный прайс. Точная смета зависит от площади и задач.
        </p>
      </section>

      <section className="reading-surface py-14 md:py-24">
        <div className="container-page">
          <div className="grid gap-0">
            {SERVICES.map((s) => (
              <div
                key={s.id}
                className="grid gap-3 md:gap-4 border-t py-7 md:py-8 md:grid-cols-[1fr_160px_1.2fr] md:items-start"
                style={{ borderColor: "var(--surface-light-border)" }}
              >
                <h2 className="font-display text-2xl md:text-3xl">{s.title}</h2>
                <p className="text-sm md:text-right tracking-wide">{s.price}</p>
                <p className="muted text-sm md:text-base">{s.description}</p>
              </div>
            ))}
          </div>

          <div
            className="mt-12 md:mt-14 border-t pt-8 md:pt-10"
            style={{ borderColor: "var(--surface-light-border)" }}
          >
            <h2 className="font-display text-2xl mb-4">Индивидуально</h2>
            <p className="muted mb-6 max-w-xl">
              Стоимость рассчитывается под объект и объём сопровождения.
            </p>
            <ul className="flex flex-wrap gap-2">
              {SERVICES_CUSTOM.map((name) => (
                <li
                  key={name}
                  className="text-[12px] uppercase tracking-[0.1em] border px-3 py-2"
                  style={{ borderColor: "var(--surface-light-border)" }}
                >
                  {name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="container-page py-14 md:py-16 text-center">
        <h2 className="font-display text-3xl mb-4">Рассчитаем ваш объём</h2>
        <p className="muted mb-8">
          Напишите площадь и задачу — ответим с ориентиром по срокам и бюджету.
        </p>
        <Link href="/contacts" className="btn-primary">
          Записаться на консультацию
        </Link>
      </section>
    </div>
  );
}
