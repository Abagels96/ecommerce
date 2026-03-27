"use client";

import Link from "next/link";

import { Button, buttonClassName } from "@/components/ui/button";
import { useCartStore } from "@/store/use-cart";

export type ProductCardActionsProps = {
  productId: string;
  outOfStock: boolean;
};

export function ProductCardActions({
  productId,
  outOfStock,
}: ProductCardActionsProps) {
  const addItem = useCartStore((s) => s.addItem);

  return (
    <div className="mt-4 flex gap-2">
      <Link
        href={`/product/${productId}`}
        className={buttonClassName({
          variant: "outline",
          size: "sm",
          className: "min-w-0 flex-1",
        })}
      >
        View details
      </Link>
      <Button
        type="button"
        size="sm"
        variant="primary"
        className="min-w-0 flex-1"
        disabled={outOfStock}
        onClick={() => addItem(productId, 1)}
      >
        Add to cart
      </Button>
    </div>
  );
}
