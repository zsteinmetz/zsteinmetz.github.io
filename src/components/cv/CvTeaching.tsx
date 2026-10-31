'use client';

import ReactMarkdown from 'react-markdown';
import { markdownComponents } from '@/components/ui/MarkdownComponents';
import type { CvTeaching as CvTeachingData } from '@/types/cv';
import CvSection, { CvDetailGroup, CvPeriodPill } from './CvSection';

const CATEGORY_ORDER = ['Teaching', 'Supervision', 'Mentoring'];

function TeachingItem({ item }: { item: CvTeachingData }) {
  const affiliation = [item.institution, item.level].filter(Boolean).join(' · ');

  return (
    <li className="cv-entry print:break-inside-avoid">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h4 className="text-base font-semibold text-primary">{item.course}</h4>
        {item.period && <CvPeriodPill>{item.period}</CvPeriodPill>}
      </div>
      {affiliation && <p className="mt-0.5 text-sm font-medium text-accent-text">{affiliation}</p>}
      {item.role && <p className="mt-0.5 text-xs text-neutral-500">{item.role}</p>}
      {item.description && (
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-neutral-600 dark:text-neutral-500">{item.description}</p>
      )}
      {item.methods && item.methods.length > 0 && (
        <div className="mt-3">
          <CvDetailGroup label="Methods">
            <ul className="flex flex-wrap gap-2">
              {item.methods.map((method) => (
                <li
                  key={method}
                  className="rounded-full border border-neutral-200 px-2.5 py-1 text-xs font-medium text-neutral-600 dark:text-neutral-500"
                >
                  {method}
                </li>
              ))}
            </ul>
          </CvDetailGroup>
        </div>
      )}
    </li>
  );
}

interface CvTeachingProps {
  title: string;
  overview?: string;
  teaching: CvTeachingData[];
}

/** Teaching, thesis supervision and mentoring as substantive contributions. */
export default function CvTeaching({ title, overview, teaching }: CvTeachingProps) {
  const categories: string[] = [];
  for (const item of teaching) {
    const category = item.category || 'Teaching';
    if (!categories.includes(category)) categories.push(category);
  }
  categories.sort((a, b) => {
    const indexA = CATEGORY_ORDER.indexOf(a);
    const indexB = CATEGORY_ORDER.indexOf(b);
    return (indexA === -1 ? CATEGORY_ORDER.length : indexA) - (indexB === -1 ? CATEGORY_ORDER.length : indexB);
  });

  return (
    <CvSection id="cv-teaching" title={title}>
      {overview && (
        <div className="mb-8 max-w-3xl leading-relaxed text-neutral-700 dark:text-neutral-600">
          <ReactMarkdown components={markdownComponents}>{overview}</ReactMarkdown>
        </div>
      )}

      {categories.map((category) => (
        <div key={category} className="mb-8 last:mb-0">
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-accent-text">{category}</h3>
          <ul className="max-w-3xl space-y-6">
            {teaching
              .filter((item) => (item.category || 'Teaching') === category)
              .map((item, index) => (
                <TeachingItem key={`${item.course}-${index}`} item={item} />
              ))}
          </ul>
        </div>
      ))}
    </CvSection>
  );
}
