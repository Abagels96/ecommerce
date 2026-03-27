import type { Metadata } from "next";

import { PageContainer } from "@/components/layout/PageContainer";
import { ShopCatalog } from "@/components/shop/shop-catalog";
import { products } from "@/data/products";

const VALID = new Set(products.map((p) => p.category));

export const metadata: Metadata = {
  title: "Shop",
  description: "Browse the mock catalog — search, filter, and sort in the browser.",
};

type PageProps = {
  searchParams: Promise<{ category?: string }>;
};

export default async function ShopPage({ searchParams }: PageProps) {
  const { category } = await searchParams;
  const raw = category?.toLowerCase().trim();
  const initialCategory =
    raw && VALID.has(raw) ? raw : undefined;

  return (
    <PageContainer>
      <ShopCatalog initialCategory={initialCategory} />
    </PageContainer>
  );
}
