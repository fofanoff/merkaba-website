import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Merkaba Digital - Generative Engine Optimization",
  description:
    "Мы делаем ваш бизнес видимым для AI. GEO-агентство нового поколения.",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
