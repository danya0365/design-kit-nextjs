// MainLayout - Modern full-screen layout
'use client';

import type { ReactNode } from 'react';
import { MainFooter } from './MainFooter';
import { MainHeader } from './MainHeader';

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="main-layout">
      <MainHeader />
      <main className="main-content">
        {children}
      </main>
      <MainFooter />
    </div>
  );
}
