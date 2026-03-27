import { cn } from "@/lib/utils";
import type { Product } from "@/types";

import { ProductCard } from "./ProductCard";

export type ProductGridProps = {
  products: Product[];
  className?: string;
  /** Override grid columns at breakpoints (Tailwind classes). */
  gridClassName?: string;
};

export function ProductGrid({
  products,
  className,
  gridClassName,
}: ProductGridProps) {
  return (
    <ul
      className={cn(
        "grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7 lg:grid-cols-3 lg:gap-8",
        gridClassName,
        className,
      )}
    >
      {products.map((product) => (
        <li key={product.id} className="min-w-0">
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
}
