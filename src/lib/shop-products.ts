import type { Product } from "@/types";

export type ShopSort = "newest" | "price-asc" | "price-desc";

export function getProductCategories(products: Product[]): string[] {
  return [...new Set(products.map((p) => p.category))].sort((a, b) =>
    a.localeCompare(b),
  );
}

export function filterShopProducts(
  products: Product[],
  {
    search,
    category,
  }: {
    search: string;
    category: string | "all";
  },
): Product[] {
  let list = products;
  const q = search.trim().toLowerCase();
  if (q) {
    list = list.filter((p) => p.name.toLowerCase().includes(q));
  }
  if (category && category !== "all") {
    list = list.filter((p) => p.category === category);
  }
  return list;
}

export function sortShopProducts(products: Product[], sort: ShopSort): Product[] {
  const list = [...products];
  switch (sort) {
    case "newest":
      return list.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
    case "price-asc":
      return list.sort((a, b) => a.price - b.price);
    case "price-desc":
      return list.sort((a, b) => b.price - a.price);
    default:
      return list;
  }
}
