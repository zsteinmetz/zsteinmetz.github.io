# Academic CV (`/cv`)

PRISM's CV page is a **narrative academic portfolio** rather than a plain
chronological list. A reader should be able to understand the trajectory of the
career, the development of research interests, individual contributions to
research, the significance of projects and publications, contributions to
teaching and academic communities, and the broader impact of the work.

## How it works

The CV is a dedicated page type (`type = "cv"`) configured entirely in
`content/cv.toml` — one file containing the page config and all CV data. If the
`cv` target is present in the `navigation` list of `content/config.toml` (it is
by default), the page is served at `/cv`.

Rendering and the content schema are defined in:

- `src/types/cv.ts` — the TypeScript schema
- `src/components/cv/` — the page components (timeline, project cards, section nav, ...)
- `src/lib/cv.ts` — merge and sort helpers
- `src/app/[slug]/page.tsx` — the loader branch (parses publications via the existing BibTeX pipeline)

## Sections

Sections are rendered in a fixed order and only when their data exists:

1. **Academic profile** (`[profile]`) — narrative introduction, research interests, links
2. **Appointments & experience** (`[[appointments]]`) — expandable vertical timeline
3. **Education** (`[[education]]`) — degrees, theses, supervisors, distinctions
4. **Research contributions & projects** (`[[projects]]`) — portfolio cards with narrative detail
5. **Publications** (`[publications]`) — featured subset + complete bibliography, reusing `content/publications.bib`
6. **Teaching & supervision** (`[[teaching]]` + optional `teaching_overview`)
7. **Grants, awards & recognition** (`[[grants]]`)
8. **Academic service & community** (`[[service]]`)
9. **Skills & expertise** (`[[skills]]`) — described, never rated

Section headings are configured in the `[headings]` table and can be translated
per locale (see below).

## Schema reference

All fields are optional unless marked **required**. Arrays of tables are used
for repeated entries (`[[appointments]]`, `[[education]]`, ...).

### Page-level keys

| Key | Type | Description |
| --- | --- | --- |
| `type` | string (**required**) | Must be `"cv"`. |
| `title` | string (**required**) | Page title (and h1). |
| `description` | string | Short description under the title. |
| `teaching_overview` | string (markdown) | Optional teaching philosophy statement shown above the teaching entries. |
| `[headings]` | table | Overrides for any section heading: `profile`, `experience`, `education`, `research`, `publications`, `teaching`, `grants`, `grants_funding`, `grants_awards`, `service`, `skills`. |

### `[profile]`

| Key | Type | Description |
| --- | --- | --- |
| `narrative` | string (markdown) | Multi-paragraph academic narrative. Use `"""..."""` for multiline strings. |
| `interests` | string[] | Rendered as restrained pills. |
| `[[profile.links]]` | `{ label, url }` | Institutional profile, ORCID, Google Scholar, GitHub, LinkedIn, ... |

### `[[appointments]]`

| Key | Type | Description |
| --- | --- | --- |
| `title` | string (**required**) | Position / job title. |
| `institution`, `department`, `location` | string | Affiliation details. |
| `start`, `end` | string | Display dates, e.g. `"Sep 2025"`; empty `end` = current position. |
| `employment_type` | string | Optional, e.g. `"Part-time"`, `"Internship"`. |
| `sort_date` | string | `YYYY` or `YYYY-MM`; controls chronological sorting (newest first). Falls back to `start`/`end`. |
| `summary` | string | Short introductory description (always visible). |
| `responsibilities` | string[] | Responsibilities and activities. |
| `contributions` | string[] | Personal contributions. |
| `achievements` | string[] | Selected achievements and outcomes. |
| `publications` | string[] | Related publications / projects (free text). |
| `[[appointments.links]]` | `{ label, url }` | Institutional or project links. |

Everything after `summary` is collapsed behind a keyboard-operable
"Show details" toggle on screen and always printed in full.

### `[[education]]`

| Key | Type | Description |
| --- | --- | --- |
| `degree` | string (**required**) | Degree name. |
| `university`, `department` | string | Institution details. |
| `start`, `end`, `sort_date` | string | As above. |
| `thesis` | string | Thesis title / research topic. |
| `supervisors` | string[] | Supervisor names. |
| `distinctions` | string[] | Academic distinctions (rendered as badges). |
| `description` | string | Short description of the research undertaken. |

### `[[projects]]`

| Key | Type | Description |
| --- | --- | --- |
| `title` | string (**required**) | Project title. |
| `period` | string | Display period. |
| `featured` | boolean | Adds a "Featured" badge. |
| `question` | string | Research question / motivation (shown as a quote). |
| `background` | string | Background and context (in the expandable detail). |
| `role` | string | Individual role and responsibilities. |
| `methods` | string[] | Methods and approaches (rendered as tags). |
| `contributions` | string[] | Main contributions. |
| `outcomes` | string | Outcomes and impact. |
| `collaborators` | string[] | Collaborators and institutions. |
| `funding` | string | Funding information. |
| `publications` | string[] | Related publications. |
| `image` | string | Optional image path (e.g. `/preview.png` in `public/`). |
| `[[projects.links]]` | `{ label, url }` | Project website or external resources. |

