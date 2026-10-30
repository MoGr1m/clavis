/**
 * Подвал: контакты, навигация, юридическая сноска Instagram/Meta.
 */

import Link from "next/link";
import { CONTACTS, NAV_ITEMS } from "@/lib/site";

/** Футер сайта */
export function Footer() {
  return (
    <footer className="mt-auto border-t hairline">
      <div className="container-page grid gap-10 py-14 md:grid-cols-3">
        <div>
          <p className="font-display text-3xl mb-3">Clavis</p>
          <p className="muted text-sm max-w-xs">
            Студия дизайна интерьера. Эстетика пространства. Точность реализации.
          </p>
        </div>

        <div>
          <p className="text-[11px] uppercase tracking-[0.16em] muted mb-4">Разделы</p>
          <ul className="space-y-2 text-sm">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-[11px] uppercase tracking-[0.16em] muted mb-4">Контакты</p>
          <ul className="space-y-2 text-sm">
            <li>
              <a href={CONTACTS.phoneHref}>{CONTACTS.phone}</a>
            </li>
            <li>
              <a href={CONTACTS.emailHref}>{CONTACTS.email}</a>
            </li>
            <li>
              <a href={CONTACTS.telegram} target="_blank" rel="noreferrer">
                Telegram
              </a>
            </li>
            <li>
              <a href={CONTACTS.instagram} target="_blank" rel="noreferrer">
                {CONTACTS.instagramHandle}
              </a>
            </li>
            <li className="muted text-xs pt-2">{CONTACTS.hours}</li>
          </ul>
        </div>
      </div>

      <div className="border-t hairline">
        <div className="container-page flex flex-col gap-2 py-5 text-xs muted md:flex-row md:justify-between">
          <p>© 2026 Clavis. Все права защищены.</p>
          <p>
            Instagram принадлежит Meta Platforms, Inc., деятельность которой
            признана экстремистской и запрещена на территории РФ.
          </p>
        </div>
      </div>
    </footer>
  );
}
