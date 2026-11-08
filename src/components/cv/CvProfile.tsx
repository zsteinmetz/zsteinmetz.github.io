'use client';

import ReactMarkdown from 'react-markdown';
import { markdownComponents } from '@/components/ui/MarkdownComponents';
import CvSection, { CvDetailGroup, CvLinkList } from './CvSection';
import type { CvProfile as CvProfileData } from '@/types/cv';

interface CvProfileProps {
  title: string;
  profile: CvProfileData;
}

/** Academic profile: narrative introduction, research interests and links. */
export default function CvProfile({ title, profile }: CvProfileProps) {
  return (
    <CvSection id="cv-profile" title={title}>
      {profile.narrative && (
        <div className="max-w-3xl leading-relaxed text-neutral-700 dark:text-neutral-600">
          <ReactMarkdown components={markdownComponents}>{profile.narrative}</ReactMarkdown>
        </div>
      )}

      {profile.interests && profile.interests.length > 0 && (
        <div className="mt-6">
          <CvDetailGroup label="Areas of expertise">
            <ul className="flex flex-wrap gap-2">
              {profile.interests.map((interest) => (
                <li
                  key={interest}
                  className="rounded-full border border-neutral-200 px-3 py-1 text-xs font-medium text-neutral-600 dark:text-neutral-500"
                >
                  {interest}
                </li>
              ))}
            </ul>
          </CvDetailGroup>
        </div>
      )}

      {profile.links && profile.links.length > 0 && (
        <div className="mt-6">
          <CvDetailGroup label="Profiles and links">
            <CvLinkList links={profile.links} />
          </CvDetailGroup>
        </div>
      )}
    </CvSection>
  );
}
