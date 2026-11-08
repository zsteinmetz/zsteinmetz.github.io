'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { useMessages } from '@/lib/i18n/useMessages';

export interface CvSectionNavItem {
  id: string;
  label: string;
}

/**
 * Sticky secondary navigation for the CV page: a restrained, horizontally
 * scrollable pill index with scroll-spy highlighting. Hidden in print.
 */
export default function CvSectionNav({ items }: { items: CvSectionNavItem[] }) {
  const messages = useMessages();
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? '');
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (items.length === 0) return;

    const visibleSections = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visibleSections.add(entry.target.id);
          } else {
            visibleSections.delete(entry.target.id);
          }
        });
        const firstVisible = items.find((item) => visibleSections.has(item.id));
        if (firstVisible) {
          setActiveId(firstVisible.id);
        }
      },
      { rootMargin: '-20% 0px -60% 0px' }
    );

    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [items]);

  // Keep the active pill horizontally centered in the rail. The scrollbar is
  // hidden via CSS (.scrollbar-none); users can still drag/swipe the strip.
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const activeAnchor = list.querySelector<HTMLAnchorElement>(`a[href="#${activeId}"]`);
    if (!activeAnchor) return;
    const target = activeAnchor.offsetLeft - list.offsetLeft - (list.clientWidth - activeAnchor.clientWidth) / 2;
    // Respect prefers-reduced-motion: fall back to an instant jump.
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    list.scrollTo({ left: Math.max(0, target), behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  }, [activeId]);

  if (items.length === 0) return null;

  return (
    <nav
      aria-label={messages.cv.sectionNavLabel}
      className="print:hidden sticky top-16 z-30 -mx-4 border-y border-neutral-200/60 bg-background/90 px-4 backdrop-blur lg:top-20"
    >
      <ul ref={listRef} className="scrollbar-none flex gap-1 overflow-x-auto py-2.5">
        {items.map((item) => (
          <li key={item.id} className="shrink-0">
            <a
              href={`#${item.id}`}
              aria-current={activeId === item.id ? 'location' : undefined}
              className={cn(
                'inline-block whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium transition-colors',
                activeId === item.id
                  ? 'bg-accent/15 text-accent-text'
                  : 'text-neutral-600 dark:text-neutral-500 hover:bg-neutral-100 hover:text-primary'
              )}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
