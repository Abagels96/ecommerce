"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { buttonClassName } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { getMergedProducts } from "@/lib/catalog";
import type { Product } from "@/types";

import { ProductForm } from "./product-form";

export function EditProductPageClient({ productId }: { productId: string }) {
  const [product, setProduct] = useState<Product | null | undefined>(undefined);

  useEffect(() => {
    const merged = getMergedProducts();
    setProduct(merged.find((p) => p.id === productId) ?? null);
  }, [productId]);

  if (product === undefined) {
    return (
      <div className="mx-auto max-w-3xl space-y-8" aria-busy="true" aria-label="Loading product">
        <div className="space-y-3">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-9 w-56 max-w-full" />
          <Skeleton className="h-4 w-full max-w-md" />
        </div>
        <div className="surface-card space-y-6 p-6 sm:p-8">
          <div className="grid gap-6 sm:grid-cols-2">
            <Skeleton className="h-11 sm:col-span-2" />
            <Skeleton className="h-11" />
            <Skeleton className="h-11" />
            <Skeleton className="h-11" />
            <Skeleton className="h-11" />
            <Skeleton className="h-11 sm:col-span-2" />
            <Skeleton className="h-24 sm:col-span-2" />
          </div>
          <div className="flex gap-4 border-t border-zinc-100 pt-6 dark:border-zinc-800">
            <Skeleton className="h-10 w-36" />
            <Skeleton className="h-10 w-24" />
          </div>
        </div>
      </div>
    );
  }

  if (product === null) {
    return (
      <div className="mx-auto max-w-lg text-center">
        <h1 className="text-balance text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl dark:text-zinc-50">
          Product not found
        </h1>
        <p className="mt-4 text-pretty leading-relaxed text-zinc-600 dark:text-zinc-400">
          No product with ID <span className="font-mono text-sm">{productId}</span>{" "}
          exists in the merged catalog (seed +{" "}
          <code className="rounded bg-zinc-100 px-1 dark:bg-zinc-900">
            ecommerce-mvp:products
          </code>
          ).
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/dashboard/products"
            className={buttonClassName({ variant: "primary", size: "md" })}
          >
            Back to products
          </Link>
          <Link
            href="/dashboard/products/new"
            className={buttonClassName({ variant: "outline", size: "md" })}
          >
            New product
          </Link>
        </div>
      </div>
    );
  }

  return <ProductForm mode="edit" product={product} />;
}
