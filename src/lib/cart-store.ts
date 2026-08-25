"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/types/product";

export interface CartLine {
  product: Product;
  quantity: number;
}

interface CartState {
  lines: CartLine[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  clear: () => void;
  totalItems: () => number;
  subtotal: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      lines: [],
      addItem: (product, quantity = 1) =>
        set((state) => {
          const existing = state.lines.find((line) => line.product.id === product.id);
          if (existing) {
            return {
              lines: state.lines.map((line) =>
                line.product.id === product.id
                  ? { ...line, quantity: line.quantity + quantity }
                  : line
              ),
            };
          }
          return { lines: [...state.lines, { product, quantity }] };
        }),
      removeItem: (productId) =>
        set((state) => ({ lines: state.lines.filter((line) => line.product.id !== productId) })),
      setQuantity: (productId, quantity) =>
        set((state) => ({
          lines: state.lines
            .map((line) => (line.product.id === productId ? { ...line, quantity } : line))
            .filter((line) => line.quantity > 0),
        })),
      clear: () => set({ lines: [] }),
      totalItems: () => get().lines.reduce((sum, line) => sum + line.quantity, 0),
      subtotal: () => get().lines.reduce((sum, line) => sum + line.quantity * line.product.price, 0),
    }),
    { name: "cng-cart", skipHydration: true }
  )
);
