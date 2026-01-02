// MainHeader - Modern header with navigation, theme toggle, and layout switcher
'use client';

import { useCartStore } from '@/src/presentation/stores/cartStore';
import { useLayoutStore } from '@/src/presentation/stores/layoutStore';
import { useUserStore } from '@/src/presentation/stores/userStore';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export function MainHeader() {
  const { theme, setTheme } = useTheme();
  const { toggleLayout } = useLayoutStore();
  const cartItemCount = useCartStore((state) => state.getItemCount());
  const { currentUser, isAuthenticated } = useUserStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleThemeToggle = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header className="main-header">
      <div className="main-header-container">
        {/* Logo */}
        <Link href="/" className="main-logo">
          <span className="main-logo-icon">🎨</span>
          <span className="main-logo-text">Design Kit</span>
        </Link>

        {/* Navigation */}
        <nav className="main-nav">
          <Link href="/" className="main-nav-link">
            <span className="main-nav-icon">🏠</span>
            Home
          </Link>
          <Link href="/components" className="main-nav-link">
            <span className="main-nav-icon">📦</span>
            Components
          </Link>
          <Link href="/creators" className="main-nav-link">
            <span className="main-nav-icon">👥</span>
            Creators
          </Link>
          <Link href="/dashboard" className="main-nav-link">
            <span className="main-nav-icon">📊</span>
            Dashboard
          </Link>
          <Link href="/pricing" className="main-nav-link">
            <span className="main-nav-icon">💰</span>
            Pricing
          </Link>
        </nav>

        {/* Actions */}
        <div className="main-header-actions">
          {/* Layout Toggle */}
          <button 
            onClick={toggleLayout}
            className="main-icon-button"
            title="Switch to Retro Layout"
          >
            🖥️
          </button>

          {/* Theme Toggle */}
          <button 
            onClick={handleThemeToggle}
            className="main-icon-button"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          >
            {mounted ? (theme === 'dark' ? '☀️' : '🌙') : '🌙'}
          </button>

          {/* Cart */}
          <Link href="/cart" className="main-icon-button relative">
            🛒
            {mounted && cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </Link>

          {/* User Actions */}
          {mounted && isAuthenticated ? (
            <Link href="/profile" className="flex items-center gap-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={currentUser?.avatar}
                alt={currentUser?.name}
                className="w-8 h-8 rounded-full"
              />
            </Link>
          ) : (
            <>
              <Link href="/profile" className="main-button-outline">
                Sign In
              </Link>
              <Link href="/pricing" className="main-button-primary">
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

