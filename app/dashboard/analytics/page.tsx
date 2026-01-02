// Creator Analytics Page
'use client';

import { useLayoutStore } from '@/src/presentation/stores/layoutStore';
import { useUserStore } from '@/src/presentation/stores/userStore';
import { useEffect, useState } from 'react';

// Extended mock analytics data
const mockAnalytics = {
  views: { total: 15240, change: 12.5 },
  downloads: { total: 4523, change: 8.2 },
  earnings: { total: 8790, change: 15.3 },
  conversion: { rate: 3.2, change: 0.4 },
};

const topComponents = [
  { name: 'Gradient Button Pack', views: 3240, downloads: 890, revenue: 2580 },
  { name: 'Hero Section Pro', views: 2100, downloads: 550, revenue: 1595 },
  { name: 'Dashboard Kit', views: 1850, downloads: 420, revenue: 1260 },
  { name: 'Card Collection', views: 1200, downloads: 300, revenue: 870 },
];

const trafficSources = [
  { source: 'Organic Search', percent: 45, color: 'bg-blue-500' },
  { source: 'Direct', percent: 25, color: 'bg-green-500' },
  { source: 'Social Media', percent: 18, color: 'bg-purple-500' },
  { source: 'Referrals', percent: 12, color: 'bg-orange-500' },
];

