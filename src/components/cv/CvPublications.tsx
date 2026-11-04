'use client';

import { useState } from 'react';
import FormattedBibTeXText from '@/components/publications/FormattedBibTeXText';
import { cvDateKey } from '@/lib/cv';
import type { Publication } from '@/types/publication';
import ReactMarkdown from 'react-markdown';
import { markdownComponents } from '@/components/ui/MarkdownComponents';
import CvSection from './CvSection';

const TYPE_LABELS: Record<string, string> = {
  journal: 'Journal Articles',
  conference: 'Conference Papers',
  workshop: 'Workshop Papers',
  book: 'Books',
  'book-chapter': 'Book Chapters',
  thesis: 'Theses',
  preprint: 'Preprints & Working Papers',
  'technical-report': 'Reports & Technical Outputs',
  patent: 'Patents',
};

function PublicationItem({ publication, number, showAbstracts }: { publication: Publication; number: number; showAbstracts: boolean }) {
  const [showAbstract, setShowAbstract] = useState(false);
  const venue = publication.journal || publication.conference;

  return (
    <li className="cv-entry print:break-inside-avoid">
      <p className="max-w-3xl text-sm leading-relaxed text-neutral-600 dark:text-neutral-500">
        <span className="mr-1.5 tabular-nums text-neutral-400">[{number}]</span>
        {publication.authors.map((author, index) => (
          <span key={`${author.name}-${index}`}>
            {index > 0 && ', '}
            <span className={author.isHighlighted ? 'font-semibold text-primary' : undefined}>
              {author.name}
            </span>
            {author.isCorresponding && '*'}
          </span>
        ))}{' '}
        <span className="text-neutral-400">·</span> {publication.year}.{' '}
        <span className="font-medium text-primary">
          <FormattedBibTeXText nodes={publication.titleNodes} fallback={publication.title} />.
        </span>
        {venue && <em> {venue}.</em>}
        {publication.volume && `, ${publication.volume}`}
        {publication.issue && `(${publication.issue})`}
        {publication.pages && `, ${publication.pages}`}
      </p>

      <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
        {publication.doi && (
          <a
            href={`https://doi.org/${publication.doi}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded px-1 py-0.5 font-medium text-accent-text transition-colors hover:bg-accent/10"
          >
            doi:{publication.doi}
          </a>
        )}
        {publication.url && (
          <a
            href={publication.url}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded px-1 py-0.5 font-medium text-accent-text transition-colors hover:bg-accent/10"
          >
            Publisher link
          </a>
        )}
        {publication.code && (
          <a
            href={publication.code}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded px-1 py-0.5 font-medium text-accent-text transition-colors hover:bg-accent/10"
          >
            Code
          </a>
        )}
        {typeof publication.citations === 'number' && (
          <span className="text-neutral-400">Cited by {publication.citations}</span>
        )}
        {showAbstracts && publication.abstract && (
          <button
            type="button"
            onClick={() => setShowAbstract((value) => !value)}
            aria-expanded={showAbstract}
            className="print:hidden rounded px-1 py-0.5 font-medium text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-primary"
          >
            {showAbstract ? 'Hide abstract' : 'Abstract'}
          </button>
        )}
      </div>

      {showAbstracts && publication.abstract && showAbstract && (
        <div className="cv-details mt-2 max-w-3xl rounded-lg border border-neutral-200 bg-neutral-100 p-3">
          <p className="text-xs leading-relaxed text-neutral-600 dark:text-neutral-500">{publication.abstract}</p>
        </div>
      )}
    </li>
  );
}

interface CvPublicationsProps {
  title: string;
  publications: Publication[];
  featuredLimit?: number;
  showAbstracts?: boolean;
  showComplete?: boolean;
  note?: string;
}

/** Featured publications, optionally followed by a complete bibliography grouped by type. */
export default function CvPublications({ title, publications, featuredLimit = 3, showAbstracts = true, showComplete = true, note }: CvPublicationsProps) {
  const sorted = [...publications].sort((a, b) => cvDateKey({ period: String(b.year) }) - cvDateKey({ period: String(a.year) }));
  const featured = sorted.filter((pub) => pub.selected || pub.featured).slice(0, featuredLimit);

  const types = Array.from(new Set(sorted.map((pub) => pub.type)));
  const groups = types
    .map((type) => ({
      type,
      label: TYPE_LABELS[type] || 'Other Outputs',
      items: sorted.filter((pub) => pub.type === type),
    }));

  let counter = 0;

  return (
    <CvSection id="cv-publications" title={title}>
      {note && (
        <div className="mb-6 max-w-2xl text-sm leading-relaxed text-neutral-600 dark:text-neutral-500">
          <ReactMarkdown components={markdownComponents}>{note}</ReactMarkdown>
        </div>
      )}

      {featured.length > 0 && (
        <div className="mb-10">
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-accent-text">Featured Publications</h3>
          <ol className="space-y-5">
            {featured.map((publication) => {
              counter += 1;
              return (
                <PublicationItem
                  key={publication.id}
                  publication={publication}
                  number={counter}
                  showAbstracts={showAbstracts}
                />
              );
            })}
          </ol>
        </div>
      )}

      {showComplete && (
        <div>
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-accent-text">Complete Bibliography</h3>
          {groups.map((group) => (
            <div key={group.type} className="mb-6 last:mb-0">
              <h4 className="mb-3 border-b border-neutral-200 pb-1.5 text-xs font-semibold uppercase tracking-wider text-neutral-500">
                {group.label}
              </h4>
              <ol className="space-y-4">
                {group.items.map((publication) => {
                  counter += 1;
                  return (
                    <PublicationItem
                      key={publication.id}
                      publication={publication}
                      number={counter}
                      showAbstracts={showAbstracts}
                    />
                  );
                })}
              </ol>
            </div>
          ))}
        </div>
      )}
    </CvSection>
  );
}
