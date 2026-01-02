// Layout Provider - Renders appropriate layout based on store
'use client';

import { MainLayout } from '@/src/presentation/components/layouts/main/MainLayout';
import { RetroLayout } from '@/src/presentation/components/layouts/retro/RetroLayout';
import { useLayoutStore } from '@/src/presentation/stores/layoutStore';
import { type ReactNode, useEffect, useState } from 'react';

interface LayoutProviderProps {
  children: ReactNode;
}

export function LayoutProvider({ children }: LayoutProviderProps) {
  const currentLayout = useLayoutStore((state) => state.currentLayout);
  const [mounted, setMounted] = useState(false);

  // Wait for client-side hydration to avoid layout mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // During SSR or before hydration, render skeleton or default layout
  if (!mounted) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-12 h-12 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
          <div className="w-32 h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    );
  }

  if (currentLayout === 'retro') {
    return <RetroLayout>{children}</RetroLayout>;
  }

  return <MainLayout>{children}</MainLayout>;
}
