/** Deterministic-looking demo id for mock orders (not cryptographically secure). */
export function generateOrderId(): string {
  const time = Date.now().toString(36).toUpperCase();
  let suffix: string;
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    suffix = crypto.randomUUID().replace(/-/g, "").slice(0, 10).toUpperCase();
  } else {
    suffix = Math.random().toString(36).slice(2, 12).toUpperCase();
  }
  return `ORD-${time}-${suffix}`;
}
