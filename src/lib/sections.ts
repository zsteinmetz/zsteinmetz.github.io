import { getMarkdownContent, getBibtexContent, getTomlContent } from './content';
import { parseBibTeX } from './bibtexParser';
import type { SectionConfig, NewsItem } from '@/types/page';

// Split a leading markdown heading off the content as the hero statement.
// Returns the body unchanged when the content does not start with a heading.
export function extractHero(content: string): { hero?: string; body: string } {
  const match = content.match(/^\s*#{1,6}\s+(.+?)\s*(?:\r?\n|$)/);
  if (!match) {
    return { body: content };
  }
  return { hero: match[1].trim(), body: content.slice(match[0].length).trim() };
}

/**
 * Resolves a page's `[[sections]]` blocks: loads markdown sources (extracting
 * a leading heading as the hero statement), filters/limits publications, and
 * loads list/news sources. `highlight` and `card` sections pass through with
 * their inline items. Used by the homepage and `sections`-type pages.
 */
export function processSections(sections: SectionConfig[], locale?: string): SectionConfig[] {
  return sections.map((section: SectionConfig) => {
    switch (section.type) {
      case 'markdown': {
        const content = section.source ? getMarkdownContent(section.source, locale) : '';
        const { hero, body } = extractHero(content);
        return {
          ...section,
          content: body,
          hero,
        };
      }
      case 'publications': {
        const bibtex = getBibtexContent('publications.bib', locale);
        const allPubs = parseBibTeX(bibtex, locale);
        const filteredPubs = section.filter === 'selected'
          ? allPubs.filter((p) => p.selected)
          : allPubs;
        return {
          ...section,
          publications: filteredPubs.slice(0, section.limit || 5),
        };
      }
      case 'list': {
        const newsData = section.source ? getTomlContent<{ news: NewsItem[] }>(section.source, locale) : null;
        return {
          ...section,
          items: (newsData?.news || []).slice(0, section.limit),
        };
      }
      default:
        return section;
    }
  });
}