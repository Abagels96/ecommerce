"use client";

import Image from "next/image";
import Link from "next/link";

import { Button, buttonClassName } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { QuantitySelector } from "@/components/ui/quantity-selector";
import { findMergedProductById } from "@/lib/catalog";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/use-cart";

export function CartView() {
  const items = useCartStore((s) => s.items);
  const setItemQuantity = useCartStore((s) => s.setItemQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const clearCart = useCartStore((s) => s.clearCart);
  const subtotal = useCartStore((s) => s.getSubtotal());

  if (items.length === 0) {
    return (
      <EmptyState
        className="mt-10 w-full border-zinc-200/80 bg-gradient-to-b from-zinc-50/80 to-transparent py-16 dark:border-zinc-800/80 dark:from-zinc-900/30"
        title="Your cart is empty"
        description="Browse the shop and add gear — your selections sync to this browser via Zustand."
      >
        <Link href="/shop" className={buttonClassName({ variant: "primary" })}>
          Browse the shop
        </Link>
      </EmptyState>
    );
  }

  return (
    <div className="mt-10 lg:grid lg:grid-cols-12 lg:items-start lg:gap-10 xl:gap-12">
      <div className="lg:col-span-7 xl:col-span-8">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
            {items.length} {items.length === 1 ? "item" : "items"}
          </p>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="self-start text-red-600 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-950/40 dark:hover:text-red-300"
            onClick={() => clearCart()}
          >
            Clear cart
          </Button>
        </div>

        <ul className="space-y-4">
          {items.map((line) => {
            const product = findMergedProductById(line.productId);
            if (!product) return null;
            const lineTotal = product.price * line.quantity;

            return (
              <li
                key={line.productId}
                className="surface-card overflow-hidden bg-white transition-shadow duration-200 hover:shadow-md dark:bg-zinc-950"
              >
                <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:gap-6 sm:p-5">
                  <Link
                    href={`/product/${product.id}`}
                    className="relative mx-auto aspect-[4/3] w-full max-w-[220px] shrink-0 overflow-hidden rounded-xl bg-zinc-100 sm:mx-0 sm:aspect-square sm:h-24 sm:max-w-none sm:w-24 dark:bg-zinc-900"
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-opacity hover:opacity-90"
                      sizes="(max-width: 640px) 100vw, 96px"
                    />
                  </Link>

                  <div className="min-w-0 flex-1 text-center sm:text-left">
                    <Link
                      href={`/product/${product.id}`}
                      className="text-base font-semibold text-zinc-900 hover:underline dark:text-zinc-50"
                    >
                      {product.name}
                    </Link>
                    <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                      {formatPrice(product.price)}{" "}
                      <span className="text-zinc-400 dark:text-zinc-500">
                        each
                      </span>
                    </p>
                  </div>

                  <div className="flex flex-col items-center gap-3 sm:items-end">
                    <QuantitySelector
                      id={`cart-qty-${line.productId}`}
                      value={line.quantity}
                      onValueChange={(q) => setItemQuantity(line.productId, q)}
                      min={1}
                      max={Math.max(1, product.stock)}
                      label={`Quantity for ${product.name}`}
                      size="sm"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="text-zinc-500 hover:text-red-600 dark:hover:text-red-400"
                      onClick={() => removeItem(line.productId)}
                    >
                      Remove
                    </Button>
                  </div>

                  <div className="flex justify-center border-t border-zinc-100 pt-3 text-center sm:border-t-0 sm:border-l sm:pt-0 sm:pl-6 sm:text-right">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-zinc-400 dark:text-zinc-500">
                        Line total
                      </p>
                      <p className="mt-0.5 text-lg font-semibold tabular-nums text-zinc-900 dark:text-zinc-50">
                        {formatPrice(lineTotal)}
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <aside className="mt-10 lg:sticky lg:top-24 lg:col-span-5 xl:col-span-4 lg:mt-0">
        <div className="surface-card bg-gradient-to-b from-zinc-50 to-white p-6 dark:from-zinc-900 dark:to-zinc-950">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Order summary
          </h2>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Subtotal before tax &amp; shipping — demo only.
          </p>

          <div className="mt-6 flex items-baseline justify-between gap-4 border-t border-zinc-200 pt-6 dark:border-zinc-800">
            <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
              Subtotal
            </span>
            <span className="text-2xl font-semibold tabular-nums text-zinc-900 dark:text-zinc-50">
              {formatPrice(subtotal)}
            </span>
          </div>

          <Link
            href="/checkout"
            className={buttonClassName({
              variant: "primary",
              size: "lg",
              className: "mt-6 w-full",
            })}
          >
            Proceed to checkout
          </Link>

          <Link
            href="/shop"
            className={buttonClassName({
              variant: "outline",
              size: "md",
              className: "mt-3 w-full",
            })}
          >
            Continue shopping
          </Link>
        </div>
      </aside>
    </div>
  );
}
