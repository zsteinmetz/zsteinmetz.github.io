'use client';

import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import type { CvLink } from '@/types/cv';

interface CvSectionProps {
  id: string;
  title: string;
  description?: string;
  children: ReactNode;
}

/** Shared CV section wrapper: anchor target, serif heading and a subtle gold rule. */
export default function CvSection({ id, title, description, children }: CvSectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="cv-section mt-12 border-t border-neutral-200 pt-10 first:mt-8 first:border-t-0 first:pt-0"
    >
      <div className="mb-6">
        <h2 id={`${id}-heading`} className="text-2xl font-serif font-bold text-primary">{title}</h2>
        <span className="mt-2 block h-px w-12 bg-accent" aria-hidden="true" />
        {description && (
          <p className="mt-3 max-w-2xl text-sm text-neutral-600 dark:text-neutral-500">{description}</p>
        )}
      </div>
      {children}
    </section>
  );
}

/** Small uppercase label used to introduce a group of details. */
export function CvDetailGroup({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <h4 className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-accent-text">{label}</h4>
      {children}
    </div>
  );
}

/** Restrained bulleted list for responsibilities/contributions/achievements. */
export function CvBulletList({ items }: { items: string[] }) {
  return (
    <ul className="ml-4 list-outside list-disc space-y-1.5 text-sm leading-relaxed text-neutral-600 marker:text-accent dark:text-neutral-500">
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}

/** Plain list (no bullets) for related publications inside an entry. */
export function CvReferenceList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-1 text-sm leading-relaxed text-neutral-600 dark:text-neutral-500">
      {items.map((item, index) => (
        <li key={index} className="flex gap-1.5">
          <span className="text-accent" aria-hidden="true">›</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** Row of restrained pill links. */
export function CvLinkList({ links, className }: { links: CvLink[]; className?: string }) {
  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {links.map((link) => (
        <a
          key={`${link.label}-${link.url}`}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center rounded-full border border-neutral-200 px-2.5 py-1 text-xs font-medium text-accent-text transition-colors hover:bg-accent/10"
        >
          {link.label}
        </a>
      ))}
    </div>
  );
}

/** Small pill for dates/periods. */
export function CvPeriodPill({ children }: { children: ReactNode }) {
  return (
    <span className="whitespace-nowrap rounded-full bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-500">
      {children}
    </span>
  );
}
