// Pure, client-safe helpers for OpenAlex citation metrics. The fs-based
// loader lives in metricsServer.ts (server side only).

export interface OpenAlexWorkMetrics {
  openalexId: string;
  doi?: string;
  title?: string;
  publicationYear?: number;
  citedByCount: number;
}

export interface OpenAlexAuthorMetrics {
  openalexId: string;
  displayName?: string;
  worksCount: number;
  citedByCount: number;
  hIndex: number;
  i10Index: number;
  hIndex2yrMean?: number;
}

export interface OpenAlexMetrics {
  orcid: string;
  fetchedAt: string;
  author: OpenAlexAuthorMetrics;
  works: OpenAlexWorkMetrics[];
}

// Subset passed to the client for rendering the publications page.
export interface PublicationMetricsSummary {
  orcid: string;
  fetchedAt: string;
  author: OpenAlexAuthorMetrics;
}

// Deterministic date formatting matching the footer's per-locale style:
// en -> "October 30, 2026", de -> "30. Oktober 2026"
const METRICS_MONTH_NAMES: Record<string, string[]> = {
  en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  de: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
};

export function formatMetricsDate(isoDate: string, locale = 'en'): string {
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return isoDate;
  const months = METRICS_MONTH_NAMES[locale] || METRICS_MONTH_NAMES.en;
  const day = date.getUTCDate();
  const month = months[date.getUTCMonth()];
  const year = date.getUTCFullYear();
  return locale === 'de' ? `${day}. ${month} ${year}` : `${month} ${day}, ${year}`;
}

export function toMetricsSummary(metrics: OpenAlexMetrics | null): PublicationMetricsSummary | undefined {
  if (!metrics) return undefined;
  return {
    orcid: metrics.orcid,
    fetchedAt: metrics.fetchedAt,
    author: metrics.author,
  };
}

function normalizeDoi(doi?: string): string | null {
  if (!doi) return null;
  const stripped = doi.toLowerCase().replace(/^https?:\/\/(dx\.)?doi\.org\//, '').trim();
  return stripped || null;
}

function normalizeTitle(title?: string): string | null {
  if (!title) return null;
  const normalized = title.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
  return normalized || null;
}

/**
 * Match a publication to an OpenAlex work by DOI first, then by normalized
 * title. Returns null when the publication is not found in OpenAlex.
 */
export function getMetricsForPublication(
  publication: { title: string; doi?: string },
  metrics: OpenAlexMetrics | null
): { citations: number; openalexId: string } | null {
  if (!metrics || metrics.works.length === 0) return null;

  const doi = normalizeDoi(publication.doi);
  if (doi) {
    const byDoi = metrics.works.find((work) => normalizeDoi(work.doi) === doi);
    if (byDoi) {
      return { citations: byDoi.citedByCount, openalexId: byDoi.openalexId };
    }
  }

  const title = normalizeTitle(publication.title);
  if (title) {
    const byTitle = metrics.works.find((work) => normalizeTitle(work.title) === title);
    if (byTitle) {
      return { citations: byTitle.citedByCount, openalexId: byTitle.openalexId };
    }
  }

  return null;
}
