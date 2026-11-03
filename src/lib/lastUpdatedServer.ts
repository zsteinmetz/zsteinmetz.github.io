// Server-side "last updated" computation. Kept separate from client-safe
// helpers so client components never pull Node's 'fs'/'child_process' into
// the client bundle. Mirrors the offline-first pattern used for the citation
// metrics: the value is computed from local sources only (git history and
// file mtimes), so it works offline, on fresh clones, and in CI.
import { execSync } from 'node:child_process';
import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();

let cachedIso: string | null = null;

/**
 * Content directories that drive the "last updated" date: the default
 * locale's content/ plus every content_<locale>/ override directory found
 * at the repository root.
 */
function getContentDirs(): string[] {
  const dirs: string[] = [];
  const contentPath = path.join(ROOT, 'content');
  if (fs.existsSync(contentPath)) dirs.push('content');

  try {
    for (const entry of fs.readdirSync(ROOT, { withFileTypes: true })) {
      if (entry.isDirectory() && entry.name.startsWith('content_')) {
        dirs.push(entry.name);
      }
    }
  } catch {
    // Unreadable root: fall back to whatever was found so far.
  }

  return dirs;
}

function runGit(args: string): string | null {
  try {
    return execSync(`git --no-pager ${args}`, {
      cwd: ROOT,
      stdio: ['ignore', 'pipe', 'ignore'],
      encoding: 'utf-8',
      timeout: 5000,
    }).trim();
  } catch {
    return null;
  }
}

/**
 * Latest git commit date (ISO 8601) touching the content and public trees.
 * Returns null when git is unavailable or the repository has no commits for
 * those paths (e.g. an exported source tree without .git). Commit dates are
 * used — rather than checkout-time file mtimes — so rebuilds of unchanged
 * content (like the weekly metrics-only deploy) do not bump the date.
 */
function getGitDate(contentDirs: string[]): string | null {
  const output = runGit(`log -1 --format=%cI -- ${quotePaths(contentDirs)}`);
  if (!output) return null;
  return Number.isNaN(new Date(output).getTime()) ? null : output;
}

/** Whether the content/public trees have uncommitted or untracked changes. */
function hasUncommittedChanges(contentDirs: string[]): boolean {
  const output = runGit(`status --porcelain -- ${quotePaths(contentDirs)}`);
  return output !== null && output.length > 0;
}

/** Latest file mtime (ISO 8601) across the content and public trees. */
function getLatestMtime(contentDirs: string[]): string | null {
  let latestMs = 0;

  const walk = (dir: string) => {
    let entries;
    try {
      entries = fs.readdirSync(dir, { withFileTypes: true });
    } catch {
      return;
    }
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (entry.isFile()) {
        try {
          latestMs = Math.max(latestMs, fs.statSync(fullPath).mtimeMs);
        } catch {
          // Ignore unreadable files.
        }
      }
    }
  };

  for (const dir of contentDirs) walk(path.join(ROOT, dir));
  walk(path.join(ROOT, 'public'));

  return latestMs > 0 ? new Date(latestMs).toISOString() : null;
}

function quotePaths(contentDirs: string[]): string {
  return [...contentDirs, 'public'].map((dir) => `"${dir}"`).join(' ');
}

function latestOf(a: string, b: string): string {
  return new Date(a).getTime() >= new Date(b).getTime() ? a : b;
}

/**
 * Build-time "last updated" date for the site, as an ISO 8601 string.
 *
 * Prefers the latest git commit touching the content and public trees; when
 * those trees have uncommitted changes, the latest file mtime wins so edits
 * are reflected immediately (dev server, local builds). When git is not
 * available at all, file mtimes are used; as a last resort, the current
 * date. The result is memoized per process.
 */
export function getLastUpdatedIso(): string {
  if (cachedIso) return cachedIso;

  const contentDirs = getContentDirs();
  const gitDate = getGitDate(contentDirs);

  let iso: string;
  if (gitDate && hasUncommittedChanges(contentDirs)) {
    iso = latestOf(gitDate, getLatestMtime(contentDirs) || gitDate);
  } else {
    iso = gitDate || getLatestMtime(contentDirs) || new Date().toISOString();
  }

  cachedIso = iso;
  return iso;
}
