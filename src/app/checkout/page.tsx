import type { Metadata } from "next";

import { CheckoutPageClient } from "@/components/checkout/checkout-page-client";
import { PageContainer } from "@/components/layout/PageContainer";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Shipping details and order summary — mock checkout for the portfolio MVP.",
};

export default function CheckoutPage() {
  return (
    <PageContainer className="pb-16 sm:pb-20">
      <CheckoutPageClient />
    </PageContainer>
  );
}
