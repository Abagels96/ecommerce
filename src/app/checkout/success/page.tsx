import type { Metadata } from "next";
import { Suspense } from "react";

import { Skeleton } from "@/components/ui/skeleton";

import { CheckoutSuccessInner } from "./checkout-success-inner";

export const metadata: Metadata = {
  title: "Order confirmed",
  description: "Your mock order confirmation — portfolio e-commerce MVP.",
};

function CheckoutSuccessFallback() {
  return (
    <div className="mx-auto max-w-xl px-4 py-10">
      <Skeleton className="mx-auto h-14 w-14 rounded-full" />
      <Skeleton className="mt-6 h-9 w-2/3 max-w-sm" />
      <Skeleton className="mt-3 h-4 w-full" />
      <Skeleton className="mt-10 h-40 w-full rounded-xl" />
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<CheckoutSuccessFallback />}>
      <CheckoutSuccessInner />
    </Suspense>
  );
}
