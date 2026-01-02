// Downloads Page - Purchase history and downloads
'use client';

import { mockComponents } from '@/src/data/mock/components';
import { useLayoutStore } from '@/src/presentation/stores/layoutStore';
import { useToastStore } from '@/src/presentation/stores/toastStore';
import { useUserStore } from '@/src/presentation/stores/userStore';
import Link from 'next/link';
import { useEffect, useState } from 'react';

// Mock purchase data
const mockPurchases = [
  { id: 'purchase-1', componentId: 'comp-1', date: '2025-12-28', price: 29 },
  { id: 'purchase-2', componentId: 'comp-2', date: '2025-12-25', price: 49 },
  { id: 'purchase-3', componentId: 'comp-3', date: '2025-12-20', price: 0 },
];

export default function DownloadsPage() {
  const currentLayout = useLayoutStore((state) => state.currentLayout);
  const { isAuthenticated, login } = useUserStore();
  const { addToast } = useToastStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!isAuthenticated) {
      login('john@designkit.com');
    }
  }, [isAuthenticated, login]);

  if (!mounted) return null;

  const purchases = mockPurchases.map(p => ({
    ...p,
    component: mockComponents.find(c => c.id === p.componentId),
  })).filter(p => p.component);

  const handleDownload = (componentName: string) => {
    addToast(`Downloading ${componentName}...`, 'info');
    setTimeout(() => {
      addToast(`${componentName} downloaded successfully!`, 'success');
    }, 1500);
  };

  if (currentLayout === 'retro') {
    return (
      <div className="retro-page">
        <h1 className="retro-page-title">📥 My Downloads</h1>

        {purchases.length === 0 ? (
          <div className="retro-card" style={{ textAlign: 'center', padding: '40px' }}>
            <p style={{ marginBottom: '16px' }}>No purchases yet.</p>
            <Link href="/components">
              <button className="retro-btn retro-btn-primary">Browse Components</button>
            </Link>
          </div>
        ) : (
          <div className="retro-groupbox">
            <span className="retro-groupbox-title">Purchase History</span>
            <table style={{ width: '100%', fontSize: '11px', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#c0c0c0' }}>
                  <th style={{ padding: '8px', border: '1px solid #808080', textAlign: 'left' }}>Component</th>
                  <th style={{ padding: '8px', border: '1px solid #808080', textAlign: 'right' }}>Price</th>
                  <th style={{ padding: '8px', border: '1px solid #808080', textAlign: 'right' }}>Date</th>
                  <th style={{ padding: '8px', border: '1px solid #808080', textAlign: 'center' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {purchases.map((p) => (
                  <tr key={p.id}>
                    <td style={{ padding: '8px', border: '1px solid #808080' }}>
                      <Link href={`/components/${p.componentId}`} className="retro-link">
                        {p.component?.category?.icon} {p.component?.name}
                      </Link>
                    </td>
                    <td style={{ padding: '8px', border: '1px solid #808080', textAlign: 'right' }}>
                      {p.price === 0 ? 'FREE' : `$${p.price}`}
                    </td>
                    <td style={{ padding: '8px', border: '1px solid #808080', textAlign: 'right' }}>
                      {p.date}
                    </td>
                    <td style={{ padding: '8px', border: '1px solid #808080', textAlign: 'center' }}>
                      <button
                        className="retro-btn"
                        onClick={() => handleDownload(p.component?.name || '')}
                      >
                        📥 Download
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        📥 My Downloads
      </h1>

      {purchases.length === 0 ? (
        <div className="main-card text-center py-16">
          <div className="text-6xl mb-4">📦</div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No purchases yet
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Browse our components and make your first purchase!
          </p>
          <Link href="/components" className="main-btn main-btn-primary">
            Browse Components
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {purchases.map((p) => (
            <div key={p.id} className="main-card">
              <div className="flex items-center gap-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.component?.previewUrl}
                  alt={p.component?.name}
                  className="w-24 h-16 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <Link href={`/components/${p.componentId}`}>
                    <h3 className="font-semibold text-gray-900 dark:text-white hover:text-indigo-600">
                      {p.component?.category?.icon} {p.component?.name}
                    </h3>
                  </Link>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Purchased on {p.date}
                  </p>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-gray-900 dark:text-white mb-2">
                    {p.price === 0 ? 'Free' : `$${p.price}`}
                  </div>
                  <button
                    onClick={() => handleDownload(p.component?.name || '')}
                    className="main-btn main-btn-primary text-sm"
                  >
                    📥 Download
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
