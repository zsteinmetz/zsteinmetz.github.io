'use client';

import type { ReactNode } from 'react';
import { MotionConfig } from 'framer-motion';

/**
 * Wraps the app so all Framer Motion entrance/exit animations degrade
 * gracefully for users with `prefers-reduced-motion: reduce` enabled.
 * CSS-side motion (smooth scrolling, transitions) is disabled separately in
 * `src/app/globals.css`.
 */
export default function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
