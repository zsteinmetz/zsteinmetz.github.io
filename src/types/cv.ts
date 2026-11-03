import type { BasePageConfig, HighlightItem } from './page';

export interface CvLink {
  label: string;
  url: string;
}

export interface CvProfile {
  narrative?: string;
  interests?: string[];
  links?: CvLink[];
}

export interface CvAppointment {
  title: string;
  institution?: string;
  department?: string;
  location?: string;
  start?: string;
  end?: string;
  employment_type?: string;
  sort_date?: string;
  summary?: string;
  responsibilities?: string[];
  contributions?: string[];
  achievements?: string[];
  publications?: string[];
  links?: CvLink[];
}

export interface CvEducation {
  degree: string;
  university?: string;
  department?: string;
  start?: string;
  end?: string;
  sort_date?: string;
  thesis?: string;
  supervisors?: string[];
  distinctions?: string[];
  description?: string;
}

export interface CvProject {
  title: string;
  period?: string;
  question?: string;
  background?: string;
  role?: string;
  methods?: string[];
  contributions?: string[];
  outcomes?: string;
  collaborators?: string[];
  funding?: string;
  publications?: string[];
  links?: CvLink[];
  image?: string;
  featured?: boolean;
}

export interface CvPublicationsSection {
  source?: string;
  featured_limit?: number;
  show_abstracts?: boolean;
  note?: string;
}

export interface CvTeaching {
  course: string;
  category?: string;
  institution?: string;
  level?: string;
  period?: string;
  role?: string;
  description?: string;
  methods?: string[];
}

export interface CvGrant {
  title: string;
  kind?: 'funding' | 'award';
  institution?: string;
  period?: string;
  amount?: string;
  role?: string;
  description?: string;
}

export interface CvService {
  title: string;
  organization?: string;
  period?: string;
  category?: string;
  description?: string;
}

export interface CvSkill {
  name: string;
  description?: string;
}

export interface CvSkillCategory {
  category: string;
  items: CvSkill[];
}

export interface CvHighlights {
  color?: string;
  columns?: number;
  items: HighlightItem[];
}

export interface CvHeadings {
  profile?: string;
  highlights?: string;
  experience?: string;
  education?: string;
  research?: string;
  publications?: string;
  teaching?: string;
  grants?: string;
  grants_funding?: string;
  grants_awards?: string;
  service?: string;
  skills?: string;
}

export interface CvPageConfig extends BasePageConfig {
  type: 'cv';
  headings?: CvHeadings;
  profile?: CvProfile;
  highlights?: CvHighlights;
  appointments?: CvAppointment[];
  education?: CvEducation[];
  projects?: CvProject[];
  publications?: CvPublicationsSection;
  teaching?: CvTeaching[];
  grants?: CvGrant[];
  service?: CvService[];
  skills?: CvSkillCategory[];
  teaching_overview?: string;
}
