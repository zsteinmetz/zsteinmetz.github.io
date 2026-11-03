# AGENTS.md

Guidelines for coding agents working in this repository. Keep this file lean and factual; it links to other docs instead of duplicating them.

## Project Overview

PRISM (**P**ortfolio & **R**esearch **I**nterface **S**ite **M**aker) is a configuration-driven personal/research website template. All site content lives in TOML, Markdown, and BibTeX files; code in `src/` renders it.

**Stack:** Next.js 15 (App Router, Turbopack for dev), React 19, TypeScript, Tailwind CSS 4, Zustand, Framer Motion, smol-toml, react-markdown, bibtex-parse-js.

## Commands

- `npm run dev` — dev server at http://localhost:3000 (Turbopack)
- `npm run lint` — ESLint (`eslint-config-next`)
- `npm run build` — production build; runs `prebuild` (`scripts/fetch-metrics.mjs`) first, then emits the static site to `out/`
- Node ≥ 22 required (see `.nvmrc`)

**Validation:** run `npm run lint` and `npm run build` after every change; both must pass.

## Architecture Map

| Path | Purpose |
| --- | --- |
| `content/` | Default-locale site content: TOML page configs, Markdown files, `publications.bib`, `config.toml` |
| `content_<locale>/` | Additional locales (e.g., `content_de/`); same filenames, automatic fallback to `content/` |
| `src/app/` | Next.js App Router: `page.tsx` (home), `[slug]/page.tsx` (dynamic pages), `layout.tsx`, `sitemap.ts`, `robots.ts` |
| `src/components/` | React components, grouped by feature: `home/`, `layout/`, `pages/`, `publications/`, `cv/`, `highlights/`, `ui/`, `analytics/` |
| `src/lib/` | Content pipeline and utilities: `config.ts`, `content.ts`, `bibtexParser.ts`, `cv.ts`, `metrics.ts`, `locales.ts`, `utils.ts` |
| `src/lib/i18n/` | Locale config and UI strings: `messages.ts` (all user-facing strings), `useMessages.ts` |
| `src/lib/stores/` | Zustand client stores: `localeStore.ts`, `themeStore.ts` (hydration-safe patterns) |
| `src/types/` | TypeScript definitions: `publication.ts`, `cv.ts`, `page.ts`, `i18n.ts` |
| `scripts/fetch-metrics.mjs` | Build-time OpenAlex metrics fetch → `data/openalex-metrics.json` (committed offline fallback) |
| `public/` | Static assets (images, PDFs) |

**Other docs:** `README.md` (full content-configuration reference), `docs/cv.md` (CV page schema), `docs/deployment.md` (hosting), `TODO.md` (feature roadmap with implementation specs), `CHANGELOG.md` (release history).

## Rules & Conventions

1. **Static export.** `next.config.ts` uses `output: 'export'` with `trailingSlash: true` and unoptimized images. No API routes, server actions, server-side rendering features, or other functionality incompatible with static export.
2. **i18n is dual-language.** Every new UI string needs both an English and a German entry in `src/lib/i18n/messages.ts`. Localized content files must keep the same filenames across `content/` and `content_<locale>/` (missing files fall back to the default locale). The `[legal]` section is always sourced from the default `content/config.toml`.
3. **Content vs. code.** User-visible content belongs in `content/` (and `content_<locale>/`) files — never hardcoded in components. When changing content structure, update both locales and document the schema in `README.md` (and `docs/cv.md` for CV changes).
4. **Never edit generated artifacts.** `out/`, `.next/`, `data/openalex-metrics.json`, and `tsconfig.tsbuildinfo` are build outputs or committed fallback data — do not hand-edit them.
5. **Offline-first data fetching.** Any new data fetching must follow the `scripts/fetch-metrics.mjs` pattern: fetch at build time, commit a fallback so fresh clones and offline builds always work, and degrade gracefully.
6. **Docs discipline.** User-facing behavior changes get an entry in the `Unreleased` section of `CHANGELOG.md`. Pick up planned feature work from `TODO.md`, which contains implementation specs; follow them and check items off as you complete them.
7. **Styling.** Use Tailwind CSS 4 utilities and the existing design tokens (theme colors) in `src/app/globals.css`; follow the component patterns already present in `src/components/`.
8. **Git discipline.** Never commit, push, or run other state-changing git commands on your own. Make the requested changes, then stop and report what was done; staging (`git add`), committing, and pushing only happen when the user explicitly asks for it. Commit messages follow Conventional Commits: a type prefix (`feat:`, `fix:`, `docs:`, `refactor:`, `style:`, `chore:`) followed by a capitalized imperative summary without a trailing period, e.g. `feat: Add sitemap.xml and robots.txt generation`.
