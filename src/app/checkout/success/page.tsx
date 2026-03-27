import type { Metadata } from "next";

import { CheckoutSuccessContent } from "@/components/checkout/checkout-success-content";
import { PageContainer } from "@/components/layout/PageContainer";

export const metadata: Metadata = {
  title: "Order confirmed",
  description: "Your mock order confirmation — portfolio e-commerce MVP.",
};

type PageProps = {
  searchParams: Promise<{ orderId?: string }>;
};

export default async function CheckoutSuccessPage({ searchParams }: PageProps) {
  const { orderId } = await searchParams;
  const orderIdFromQuery = orderId?.trim() || null;

  return (
    <PageContainer className="pb-16 pt-4 sm:pb-20 sm:pt-8">
      <CheckoutSuccessContent orderIdFromQuery={orderIdFromQuery} />
    </PageContainer>
  );
}
