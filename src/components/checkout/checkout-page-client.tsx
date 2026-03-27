"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { Button, buttonClassName } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { findMergedProductById } from "@/lib/catalog";
import type { CheckoutFormValues } from "@/lib/checkout-schema";
import { checkoutSchema } from "@/lib/checkout-schema";
import { generateOrderId } from "@/lib/order-id";
import { formatPrice } from "@/lib/utils";
import { appendMockOrder } from "@/lib/storage";
import { useCartStore } from "@/store/use-cart";
import type { MockOrderLine } from "@/types";

export function CheckoutPageClient() {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const getSubtotal = useCartStore((s) => s.getSubtotal);
  const clearCart = useCartStore((s) => s.clearCart);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      fullName: "",
      email: "",
      address: "",
      city: "",
      phone: "",
    },
  });

  if (items.length === 0) {
    return (
      <EmptyState
        className="border-zinc-200/80 bg-gradient-to-b from-zinc-50/80 to-transparent py-16 dark:border-zinc-800/80 dark:from-zinc-900/30"
        title="Nothing to check out"
        description="Your cart is empty. Add products before completing checkout."
      >
        <Link href="/cart" className={buttonClassName({ variant: "outline" })}>
          View cart
        </Link>
        <Link href="/shop" className={buttonClassName({ variant: "primary" })}>
          Browse shop
        </Link>
      </EmptyState>
    );
  }

  const subtotal = getSubtotal();

  const onSubmit = async (data: CheckoutFormValues) => {
    const lines: MockOrderLine[] = [];
    for (const line of items) {
      const product = findMergedProductById(line.productId);
      if (!product) continue;
      lines.push({
        productId: line.productId,
        quantity: line.quantity,
        unitPrice: product.price,
      });
    }

    if (lines.length === 0) {
      return;
    }

    const total = lines.reduce(
      (sum, l) => sum + l.unitPrice * l.quantity,
      0,
    );

    await new Promise((r) => setTimeout(r, 450));

    const orderId = generateOrderId();

    const ok = appendMockOrder({
      id: orderId,
      createdAt: new Date().toISOString(),
      lines,
      total,
      status: "completed",
      fullName: data.fullName,
      email: data.email,
      address: data.address,
      city: data.city,
      phone: data.phone,
    });

    if (!ok) {
      return;
    }

    clearCart();
    router.push(`/checkout/success?orderId=${encodeURIComponent(orderId)}`);
  };

  return (
    <div className="lg:grid lg:grid-cols-12 lg:items-start lg:gap-10 xl:gap-12">
      <div className="lg:col-span-7">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Checkout
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Enter shipping details — no payment step in this demo. Orders are saved
          to <code className="rounded bg-zinc-100 px-1 py-0.5 text-sm dark:bg-zinc-900">localStorage</code>.
        </p>

        <form
          className="mt-10 space-y-5"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <Input
            label="Full name"
            autoComplete="name"
            error={errors.fullName?.message}
            {...register("fullName")}
          />
          <Input
            label="Email"
            type="email"
            autoComplete="email"
            error={errors.email?.message}
            {...register("email")}
          />
          <Textarea
            label="Street address"
            autoComplete="street-address"
            error={errors.address?.message}
            rows={3}
            {...register("address")}
          />
          <Input
            label="City"
            autoComplete="address-level2"
            error={errors.city?.message}
            {...register("city")}
          />
          <Input
            label="Phone"
            type="tel"
            autoComplete="tel"
            error={errors.phone?.message}
            {...register("phone")}
          />

          <div className="flex flex-wrap gap-4 pt-2">
            <Button type="submit" size="lg" disabled={isSubmitting}>
              {isSubmitting ? "Placing order…" : "Place order"}
            </Button>
            <Link
              href="/cart"
              className={buttonClassName({
                variant: "outline",
                size: "lg",
              })}
            >
              Back to cart
            </Link>
          </div>
        </form>
      </div>

      <aside className="mt-12 lg:sticky lg:top-24 lg:col-span-5 lg:mt-0">
        <div className="surface-card bg-gradient-to-b from-zinc-50 to-white p-6 dark:from-zinc-900 dark:to-zinc-950">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Order summary
          </h2>
          <ul className="mt-4 max-h-[min(420px,50vh)] space-y-4 overflow-y-auto pr-1">
            {items.map((line) => {
              const product = findMergedProductById(line.productId);
              if (!product) return null;
              const lineTotal = product.price * line.quantity;
              return (
                <li
                  key={line.productId}
                  className="flex gap-3 border-b border-zinc-100 pb-4 last:border-0 last:pb-0 dark:border-zinc-800"
                >
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-900">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-2 text-sm font-medium text-zinc-900 dark:text-zinc-50">
                      {product.name}
                    </p>
                    <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
                      {formatPrice(product.price)} × {line.quantity}
                    </p>
                  </div>
                  <p className="shrink-0 text-sm font-medium tabular-nums text-zinc-900 dark:text-zinc-50">
                    {formatPrice(lineTotal)}
                  </p>
                </li>
              );
            })}
          </ul>

          <div className="mt-6 flex items-baseline justify-between border-t border-zinc-200 pt-6 dark:border-zinc-800">
            <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
              Subtotal
            </span>
            <span className="text-xl font-semibold tabular-nums text-zinc-900 dark:text-zinc-50">
              {formatPrice(subtotal)}
            </span>
          </div>
        </div>
      </aside>
    </div>
  );
}
