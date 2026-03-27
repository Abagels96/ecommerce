"use client";

import Link from "next/link";
import { useMemo } from "react";

import { buttonClassName } from "@/components/ui/button";
import { getMergedProducts } from "@/lib/catalog";
import type { Product } from "@/types";

import { ProductForm } from "./product-form";

export function EditProductPageClient({ productId }: { productId: string }) {
  const product = useMemo<Product | null>(() => {
    const merged = getMergedProducts();
    return merged.find((p) => p.id === productId) ?? null;
  }, [productId]);

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
