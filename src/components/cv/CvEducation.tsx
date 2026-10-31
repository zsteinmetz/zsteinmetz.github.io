'use client';

import { formatPeriod, sortCvEntriesDesc } from '@/lib/cv';
import type { CvEducation as CvEducationData } from '@/types/cv';
import CvSection, { CvDetailGroup, CvPeriodPill } from './CvSection';

function EducationItem({ item, isLast }: { item: CvEducationData; isLast: boolean }) {
  const period = formatPeriod(item.start, item.end);
  const affiliation = [item.university, item.department].filter(Boolean).join(' · ');

  return (
    <li className="cv-entry relative pl-8 pb-10 last:pb-0">
      {!isLast && (
        <span className="absolute bottom-0 left-[7px] top-4 w-px bg-neutral-200" aria-hidden="true" />
      )}
      <span
        className="absolute left-0 top-1.5 h-[15px] w-[15px] rounded-full border-2 border-accent bg-background"
        aria-hidden="true"
      />

      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className="text-lg font-serif font-semibold text-primary">{item.degree}</h3>
        {period && <CvPeriodPill>{period}</CvPeriodPill>}
      </div>

      {affiliation && <p className="mt-1 text-sm font-medium text-accent-text">{affiliation}</p>}

      {item.thesis && (
        <div className="mt-3">
          <CvDetailGroup label="Thesis">
            <p className="text-sm italic leading-relaxed text-neutral-600 dark:text-neutral-500">{item.thesis}</p>
          </CvDetailGroup>
        </div>
      )}

      {item.supervisors && item.supervisors.length > 0 && (
        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-500">
          <span className="font-medium text-primary">Supervised by </span>
          {item.supervisors.join(', ')}
        </p>
      )}

      {item.description && (
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-neutral-600 dark:text-neutral-500">{item.description}</p>
      )}

      {item.distinctions && item.distinctions.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {item.distinctions.map((distinction) => (
            <span
              key={distinction}
              className="rounded-full bg-accent/10 px-2.5 py-1 text-xs font-medium text-accent-text"
            >
              {distinction}
            </span>
          ))}
        </div>
      )}
    </li>
  );
}

interface CvEducationProps {
  title: string;
  education: CvEducationData[];
}

/** Educational qualifications, visually connected to the appointments timeline. */
export default function CvEducation({ title, education }: CvEducationProps) {
  const sorted = sortCvEntriesDesc(education);

  return (
    <CvSection id="cv-education" title={title}>
      <ol className="max-w-3xl">
        {sorted.map((item, index) => (
          <EducationItem key={`${item.degree}-${index}`} item={item} isLast={index === sorted.length - 1} />
        ))}
      </ol>
    </CvSection>
  );
}
