#!/usr/bin/env node
/**
 * Fetch citation metrics from OpenAlex and write data/openalex-metrics.json.
 *
 * - Reads the ORCID from content/config.toml ([social] orcid).
 * - Fetches author-level metrics (works count, citations, h-index) and
 *   per-work citation counts for every work linked to that ORCID.
 * - Writes data/openalex-metrics.json, which is committed as a fallback so
 *   fresh clones and offline builds always have data to render.
 *
 * On any failure (offline, API down, ...) this exits 0 with a warning and
 * leaves the existing fallback file untouched, so builds never break.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const CONFIG_PATH = path.join(ROOT, 'content', 'config.toml');
const OUT_DIR = path.join(ROOT, 'data');
const OUT_PATH = path.join(OUT_DIR, 'openalex-metrics.json');

const OPENALEX_API = 'https://api.openalex.org';
// Optional: an email for OpenAlex' polite pool and/or a free API key.
const MAILTO = process.env.OPENALEX_MAILTO || '';
const API_KEY = process.env.OPENALEX_API_KEY || '';

function warn(message) {
  console.warn(`[fetch-metrics] ${message}`);
}

function extractOrcid(configContent) {
  const match = configContent.match(/^\s*orcid\s*=\s*["']([^"']+)["']\s*$/m);
  if (!match) return null;
  // Normalize to the bare ORCID iD (e.g. 0000-0001-6675-5033)
  const bare = match[1].match(/(\d{4}-\d{4}-\d{4}-\d{3}[\dX])/i);
  return bare ? bare[1].toUpperCase() : null;
}

async function fetchJson(url) {
  const res = await fetch(url, {
    headers: {
      'User-Agent': `PRISM site citation metrics fetcher (mailto:${MAILTO || 'not-provided'})`,
    },
  });
  if (!res.ok) {
    throw new Error(`OpenAlex request failed with HTTP ${res.status}: ${url}`);
  }
  return res.json();
}

async function fetchAuthorMetrics(orcid) {
  const params = new URLSearchParams();
  if (API_KEY) params.set('api_key', API_KEY);
  if (MAILTO) params.set('mailto', MAILTO);
  const query = params.size > 0 ? `?${params.toString()}` : '';
  return fetchJson(`${OPENALEX_API}/authors/https://orcid.org/${orcid}${query}`);
}

async function fetchAllWorks(orcid) {
  const works = [];
  let cursor = '*';

  while (cursor) {
    const params = new URLSearchParams({
      filter: `author.orcid:${orcid}`,
      'per-page': '200',
      cursor,
      select: 'id,doi,title,publication_year,cited_by_count',
    });
    if (API_KEY) params.set('api_key', API_KEY);
    if (MAILTO) params.set('mailto', MAILTO);

    const data = await fetchJson(`${OPENALEX_API}/works?${params.toString()}`);

    for (const work of data.results || []) {
      works.push({
        openalexId: work.id,
        doi: work.doi ?? undefined,
        title: work.title ?? undefined,
        publicationYear: work.publication_year ?? undefined,
        citedByCount: work.cited_by_count ?? 0,
      });
    }

    cursor = data.meta?.next_cursor ?? null;
  }

  return works;
}

async function main() {
  let orcid;
  try {
    orcid = extractOrcid(readFileSync(CONFIG_PATH, 'utf8'));
  } catch (error) {
    warn(`Could not read ${path.relative(ROOT, CONFIG_PATH)}: ${error.message}. Keeping existing metrics file.`);
    return;
  }

  if (!orcid) {
    warn('No ORCID found in content/config.toml ([social] orcid). Keeping existing metrics file.');
    return;
  }

  try {
    const author = await fetchAuthorMetrics(orcid);
    const works = await fetchAllWorks(orcid);

    const metrics = {
      orcid,
      fetchedAt: new Date().toISOString(),
      author: {
        openalexId: author.id,
        displayName: author.display_name,
        worksCount: author.works_count ?? 0,
        citedByCount: author.cited_by_count ?? 0,
        hIndex: author.summary_stats?.h_index ?? 0,
        i10Index: author.summary_stats?.i10_index ?? 0,
        hIndex2yrMean: author.summary_stats?.['2yr_mean_citedness'],
      },
      works,
    };

    mkdirSync(OUT_DIR, { recursive: true });
    writeFileSync(OUT_PATH, JSON.stringify(metrics, null, 2) + '\n');
    console.log(`[fetch-metrics] Updated ${path.relative(ROOT, OUT_PATH)} (${works.length} works, ${metrics.author.citedByCount} citations).`);
  } catch (error) {
    warn(`Failed to fetch metrics from OpenAlex: ${error.message}.`);
    if (existsSync(OUT_PATH)) {
      warn('Keeping the existing committed fallback file.');
    } else {
      warn('No metrics file exists yet; the site will build without citation metrics.');
    }
    // Exit 0 so builds (including offline builds and CI) never fail because of this.
  }
}

main();
