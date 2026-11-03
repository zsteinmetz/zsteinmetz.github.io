'use client';

import { motion } from 'framer-motion';
import HighlightCards from '@/components/highlights/HighlightCards';
import { useMessages } from '@/lib/i18n/useMessages';
import type { HighlightItem } from '@/types/page';

interface HighlightsProps {
    items: HighlightItem[];
    title?: string;
    color?: string;
    columns?: number;
}

/** Homepage section: heading plus the reusable highlight card grid. */
export default function Highlights({ items, title, color, columns }: HighlightsProps) {
    const messages = useMessages();
    // An explicitly empty title ("") hides the heading; omitting it falls back to the localized default.
    const resolvedTitle = title === undefined ? messages.home.highlights : title;

    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
        >
            {resolvedTitle && (
                <h2 className="text-2xl font-serif font-bold text-primary mb-4">{resolvedTitle}</h2>
            )}
            <HighlightCards items={items} color={color} columns={columns} />
        </motion.section>
    );
}
