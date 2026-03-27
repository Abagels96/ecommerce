import type { Metadata } from "next";

import { DashboardProductsClient } from "@/components/dashboard/dashboard-products-client";

export const metadata: Metadata = {
  title: "Products",
  description: "Manage catalog — localStorage overrides with seed fallback.",
};

export default function DashboardProductsPage() {
  return <DashboardProductsClient />;
}
