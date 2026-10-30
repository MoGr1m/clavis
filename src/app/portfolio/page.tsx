/**
 * Портфолио: оболочка с SEO + клиентский фильтр.
 */

import type { Metadata } from "next";
import { PortfolioClient } from "@/components/PortfolioClient";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Портфолио",
  description:
    "Проекты студии Clavis: Rib's 48, Chaveta, Родченко (ЖК Зиларт), Нау, Тимирязевский. Жилые и коммерческие интерьеры.",
  path: "/portfolio",
});

/** Страница портфолио */
export default function PortfolioPage() {
  return <PortfolioClient />;
}
