"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { buttonClassName } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { getMergedProducts } from "@/lib/catalog";
import { formatPrice } from "@/lib/utils";
import { setStoredProducts } from "@/lib/storage";
import type { Product } from "@/types";

export function DashboardProductsClient() {
  const [items, setItems] = useState<Product[]>(() => getMergedProducts());

  const handleDelete = (id: string, name: string) => {
    if (!confirm(`Remove “${name}” from the catalog? This saves to localStorage.`)) {
      return;
    }
    const next = items.filter((p) => p.id !== id);
    setItems(next);
    setStoredProducts(next);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-balance text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl dark:text-zinc-50">
            Products
          </h1>
          <p className="mt-3 max-w-xl text-pretty leading-relaxed text-zinc-600 dark:text-zinc-400">
            Catalog merges{" "}
            <code className="rounded bg-zinc-100 px-1 py-0.5 text-sm dark:bg-zinc-900">
              localStorage
            </code>{" "}
            overrides when set; otherwise seed mock data from the repo.
          </p>
        </div>
        <Link
          href="/dashboard/products/new"
          className={buttonClassName({
            variant: "primary",
            size: "md",
            className: "shrink-0 self-start sm:self-auto",
          })}
        >
          Add new product
        </Link>
      </div>

      {items.length > 0 ? (
        <>
      {/* Mobile: cards */}
      <ul className="space-y-3 md:hidden">
        {items.map((p) => (
          <li
            key={p.id}
            className="surface-card bg-white p-4 transition-shadow dark:bg-zinc-950"
          >
            <div className="flex gap-3">
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-900">
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-medium text-zinc-900 dark:text-zinc-50">
                  {p.name}
                </p>
                <p className="text-xs capitalize text-zinc-500 dark:text-zinc-400">
                  {p.category}
                </p>
                <p className="mt-1 text-sm font-medium tabular-nums text-zinc-800 dark:text-zinc-200">
                  {formatPrice(p.price)}
                </p>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2 border-t border-zinc-100 pt-4 dark:border-zinc-800">
              <Link
                href={`/dashboard/products/${p.id}`}
                className={buttonClassName({
                  variant: "outline",
                  size: "sm",
                  className: "flex-1",
                })}
              >
                Edit
              </Link>
              <button
                type="button"
                className={buttonClassName({
                  variant: "outline",
                  size: "sm",
                  className:
                    "flex-1 border-red-200 text-red-700 hover:bg-red-50 dark:border-red-900/50 dark:text-red-400 dark:hover:bg-red-950/40",
                })}
                onClick={() => handleDelete(p.id, p.name)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Desktop: table */}
      <div className="surface-card hidden overflow-hidden bg-white md:block dark:bg-zinc-950">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="border-b border-zinc-200 bg-zinc-50/90 dark:border-zinc-800 dark:bg-zinc-900/50">
              <tr>
                <th className="px-4 py-3 font-medium text-zinc-600 dark:text-zinc-400">
                  Product
                </th>
                <th className="px-4 py-3 font-medium text-zinc-600 dark:text-zinc-400">
                  Category
                </th>
                <th className="px-4 py-3 font-medium text-zinc-600 dark:text-zinc-400">
                  Price
                </th>
                <th className="px-4 py-3 font-medium text-zinc-600 dark:text-zinc-400">
                  Stock
                </th>
                <th className="px-4 py-3 font-medium text-zinc-600 dark:text-zinc-400">
                  Featured
                </th>
                <th className="px-4 py-3 text-right font-medium text-zinc-600 dark:text-zinc-400">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {items.map((p) => (
                <tr
                  key={p.id}
                  className="hover:bg-zinc-50/80 dark:hover:bg-zinc-900/40"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-900">
                        <Image
                          src={p.image}
                          alt={p.name}
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-zinc-900 dark:text-zinc-50">
                          {p.name}
                        </p>
                        <p className="truncate text-xs text-zinc-500 dark:text-zinc-400">
                          {p.id}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 capitalize text-zinc-700 dark:text-zinc-300">
                    {p.category}
                  </td>
                  <td className="px-4 py-3 tabular-nums text-zinc-800 dark:text-zinc-200">
                    {formatPrice(p.price)}
                  </td>
                  <td className="px-4 py-3 tabular-nums text-zinc-800 dark:text-zinc-200">
                    {p.stock}
                  </td>
                  <td className="px-4 py-3 text-zinc-700 dark:text-zinc-300">
                    {p.featured ? "Yes" : "No"}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/dashboard/products/${p.id}`}
                        className={buttonClassName({
                          variant: "outline",
                          size: "sm",
                        })}
                      >
                        Edit
                      </Link>
                      <button
                        type="button"
                        className={buttonClassName({
                          variant: "outline",
                          size: "sm",
                          className:
                            "border-red-200 text-red-700 hover:bg-red-50 dark:border-red-900/50 dark:text-red-400 dark:hover:bg-red-950/40",
                        })}
                        onClick={() => handleDelete(p.id, p.name)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
        </>
      ) : (
        <EmptyState
          title="No products in catalog"
          description="Add a product from the dashboard, or clear the ecommerce-mvp:products key in devtools to restore seed data."
          icon={<CatalogEmptyIcon />}
        >
          <Link
            href="/dashboard/products/new"
            className={buttonClassName({ variant: "primary", size: "md" })}
          >
            Add product
          </Link>
        </EmptyState>
      )}
    </div>
  );
}

function CatalogEmptyIcon() {
  return (
    <svg
      className="mx-auto h-12 w-12"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <path
        d="M4 6h16v12H4V6z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M8 10h8M8 14h5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
