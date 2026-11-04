'use client';

import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { markdownComponents } from '@/components/ui/MarkdownComponents';
import SectionRenderer from '@/components/pages/SectionRenderer';
import type { SectionsPageConfig, SectionConfig } from '@/types/page';

interface SectionsPageProps {
    config: SectionsPageConfig;
    /** Sections resolved by processSections (content loaded, publications filtered). */
    sections: SectionConfig[];
}

/**
 * Page composed of `[[sections]]` blocks — the homepage's composition model
 * (markdown, highlight, publications, list, card) on its own route.
 */
export default function SectionsPage({ config, sections }: SectionsPageProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
        >
            {/* An empty title ("") hides the page heading */}
            {config.title && (
                <h1 className="text-4xl font-serif font-bold text-primary mb-4">{config.title}</h1>
            )}
            {config.description && (
                <div className="mb-8 max-w-2xl text-lg leading-relaxed text-neutral-600 dark:text-neutral-500">
                    <ReactMarkdown components={markdownComponents}>
                        {config.description}
                    </ReactMarkdown>
                </div>
            )}

            <div className="space-y-8">
                {sections.map((section) => (
                    <section key={section.id} id={section.id} className="scroll-mt-24">
                        <SectionRenderer section={section} />
                    </section>
                ))}
            </div>
        </motion.div>
    );
}