# CHANGELOG

## Unreleased
- Redesigned the theme from Deep Navy & Gold to Forest & Copper: a warm forest-green primary with copper accents in light and dark modes, a gray-green neutral ramp, muted semantic colors, and an updated print palette.
- Switched the site fonts to self-hosted Lora for headings and IBM Plex Sans for body text (both variable, 400–700, with italics), plus IBM Plex Mono for code and BibTeX snippets. Inter and Georgia were removed.
- Rebuilt the CV page as a narrative academic portfolio: a new `cv` page type driven by a structured `content/cv.toml` with an academic profile, expandable appointments timeline, education, research project cards, publications (reusing `publications.bib`), teaching & supervision, grants & awards, academic service, and skills. Includes a sticky section index with scroll-spy, a print/PDF action, print-friendly styles, and i18n support via localized section headings. See `docs/cv.md` for the schema. The old `content/cv.md` text page was replaced by this content model.
- Added citation metrics from OpenAlex on the publications page: an author summary strip (citations, h-index, works count) and per-publication "Cited by" badges. Metrics are fetched at build time via `scripts/fetch-metrics.mjs` using the ORCID from `content/config.toml`, with a committed fallback in `data/openalex-metrics.json` so fresh clones and offline builds always have data. The deploy workflow now refreshes metrics weekly.

## v1.3.3 on May 13, 2026
- Fixed disabled i18n mode so browser language and stored locale preferences cannot override the default locale.
- Added inline formatting for BibTeX publication titles, including `\textit`, `\emph`, `\textbf`, `\textsc`, superscript, and subscript commands.

## v1.3.2 on Mar 19, 2026
- Added Markdown rendering for card items.

## v1.3.1 on Feb 24, 2026
- Fixed SSR/client mismatch from font stylesheet toggling. Updated font settings to be deterministic.

## v1.3.0 on Feb 22, 2026
- Added support for i18n. Set `enabled = true` in config.toml to enable this feature.
- Fixed some cases where the navigation bar indicator not working correctly.

## v1.2.1 on Feb 19, 2026
- Updated the navigation bar implementation to make it more responsive, dynamic, and natural.
- The demo site is updated as well.

## v1.2.0 on Dec 6, 2025

- Added GitHub Actions workflow for automatic deployment to GitHub Pages.
- Fixed publication highlighting with site owner name.
- Fixed co-author underline.
- Fixed broken "view all" link when one-page mode is disabled.
- Updated docs and deployment guide.

## v1.1.0 on Nov 23, 2025

- Added support for one-page mode. Set `enable_one_page_mode = true` in config.toml to enable this feature. All subpages will be rendered on the same page.
- Added more flexible settings for social icons. You may leave the config blank to hide the display of any social icon.

## v1.0.0 on Nov 18, 2025

- Initial release
