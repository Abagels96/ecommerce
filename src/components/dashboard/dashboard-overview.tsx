"use client";

import Link from "next/link";
import { useMemo } from "react";

import { buttonClassName } from "@/components/ui/button";
import { getMergedProducts } from "@/lib/catalog";
import { formatPrice } from "@/lib/utils";
import { getMockOrders } from "@/lib/storage";

function formatDate(iso: string): string {
  try {
    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export function DashboardOverview() {
  const orders = useMemo(() => getMockOrders() ?? [], []);

  const productCount = useMemo(() => getMergedProducts().length, []);

  const stats = useMemo(() => {
    const totalOrders = orders.length;
    const revenue = orders.reduce((sum, o) => sum + o.total, 0);
    return { totalOrders, revenue };
  }, [orders]);

  const recentOrders = useMemo(() => {
    if (!orders?.length) return [];
    return [...orders]
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )
      .slice(0, 6);
  }, [orders]);

  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-balance text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl dark:text-zinc-50">
          Dashboard
        </h1>
        <p className="mt-3 max-w-2xl text-pretty leading-relaxed text-zinc-600 dark:text-zinc-400">
          ABails Shop metrics: catalog from seed data, orders from{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 text-sm dark:bg-zinc-900">
            mock_orders
          </code>{" "}
          in this browser.
        </p>
      </header>

      <section>
        <h2 className="sr-only">Summary</h2>
        <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <li>
            <div className="surface-card bg-gradient-to-br from-white to-zinc-50/80 p-6 dark:from-zinc-950 dark:to-zinc-900/80">
              <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                Total products
              </p>
              <p className="mt-2 text-3xl font-semibold tabular-nums text-zinc-900 dark:text-zinc-50">
                {productCount}
              </p>
              <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                Merged catalog (seed + localStorage)
              </p>
            </div>
          </li>
          <li>
            <div className="surface-card bg-gradient-to-br from-white to-zinc-50/80 p-6 dark:from-zinc-950 dark:to-zinc-900/80">
              <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                Mock orders
              </p>
              <p className="mt-2 text-3xl font-semibold tabular-nums text-zinc-900 dark:text-zinc-50">
                {stats.totalOrders}
              </p>
              <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                Saved in localStorage
              </p>
            </div>
          </li>
          <li className="sm:col-span-2 xl:col-span-1">
            <div className="surface-card bg-gradient-to-br from-emerald-50/80 to-white p-6 dark:from-emerald-950/30 dark:to-zinc-950">
              <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                Revenue estimate
              </p>
              <p className="mt-2 text-3xl font-semibold tabular-nums text-zinc-900 dark:text-zinc-50">
                {formatPrice(stats.revenue)}
              </p>
              <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                Sum of order totals (demo)
              </p>
            </div>
          </li>
        </ul>
      </section>

      <section className="surface-card bg-white dark:bg-zinc-950">
        <div className="border-b border-zinc-200 px-5 py-4 dark:border-zinc-800">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Recent mock orders
          </h2>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Newest first — up to six entries.
          </p>
        </div>

        {recentOrders.length === 0 ? (
          <p className="px-5 py-12 text-center text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            No orders yet. Complete a checkout to see mock orders here.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="border-b border-zinc-200 bg-zinc-50/80 dark:border-zinc-800 dark:bg-zinc-900/50">
                <tr>
                  <th className="px-5 py-3 font-medium text-zinc-600 dark:text-zinc-400">
                    Order ID
                  </th>
                  <th className="px-5 py-3 font-medium text-zinc-600 dark:text-zinc-400">
                    Placed
                  </th>
                  <th className="px-5 py-3 font-medium text-zinc-600 dark:text-zinc-400">
                    Customer
                  </th>
                  <th className="px-5 py-3 font-medium text-zinc-600 dark:text-zinc-400">
                    Status
                  </th>
                  <th className="px-5 py-3 text-right font-medium text-zinc-600 dark:text-zinc-400">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                {recentOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-zinc-50/80 dark:hover:bg-zinc-900/40"
                  >
                    <td className="px-5 py-3 font-mono text-xs text-zinc-800 dark:text-zinc-200">
                      {order.id}
                    </td>
                    <td className="px-5 py-3 text-zinc-700 dark:text-zinc-300">
                      {formatDate(order.createdAt)}
                    </td>
                    <td className="max-w-[200px] truncate px-5 py-3 text-zinc-700 dark:text-zinc-300">
                      {order.fullName}
                      <span className="block truncate text-xs text-zinc-500 dark:text-zinc-400">
                        {order.email}
                      </span>
                    </td>
                    <td className="px-5 py-3 capitalize text-zinc-700 dark:text-zinc-300">
                      {order.status}
                    </td>
                    <td className="px-5 py-3 text-right font-medium tabular-nums text-zinc-900 dark:text-zinc-50">
                      {formatPrice(order.total)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section>
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          Quick links
        </h2>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          Manage the demo catalog (mock data in code — UI placeholders for CRUD).
        </p>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Link
            href="/dashboard/products"
            className={buttonClassName({
              variant: "primary",
              size: "md",
              className: "justify-center sm:min-w-[180px]",
            })}
          >
            All products
          </Link>
          <Link
            href="/dashboard/products/new"
            className={buttonClassName({
              variant: "outline",
              size: "md",
              className: "justify-center sm:min-w-[180px]",
            })}
          >
            New product
          </Link>
          <Link
            href="/shop"
            className={buttonClassName({
              variant: "ghost",
              size: "md",
              className: "justify-center sm:min-w-[180px]",
            })}
          >
            View storefront
          </Link>
        </div>
      </section>
    </div>
  );
}
