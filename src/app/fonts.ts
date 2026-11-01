import localFont from 'next/font/local';

/**
 * Lora (variable font, weights 400-700) - self-hosted serif.
 * Used via .font-serif for headings and title text.
 * Covers font-normal (400), font-medium (500), font-semibold (600), font-bold (700).
 */
export const lora = localFont({
  src: [
    { path: './fonts/lora-variable.woff2', weight: '400 700', style: 'normal' },
    { path: './fonts/lora-italic-variable.woff2', weight: '400 700', style: 'italic' },
  ],
  variable: '--font-lora',
  display: 'swap',
});

/**
 * IBM Plex Sans (variable font, weights 400-700) - self-hosted sans-serif.
 * Covers font-normal (400), font-medium (500), font-semibold (600), font-bold (700).
 */
export const plexSans = localFont({
  src: [
    { path: './fonts/plex-sans-variable.woff2', weight: '400 700', style: 'normal' },
    { path: './fonts/plex-sans-italic-variable.woff2', weight: '400 700', style: 'italic' },
  ],
  variable: '--font-plex-sans',
  display: 'swap',
});

/**
 * IBM Plex Mono - self-hosted monospace.
 * Used via .font-mono for code and BibTeX snippets.
 */
export const plexMono = localFont({
  src: './fonts/plex-mono-regular.woff2',
  weight: '400',
  variable: '--font-plex-mono',
  display: 'swap',
});
