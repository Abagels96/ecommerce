import { products as seedProducts } from "@/data/products";
import { getStoredProducts } from "@/lib/storage";
import type { Product } from "@/types";

/**
 * Admin / client catalog: use persisted list when present, otherwise seed data.
 * Safe on SSR (`getStoredProducts` returns null → seed copy).
 */
export function getMergedProducts(): Product[] {
  const stored = getStoredProducts();
  return stored ?? [...seedProducts];
}

/** Resolve a product from the merged catalog (seed + localStorage overrides). */
export function findMergedProductById(id: string): Product | undefined {
  return getMergedProducts().find((p) => p.id === id);
}

/** Same-category related products from the merged catalog. */
export function getRelatedProductsMerged(
  productId: string,
  limit = 4,
): Product[] {
  const merged = getMergedProducts();
  const product = merged.find((p) => p.id === productId);
  if (!product) return [];
  return merged
    .filter((p) => p.id !== productId && p.category === product.category)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);
}
