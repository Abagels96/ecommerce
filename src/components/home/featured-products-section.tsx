"use client";

import Link from "next/link";
import { useMemo } from "react";

import { ProductGrid } from "@/components/products/ProductGrid";
import { buttonClassName } from "@/components/ui/button";
import { getMergedProducts } from "@/lib/catalog";

const MAX_FEATURED = 6;

export function FeaturedProductsSection() {
  const catalog = getMergedProducts();

  const featured = useMemo(
    () => catalog.filter((p) => p.featured).slice(0, MAX_FEATURED),
    [catalog],
  );

  return (
    <section className="section-y border-b border-zinc-200/80 dark:border-zinc-800/80">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl dark:text-zinc-50">
              Featured picks
            </h2>
            <p className="mt-3 max-w-xl text-pretty text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
              Highlights from the merged catalog — desk tech, mom & baby, and home
              picks marked featured in seed data or in admin.
            </p>
          </div>
          <Link
            href="/shop"
            className={buttonClassName({
              variant: "outline",
              size: "md",
              className: "shrink-0 self-start sm:self-auto",
            })}
          >
            See all products
          </Link>
        </div>

        <ProductGrid className="mt-12 sm:mt-14" products={featured} />
      </div>
    </section>
  );
}
