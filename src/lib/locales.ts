/**
 * Normalize a locale identifier for content-directory lookups:
 * trims whitespace, converts underscores to hyphens, lowercases.
 * e.g. " EN_US " -> "en-us"
 */
export function normalizeLocale(locale: string): string {
  return locale.trim().replace('_', '-').toLowerCase();
}
