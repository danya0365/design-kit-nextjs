// MainHeader - Modern header with navigation, theme toggle, and layout switcher
'use client';

import { useLayoutStore } from '@/src/presentation/stores/layoutStore';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export function MainHeader() {
  const { theme, setTheme } = useTheme();
  const { currentLayout, toggleLayout } = useLayoutStore();
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
          <Link href="/" className="main-nav-link main-nav-link-active">
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
            title={`Switch to ${currentLayout === 'main' ? 'Retro' : 'Modern'} Layout`}
          >
            {currentLayout === 'main' ? '🖥️' : '✨'}
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
          <button className="main-icon-button">
            🛒
          </button>

          {/* User Actions */}
          <button className="main-button-outline">
            Sign In
          </button>
          <button className="main-button-primary">
            Get Started
          </button>
        </div>
      </div>
    </header>
  );
}
