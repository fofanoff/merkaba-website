import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Merkaba Digital - Generative Engine Optimization (GEO)",
  description:
    "Делаем бизнес видимым для AI. Оптимизация для ChatGPT, Gemini, Perplexity, Claude. AI Visibility Audit, мониторинг, контент-инжиниринг. merkaba.vip",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  metadataBase: new URL("https://merkaba.vip"),
  openGraph: {
    type: "website",
    siteName: "Merkaba Digital",
    images: [{ url: "/logo.png", width: 512, height: 512 }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
