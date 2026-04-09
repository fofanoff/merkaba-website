export const locales = ["ru", "en", "tr", "ar"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "ru";

export function isRtl(locale: Locale): boolean {
  return locale === "ar";
}

const dictionaries: Record<Locale, () => Promise<Record<string, unknown>>> = {
  ru: () => import("@/dictionaries/ru.json").then((m) => m.default),
  en: () => import("@/dictionaries/en.json").then((m) => m.default),
  tr: () => import("@/dictionaries/tr.json").then((m) => m.default),
  ar: () => import("@/dictionaries/ar.json").then((m) => m.default),
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getDictionary(locale: Locale): Promise<any> {
  if (!locales.includes(locale)) {
    return dictionaries[defaultLocale]();
  }
  return dictionaries[locale]();
}
