// Server-side loader for OpenAlex citation metrics. Kept separate from
// metrics.ts so client components can import the pure helpers without
// pulling Node's 'fs' into the client bundle.
import fs from 'fs';
import path from 'path';
import type { OpenAlexMetrics } from './metrics';

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
