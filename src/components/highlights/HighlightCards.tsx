'use client';

import type { CSSProperties } from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { markdownComponents } from '@/components/ui/MarkdownComponents';
import { cn } from '@/lib/utils';
import type { HighlightItem } from '@/types/page';

/**
 * Reusable grid of highlight cards: tinted boxes with a colored top bar,
 * a serif heading and short overview text (Markdown). Used by the homepage
 * `highlight` section and the CV `[highlights]` section.
 */

/** Responsive grid classes per supported column count. */
const GRID_CLASSES: Record<number, string> = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
};

type ThemeColorToken = 'accent' | 'primary' | 'success' | 'warning' | 'info' | 'error';

/**
 * Theme tokens keep light/dark-mode awareness by resolving through the
 * Tailwind utilities generated from the CSS custom properties in globals.css.
 */
const THEME_COLOR_CLASSES: Record<ThemeColorToken, { box: string; bar: string; heading: string }> = {
    accent: { box: 'bg-accent/10', bar: 'border-t-accent', heading: 'text-accent-text' },
    primary: { box: 'bg-primary/10', bar: 'border-t-primary', heading: 'text-primary' },
    success: { box: 'bg-success/10', bar: 'border-t-success', heading: 'text-success' },
    warning: { box: 'bg-warning/10', bar: 'border-t-warning', heading: 'text-warning' },
    info: { box: 'bg-info/10', bar: 'border-t-info', heading: 'text-info' },
    error: { box: 'bg-error/10', bar: 'border-t-error', heading: 'text-error' },
};

const DEFAULT_COLOR: ThemeColorToken = 'accent';
const DEFAULT_COLUMNS = 3;

interface ResolvedColor {
    /** Box tint and top-bar classes (theme tokens only). */
    className?: string;
    /** Heading classes (theme tokens only). */
    headingClassName?: string;
    /** Inline styles for raw CSS colors (any value that is not a theme token). */
    style?: CSSProperties;
    headingStyle?: CSSProperties;
}

/**
 * Resolves a color setting: theme tokens use Tailwind utilities so they follow
 * the light/dark theme; any other value is treated as a raw CSS color and is
 * applied inline, with the box surface tinted via `color-mix()`.
 */
function resolveColor(color: string | undefined): ResolvedColor {
    const value = (color || DEFAULT_COLOR).trim();

    if (value in THEME_COLOR_CLASSES) {
        const classes = THEME_COLOR_CLASSES[value as ThemeColorToken];
        return {
            className: `${classes.box} ${classes.bar}`,
            headingClassName: classes.heading,
        };
    }

    if (!value) {
        const classes = THEME_COLOR_CLASSES[DEFAULT_COLOR];
        return {
            className: `${classes.box} ${classes.bar}`,
            headingClassName: classes.heading,
        };
    }

    return {
        style: {
            backgroundColor: `color-mix(in srgb, ${value} 10%, transparent)`,
            borderTopColor: value,
        },
        headingStyle: { color: value },
    };
}

/** Clamps `columns` to the supported 1–4 range, defaulting to 3. */
function resolveColumns(columns: number | undefined): number {
    if (columns === undefined) {
        return DEFAULT_COLUMNS;
    }
    if (!Number.isInteger(columns) || columns < 1 || columns > 4) {
        console.warn(`Invalid "columns" value ${JSON.stringify(columns)} in a highlight section; expected an integer between 1 and 4. Falling back to ${DEFAULT_COLUMNS}.`);
        return DEFAULT_COLUMNS;
    }
    return columns;
}

export interface HighlightCardsProps {
    items: HighlightItem[];
    /** Section-wide color: theme token (`accent`, `primary`, `success`, `warning`, `info`, `error`) or raw CSS color. Defaults to `accent`. */
    color?: string;
    /** Cards per row (1–4). Defaults to 3. */
    columns?: number;
}

export default function HighlightCards({ items, color, columns }: HighlightCardsProps) {
    if (!items || items.length === 0) {
        return null;
    }

    const gridClassName = GRID_CLASSES[resolveColumns(columns)];

    return (
        <div className={cn('grid gap-4', gridClassName)}>
            {items.map((item, index) => {
                const resolved = resolveColor(item.color || color);

                return (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 * index }}
                        className={cn(
                            'rounded-xl border border-t-4 border-neutral-200 p-5 shadow-sm transition-all duration-200 hover:shadow-lg hover:scale-[1.01]',
                            resolved.className
                        )}
                        style={resolved.style}
                    >
                        <h3
                            className={cn('font-serif text-lg font-semibold leading-tight', resolved.headingClassName)}
                            style={resolved.headingStyle}
                        >
                            {item.title}
                        </h3>
                        {item.content && (
                            <div className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-500">
                                <ReactMarkdown components={markdownComponents}>
                                    {item.content}
                                </ReactMarkdown>
                            </div>
                        )}
                    </motion.div>
                );
            })}
        </div>
    );
}
