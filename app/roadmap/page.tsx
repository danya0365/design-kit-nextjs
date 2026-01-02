// Roadmap Page
'use client';

import { useLayoutStore } from '@/src/presentation/stores/layoutStore';

const roadmap = [
  {
    quarter: 'Q1 2026',
    status: 'in-progress' as const,
    items: [
      { title: 'Supabase Integration', description: 'Real-time database and authentication', status: 'in-progress' },
      { title: 'Component Versioning', description: 'Version control for component updates', status: 'planned' },
      { title: 'Team Workspaces', description: 'Collaborate with your team', status: 'planned' },
    ],
  },
  {
    quarter: 'Q2 2026',
    status: 'planned' as const,
    items: [
      { title: 'Figma Plugin', description: 'Export components directly from Figma', status: 'planned' },
      { title: 'VS Code Extension', description: 'Browse and insert components from VS Code', status: 'planned' },
      { title: 'AI Component Generator', description: 'Generate components from descriptions', status: 'planned' },
    ],
  },
  {
    quarter: 'Q3 2026',
    status: 'planned' as const,
    items: [
      { title: 'Mobile App', description: 'Browse components on iOS and Android', status: 'planned' },
      { title: 'Component Analytics Pro', description: 'Advanced analytics for creators', status: 'planned' },
      { title: 'Private Components', description: 'Share components privately with clients', status: 'planned' },
    ],
  },
  {
    quarter: 'Q4 2026',
    status: 'planned' as const,
    items: [
      { title: 'Design System Builder', description: 'Build complete design systems', status: 'planned' },
      { title: 'Component Testing', description: 'Automated testing for components', status: 'planned' },
      { title: 'Marketplace API', description: 'Full API for third-party integrations', status: 'planned' },
    ],
  },
];

const completedFeatures = [
  'Component Marketplace',
  'Creator Dashboards',
  'Bundle Discounts',
  'Dark Mode',
  'Retro Layout Theme',
  'Global Search (Cmd+K)',
  'Favorites System',
  'Export to React/Next.js',
];

export default function RoadmapPage() {
  const currentLayout = useLayoutStore((state) => state.currentLayout);

  if (currentLayout === 'retro') {
    return (
      <div className="retro-page">
        <h1 className="retro-page-title">🗺️ Product Roadmap</h1>

        <div className="retro-groupbox" style={{ marginBottom: '12px' }}>
          <span className="retro-groupbox-title">✅ Completed</span>
          <div style={{ padding: '8px', display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
            {completedFeatures.map((feature) => (
              <span
                key={feature}
                style={{
                  display: 'inline-block',
                  padding: '4px 8px',
                  background: '#90EE90',
                  fontSize: '11px',
                }}
              >
                ✓ {feature}
              </span>
            ))}
          </div>
        </div>

        {roadmap.map((quarter) => (
          <div key={quarter.quarter} className="retro-groupbox" style={{ marginBottom: '12px' }}>
            <span className="retro-groupbox-title">
              {quarter.quarter}
              {quarter.status === 'in-progress' && (
                <span style={{ marginLeft: '8px', background: '#FFD700', padding: '2px 4px', fontSize: '10px' }}>
                  IN PROGRESS
                </span>
              )}
            </span>
            <div style={{ padding: '8px' }}>
              {quarter.items.map((item) => (
                <div key={item.title} style={{ marginBottom: '8px', paddingBottom: '8px', borderBottom: '1px solid #c0c0c0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: item.status === 'in-progress' ? '#FFD700' : '#c0c0c0',
                    }} />
                    <strong style={{ fontSize: '12px' }}>{item.title}</strong>
                  </div>
                  <p style={{ fontSize: '11px', color: 'gray', marginLeft: '16px' }}>{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          🗺️ Product Roadmap
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          See what we&apos;re building and what&apos;s coming next
        </p>
      </div>

      {/* Completed */}
      <div className="main-card mb-8 bg-green-50 dark:bg-green-900/20">
        <h2 className="font-semibold text-gray-900 dark:text-white mb-4">✅ Completed Features</h2>
        <div className="flex flex-wrap gap-2">
          {completedFeatures.map((feature) => (
            <span
              key={feature}
              className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-sm"
            >
              ✓ {feature}
            </span>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700" />

        <div className="space-y-8">
          {roadmap.map((quarter) => (
            <div key={quarter.quarter} className="relative pl-20">
              {/* Timeline dot */}
              <div className={`absolute left-6 w-5 h-5 rounded-full border-4 border-white dark:border-gray-900 ${
                quarter.status === 'in-progress' ? 'bg-yellow-500' : 'bg-gray-300 dark:bg-gray-600'
              }`} />

              <div className="main-card">
                <div className="flex items-center gap-3 mb-4">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    {quarter.quarter}
                  </h2>
                  {quarter.status === 'in-progress' && (
                    <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 text-xs rounded-full">
                      In Progress
                    </span>
                  )}
                </div>

                <div className="space-y-4">
                  {quarter.items.map((item) => (
                    <div key={item.title} className="flex items-start gap-3">
                      <span className={`w-3 h-3 rounded-full mt-1.5 ${
                        item.status === 'in-progress' ? 'bg-yellow-500' : 'bg-gray-300 dark:bg-gray-600'
                      }`} />
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
