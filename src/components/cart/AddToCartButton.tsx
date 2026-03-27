"use client";

import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/use-cart";

type AddToCartButtonProps = {
  productId: string;
};

export function AddToCartButton({ productId }: AddToCartButtonProps) {
  const addItem = useCartStore((s) => s.addItem);

  return (
    <Button type="button" onClick={() => addItem(productId, 1)}>
      Add to cart
    </Button>
  );
}
