// Toast Store - Notification system
'use client';

import { create } from 'zustand';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

interface ToastState {
  toasts: Toast[];
  addToast: (message: string, type?: ToastType, duration?: number) => void;
  removeToast: (id: string) => void;
  clearToasts: () => void;
}

export const useToastStore = create<ToastState>((set, get) => ({
  toasts: [],
  
  addToast: (message, type = 'info', duration = 3000) => {
    const id = `toast-${Date.now()}`;
    const toast: Toast = { id, message, type, duration };
    
    set({ toasts: [...get().toasts, toast] });
    
    // Auto remove after duration
    if (duration > 0) {
      setTimeout(() => {
        set({
          toasts: get().toasts.filter(t => t.id !== id),
        });
      }, duration);
    }
  },
  
  removeToast: (id) => {
    set({
      toasts: get().toasts.filter(t => t.id !== id),
    });
  },
  
  clearToasts: () => {
    set({ toasts: [] });
  },
}));
