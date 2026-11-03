'use client';

import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { markdownComponents } from '@/components/ui/MarkdownComponents';
import { useMessages } from '@/lib/i18n/useMessages';

interface AboutProps {
    content: string;
    title?: string;
}

export default function About({ content, title }: AboutProps) {
    const messages = useMessages();
    // An explicitly empty title ("") hides the heading; omitting it falls back to the localized default.
    const resolvedTitle = title === undefined ? messages.home.about : title;

    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
        >
            {resolvedTitle && (
                <h2 className="text-2xl font-serif font-bold text-primary mb-4">{resolvedTitle}</h2>
            )}
            <div className="text-neutral-700 dark:text-neutral-600 leading-relaxed">
                <ReactMarkdown
                    components={markdownComponents}
                >
                    {content}
                </ReactMarkdown>
            </div>
        </motion.section>
    );
}
