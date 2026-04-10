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
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Merkaba Digital - Generative Engine Optimization (GEO)",
    description:
      "Making businesses visible to AI. Optimization for ChatGPT, Gemini, Perplexity, Claude. AI Visibility Audit, monitoring, content engineering. merkaba.vip",
    images: ["https://merkaba.vip/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
