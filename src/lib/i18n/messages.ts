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
    citationsTotal: string;
    citedBy: string;
    metricsSource: string;
    metricsUpdated: string;
  };
  footer: {
    lastUpdated: string;
    imprint: string;
    privacy: string;
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
    citationsTotal: 'Citations',
    citedBy: 'Cited by',
    metricsSource: 'Data from OpenAlex',
    metricsUpdated: 'Updated',
  },
  footer: {
    lastUpdated: 'Last updated',
    imprint: 'Imprint',
    privacy: 'Privacy Policy',
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
    abstract: 'Zusammenfassung',
    bibtex: 'BibTeX',
    code: 'Code',
    doiLink: 'Publikation über DOI öffnen',
    citationsTotal: 'Zitationen',
    citedBy: 'Zitiert von',
    metricsSource: 'Daten von OpenAlex',
    metricsUpdated: 'Aktualisiert',
  },
  footer: {
    lastUpdated: 'Zuletzt aktualisiert',
    imprint: 'Impressum',
    privacy: 'Datenschutzerklärung',
  },
};

export const messages: Record<string, LocaleMessages> = {
  en,
  de,
};

export function getMessages(locale: string): LocaleMessages {
  return messages[locale] || en;
}
