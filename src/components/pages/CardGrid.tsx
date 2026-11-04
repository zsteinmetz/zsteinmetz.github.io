'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import { markdownComponents } from '@/components/ui/MarkdownComponents';
import { CardItem } from '@/types/page';

/**
 * Shared grid of card items (title, subtitle, date, markdown content, tags,
 * optional teaser image). Used by `card`-type pages and `card` sections.
 */
export default function CardGrid({ items, embedded = false }: { items: CardItem[]; embedded?: boolean }) {
    return (
        <div className={`grid ${embedded ? 'gap-4' : 'gap-6'}`}>
            {items.map((item, index) => {
                const body = (
                    <>
                        <div className="flex justify-between items-start mb-2">
                            <h3 className={`${embedded ? 'text-lg' : 'text-xl'} font-semibold text-primary`}>{item.title}</h3>
                            {item.date && (
                                <span className="text-sm text-neutral-500 font-medium bg-neutral-100 px-2 py-1 rounded">
                                    {item.date}
                                </span>
                            )}
                        </div>
                        {item.subtitle && (
                            <p className={`${embedded ? 'text-sm' : 'text-base'} text-accent-text font-medium mb-3`}>{item.subtitle}</p>
                        )}
                        {item.content && (
                            <div className={`${embedded ? 'text-sm' : 'text-base'} text-neutral-600 dark:text-neutral-500 leading-relaxed`}>
                                <ReactMarkdown components={markdownComponents}>
                                    {item.content}
                                </ReactMarkdown>
                            </div>
                        )}
                        {item.tags && (
                            <div className="flex flex-wrap gap-2 mt-4">
                                {item.tags.map(tag => (
                                    <span key={tag} className="text-xs text-neutral-500 bg-neutral-100 px-2 py-1 rounded border border-neutral-200">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}
                    </>
                );

                return (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 * index }}
                        className={`bg-card ${embedded ? 'p-4' : 'p-6'} rounded-xl shadow-sm border border-neutral-200 hover:shadow-lg transition-all duration-200 hover:scale-[1.01]`}
                    >
                        {item.image ? (
                            <div className="flex flex-col sm:flex-row gap-4">
                                <div className="w-full sm:w-48 flex-shrink-0">
                                    <div className="aspect-video sm:aspect-[4/3] relative rounded-lg overflow-hidden bg-neutral-100 border border-neutral-200">
                                        <Image
                                            src={item.image}
                                            alt={item.imageAlt || ''}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 640px) 100vw, 12rem"
                                        />
                                    </div>
                                </div>
                                <div className="flex-grow min-w-0">
                                    {body}
                                </div>
                            </div>
                        ) : (
                            body
                        )}
                    </motion.div>
                );
            })}
        </div>
    );
}