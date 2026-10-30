"use client";

/**
 * Форма заявки: клиентская валидация.
 * Бэкенда пока нет — после проверки открываем mailto (черновик письма)
 * и показываем понятную заглушку «пока без сервера».
 */

import { useState, type FormEvent } from "react";
import { CONTACTS } from "@/lib/site";

type Errors = {
  name?: string;
  phone?: string;
  area?: string;
};

/** Проверка телефона: минимум 10 цифр */
function phoneDigitsOk(value: string): boolean {
  const digits = value.replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 15;
}

/** Форма контактов */
export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  /** Валидация и отправка через mailto (без серверного API) */
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const type = String(data.get("type") || "");
    const area = String(data.get("area") || "").trim();
    const message = String(data.get("message") || "").trim();

    const next: Errors = {};
    if (name.length < 2) next.name = "Укажите имя (минимум 2 символа)";
    if (!phoneDigitsOk(phone)) next.phone = "Укажите телефон с кодом страны, например +7…";
    if (area && !/^\d{1,4}([.,]\d{1,2})?$/.test(area)) {
      next.area = "Площадь — число, например 80";
    }

    setErrors(next);
    if (Object.keys(next).length > 0) return;

    const typeLabel: Record<string, string> = {
      apartment: "Квартира",
      house: "Дом",
      commercial: "Коммерция",
      other: "Другое",
    };

    const body = [
      `Имя: ${name}`,
      `Телефон: ${phone}`,
      `Тип объекта: ${typeLabel[type] || type}`,
      area ? `Площадь: ${area} м²` : null,
      message ? `Задача: ${message}` : null,
      "",
      "(Письмо сформировано формой сайта Clavis — серверная отправка пока не подключена.)",
    ]
      .filter(Boolean)
      .join("\n");

    const mailto = `${CONTACTS.emailHref}?subject=${encodeURIComponent(
      "Заявка на консультацию — Clavis",
    )}&body=${encodeURIComponent(body)}`;

    // Открываем почтовый клиент; если его нет — пользователь всё равно видит инструкцию ниже
    window.location.href = mailto;
    setSent(true);
  }

  if (sent) {
    return (
      <div className="border hairline p-6 md:p-8">
        <p className="font-display text-2xl mb-3">Черновик письма готов</p>
        <p className="muted text-sm mb-4">
          Серверной отправки пока нет: открыли вашу почтовую программу с заполненным
          письмом на {CONTACTS.email}. Если окно не появилось — напишите нам напрямую.
        </p>
        <ul className="space-y-2 text-sm">
          <li>
            <a href={CONTACTS.phoneHref} className="underline underline-offset-2">
              {CONTACTS.phone}
            </a>
          </li>
          <li>
            <a
              href={CONTACTS.telegram}
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-2"
            >
              Telegram
            </a>
          </li>
          <li>
            <a href={CONTACTS.emailHref} className="underline underline-offset-2 break-all">
              {CONTACTS.email}
            </a>
          </li>
        </ul>
        <button
          type="button"
          className="btn-ghost mt-6"
          onClick={() => {
            setSent(false);
            setErrors({});
          }}
        >
          Заполнить ещё раз
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      <p className="text-xs muted mb-2">
        Пока без сервера: заявка уйдёт через ваш почтовый клиент (mailto).
      </p>

      <div>
        <label className="block text-[11px] uppercase tracking-[0.14em] muted mb-2" htmlFor="cf-name">
          Имя
        </label>
        <input
          id="cf-name"
          className={["field", errors.name ? "field-error" : ""].join(" ")}
          name="name"
          autoComplete="name"
          placeholder="Как к вам обращаться"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "err-name" : undefined}
        />
        {errors.name ? (
          <p id="err-name" className="field-error-text">
            {errors.name}
          </p>
        ) : null}
      </div>

      <div>
        <label className="block text-[11px] uppercase tracking-[0.14em] muted mb-2" htmlFor="cf-phone">
          Телефон
        </label>
        <input
          id="cf-phone"
          className={["field", errors.phone ? "field-error" : ""].join(" ")}
          name="phone"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          placeholder="+7 …"
          aria-invalid={Boolean(errors.phone)}
          aria-describedby={errors.phone ? "err-phone" : undefined}
        />
        {errors.phone ? (
          <p id="err-phone" className="field-error-text">
            {errors.phone}
          </p>
        ) : null}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="block text-[11px] uppercase tracking-[0.14em] muted mb-2" htmlFor="cf-type">
            Тип объекта
          </label>
          <select id="cf-type" className="field" name="type" defaultValue="apartment">
            <option value="apartment">Квартира</option>
            <option value="house">Дом</option>
            <option value="commercial">Коммерция</option>
            <option value="other">Другое</option>
          </select>
        </div>
        <div>
          <label className="block text-[11px] uppercase tracking-[0.14em] muted mb-2" htmlFor="cf-area">
            Площадь, м²
          </label>
          <input
            id="cf-area"
            className={["field", errors.area ? "field-error" : ""].join(" ")}
            name="area"
            inputMode="decimal"
            placeholder="например, 80"
            aria-invalid={Boolean(errors.area)}
            aria-describedby={errors.area ? "err-area" : undefined}
          />
          {errors.area ? (
            <p id="err-area" className="field-error-text">
              {errors.area}
            </p>
          ) : null}
        </div>
      </div>

      <div>
        <label className="block text-[11px] uppercase tracking-[0.14em] muted mb-2" htmlFor="cf-message">
          Что нужно
        </label>
        <textarea
          id="cf-message"
          className="field min-h-[120px] resize-y"
          name="message"
          placeholder="Коротко о задаче"
        />
      </div>

      <button type="submit" className="btn-primary w-full sm:w-auto">
        Отправить заявку
      </button>
      <p className="text-xs muted">Ответим в течение 1–2 рабочих дней.</p>
    </form>
  );
}
