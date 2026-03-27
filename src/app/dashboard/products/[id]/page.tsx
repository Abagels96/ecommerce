import type { Metadata } from "next";

import { EditProductPageClient } from "@/components/dashboard/edit-product-page-client";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Edit product",
    description: "Edit a catalog product — saves to localStorage.",
  };
}

export default async function DashboardEditProductPage({ params }: PageProps) {
  const { id } = await params;
  return <EditProductPageClient productId={id} />;
}
