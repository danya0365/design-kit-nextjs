// Changelog Page
'use client';

import { useLayoutStore } from '@/src/presentation/stores/layoutStore';

const changelog = [
  {
    version: '2.0.0',
    date: '2026-01-01',
    type: 'major' as const,
    changes: [
      { type: 'feature', text: 'New retro layout theme (Windows 98 style)' },
      { type: 'feature', text: 'Component bundles with discounts' },
      { type: 'feature', text: 'Global search with Cmd+K shortcut' },
      { type: 'feature', text: 'Creator analytics dashboard' },
      { type: 'improvement', text: 'Improved export options UI' },
      { type: 'improvement', text: 'Better dark mode support' },
    ],
  },
  {
    version: '1.5.0',
    date: '2025-12-15',
    type: 'minor' as const,
    changes: [
      { type: 'feature', text: 'Favorites/Wishlist system' },
      { type: 'feature', text: 'Email notifications for purchases' },
      { type: 'fix', text: 'Fixed cart persistence issue' },
      { type: 'improvement', text: 'Faster component preview loading' },
    ],
  },
  {
    version: '1.4.0',
    date: '2025-11-20',
    type: 'minor' as const,
    changes: [
      { type: 'feature', text: 'CSS Module export option' },
      { type: 'feature', text: 'Component ratings and reviews' },
      { type: 'improvement', text: 'Better mobile responsiveness' },
    ],
  },
  {
    version: '1.3.0',
    date: '2025-10-10',
    type: 'minor' as const,
    changes: [
      { type: 'feature', text: 'Next.js export support' },
      { type: 'feature', text: 'Creator dashboards' },
      { type: 'fix', text: 'Fixed TypeScript type exports' },
    ],
  },
  {
    version: '1.0.0',
    date: '2025-08-01',
    type: 'major' as const,
    changes: [
      { type: 'feature', text: 'Initial release 🎉' },
      { type: 'feature', text: 'HTML and React export' },
      { type: 'feature', text: 'CSS and Tailwind styling' },
      { type: 'feature', text: 'Creator marketplace' },
    ],
  },
];

const changeTypeIcons: Record<string, string> = {
  feature: '✨',
  improvement: '⚡',
  fix: '🐛',
};

const changeTypeColors: Record<string, string> = {
  feature: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400',
  improvement: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
  fix: 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400',
};

export default function ChangelogPage() {
  const currentLayout = useLayoutStore((state) => state.currentLayout);

  if (currentLayout === 'retro') {
    return (
      <div className="retro-page">
        <h1 className="retro-page-title">📋 Changelog</h1>
        <p style={{ marginBottom: '12px', fontSize: '12px' }}>
          Track all updates and improvements to Design Kit.
        </p>

        {changelog.map((release) => (
          <div key={release.version} className="retro-groupbox" style={{ marginBottom: '12px' }}>
            <span className="retro-groupbox-title">
              v{release.version} - {release.date}
              {release.type === 'major' && (
                <span style={{ marginLeft: '8px', background: '#ff0000', color: 'white', padding: '2px 4px', fontSize: '10px' }}>
                  MAJOR
                </span>
              )}
            </span>
            <ul style={{ padding: '8px 8px 8px 24px', fontSize: '12px' }}>
              {release.changes.map((change, i) => (
                <li key={i} style={{ marginBottom: '4px' }}>
                  {changeTypeIcons[change.type]} {change.text}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          📋 Changelog
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Track all updates and improvements
        </p>
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700" />

        <div className="space-y-8">
          {changelog.map((release) => (
            <div key={release.version} className="relative pl-20">
              {/* Timeline dot */}
              <div className={`absolute left-6 w-5 h-5 rounded-full border-4 border-white dark:border-gray-900 ${
                release.type === 'major' ? 'bg-indigo-500' : 'bg-gray-300 dark:bg-gray-600'
              }`} />

              <div className="main-card">
                <div className="flex items-center gap-3 mb-4">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    v{release.version}
                  </h2>
                  {release.type === 'major' && (
                    <span className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-xs rounded-full">
                      Major Release
                    </span>
                  )}
                  <span className="text-gray-500 dark:text-gray-400 ml-auto">
                    {release.date}
                  </span>
                </div>

                <ul className="space-y-2">
                  {release.changes.map((change, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className={`px-2 py-1 rounded text-xs ${changeTypeColors[change.type]}`}>
                        {changeTypeIcons[change.type]} {change.type}
                      </span>
                      <span className="text-gray-700 dark:text-gray-300">
                        {change.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
