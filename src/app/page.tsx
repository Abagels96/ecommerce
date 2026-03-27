import type { Metadata } from "next";

import { CategoryHighlightsSection } from "@/components/home/category-highlights-section";
import { FeaturedProductsSection } from "@/components/home/featured-products-section";
import { HeroSection } from "@/components/home/hero-section";
import { WhyShopSection } from "@/components/home/why-shop-section";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Portfolio e-commerce MVP — browse desk gear with mock data and a client-side cart.",
};

export default function HomePage() {
  return (
    <div className="min-h-0">
      <HeroSection />
      <FeaturedProductsSection />
      <CategoryHighlightsSection />
      <WhyShopSection />
    </div>
  );
}
