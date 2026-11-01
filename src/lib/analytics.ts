import type { SiteConfig } from './config';

export interface AnalyticsRuntimeConfig {
  enabled: boolean;
  url: string;
  siteId: string;
}

/**
 * Resolves the [analytics] section of content/config.toml into a normalized
 * runtime config, following the same "enabled toggle" pattern as i18n.
 * Tracking is active only when enabled = true and both matomo_url and
 * matomo_site_id are set. The URL is normalized to end with "/".
 */
export function getRuntimeAnalyticsConfig(
  analytics?: SiteConfig['analytics']
): AnalyticsRuntimeConfig {
  const rawUrl = (analytics?.matomo_url || '').toString().trim();
  const rawSiteId = (analytics?.matomo_site_id || '').toString().trim();
  const enabled = analytics?.enabled ?? false;

  if (!enabled || !rawUrl || !rawSiteId) {
    return { enabled: false, url: '', siteId: '' };
  }

  return {
    enabled: true,
    url: rawUrl.endsWith('/') ? rawUrl : `${rawUrl}/`,
    siteId: rawSiteId.replace(/[^0-9A-Za-z_-]/g, ''),
  };
}