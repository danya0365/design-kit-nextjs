// Creators Page - Simple listing page
'use client';

import { mockUsers } from '@/src/data/mock/users';
import { useLayoutStore } from '@/src/presentation/stores/layoutStore';
import Link from 'next/link';

const creators = mockUsers.filter(u => u.role === 'creator');

export default function CreatorsPage() {
  const currentLayout = useLayoutStore((state) => state.currentLayout);

  if (currentLayout === 'retro') {
    return (
      <div className="retro-page">
        <h1 className="retro-page-title">👥 Creators</h1>
        <div className="retro-groupbox">
          <span className="retro-groupbox-title">Our Creators</span>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '8px', padding: '8px' }}>
            {creators.map((creator) => (
              <div key={creator.id} className="retro-card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={creator.avatar}
                    alt={creator.name}
                    style={{ width: '32px', height: '32px', borderRadius: '4px' }}
                  />
                  <div>
                    <div style={{ fontWeight: 'bold' }}>{creator.name}</div>
                    <div style={{ fontSize: '11px', color: 'gray' }}>{creator.email}</div>
                  </div>
                </div>
                <Link href={`/creators/${creator.id}`} className="retro-link">
                  View Profile →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Creators
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Meet the talented designers behind our components
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {creators.map((creator) => (
          <div key={creator.id} className="main-card">
            <div className="flex items-center gap-4 mb-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={creator.avatar}
                alt={creator.name}
                className="w-16 h-16 rounded-full"
              />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {creator.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {creator.email}
                </p>
              </div>
            </div>
            <Link
              href={`/creators/${creator.id}`}
              className="main-btn main-btn-secondary w-full"
            >
              View Profile
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
