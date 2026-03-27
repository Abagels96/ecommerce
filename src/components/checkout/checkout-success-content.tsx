"use client";

import Link from "next/link";
import { useMemo } from "react";

import { buttonClassName } from "@/components/ui/button";
import { findMergedProductById } from "@/lib/catalog";
import { formatPrice } from "@/lib/utils";
import { getMockOrders } from "@/lib/storage";
import type { MockOrder } from "@/types";

type CheckoutSuccessContentProps = {
  orderIdFromQuery: string | null;
};

function formatOrderDate(iso: string): string {
  try {
    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export function CheckoutSuccessContent({
  orderIdFromQuery,
}: CheckoutSuccessContentProps) {
  const order = useMemo<MockOrder | null>(() => {
    if (!orderIdFromQuery) return null;
    const orders = getMockOrders();
    return orders?.find((o) => o.id === orderIdFromQuery) ?? null;
  }, [orderIdFromQuery]);

  return (
    <div className="mx-auto max-w-xl">
      <div className="flex flex-col items-center text-center">
        <div
          className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300"
          aria-hidden
        >
          <svg
            className="h-7 w-7"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              d="M20 6L9 17l-5-5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h1 className="mt-6 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Order confirmed
        </h1>
        <p className="mt-3 max-w-md text-zinc-600 dark:text-zinc-400">
          Thanks for your order. This is a demo — nothing was charged. Details
          below are from your saved mock order when available.
        </p>
      </div>

      <div className="surface-card mt-10 p-6">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Confirmation summary
        </h2>

        {orderIdFromQuery ? (
          <>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex flex-wrap justify-between gap-2 border-b border-zinc-100 pb-3 dark:border-zinc-800">
                <dt className="text-zinc-500 dark:text-zinc-400">Order ID</dt>
                <dd className="font-mono text-xs font-medium text-zinc-900 sm:text-sm dark:text-zinc-100">
                  {orderIdFromQuery}
                </dd>
              </div>
              {order ? (
                <>
                  <div className="flex flex-wrap justify-between gap-2">
                    <dt className="text-zinc-500 dark:text-zinc-400">Placed</dt>
                    <dd className="text-right text-zinc-900 dark:text-zinc-100">
                      {formatOrderDate(order.createdAt)}
                    </dd>
                  </div>
                  <div className="flex flex-wrap justify-between gap-2">
                    <dt className="text-zinc-500 dark:text-zinc-400">Status</dt>
                    <dd className="capitalize text-zinc-900 dark:text-zinc-100">
                      {order.status}
                    </dd>
                  </div>
                  <div className="border-t border-zinc-100 pt-3 dark:border-zinc-800">
                    <dt className="text-zinc-500 dark:text-zinc-400">Ship to</dt>
                    <dd className="mt-1 text-zinc-900 dark:text-zinc-100">
                      <span className="font-medium">{order.fullName}</span>
                      <br />
                      {order.address}
                      <br />
                      {order.city}
                      <br />
                      <span className="text-zinc-600 dark:text-zinc-400">
                        {order.email}
                      </span>
                      <br />
                      <span className="text-zinc-600 dark:text-zinc-400">
                        {order.phone}
                      </span>
                    </dd>
                  </div>
                  <div className="border-t border-zinc-100 pt-3 dark:border-zinc-800">
                    <dt className="mb-2 text-zinc-500 dark:text-zinc-400">
                      Items
                    </dt>
                    <dd>
                      <ul className="space-y-2">
                        {order.lines.map((line, i) => {
                          const p = findMergedProductById(line.productId);
                          const name = p?.name ?? line.productId;
                          return (
                            <li
                              key={`${line.productId}-${i}`}
                              className="flex justify-between gap-4 text-zinc-800 dark:text-zinc-200"
                            >
                              <span className="min-w-0 truncate">
                                {name}{" "}
                                <span className="text-zinc-500 dark:text-zinc-400">
                                  × {line.quantity}
                                </span>
                              </span>
                              <span className="shrink-0 tabular-nums">
                                {formatPrice(
                                  line.unitPrice * line.quantity,
                                )}
                              </span>
                            </li>
                          );
                        })}
                      </ul>
                    </dd>
                  </div>
                  <div className="flex flex-wrap items-baseline justify-between gap-2 border-t border-zinc-100 pt-4 dark:border-zinc-800">
                    <dt className="text-base font-medium text-zinc-900 dark:text-zinc-50">
                      Total
                    </dt>
                    <dd className="text-xl font-semibold tabular-nums text-zinc-900 dark:text-zinc-50">
                      {formatPrice(order.total)}
                    </dd>
                  </div>
                </>
              ) : (
                <p className="mt-4 text-sm text-amber-800 dark:text-amber-200/90">
                  We couldn&apos;t load this order from{" "}
                  <code className="rounded bg-zinc-100 px-1 dark:bg-zinc-900">
                    localStorage
                  </code>
                  . The ID above is still valid from your checkout redirect.
                </p>
              )}
            </dl>
          </>
        ) : (
          <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
            No order ID in the URL. Open this page after checkout, or return to
            the shop — your cart stays separate from this screen.
          </p>
        )}
      </div>

      <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Link
          href="/shop"
          className={buttonClassName({
            variant: "primary",
            size: "md",
            className: "w-full sm:w-auto sm:min-w-[200px]",
          })}
        >
          Continue shopping
        </Link>
        <Link
          href="/dashboard"
          className={buttonClassName({
            variant: "outline",
            size: "md",
            className: "w-full sm:w-auto sm:min-w-[200px]",
          })}
        >
          View dashboard
        </Link>
      </div>
    </div>
  );
}
