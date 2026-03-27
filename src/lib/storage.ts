import type { MockOrder, Product } from "@/types";

export const STORAGE_KEYS = {
  /** Optional override / extension list persisted by the app (e.g. admin demo). */
  PRODUCTS: "ecommerce-mvp:products",
  /** Mock checkout orders (JSON array). */
  MOCK_ORDERS: "mock_orders",
} as const;

function isBrowser(): boolean {
  return (
    typeof window !== "undefined" && typeof window.localStorage !== "undefined"
  );
}

function readRaw(key: string): string | null {
  if (!isBrowser()) return null;
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeRaw(key: string, value: string): boolean {
  if (!isBrowser()) return false;
  try {
    window.localStorage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
}

function isProductRecord(value: unknown): value is Product {
  if (!value || typeof value !== "object") return false;
  const o = value as Record<string, unknown>;
  return (
    typeof o.id === "string" &&
    typeof o.name === "string" &&
    typeof o.slug === "string" &&
    typeof o.description === "string" &&
    typeof o.price === "number" &&
    typeof o.image === "string" &&
    typeof o.category === "string" &&
    typeof o.featured === "boolean" &&
    typeof o.stock === "number" &&
    typeof o.rating === "number" &&
    typeof o.createdAt === "string"
  );
}

function isMockOrderRecord(value: unknown): value is MockOrder {
  if (!value || typeof value !== "object") return false;
  const o = value as Record<string, unknown>;
  if (
    typeof o.id !== "string" ||
    typeof o.createdAt !== "string" ||
    typeof o.total !== "number" ||
    (o.status !== "pending" &&
      o.status !== "completed" &&
      o.status !== "cancelled") ||
    typeof o.fullName !== "string" ||
    typeof o.email !== "string" ||
    typeof o.address !== "string" ||
    typeof o.city !== "string" ||
    typeof o.phone !== "string"
  ) {
    return false;
  }
  if (!Array.isArray(o.lines)) return false;
  for (const line of o.lines) {
    if (!line || typeof line !== "object") return false;
    const l = line as Record<string, unknown>;
    if (
      typeof l.productId !== "string" ||
      typeof l.quantity !== "number" ||
      typeof l.unitPrice !== "number"
    ) {
      return false;
    }
  }
  return true;
}

/**
 * Reads persisted products. Returns `null` on SSR, missing key, or invalid JSON/shape.
 */
export function getStoredProducts(): Product[] | null {
  const raw = readRaw(STORAGE_KEYS.PRODUCTS);
  if (raw === null) return null;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed) || !parsed.every(isProductRecord)) return null;
    return parsed;
  } catch {
    return null;
  }
}

/**
 * Persists a product list. No-ops on SSR or if storage throws/quota exceeded.
 * Returns whether the write likely succeeded.
 */
export function setStoredProducts(products: Product[]): boolean {
  try {
    return writeRaw(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  } catch {
    return false;
  }
}

/**
 * Clears persisted products. Safe on SSR (no-op).
 */
export function clearStoredProducts(): boolean {
  if (!isBrowser()) return false;
  try {
    window.localStorage.removeItem(STORAGE_KEYS.PRODUCTS);
    return true;
  } catch {
    return false;
  }
}

/**
 * Reads mock orders. Returns `null` on SSR, missing key, or invalid JSON/shape.
 */
export function getMockOrders(): MockOrder[] | null {
  const raw = readRaw(STORAGE_KEYS.MOCK_ORDERS);
  if (raw === null) return null;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed) || !parsed.every(isMockOrderRecord)) return null;
    return parsed;
  } catch {
    return null;
  }
}

/**
 * Persists mock orders. No-ops on SSR when storage is unavailable.
 */
export function setMockOrders(orders: MockOrder[]): boolean {
  try {
    return writeRaw(STORAGE_KEYS.MOCK_ORDERS, JSON.stringify(orders));
  } catch {
    return false;
  }
}

/**
 * Appends a mock order immutably. Loads existing orders when possible.
 */
export function appendMockOrder(order: MockOrder): boolean {
  const existing = getMockOrders();
  const next = [...(existing ?? []), order];
  return setMockOrders(next);
}

/**
 * Clears mock orders. Safe on SSR (no-op).
 */
export function clearMockOrders(): boolean {
  if (!isBrowser()) return false;
  try {
    window.localStorage.removeItem(STORAGE_KEYS.MOCK_ORDERS);
    return true;
  } catch {
    return false;
  }
}
