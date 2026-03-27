/** New catalog id for locally created products. */
export function createProductId(): string {
  const t = Date.now().toString(36);
  const r =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID().replace(/-/g, "").slice(0, 8)
      : Math.random().toString(36).slice(2, 10);
  return `prod-${t}-${r}`;
}
