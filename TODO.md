# TODO — Feature Roadmap

Planned features and improvements for PRISM. Items are grouped by priority; each item links to the relevant parts of the codebase. See `CHANGELOG.md` for what has already shipped.

## Planned

### 1. DOI link + citation badges per publication 📎

Show a DOI link and citation badge for every publication on the Publications page (and selected publications on the homepage), using data that is already available.

*Background:* `scripts/fetch-metrics.mjs` already stores DOIs and `citedByCount` in `data/openalex-metrics.json`, and `src/lib/metrics.ts` loads per-publication metrics. However, the publications list currently only shows a plain "Cited by" count — DOIs from the BibTeX file (`content/publications.bib`) are not rendered, and the citation counts are not linked anywhere.

Implementation:

- [x] Add `doi` parsing to `src/lib/bibtexParser.ts` so DOIs present in `publications.bib` flow into the `Publication` type (`src/types/publication.ts`).
- [x] Extend `src/lib/metrics.ts` so each publication's OpenAlex record (DOI, `citedByCount`, OpenAlex work URL) can be looked up by DOI *or* title, and falls back to BibTeX `doi` when no metrics are available.
- [x] In `src/components/publications/PublicationsList.tsx`, render a small "DOI" link button (e.g., `https://doi.org/<doi>`) next to the existing copy-BibTeX and abstract actions, using the existing button styling.
- [x] Turn the "Cited by N" text into a badge linking to the publication's OpenAlex work page (`metrics.publication.openalexId`) instead of plain text.
- [x] Add i18n strings for the DOI link tooltip / aria-label in `src/lib/i18n/messages.ts` (EN + DE).
- [x] Test with publications that (a) have a DOI in BibTeX and metrics, (b) have a DOI but no metrics, (c) have neither.

### 2. Auto "last updated" 🕒

Replace the manually maintained `site.last_updated` string in `content/config.toml` with a build-time value derived from the content.

*Background:* `[site] last_updated = "November 2, 2026"` is currently a hand-edited string that is easy to forget and goes stale.

Implementation:

- [x] Add a build-time helper (e.g., in `scripts/fetch-metrics.mjs` or a new `scripts/compute-last-updated.mjs`) that determines the latest modification across `content/`, `content_<locale>/`, `publications.bib`, and `public/` — prefer the latest git commit timestamp (`git log -1 --format=%cI -- content content_de`) when git is available, and fall back to file mtimes (or `new Date()`) otherwise, matching the "always works offline / fresh clones" pattern used for the OpenAlex metrics fallback.
- [x] Expose the computed date through the site config pipeline in `src/lib/config.ts`, overriding the manual `last_updated` value when it is newer (or make the TOML key optional and document it as deprecated).
- [x] Localize the rendered date (the site already has `formatMetricsDate` in `src/lib/metrics.ts` and locale state via `src/lib/stores/localeStore.ts` — reuse the same date-formatting approach).
- [x] Update `README.md` (Configuration section) to document the new behavior.
- [x] Verify the static export (`npm run build`) bakes the correct date into `out/`.
