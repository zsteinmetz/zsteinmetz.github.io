'use client';

import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { markdownComponents } from '@/components/ui/MarkdownComponents';

interface HeroProps {
    hero: string;
    content: string;
}

// Hero statement opening the homepage: a serif statement followed by
// the supporting intro text, replacing the plain "About" section header.
export default function Hero({ hero, content }: HeroProps) {
    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <h2 className="text-2xl font-serif font-bold text-primary leading-tight">
                {hero}
            </h2>
            <span className="mt-2 block h-px w-12 bg-accent" aria-hidden="true" />
            <div className="mt-6 text-base text-neutral-700 dark:text-neutral-600 leading-relaxed">
                <ReactMarkdown components={markdownComponents}>
                    {content}
                </ReactMarkdown>
            </div>
        </motion.section>
    );
}