"use client";

/**
 * Шапка: логотип, открытое меню на десктопе, гамбургер на мобиле.
 * Переключателя тем больше нет — сайт только в тёмном salon.
 */

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { NAV_ITEMS } from "@/lib/site";

/** Шапка сайта */
export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname() || "/";

  return (
    <header className="site-header sticky top-0 z-40 border-b hairline bg-[var(--bg)]/92 backdrop-blur-md">
      <div className="container-page flex items-center justify-between gap-4 py-3.5 md:py-4">
        <Link href="/" className="shrink-0" aria-label="Clavis — на главную">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/header-logo.svg"
            alt="Clavis"
            className="brand-logo"
            style={{ height: "2rem", width: "auto" }}
          />
        </Link>

        {/* Открытое меню — десктоп */}
        <nav
          className="hidden md:flex items-center gap-7 text-[13px] uppercase tracking-[0.14em]"
          aria-label="Основное меню"
        >
          {NAV_ITEMS.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={[
                  "transition-colors",
                  active
                    ? "text-[var(--text)]"
                    : "text-[var(--text-muted)] hover:text-[var(--text)]",
                ].join(" ")}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* CTA в шапке на десктопе + гамбургер на мобиле */}
        <div className="flex items-center gap-3">
          <Link
            href="/contacts"
            className="hidden sm:inline-flex text-[11px] uppercase tracking-[0.14em] border hairline px-3 py-2 hover:border-[var(--text)] transition-colors"
          >
            Консультация
          </Link>
          <button
            type="button"
            className="md:hidden min-h-10 min-w-[4.5rem] border hairline px-3 py-2 text-[11px] uppercase tracking-[0.14em]"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "Закрыть" : "Меню"}
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          className="md:hidden border-t hairline bg-[var(--bg)]"
          aria-label="Мобильное меню"
        >
          <ul className="container-page flex flex-col py-2">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block py-3.5 text-sm uppercase tracking-[0.12em]"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/contacts"
                className="block py-3.5 text-sm uppercase tracking-[0.12em] text-[var(--accent)]"
                onClick={() => setOpen(false)}
              >
                Консультация
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
