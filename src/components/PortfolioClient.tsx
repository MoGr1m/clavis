"use client";

/**
 * Клиентский список портфолио с фильтром Жилые / Коммерческие.
 */

import { useMemo, useState } from "react";
import { ProjectCard } from "@/components/ProjectCard";
import { PROJECTS, type ProjectType } from "@/lib/projects";

type Filter = "all" | ProjectType;

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "Все" },
  { id: "residential", label: "Жилые" },
  { id: "commercial", label: "Коммерческие" },
];

/** Витрина проектов */
export function PortfolioClient() {
  const [filter, setFilter] = useState<Filter>("all");

  const list = useMemo(() => {
    if (filter === "all") return PROJECTS;
    return PROJECTS.filter((p) => p.type === filter);
  }, [filter]);

  return (
    <div className="container-page py-12 md:py-20">
      <p className="text-[11px] uppercase tracking-[0.18em] muted mb-3">Портфолио</p>
      <h1 className="font-display text-[clamp(2.4rem,6vw,4rem)] mb-4">Проекты</h1>
      <p className="muted max-w-xl mb-8 md:mb-10">
        Пять актуальных кейсов. Имена — как истории: Родченко (ЖК «Зиларт»), Chaveta, Rib&apos;s
        48, Нау, Тимирязевский.
      </p>

      <div
        className="flex flex-wrap gap-2 mb-10 md:mb-12"
        role="tablist"
        aria-label="Фильтр проектов"
      >
        {FILTERS.map((f) => {
          const active = filter === f.id;
          return (
            <button
              key={f.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setFilter(f.id)}
              className={[
                "min-h-10 px-4 py-2 text-[12px] uppercase tracking-[0.12em] border transition-colors",
                active
                  ? "border-[var(--text)] text-[var(--text)]"
                  : "border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)]",
              ].join(" ")}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      <div className="grid gap-10 md:gap-12 md:grid-cols-2">
        {list.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}
