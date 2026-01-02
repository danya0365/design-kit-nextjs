// Explore/Trending Page
'use client';

import { mockCategories } from '@/src/data/mock/categories';
import { mockComponents } from '@/src/data/mock/components';
import { useLayoutStore } from '@/src/presentation/stores/layoutStore';
import Link from 'next/link';
import { useState } from 'react';

// Mock trending data
const trendingComponents = mockComponents.slice(0, 6);
const newComponents = mockComponents.slice(3, 9);
const topCreators = [
  { name: 'Sarah Designer', components: 24, downloads: 12500, avatar: 'https://i.pravatar.cc/40?u=sarah' },
  { name: 'Mike Developer', components: 18, downloads: 8900, avatar: 'https://i.pravatar.cc/40?u=mike' },
  { name: 'Alex UI', components: 15, downloads: 7200, avatar: 'https://i.pravatar.cc/40?u=alex' },
];

export default function ExplorePage() {
  const currentLayout = useLayoutStore((state) => state.currentLayout);
  const [activeTab, setActiveTab] = useState<'trending' | 'new' | 'categories'>('trending');

  if (currentLayout === 'retro') {
    return (
      <div className="retro-page">
        <h1 className="retro-page-title">🔥 Explore</h1>

        {/* Tabs */}
        <div style={{ marginBottom: '12px', display: 'flex', gap: '4px' }}>
          {(['trending', 'new', 'categories'] as const).map((tab) => (
            <button
              key={tab}
              className={`retro-btn ${activeTab === tab ? 'retro-btn-primary' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === 'trending' ? '🔥 Trending' : tab === 'new' ? '✨ New' : '📁 Categories'}
            </button>
          ))}
        </div>

        {/* Trending */}
        {activeTab === 'trending' && (
          <div className="retro-groupbox">
            <span className="retro-groupbox-title">🔥 Trending This Week</span>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '8px', padding: '8px' }}>
              {trendingComponents.map((comp) => (
                <Link key={comp.id} href={`/components/${comp.id}`}>
                  <div className="retro-card" style={{ cursor: 'pointer' }}>
                    <div style={{ fontWeight: 'bold', fontSize: '11px' }}>
                      {comp.category?.icon} {comp.name}
                    </div>
                    <div style={{ fontSize: '10px', color: 'gray' }}>
                      ⭐ {comp.rating.toFixed(1)} • ⬇️ {comp.downloadCount}
                    </div>
                    <div style={{ fontSize: '11px', fontWeight: 'bold', marginTop: '4px' }}>
                      {comp.isFree ? 'FREE' : `$${comp.price}`}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* New */}
        {activeTab === 'new' && (
          <div className="retro-groupbox">
            <span className="retro-groupbox-title">✨ Just Added</span>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '8px', padding: '8px' }}>
              {newComponents.map((comp) => (
                <Link key={comp.id} href={`/components/${comp.id}`}>
                  <div className="retro-card" style={{ cursor: 'pointer' }}>
                    <div style={{ fontWeight: 'bold', fontSize: '11px' }}>
                      {comp.category?.icon} {comp.name}
                    </div>
                    <div style={{ fontSize: '10px', color: 'gray' }}>
                      {comp.category?.name}
                    </div>
                    <div style={{ fontSize: '11px', fontWeight: 'bold', marginTop: '4px' }}>
                      {comp.isFree ? 'FREE' : `$${comp.price}`}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Categories */}
        {activeTab === 'categories' && (
          <div className="retro-groupbox">
            <span className="retro-groupbox-title">📁 Browse by Category</span>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '8px', padding: '8px' }}>
              {mockCategories.map((cat) => (
                <Link key={cat.id} href={`/components?category=${cat.id}`}>
                  <div className="retro-card" style={{ cursor: 'pointer', textAlign: 'center' }}>
                    <div style={{ fontSize: '24px' }}>{cat.icon}</div>
                    <div style={{ fontWeight: 'bold', fontSize: '12px' }}>{cat.name}</div>
                    <div style={{ fontSize: '10px', color: 'gray' }}>{cat.description}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Top Creators */}
        <div className="retro-groupbox" style={{ marginTop: '12px' }}>
          <span className="retro-groupbox-title">⭐ Top Creators</span>
          <div style={{ padding: '8px' }}>
            {topCreators.map((creator, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span style={{ fontWeight: 'bold', width: '16px' }}>#{i + 1}</span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={creator.avatar} alt={creator.name} style={{ width: '24px', height: '24px', borderRadius: '4px' }} />
                <span style={{ flex: 1, fontSize: '12px' }}>{creator.name}</span>
                <span style={{ fontSize: '10px', color: 'gray' }}>{creator.downloads.toLocaleString()} downloads</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          🔥 Explore
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Discover trending components and top creators
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-4 mb-8">
        {(['trending', 'new', 'categories'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`main-btn ${activeTab === tab ? 'main-btn-primary' : 'main-btn-secondary'}`}
          >
            {tab === 'trending' ? '🔥 Trending' : tab === 'new' ? '✨ New' : '📁 Categories'}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="mb-12">
        {activeTab === 'trending' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingComponents.map((comp, i) => (
              <Link key={comp.id} href={`/components/${comp.id}`}>
                <div className="main-card group relative hover:border-indigo-500 transition-colors">
                  {i < 3 && (
                    <div className="absolute top-4 left-4 w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center font-bold">
                      #{i + 1}
                    </div>
                  )}
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
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">
                      ⭐ {comp.rating.toFixed(1)} • ⬇️ {comp.downloadCount.toLocaleString()}
                    </span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {comp.isFree ? 'Free' : `$${comp.price}`}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {activeTab === 'new' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newComponents.map((comp) => (
              <Link key={comp.id} href={`/components/${comp.id}`}>
                <div className="main-card group hover:border-indigo-500 transition-colors">
                  <span className="absolute top-4 right-4 px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs rounded-full">
                    New
                  </span>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={comp.previewUrl}
                    alt={comp.name}
                    className="w-full h-40 object-cover rounded-lg mb-4"
                  />
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    {comp.category?.icon} {comp.name}
                  </h3>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {comp.isFree ? 'Free' : `$${comp.price}`}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}

        {activeTab === 'categories' && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {mockCategories.map((cat) => (
              <Link key={cat.id} href={`/components?category=${cat.id}`}>
                <div className="main-card text-center hover:border-indigo-500 transition-colors">
                  <div className="text-4xl mb-3">{cat.icon}</div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-gray-500 line-clamp-2">
                    {cat.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Top Creators */}
      <div className="main-card">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          ⭐ Top Creators
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topCreators.map((creator, i) => (
            <div key={i} className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <span className="text-2xl font-bold text-indigo-600">#{i + 1}</span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={creator.avatar} alt={creator.name} className="w-12 h-12 rounded-full" />
              <div>
                <div className="font-semibold text-gray-900 dark:text-white">{creator.name}</div>
                <div className="text-sm text-gray-500">
                  {creator.components} components • {creator.downloads.toLocaleString()} downloads
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
