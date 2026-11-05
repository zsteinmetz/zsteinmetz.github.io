export interface Author {
  name: string;
  isHighlighted?: boolean;
  isCorresponding?: boolean;
  isCoAuthor?: boolean;
}

export type BibTeXInlineNode =
  | { type: 'text'; text: string }
  | {
    type: 'em' | 'strong' | 'smallCaps' | 'sup' | 'sub';
    children: BibTeXInlineNode[];
  };

export interface Publication {
  id: string;
  title: string;
  titleNodes?: BibTeXInlineNode[];
  authors: Author[];
  abstract?: string;
  journal?: string;
  conference?: string;
  volume?: string;
  issue?: string;
  pages?: string;
  year: number;
  month?: string;
  doi?: string;
  url?: string;
  code?: string;
  pdfUrl?: string;
  suppUrl?: string;
  keywords: string[];
  type: PublicationType;
  status: PublicationStatus;
  citations?: number;
  openalexId?: string;
  bibtex?: string;
  venue?: string;
  location?: string;
  featured?: boolean;
  selected?: boolean;
  preview?: string;
  summary?: string;
  description?: string;
}

export type PublicationType =
  | 'journal'
  | 'conference'
  | 'workshop'
  | 'book-chapter'
  | 'book'
  | 'thesis'
  | 'preprint'
  | 'patent'
  | 'technical-report';

export type PublicationStatus =
  | 'published'
  | 'accepted'
  | 'under-review'
  | 'submitted'
  | 'in-preparation'
  | 'draft';
