"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { PageContainer } from "@/components/layout/PageContainer";
import { ProductPurchasePanel } from "@/components/product/product-purchase-panel";
import { ProductGrid } from "@/components/products/ProductGrid";
import { ProductStockBadge } from "@/components/products/stock-badge";
import { Badge } from "@/components/ui/badge";
import { buttonClassName } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  findMergedProductById,
  getRelatedProductsMerged,
} from "@/lib/catalog";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/types";

export function ProductDetailPageClient({ productId }: { productId: string }) {
  const [product, setProduct] = useState<Product | null | undefined>(undefined);

  useEffect(() => {
    setProduct(findMergedProductById(productId) ?? null);
  }, [productId]);

  if (product === undefined) {
    return (
      <PageContainer className="pb-16 sm:pb-20">
        <Skeleton className="h-4 w-64 max-w-full" />
        <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-12">
          <Skeleton className="aspect-square w-full rounded-2xl" />
          <div className="space-y-4">
            <div className="flex gap-2">
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-6 w-16 rounded-full" />
            </div>
            <Skeleton className="h-10 w-full max-w-md" />
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-24 w-full" />
          </div>
        </div>
      </PageContainer>
    );
  }

  if (product === null) {
    return (
      <PageContainer className="py-16 sm:py-24">
        <div className="mx-auto max-w-lg text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Product
          </p>
          <h1 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            We couldn&apos;t find that product
          </h1>
          <p className="mt-4 text-pretty leading-relaxed text-zinc-600 dark:text-zinc-400">
            This ID isn&apos;t in the merged catalog (seed + localStorage). Try
            the shop or add one from the dashboard.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/shop"
              className={buttonClassName({ variant: "primary", size: "md" })}
            >
              Browse shop
            </Link>
            <Link
              href="/"
              className={buttonClassName({ variant: "outline", size: "md" })}
            >
              Back to home
            </Link>
          </div>
        </div>
      </PageContainer>
    );
  }

  const related = getRelatedProductsMerged(product.id, 4);

  return (
    <PageContainer className="pb-16 sm:pb-20">
      <nav
        className="text-sm text-zinc-500 dark:text-zinc-400"
        aria-label="Breadcrumb"
      >
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link
              href="/"
              className="transition-colors hover:text-zinc-800 hover:underline dark:hover:text-zinc-200"
            >
              Home
            </Link>
          </li>
          <li aria-hidden className="text-zinc-300 dark:text-zinc-600">
            /
          </li>
          <li>
            <Link
              href="/shop"
              className="transition-colors hover:text-zinc-800 hover:underline dark:hover:text-zinc-200"
            >
              Shop
            </Link>
          </li>
          <li aria-hidden className="text-zinc-300 dark:text-zinc-600">
            /
          </li>
          <li className="font-medium text-zinc-700 dark:text-zinc-300">
            {product.name}
          </li>
        </ol>
      </nav>

      <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-12">
        <div className="surface-card relative aspect-square overflow-hidden bg-zinc-100 dark:bg-zinc-900">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        </div>

        <div className="flex flex-col">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" size="md" className="capitalize">
              {product.category}
            </Badge>
            <ProductStockBadge stock={product.stock} />
          </div>

          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
            {product.name}
          </h1>

          <p className="mt-2 text-3xl font-semibold tabular-nums tracking-tight text-zinc-900 dark:text-zinc-50">
            {formatPrice(product.price)}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-zinc-600 dark:text-zinc-400">
            <span
              className="inline-flex items-center gap-1 rounded-lg bg-zinc-100 px-2.5 py-1 font-medium text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200"
              aria-label={`Rated ${product.rating.toFixed(1)} out of 5 stars`}
            >
              <span aria-hidden>★</span>
              <span className="tabular-nums">{product.rating.toFixed(1)}</span>
              <span className="text-zinc-500 dark:text-zinc-400">/ 5</span>
            </span>
            <span className="text-zinc-400 dark:text-zinc-500">·</span>
            <span className="tabular-nums">
              {product.stock > 0
                ? `${product.stock} available`
                : "None available"}
            </span>
          </div>

          <div className="mt-6 border-t border-zinc-200 pt-6 dark:border-zinc-800">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              Description
            </h2>
            <p className="mt-3 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
              {product.description}
            </p>
          </div>

          <ProductPurchasePanel productId={product.id} stock={product.stock} />
        </div>
      </div>

      {related.length > 0 ? (
        <section className="mt-20 border-t border-zinc-200 pt-16 dark:border-zinc-800">
          <div className="mb-10 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                More in {product.category}
              </h2>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                Related picks from the same category in the catalog.
              </p>
            </div>
            <Link
              href={`/shop?category=${encodeURIComponent(product.category)}`}
              className="text-sm font-medium text-zinc-900 underline-offset-4 transition-colors hover:text-zinc-600 hover:underline dark:text-zinc-100 dark:hover:text-zinc-300"
            >
              View all in category
            </Link>
          </div>
          <ProductGrid products={related} />
        </section>
      ) : null}
    </PageContainer>
  );
}
