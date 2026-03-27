import { create } from "zustand";
import { persist } from "zustand/middleware";

import { findMergedProductById } from "@/lib/catalog";
import type { CartLine } from "@/types";

type CartStore = {
  items: CartLine[];
  addItem: (productId: string, quantity?: number) => void;
  removeItem: (productId: string) => void;
  increaseQuantity: (productId: string, by?: number) => void;
  decreaseQuantity: (productId: string, by?: number) => void;
  /** Sets exact quantity; removes the line if quantity is below 1. */
  setItemQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  /** Sum of line totals using merged catalog prices. */
  getSubtotal: () => number;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (productId, quantity = 1) => {
        if (quantity < 1) return;
        const items = get().items;
        const existing = items.find((l) => l.productId === productId);
        if (existing) {
          set({
            items: items.map((l) =>
              l.productId === productId
                ? { ...l, quantity: l.quantity + quantity }
                : l,
            ),
          });
        } else {
          set({ items: [...items, { productId, quantity }] });
        }
      },

      removeItem: (productId) =>
        set({ items: get().items.filter((l) => l.productId !== productId) }),

      increaseQuantity: (productId, by = 1) => {
        if (by < 1) return;
        set({
          items: get().items.map((l) =>
            l.productId === productId
              ? { ...l, quantity: l.quantity + by }
              : l,
          ),
        });
      },

      decreaseQuantity: (productId, by = 1) => {
        if (by < 1) return;
        const items = get().items;
        const line = items.find((l) => l.productId === productId);
        if (!line) return;
        const nextQty = line.quantity - by;
        if (nextQty < 1) {
          set({ items: items.filter((l) => l.productId !== productId) });
        } else {
          set({
            items: items.map((l) =>
              l.productId === productId ? { ...l, quantity: nextQty } : l,
            ),
          });
        }
      },

      setItemQuantity: (productId, quantity) => {
        if (quantity < 1) {
          get().removeItem(productId);
          return;
        }
        set({
          items: get().items.map((l) =>
            l.productId === productId ? { ...l, quantity } : l,
          ),
        });
      },

      clearCart: () => set({ items: [] }),

      getSubtotal: () => {
        return get().items.reduce((sum, line) => {
          const product = findMergedProductById(line.productId);
          if (!product) return sum;
          return sum + product.price * line.quantity;
        }, 0);
      },
    }),
    {
      name: "ecommerce-mvp-use-cart",
      partialize: (state) => ({ items: state.items }),
    },
  ),
);
