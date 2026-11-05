import type { Publication } from '@/types/publication';

export interface BasePageConfig {
    type: 'about' | 'publication' | 'card' | 'text' | 'cv' | 'sections';
    title: string;
    description?: string;
}

export interface PublicationPageConfig extends BasePageConfig {
    type: 'publication';
    source: string;
}

export interface TextPageConfig extends BasePageConfig {
    type: 'text';
    source: string;
}

export interface CardItem {
    title: string;
    subtitle?: string;
    date?: string;
    content?: string;
    tags?: string[];
    link?: string;
    image?: string;
    imageAlt?: string;
}

export interface CardPageConfig extends BasePageConfig {
    type: 'card';
    items: CardItem[];
}

export interface HighlightItem {
    title: string;
    content?: string;
    color?: string;
}

/** News/list entry rendered by `list` sections (source TOML files). */
export interface NewsItem {
    date: string;
    content: string;
}

/**
 * A single section of a sectioned page. Mirrors the homepage `[[sections]]`
 * blocks (`content/about.toml`) so both share one composition model.
 */
export interface SectionConfig {
    id: string;
    type: 'markdown' | 'publications' | 'list' | 'highlight' | 'card';
    title?: string;
    /** Markdown section: hero statement extracted from a leading heading. */
    hero?: string;
    /** Markdown/list section: file to load content/items from. */
    source?: string;
    /** Publications section: 'selected' filters for `selected = true` entries. */
    filter?: string;
    /** Publications/list sections: maximum number of entries to show; omit to show all. */
    limit?: number;
    /** Markdown section: resolved content (set by processSections). */
    content?: string;
    /** Publications section: resolved entries (set by processSections). */
    publications?: Publication[];
    /** Highlight, list, and card sections: inline items. */
    items?: NewsItem[] | HighlightItem[] | CardItem[];
    /** Highlight section: theme token or raw CSS color. */
    color?: string;
    /** Highlight section: cards per row (1–4). */
    columns?: number;
}

/**
 * Page composed of `[[sections]]` blocks — the homepage's composition model
 * (markdown, highlight, publications, list, card) on its own route.
 */
export interface SectionsPageConfig extends BasePageConfig {
    type: 'sections';
    sections: SectionConfig[];
}