export default function AnalyticsPage() {
  const currentLayout = useLayoutStore((state) => state.currentLayout);
  const { currentUser, isAuthenticated, login } = useUserStore();
  const [mounted, setMounted] = useState(false);
  const [timeRange, setTimeRange] = useState('30d');

  useEffect(() => {
    setMounted(true);
    if (!isAuthenticated) {
      login('sarah@designkit.com');
    }
  }, [isAuthenticated, login]);

  if (!mounted) return null;

  const stats = [
    { label: 'Total Views', value: mockAnalytics.views.total.toLocaleString(), change: mockAnalytics.views.change, icon: '👁️' },
    { label: 'Downloads', value: mockAnalytics.downloads.total.toLocaleString(), change: mockAnalytics.downloads.change, icon: '⬇️' },
    { label: 'Revenue', value: `$${mockAnalytics.earnings.total.toLocaleString()}`, change: mockAnalytics.earnings.change, icon: '💰' },
    { label: 'Conversion', value: `${mockAnalytics.conversion.rate}%`, change: mockAnalytics.conversion.change, icon: '📈' },
  ];

  if (currentLayout === 'retro') {
    return (
      <div className="retro-page">
        <h1 className="retro-page-title">📊 Analytics</h1>

        {/* Time Range */}
        <div style={{ marginBottom: '12px', display: 'flex', gap: '4px' }}>
          {['7d', '30d', '90d', '1y'].map((range) => (
            <button
              key={range}
              className={`retro-btn ${timeRange === range ? 'retro-btn-primary' : ''}`}
              onClick={() => setTimeRange(range)}
              style={{ fontSize: '10px', padding: '4px 8px' }}
            >
              {range}
            </button>
          ))}
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', marginBottom: '12px' }}>
          {stats.map((stat) => (
            <div key={stat.label} className="retro-card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '16px' }}>{stat.icon}</div>
              <div style={{ fontWeight: 'bold', fontSize: '14px' }}>{stat.value}</div>
              <div style={{ fontSize: '10px', color: 'gray' }}>{stat.label}</div>
              <div style={{ fontSize: '10px', color: stat.change > 0 ? 'green' : 'red' }}>
                {stat.change > 0 ? '↑' : '↓'} {Math.abs(stat.change)}%
              </div>
            </div>
          ))}
        </div>

        {/* Top Components */}
        <div className="retro-groupbox" style={{ marginBottom: '12px' }}>
          <span className="retro-groupbox-title">🏆 Top Components</span>
          <table style={{ width: '100%', fontSize: '11px' }}>
            <thead>
              <tr style={{ background: '#c0c0c0' }}>
                <th style={{ padding: '4px', textAlign: 'left' }}>Name</th>
                <th style={{ padding: '4px', textAlign: 'right' }}>Views</th>
                <th style={{ padding: '4px', textAlign: 'right' }}>Downloads</th>
                <th style={{ padding: '4px', textAlign: 'right' }}>Revenue</th>
              </tr>
            </thead>
            <tbody>
              {topComponents.map((comp, i) => (
                <tr key={i}>
                  <td style={{ padding: '4px', border: '1px solid #808080' }}>{comp.name}</td>
                  <td style={{ padding: '4px', border: '1px solid #808080', textAlign: 'right' }}>{comp.views}</td>
                  <td style={{ padding: '4px', border: '1px solid #808080', textAlign: 'right' }}>{comp.downloads}</td>
                  <td style={{ padding: '4px', border: '1px solid #808080', textAlign: 'right' }}>${comp.revenue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Traffic Sources */}
        <div className="retro-groupbox">
          <span className="retro-groupbox-title">🌐 Traffic Sources</span>
          <div style={{ padding: '8px' }}>
            {trafficSources.map((source) => (
              <div key={source.source} style={{ marginBottom: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '2px' }}>
                  <span>{source.source}</span>
                  <span>{source.percent}%</span>
                </div>
                <div style={{ height: '8px', background: '#c0c0c0', border: '1px inset #808080' }}>
                  <div style={{ height: '100%', width: `${source.percent}%`, background: '#000080' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            📊 Analytics
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Track your component performance
          </p>
        </div>
        <div className="flex gap-2">
          {['7d', '30d', '90d', '1y'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`main-btn ${timeRange === range ? 'main-btn-primary' : 'main-btn-secondary'}`}
            >
              {range === '7d' ? '7 Days' : range === '30d' ? '30 Days' : range === '90d' ? '90 Days' : '1 Year'}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="main-card">
            <div className="flex items-center justify-between">
              <span className="text-3xl">{stat.icon}</span>
              <span className={`text-sm px-2 py-1 rounded ${
                stat.change > 0 
                  ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'
                  : 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'
              }`}>
                {stat.change > 0 ? '↑' : '↓'} {Math.abs(stat.change)}%
              </span>
            </div>
            <div className="mt-4">
              <div className="text-3xl font-bold text-gray-900 dark:text-white">
                {stat.value}
              </div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Components */}
        <div className="lg:col-span-2 main-card">
          <h2 className="font-semibold text-gray-900 dark:text-white mb-4">
            🏆 Top Performing Components
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-gray-500 dark:text-gray-400">
                  <th className="pb-3 font-medium">Component</th>
                  <th className="pb-3 font-medium text-right">Views</th>
                  <th className="pb-3 font-medium text-right">Downloads</th>
                  <th className="pb-3 font-medium text-right">Revenue</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {topComponents.map((comp, i) => (
                  <tr key={i}>
                    <td className="py-3 font-medium text-gray-900 dark:text-white">
                      {comp.name}
                    </td>
                    <td className="py-3 text-right text-gray-600 dark:text-gray-400">
                      {comp.views.toLocaleString()}
                    </td>
                    <td className="py-3 text-right text-gray-600 dark:text-gray-400">
                      {comp.downloads.toLocaleString()}
                    </td>
                    <td className="py-3 text-right font-semibold text-green-600">
                      ${comp.revenue.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Traffic Sources */}
        <div className="main-card">
          <h2 className="font-semibold text-gray-900 dark:text-white mb-4">
            🌐 Traffic Sources
          </h2>
          <div className="space-y-4">
            {trafficSources.map((source) => (
              <div key={source.source}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-700 dark:text-gray-300">{source.source}</span>
                  <span className="text-gray-500">{source.percent}%</span>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${source.color} transition-all`}
                    style={{ width: `${source.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
