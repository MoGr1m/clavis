/**
 * Контакты и форма заявки.
 */

import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { pageMeta } from "@/lib/seo";
import { CONTACTS } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Контакты",
  description:
    "Записаться на консультацию: телефон, Telegram, Instagram. Студия дизайна интерьера Clavis, Москва.",
  path: "/contacts",
});

/** Страница контактов */
export default function ContactsPage() {
  return (
    <div className="container-page py-14 md:py-24">
      <p className="text-[11px] uppercase tracking-[0.18em] muted mb-3">Контакты</p>
      <h1 className="font-display text-[clamp(2.4rem,7vw,4.5rem)] mb-4">
        Напишите или позвоните
      </h1>
      <p className="muted max-w-xl mb-10 md:mb-14">
        {CONTACTS.meeting}. Ответим в течение 1–2 рабочих дней.
      </p>

      <div className="grid gap-12 lg:gap-14 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-8">
          <div>
            <p className="text-[11px] uppercase tracking-[0.14em] muted mb-2">Телефон</p>
            <a href={CONTACTS.phoneHref} className="font-display text-2xl md:text-3xl">
              {CONTACTS.phone}
            </a>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.14em] muted mb-2">Email</p>
            <a href={CONTACTS.emailHref} className="text-lg break-all">
              {CONTACTS.email}
            </a>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.14em] muted mb-2">Мессенджеры</p>
            <ul className="space-y-2 text-lg">
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
            </ul>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.14em] muted mb-2">Часы</p>
            <p>{CONTACTS.hours}</p>
          </div>
        </div>

        <div className="border hairline p-5 md:p-8">
          <h2 className="font-display text-2xl mb-6">Заявка на консультацию</h2>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
