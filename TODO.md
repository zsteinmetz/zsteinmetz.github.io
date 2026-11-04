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

### 3. Publication list enhancements 📚

Improve the per-publication action buttons and the list controls (filters, counting, sorting) on the Publications page.

*Background:* `content/publications.bib` already carries `pdf` and `supp` (supplementary material) links for many entries, but `src/lib/bibtexParser.ts` does not map them into the `Publication` type, so they are never rendered. The action row in `src/components/publications/PublicationsList.tsx` currently shows DOI → "Cited by" badge → Code → Abstract → BibTeX buttons; the DOI button has no external-link affordance, and the ordering is ad-hoc. The list offers only single-year filter chips, no result count, and no sorting.

Implementation:

- [ ] Extend `src/lib/bibtexParser.ts` to parse the `pdf` and `supp` BibTeX fields into the `Publication` type (`src/types/publication.ts`): reuse the existing (currently unused) `pdfUrl` field for `pdf` and add a `suppUrl` field for `supp`.
- [ ] Render "PDF" and "Supplementary" link buttons in the per-publication action row of `src/components/publications/PublicationsList.tsx` (plus the CV/homepage publication cards, if consistent), using the existing button styling and shown only when the field is present.
- [ ] Add the `ArrowTopRightOnSquareIcon` (from `@heroicons/react/24/outline`) to the DOI button to signal that it opens an external link (consider the same affordance for the new PDF/supp and existing Code buttons).
- [ ] Rework the action button order for a more natural reading flow — e.g., primary access first (DOI → PDF → Supplementary → Code), then expandable details (Abstract → BibTeX), with the "Cited by" badge last; settle on and document the chosen order.
- [ ] Replace the single-year filter chips with year-range filters (e.g., grouped buckets like "2024–2026", a from/to year pair, or a dropdown with ranges) so the year filter scales better than one chip per year.
- [ ] Show a result count ("x of y publications", localized) that reflects the active search/filter state near the list.
- [ ] Add a sort control (e.g., newest/oldest year, most cited via `citedByCount` from `src/lib/metrics.ts`) alongside the filters, defaulting to the current newest-first order.
- [ ] Add EN + DE strings for all new buttons, tooltips, and labels in `src/lib/i18n/messages.ts`.
- [ ] Document the newly rendered `pdf`/`supp` BibTeX fields in `README.md` (Publications section).

### 4. Accessibility improvements ♿

Bring the site to WCAG 2.1 AA (plus easy WCAG 2.2 wins like target size and focus appearance) across both locales and both themes.

*Background:* The codebase already has solid foundations — a global `:focus-visible` ring (`src/app/globals.css`), `aria-label`s on the theme/language toggles and icon-only links, `aria-expanded`/`aria-controls` on the CV detail toggles (`CvProjects`, `CvTimeline`, `CvPublications`), `aria-current` in the CV section nav, `aria-hidden` on decorative icons, and `<html lang>` kept in sync with the locale. However, a code audit found real gaps: no skip-to-content link past the fixed navigation; Framer Motion entrance animations and `scroll-smooth` are never reduced for `prefers-reduced-motion` users; the header title link on the homepage is `aria-hidden` with `pointer-events-none` but remains tab-focusable (`src/components/layout/Navigation.tsx`, ~line 214); the publications search input has no accessible name (placeholder only); the year/type filter chips expose no state; the filter toggle and profile address/email buttons lack `aria-expanded`; the copy-BibTeX button is icon-only with just a `title` and no copied feedback; filter/search result changes are never announced; external links open new tabs without telling assistive technology; and several `text-neutral-500` small-text combinations (footer, CV section nav pills, abstracts) likely fail the 4.5:1 AA contrast ratio.

Implementation (ordered by priority; first three are quick wins):

