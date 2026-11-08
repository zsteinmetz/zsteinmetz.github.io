export interface LocaleMessages {
  common: {
    all: string;
    copyToClipboard: string;
  };
  navigation: {
    openMainMenu: string;
  };
  language: {
    switchTo: string;
  };
  theme: {
    system: string;
    light: string;
    dark: string;
    currentTheme: string;
    cycleTheme: string;
  };
  profile: {
    email: string;
    location: string;
    workAddress: string;
    googleMap: string;
    send: string;
    sendEmail: string;
    researchInterests: string;
  };
  home: {
    about: string;
    news: string;
    highlights: string;
    selectedPublications: string;
    viewAll: string;
  };
  publications: {
    searchPlaceholder: string;
    filters: string;
    year: string;
    type: string;
    noResults: string;
    abstract: string;
    bibtex: string;
    code: string;
    doiLink: string;
    pdf: string;
    supplementary: string;
    resultCount: string;
    sort: string;
    sortNewest: string;
    sortCited: string;
    citationsTotal: string;
    citedBy: string;
    metricsSource: string;
    metricsUpdated: string;
    hideAbstract: string;
  };
  footer: {
    lastUpdated: string;
    imprint: string;
    privacy: string;
  };
  cv: {
    supervisedBy: string;
    present: string;
    featured: string;
    researchQuestion: string;
    role: string;
    featuredPublications: string;
    completeBibliography: string;
    otherOutputs: string;
    publisherLink: string;
    showDetails: string;
    hideDetails: string;
    printPdf: string;
    sectionNavLabel: string;
    thesis: string;
    profilesAndLinks: string;
    responsibilities: string;
    selectedContributions: string;
    selectedAchievements: string;
    relatedPublications: string;
    outcomes: string;
    background: string;
    mainContributions: string;
    collaborators: string;
    funding: string;
    methods: string;
    bibliographyTypes: {
      journal: string;
      conference: string;
      workshop: string;
      book: string;
      bookChapter: string;
      thesis: string;
      preprint: string;
      technicalReport: string;
      patent: string;
    };
  };
}

const en: LocaleMessages = {
  common: {
    all: 'All',
    copyToClipboard: 'Copy to clipboard',
  },
  navigation: {
    openMainMenu: 'Open main menu',
  },
  language: {
    switchTo: 'Click to switch to {locale}',
  },
  theme: {
    system: 'System',
    light: 'Light',
    dark: 'Dark',
    currentTheme: 'Current theme',
    cycleTheme: 'Click to cycle theme',
  },
  profile: {
    email: 'Email',
    location: 'Location',
    workAddress: 'Work address',
    googleMap: 'Map',
    send: 'Send',
    sendEmail: 'Send email',
    researchInterests: 'Areas of expertise',
  },
  home: {
    about: 'About',
    news: 'News',
    highlights: 'Research areas',
    selectedPublications: 'Selected publications',
    viewAll: 'View all',
  },
  publications: {
    searchPlaceholder: 'Search publications...',
    filters: 'Filters',
    year: 'Year',
    type: 'Type',
    noResults: 'No publications found matching your criteria.',
    abstract: 'Abstract',
    bibtex: 'BibTeX',
    code: 'Code',
    doiLink: 'Open publication via DOI',
    pdf: 'PDF',
    supplementary: 'Supplementary',
    resultCount: '{count} of {total} publications',
    sort: 'Sort by',
    sortNewest: 'Newest first',
    sortCited: 'Most cited',
    citationsTotal: 'Citations',
    citedBy: 'Cited by',
    metricsSource: 'Data from OpenAlex',
    metricsUpdated: 'Updated',
    hideAbstract: 'Hide abstract',
  },
  footer: {
    lastUpdated: 'Last updated',
    imprint: 'Imprint',
    privacy: 'Privacy Policy',
  },
  cv: {
    supervisedBy: 'Supervised by',
    present: 'Present',
    featured: 'Featured',
    researchQuestion: 'Research question',
    role: 'Role',
    featuredPublications: 'Featured publications',
    completeBibliography: 'Complete bibliography',
    otherOutputs: 'Other outputs',
    publisherLink: 'Publisher link',
    showDetails: 'Show details',
    hideDetails: 'Hide details',
    printPdf: 'Print / PDF',
    sectionNavLabel: 'Curriculum vitae sections',
    thesis: 'Thesis',
    profilesAndLinks: 'Profiles and links',
    responsibilities: 'Responsibilities and activities',
    selectedContributions: 'Selected contributions',
    selectedAchievements: 'Selected achievements',
    relatedPublications: 'Related publications',
    outcomes: 'Outcomes and impact',
    background: 'Background and context',
    mainContributions: 'Main contributions',
    collaborators: 'Collaborators',
    funding: 'Funding',
    methods: 'Methods',
    bibliographyTypes: {
      journal: 'Journal articles',
      conference: 'Conference papers',
      workshop: 'Workshop papers',
      book: 'Books',
      bookChapter: 'Book chapters',
      thesis: 'Theses',
      preprint: 'Preprints and working papers',
      technicalReport: 'Reports and technical outputs',
      patent: 'Patents',
    },
  },
};

