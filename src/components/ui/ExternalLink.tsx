'use client';

import type { ReactNode } from 'react';
import { useMessages } from '@/lib/i18n/useMessages';

interface ExternalLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  title?: string;
  /** Explicit accessible name; the "opens in new tab" hint is folded into it. */
  ariaLabel?: string;
}

/**
 * Anchor that opens in a new tab and tells assistive technology: a visually
 * hidden, localized "(opens in new tab)" suffix is appended to the link text
 * (or folded into an explicit `ariaLabel` for icon-only links).
 */
export default function ExternalLink({ href, children, className, title, ariaLabel }: ExternalLinkProps) {
  const messages = useMessages();
  const suffix = messages.common.opensInNewTab;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      title={title}
      aria-label={ariaLabel ? `${ariaLabel} ${suffix}` : undefined}
    >
      {children}
      {!ariaLabel && <span className="sr-only"> {suffix}</span>}
    </a>
  );
}
