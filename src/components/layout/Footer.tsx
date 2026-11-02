'use client';

import Link from 'next/link';
import { useLocaleStore } from '@/lib/stores/localeStore';
import { useMessages } from '@/lib/i18n/useMessages';

interface FooterProps {
  lastUpdated?: string;
  lastUpdatedByLocale?: Record<string, string | undefined>;
  defaultLocale?: string;
  legal?: {
    imprint?: string;
    privacy?: string;
  };
}

export default function Footer({ lastUpdated, lastUpdatedByLocale, defaultLocale = 'en', legal }: FooterProps) {
  const locale = useLocaleStore((state) => state.locale);
  const messages = useMessages();

  const resolvedLastUpdated =
    lastUpdatedByLocale?.[locale] ||
    (defaultLocale ? lastUpdatedByLocale?.[defaultLocale] : undefined) ||
    lastUpdated ||
    new Date().toLocaleDateString(locale || 'en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <footer className="border-t border-neutral-200/50 bg-neutral-50/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-xs text-neutral-500">
            {messages.footer.lastUpdated}: {resolvedLastUpdated}
          </p>
          <p className="text-xs text-neutral-500 flex items-center gap-1">
            {legal?.imprint && (
              <>
                <Link href={`/${legal.imprint}`} className="hover:text-primary transition-colors duration-200">
                  {messages.footer.imprint}
                </Link>
                {legal?.privacy && <span aria-hidden="true">·</span>}
              </>
            )}
            {legal?.privacy && (
              <Link href={`/${legal.privacy}`} className="hover:text-primary transition-colors duration-200">
                {messages.footer.privacy}
              </Link>
            )}
          </p>
        </div>
      </div>
    </footer>
  );
}
