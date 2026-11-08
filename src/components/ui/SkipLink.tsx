'use client';

import { useMessages } from '@/lib/i18n/useMessages';

/**
 * Skip-to-content link: the first focusable element on every page. Hidden
 * until focused, then it appears in the top-left corner and jumps past the
 * fixed navigation to <main id="main-content"> (src/app/layout.tsx).
 */
export default function SkipLink() {
  const messages = useMessages();

  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-accent-foreground focus:shadow-lg"
    >
      {messages.common.skipToContent}
    </a>
  );
}
