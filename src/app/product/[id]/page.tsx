import type { Metadata } from "next";

import { ProductDetailPageClient } from "@/components/product/product-detail-page-client";
import { getProductById } from "@/data/products";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) {
    return {
      title: "Product",
      description: "Product detail — local catalog with mock data.",
    };
  }
  return {
    title: product.name,
    description: product.description.slice(0, 160),
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;
  return <ProductDetailPageClient productId={id} />;
}
