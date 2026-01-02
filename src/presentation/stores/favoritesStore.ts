// Favorites Store - Wishlist functionality
'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FavoritesState {
  favoriteIds: string[];
  addFavorite: (componentId: string) => void;
  removeFavorite: (componentId: string) => void;
  toggleFavorite: (componentId: string) => void;
  isFavorite: (componentId: string) => boolean;
  clearFavorites: () => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favoriteIds: [],
      
      addFavorite: (componentId) => {
        const ids = get().favoriteIds;
        if (!ids.includes(componentId)) {
          set({ favoriteIds: [...ids, componentId] });
        }
      },
      
      removeFavorite: (componentId) => {
        set({
          favoriteIds: get().favoriteIds.filter(id => id !== componentId),
        });
      },
      
      toggleFavorite: (componentId) => {
        const ids = get().favoriteIds;
        if (ids.includes(componentId)) {
          set({ favoriteIds: ids.filter(id => id !== componentId) });
        } else {
          set({ favoriteIds: [...ids, componentId] });
        }
      },
      
      isFavorite: (componentId) => {
        return get().favoriteIds.includes(componentId);
      },
      
      clearFavorites: () => {
        set({ favoriteIds: [] });
      },
    }),
    {
      name: 'design-kit-favorites',
    }
  )
);