- [ ] Add a skip-to-content link as the first focusable element in `src/app/layout.tsx` (before `<Navigation />`), targeting `<main id="main-content">`; style with `sr-only` plus `focus:not-sr-only` (existing Tailwind utilities) so it appears only on focus, and add EN + DE link text in `src/lib/i18n/messages.ts`.
- [ ] Respect `prefers-reduced-motion`: wrap the app in Framer Motion's `<MotionConfig reducedMotion="user">` (in `src/app/layout.tsx` or `ThemeProvider`) so all `motion.*` entrance/exit animations degrade gracefully, and add a `@media (prefers-reduced-motion: reduce)` block to `src/app/globals.css` that disables `scroll-smooth` (set on `<html>`), CSS transitions, and `CvSectionNav`'s smooth `scrollTo` (fall back to `behavior: 'auto'` in `CvSectionNav.tsx`).
- [ ] Fix the hidden-but-focusable header title link in `src/components/layout/Navigation.tsx`: when `!showHeaderTitle`, also set `tabIndex={-1}` on the wrapping `motion.div` (or apply `invisible`/`inert` alongside `opacity-0 pointer-events-none`) so keyboard users never tab into an invisible link.
- [ ] Give the publications search input an accessible name in `src/components/publications/PublicationsList.tsx` (`aria-label` or a visually hidden `<label>`; consider `type="search"`), and add `aria-expanded` + `aria-controls` to the "Filters" toggle button so its collapsed/expanded state is announced.
- [ ] Expose filter chip state: add `aria-pressed` to the year and type chip buttons in `PublicationsList.tsx` (and mark the chip groups up as labeled regions — e.g., `role="group"` with the existing "Year"/"Type" labels).
- [ ] Announce result changes: add an `aria-live="polite"` status region in `PublicationsList.tsx` that reports the filtered count ("x of y publications", localized — pairs naturally with the result-count feature planned in item 3), so screen readers hear search/filter updates.
- [ ] Fix the copy-BibTeX buttons in `PublicationsList.tsx`: give the icon-only button a proper `aria-label` (`title` alone is insufficient), implement the "copied" feedback noted in the code comment, and announce it via the new live region (or a dedicated `role="status"` element).
- [ ] Make external links self-describing: append a visually hidden "(opens in new tab)" (localized EN + DE) to links using `target="_blank"` — centralize in a small shared helper/component used by `MarkdownComponents.tsx`, `Profile.tsx`, `CvSection.tsx`, `CvPublications.tsx`, and `PublicationsList.tsx`.
- [ ] Make the profile address/email buttons keyboard-accessible in `src/components/home/Profile.tsx`: the tooltips currently open on hover/click only — also open on focus, add `aria-expanded`/`aria-controls` to the buttons, and close on `Escape`; ensure the tooltip content (address lines, email, map link) is reachable or duplicated accessibly.
- [ ] Audit and fix color contrast for `text-neutral-500` (and similar) small text against light/dark backgrounds — footer meta text (`Footer.tsx`), CV section-nav pills (`CvSectionNav.tsx`), abstract/BibTeX text (`PublicationsList.tsx`), and blockquotes (`MarkdownComponents.tsx`); step light-mode small text down to `neutral-600`/`neutral-700` and dark-mode up to `neutral-400`/`neutral-300` where the ratio falls below 4.5:1. Verify both themes.
- [ ] Give CV project images meaningful alternative text: `CvProjects.tsx` hardcodes `alt=""`; add an optional `image_alt` field to the CV projects schema (`src/lib/cv.ts`, `src/types/cv.ts`, documented in `docs/cv.md`), following the existing `imageAlt` pattern in `CardGrid.tsx`, with `alt=""` as the deliberate fallback for decorative images.
- [ ] Check heading order across all page types (home, sections, cards, text, publications, CV): every page needs exactly one `h1` (pages with an empty `title` that hides the heading must not skip levels), and section/card headings must descend in order; fix in the page components in `src/components/pages/`, `src/components/home/`, and `src/components/cv/`.
- [ ] Verify touch target sizes (WCAG 2.2 target size minimum 24×24 px) for the small icon buttons (profile social links, CV pill links, filter chips); increase padding where needed.
- [ ] Validate: run `npm run lint` and `npm run build`, then audit each page type in both locales and both themes with axe DevTools and Lighthouse (target: 0 serious/critical axe violations, Lighthouse a11y ≥ 95); add a keyboard-only and screen-reader spot check (Tab order, live announcements, menu focus behavior) of the navigation, publications filters, and CV page.
- [ ] Document the outcome: add an "Accessibility" section to `README.md` describing the supported behaviors (skip link, reduced motion, contrast guarantees) and record the shipped items in `CHANGELOG.md`.

