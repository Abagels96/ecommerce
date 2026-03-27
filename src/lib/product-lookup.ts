import { getMergedProducts } from "@/lib/catalog";
import type { Product } from "@/types";

/**
 * Resolves a product by `id` first, then by URL-style `slug` in the merged catalog.
 */
export function resolveProduct(ref: string): Product | undefined {
  const key = ref.trim();
  if (!key) return undefined;
  const merged = getMergedProducts();
  return merged.find((p) => p.id === key) ?? merged.find((p) => p.slug === key);
}

export function isKnownProductRef(ref: string): boolean {
  return resolveProduct(ref) !== undefined;
}
