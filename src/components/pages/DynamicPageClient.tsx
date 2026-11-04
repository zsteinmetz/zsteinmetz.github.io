'use client';

import PublicationsList from '@/components/publications/PublicationsList';
import CvPage from '@/components/cv/CvPage';
import type { PublicationMetricsSummary } from '@/lib/metrics';
import TextPage from '@/components/pages/TextPage';
import CardPage from '@/components/pages/CardPage';
import SectionsPage from '@/components/pages/SectionsPage';
import { Publication } from '@/types/publication';
import {
  PublicationPageConfig,
  TextPageConfig,
  CardPageConfig,
  SectionsPageConfig,
  SectionConfig,
} from '@/types/page';
import { CvPageConfig } from '@/types/cv';
import { useLocaleStore } from '@/lib/stores/localeStore';

export type DynamicPageLocaleData =
  | { type: 'publication'; config: PublicationPageConfig; publications: Publication[]; metrics?: PublicationMetricsSummary }
  | { type: 'text'; config: TextPageConfig; content: string }
  | { type: 'card'; config: CardPageConfig }
  | { type: 'sections'; config: SectionsPageConfig; sections: SectionConfig[] }
  | { type: 'cv'; config: CvPageConfig; publications: Publication[] };

interface DynamicPageClientProps {
  dataByLocale: Record<string, DynamicPageLocaleData>;
  defaultLocale: string;
}

export default function DynamicPageClient({ dataByLocale, defaultLocale }: DynamicPageClientProps) {
  const locale = useLocaleStore((state) => state.locale);
  const fallback = dataByLocale[defaultLocale] || Object.values(dataByLocale)[0];
  const pageData = dataByLocale[locale] || fallback;

  if (!pageData) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {pageData.type === 'publication' && (
        <PublicationsList config={pageData.config} publications={pageData.publications} metrics={pageData.metrics} />
      )}
      {pageData.type === 'text' && (
        <TextPage config={pageData.config} content={pageData.content} />
      )}
      {pageData.type === 'card' && (
        <CardPage config={pageData.config} />
      )}
      {pageData.type === 'sections' && (
        <SectionsPage config={pageData.config} sections={pageData.sections} />
      )}
      {pageData.type === 'cv' && (
        <CvPage config={pageData.config} publications={pageData.publications} />
      )}
    </div>
  );
}
