'use client';

import { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { cn } from '@/lib/utils';
import { formatPeriod, sortCvEntriesDesc } from '@/lib/cv';
import { useMessages } from '@/lib/i18n/useMessages';
import type { CvAppointment } from '@/types/cv';
import CvSection, { CvBulletList, CvDetailGroup, CvLinkList, CvPeriodPill, CvReferenceList } from './CvSection';

function AppointmentItem({ item, index, isLast }: { item: CvAppointment; index: number; isLast: boolean }) {
  const [expanded, setExpanded] = useState(false);
  const messages = useMessages();

  const hasDetails = Boolean(
    item.responsibilities?.length ||
    item.contributions?.length ||
    item.achievements?.length ||
    item.publications?.length ||
    item.links?.length
  );

  const detailsId = `cv-appointment-${index}-details`;
  const isCurrent = !item.end;
  const period = formatPeriod(item.start, item.end, messages.cv.present);
  const affiliation = [item.institution, item.department].filter(Boolean).join(' · ');
  const context = [item.location, item.employment_type].filter(Boolean).join(' · ');

  return (
    <li className="cv-entry relative pl-8 pb-10 last:pb-0">
      {!isLast && (
        <span className="absolute bottom-0 left-[7px] top-4 w-px bg-neutral-200" aria-hidden="true" />
      )}
      <span
        className={cn(
          'absolute left-0 top-1.5 h-[15px] w-[15px] rounded-full border-2 border-accent',
          isCurrent ? 'bg-accent' : 'bg-background'
        )}
        aria-hidden="true"
      />

      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className="text-lg font-serif font-semibold text-primary">{item.title}</h3>
        {period && <CvPeriodPill>{period}</CvPeriodPill>}
      </div>

      {affiliation && <p className="mt-1 max-w-3xl text-sm font-medium text-accent-text">{affiliation}</p>}
      {context && <p className="mt-0.5 max-w-3xl text-xs text-neutral-500">{context}</p>}

      {item.summary && (
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-neutral-600 dark:text-neutral-500">{item.summary}</p>
      )}

      {hasDetails && (
        <>
          <button
            type="button"
            onClick={() => setExpanded((value) => !value)}
            aria-expanded={expanded}
            aria-controls={detailsId}
            className="print:hidden mt-3 inline-flex items-center gap-1 rounded-md px-1.5 py-1 text-xs font-semibold text-accent-text transition-colors hover:bg-accent/10"
          >
            {expanded ? messages.cv.hideDetails : messages.cv.showDetails}
            <ChevronDownIcon className={cn('h-3.5 w-3.5 transition-transform', expanded && 'rotate-180')} aria-hidden="true" />
          </button>

          <div id={detailsId} className={cn('cv-details', !expanded && 'hidden')}>
            <div className="mt-3 max-w-3xl space-y-4 border-l-2 border-neutral-200 pl-4">
              {item.responsibilities && item.responsibilities.length > 0 && (
                <CvDetailGroup label={messages.cv.responsibilities}>
                  <CvBulletList items={item.responsibilities} />
                </CvDetailGroup>
              )}
              {item.contributions && item.contributions.length > 0 && (
                <CvDetailGroup label={messages.cv.selectedContributions}>
                  <CvBulletList items={item.contributions} />
                </CvDetailGroup>
              )}
              {item.achievements && item.achievements.length > 0 && (
                <CvDetailGroup label={messages.cv.selectedAchievements}>
                  <CvBulletList items={item.achievements} />
                </CvDetailGroup>
              )}
              {item.publications && item.publications.length > 0 && (
                <CvDetailGroup label={messages.cv.relatedPublications}>
                  <CvReferenceList items={item.publications} />
                </CvDetailGroup>
              )}
              {item.links && item.links.length > 0 && <CvLinkList links={item.links} />}
            </div>
          </div>
        </>
      )}
    </li>
  );
}

interface CvTimelineProps {
  title: string;
  appointments: CvAppointment[];
}

/** Academic appointments and professional experience as a vertical timeline. */
export default function CvTimeline({ title, appointments }: CvTimelineProps) {
  const sorted = sortCvEntriesDesc(appointments);

  return (
    <CvSection id="cv-experience" title={title}>
      <ol>
        {sorted.map((item, index) => (
          <AppointmentItem key={`${item.title}-${index}`} item={item} index={index} isLast={index === sorted.length - 1} />
        ))}
      </ol>
    </CvSection>
  );
}
