import fs from 'fs';
import path from 'path';
import { parse } from 'smol-toml';
import type { I18nConfig } from '@/types/i18n';
import { normalizeLocale } from './locales';
import { getLastUpdatedIso } from './lastUpdatedServer';

export interface SiteConfig {
  site: {
    title: string;
    description: string;
    favicon: string;
    // Absolute base URL of the deployed site; enables sitemap.xml and robots.txt
    url?: string;
    // Deprecated: the footer date is computed at build time from the content's
    // git history (see lib/lastUpdatedServer.ts); this key is always overridden.
    last_updated?: string;
  };
  author: {
    name: string;
    title: string;
    institution: string;
    avatar: string;
  };
  social: {
    email?: string;
    location?: string;
    location_url?: string;
    location_details?: string[];
    google_scholar?: string;
    orcid?: string;
    github?: string;
    linkedin?: string;
    [key: string]: string | string[] | undefined;
  };
  features: {
    enable_one_page_mode?: boolean;
  };
  // Slugs of legal pages shown in the footer; leave blank or delete keys to hide
  legal?: {
    imprint?: string;
    privacy?: string;
  };
  // Additional pages rendered at /{target} but not shown in the main nav menu
  subpages?: Array<{
    target: string;
  }>;
  analytics?: {
    enabled?: boolean;
    matomo_url?: string;
    matomo_site_id?: string | number;
  };
  navigation: Array<{
    title: string;
    type: 'section' | 'page' | 'link';
    target: string;
    href: string;
  }>;
  i18n?: I18nConfig;
}

const DEFAULT_CONTENT_DIR = 'content';

function readConfigFromPath(configPath: string): Partial<SiteConfig> | null {
  try {
    const fileContent = fs.readFileSync(configPath, 'utf-8');
    // smol-toml returns objects with null prototypes, which cannot be serialized
    // from Server Components to Client Components. Convert to plain objects.
    return JSON.parse(JSON.stringify(parse(fileContent))) as unknown as Partial<SiteConfig>;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return null;
    }
    throw error;
  }
}

function mergeConfig(base: SiteConfig, localized?: Partial<SiteConfig> | null): SiteConfig {
  if (!localized) return base;

  return {
    ...base,
    site: {
      ...base.site,
      ...(localized.site || {}),
    },
    author: {
      ...base.author,
      ...(localized.author || {}),
    },
    social: {
      ...base.social,
      ...(localized.social || {}),
    },
    features: base.features,
    // legal and subpages are always sourced from default content/config.toml
    legal: base.legal,
    subpages: base.subpages,
    // analytics is always sourced from default content/config.toml
    analytics: base.analytics,
    navigation: localized.navigation || base.navigation,
    // i18n is always sourced from default content/config.toml
    i18n: base.i18n,
  };
}

function getDefaultConfig(): SiteConfig {
  const defaultPath = path.join(process.cwd(), DEFAULT_CONTENT_DIR, 'config.toml');
  const parsed = readConfigFromPath(defaultPath);

  if (!parsed) {
    throw new Error('Failed to load content/config.toml');
  }

  return parsed as SiteConfig;
}

export function getConfig(locale?: string): SiteConfig {
  try {
    const baseConfig = getDefaultConfig();

    const config = locale
      ? mergeConfig(baseConfig, readConfigFromPath(
          path.join(process.cwd(), `${DEFAULT_CONTENT_DIR}_${normalizeLocale(locale)}`, 'config.toml')
        ))
      : baseConfig;

    // "Last updated" is derived from the content's git history (with an
    // mtime fallback) at build time; the manual key is deprecated.
    config.site.last_updated = getLastUpdatedIso();

    return config;
  } catch (error) {
    console.error('Error loading config:', error);
    throw new Error('Failed to load configuration');
  }
}
