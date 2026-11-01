import { getRuntimeAnalyticsConfig } from '@/lib/analytics';
import type { SiteConfig } from '@/lib/config';

type AnalyticsConfig = SiteConfig['analytics'];

interface MatomoProps {
  analytics?: AnalyticsConfig;
}

/**
 * Matomo JavaScript tracker, rendered into <head>. Follows the official
 * Matomo embedded tracking snippet. Renders nothing when analytics is
 * disabled in content/config.toml.
 */
export function MatomoScript({ analytics }: MatomoProps) {
  const { enabled, url, siteId } = getRuntimeAnalyticsConfig(analytics);

  if (!enabled) {
    return null;
  }

  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          var _paq = window._paq = window._paq || [];
          _paq.push(['setTrackerUrl', '${url}matomo.php']);
          _paq.push(['setSiteId', '${siteId}']);
          var d = document, g = d.createElement('script'), s = d.getElementsByTagName('script')[0];
          g.async = true; g.src = '${url}matomo.js'; s.parentNode.insertBefore(g, s);
        `,
      }}
    />
  );
}

/**
 * Matomo <noscript> tracking pixel fallback for visitors with JavaScript
 * disabled. Rendered at the end of <body> as recommended by Matomo.
 * Renders nothing when analytics is disabled in content/config.toml.
 */
export function MatomoNoscript({ analytics }: MatomoProps) {
  const { enabled, url, siteId } = getRuntimeAnalyticsConfig(analytics);

  if (!enabled) {
    return null;
  }

  return (
    <noscript>
      <p>
        {/* eslint-disable-next-line @next/next/no-img-element -- must be a raw <img> for the Matomo noscript tracking pixel */}
        <img
          referrerPolicy="no-referrer-when-downgrade"
          src={`${url}matomo.php?idsite=${siteId}&rec=1`}
          style={{ border: 0 }}
          alt=""
        />
      </p>
    </noscript>
  );
}