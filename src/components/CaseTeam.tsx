/**
 * Блок «Команда проекта» — роли и имена, как на clavis-interior.ru.
 */

import type { TeamMember } from "@/lib/projects";

type Props = {
  /** Участники кейса */
  team: TeamMember[];
};

/** Список ролей команды под текстом кейса */
export function CaseTeam({ team }: Props) {
  if (!team.length) return null;

  return (
    <section className="case-team" aria-labelledby="case-team-heading">
      <h2 id="case-team-heading" className="font-display text-2xl md:text-[1.65rem]">
        Команда проекта
      </h2>
      <dl className="case-team__list">
        {team.map((m) => (
          <div key={`${m.role}-${m.name}`} className="case-team__row">
            <dt className="case-team__role">{m.role}</dt>
            <dd className="case-team__name">{m.name}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
