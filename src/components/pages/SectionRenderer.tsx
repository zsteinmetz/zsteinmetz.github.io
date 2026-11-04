'use client';

import Hero from '@/components/home/Hero';
import About from '@/components/home/About';
import News, { type NewsItem } from '@/components/home/News';
import Highlights from '@/components/home/Highlights';
import SelectedPublications from '@/components/home/SelectedPublications';
import CardGrid from '@/components/pages/CardGrid';
import type { SectionConfig, HighlightItem, CardItem } from '@/types/page';

interface SectionRendererProps {
    section: SectionConfig;
    /** Only used by `publications` sections: the "View All" link target mode. */
    enableOnePageMode?: boolean;
    /** Tighter card spacing for embedded (one-page mode / homepage) rendering. */
    embedded?: boolean;
}

/**
 * Renders a single section block (`markdown`, `highlight`, `publications`,
 * `list`, or `card`). Shared by the homepage (and one-page mode) and
 * `sections`-type pages so both use one composition model.
 */
export default function SectionRenderer({ section, enableOnePageMode = false, embedded = false }: SectionRendererProps) {
    switch (section.type) {
        case 'markdown':
            return section.hero ? (
                <Hero hero={section.hero} content={section.content || ''} />
            ) : (
                <About content={section.content || ''} title={section.title} />
            );
        case 'publications':
            return (
                <SelectedPublications
                    publications={section.publications || []}
                    title={section.title}
                    enableOnePageMode={enableOnePageMode}
                />
            );
        case 'list':
            return (
                <News items={(section.items as NewsItem[]) || []} title={section.title} />
            );
        case 'highlight':
            return (
                <Highlights
                    items={(section.items as HighlightItem[]) || []}
                    title={section.title}
                    color={section.color}
                    columns={section.columns}
                />
            );
        case 'card':
            return (
                <div>
                    {section.title && (
                        <h2 className="text-2xl font-serif font-bold text-primary mb-4">{section.title}</h2>
                    )}
                    <CardGrid items={(section.items as CardItem[]) || []} embedded={embedded} />
                </div>
            );
        default:
            return null;
    }
}