### `[publications]`

The publications section **reuses the existing BibTeX pipeline** — do not
duplicate publication data here.

| Key | Type | Description |
| --- | --- | --- |
| `source` | string | BibTeX file in `content/`, e.g. `"publications.bib"`. |
| `featured_limit` | number | Max number of featured publications (entries with `selected = true` in the .bib file). Default `3`. |
| `show_abstracts` | boolean | Allow per-publication abstract toggles. Default `true`. |
| `note` | string (markdown) | e.g. a link to the full `/publications` page. |

The complete bibliography is grouped by publication type (journal articles,
conference papers, books, book chapters, preprints, reports, ...) and sorted by
year. Citation counts come from the OpenAlex metrics pipeline when available.

### `[[teaching]]`

| Key | Type | Description |
| --- | --- | --- |
| `course` | string (**required**) | Course, seminar, thesis or mentoring activity. |
| `category` | string | `"Teaching"`, `"Supervision"` or `"Mentoring"` (default `"Teaching"`). Entries are grouped by category in that order. |
| `institution`, `level`, `period`, `role` | string | Context fields. |
| `description` | string | Course description / responsibilities. |
| `methods` | string[] | Teaching methods (rendered as tags). |

### `[[grants]]`

| Key | Type | Description |
| --- | --- | --- |
| `title` | string (**required**) | Grant, fellowship, scholarship or award. |
| `kind` | string | `"funding"` (default) or `"award"` — controls which subsection it appears in. |
| `institution`, `period` | string | Granting institution and funding period. |
| `amount` | string | Optional funding amount. |
| `role` | string | e.g. `"Principal investigator"`, `"Fellow"`. |
| `description` | string | Short description and relevance. |

### `[[service]]`

| Key | Type | Description |
| --- | --- | --- |
| `title` | string (**required**) | Activity, e.g. reviewing, committee work, outreach. |
| `organization` | string | Venue / organization. |
| `period` | string | Period. |
| `category` | string | e.g. `"Peer Review"`, `"Committees"`, `"Outreach"` (default `"Community"`). |
| `description` | string | The actual contribution. |

### `[[skills]]`

```toml
[[skills]]
category = "Research Methodologies"   # required

[[skills.items]]
name = "Numerical analysis"            # required
description = "Stability and convergence analysis of time integrators."
```

Skills are organized into meaningful categories with clear descriptions of
expertise and practical application — **no skill-rating bars or percentage
scores**.

## Adding, editing and removing entries

- **Add** a new entry by appending an `[[appointments]]`, `[[education]]`,
  `[[projects]]`, `[[teaching]]`, `[[grants]]`, `[[service]]` or `[[skills]]`
  block to `content/cv.toml`. Only the title/degree/course/name field is
  required per entry.
- **Sort** appointments and education entries chronologically using
  `sort_date` (`YYYY` or `YYYY-MM`); both are sorted newest-first automatically.
- **Remove** an entry by deleting its block. Sections disappear entirely when
  their data is removed.
- **Featured** projects/publications: set `featured = true` on a project, or
  `selected = true` on a BibTeX entry for the featured publications subsection.
- Restart the dev server or rebuild (`npm run build`) after editing — content
  is read at build time.

## Adding publications and research projects

- **Publications**: export from Google Scholar, Zotero or Mendeley into
  `content/publications.bib`. The CV publications section and the
  `/publications` page share this single source of truth. Use the `selected`
  field to curate the featured subsection.
- **Research projects**: add a `[[projects]]` block. Describe the research
  question, your individual role, methods, main contributions and outcomes
  narratively — the goal is to demonstrate substance and significance, not to
  enumerate project names. Link related publications from the .bib file by
  title in the `publications` list.

## Localization (i18n)

Localized CVs live in `content_<locale>/cv.toml` (e.g. `content_de/cv.toml`).
They only need to override what changes — typically `title`, `description` and
the `[headings]` table; all entries fall back to the default `content/cv.toml`
version. Arrays (CV entries) in a localized file replace the default ones
entirely, so a fully translated CV can also be provided.

## Print / PDF export

The CV page includes a **Print / PDF** button that opens the browser's print
dialog (the browser's "Save as PDF" produces the document). The print
stylesheet (`src/app/globals.css`, `@media print`):

- removes the navigation, footer, section index and toggle buttons,
- expands all collapsed appointment/project details,
- forces the light palette and removes shadows,
- keeps individual entries intact across page breaks (break-inside: avoid),
- preserves hyperlinks.

## Example content

The shipped `content/cv.toml` contains **illustrative placeholder content** in
the same fictional style as the rest of the PRISM demo ("University of
Example", "Prof. Advisor One"). Replace it with your own record.
