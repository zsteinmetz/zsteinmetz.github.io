'use client';

import ReactMarkdown from 'react-markdown';
import { markdownComponents } from '@/components/ui/MarkdownComponents';
import type { CvGrant } from '@/types/cv';
import CvSection, { CvPeriodPill } from './CvSection';

function GrantItem({ grant }: { grant: CvGrant }) {
  const detail = [grant.institution, grant.amount].filter(Boolean).join(' · ');

  return (
    <li className="cv-entry border-l-2 border-accent/40 py-1 pl-4 print:break-inside-avoid">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h4 className="text-base font-semibold text-primary">{grant.title}</h4>
        {grant.period && <CvPeriodPill>{grant.period}</CvPeriodPill>}
      </div>
      {detail && <p className="mt-0.5 max-w-3xl text-sm font-medium text-accent-text">{detail}</p>}
      {grant.role && <p className="mt-0.5 max-w-3xl text-xs text-neutral-500">{grant.role}</p>}
      {grant.description && (
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-neutral-600 dark:text-neutral-500">{grant.description}</p>
      )}
    </li>
  );
}

interface CvGrantsProps {
  title: string;
  overview?: string;
  fundingHeading: string;
  awardsHeading: string;
  grants: CvGrant[];
}

/** Research funding (grants, fellowships, scholarships) and academic recognition. */
export default function CvGrants({ title, overview, fundingHeading, awardsHeading, grants }: CvGrantsProps) {
  const funding = grants.filter((grant) => (grant.kind || 'funding') === 'funding');
  const awards = grants.filter((grant) => grant.kind === 'award');

  return (
    <CvSection id="cv-grants" title={title}>
      {overview && (
        <div className="mb-8 max-w-3xl leading-relaxed text-neutral-700 dark:text-neutral-600">
          <ReactMarkdown components={markdownComponents}>{overview}</ReactMarkdown>
        </div>
      )}
      {funding.length > 0 && (
        <div className="mb-8 last:mb-0">
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-accent-text">{fundingHeading}</h3>
          <ul className="space-y-5">
            {funding.map((grant, index) => (
              <GrantItem key={`${grant.title}-${index}`} grant={grant} />
            ))}
          </ul>
        </div>
      )}

      {awards.length > 0 && (
        <div className={funding.length > 0 ? 'mt-8' : ''}>
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-accent-text">{awardsHeading}</h3>
          <ul className="space-y-5">
            {awards.map((grant, index) => (
              <GrantItem key={`${grant.title}-${index}`} grant={grant} />
            ))}
          </ul>
        </div>
      )}
    </CvSection>
  );
}
