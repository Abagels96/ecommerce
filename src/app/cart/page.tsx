import type { Metadata } from "next";

import { CartView } from "@/components/cart/CartView";
import { PageContainer } from "@/components/layout/PageContainer";

export const metadata: Metadata = {
  title: "Cart",
  description: "Review your cart — quantities and subtotal use the Zustand store and localStorage.",
};

export default function CartPage() {
  return (
    <PageContainer className="pb-16 sm:pb-20">
      <header className="max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
          Shopping cart
        </h1>
        <p className="mt-3 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
          Items persist in this browser via{" "}
          <span className="font-medium text-zinc-800 dark:text-zinc-200">
            Zustand
          </span>{" "}
          and{" "}
          <code className="rounded-md bg-zinc-100 px-1.5 py-0.5 text-sm dark:bg-zinc-900">
            localStorage
          </code>
          . Adjust quantities or remove lines below.
        </p>
      </header>

      <CartView />
    </PageContainer>
  );
}
