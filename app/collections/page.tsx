// Collections/Bundles Page
'use client';

import { getCollectionComponents, mockCollections } from '@/src/data/mock/collections';
import { useLayoutStore } from '@/src/presentation/stores/layoutStore';
import { useToastStore } from '@/src/presentation/stores/toastStore';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function CollectionsPage() {
  const currentLayout = useLayoutStore((state) => state.currentLayout);
  const { addToast } = useToastStore();
  const [mounted, setMounted] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleBuyBundle = (collectionName: string) => {
    addToast(`${collectionName} added to cart!`, 'success');
  };

  if (currentLayout === 'retro') {
    return (
      <div className="retro-page">
        <h1 className="retro-page-title">📦 Component Bundles</h1>
        <p style={{ marginBottom: '12px', fontSize: '12px' }}>
          Save up to 33% with our curated component bundles!
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '12px' }}>
          {mockCollections.map((collection) => {
            const components = getCollectionComponents(collection.id);
            return (
              <div key={collection.id} className="retro-card">
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '8px' }}>
                  <span style={{ fontSize: '24px' }}>{collection.icon}</span>
                  <div>
                    <h3 style={{ fontWeight: 'bold', fontSize: '14px' }}>{collection.name}</h3>
                    {collection.featured && (
                      <span style={{ fontSize: '10px', background: '#ffff00', padding: '2px 4px' }}>
                        ⭐ FEATURED
                      </span>
                    )}
                  </div>
                </div>
                <p style={{ fontSize: '11px', marginBottom: '8px', color: 'gray' }}>
                  {collection.description}
                </p>
                <div style={{ fontSize: '11px', marginBottom: '8px' }}>
                  <strong>{components.length} components included:</strong>
                  <ul style={{ paddingLeft: '16px', marginTop: '4px' }}>
                    {components.slice(0, 3).map(c => (
                      <li key={c.id}>{c.category?.icon} {c.name}</li>
                    ))}
                    {components.length > 3 && <li>...and {components.length - 3} more</li>}
                  </ul>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <span style={{ textDecoration: 'line-through', color: 'gray' }}>
                    ${collection.originalPrice}
                  </span>
                  <span style={{ fontWeight: 'bold', fontSize: '18px', color: 'green' }}>
                    ${collection.discountedPrice}
                  </span>
                  <span style={{ fontSize: '11px', background: '#00ff00', padding: '2px 4px' }}>
                    SAVE {collection.discount}%
                  </span>
                </div>
                <button
                  className="retro-btn retro-btn-primary"
                  style={{ width: '100%' }}
                  onClick={() => handleBuyBundle(collection.name)}
                >
                  🛒 Buy Bundle
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          📦 Component Bundles
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Save up to 33% with our curated component bundles
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {mockCollections.map((collection) => {
          const components = getCollectionComponents(collection.id);
          return (
            <div
              key={collection.id}
              className={`main-card relative overflow-hidden ${collection.featured ? 'ring-2 ring-indigo-500' : ''}`}
            >
              {collection.featured && (
                <div className="absolute top-4 right-4 bg-indigo-500 text-white text-xs px-3 py-1 rounded-full">
                  ⭐ Featured
                </div>
              )}
              
              <div className="flex items-start gap-4 mb-4">
                <span className="text-4xl">{collection.icon}</span>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {collection.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {collection.description}
                  </p>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  {components.length} components included:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {components.map(c => (
                    <Link
                      key={c.id}
                      href={`/components/${c.id}`}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    >
                      {c.category?.icon} {c.name}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <span className="text-gray-400 line-through text-lg">
                    ${collection.originalPrice}
                  </span>
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">
                    ${collection.discountedPrice}
                  </span>
                  <span className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-sm px-2 py-1 rounded">
                    Save {collection.discount}%
                  </span>
                </div>
                <button
                  onClick={() => handleBuyBundle(collection.name)}
                  className="main-btn main-btn-primary"
                >
                  🛒 Buy Bundle
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
