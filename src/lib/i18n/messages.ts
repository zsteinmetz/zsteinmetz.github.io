export interface LocaleMessages {
  common: {
    all: string;
    copyToClipboard: string;
  };
  navigation: {
    openMainMenu: string;
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
    citationsTotal: string;
    worksCount: string;
    citedBy: string;
    metricsSource: string;
    metricsUpdated: string;
  };
  footer: {
    lastUpdated: string;
    builtWithPrism: string;
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
    workAddress: 'Work Address',
    googleMap: 'Google Map',
    send: 'Send',
    sendEmail: 'Send Email',
    researchInterests: 'Research Interests',
  },
  home: {
    about: 'About',
    news: 'News',
    selectedPublications: 'Selected Publications',
    viewAll: 'View All',
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
    citationsTotal: 'Citations',
    worksCount: 'Works',
    citedBy: 'Cited by',
    metricsSource: 'Citation data from OpenAlex',
    metricsUpdated: 'Updated',
  },
  footer: {
    lastUpdated: 'Last updated',
    builtWithPrism: 'Built with PRISM',
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
    googleMap: 'Google Maps',
    send: 'Senden',
    sendEmail: 'E-Mail senden',
    researchInterests: 'Forschungsinteressen',
  },
  home: {
    about: 'Über mich',
    news: 'Aktuelles',
    selectedPublications: 'Ausgewählte Publikationen',
    viewAll: 'Alle anzeigen',
  },
  publications: {
    searchPlaceholder: 'Publikationen suchen...',
    filters: 'Filter',
    year: 'Jahr',
    type: 'Typ',
    noResults: 'Keine Publikationen gefunden, die deinen Kriterien entsprechen.',
    abstract: 'Zusammenfassung',
    bibtex: 'BibTeX',
    code: 'Code',
    citationsTotal: 'Zitationen',
    worksCount: 'Werke',
    citedBy: 'Zitiert von',
    metricsSource: 'Zitationsdaten von OpenAlex',
    metricsUpdated: 'Aktualisiert',
  },
  footer: {
    lastUpdated: 'Zuletzt aktualisiert',
    builtWithPrism: 'Mit PRISM erstellt',
  },
};

export const messages: Record<string, LocaleMessages> = {
  en,
  de,
};

export function getMessages(locale: string): LocaleMessages {
  return messages[locale] || en;
}
