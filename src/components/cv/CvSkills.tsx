'use client';

import type { CvSkillCategory } from '@/types/cv';
import CvSection from './CvSection';

interface CvSkillsProps {
  title: string;
  skills: CvSkillCategory[];
}

/** Skills grouped into meaningful categories, described rather than rated. */
export default function CvSkills({ title, skills }: CvSkillsProps) {
  return (
    <CvSection id="cv-skills" title={title}>
      <div className="grid gap-6 sm:grid-cols-2">
        {skills.map((category) => (
          <div
            key={category.category}
            className="cv-entry card-bg rounded-xl border border-neutral-200 p-5 shadow-sm print:break-inside-avoid"
          >
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-accent-text">
              {category.category}
            </h3>
            <dl className="space-y-2.5">
              {category.items.map((item, itemIndex) => (
                <div key={`${item.name}-${itemIndex}`}>
                  <dt className="text-sm font-medium text-primary">{item.name}</dt>
                  {item.description && (
                    <dd className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-500">{item.description}</dd>
                  )}
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>
    </CvSection>
  );
}
