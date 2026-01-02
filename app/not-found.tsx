// Custom 404 Page
'use client';

import { useLayoutStore } from '@/src/presentation/stores/layoutStore';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function NotFound() {
  const currentLayout = useLayoutStore((state) => state.currentLayout);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Default render before hydration
  if (!mounted) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="text-8xl mb-6">🔍</div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            404 - Page Not Found
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            The page you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link href="/" className="main-btn main-btn-primary">
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  if (currentLayout === 'retro') {
    return (
      <div className="retro-page" style={{ textAlign: 'center', paddingTop: '40px' }}>
        <div className="retro-card" style={{ maxWidth: '400px', margin: '0 auto', padding: '24px' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>❌</div>
          <h1 style={{ fontWeight: 'bold', fontSize: '24px', marginBottom: '8px' }}>
            404 Error
          </h1>
          <p style={{ marginBottom: '16px', color: 'gray' }}>
            The page you requested could not be found on this server.
          </p>
          <div style={{ background: '#ffffcc', padding: '8px', border: '1px solid #808080', marginBottom: '16px', fontSize: '11px' }}>
            💡 Tip: Check the URL for typos or use the navigation menu.
          </div>
          <Link href="/">
            <button className="retro-btn retro-btn-primary">Return to Homepage</button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex items-center justify-center min-h-[60vh]">
      <div className="text-center max-w-lg mx-auto px-4">
        <div className="text-8xl mb-6 animate-bounce">🔍</div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          404 - Page Not Found
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/" className="main-btn main-btn-primary">
            Go Home
          </Link>
          <Link href="/components" className="main-btn main-btn-secondary">
            Browse Components
          </Link>
        </div>
      </div>
    </div>
  );
}
