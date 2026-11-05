'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import {
    MagnifyingGlassIcon,
    FunnelIcon,
    CalendarIcon,
    BookOpenIcon,
    ClipboardDocumentIcon,
    DocumentTextIcon,
    ArrowTopRightOnSquareIcon,
    ChartBarIcon,
    CodeBracketIcon,
    DocumentArrowDownIcon,
    PaperClipIcon
} from '@heroicons/react/24/outline';
import { Publication } from '@/types/publication';
import { PublicationPageConfig } from '@/types/page';
import { cn } from '@/lib/utils';
import { useMessages } from '@/lib/i18n/useMessages';
import FormattedBibTeXText from './FormattedBibTeXText';
import MetricsSummaryRow from './MetricsSummaryRow';
import type { PublicationMetricsSummary } from '@/lib/metrics';

interface PublicationsListProps {
    config: PublicationPageConfig;
    publications: Publication[];
    metrics?: PublicationMetricsSummary;
    embedded?: boolean;
}

// Sort modes for the publications list: "newest" keeps the parser's
// newest-first order; "cited" sorts by OpenAlex citation count.
type SortMode = 'newest' | 'cited';

export default function PublicationsList({ config, publications, metrics, embedded = false }: PublicationsListProps) {
    const messages = useMessages();
    const [searchQuery, setSearchQuery] = useState('');
    // Multiple years can be selected at once; an empty set means "all years".
    const [selectedYears, setSelectedYears] = useState<Set<number>>(new Set());
    const [selectedType, setSelectedType] = useState<string | 'all'>('all');
    const [sortMode, setSortMode] = useState<SortMode>('newest');
    const [showFilters, setShowFilters] = useState(false);
    const [expandedBibtexId, setExpandedBibtexId] = useState<string | null>(null);
    const [expandedAbstractId, setExpandedAbstractId] = useState<string | null>(null);

    // Extract unique years and types for filters
    const years = useMemo(() => {
        const uniqueYears = Array.from(new Set(publications.map(p => p.year)));
        return uniqueYears.sort((a, b) => b - a);
    }, [publications]);

    const types = useMemo(() => {
        const uniqueTypes = Array.from(new Set(publications.map(p => p.type)));
        return uniqueTypes.sort();
    }, [publications]);

    // Filter publications, then apply the active sort order
    const filteredPublications = useMemo(() => {
        const filtered = publications.filter(pub => {
            const matchesSearch =
                pub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                pub.authors.some(author => author.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
                pub.journal?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                pub.conference?.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesYear = selectedYears.size === 0 || selectedYears.has(pub.year);
            const matchesType = selectedType === 'all' || pub.type === selectedType;

            return matchesSearch && matchesYear && matchesType;
        });

        if (sortMode === 'cited') {
            // Most cited first (publications without metrics count as 0);
            // ties are broken deterministically by year, then title.
            return [...filtered].sort((a, b) =>
                (b.citations ?? 0) - (a.citations ?? 0) ||
                b.year - a.year ||
                a.title.localeCompare(b.title)
            );
        }

        // Default: newest first (the parser's order)
        return filtered;
    }, [publications, searchQuery, selectedYears, selectedType, sortMode]);

    // Toggle a year chip on/off (multi-select)
    const toggleYear = (year: number) => {
        setSelectedYears(current => {
            const next = new Set(current);
            if (next.has(year)) {
                next.delete(year);
            } else {
                next.add(year);
            }
            return next;
        });
    };

    // Result count line: split the localized string around the {count} and
    // {total} placeholders so the numbers can be rendered bold.
    const [resultCountPrefix, resultCountRest] = messages.publications.resultCount.split('{count}');
    const [resultCountMiddle, resultCountSuffix] = (resultCountRest ?? '').split('{total}');

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
        >
            {(config.title || config.description || metrics) && (
                <div className={metrics ? "mb-4" : "mb-8"}>
                    {/* An empty title ("") hides the page heading */}
                    {config.title && (
                        <h1 className={`${embedded ? "text-2xl" : "text-4xl"} font-serif font-bold text-primary mb-4`}>{config.title}</h1>
                    )}
                    {config.description && (
                        <p className={`${embedded ? "text-base" : "text-lg"} text-neutral-600 dark:text-neutral-500 max-w-2xl`}>
                            {config.description}
                        </p>
                    )}
                {metrics && (
                    <MetricsSummaryRow metrics={metrics} />
                )}
            </div>
            )}

            {/* Search and Filter Controls */}
            <div className="mb-8 space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-grow">
                        <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400" />
                        <input
                            type="text"
                            placeholder={messages.publications.searchPlaceholder}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-neutral-200 bg-card focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200"
                        />
                    </div>
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className={cn(
                            "flex items-center justify-center px-4 py-2 rounded-lg border transition-all duration-200",
                            showFilters
                                ? "bg-accent text-accent-foreground border-accent"
                                : "bg-card border-neutral-200 text-neutral-600 hover:border-accent hover:text-accent-text"
                        )}
                    >
                        <FunnelIcon className="h-5 w-5 mr-2" />
                        {messages.publications.filters}
                    </button>

                    {/* Sort control */}
                    <div
                        role="group"
                        aria-label={messages.publications.sort}
                        className="flex rounded-lg border border-neutral-200 overflow-hidden"
                    >
                        <button
                            onClick={() => setSortMode('newest')}
                            aria-pressed={sortMode === 'newest'}
                            className={cn(
                                "flex-1 sm:flex-none inline-flex items-center justify-center px-4 py-2 text-sm font-medium transition-colors",
                                sortMode === 'newest'
                                    ? "bg-accent text-accent-foreground"
                                    : "bg-card text-neutral-600 hover:text-accent-text"
                            )}
                        >
                            <CalendarIcon className="h-4 w-4 mr-1.5" />
                            {messages.publications.sortNewest}
                        </button>
                        <button
                            onClick={() => setSortMode('cited')}
                            aria-pressed={sortMode === 'cited'}
                            className={cn(
                                "flex-1 sm:flex-none inline-flex items-center justify-center px-4 py-2 text-sm font-medium border-l border-neutral-200 transition-colors",
                                sortMode === 'cited'
                                    ? "bg-accent text-accent-foreground"
                                    : "bg-card text-neutral-600 hover:text-accent-text"
                            )}
                        >
                            <ChartBarIcon className="h-4 w-4 mr-1.5" />
                            {messages.publications.sortCited}
                        </button>
                    </div>
                </div>

                <AnimatePresence>
                    {showFilters && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden"
                        >
                            <div className="p-4 bg-neutral-100 rounded-lg border border-neutral-200 flex flex-wrap gap-6">
                                {/* Year Filter */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-neutral-700 flex items-center">
                                        <CalendarIcon className="h-4 w-4 mr-1" /> {messages.publications.year}
                                    </label>
                                    <div className="flex flex-wrap gap-2">
                                        <button
                                            onClick={() => setSelectedYears(new Set())}
                                            aria-label={`${messages.publications.year}: ${messages.common.all}`}
                                            aria-pressed={selectedYears.size === 0}
                                            className={cn(
                                                "px-3 py-1 text-xs rounded-full transition-colors",
                                                selectedYears.size === 0
                                                    ? "bg-accent text-accent-foreground"
                                                    : "bg-card text-neutral-600 hover:bg-neutral-200"
                                            )}
                                        >
                                            {messages.common.all}
                                        </button>
                                        {years.map(year => (
                                            <button
                                                key={year}
                                                onClick={() => toggleYear(year)}
                                                aria-pressed={selectedYears.has(year)}
                                                className={cn(
                                                    "px-3 py-1 text-xs rounded-full transition-colors",
                                                    selectedYears.has(year)
                                                        ? "bg-accent text-accent-foreground"
                                                        : "bg-card text-neutral-600 hover:bg-neutral-200"
                                                )}
                                            >
                                                {year}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Type Filter */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-neutral-700 flex items-center">
                                        <BookOpenIcon className="h-4 w-4 mr-1" /> {messages.publications.type}
                                    </label>
                                    <div className="flex flex-wrap gap-2">
                                        <button
                                            onClick={() => setSelectedType('all')}
                                            aria-pressed={selectedType === 'all'}
                                            className={cn(
                                                "px-3 py-1 text-xs rounded-full transition-colors",
                                                selectedType === 'all'
                                                    ? "bg-accent text-accent-foreground"
                                                    : "bg-card text-neutral-600 hover:bg-neutral-200"
                                            )}
                                        >
                                            {messages.common.all}
                                        </button>
                                        {types.map(type => (
                                            <button
                                                key={type}
                                                onClick={() => setSelectedType(type)}
                                                aria-pressed={selectedType === type}
                                                className={cn(
                                                    "px-3 py-1 text-xs rounded-full capitalize transition-colors",
                                                    selectedType === type
                                                        ? "bg-accent text-accent-foreground"
                                                        : "bg-card text-neutral-600 hover:bg-neutral-200"
                                                )}
                                            >
                                                {type.replace('-', ' ')}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Result count */}
            <p className="mb-6 text-sm text-right text-neutral-500 dark:text-neutral-400">
                {resultCountPrefix}
                <span className="font-semibold tabular-nums">{filteredPublications.length}</span>
                {resultCountMiddle}
                <span className="font-semibold tabular-nums">{publications.length}</span>
                {resultCountSuffix}
            </p>

            {/* Publications Grid */}
            <div className="space-y-6">
                {filteredPublications.length === 0 ? (
                    <div className="text-center py-12 text-neutral-500">
                        {messages.publications.noResults}
                    </div>
                ) : (
                    filteredPublications.map((pub, index) => (
                        <motion.div
                            key={pub.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.1 * index }}
                            className="bg-card p-6 rounded-xl shadow-sm border border-neutral-200 hover:shadow-md transition-all duration-200"
                        >
                            <div className="flex flex-col md:flex-row gap-6">
                                {pub.preview && (
                                    <div className="w-full md:w-48 flex-shrink-0">
                                        <div className="aspect-video md:aspect-[4/3] relative rounded-lg overflow-hidden bg-neutral-100">
                                            <Image
                                                src={`/papers/${pub.preview}`}
                                                alt={pub.title}
                                                fill
                                                className="object-cover"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            />
                                        </div>
                                    </div>
                                )}
                                <div className="flex-grow">
                                    <h3 className={`${embedded ? "text-lg" : "text-xl"} font-semibold text-primary mb-2 leading-tight`}>
                                        <FormattedBibTeXText nodes={pub.titleNodes} fallback={pub.title} />
                                    </h3>
                                    <p className={`${embedded ? "text-sm" : "text-base"} text-neutral-600 dark:text-neutral-400 mb-2`}>
                                        {pub.authors.map((author, idx) => (
                                            <span key={idx}>
                                                <span className={`${author.isHighlighted ? 'font-semibold text-accent-text' : ''} ${author.isCoAuthor ? `underline underline-offset-4 ${author.isHighlighted ? 'decoration-accent' : 'decoration-neutral-400'}` : ''}`}>
                                                    {author.name}
                                                </span>
                                                {author.isCorresponding && (
                                                    <span className={`ml-0 ${author.isHighlighted ? 'text-accent-text' : 'text-neutral-600 dark:text-neutral-400'}`}>*</span>
                                                )}
                                                {idx < pub.authors.length - 1 && ', '}
                                            </span>
                                        ))}
                                    </p>
                                    <p className="text-sm font-medium text-neutral-800 dark:text-neutral-600 mb-3">
                                        {pub.journal || pub.conference} {pub.year}
                                    </p>

                                    {pub.description && (
                                        <p className="text-sm text-neutral-600 dark:text-neutral-500 mb-4 line-clamp-3">
                                            {pub.description}
                                        </p>
                                    )}

                                    {/* Action row: Abstract toggle first, then the primary access
                                        links (DOI, PDF, Supplementary, Code), then the BibTeX
                                        details, citation badge last. */}
                                    <div className="flex flex-wrap gap-2 mt-auto">
                                        {pub.abstract && (
                                            <button
                                                onClick={() => setExpandedAbstractId(expandedAbstractId === pub.id ? null : pub.id)}
                                                className={cn(
                                                    "inline-flex items-center px-3 py-1 rounded-md text-xs font-medium transition-colors",
                                                    expandedAbstractId === pub.id
                                                        ? "bg-accent text-accent-foreground"
                                                        : "bg-neutral-100 text-neutral-700 hover:bg-accent hover:text-accent-foreground"
                                                )}
                                            >
                                                <DocumentTextIcon className="h-3 w-3 mr-1.5" />
                                                {messages.publications.abstract}
                                            </button>
                                        )}
                                        {pub.doi && (
                                            <a
                                                href={`https://doi.org/${pub.doi}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                title={messages.publications.doiLink}
                                                aria-label={messages.publications.doiLink}
                                                className="inline-flex items-center px-3 py-1 rounded-md text-xs font-medium bg-neutral-100 text-neutral-700 hover:bg-accent hover:text-accent-foreground transition-colors"
                                            >
                                                <ArrowTopRightOnSquareIcon className="h-3 w-3 mr-1.5" />
                                                DOI
                                            </a>
                                        )}
                                        {pub.pdfUrl && (
                                            <a
                                                href={pub.pdfUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center px-3 py-1 rounded-md text-xs font-medium bg-neutral-100 text-neutral-700 hover:bg-accent hover:text-accent-foreground transition-colors"
                                            >
                                                <DocumentArrowDownIcon className="h-3 w-3 mr-1.5" />
                                                {messages.publications.pdf}
                                            </a>
                                        )}
                                        {pub.suppUrl && (
                                            <a
                                                href={pub.suppUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center px-3 py-1 rounded-md text-xs font-medium bg-neutral-100 text-neutral-700 hover:bg-accent hover:text-accent-foreground transition-colors"
                                            >
                                                <PaperClipIcon className="h-3 w-3 mr-1.5" />
                                                {messages.publications.supplementary}
                                            </a>
                                        )}
                                        {pub.code && (
                                            <a
                                                href={pub.code}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center px-3 py-1 rounded-md text-xs font-medium bg-neutral-100 text-neutral-700 hover:bg-accent hover:text-accent-foreground transition-colors"
                                            >
                                                <CodeBracketIcon className="h-3 w-3 mr-1.5" />
                                                {messages.publications.code}
                                            </a>
                                        )}
                                        {pub.bibtex && (
                                            <button
                                                onClick={() => setExpandedBibtexId(expandedBibtexId === pub.id ? null : pub.id)}
                                                className={cn(
                                                    "inline-flex items-center px-3 py-1 rounded-md text-xs font-medium transition-colors",
                                                    expandedBibtexId === pub.id
                                                        ? "bg-accent text-accent-foreground"
                                                        : "bg-neutral-100 text-neutral-700 hover:bg-accent hover:text-accent-foreground"
                                                )}
                                            >
                                                <BookOpenIcon className="h-3 w-3 mr-1.5" />
                                                {messages.publications.bibtex}
                                            </button>
                                        )}
                                        {typeof pub.citations === 'number' && (
                                            <a
                                                href={pub.openalexId || metrics?.author.openalexId || 'https://openalex.org'}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center px-3 py-1 rounded-md text-xs font-medium bg-neutral-100 text-neutral-700 hover:bg-accent hover:text-accent-foreground transition-colors"
                                            >
                                                {messages.publications.citedBy} {pub.citations}
                                            </a>
                                        )}
                                    </div>

                                    <AnimatePresence>
                                        {expandedAbstractId === pub.id && pub.abstract ? (
                                            <motion.div
                                                key="abstract"
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                className="overflow-hidden mt-4"
                                            >
                                                <div className="bg-neutral-100 rounded-lg p-4 border border-neutral-200 dark:border-neutral-700">
                                                    <p className="text-sm text-neutral-600 dark:text-neutral-500 leading-relaxed">
                                                        {pub.abstract}
                                                    </p>
                                                </div>
                                            </motion.div>
                                        ) : null}
                                        {expandedBibtexId === pub.id && pub.bibtex ? (
                                            <motion.div
                                                key="bibtex"
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                className="overflow-hidden mt-4"
                                            >
                                                <div className="relative bg-neutral-100 rounded-lg p-4 border border-neutral-200 dark:border-neutral-700">
                                                    <pre className="text-xs text-neutral-600 dark:text-neutral-500 overflow-x-auto whitespace-pre-wrap font-mono">
                                                        {pub.bibtex}
                                                    </pre>
                                                    <button
                                                        onClick={() => {
                                                            navigator.clipboard.writeText(pub.bibtex || '');
                                                            // Optional: Show copied feedback
                                                        }}
                                                        className="absolute top-2 right-2 p-1.5 rounded-md bg-white dark:bg-neutral-700 text-neutral-500 hover:text-accent-text shadow-sm border border-neutral-200 dark:border-neutral-600 transition-colors"
                                                        title={messages.common.copyToClipboard}
                                                    >
                                                        <ClipboardDocumentIcon className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </motion.div>
                                        ) : null}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </motion.div>
                    ))
                )}
            </div>
        </motion.div>
    );
}
