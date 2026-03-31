/**
 * Prefix for files in `public/` when the app uses `basePath` (e.g. GitHub Pages
 * at username.github.io/repo-name/). Next does not always rewrite `next/image`
 * public URLs in static export, so we join explicitly.
 */
export function publicAsset(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (!base) return normalized;
  return `${base}${normalized}`.replace(/\/{2,}/g, "/");
}
