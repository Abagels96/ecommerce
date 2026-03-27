"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

import { ProductGrid } from "@/components/products/ProductGrid";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { Input } from "@/components/ui/input";
import { getMergedProducts } from "@/lib/catalog";
import {
  filterShopProducts,
  getProductCategories,
  sortShopProducts,
  type ShopSort,
} from "@/lib/shop-products";

const SORT_OPTIONS: { value: ShopSort; label: string }[] = [
  { value: "newest", label: "Newest first" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
];

const selectClass =
  "h-10 w-full min-w-0 rounded-lg border border-zinc-300/90 bg-white px-3 text-sm text-zinc-900 shadow-sm transition-[border-color,box-shadow] duration-200 hover:border-zinc-400/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-400 disabled:cursor-not-allowed disabled:opacity-60 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 dark:hover:border-zinc-500 dark:focus-visible:outline-zinc-500 sm:w-auto";

export function ShopCatalog() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const catalog = getMergedProducts();

  const categories = useMemo(() => getProductCategories(catalog), [catalog]);

  const categoryParam = searchParams.get("category")?.toLowerCase().trim() ?? "";

  const category = useMemo((): string | "all" => {
    if (!categoryParam) return "all";
    if (categories.includes(categoryParam)) return categoryParam;
    return "all";
  }, [categoryParam, categories]);

  const setCategoryFilter = (next: string | "all") => {
    const params = new URLSearchParams(searchParams.toString());
    if (next === "all") params.delete("category");
    else params.set("category", next);
    const qs = params.toString();
    router.push(qs ? `/shop?${qs}` : "/shop");
  };

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<ShopSort>("newest");

  const filtered = useMemo(
    () =>
      filterShopProducts(catalog, {
        search,
        category,
      }),
    [catalog, search, category],
  );

  const result = useMemo(
    () => sortShopProducts(filtered, sort),
    [filtered, sort],
  );

  const reset = () => {
    setSearch("");
    setCategoryFilter("all");
    setSort("newest");
  };

  return (
    <div>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            Shop
          </h1>
          <p className="mt-2 text-pretty text-zinc-600 dark:text-zinc-400">
            Search the merged catalog (seed data + admin edits in{" "}
            <code className="rounded bg-zinc-100 px-1 py-0.5 text-sm dark:bg-zinc-900">
              localStorage
            </code>
            ), filter, and sort — all in the browser.
          </p>
        </div>
        <p className="text-sm tabular-nums text-zinc-500 dark:text-zinc-400">
          {result.length} {result.length === 1 ? "product" : "products"}
        </p>
      </div>

      <div className="surface-muted mt-8 flex flex-col gap-4 p-4 sm:p-6">
        <div className="grid gap-4">
          <Input
            label="Search"
            type="search"
            placeholder="Search by product name…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoComplete="off"
            inputClassName="max-w-xl"
          />

          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:gap-6">
            <div className="flex min-w-0 flex-1 flex-col gap-2 sm:flex-row sm:items-end sm:gap-4">
              <label className="flex w-full flex-col gap-1.5 sm:max-w-xs">
                <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Category
                </span>
                <select
                  className={selectClass}
                  value={category}
                  onChange={(e) =>
                    setCategoryFilter(e.target.value as "all" | string)
                  }
                  aria-label="Filter by category"
                >
                  <option value="all">All categories</option>
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </label>

              <label className="flex w-full flex-col gap-1.5 sm:max-w-xs">
                <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Sort
                </span>
                <select
                  className={selectClass}
                  value={sort}
                  onChange={(e) => setSort(e.target.value as ShopSort)}
                  aria-label="Sort products"
                >
                  {SORT_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="shrink-0 self-start lg:self-end"
              onClick={reset}
            >
              Reset filters
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-10">
        {result.length === 0 ? (
          <EmptyState
            className="py-16"
            title="No products match"
            description="Try a different search term, pick another category, or reset filters to see everything."
            icon={<SearchEmptyIcon />}
          >
            <Button type="button" variant="outline" onClick={reset}>
              Reset filters
            </Button>
          </EmptyState>
        ) : (
          <ProductGrid products={result} />
        )}
      </div>
    </div>
  );
}

function SearchEmptyIcon() {
  return (
    <svg
      className="mx-auto h-12 w-12"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <circle
        cx="11"
        cy="11"
        r="6"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M16 16l4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M8 11h6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
