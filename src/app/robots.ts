import type { MetadataRoute } from 'next';
import { getConfig } from '@/lib/config';

// Required for static export (output: 'export')
export const dynamic = 'force-static';

/**
 * Statically generated robots.txt (emitted as out/robots.txt on `next build`).
 * Allows all crawlers and points them to the sitemap. The sitemap line is
 * only included when site.url is set in content/config.toml.
 */
export default function robots(): MetadataRoute.Robots {
  const config = getConfig();

  const sitemapUrl = config.site.url
    ? `${config.site.url.replace(/\/+$/, '')}/sitemap.xml`
    : undefined;

  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: sitemapUrl,
  };
}
