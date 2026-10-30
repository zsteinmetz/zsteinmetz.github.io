import fs from 'fs';
import path from 'path';

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

const METRICS_PATH = path.join(process.cwd(), 'data', 'openalex-metrics.json');

/**
 * Load citation metrics fetched by scripts/fetch-metrics.mjs.
 * The data/openalex-metrics.json file is committed as a fallback, so fresh
 * clones and offline builds always have data. Returns null if the file is
 * missing or invalid, in which case citation metrics are simply not shown.
 */
export function getCitationMetrics(): OpenAlexMetrics | null {
  try {
    const raw = fs.readFileSync(METRICS_PATH, 'utf-8');
    return JSON.parse(raw) as OpenAlexMetrics;
  } catch {
    return null;
  }
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
