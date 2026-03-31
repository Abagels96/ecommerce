"use client";

import { useSearchParams } from "next/navigation";

import { CheckoutSuccessContent } from "@/components/checkout/checkout-success-content";
import { PageContainer } from "@/components/layout/PageContainer";

export function CheckoutSuccessInner() {
  const searchParams = useSearchParams();
  const orderIdFromQuery = searchParams.get("orderId")?.trim() || null;

  return (
    <PageContainer className="pb-16 pt-4 sm:pb-20 sm:pt-8">
      <CheckoutSuccessContent orderIdFromQuery={orderIdFromQuery} />
    </PageContainer>
  );
}
