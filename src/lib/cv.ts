// Helpers shared by the CV page loader and components.

type Plain = Record<string, unknown>;

function isPlainObject(value: unknown): value is Plain {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/**
 * Deep-merge a localized CV config over the default one.
 *
 * Localized files (`content_<locale>/cv.toml`) typically only override the
 * title, description and section headings. Objects are merged recursively so
 * partially translated sections keep their default siblings; arrays (the CV
 * entries themselves) replace the default ones entirely.
 */
export function mergeCvData<T extends object>(base: T, override?: object | null): T {
  if (!override) return base;

  const merged: Plain = { ...base } as Plain;
  for (const [key, value] of Object.entries(override)) {
    if (value === undefined) continue;
    if (isPlainObject(value) && isPlainObject(merged[key])) {
      merged[key] = mergeCvData(merged[key] as Plain, value);
    } else {
      merged[key] = value;
    }
  }
  return merged as T;
}

export interface CvDatedEntry {
  sort_date?: string;
  start?: string;
  end?: string;
  period?: string;
}

/**
 * Numeric sort key for a CV entry (months since year 0).
 * Uses `sort_date` when present, then start/end, then period.
 * Entries without any parseable date sort first (file order is kept among them).
 */
export function cvDateKey(entry: CvDatedEntry): number {
  const raw = String(entry.sort_date || entry.start || entry.end || entry.period || '');
  const yearMatch = raw.match(/\d{4}/);
  if (!yearMatch) return 0;
  const year = parseInt(yearMatch[0], 10);
  const monthMatch = raw.match(/-(\d{1,2})/);
  const month = monthMatch ? Math.min(12, Math.max(1, parseInt(monthMatch[1], 10))) : 12;
  return year * 12 + (month - 1);
}

/** Sort CV entries chronologically, newest first. Stable for equal keys. */
export function sortCvEntriesDesc<T extends CvDatedEntry>(items: T[]): T[] {
  return items
    .map((item, index) => ({ item, index, key: cvDateKey(item) }))
    .sort((a, b) => (b.key - a.key) || (a.index - b.index))
    .map((entry) => entry.item);
}

/** "Sep 2025" + "" -> "Sep 2025 – Present"; tolerates missing fields. */
export function formatPeriod(start?: string, end?: string): string | undefined {
  if (start && end) return `${start} – ${end}`;
  if (start) return `${start} – Present`;
  return end || undefined;
}
