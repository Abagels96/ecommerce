import type { Metadata } from "next";
import { Suspense } from "react";

import { PageContainer } from "@/components/layout/PageContainer";
import { ShopCatalog } from "@/components/shop/shop-catalog";

import ShopLoading from "./loading";

export const metadata: Metadata = {
  title: "Shop",
  description: "Browse the mock catalog — search, filter, and sort in the browser.",
};

export default function ShopPage() {
  return (
    <PageContainer>
      <Suspense fallback={<ShopLoading />}>
        <ShopCatalog />
      </Suspense>
    </PageContainer>
  );
}