const de: LocaleMessages = {
  common: {
    all: 'Alle',
    copyToClipboard: 'In die Zwischenablage kopieren',
  },
  navigation: {
    openMainMenu: 'Hauptmenü öffnen',
  },
  language: {
    switchTo: 'Klicken, um zu {locale} zu wechseln',
  },
  theme: {
    system: 'System',
    light: 'Hell',
    dark: 'Dunkel',
    currentTheme: 'Aktuelles Design',
    cycleTheme: 'Klicken, um das Design zu wechseln',
  },
  profile: {
    email: 'E-Mail',
    location: 'Standort',
    workAddress: 'Arbeitsadresse',
    googleMap: 'Karte',
    send: 'Senden',
    sendEmail: 'E-Mail senden',
    researchInterests: 'Fachliche Schwerpunkte',
  },
  home: {
    about: 'Über mich',
    news: 'Aktuelles',
    highlights: 'Forschungsschwerpunkte',
    selectedPublications: 'Ausgewählte Publikationen',
    viewAll: 'Alle anzeigen',
  },
  publications: {
    searchPlaceholder: 'Publikationen suchen...',
    filters: 'Filter',
    year: 'Jahr',
    type: 'Typ',
    noResults: 'Keine Publikationen gefunden, die deinen Kriterien entsprechen.',
    abstract: 'Abstract',
    bibtex: 'BibTeX',
    code: 'Code',
    doiLink: 'Publikation über DOI öffnen',
    pdf: 'PDF',
    supplementary: 'Zusatzmaterial',
    resultCount: '{count} von {total} Publikationen',
    sort: 'Sortieren',
    sortNewest: 'Neueste zuerst',
    sortCited: 'Meistzitiert',
    citationsTotal: 'Zitationen',
    citedBy: 'Zitiert von',
    metricsSource: 'Daten von OpenAlex',
    metricsUpdated: 'Aktualisiert',
    hideAbstract: 'Abstract ausblenden',
  },
  footer: {
    lastUpdated: 'Zuletzt aktualisiert',
    imprint: 'Impressum',
    privacy: 'Datenschutzerklärung',
  },
  cv: {
    supervisedBy: 'Betreut von',
    present: 'heute',
    featured: 'Hervorgehoben',
    researchQuestion: 'Forschungsfrage',
    role: 'Rolle',
    featuredPublications: 'Ausgewählte Publikationen',
    completeBibliography: 'Vollständiges Publikationsverzeichnis',
    otherOutputs: 'Weitere Beiträge',
    publisherLink: 'Verlagsseite',
    showDetails: 'Details anzeigen',
    hideDetails: 'Details ausblenden',
    printPdf: 'Drucken / PDF',
    sectionNavLabel: 'CV-Abschnitte',
    thesis: 'Abschlussarbeit',
    profilesAndLinks: 'Profile und Links',
    responsibilities: 'Aufgaben und Tätigkeiten',
    selectedContributions: 'Ausgewählte Beiträge',
    selectedAchievements: 'Ausgewählte Erfolge',
    relatedPublications: 'Zugehörige Publikationen',
    outcomes: 'Ergebnisse und Wirkung',
    background: 'Hintergrund und Kontext',
    mainContributions: 'Hauptbeiträge',
    collaborators: 'Kooperationspartner',
    funding: 'Förderung',
    methods: 'Methoden',
    bibliographyTypes: {
      journal: 'Fachzeitschriften',
      conference: 'Konferenzbeiträge',
      workshop: 'Workshop-Beiträge',
      book: 'Bücher',
      bookChapter: 'Buchkapitel',
      thesis: 'Abschlussarbeiten',
      preprint: 'Preprints und Working Papers',
      technicalReport: 'Berichte und technische Dokumente',
      patent: 'Patente',
    },
  },
};

export const messages: Record<string, LocaleMessages> = {
  en,
  de,
};

export function getMessages(locale: string): LocaleMessages {
  return messages[locale] || en;
}
