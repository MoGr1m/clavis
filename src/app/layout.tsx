/**
 * Корневой layout: шрифты темы C (Playfair + Source Sans), шапка и подвал.
 */

import type { Metadata } from "next";
import { Playfair_Display, Source_Sans_3 } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import "./globals.css";

/* Тема C: контрастный salon */
const playfair = Playfair_Display({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
  variable: "--font-playfair",
  display: "swap",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
  variable: "--font-source-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://clavis-interior.ru"),
  title: {
    default: "Clavis — студия дизайна интерьера",
    template: "%s · Clavis",
  },
  description:
    "Дизайн, который отражает то, как живут люди. Эстетика пространства. Точность реализации.",
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: "Clavis",
  },
  icons: {
    icon: [
      { url: "/brand/fav-favicon.ico" },
      { url: "/brand/fav-favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/brand/fav-favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/brand/fav-apple-touch-icon.png",
  },
};

/** Корневая оболочка */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${playfair.variable} ${sourceSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[var(--bg)] text-[var(--text)]">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
