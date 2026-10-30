// Type declarations for the untyped bibtex-parse-js package (CommonJS).
declare module 'bibtex-parse-js' {
  export interface BibTeXEntry {
    entryType: string;
    citationKey: string;
    entryTags: Record<string, string>;
  }

  export function toJSON(bibtex: string): BibTeXEntry[];
}
