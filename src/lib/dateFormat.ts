// Deterministic, client-safe date formatting shared by the footer and the
// citation metrics UI. Renders ISO 8601 strings per locale, matching the
// footer's style: en -> "October 30, 2026", de -> "30. Oktober 2026".
// Locales without a month-name table fall back to English.
const MONTH_NAMES: Record<string, string[]> = {
  en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  de: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
};

export function formatDate(isoDate: string, locale = 'en'): string {
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return isoDate;
  const months = MONTH_NAMES[locale] || MONTH_NAMES.en;
  const day = date.getUTCDate();
  const month = months[date.getUTCMonth()];
  const year = date.getUTCFullYear();
  return locale === 'de' ? `${day}. ${month} ${year}` : `${month} ${day}, ${year}`;
}
