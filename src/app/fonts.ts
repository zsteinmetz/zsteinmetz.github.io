import localFont from 'next/font/local';

/**
 * Inter (variable font, weights 100-900) - self-hosted sans-serif.
 * Covers font-normal (400), font-medium (500), font-semibold (600), font-bold (700).
 */
export const inter = localFont({
  src: './fonts/InterVariable.woff2',
  weight: '100 900',
  variable: '--font-inter',
  display: 'swap',
});

/**
 * Georgia - self-hosted serif (regular 400 + bold 700).
 * Used via .font-serif for headings and title text.
 */
export const georgia = localFont({
  src: [
    { path: './fonts/georgia-regular.woff2', weight: '400' },
    { path: './fonts/georgia-bold.woff2', weight: '700' },
  ],
  variable: '--font-georgia',
  display: 'swap',
});
