'use client';

import { ChartBarIcon } from '@heroicons/react/24/outline';
import { cn } from '@/lib/utils';
import { useMessages } from '@/lib/i18n/useMessages';
import { useLocaleStore } from '@/lib/stores/localeStore';
import { formatMetricsDate, type PublicationMetricsSummary } from '@/lib/metrics';

interface MetricsSummaryRowProps {
    metrics: PublicationMetricsSummary;
    className?: string;
}

/**
 * Author citation metrics strip: total citations, h-index, OpenAlex source
 * link and the date the metrics were last fetched. Shared between the
 * Publications page and the publications section of CV-type pages.
 */
export default function MetricsSummaryRow({ metrics, className }: MetricsSummaryRowProps) {
    const messages = useMessages();
    const locale = useLocaleStore((state) => state.locale);

    return (
        <div className={cn("mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-neutral-600 dark:text-neutral-500", className)}>
            <span className="inline-flex items-center gap-1.5 font-medium text-neutral-700 dark:text-neutral-400">
                <ChartBarIcon className="h-4 w-4" aria-hidden="true" />
                {metrics.author.citedByCount} {messages.publications.citationsTotal}
            </span>
            <span className="inline-flex items-center gap-1.5 font-medium text-neutral-700 dark:text-neutral-400">h-index {metrics.author.hIndex}</span>
            <a
                href={metrics.author.openalexId}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-colors"
            >
                {messages.publications.metricsSource}
            </a>
            <span className="text-xs">
                {messages.publications.metricsUpdated} {formatMetricsDate(metrics.fetchedAt, locale)}
            </span>
        </div>
    );
}
