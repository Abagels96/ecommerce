"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { QuantitySelector } from "@/components/ui/quantity-selector";
import { useCartStore } from "@/store/use-cart";

export type ProductPurchasePanelProps = {
  productId: string;
  stock: number;
};

export function ProductPurchasePanel({
  productId,
  stock,
}: ProductPurchasePanelProps) {
  const [qty, setQty] = useState(1);
  const addItem = useCartStore((s) => s.addItem);
  const outOfStock = stock <= 0;

  useEffect(() => {
    if (outOfStock) {
      setQty(1);
      return;
    }
    setQty((q) => Math.min(Math.max(1, q), stock));
  }, [stock, outOfStock]);

  return (
    <div className="mt-8 flex flex-col gap-6 border-t border-zinc-200 pt-8 dark:border-zinc-800">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:gap-6">
        <QuantitySelector
          value={qty}
          onValueChange={setQty}
          min={1}
          max={outOfStock ? undefined : stock}
          disabled={outOfStock}
          label="Quantity to add"
          size="md"
        />
        <Button
          type="button"
          size="lg"
          className="w-full sm:w-auto sm:min-w-[200px]"
          disabled={outOfStock}
          onClick={() => addItem(productId, qty)}
        >
          Add to cart
        </Button>
      </div>
      {outOfStock ? (
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          This item can’t be added while unavailable.
        </p>
      ) : null}
    </div>
  );
}