### 5. Citation metrics row + "View All" on the CV pages 📊

Show the author citation metrics strip (total citations, h-index, OpenAlex source link, updated date) and a "View All →" heading link on the Publications section of `cv`-type pages (`/cv` profile and `/research`), matching the layout already shipped on the Publications page (headline → metrics strip → list) and the homepage's "View All" link.

*Background:* The metrics strip is currently inlined in `src/components/publications/PublicationsList.tsx` (~lines 84–103) and therefore not reusable. The server loader in `src/app/[slug]/page.tsx` (`loadDynamicPageData`, `cv` branch) already calls `loadPublicationsWithMetrics` — which loads the OpenAlex data — but discards the metrics and only forwards `publications`, so `CvPage`/`CvPublications` never see them. The "View All →" link exists on the homepage (`src/components/home/SelectedPublications.tsx`, right-aligned next to the heading, i18n key `home.viewAll`), and the Publications section of `CvPublications` (`src/components/cv/CvPublications.tsx`) is the natural place for both. All required i18n strings already exist (`publications.citationsTotal`, `metricsSource`, `metricsUpdated`, `home.viewAll`) — no new strings needed.

Implementation:

- [ ] Extract the metrics strip from `PublicationsList.tsx` into a reusable client component (e.g. `src/components/publications/MetricsSummaryRow.tsx`) that takes `metrics: PublicationMetricsSummary` (plus an optional `className`), pulls `useMessages()`/`useLocaleStore()` for the localized labels and `formatMetricsDate`, and renders exactly the current markup (ChartBarIcon, citations, h-index, OpenAlex source link, updated date). Refactor `PublicationsList.tsx` to render it — no visual change on `/publications`.
- [ ] Plumb the metrics into the CV pages: in `src/app/[slug]/page.tsx`, have the `cv` branch of `loadDynamicPageData` return `metrics: toMetricsSummary(metrics)` alongside `publications`; extend the `cv` variant of `DynamicPageLocaleData` in `src/components/pages/DynamicPageClient.tsx` with `metrics?: PublicationMetricsSummary` and pass it to `<CvPage>`; add `metrics` to `CvPageProps` (`src/components/cv/CvPage.tsx`) and forward it to `CvPublications`. `PublicationMetricsSummary` is a pure, client-safe type, so it can cross the server/client boundary like on the publications page.
- [ ] Also forward `enableOnePageMode` (from `features.enable_one_page_mode` in the locale config, as `src/app/page.tsx` does) through the page data to `CvPublications`, so the "View All" link targets `/#publications` in one-page mode and `/publications` otherwise — mirroring `SelectedPublications.tsx`.
- [ ] Add an optional `action?: ReactNode` prop to `CvSection` (`src/components/cv/CvSection.tsx`), rendered right-aligned on the heading row (`flex items-center justify-between` wrapping the existing `h2`), so section headings can carry a small link without changing any other CV section.
- [ ] In `CvPublications.tsx`, render the "View All →" link via the new `action` prop on the Publications section heading, styled like the homepage link (`text-accent-text hover:text-accent-dark text-sm font-medium ...`, `print:hidden`, using `messages.home.viewAll`), and render `<MetricsSummaryRow metrics={metrics} />` after the section `note` and directly above the "Featured Publications" sub-heading. The strip renders only when metrics data is available (same graceful degradation as the publications page) and stays visible in print (citation counts are useful on a printed CV).
- [ ] No content schema change: both `content/cv.toml` and `content/research.toml` already have a `[publications]` block sourcing `publications.bib`, so the strip and link appear on both pages automatically once the data flows. (Optionally add a `show_metrics = false` opt-out key per `[publications]` block if a template user needs to suppress it — decide during implementation.)
- [ ] Document the behavior in `docs/cv.md` (Publications section table: metrics strip + "View All" link render automatically when OpenAlex data is available) and add a `CHANGELOG.md` entry under `Unreleased`.
- [ ] Validate: `npm run lint` + `npm run build`; check `/cv` and `/research` in both locales (EN/DE) and both themes; confirm `/publications` is visually unchanged after the extraction; temporarily rename `data/openalex-metrics.json` and rebuild to confirm the strip (and only the strip) disappears gracefully.
