// RetroHomeView - IE5/Windows 98 style home page content
'use client';

import type { HomeViewModel } from '@/src/presentation/presenters/home/HomePresenter';
import Link from 'next/link';

interface RetroHomeViewProps {
  viewModel: HomeViewModel;
}

export function RetroHomeView({ viewModel }: RetroHomeViewProps) {
  return (
    <div className="retro-page">
      {/* Welcome Banner */}
      <div className="retro-card" style={{ marginBottom: '16px' }}>
        <div style={{ textAlign: 'center', padding: '16px' }}>
          <h1 className="retro-page-title" style={{ fontSize: '16px', marginBottom: '8px' }}>
            🌐 Welcome to Design Kit Component Marketplace!
          </h1>
          <p className="retro-text">
            Find and export UI components for your web projects.
          </p>
          <div style={{ marginTop: '12px', display: 'flex', justifyContent: 'center', gap: '8px' }}>
            <Link href="/components">
              <button className="retro-btn retro-btn-primary">
                Browse Components
              </button>
            </Link>
            <Link href="/docs">
              <button className="retro-btn">
                Documentation
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Group Box */}
      <div className="retro-groupbox" style={{ marginBottom: '16px' }}>
        <span className="retro-groupbox-title">📊 Statistics</span>
        <div style={{ display: 'flex', justifyContent: 'space-around', textAlign: 'center', padding: '8px' }}>
          <div>
            <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
              {viewModel.stats.totalComponents}
            </div>
            <div className="retro-text">Components</div>
          </div>
          <div>
            <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
              {viewModel.stats.totalCreators}
            </div>
            <div className="retro-text">Creators</div>
          </div>
          <div>
            <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
              {viewModel.stats.totalDownloads.toLocaleString()}
            </div>
            <div className="retro-text">Downloads</div>
          </div>
        </div>
      </div>

      {/* Featured Components */}
      <div className="retro-groupbox" style={{ marginBottom: '16px' }}>
        <span className="retro-groupbox-title">⭐ Featured Components</span>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '8px', padding: '8px' }}>
          {viewModel.featuredComponents.map((component) => (
            <Link key={component.id} href={`/components/${component.id}`}>
              <div className="retro-card" style={{ cursor: 'pointer' }}>
                <div className="retro-card-header">
                  <span className="retro-card-icon">{component.category?.icon || '📦'}</span>
                  <span className="retro-card-title">{component.name}</span>
                </div>
                <p className="retro-card-description" style={{ marginBottom: '8px' }}>
                  {component.description.substring(0, 60)}...
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
                  <span>⭐ {component.rating.toFixed(1)}</span>
                  <span style={{ fontWeight: 'bold' }}>
                    {component.isFree ? 'FREE' : `$${component.price}`}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="retro-groupbox">
        <span className="retro-groupbox-title">📁 Categories</span>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '4px', padding: '8px' }}>
          {viewModel.categories.map((category) => (
            <Link
              key={category.id}
              href={`/components?category=${category.slug}`}
              className="retro-link"
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '4px',
                padding: '4px 8px',
                textDecoration: 'none'
              }}
            >
              <span>{category.icon}</span>
              <span style={{ color: '#0000ff' }}>
                {category.name} ({category.componentCount})
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Scrolling banner for nostalgia */}
      <div 
        style={{ 
          marginTop: '16px', 
          padding: '8px', 
          background: '#000080', 
          color: '#ffff00', 
          textAlign: 'center',
          overflow: 'hidden',
          whiteSpace: 'nowrap'
        }}
      >
        <span 
          style={{ 
            display: 'inline-block',
            animation: 'scroll 15s linear infinite'
          }}
        >
          🎨 Design Kit - Design once, export anywhere! HTML • React • Next.js • Tailwind • CSS 🎨
        </span>
        <style>{`
          @keyframes scroll {
            0% { transform: translateX(100%); }
            100% { transform: translateX(-100%); }
          }
        `}</style>
      </div>
    </div>
  );
}
