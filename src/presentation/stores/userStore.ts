// User Store - Mock authentication store
'use client';

import { mockUsers } from '@/src/data/mock/users';
import type { User } from '@/src/domain/entities';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserState {
  currentUser: User | null;
  isAuthenticated: boolean;
  login: (email: string) => boolean;
  logout: () => void;
  setUser: (user: User | null) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      currentUser: null,
      isAuthenticated: false,
      
      login: (email) => {
        const user = mockUsers.find(u => u.email === email);
        if (user) {
          set({ currentUser: user, isAuthenticated: true });
          return true;
        }
        return false;
      },
      
      logout: () => {
        set({ currentUser: null, isAuthenticated: false });
      },
      
      setUser: (user) => {
        set({ currentUser: user, isAuthenticated: !!user });
      },
    }),
    {
      name: 'design-kit-user',
    }
  )
);
