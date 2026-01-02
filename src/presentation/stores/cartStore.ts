// Cart Store - Zustand store for shopping cart
'use client';

import type { DesignComponent } from '@/src/domain/entities';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  component: DesignComponent;
  quantity: number;
  addedAt: string;
}

interface CartState {
  items: CartItem[];
  addItem: (component: DesignComponent) => void;
  removeItem: (componentId: string) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
  isInCart: (componentId: string) => boolean;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (component) => {
        const items = get().items;
        const exists = items.find(item => item.component.id === component.id);
        
        if (!exists && !component.isFree) {
          set({
            items: [
              ...items,
              {
                component,
                quantity: 1,
                addedAt: new Date().toISOString(),
              },
            ],
          });
        }
      },
      
      removeItem: (componentId) => {
        set({
          items: get().items.filter(item => item.component.id !== componentId),
        });
      },
      
      clearCart: () => {
        set({ items: [] });
      },
      
      getTotal: () => {
        return get().items.reduce((total, item) => {
          return total + (item.component.price * item.quantity);
        }, 0);
      },
      
      getItemCount: () => {
        return get().items.length;
      },
      
      isInCart: (componentId) => {
        return get().items.some(item => item.component.id === componentId);
      },
    }),
    {
      name: 'design-kit-cart',
    }
  )
);
