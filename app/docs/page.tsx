// Documentation Page
'use client';

import { useLayoutStore } from '@/src/presentation/stores/layoutStore';
import Link from 'next/link';

const docs = [
  {
    title: 'Getting Started',
    icon: '🚀',
    description: 'Learn how to browse, preview, and export components.',
    href: '/docs/getting-started',
  },
  {
    title: 'Exporting Components',
    icon: '📦',
    description: 'How to export components to HTML, React, or Next.js.',
    href: '/docs/exporting',
  },
  {
    title: 'Customization',
    icon: '🎨',
    description: 'Customize components with props and variants.',
    href: '/docs/customization',
  },
  {
    title: 'For Creators',
    icon: '👨‍🎨',
    description: 'Learn how to create and sell your own components.',
    href: '/docs/creators',
  },
  {
    title: 'API Reference',
    icon: '📚',
    description: 'Integration API for advanced use cases.',
    href: '/docs/api',
  },
  {
    title: 'FAQ',
    icon: '❓',
    description: 'Frequently asked questions about Design Kit.',
    href: '/docs/faq',
  },
];

export default function DocsPage() {
  const currentLayout = useLayoutStore((state) => state.currentLayout);

  if (currentLayout === 'retro') {
    return (
      <div className="retro-page">
        <h1 className="retro-page-title">📚 Documentation</h1>
        <p style={{ marginBottom: '16px' }}>Welcome to Design Kit documentation. Select a topic to get started.</p>
        
        <div className="retro-groupbox">
          <span className="retro-groupbox-title">Topics</span>
          <div style={{ padding: '8px' }}>
            {docs.map((doc) => (
              <div key={doc.title} style={{ marginBottom: '8px' }}>
                <Link href={doc.href} className="retro-link" style={{ fontWeight: 'bold' }}>
                  {doc.icon} {doc.title}
                </Link>
                <p style={{ fontSize: '11px', color: 'gray', marginLeft: '24px' }}>{doc.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="retro-groupbox" style={{ marginTop: '16px' }}>
          <span className="retro-groupbox-title">Quick Start</span>
          <div style={{ padding: '8px', fontFamily: 'monospace', fontSize: '11px', background: '#000', color: '#0f0' }}>
            <p>1. Browse components at /components</p>
            <p>2. Click on a component to preview</p>
            <p>3. Select export format (HTML/React/Next.js)</p>
            <p>4. Copy code and paste into your project</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Documentation
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Everything you need to know about Design Kit
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {docs.map((doc) => (
          <Link key={doc.title} href={doc.href}>
            <div className="main-card h-full hover:border-indigo-500 transition-colors">
              <div className="text-3xl mb-3">{doc.icon}</div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                {doc.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {doc.description}
              </p>
            </div>
          </Link>
        ))}
      </div>

      <div className="main-card bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
        <h2 className="text-2xl font-bold mb-4">Quick Start</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center p-4">
            <div className="text-3xl mb-2">1️⃣</div>
            <p className="text-sm">Browse components</p>
          </div>
          <div className="text-center p-4">
            <div className="text-3xl mb-2">2️⃣</div>
            <p className="text-sm">Preview & customize</p>
          </div>
          <div className="text-center p-4">
            <div className="text-3xl mb-2">3️⃣</div>
            <p className="text-sm">Select export format</p>
          </div>
          <div className="text-center p-4">
            <div className="text-3xl mb-2">4️⃣</div>
            <p className="text-sm">Copy & use in your project</p>
          </div>
        </div>
      </div>
    </div>
  );
}
