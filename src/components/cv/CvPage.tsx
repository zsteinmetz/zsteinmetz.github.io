'use client';

import { motion } from 'framer-motion';
import { PrinterIcon } from '@heroicons/react/24/outline';
import type { CvHeadings, CvPageConfig } from '@/types/cv';
import type { Publication } from '@/types/publication';
import CvProfile from './CvProfile';
import HighlightCards from '@/components/highlights/HighlightCards';
import CvSection from './CvSection';
import CvTimeline from './CvTimeline';
import CvEducation from './CvEducation';
import CvProjects from './CvProjects';
import CvPublications from './CvPublications';
import CvTeaching from './CvTeaching';
import CvGrants from './CvGrants';
import CvService from './CvService';
import CvSkills from './CvSkills';
import CvSectionNav, { type CvSectionNavItem } from './CvSectionNav';
import type { PublicationMetricsSummary } from '@/lib/metrics';

const DEFAULT_HEADINGS: Required<CvHeadings> = {
  profile: 'Academic Profile',
  highlights: 'Research Areas',
  experience: 'Appointments & Experience',
  education: 'Education',
  research: 'Research Contributions & Projects',
  publications: 'Publications',
  teaching: 'Teaching & Supervision',
  grants: 'Grants, Awards & Recognition',
  grants_funding: 'Grants & Fellowships',
  grants_awards: 'Awards & Distinctions',
  service: 'Academic Service & Community',
  skills: 'Skills & Expertise',
};

interface CvPageProps {
  config: CvPageConfig;
  publications: Publication[];
  metrics?: PublicationMetricsSummary;
  enableOnePageMode?: boolean;
}

/**
 * Narrative academic CV: profile, expandable appointments timeline, education,
 * research portfolio, publications, teaching, grants/awards, service and skills.
 */
export default function CvPage({ config, publications, metrics, enableOnePageMode }: CvPageProps) {
  const headings: Required<CvHeadings> = { ...DEFAULT_HEADINGS, ...(config.headings || {}) };
  const hasPublications = publications.length > 0;

  const navItems: CvSectionNavItem[] = [];
  if (config.profile) navItems.push({ id: 'cv-profile', label: headings.profile });
  if (config.highlights && config.highlights.items.length > 0) {
    navItems.push({ id: 'cv-highlights', label: headings.highlights });
  }
  if (config.appointments && config.appointments.length > 0) {
    navItems.push({ id: 'cv-experience', label: headings.experience });
  }
  if (config.education && config.education.length > 0) {
    navItems.push({ id: 'cv-education', label: headings.education });
  }
  if (config.projects && config.projects.length > 0) {
    navItems.push({ id: 'cv-research', label: headings.research });
  }
  if (hasPublications) navItems.push({ id: 'cv-publications', label: headings.publications });
  if (config.teaching && config.teaching.length > 0) {
    navItems.push({ id: 'cv-teaching', label: headings.teaching });
  }
  if (config.grants && config.grants.length > 0) {
    navItems.push({ id: 'cv-grants', label: headings.grants });
  }
  if (config.service && config.service.length > 0) {
    navItems.push({ id: 'cv-service', label: headings.service });
  }
  if (config.skills && config.skills.length > 0) {
    navItems.push({ id: 'cv-skills', label: headings.skills });
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-4">
        <div>
          {/* An empty title ("") hides the page heading */}
          {config.title && (
            <h1 className="text-4xl font-serif font-bold text-primary">{config.title}</h1>
          )}
          {config.description && (
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-neutral-600 dark:text-neutral-500">
              {config.description}
            </p>
          )}
        </div>
        <button
          type="button"
          onClick={() => window.print()}
          className="print:hidden inline-flex shrink-0 items-center gap-2 rounded-lg border border-neutral-200 bg-card px-4 py-2 text-sm font-medium text-primary shadow-sm transition-colors hover:border-accent/40 hover:bg-accent/10"
        >
          <PrinterIcon className="h-4 w-4" aria-hidden="true" />
          Print / PDF
        </button>
      </div>

      <div className="mt-8">
        <CvSectionNav items={navItems} />

        <div className="mt-10">
          {config.profile && <CvProfile title={headings.profile} profile={config.profile} />}
          {config.highlights && config.highlights.items.length > 0 && (
            <CvSection id="cv-highlights" title={headings.highlights}>
              <HighlightCards
                items={config.highlights.items}
                color={config.highlights.color}
                columns={config.highlights.columns}
              />
            </CvSection>
          )}
          {config.appointments && config.appointments.length > 0 && (
            <CvTimeline title={headings.experience} appointments={config.appointments} />
          )}
          {config.education && config.education.length > 0 && (
            <CvEducation title={headings.education} education={config.education} />
          )}
          {config.projects && config.projects.length > 0 && (
            <CvProjects title={headings.research} overview={config.research_overview} projects={config.projects} />
          )}
          {hasPublications && (
            <CvPublications
              title={headings.publications}
              publications={publications}
              metrics={metrics}
              enableOnePageMode={enableOnePageMode}
              featuredLimit={config.publications?.featured_limit}
              showAbstracts={config.publications?.show_abstracts}
              showComplete={config.publications?.show_complete}
              showMetrics={config.publications?.show_metrics}
              note={config.publications?.note}
            />
          )}
          {config.teaching && config.teaching.length > 0 && (
            <CvTeaching title={headings.teaching} overview={config.teaching_overview} teaching={config.teaching} />
          )}
          {config.grants && config.grants.length > 0 && (
            <CvGrants
              title={headings.grants}
              overview={config.grants_overview}
              fundingHeading={headings.grants_funding}
              awardsHeading={headings.grants_awards}
              grants={config.grants}
            />
          )}
          {config.service && config.service.length > 0 && (
            <CvService title={headings.service} service={config.service} />
          )}
          {config.skills && config.skills.length > 0 && (
            <CvSkills title={headings.skills} skills={config.skills} />
          )}
        </div>
      </div>
    </motion.div>
  );
}
