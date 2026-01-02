// Favorites Page - Wishlist
'use client';

import { mockComponents } from '@/src/data/mock/components';
import { useFavoritesStore } from '@/src/presentation/stores/favoritesStore';
import { useLayoutStore } from '@/src/presentation/stores/layoutStore';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function FavoritesPage() {
  const currentLayout = useLayoutStore((state) => state.currentLayout);
  const { favoriteIds, removeFavorite, clearFavorites } = useFavoritesStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Get favorite components from mock data
  const favoriteComponents = mockComponents.filter(c => favoriteIds.includes(c.id));

  if (currentLayout === 'retro') {
    return (
      <div className="retro-page">
        <h1 className="retro-page-title">❤️ My Favorites</h1>

        {favoriteComponents.length === 0 ? (
          <div className="retro-card" style={{ textAlign: 'center', padding: '40px' }}>
            <p style={{ marginBottom: '16px' }}>You haven&apos;t added any favorites yet.</p>
            <Link href="/components">
              <button className="retro-btn retro-btn-primary">Browse Components</button>
            </Link>
          </div>
        ) : (
          <>
            <div style={{ marginBottom: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>{favoriteComponents.length} items</span>
              <button className="retro-btn" onClick={clearFavorites}>
                Clear All
              </button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '8px' }}>
              {favoriteComponents.map((comp) => (
                <div key={comp.id} className="retro-card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <Link href={`/components/${comp.id}`} className="retro-link">
                      {comp.category?.icon} {comp.name}
                    </Link>
                    <button
                      onClick={() => removeFavorite(comp.id)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'red' }}
                    >
                      ×
                    </button>
                  </div>
                  <p style={{ fontSize: '11px', color: 'gray', marginBottom: '8px' }}>
                    {comp.description.substring(0, 60)}...
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
                    <span>⭐ {comp.rating.toFixed(1)}</span>
                    <span style={{ fontWeight: 'bold' }}>
                      {comp.isFree ? 'FREE' : `$${comp.price}`}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            ❤️ My Favorites
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {favoriteComponents.length} components saved
          </p>
        </div>
        {favoriteComponents.length > 0 && (
          <button onClick={clearFavorites} className="main-btn main-btn-secondary">
            Clear All
          </button>
        )}
      </div>

      {favoriteComponents.length === 0 ? (
        <div className="main-card text-center py-16">
          <div className="text-6xl mb-4">💔</div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No favorites yet
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Start browsing and add components you like!
          </p>
          <Link href="/components" className="main-btn main-btn-primary">
            Browse Components
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoriteComponents.map((comp) => (
            <div key={comp.id} className="main-card group relative">
              <button
                onClick={() => removeFavorite(comp.id)}
                className="absolute top-4 right-4 w-8 h-8 bg-red-100 dark:bg-red-900/30 text-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                ×
              </button>
              <Link href={`/components/${comp.id}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={comp.previewUrl}
                  alt={comp.name}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
                <div className="flex items-center gap-2 mb-2">
                  <span>{comp.category?.icon}</span>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {comp.name}
                  </h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-4">
                  {comp.description}
                </p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-yellow-500">⭐ {comp.rating.toFixed(1)}</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {comp.isFree ? 'Free' : `$${comp.price}`}
                  </span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
