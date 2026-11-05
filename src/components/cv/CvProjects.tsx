'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { cn } from '@/lib/utils';
import type { CvProject } from '@/types/cv';
import CvSection, { CvBulletList, CvDetailGroup, CvLinkList, CvPeriodPill, CvReferenceList } from './CvSection';

function ProjectCard({ project, index }: { project: CvProject; index: number }) {
  const [expanded, setExpanded] = useState(false);

  const hasDetails = Boolean(
    project.background ||
    project.contributions?.length ||
    project.collaborators?.length ||
    project.funding ||
    project.publications?.length ||
    project.links?.length ||
    project.image
  );

  const detailsId = `cv-project-${index}-details`;

  return (
    <article className="cv-entry card-bg rounded-xl border border-neutral-200 p-6 shadow-sm">
      {project.image && (
        <Image
          src={project.image}
          alt=""
          width={960}
          height={480}
          className="mb-5 rounded-lg border border-neutral-200"
        />
      )}

      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
        <h3 className="text-xl font-serif font-semibold text-primary">{project.title}</h3>
        <div className="flex flex-wrap gap-2">
          {project.featured && (
            <span className="rounded-full bg-accent px-2.5 py-1 text-xs font-semibold text-accent-foreground">
              Featured
            </span>
          )}
          {project.period && <CvPeriodPill>{project.period}</CvPeriodPill>}
        </div>
      </div>

      {project.question && (
        <blockquote className="mt-4 max-w-3xl border-l-2 border-accent/60 pl-4">
          <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-accent-text">
            Research question
          </span>
          <p className="text-sm italic leading-relaxed text-neutral-600 dark:text-neutral-500">{project.question}</p>
        </blockquote>
      )}

      {project.role && (
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-neutral-600 dark:text-neutral-500">
          <span className="font-medium text-primary">Role: </span>
          {project.role}
        </p>
      )}

      {project.outcomes && (
        <div className="mt-3 max-w-3xl">
          <CvDetailGroup label="Outcomes & impact">
            <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-500">{project.outcomes}</p>
          </CvDetailGroup>
        </div>
      )}

      {project.methods && project.methods.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {project.methods.map((method) => (
            <span
              key={method}
              className="rounded-full border border-neutral-200 px-2.5 py-1 text-xs font-medium text-neutral-600 dark:text-neutral-500"
            >
              {method}
            </span>
          ))}
        </div>
      )}

      {hasDetails && (
        <>
          <button
            type="button"
            onClick={() => setExpanded((value) => !value)}
            aria-expanded={expanded}
            aria-controls={detailsId}
            className="print:hidden mt-4 inline-flex items-center gap-1 rounded-md px-1.5 py-1 text-xs font-semibold text-accent-text transition-colors hover:bg-accent/10"
          >
            {expanded ? 'Hide details' : 'Show details'}
            <ChevronDownIcon className={cn('h-3.5 w-3.5 transition-transform', expanded && 'rotate-180')} aria-hidden="true" />
          </button>

          <div id={detailsId} className={cn('cv-details', !expanded && 'hidden')}>
            <div className="mt-3 space-y-4 border-l-2 border-neutral-200 pl-4">
              {project.background && (
                <CvDetailGroup label="Background & context">
                  <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-500">{project.background}</p>
                </CvDetailGroup>
              )}
              {project.contributions && project.contributions.length > 0 && (
                <CvDetailGroup label="Main contributions">
                  <CvBulletList items={project.contributions} />
                </CvDetailGroup>
              )}
              {project.collaborators && project.collaborators.length > 0 && (
                <CvDetailGroup label="Collaborators">
                  <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-500">
                    {project.collaborators.join(', ')}
                  </p>
                </CvDetailGroup>
              )}
              {project.funding && (
                <CvDetailGroup label="Funding">
                  <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-500">{project.funding}</p>
                </CvDetailGroup>
              )}
              {project.publications && project.publications.length > 0 && (
                <CvDetailGroup label="Related publications">
                  <CvReferenceList items={project.publications} />
                </CvDetailGroup>
              )}
              {project.links && project.links.length > 0 && <CvLinkList links={project.links} />}
            </div>
          </div>
        </>
      )}
    </article>
  );
}

interface CvProjectsProps {
  title: string;
  projects: CvProject[];
}

/** Selected research contributions as portfolio entries. */
export default function CvProjects({ title, projects }: CvProjectsProps) {
  return (
    <CvSection id="cv-research" title={title}>
      <div className="grid gap-6">
        {projects.map((project, index) => (
          <ProjectCard key={`${project.title}-${index}`} project={project} index={index} />
        ))}
      </div>
    </CvSection>
  );
}
