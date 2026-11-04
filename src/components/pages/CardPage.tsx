'use client';

import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { markdownComponents } from '@/components/ui/MarkdownComponents';
import CardGrid from '@/components/pages/CardGrid';
import { CardPageConfig } from '@/types/page';

export default function CardPage({ config, embedded = false }: { config: CardPageConfig; embedded?: boolean }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
        >
            {(config.title || config.description) && (
                <div className={embedded ? "mb-4" : "mb-8"}>
                    {/* An empty title ("") hides the page heading */}
                    {config.title && (
                        <h1 className={`${embedded ? "text-2xl" : "text-4xl"} font-serif font-bold text-primary mb-4`}>{config.title}</h1>
                    )}
                    {config.description && (
                        <div className={`${embedded ? "text-base" : "text-lg"} text-neutral-600 dark:text-neutral-500 max-w-2xl leading-relaxed`}>
                            <ReactMarkdown components={markdownComponents}>
                                {config.description}
                            </ReactMarkdown>
                        </div>
                    )}
                </div>
            )}

            <CardGrid items={config.items} embedded={embedded} />
        </motion.div>
    );
}
