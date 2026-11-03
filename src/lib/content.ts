import fs from 'fs';
import path from 'path';
import { parse } from 'smol-toml';
import { getConfig } from './config';
import { normalizeLocale } from './locales';

const DEFAULT_CONTENT_DIR = 'content';

function getCandidateFilePaths(filename: string, locale?: string): string[] {
  const candidates: string[] = [];

  if (locale) {
    candidates.push(path.join(process.cwd(), `${DEFAULT_CONTENT_DIR}_${normalizeLocale(locale)}`, filename));
  }

  candidates.push(path.join(process.cwd(), DEFAULT_CONTENT_DIR, filename));

  return candidates;
}

function readFirstAvailableFile(filename: string, locale?: string): string {
  const candidates = getCandidateFilePaths(filename, locale);

  for (const filePath of candidates) {
    try {
      return fs.readFileSync(filePath, 'utf-8');
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
        console.error(`Error loading file ${filePath}:`, error);
      }
    }
  }

  if (locale) {
    console.warn(`Missing localized file \"${filename}\" for locale \"${locale}\", and no fallback found in content/.`);
  } else {
    console.warn(`Missing file \"${filename}\" in content/.`);
  }

  return '';
}

// Matches {{ section.key }} references to config.toml values in Markdown content
const CONFIG_VARIABLE_PATTERN = /\{\{\s*([A-Za-z0-9_]+(?:\.[A-Za-z0-9_]+)*)\s*\}\}/g;

function flattenConfigValues(value: unknown, prefix = ''): Record<string, string> {
  const flattened: Record<string, string> = {};

  if (value === null || value === undefined) return flattened;

  if (Array.isArray(value)) {
    value.forEach((item, index) => {
      Object.assign(flattened, flattenConfigValues(item, `${prefix}.${index}`));
    });
    return flattened;
  }

  if (typeof value === 'object') {
    for (const [key, nested] of Object.entries(value)) {
      Object.assign(flattened, flattenConfigValues(nested, prefix ? `${prefix}.${key}` : key));
    }
    return flattened;
  }

  if (prefix) {
    flattened[prefix] = String(value);
  }
  return flattened;
}

/**
 * Replaces {{ variable.path }} references with the corresponding value from
 * content/config.toml (merged with the localized config for the given locale).
 * Unknown variables are left unchanged with a build-time warning.
 */
export function substituteConfigVariables(text: string, locale?: string): string {
  if (!text.includes('{{')) return text;

  let config;
  try {
    config = getConfig(locale);
  } catch (error) {
    console.error('Error loading config for variable substitution:', error);
    return text;
  }

  const variables = flattenConfigValues(config);

  return text.replace(CONFIG_VARIABLE_PATTERN, (match, key: string) => {
    if (key in variables) {
      return variables[key];
    }
    console.warn(`Unknown config variable "{{ ${key} }}" in content; left unchanged.`);
    return match;
  });
}

function substituteInObject<T>(value: T, locale?: string): T {
  if (typeof value === 'string') {
    return substituteConfigVariables(value, locale) as unknown as T;
  }
  if (Array.isArray(value)) {
    return value.map((item) => substituteInObject(item, locale)) as unknown as T;
  }
  if (value && typeof value === 'object') {
    const result: Record<string, unknown> = {};
    for (const [key, nested] of Object.entries(value)) {
      result[key] = substituteInObject(nested, locale);
    }
    return result as unknown as T;
  }
  return value;
}

export function getMarkdownContent(filename: string, locale?: string): string {
  return substituteConfigVariables(readFirstAvailableFile(filename, locale), locale);
}

export function getBibtexContent(filename: string, locale?: string): string {
  return readFirstAvailableFile(filename, locale);
}

export function getTomlContent<T>(filename: string, locale?: string): T | null {
  const content = readFirstAvailableFile(filename, locale);
  if (!content) {
    return null;
  }

  try {
    // smol-toml returns objects with null prototypes, which cannot be serialized
    // from Server Components to Client Components. Convert to plain objects.
    const parsed = JSON.parse(JSON.stringify(parse(content))) as T;
    // Substitute config variables ({{ section.key }}) in string values
    return substituteInObject(parsed, locale);
  } catch (error) {
    console.error(`Error parsing TOML file ${filename}:`, error);
    return null;
  }
}

export function getPageConfig<T = unknown>(pageName: string, locale?: string): T | null {
  return getTomlContent<T>(`${pageName}.toml`, locale);
}
