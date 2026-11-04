import type { Components } from 'react-markdown';

// Shared react-markdown element styling used by Markdown-rendering pages.
export const markdownComponents: Components = {
    h1: ({ children }) => <h1 className="text-3xl font-serif font-bold text-primary mt-8 mb-4">{children}</h1>,
    h2: ({ children }) => <h2 className="text-2xl font-serif font-bold text-primary mt-8 mb-4 border-b border-neutral-200 pb-2">{children}</h2>,
    h3: ({ children }) => <h3 className="text-xl font-semibold text-primary mt-6 mb-3">{children}</h3>,
    h4: ({ children }) => <h4 className="text-lg font-semibold text-primary mt-6 mb-3">{children}</h4>,
    p: ({ children }) => <p className="mb-4 last:mb-0">{children}</p>,
    ul: ({ children }) => <ul className="list-disc list-outside mb-4 space-y-1 pl-5">{children}</ul>,
    ol: ({ children }) => <ol className="list-decimal list-outside mb-4 space-y-1 pl-5">{children}</ol>,
    li: ({ children }) => <li className="mb-1">{children}</li>,
    a: ({ href, children, ...props }) => {
        // react-markdown passes its AST `node` prop through to the element;
        // strip it so it does not leak into the DOM as node="[object Object]".
        const anchorProps = { ...props } as Record<string, unknown>;
        delete anchorProps.node;
        // Open external links in a new tab, but keep internal site links
        // (e.g. /research) in the same tab.
        const isExternal = typeof href === 'string' && /^https?:\/\//.test(href);
        return (
            <a
                href={href}
                {...anchorProps}
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noopener noreferrer' : undefined}
                className="text-accent-text font-medium transition-all duration-200 rounded hover:bg-accent/10 hover:shadow-sm"
            >
                {children}
            </a>
        );
    },
    blockquote: ({ children }) => (
        <blockquote className="border-l-4 border-accent/50 pl-4 italic my-4 text-neutral-600 dark:text-neutral-500">
            {children}
        </blockquote>
    ),
    strong: ({ children }) => <strong className="font-semibold text-primary">{children}</strong>,
    em: ({ children }) => <em className="italic text-neutral-600 dark:text-neutral-500">{children}</em>,
    code: ({ children }) => (
        <code className="px-1.5 py-0.5 rounded bg-neutral-100 text-[0.95em]">{children}</code>
    ),
};
