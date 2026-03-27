import type { Metadata } from "next";

import { ProductForm } from "@/components/dashboard/product-form";

export const metadata: Metadata = {
  title: "New product",
  description: "Create a catalog entry — saved to localStorage.",
};

export default function DashboardNewProductPage() {
  return <ProductForm mode="create" />;
}
