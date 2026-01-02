// Recently Viewed Store
'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface RecentlyViewedState {
  viewedIds: string[];
  addViewed: (componentId: string) => void;
  getRecentlyViewed: () => string[];
  clearHistory: () => void;
}

const MAX_RECENT = 10;

export const useRecentlyViewedStore = create<RecentlyViewedState>()(
  persist(
    (set, get) => ({
      viewedIds: [],
      
      addViewed: (componentId) => {
        const ids = get().viewedIds.filter(id => id !== componentId);
        set({
          viewedIds: [componentId, ...ids].slice(0, MAX_RECENT),
        });
      },
      
      getRecentlyViewed: () => get().viewedIds,
      
      clearHistory: () => set({ viewedIds: [] }),
    }),
    {
      name: 'design-kit-recently-viewed',
    }
  )
);
