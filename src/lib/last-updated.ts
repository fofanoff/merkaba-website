import type { Locale } from "@/lib/i18n";

const prefixes: Record<Locale, string> = {
  ru: "Обновлено",
  en: "Updated",
  tr: "Güncelleme",
  ar: "تحديث",
};

// "Обновлено: июнь 2026" - computed at build/revalidation time, never goes stale.
// Pages revalidate daily (see [locale]/layout.tsx), so the label rolls over on the 1st automatically
export function lastUpdatedLabel(locale: Locale): string {
  const now = new Date();
  const month = new Intl.DateTimeFormat(locale === "ar" ? "ar-u-nu-latn" : locale, {
    month: "long",
  }).format(now);
  return `${prefixes[locale]}: ${month} ${now.getFullYear()}`;
}

// ISO date for Schema.org dateModified
export function currentIsoDate(): string {
  return new Date().toISOString().split("T")[0];
}

// Overwrites every "last_updated" value in the dictionary with the computed label,
// so the JSON strings are only fallbacks and never need manual monthly bumps
export function stampLastUpdated(node: unknown, label: string): void {
  if (!node || typeof node !== "object") return;
  for (const [key, value] of Object.entries(node as Record<string, unknown>)) {
    if (key === "last_updated" && typeof value === "string") {
      (node as Record<string, unknown>)[key] = label;
    } else {
      stampLastUpdated(value, label);
    }
  }
}
