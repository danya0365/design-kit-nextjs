// Creator Dashboard Page
'use client';

import {
    mockCreatorComponents,
    mockDashboardStats,
    mockEarningsHistory,
    mockRecentOrders
} from '@/src/data/mock/dashboard';
import { useLayoutStore } from '@/src/presentation/stores/layoutStore';
import { useUserStore } from '@/src/presentation/stores/userStore';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const currentLayout = useLayoutStore((state) => state.currentLayout);
  const { currentUser, isAuthenticated, login } = useUserStore();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Auto-login for demo
    if (!isAuthenticated) {
      login('sarah@designkit.com'); // Login as creator
    }
  }, [isAuthenticated, login]);

  if (!mounted) {
    return null;
  }

  const stats = [
    { label: 'Total Components', value: mockDashboardStats.totalComponents, icon: '📦' },
    { label: 'Total Downloads', value: mockDashboardStats.totalDownloads.toLocaleString(), icon: '⬇️' },
    { label: 'Total Earnings', value: `$${mockDashboardStats.totalEarnings.toLocaleString()}`, icon: '💰' },
    { label: 'This Month', value: `$${mockDashboardStats.monthlyEarnings.toLocaleString()}`, icon: '📈' },
  ];

  if (currentLayout === 'retro') {
    return (
      <div className="retro-page">
        <h1 className="retro-page-title">🎨 Creator Dashboard</h1>
        
        {/* Welcome */}
        <div className="retro-card" style={{ marginBottom: '12px' }}>
          <p>Welcome back, <strong>{currentUser?.name || 'Creator'}</strong>! 👋</p>
        </div>

        {/* Stats */}
        <div className="retro-groupbox" style={{ marginBottom: '12px' }}>
          <span className="retro-groupbox-title">📊 Statistics</span>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', padding: '8px' }}>
            {stats.map((stat) => (
              <div key={stat.label} className="retro-card" style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '20px' }}>{stat.icon}</div>
                <div style={{ fontWeight: 'bold', fontSize: '16px' }}>{stat.value}</div>
                <div style={{ fontSize: '10px', color: 'gray' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Earnings Chart (simplified) */}
        <div className="retro-groupbox" style={{ marginBottom: '12px' }}>
          <span className="retro-groupbox-title">💵 Earnings History</span>
          <div style={{ padding: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', height: '80px' }}>
              {mockEarningsHistory.map((data) => (
                <div key={data.month} style={{ flex: 1, textAlign: 'center' }}>
                  <div
                    style={{
                      background: '#000080',
                      height: `${(data.earnings / 1500) * 60}px`,
                      marginBottom: '4px',
                    }}
                  />
                  <div style={{ fontSize: '10px' }}>{data.month}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* My Components */}
        <div className="retro-groupbox" style={{ marginBottom: '12px' }}>
          <span className="retro-groupbox-title">📦 My Components</span>
          <table style={{ width: '100%', fontSize: '11px', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#c0c0c0' }}>
                <th style={{ padding: '4px', border: '1px solid #808080', textAlign: 'left' }}>Name</th>
                <th style={{ padding: '4px', border: '1px solid #808080', textAlign: 'right' }}>Downloads</th>
                <th style={{ padding: '4px', border: '1px solid #808080', textAlign: 'right' }}>Price</th>
                <th style={{ padding: '4px', border: '1px solid #808080', textAlign: 'center' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {mockCreatorComponents.slice(0, 5).map((comp) => (
                <tr key={comp.id}>
                  <td style={{ padding: '4px', border: '1px solid #808080' }}>{comp.name}</td>
                  <td style={{ padding: '4px', border: '1px solid #808080', textAlign: 'right' }}>{comp.downloadCount}</td>
                  <td style={{ padding: '4px', border: '1px solid #808080', textAlign: 'right' }}>
                    {comp.isFree ? 'FREE' : `$${comp.price}`}
                  </td>
                  <td style={{ padding: '4px', border: '1px solid #808080', textAlign: 'center' }}>
                    {comp.isPublished ? '✅' : '📝'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Recent Orders */}
        <div className="retro-groupbox">
          <span className="retro-groupbox-title">🧾 Recent Orders</span>
          <table style={{ width: '100%', fontSize: '11px', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#c0c0c0' }}>
                <th style={{ padding: '4px', border: '1px solid #808080', textAlign: 'left' }}>Component</th>
                <th style={{ padding: '4px', border: '1px solid #808080', textAlign: 'left' }}>Buyer</th>
                <th style={{ padding: '4px', border: '1px solid #808080', textAlign: 'right' }}>Amount</th>
                <th style={{ padding: '4px', border: '1px solid #808080', textAlign: 'right' }}>Date</th>
              </tr>
            </thead>
            <tbody>
              {mockRecentOrders.map((order) => (
                <tr key={order.id}>
                  <td style={{ padding: '4px', border: '1px solid #808080' }}>{order.component}</td>
                  <td style={{ padding: '4px', border: '1px solid #808080' }}>{order.buyer}</td>
                  <td style={{ padding: '4px', border: '1px solid #808080', textAlign: 'right' }}>${order.amount}</td>
                  <td style={{ padding: '4px', border: '1px solid #808080', textAlign: 'right' }}>{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // Main Layout
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Creator Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Welcome back, {currentUser?.name || 'Creator'}! 👋
          </p>
        </div>
        <Link href="/dashboard/upload" className="main-btn main-btn-primary">
          + Upload Component
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="main-card">
            <div className="flex items-center gap-4">
              <div className="text-3xl">{stat.icon}</div>
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {stat.label}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Earnings Chart */}
        <div className="lg:col-span-2 main-card">
          <h2 className="font-semibold text-gray-900 dark:text-white mb-4">
            Earnings Overview
          </h2>
          <div className="flex items-end gap-2 h-48">
            {mockEarningsHistory.map((data) => (
              <div key={data.month} className="flex-1 flex flex-col items-center">
                <div
                  className="w-full bg-gradient-to-t from-indigo-600 to-indigo-400 rounded-t-lg transition-all hover:opacity-80"
                  style={{ height: `${(data.earnings / 1500) * 160}px` }}
                  title={`$${data.earnings}`}
                />
                <span className="text-xs text-gray-500 mt-2">{data.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Orders */}
        <div className="main-card">
          <h2 className="font-semibold text-gray-900 dark:text-white mb-4">
            Recent Orders
          </h2>
          <div className="space-y-4">
            {mockRecentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800 last:border-0">
                <div>
                  <div className="font-medium text-gray-900 dark:text-white text-sm">
                    {order.component}
                  </div>
                  <div className="text-xs text-gray-500">{order.buyer}</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-green-600">${order.amount}</div>
                  <div className="text-xs text-gray-500">{order.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* My Components */}
      <div className="main-card mt-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-gray-900 dark:text-white">
            My Components
          </h2>
          <Link href="/dashboard/components" className="text-indigo-600 dark:text-indigo-400 text-sm hover:underline">
            View All →
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray-500 dark:text-gray-400">
                <th className="pb-3 font-medium">Component</th>
                <th className="pb-3 font-medium text-right">Downloads</th>
                <th className="pb-3 font-medium text-right">Price</th>
                <th className="pb-3 font-medium text-right">Rating</th>
                <th className="pb-3 font-medium text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {mockCreatorComponents.slice(0, 5).map((comp) => (
                <tr key={comp.id}>
                  <td className="py-3">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{comp.category?.icon || '📦'}</span>
                      <span className="font-medium text-gray-900 dark:text-white">{comp.name}</span>
                    </div>
                  </td>
                  <td className="py-3 text-right text-gray-600 dark:text-gray-400">
                    {comp.downloadCount.toLocaleString()}
                  </td>
                  <td className="py-3 text-right font-medium text-gray-900 dark:text-white">
                    {comp.isFree ? 'Free' : `$${comp.price}`}
                  </td>
                  <td className="py-3 text-right text-gray-600 dark:text-gray-400">
                    ⭐ {comp.rating.toFixed(1)}
                  </td>
                  <td className="py-3 text-center">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      comp.isPublished 
                        ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'
                        : 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400'
                    }`}>
                      {comp.isPublished ? 'Published' : 'Draft'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
