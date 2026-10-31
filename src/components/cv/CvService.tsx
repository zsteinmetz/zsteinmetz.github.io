'use client';

import type { CvService as CvServiceData } from '@/types/cv';
import CvSection, { CvPeriodPill } from './CvSection';

function ServiceItem({ item }: { item: CvServiceData }) {
  return (
    <li className="cv-entry print:break-inside-avoid">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h4 className="text-base font-semibold text-primary">{item.title}</h4>
        {item.period && <CvPeriodPill>{item.period}</CvPeriodPill>}
      </div>
      {item.organization && <p className="mt-0.5 text-sm font-medium text-accent-text">{item.organization}</p>}
      {item.description && (
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-neutral-600 dark:text-neutral-500">{item.description}</p>
      )}
    </li>
  );
}

interface CvServiceProps {
  title: string;
  service: CvServiceData[];
}

/** Academic service and community contributions, grouped by category. */
export default function CvService({ title, service }: CvServiceProps) {
  const categories: string[] = [];
  for (const item of service) {
    const category = item.category || 'Community';
    if (!categories.includes(category)) categories.push(category);
  }

  return (
    <CvSection id="cv-service" title={title}>
      {categories.map((category) => (
        <div key={category} className="mb-8 last:mb-0">
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-accent-text">{category}</h3>
          <ul className="max-w-3xl space-y-6">
            {service
              .filter((item) => (item.category || 'Community') === category)
              .map((item, index) => (
                <ServiceItem key={`${item.title}-${index}`} item={item} />
              ))}
          </ul>
        </div>
      ))}
    </CvSection>
  );
}
