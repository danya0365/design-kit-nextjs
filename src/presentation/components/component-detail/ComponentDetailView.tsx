// ComponentDetailView - Displays component details with export options
'use client';

import type { Platform, StyleSystem } from '@/src/domain/entities';
import type { ComponentDetailViewModel } from '@/src/presentation/presenters/component-detail/ComponentDetailPresenter';
import { useLayoutStore } from '@/src/presentation/stores/layoutStore';
import Link from 'next/link';
import { useState } from 'react';

interface ComponentDetailViewProps {
  viewModel: ComponentDetailViewModel;
}

export function ComponentDetailView({ viewModel }: ComponentDetailViewProps) {
  const currentLayout = useLayoutStore((state) => state.currentLayout);
  const { component, relatedComponents } = viewModel;
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>('react');
  const [selectedStyle, setSelectedStyle] = useState<StyleSystem>('tailwind');
  const [copied, setCopied] = useState(false);

  if (!component) {
    if (currentLayout === 'retro') {
      return (
        <div className="retro-page">
          <h1 className="retro-page-title">❌ Component Not Found</h1>
          <p>The requested component could not be found.</p>
          <Link href="/components" className="retro-link">
            ← Back to Components
          </Link>
        </div>
      );
    }
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😢</div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Component Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            The requested component could not be found.
          </p>
          <Link href="/components" className="main-btn main-btn-primary">
            Back to Components
          </Link>
        </div>
      </div>
    );
  }

  const handleCopy = () => {
    const exportData = component.exports.find(
      e => e.platform === selectedPlatform && e.styleSystem === selectedStyle
    );
    if (exportData) {
      navigator.clipboard.writeText(exportData.codeTemplate);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (currentLayout === 'retro') {
    return (
      <div className="retro-page">
        <Link href="/components" className="retro-link" style={{ marginBottom: '12px', display: 'inline-block' }}>
          ← Back to Components
        </Link>

        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          {/* Preview */}
          <div className="retro-card" style={{ flex: '1', minWidth: '300px' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={component.previewUrl}
              alt={component.name}
              style={{ width: '100%', border: '2px inset #808080' }}
            />
          </div>

          {/* Info */}
          <div style={{ flex: '1', minWidth: '300px' }}>
            <div className="retro-card" style={{ marginBottom: '12px' }}>
              <h1 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px' }}>
                {component.category?.icon} {component.name}
              </h1>
              <p style={{ fontSize: '12px', marginBottom: '8px' }}>{component.description}</p>
              <div style={{ display: 'flex', gap: '16px', fontSize: '12px' }}>
                <span>⭐ {component.rating.toFixed(1)} ({component.ratingCount} reviews)</span>
                <span>⬇️ {component.downloadCount} downloads</span>
              </div>
              <div style={{ marginTop: '8px', fontWeight: 'bold', fontSize: '18px' }}>
                {component.isFree ? 'FREE' : `$${component.price}`}
              </div>
            </div>

            {/* Export Options */}
            <div className="retro-groupbox">
              <span className="retro-groupbox-title">📦 Export</span>
              <div style={{ padding: '8px' }}>
                <div style={{ marginBottom: '8px' }}>
                  <label className="retro-input-label">Platform:</label>
                  <select
                    className="retro-select"
                    value={selectedPlatform}
                    onChange={(e) => setSelectedPlatform(e.target.value as Platform)}
                  >
                    <option value="html">HTML</option>
                    <option value="react">React</option>
                    <option value="nextjs">Next.js</option>
                  </select>
                </div>
                <div style={{ marginBottom: '8px' }}>
                  <label className="retro-input-label">Style:</label>
                  <select
                    className="retro-select"
                    value={selectedStyle}
                    onChange={(e) => setSelectedStyle(e.target.value as StyleSystem)}
                  >
                    <option value="css">CSS</option>
                    <option value="tailwind">Tailwind</option>
                    <option value="css-module">CSS Module</option>
                  </select>
                </div>
                <button className="retro-btn retro-btn-primary" style={{ width: '100%' }} onClick={handleCopy}>
                  {copied ? '✓ Copied!' : '📋 Copy Code'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Related */}
        {relatedComponents.length > 0 && (
          <div className="retro-groupbox" style={{ marginTop: '16px' }}>
            <span className="retro-groupbox-title">Related Components</span>
            <div style={{ display: 'flex', gap: '8px', padding: '8px', flexWrap: 'wrap' }}>
              {relatedComponents.map((c) => (
                <Link key={c.id} href={`/components/${c.id}`}>
                  <div className="retro-card" style={{ width: '150px', cursor: 'pointer' }}>
                    <div style={{ fontWeight: 'bold', fontSize: '11px' }}>{c.name}</div>
                    <div style={{ fontSize: '10px' }}>
                      {c.isFree ? 'FREE' : `$${c.price}`}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Main Layout
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link href="/components" className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6">
        ← Back to Components
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Preview */}
        <div className="main-card">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={component.previewUrl}
            alt={component.name}
            className="w-full rounded-lg"
          />
          {component.previewImages.length > 1 && (
            <div className="flex gap-2 mt-4">
              {component.previewImages.map((img, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={i}
                  src={img}
                  alt={`Preview ${i + 1}`}
                  className="w-20 h-14 object-cover rounded cursor-pointer opacity-70 hover:opacity-100"
                />
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">{component.category?.icon}</span>
            <span className="text-sm text-gray-500 dark:text-gray-400">{component.category?.name}</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {component.name}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {component.description}
          </p>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-1">
              <span className="text-yellow-500">⭐</span>
              <span className="font-semibold">{component.rating.toFixed(1)}</span>
              <span className="text-gray-500">({component.ratingCount})</span>
            </div>
            <span className="text-gray-300">|</span>
            <span className="text-gray-600 dark:text-gray-400">
              {component.downloadCount.toLocaleString()} downloads
            </span>
          </div>

          <div className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            {component.isFree ? 'Free' : `$${component.price}`}
          </div>

          {/* Export Options */}
          <div className="main-card mb-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Export Options</h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="main-input-label">Platform</label>
                <select
                  className="main-select"
                  value={selectedPlatform}
                  onChange={(e) => setSelectedPlatform(e.target.value as Platform)}
                >
                  <option value="html">HTML</option>
                  <option value="react">React</option>
                  <option value="nextjs">Next.js</option>
                </select>
              </div>
              <div>
                <label className="main-input-label">Style System</label>
                <select
                  className="main-select"
                  value={selectedStyle}
                  onChange={(e) => setSelectedStyle(e.target.value as StyleSystem)}
                >
                  <option value="css">CSS</option>
                  <option value="tailwind">Tailwind CSS</option>
                  <option value="css-module">CSS Module</option>
                </select>
              </div>
            </div>
            <button
              onClick={handleCopy}
              className="w-full main-btn main-btn-primary"
            >
              {copied ? '✓ Copied to Clipboard!' : '📋 Copy Code'}
            </button>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {component.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full text-sm"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Related Components */}
      {relatedComponents.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Related Components
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedComponents.map((c) => (
              <Link key={c.id} href={`/components/${c.id}`}>
                <div className="main-card">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={c.previewUrl}
                    alt={c.name}
                    className="w-full h-32 object-cover rounded-lg mb-3"
                  />
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {c.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {c.isFree ? 'Free' : `$${c.price}`}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
